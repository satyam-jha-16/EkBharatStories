import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CommentSection from "../components/CommentSection";
import Postcard from "../components/Postcard";
function Newsletter() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    // console.log(postSlug);

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=naruto`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          // log(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch('/api/post/getposts?limit=4') 
        // REMEBER TO UPDATE THIS BY CREATING AN EBSB WEEKLETTER ACCOUNT
        const data = await res.json();
        if(res.ok){
          setRecentPosts(data.posts)
        }        
      }
      fetchRecentPosts()
    } catch (error) {
      console.log(error);
      
    }
  }, [])

//   console.log(post);

  if (loading)
    return (
      <div className="pt-48">
        <Spinner
          size="xl"
          className="flex justify-center mx-auto items-center min-h-screen"
        ></Spinner>
      </div>
    );
  return (
    <div className="p-3 pt-48 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h2 className="text-2xl text-center text-red-500">Ek Bharat Newsletter: weekly edition for 7-feb-2024 </h2>
      <h1 className="text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-5xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.userId}`}
        className="self-center m-5 mb-10 text-2xl"
      >
        <Button color="gray" pill size='md'>
          {post && post.author}
        </Button>
      </Link>
      <img src={post && post.image} alt={post.title} />
      <div className="flex justify-between pb-3 border-b border-gray-500 mx-auto w-full max-w-2xl text-sm lg:text-lg ">
        <p className="text-justify text-lg mt-10 px-10 italic">{
            post && new Date(post.createdAt).toLocaleDateString()
        }</p>
        <p className="text-justify text-lg mt-10 px-10 italic">{
            (post.content.length /100).toFixed(0)
        } mins read</p>
      </div>
      <div dangerouslySetInnerHTML={{__html:post && post.content}} className="p-8 max-w-full mx-auto w-full post-content">

      </div>
      <br />
      <div className="border-b border-gray-600"></div>
      <CommentSection  postId={post._id}/>
      <div className="flex flex-col items-center my-5 min-w-full">
        <h1 className="text-xl mt-5 text-center mb-8">Explore more</h1>
        <div className="flex flex-wrap gap-4 justify-around">
          {
            recentPosts && recentPosts.map(post => (
              <Postcard key={post._id} post= {post} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
