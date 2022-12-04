import { Form, Input, InputNumber, Modal } from 'antd';
import React from 'react'

const EditForm = ({ imdbID, open, onUpdate, onCancel }) => {
    const movie = JSON.parse(localStorage.getItem("movieList"));
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const filteredMovie = movie.filter(movie => movie.imdbID === imdbID);

    return (
        <Modal
            open={open}
            title="Edit Movie"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onUpdate({
                            imdbID: imdbID,
                            Title: values.Title,
                            imdbRating: filteredMovie.imdbRating ? filteredMovie.imdbRating : values.imdbRating,
                            // Poster: values.Poster,
                            Year: filteredMovie.Year ? filteredMovie.Year : "N/A",
                            Actors: filteredMovie.Actors ? filteredMovie.Actors : "N/A",
                            Description: filteredMovie.Description ? filteredMovie.Description : "N/A",
                        });
                        onCancel();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Movie ID"
                    name={'imdbID'}
                >
                    <Input
                        disabled
                        placeholder={imdbID}
                    />
                </Form.Item>
                <Form.Item
                    label="Movie Name"
                    name={'Title'}
                    rules={[{ required: true }]}
                >
                    <Input
                        defaultValue={filteredMovie.Title}
                    />
                </Form.Item>
                <Form.Item
                    label="IMDB Point"
                    name={'imdbRating'}
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 10,
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                        defaultValue={filteredMovie.imdbRating}
                    />
                </Form.Item>
                <Form.Item
                    label="Year"
                    name={'Year'}
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: new Date().getFullYear(),
                        },
                    ]}
                >
                    <InputNumber
                        style={{
                            width: '100%',
                        }}
                        disabled
                        defaultValue={filteredMovie.Year}
                    />
                </Form.Item>
                <Form.Item
                    label="Actors"
                    name={'Actors'}
                >
                    <Input
                        disabled
                        defaultValue={filteredMovie.Actors}
                    />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name={'Description'}
                >
                    <TextArea rows={4} disabled
                        defaultValue={filteredMovie.Description}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default EditForm