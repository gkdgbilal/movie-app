import React from 'react'
import { Button, Form, Input, InputNumber, Modal, Radio } from 'antd';

export default function CreateForm({ open, onCreate, onCancel }) {
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

    return (
        <Modal
            open={open}
            title="Add Movie"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
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
                    label="Movie Name"
                    name={'Title'}
                    rules={[{ required: true }]}
                >
                    <Input />
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
                    />
                </Form.Item>
                <Form.Item
                    label="Year"
                    name={'Year'}
                    rules={[
                        {
                            required: true,
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
                    />
                </Form.Item>
                <Form.Item
                    label="Actors"
                    name={'Actors'}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name={'Description'}
                    rules={[{ required: true }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
