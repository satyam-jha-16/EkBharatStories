import React from 'react'
import ReactQuill from 'react-quill';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import 'react-quill/dist/quill.snow.css';
import {Alert, Button, FileInput, TextInput} from 'flowbite-react'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useNavigate} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function CreatePost() {

  const navigate = useNavigate()

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  // console.log(formData);
  const handleImageChange = (e) => {
    // console.log('uploading image')
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  }
  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);
  const uploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploading(true)
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploading(false);
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );

        setImageFileUploadProgress(null);
        setFile(null);
        setImageUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // setImageUrl(downloadURL);
          // console.log(imageUrl);
          setFormData({ ...formData, image: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(imageFileUploading){
      return
    }
    try {
      
      const res = await fetch(`api/post/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (!res.ok) {
        console.log("failed to create post");
        setPublishError(data.message);
      } else {
        // console.log("Post created Successfully");
        navigate(`/post/${data.slug}`)
        setPublishError(null);
      }

    } catch (error) {
      
    }
  }



  return (
    <div className='py-40 px-20 mx-auto min-h-screen '>
        <h1 className='text-center text-4xl py-7'>Post Something</h1>
        <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 md:flex-row justify-between '>
                <TextInput 
                type='text'
                placeholder='Title'
                required  
                id='title'
                className='flex-1'
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
                />
                <TextInput 
                type='text'
                placeholder='Author/Anonymous'
                id='author'
                onChange={(e) => {
                  setFormData({ ...formData, author: e.target.value });
                }}
                />                
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={handleImageChange}/> 
                <Button type='button' gradientDuoTone='purpleToPink' outline onClick={handleSubmit} >
                  {
                    imageFileUploadProgress?(
                      <div className='w-16'>
                        <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress || 0}%`} />
                      </div>
                    ) : (
                      <h1>Upload Image</h1>

                    )
                  }
                  
                </Button>
            </div>
            {
              imageFileUploadError && (
                <Alert color='failure'>{imageFileUploadError}</Alert>
              )
            }{
              formData.image &&(
                <img src={formData.image} alt="uploaded image" className='px-96 w-full h-full'/>
              )
            }
            <ReactQuill theme="snow" placeholder='Your Thoughts' className='pb-12 h-96' required
             onChange={(value)=>{
              setFormData({ ...formData, content: value })
            }}
            />
            <Button type='submit' gradientDuoTone='purpleToPink' outline size='lg'>Publish</Button>
            {
              publishError &&
                (
                  <Alert color='failure' >{publishError}</Alert>
                )
              }
            
        </form>
    </div>
  )
}

export default CreatePost