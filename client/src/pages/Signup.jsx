import React, { useState } from 'react'
import {Label, TextInput, Button, Alert, Spinner} from "flowbite-react"
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

function Signup() {
  const [formData, setFormData] = useState({})
  const [errormessage, setErrormessage] = useState(null) 
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()
  function handleChange(e){
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!formData.username  || !formData.email  || !formData.password ){
      return setErrormessage("Please fill out all the fields")
    }
    try {
      setLoading(true)
      setErrormessage(null)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        setErrormessage(data.message)
      }
      if(data.error){
        setErrormessage(data.error)
      }
      setLoading(false)
      if(res.ok){
        navigate("/signin")
      }
    } catch (error) {
      setErrormessage(error.message);
      setLoading(false)
    }

  }
  return (
    <div className='min-h-full mt-32 lg:mt-52'>
      <div className=' bg-slate-100 lg:max-w-xl lg:mx-auto pt-9 pb-16 m-3 rounded-3xl shadow-lg'>
        <h1 className='text-center text-3xl'>Create Account</h1>
        <form className='flex items-center flex-col flex-1' onSubmit={handleSubmit}>
          <div className='m-1 lg:p-2'>
          <Label>Your Username</Label>
          <TextInput 
          onChange={handleChange}
          className='text-center lg:w-96 shadow-sm'
          type='text'
          placeholder='uzumaki naruto'
          id='username'
          />
          </div>
          <div className='m-1 lg:p-2'>
          <Label>Your email</Label>
          <TextInput 
          onChange={handleChange}
          className='text-center lg:w-96 shadow-sm'
          type='email'
          placeholder='naruto@konoha.com'
          id='email'
          />
          </div>
          <div className='m-1 lg:p-2'>
          <Label>Set password</Label>
          <TextInput 
          onChange={handleChange}
          className='text-center lg:w-96 shadow-sm'
          type='password'
          placeholder='*******'
          id='password'
          />
          </div>
          <Button
          gradientDuoTone='purpleToPink'
          type="submit"
          className='mt-2 w-32 lg:w-96 lg:h-11'
          >
            {
              loading ? (
                <>
                <Spinner size="sm" />
                <span className='pl-3'>loading ...</span>
                </>  
              ) : "Create Account"
            }
          </Button>
          <OAuth />
        </form>
        <div className='text-center text-lg mt-2'>
          <span>have an account  </span>
          <Link to="/signin" className='underline text-blue-700'>signin</Link>
        </div>
        {errormessage && (
          <Alert className='mt-3' color='failure'>
            {errormessage}
          </Alert>
        )}
      </div>
    </div>
  )
}

export default Signup