import { Card, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import HomePage from '../components/HomePage'
import Layout from '../components/Layout'
import ListGrid from '../components/ListGrid'
import { fetchMovie } from '../redux/services/movieService'

const Detail = () => {

    const params = useParams();
    const [movieId, setMovieId] = useState(params.id);
    const { id } = params;
    const dispatch = useDispatch();
    const { movie, loading } = useSelector((state) => state.movies);
    const { Meta } = Card;

    useEffect(() => {
        setMovieId(id);
        dispatch(fetchMovie(movieId));
    }, [dispatch, id, movieId])

    const CardContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    `

    const MetaContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
    text-transform: uppercase;
    `
    const SpinnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30%;
    width: 100%;
    height: 100%;
    `

    return (
        <Layout>
            <CardContainer>
                {
                    loading ?
                        <SpinnerContainer>
                            <Spin
                                tip="Loading..."
                            />
                        </SpinnerContainer>
                        :
                        <Card
                            hoverable
                            style={{
                                width: "50%",
                                height: "50%",
                                maxHeight: 50,
                                maxWidth: 500,
                            }}
                            cover={
                                <img
                                    alt={movie.Title}
                                    src={movie.Poster}
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            }
                        >
                            <MetaContainer>
                                <Meta description={movie.Type} />
                                <Meta description={movie.Year} />
                            </MetaContainer>
                            <Meta title={movie.Title} />
                        </Card>
                }
            </CardContainer>
        </Layout>
    )
}

export default Detail