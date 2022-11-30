import { Card } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons';
const MovieCard = ({ imdbID, poster, type, year, title, deleteMovie }) => {
    const { Meta } = Card;

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/detail/${imdbID}`;
        navigate(path);
    }

    const MetaContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .5rem;
        text-transform: uppercase;
    `

    return (
        <Card
            hoverable
            style={{
                height: 360,
            }}
            cover={
                <>
                    <img
                        alt="example"
                        src={poster}
                        style={{
                            objectFit: 'cover',
                            height: 275,
                            position: 'relative',
                        }}
                        onClick={routeChange}
                    />
                    <DeleteOutlined
                        onClick={() => deleteMovie(imdbID)}
                        style={{
                            width: 30,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            fontSize: '1.5rem',
                            color: 'red',
                            cursor: 'pointer',
                            backgroundColor: '#CCC',
                            opacity: .5,
                        }}
                    />
                </>
            }
        >
            <MetaContainer>
                <Meta description={type} />
                <Meta description={year} />
            </MetaContainer>
            <Meta title={title} />
        </Card>
    )
}

export default MovieCard