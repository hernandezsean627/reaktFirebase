import React from 'react';
import {auth} from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Login({ setIsAuth }) {
    const provider = new GoogleAuthProvider();

    let navigate = useNavigate();

    const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((then) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);

        navigate("/")

      })
    }

    return (
        <div className='loginPage'>
           <p>Sign In with  Google to Continue</p>
           <button className='login-with-google-btn' onClick={signInWithGoogle}  >Sign in with Google</button>
        </div>
    )
}

export default Login;