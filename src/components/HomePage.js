import React, { useEffect, useState } from 'react'
import {
    Button,
    ConfigProvider,
    Input,
    Divider,
    Tag
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

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { movies } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const [movieList, setMovieList] = useLocalStorage('movieList', []);

    const toggleModal = () => {
        setOpen(!open);
    };

    const onCreate = (values) => {
        setMovieList(prev => {
            return [...prev, values];
        });
        setOpen(false);
    };

    const onSearch = (value) => {
        dispatch(searchMovies(value));
        setSearch(value);
    }

    useEffect(() => {
        console.log('Received values of form: ', movieList);
    }, [movieList]);

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
            <ListGrid
                list={movieList}
            />

        </ConfigProvider >
    )
}

export default HomePage