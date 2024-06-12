import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Base from '../../component/Base';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect, useRef } from 'react';
import { getCategoryWhileLoading, imageUpload } from "../../services/Service";
import { postData } from '../../services/Service';
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";



const AddBlog = (() => {

    const navigate = useNavigate();

    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        catId: '',
        imageName: ''
    })



    useEffect(() => {
        console.log(postForm);
    }, [postForm])

    const handleChange = ((e, fieldName) => {

        setPostForm({ ...postForm, [fieldName]: e.target.value })

    })



    const formSubmit = (event) => {
        event.preventDefault();
        if (postForm.title && postForm.catId && postForm.content && postForm.imageName) {
            event.stopPropagation();
            postData(postForm).then((resp) => {
                console.log(resp);
                toast.success("Blog Posted",{ autoClose: 3000 })
                if (resp.code === 200) {
                    setTimeout(() => {
                        navigate('/blogs');
                    }, 4000);
                }
            }).catch((error) => {
                console.log(error);
            })
        } else {
            toast.warning("please fill all the field")
        }


    }


    const [previewSrc, setPreviewSrc] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
            imageUpload(file).then((resp) => {
                if (resp.code === 200) {
                    console.log(resp);
                    setPostForm({ ...postForm, imageName: resp.imageName })
                }

            })

        }
    };

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCat = async () => {
            const data = await getCategoryWhileLoading();
            console.log(data);
            if (data.code === 200) {
                setCategories(data.category)
            } else {
                console.error('Failed to fetch category data');
            }
        }

        fetchCat();
    }, [])





    // useEffect(() => {
    //     console.log(categories);
    // }, [categories])



    return (

        <>
            <Base>
                <div style={{ backgroundImage: `url('https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9&s=ce40ce8b8ba365e5e6d06401e5485390')`, backgroundSize: 'cover', backdropFilter: 'blur(1px)' }}>
                    <div className="container-xl " >

                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <Card >
                                    <Card.Img variant="top"/>
                                    <Card.Body>
                                        <Card.Title>Present Your Thought !!</Card.Title>
                                        <Form noValidate onSubmit={formSubmit}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Post Title</Form.Label>
                                                <Form.Control type="textarea" placeholder='Enter Here'
                                                    required
                                                    value={postForm.title}
                                                    onChange={(e) => handleChange(e, 'title')} />
                                            </Form.Group>
                                            <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Post Content</Form.Label>
                                                <Form.Control as="textarea" rows={6} placeholder='Enter Here'
                                                    required
                                                    value={postForm.content}
                                                    onChange={(e) => handleChange(e, 'content')}
                                                />
                                                {/* <JoditEditor
                                                    ref={editor}
                                                    value={postForm.content}
                                                    tabIndex={6} // tabIndex of textarea
                                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                    onChange={(e) => {setPostForm({...postForm,content:e.innerHTML})}}
                                                /> */}
                                            </Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                required
                                                className="mb-5"
                                                placeholder="Selete The Category"
                                                aria-label="Default select example"
                                                onChange={(e) => handleChange(e, 'catId')}

                                            >
                                                <option value="">Select One</option>
                                                {/* <option>Selete The Category</option> */}
                                                {categories.map(category => (
                                                    <option key={category.catId} value={category.catId}>
                                                        {category.categoryTitle}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Group as={Col} md="12" className="position-relative mb-3">
                                                <Form.Label>Upload Picture</Form.Label>
                                                <Form.Control
                                                    required
                                                    id="exampleFile"
                                                    name="file"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                            </Form.Group>
                                            <div className="col-md-6 offset-md-3">
                                                {previewSrc && (
                                                    <img
                                                        id="preview-image"
                                                        src={previewSrc}
                                                        alt="Preview Image"
                                                        className="img-thumbnail"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Button type="submit" variant="dark">Publish</Button>
                                            </div>
                                        </Form>

                                    </Card.Body>
                                </Card>
                            </div>


                        </div>
                    </div>
                </div>
            </Base>
        </>
    )
})

export default AddBlog