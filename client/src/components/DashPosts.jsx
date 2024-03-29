import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button, TableHead } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
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

  const handleDelete = async () => {
    // console.log(postIdToDelete);
    setShowModal(false);
    const res = await fetch(`/api/post/deletepost/${postIdToDelete}`,{
      method: 'DELETE'
    })
    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
    } else {
      setAllPost((prev) =>
        prev.filter((post) => post._id !== postIdToDelete)
      );
    }
  }

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

    if (currentUser.isAdmin) {
      // console.log("fetching");
      fetchPosts();
    }
  }, [currentUser._id]);

  // console.log(allPost);

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 pt-20">
      {currentUser.isAdmin && allPost.length > 0 ? (
        <>
          <h1 className="text-5xl text-center py-6 pb-14">Admin Access</h1>
          <Table hoverable className="shadow-lg p-8 ">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Author</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {allPost.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
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
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            You have not created any posts yet
          </h1>
          <p className="text-xl">
            Click the button below to create your first post
          </p>
          <Link to="/create-post">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4">
              Create Post
            </button>
          </Link>
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashPosts;
