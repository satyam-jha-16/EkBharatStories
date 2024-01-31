import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button, TableHead } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
function Dashcomments() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...comments.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    // console.log(postIdToDelete);
    console.log(commentIdToDelete);
    setShowModal(false);
    try {
      // dispatch(deleteStart())
      const res = await fetch(`/api/comment/deletecomment/${commentIdToDelete}`, {
          method: 'DELETE'
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      }
      
    } catch (error) {
        // dispatch(deleteFailure())
        console.log(error.message);
    }

    
  }

  useEffect(() => {
    // console.log(currentUser);
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments");
        const data = await res.json();
        if (res.ok) {
          setComments(data);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      // console.log("fetching");
      fetchComments();
    }
  }, [currentUser._id]);

//   console.log(allPost);

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mt-16">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <h1 className="text-5xl text-center py-6 pb-14">Users Database</h1>
          <Table hoverable className="shadow-lg p-8 ">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>total likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.content}                   
                  </Table.Cell>
                  <Table.Cell>
                    {comment.noOfLikes}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        // setPostIdToDelete(post._id);
                        onclick = setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {/* {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )} */}
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
          Fetching Admin data. Please wait ....
          </h1>
          <p className="text-xl">
            if this takes too long, please contact the admin
          </p>
          
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
              Are you sure you want to delete this comment?
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

export default Dashcomments;
