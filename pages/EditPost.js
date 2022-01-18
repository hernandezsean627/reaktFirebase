import React from 'react';
import '../App.css';
import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";


function EditPost({title,setTitle,postText,setPostText,setIsEdit,tempId}) {
    const updatePost = async (id ) => {
        const postDoc = doc(db, "posts", id)    
        await updateDoc(postDoc, {title:title, postText: postText})
   
    } 
   

    return (
        <div className='cpContainer' >
             
                      <h1>Update a Post </h1> 
                      <div className='inputGp'>
                     <label>Store Name:</label>
                     <input placeholder='Title ...' value={title} onChange={(event) => {
                         setTitle(event.target.value)
                     }}/>

                     </div>
                     <div className='inputGp'>
                     <label>Store Details:</label>
                     <textarea placeholder='Post ...' value={postText} onChange={(event) => {
                         setPostText(event.target.value)
                     }}/>

                </div>
                <button className='editButtons' onClick={() => {updatePost(tempId)}} >Submit</button>
                <button  className='editButtons' onClick={() => {
                   setIsEdit(false)
                   setTitle("")
                   setPostText("")
                }}>X</button>
                    
                  
        </div>
    )
}

export default EditPost;