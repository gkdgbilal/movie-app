import React, { useState } from 'react'
import {
    Button,
    ConfigProvider,
    Input,
    Divider,
    Select,
    Popconfirm
} from 'antd';
import {
    MenuOutlined,
    PlusOutlined,
    QuestionCircleOutlined,

} from '@ant-design/icons';
import styled from 'styled-components';
import CreateForm from './CreateForm';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, fetchMovies, searchMovies } from '../redux/services/movieService';
import ListGrid from './ListGrid';
import useLocalStorage from '../utils/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { movies } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const [movieList, setMovieList] = useLocalStorage('movieList', []);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const addDataHandler = (values) => {
        const newMovies = {
            imdbID: uuidv4(),
            Title: values.Title,
            imdbRating: values.imdbRating,
            // Poster: values.Poster,
            Year: values.Year,
            Actors: values.Actors,
            Description: values.Description,
        }

        dispatch(addMovie({
            formValues: newMovies,
            movies: movieList
        }))

        dispatch(fetchMovies());

    }

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

    const handleChangeByYear = (value) => {
        console.log(`selected ${value}`, typeof value);
        const arr = movies.filter((movie) => movie.Year.toString() === value.toString())
        if (arr.length > 0) {
            setFilteredMovies(arr)
        } else {
            message.warning('Movie not found.');
            setFilteredMovies(movies)
        }
    };
    const handleChangeByPoint = (value) => {
        console.log(`selected ${value}`, typeof value);
        const arr = movies.filter((movie) => movie.imdbRating === value)
        if (arr.length > 0) {
            setFilteredMovies(arr)
        } else {
            message.warning('Movie not found.');
            setFilteredMovies(movies)
        }
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
                        onClick={() => {
                            console.log("movieList", movies.filter((movie) => movie.Year === "2022"));
                        }}
                    >
                        Movie List
                    </Button>
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
                    {/* {
                        movies.totalResults &&
                        <DescContainer>
                            <Tag color="blue">
                                {`${movies.totalResults > 1 ? "Results" : "Result"} : ${movies.Search.length} in ${movies.totalResults} for "${search}"`}
                            </Tag>
                        </DescContainer>
                    } */}
                </InputContainer>
                <Divider />
                <CreateForm
                    open={open}
                    onCreate={addDataHandler}
                    onCancel={toggleModal}
                />
            </Container>
            {
                movieList &&
                <FilterContainer>
                    <Select
                        placeholder="Select year"
                        style={{
                            width: 130,
                        }}
                        onChange={handleChangeByYear}
                        options={
                            options
                        }
                    />
                    <Select
                        placeholder="Select point"
                        style={{
                            width: 130,
                        }}
                        onChange={handleChangeByPoint}
                        options={
                            imdbPoints
                        }
                    />
                </FilterContainer>
            }
            <ListGrid
                moviesList={filteredMovies.length > 0 ? filteredMovies : movies}
            />

        </ConfigProvider >
    )
}

export default HomePage