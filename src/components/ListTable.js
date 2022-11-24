import React from 'react'
import {
    Card,
    ConfigProvider,
    Table,
} from 'antd';
import styled from 'styled-components';

const ListTable = () => {

    const TableContainer = styled.div`
        margin: 10px auto;
    `
    const dataSources = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '5',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '6',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '7',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '8',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '9',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '10',
            name: 'Jim Red',
            age: 32,
        },
        {
            key: '11',
            name: 'Jim Red',
            age: 32,
        },
    ]

    return (
        <ConfigProvider componentSize="large">
            <TableContainer>
                {
                    dataSources.length > 0 &&
                    <Card title="Movies">
                        <Table
                            size='middle'
                            pagination={{ pageSize: 5 }}
                            columns={[
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                },
                                {
                                    title: 'Age',
                                    dataIndex: 'age',
                                },
                                {
                                    title: 'Address',
                                    dataIndex: 'address',
                                },
                                {
                                    title: 'Tags',
                                    dataIndex: 'tags',
                                }
                            ]}
                            dataSource={dataSources}
                        />
                    </Card>
                }
            </TableContainer>
        </ConfigProvider>
    )
}

export default ListTable