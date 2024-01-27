import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.user.currentUser);
  const filePickRef = React.useRef();
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
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
          setImageUrl(downloadURL);
          setFormData({ ...formData, profilePic: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
    }
    if(imageFileUploading){
        return
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="mx-w-lg mx-auto w-full p-3">
      <h1 className="py-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          className="p-5 hidden"
          onChange={handleImageChange}
          ref={filePickRef}
        />
        <div
          className="w-48 h-48 self-center relative cursor-pointer overflow-hidden"
          onClick={() => {
            filePickRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              className="w-full h-full"
              styles={{
                root: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || user.profilePic}
            alt="..."
            className={`rounded-full w-full h-full object-cover border-2 border-[white] shadow-x ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          label="Name"
          placeholder="username"
          defaultValue={user.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          label="email"
          placeholder="email"
          defaultValue={user.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          label="password"
          placeholder="password"
          defaultValue={""}
          onChange={handleChange}
        />
        <Button
          type='submit'
          color="primary"
          gradientDuoTone={"purpleToBlue"}
          outline
          className="self-center"
        >
          Update
        </Button>
      </form>
      <div className="flex justify-between pt-9">
        <span className="cursor-pointer text-red-600">Delete Account</span>
        <span className="cursor-pointer text-blue-600">Sign Out</span>
      </div>
      {
        updateUserSuccess && <Alert className="mt-5" color="success">{updateUserSuccess}</Alert>
      }
    </div>
  );
}

export default Profile;
