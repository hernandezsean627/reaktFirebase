import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";



function CreatePost({isAuth}) {
   const [title, setTitle] = useState("");
   const [postText, setPostText] = useState("");

   const postsCollectionRef = collection(db, "posts");

   let navigate = useNavigate();

   const createPost = async () => {
       await addDoc(postsCollectionRef, {title, postText, author: {name : auth.currentUser.displayName , id: auth.currentUser.uid } })
       navigate("/");
   };


    return (
        <div className='createPostPage'>
         
            <div className='cpContainer'>
               {isAuth ?  <>
                <h1>Create A Post </h1> 
                <div className='inputGp'>
                     <label>Title:</label>
                     <input placeholder='Title ...' onChange={(event) => {
                         setTitle(event.target.value)
                     }}/>

                </div>
                <div className='inputGp'>
                     <label>Post:</label>
                     <textarea placeholder='Post ...'  onChange={(event) => {
                         setPostText(event.target.value)
                     }}/>

                </div>
                <button onClick={createPost} >Submit</button>

               
               </> : <>
               
                 <h1>Please Log in</h1>
               
               </>  }
              
            </div>
        </div>
    )
}

export default CreatePost;