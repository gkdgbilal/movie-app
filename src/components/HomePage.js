import React, { useEffect, useState } from 'react'
import {
    Button,
    ConfigProvider,
    Input,
    Divider,
    Tag,
    Select
} from 'antd';
import {
    MenuOutlined,
    PlusOutlined,

} from '@ant-design/icons';
import styled from 'styled-components';
import CreateForm from './CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../redux/services/movieService';
import DeleteModal from './DeleteModal';
import ListGrid from './ListGrid';
import useLocalStorage from '../utils/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { movies } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const [movieList, setMovieList] = useLocalStorage('movieList', movies.Search);

    const options = [];
    const thisYear = (new Date()).getFullYear();
    for (let i = 0; i <= 60; i++) {
        const year = thisYear - i;
        options.push({ label: year, value: year });
    }

    const imdbPoints = [];
    const maxPoints = 10;
    for (let i = 0; i <= 10; i++) {
        const point = maxPoints - i;
        imdbPoints.push({ label: point, value: point });
    }

    const toggleModal = () => {
        setOpen(!open);
    };

    const onCreate = (values) => {
        setMovieList(prev => {
            return [...prev, {
                imdbID: uuidv4(),
                Title: values.Title,
                imdbRating: values.imdbRating,
                // Poster: values.Poster,
                Year: values.Year,
                Actors: values.Actors,
            }];
        });
        setOpen(false);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        dispatch(searchMovies(value));
        setSearch(value);
    }

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    `;

    const ButtonGroup = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin: 2rem;
    `;

    const InputContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 60%;
    `;

    const DescContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-left: 2rem;
    `;
    const FilterContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
`

    return (
        <ConfigProvider componentSize="large">
            <Container>
                <ButtonGroup>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={toggleModal}
                    >
                        Add Movie
                    </Button>
                    <Button
                        type="primary"
                        icon={<MenuOutlined />}
                    >
                        Movie List
                    </Button>
                    <DeleteModal />
                </ButtonGroup>
                <InputContainer>
                    <Input.Search
                        allowClear
                        placeholder="Search Movie"
                        enterButton
                        size="large"
                        loading={false}
                        onSearch={onSearch}
                    />
                    {
                        movies.totalResults &&
                        <DescContainer>
                            <Tag color="blue">
                                {`${movies.totalResults > 1 ? "Results" : "Result"} : ${movies.Search.length} in ${movies.totalResults} for "${search}"`}
                            </Tag>
                        </DescContainer>
                    }
                </InputContainer>
                <Divider />
                <CreateForm
                    open={open}
                    onCreate={onCreate}
                    onCancel={toggleModal}
                />
            </Container>
            {
                movieList &&
                <FilterContainer>
                    <Select
                        defaultValue={new Date().getFullYear()}
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={
                            options
                        }
                    />
                    <Select
                        defaultValue={10}
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={
                            imdbPoints
                        }
                    />
                </FilterContainer>
            }
            <ListGrid
                list={movieList}
            />

        </ConfigProvider >
    )
}

export default HomePage