import axios from "axios";

export const myaxios = axios.create({
    baseURL: 'http://localhost:8081'
})

export const signUp = ((user) => {
    console.log(user);
    return myaxios.post('/user/addUser', user)
        .then((response) => response.data)
})

export const imageUpload = ((image) => {
    const formData = new FormData();
    formData.append('file', image)

    return myaxios.post('/post/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => response.data)
})

export const postData = ((content) => {
    console.log(content);
    return myaxios.post('/post/addPost', content,{
        headers: {
            'Content-Type': 'application/json',
            'userId':'08041cd0-f0b8-4f43-9754-bda31ee387e8'
        }
    })
        .then((response) => response.data)
})

export const getCategoryWhileLoading=(()=>{
    return myaxios.post('/category/allCat').then((response)=> response.data)
})

export const getMyBlog=((userId,pageSize,pageNumber)=>{
    return myaxios.post(`/post/postByUserId/${userId}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    .then((response)=> response.data)
})

export const getOtherBlog=((userId,pageSize,pageNumber)=>{
    return myaxios.post(`/post/postByUserIdNot/${userId}?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    .then((response)=> response.data)
})
// export const allData = (token,pageSize,pageNumber) => {
//     //console.log(content);
//     return axios.post(`http://localhost:8081/post/allPost?pageSize=${pageSize}&pageNumber=${pageNumber}`,  {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer +${token}`
//         }
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// };