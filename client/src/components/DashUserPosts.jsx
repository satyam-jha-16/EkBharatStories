import React, { useEffect } from 'react'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { Modal, Table, Button, TableHead } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

function DashUserPosts() {

  const currentUser = useSelector((state) => state.user.currentUser);
  const [userPost, setUserPost] = useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.length < 9) {
            // setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    if(currentUser._id){
      fetchPosts()
    } 
  },[currentUser._id])
  console.log(userPost);

  
  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    console.log(postIdToDelete);
    setShowModal(false);
    const res = await fetch(`/api/post/deletepost/${postIdToDelete}`,{
      method: 'DELETE'
    })
    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
    } else {
      setUserPost((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
      );
    }
  }


  
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {
        currentUser._id && userPost.length > 0 ? (
          <>
          <Table hoverable className='shadow-lg'>
            <Table.Head>
              <Table.HeadCell >Date Updated</Table.HeadCell>
              <Table.HeadCell >Post Image</Table.HeadCell>
              <Table.HeadCell >Post Title</Table.HeadCell>
              <Table.HeadCell >Author</Table.HeadCell>
              <Table.HeadCell >Delete</Table.HeadCell>
              <Table.HeadCell >
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {
              userPost.map((post) => (
                <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='lg:w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.author}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>

              ))
            }

          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}

          </>
        ) : (
          <div className='text-center'>
            <h1 className='text-3xl font-semibold'>You have not created any posts yet</h1>
            <p className='text-xl'>Click the button below to create your first post</p>
            <Link to='/create-post'>

            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg mt-4'>Create Post</button>
            </Link>
          </div>
        )
      }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    )
  }

export default DashUserPosts