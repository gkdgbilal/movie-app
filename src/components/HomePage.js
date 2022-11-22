import React, { useState } from 'react'
import {
    Button,
    ConfigProvider,
    Form,
    Input,
    InputNumber,
    Modal,
    Upload,
} from 'antd';
import {
    MenuOutlined,
    PlusOutlined,

} from '@ant-design/icons';
import styled from 'styled-components';
import CreateForm from './CreateForm';

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const { TextArea } = Input;
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])
    const toggleModal = () => {
        setOpen(!open);
    };

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpen(false);
    };

    const info = () => {
        Modal.info({
            title: 'some info',
            content: 'some info',
        });
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
    `;

    const ButtonGroup = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin: 2rem;
    `;

    const InputContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 80%;
    `;

    return (
        <ConfigProvider componentSize="large">
            <Container>
                <ButtonGroup>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={toggleModal}
                    >
                        Add Movie
                    </Button>
                    <Button
                        type="primary"
                        icon={<MenuOutlined />}
                        onClick={() => console.log("fileList", fileList)}
                    >
                        Movie List
                    </Button>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </ButtonGroup>
                <InputContainer>
                    <Input.Search allowClear />
                </InputContainer>
                <CreateForm
                    open={open}
                    onCreate={onCreate}
                    onCancel={toggleModal}
                />
                {/* <Modal
                    centered
                    title="Add Movie"
                    open={open}
                    onCancel={toggleModal}
                    footer={null}
                >
                    <Form
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 20 }}
                        layout="horizontal"
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            label="Movie Name"
                            name={['movie', 'name']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="IMDB Point"
                            name={['movie', 'imdb']}
                            rules={[
                                {
                                    required: true,
                                    type: 'number',
                                    min: 0,
                                    max: 10,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Actors"
                            name={['movie', 'actors']}
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name={['movie', 'description']}
                            rules={[{ required: true }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Movie Image"
                            valuePropName="fileList"
                            name={['movie', 'Image']}
                            rules={[{ required: true }]}
                        >
                            <Upload action="/upload.do" listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Button
                            type="primary" htmlType="submit"
                            block
                        >
                            Add Movie
                        </Button>
                    </Form>
                </Modal> */}
            </Container>
        </ConfigProvider >
    )
}

export default HomePage