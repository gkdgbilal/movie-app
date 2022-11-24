import React from 'react'
import { message, Popconfirm } from 'antd';

const DeleteModal = () => {

    const confirm = (e) => {
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        message.error('Click on No');
    };

    return (
        <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <a href="/">Delete</a>
        </Popconfirm>
    )
}

export default DeleteModal