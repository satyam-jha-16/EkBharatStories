import React, { useState } from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { signInSuccess, signInStart, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


function Signin() {
  const [formData, setFormData] = useState({});
  // const [errormessage, setErrormessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error:errormessage} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields"))
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.error))
      }
      if (data.error) {
        dispatch(signInFailure(data.error))
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="mt-32 min-h-full lg:mt-24 dark:bg-black">
      <div className=" bg-slate-100 dark:bg-gray-700 lg:max-w-xl lg:mx-auto pt-32 pb-32 m-3 rounded-3xl shadow-lg">
        <h1 className="text-center  text-3xl">Welcome Back</h1>
        <form
          className="flex items-center flex-col flex-1"
          onSubmit={handleSubmit}
        >
          <div className="m-1 p-2 text-blue-600">Please Sign in using your email and password</div>
          <div className="m-1 lg:p-2">
            <Label>Your email</Label>
            <TextInput
              onChange={handleChange}
              className="text-center lg:w-96 shadow-sm"
              type="email"
              placeholder="naruto@konoha.com"
              id="email"
            />
          </div>
          <div className="m-1 lg:p-2">
            <Label>Password</Label>
            <TextInput
              onChange={handleChange}
              className="text-center lg:w-96 shadow-sm"
              type="password"
              placeholder="*******"
              id="password"
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            className="mt-2 w-32 lg:w-96 lg:h-11"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">loading ...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="text-center text-lg mt-2">
          <span>New Here </span>
          <Link to="/signup" className="underline text-blue-700">
            Sign up
          </Link>
        </div>
        {errormessage && (
          <Alert className="mt-3" color="failure">
            {errormessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Signin;
