import { EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import EditForm from './EditForm';
import { v4 as uuidv4 } from 'uuid';
import { addMovie, fetchMovies, updateMovie } from '../redux/services/movieService';
import { useDispatch } from 'react-redux';

const EditModal = ({ imdbID }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleModal = () => {
        setOpen(!open);
    };

    const updateDataHandler = (values) => {
        console.log("values", values);

        dispatch(updateMovie(
            values
        ))

        dispatch(fetchMovies());

    }

    return (
        <>
            <EditOutlined
                onClick={toggleModal}
                style={{
                    width: 30,
                    position: 'absolute',
                    top: 0,
                    right: 33,
                    fontSize: '1.5rem',
                    color: 'red',
                    cursor: 'pointer',
                    backgroundColor: '#CCC',
                    opacity: .5,
                    borderRadius: 5,
                }}
            />
            <EditForm
                imdbID={imdbID}
                open={open}
                onUpdate={updateDataHandler}
                onCancel={toggleModal}
            />
        </>
    )
}

export default EditModal