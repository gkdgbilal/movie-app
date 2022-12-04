import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
const MovieCard = ({ imdbID, poster, type, year, title }) => {
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
                minWidth: 240,
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
                    <EditModal
                        imdbID={imdbID}
                    />
                    <DeleteModal
                        imdbID={imdbID}
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