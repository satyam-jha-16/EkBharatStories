import React from 'react'
import { useEffect, useState} from 'react';
import Postcard from './Postcard';

function NewsletterTarget() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
      }, []);


      console.log(post);

  return (
    <div>
        <div className='flex  border-4 border-green-400 rounded-xl justify-around p-5 items-center'>
            <div className=''>

            <h1 className='flex flex-wrap text-5xl w-max-4xl'>Checkout our weekly newsletter where we <br /> share news, events and much more</h1>
            <h2 className='text-2xl pt-5 w-max-3xl'>This is a platform where we bring along stories that unite our nation,
            Our weekly newsletter includes stories, <br /> folklores, News, and History that tries to represent us and our civilization 
            Checkout the post <br /> to find what makes us Ek Bharat and Shreshtha Bharat, Jai Hind..</h2>
            </div>
            <Postcard post={post} />
        </div>
    </div>
  )
}

export default NewsletterTarget