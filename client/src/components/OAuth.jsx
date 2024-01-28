import React from "react";
import { Button } from "flowbite-react";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import {app} from "../firebase"
import {useDispatch} from "react-redux"
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom'

function OAuth() {
  const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            // console.log(resultsFromGoogle);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
              // console.log(res);
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
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
        onClick={handleGoogleClick}
      >
        Google Account
      </Button>
    </div>
  );
}

export default OAuth;
