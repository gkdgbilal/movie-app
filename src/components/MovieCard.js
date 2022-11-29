import { Card } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MovieCard = ({ imdbID, poster, type, year, title }) => {
    const { Meta } = Card;

    const MetaContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .5rem;
        text-transform: uppercase;
    `

    return (
        <Link to={`/detail/${imdbID}`}>
            <Card
                hoverable
                style={{
                    width: 200,
                    height: 360,
                }}
                cover={
                    <img
                        alt="example"
                        src={poster}
                        style={{
                            objectFit: 'cover',
                            height: 275,
                        }}
                    />
                }
            >
                <MetaContainer>
                    <Meta description={type} />
                    <Meta description={year} />
                </MetaContainer>
                <Meta title={title} />
            </Card>
        </Link>
    )
}

export default MovieCard