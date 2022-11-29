import { Card } from 'antd'
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
    const movie = useSelector((state) => state.movies);
    const { Meta } = Card;

    useEffect(() => {
        setMovieId(id);
        dispatch(fetchMovie(movieId));
    }, [dispatch, id, movieId])

    // console.log("movie", movie.movies);

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

    return (
        <Layout>
            <CardContainer>
                <Card
                    hoverable
                    style={{
                        width: "50%",
                        height: "50%",
                    }}
                    cover={
                        <img
                            alt={movie.movies.Title}
                            src={movie.movies.Poster}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    }
                >
                    <MetaContainer>
                        <Meta description={movie.movies.Type} />
                        <Meta description={movie.movies.Year} />
                    </MetaContainer>
                    <Meta title={movie.movies.Title} />
                </Card>
            </CardContainer>
        </Layout>
    )
}

export default Detail