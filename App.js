import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth"

import { auth } from "./firebase-config";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

 

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      
      window.location.pathname = "/login";

    })
  }

  return (
     <Router>
       <nav>
         <Link to="/"> Home </Link>
        
        {isAuth ?  
        <>
        <Link to="/createpost"> Create Store</Link>  
        <button onClick={signUserOut}>Logout</button> 
      
        </>
        : <>
        <Link to="/login"> Login </Link> 
       
        </>
        }
       </nav>
       <h1>{process.env.H1KEY}</h1>
         <Routes>
           <Route path="/" element={<Home   isAuth={isAuth} auth={auth}/>}/>
           <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
           <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}/>

           
         </Routes>
     </Router>
  );
}

export default App;
