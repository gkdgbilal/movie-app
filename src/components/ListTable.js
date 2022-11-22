import React from 'react'
import {
    Card,
    ConfigProvider,
    Input,
    Table,
} from 'antd';

const ListTable = () => {
    return (
        <ConfigProvider componentSize="large">
            <div>
                <Card title="Movies">
                    <Table
                        columns={[
                            {
                                title: 'Name',
                                dataIndex: 'name',
                            },
                            {
                                title: 'Age',
                                dataIndex: 'age',
                            },
                        ]}
                        dataSource={[
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
                        ]}
                    >

                    </Table>
                </Card>
            </div>
        </ConfigProvider>
    )
}

export default ListTable