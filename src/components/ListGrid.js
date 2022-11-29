import React, { useEffect, useState } from 'react'
import { Button, List, Spin } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { getMoreMovies } from '../redux/services/movieService';

const ListGrid = ({ list }) => {
    const { movies, loading } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const [initLoading, setInitLoading] = useState(true);
    const [nextPage, setNextPage] = useState(2);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showLoadingMore, setShowLoadingMore] = useState(true);

    const CardContainer = styled.div`
        padding: 10px;
    `
    const SpinnerContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    `

    const LoadMoreContainer = styled.div`
        text-align: center;
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
    `
    useEffect(() => {
        dispatch(getMoreMovies("har", 2));
    }, [dispatch])

    const onLoadMore = () => {
        setInitLoading(true);
        setLoadingMore(true);
    };

    const mergeItems = () => {
        console.log("movies", [ ...list]);
        // return [...movies.Search];
    }

    console.log("list", list);

    const loadMore =
        !initLoading && !loading ? (
            <LoadMoreContainer>
                <Button onClick={onLoadMore}>loading more</Button>
            </LoadMoreContainer>
        ) : null;

    return (
        <CardContainer>
            {
                loading ?
                    <SpinnerContainer>
                        <Spin
                            tip="Loading..."
                        />
                    </SpinnerContainer>
                    :
                    <>
                        <List
                            loading={loading}
                            loadMore={loadMore}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 5,
                                xxl: 6,
                            }}
                            dataSource={mergeItems()}
                            renderItem={item => (
                                <List.Item>
                                    <MovieCard
                                        // title={item.Title}
                                        // year={item.Year}
                                        // type={item.Type}
                                        // poster={item.Poster}
                                        // imdbID={item.imdbID}
                                        title={item.Title}
                                        year={item.Year}
                                        type={item.Type}
                                        poster={item.Poster}
                                        imdbID={item.imdbID}
                                    />
                                </List.Item>
                            )}
                        />
                    </>
            }
        </CardContainer>
    )
}

export default ListGrid