import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Table, Button, TableHead } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
function Dashusers() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setuserIdToDelete] = useState("");

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
    console.log(userIdToDelete);
    setShowModal(false);
    try {
      // dispatch(deleteStart())
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
          method: 'DELETE'
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
      }
      
    } catch (error) {
        // dispatch(deleteFailure())
        console.log(error.message);
    }

    
  }

  useEffect(() => {
    // console.log(currentUser);
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      // console.log("fetching");
      fetchUsers();
    }
  }, [currentUser._id]);

//   console.log(allPost);

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <h1 className="text-5xl text-center py-6 pb-14">Users Database</h1>
          <Table hoverable className="shadow-lg p-8 ">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Profile Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              {/* <Table.HeadCell>Admin</Table.HeadCell> */}
              <Table.HeadCell>Delete</Table.HeadCell>
              
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    
                      <img
                        src={user.profilePic}
                        alt={user.username}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                   
                  </Table.Cell>
                  <Table.Cell>
                    
                      {user.username}
    
                  </Table.Cell>
                  
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        // setPostIdToDelete(post._id);
                        onclick = setuserIdToDelete(user._id);
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

export default Dashusers;