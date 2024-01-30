import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CommentSection from "../components/CommentSection";
function Post() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    // console.log(postSlug);

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
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

//   console.log(post);

  if (loading)
    return (
      <div className="pt-40">
        <Spinner
          size="xl"
          className="flex justify-center mx-auto items-center min-h-screen"
        ></Spinner>
      </div>
    );
  return (
    <div className="p-3 pt-32 flex flex-col max-w-6xl mx-auto min-h-screen">
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
      <div dangerouslySetInnerHTML={{__html:post && post.content}} className="p-8 max-w-2xl mx-auto w-full post-content">

      </div>
      <CommentSection  postId={post._id}/>
    </div>
  );
}

export default Post;
