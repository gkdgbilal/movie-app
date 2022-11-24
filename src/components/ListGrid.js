import React, { useState } from 'react'
import { Button, Card, List, Spin } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const ListGrid = () => {
    const { Meta } = Card;
    const { movies, loading } = useSelector((state) => state.movies);
    const [initLoading, setInitLoading] = useState(true);

    console.log("movies", movies);

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
    const MetaContainer = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .5rem;
    `

    const loadMoreContainer = styled.div`
        text-align: center;
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
    `

    const onLoadMore = () => { }

    const loadMore =
        !initLoading && !loading ? (
            <loadMoreContainer>
                <Button onClick={onLoadMore}>loading more</Button>
            </loadMoreContainer>
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
                            dataSource={movies.Search}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        style={{
                                            width: 200,
                                            height: 360,
                                        }}
                                        cover={
                                            <img
                                                alt="example"
                                                src={item.Poster}
                                                style={{
                                                    objectFit: 'cover',
                                                    height: 275,
                                                }}
                                            />
                                        }
                                    >
                                        <MetaContainer>
                                            <Meta description={item.Type.toUpperCase()} />
                                            <Meta description={item.Year} />
                                        </MetaContainer>
                                        <Meta title={item.Title} />
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </>
            }
        </CardContainer>
    )
}

export default ListGrid