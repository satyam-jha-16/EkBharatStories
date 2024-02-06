import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button, TableHead } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import NewsletterTarget from "../components/NewsletterTarget";
import Postcard from "../components/Postcard";
function DashPosts() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [allPost, setAllPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const handleShowMore = async () => {
    const startIndex = allPost.length;
    try {
      const res = await fetch(
        `/api/post/getposts?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setAllPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  useEffect(() => {
    // console.log(currentUser);
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        if (res.ok) {
          setAllPost(data.posts);
          if (data.posts.length < 9) {
            // setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };


      // console.log("fetching");
      fetchPosts();
    
  }, []);

  // console.log(allPost);

  return (
    <>
    <div className="md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 pt-60">
      <h1 className="text-2xl lg:text-5xl pb-20">Welcome to EkBharatStories: Stories that unite </h1>
      <div className="hidden lg:block"><NewsletterTarget /></div>
    </div>
      <div className="border-4 border-gray-500 rounded-2xl w-full my-10"></div>
      <div className="flex flex-col items-center my-5 min-w-full">
        <h1 className="text-5xl font-bold mt-5 text-center m-10">Share and Explore your stories</h1>
        <div className="flex flex-wrap gap-4 justify-around">
          {
            
            allPost && allPost.map(post => (
              
              <Postcard key={post._id} post= {post} />
            ))
          }
        
      </div>
    </div>
    </>
  );
}

export default DashPosts;
