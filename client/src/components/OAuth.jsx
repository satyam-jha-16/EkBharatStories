import React from "react";
import { Button } from "flowbite-react";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import {app} from "../firebase"
import {useDispatch} from "react-redux"
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const HandleGoogleClick = async() =>{
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"})

        try {
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photoUrl : result.user.photoURL
                })

            })
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }


    }

  return (
    <div>
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        className="mt-2  lg:w-96 lg:h-11"
        onClick={HandleGoogleClick}
      >
        Google Account
      </Button>
    </div>
  );
}

export default OAuth;
