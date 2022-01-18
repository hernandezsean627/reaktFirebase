import React, { useEffect, useState } from 'react';
import { addDoc, getDocs, collection, deleteDoc, doc} from "firebase/firestore";
import { db } from "../firebase-config";
import EditPost from './EditPost';
import '../App.css';



function Home( {isAuth, auth}) {
    const [title, setTitle] = useState("");
    
    const [postText, setPostText] = useState("");
    const [tempId, setTempId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    const [branchName, setBranchName] = useState("");
    const [branchBody, setBranchBody] = useState("");  
    const [parentId, setParentId] = useState("");  
    const [addBranch, setAddBranch] = useState(false);
    const subPostsCollectionRef = collection(db, "subPosts");
    const [subPostList, setSubPostList] = useState([]);

    

   useEffect(() => {
       const getPosts = async () => {
           const data = await getDocs(postsCollectionRef);
           setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
       };

       getPosts();
   }) 

   //SubPostList
   useEffect(() => {
       const getSubPosts = async () => {
           const data = await getDocs(subPostsCollectionRef);
           setSubPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
       };

       getSubPosts();
   }) 

   const addSubPost = async (post) => {
        setParentId(post.id);
        setTempId(post.id);
        setAddBranch(true)
        
   }
   const choosePost = async (post) => {
        setTempId(post.id);
        setTitle(post.title);
        setPostText(post.postText);
        setIsEdit(true)
   }

   const deletePost = async (id) => {
       const postDoc = doc(db, "posts", id )
       await deleteDoc(postDoc);
   }

   
   const createSubPost = async () => {
   
    await addDoc(subPostsCollectionRef, {branchName, branchBody, parentId, author: {name : auth.currentUser.displayName , id: auth.currentUser.uid } });
    setAddBranch(false);
    setBranchBody("");
    setBranchName("");
    setTempId("");
   
    
   };


   
    return (
        <div className='homePage'>

                
               {isAuth && isEdit ?  <>
                   <div >
               
                   
                      <EditPost   title={title}  setTitle={setTitle} postText={postText} setPostText={setPostText} setIsEdit={setIsEdit} tempId={tempId} />
                                          
                   
                                      
                   
                   </div>

               
               </> : <>
               
                 <></>
               
               </>  }
            
        
            {postLists.map((post) => {
                return (
                    <div className='post'>
                        <div className='postHeader'>
                           <div className='title'>
                               <h1>{post.title}</h1>
                           </div>
                           {isAuth && post.author.id === auth.currentUser.uid ? <>
                                                                                                            
                           
                            <div className='deletePost'>
                               <button onClick={() => {deletePost(post.id)}}> &#128465; </button>
                           </div>
                            
                           
                           
                           </>
                           
                           : <>
                           
                           </>   }
                          
                        </div>
                        <div className='postTextContainer'>
                             <h5>{post.postText}</h5>

                        </div>
                        <button className='button' onClick={() => {addSubPost(post)}}> Add Branch </button>
                        <button className='buttonUpdate'  onClick={() => {choosePost(post)}}> Update </button>
                        <p>{post.author.name}</p>
                        {addBranch && post.id === tempId ? <>

                            <div className='subPostEntry'> 
                             <h3>Add a branch</h3>
                            <input className='inputSubPost'   placeholder='Name ...' onChange={(event) => {setBranchName(event.target.value)}}/>
                            <input className='inputSubPost'  placeholder='Details ...' onChange={(event) => {setBranchBody(event.target.value)}}/>
                            <button className='buttonSubmit'  onClick={createSubPost}>Create Branch</button>
                            <button className='button' onClick={() => {
                               setAddBranch(false);
                               setBranchBody("");
                               setBranchName("");
                               setTempId("")
                            }}> X </button>
                            </div>
                        
                        </> : <>
                        
                        </> }
                        {subPostList.map((subPost) => {
                           return (<div>
                               {subPost.parentId === post.id ? <>
                                  <p><b>{subPost.branchName}</b></p>
                               </> : <>
                               
                               </>}
                                
                            </div>)
                        })}
                       
                    </div>
                )
            })}
            
           
           
             
        </div>
    )
}

export default Home;