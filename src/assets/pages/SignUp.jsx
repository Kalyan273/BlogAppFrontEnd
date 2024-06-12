import Base from "../../component/Base";
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { signUp } from "../../services/Service";
import { toast } from "react-toastify";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        about: '',
        roleId: 1
    })

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log(formData);
    }, [formData])


    const handleChange = ((event, fieldName) => {
        //dynamic setting the value of form
        setFormData({ ...formData, [fieldName]: event.target.value })
    })

    const resetData = (() => {
        setFormData({
            email: '',
            password: '',
            name: '',
            about: ''
        })
    })


    const formSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        signUp(formData).then((resp) => {
            console.log(resp);
            console.log("success");
            toast.success("user registered")
        }).catch((error) => {
            console.log(error);
        })
        setValidated(true);

    }

    // const uploadImage =((event)=>{
    //     console.log(event)
    // })
    return (
        <>
          
                <div className="container-fluid" style={{ backgroundImage: `url('https://picsum.photos/900/180')`, backgroundSize: 'cover', backdropFilter: 'blur(5px)' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Card className="my-2">
                                <CardImg
                                    alt="Card image cap"
                                    src="https://picsum.photos/900/180"
                                    style={{
                                        height: 180
                                    }}
                                    top
                                    width="100%"
                                />
                                <CardBody>
                                    <CardTitle tag="h5">
                                        Fill the Form to Register Yourself !!
                                    </CardTitle>
                                    <Form noValidate validated={validated} onSubmit={formSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6" >
                                                <Form.Label htmlFor="exampleEmail">
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                    id="exampleEmail"
                                                    name="email"
                                                    // placeholder="with a placeholder"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleChange(e, 'email')}

                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" >
                                                <Form.Label htmlFor="examplePassword">
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    id="examplePassword"
                                                    name="password"
                                                    // placeholder="password placeholder"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => handleChange(e, 'password')}
                                                />

                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="exampleUserName">
                                                    Username
                                                </Form.Label>
                                                <Form.Control
                                                    id="exampleUserName"
                                                    name="username"
                                                    // placeholder="with a placeholder"
                                                    type="username"
                                                    value={formData.name}
                                                    onChange={(e) => handleChange(e, 'name')}
                                                />

                                            </Form.Group>

                                            <Form.Group as={Col} md="12">

                                                <div className="position-relative mb-3">
                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Tell About Yourself</label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={formData.about} onChange={(e) => handleChange(e, 'about')}></textarea>
                                                </div>
                                            </Form.Group>
                                            <Form.Group as={Col} md="12" className="position-relative mb-3">
                                                <Form.Label>Upload Profile Picture</Form.Label>
                                                <Form.Control
                                                    id="exampleFile"
                                                    name="file"
                                                    type="file"
                                                    onSelect={(e) => uploadImage(e)}

                                                />

                                            </Form.Group>

                                        </Row>
                                        <div className="d-inline">
                                            <Button type="submit" className="btn btn-dark">
                                                Register
                                            </Button>
                                            <Button color="secondary" type="reset" className="ms-2"
                                                onClick={resetData}>
                                                Reset
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            
        </>
    );
};

export default SignUp