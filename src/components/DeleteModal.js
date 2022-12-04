import React from 'react'
import { message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { fetchMovies, deleteMovie } from '../redux/services/movieService';

const DeleteModal = ({ imdbID }) => {
    const dispatch = useDispatch();

    const confirm = async (e) => {
        await dispatch(deleteMovie(imdbID));
        dispatch(fetchMovies())
        message.success('Movie deleted');
    };

    return (
        <Popconfirm
            placement="top"
            title="Are you sure to delete this movie?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <DeleteOutlined
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
                    borderRadius: 5,
                }}
            />
        </Popconfirm>
    )
}

export default DeleteModal