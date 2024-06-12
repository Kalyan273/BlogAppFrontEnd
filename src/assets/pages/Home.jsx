import Base from "../../component/Base"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getMyBlog } from "../../services/Service";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getOtherBlog } from "../../services/Service";
import SomeThingWentWrong from "../../component/SomeThingWentWrong";
import Loader from "../../component/Loader";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { logout, isAuthenticated, user, loginWithPopup, getAccessTokenSilently } = useAuth0();
    const token=sessionStorage.getItem('token')
    useEffect(() => {
        
        console.log(token);
        const getBlog = async () => {
            try {
                const data = await getOtherBlog('08041cd0-f0b8-4f43-9754-bda31ee387e8', 8, 0);
                console.log(data.postDto);
                if (data.code === 200) {
                    setPosts(data.postDto)
                } else {
                    console.error('Failed to fetch post data');
                    setError('Failed to fetch post data');
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setError('Error fetching category data');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }

        getBlog();
    }, [isAuthenticated,token])


    const handleClick = (post) => {
        console.log(post);
        navigate('/blogView', { state: post })
    }

    if (loading) {
        // Display loader while content is being fetched
        return (
            <>
                <Loader />
            </>
        );
    } else if (error) {
        return (
            <>
                <Base>
                    <SomeThingWentWrong />
                </Base>
            </>)
    } else {

        return (

            <>
                <Base>
                    <div className="container fluid">
                        <div className="row my-2">
                            {posts.map(post => (
                                <div className="col-sm-12 col-md-4" key={post.postId}>
                                    <Card onClick={() => handleClick(post)} className="mb-3" style={{ cursor: 'pointer' }}>
                                        <Card.Img variant="top" src={`http://localhost:8081/download?fileName=${post.imageName}`} width={100} />
                                        <Card.Body>
                                            <Card.Title>{post.title}</Card.Title>
                                            <Card.Text>
                                                {post.content}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </Base>
            </>

        )
    }
}

export default Home