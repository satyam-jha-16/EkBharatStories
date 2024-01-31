import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, FooterDivider, TextInput, Textarea } from "flowbite-react";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {Modal} from 'flowbite-react'

function CommentSection({ postId }) {
    const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comment, setComment] = React.useState('')
  const [commentError, setCommentError] = React.useState(null)
  const [dbComments, setDbcomments] = React.useState([])
  const [showModel, setShowModel] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
//   console.log(dbComments);
  
  // console.log(currentUser);
  const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log('submitting');
    if(comment.length === 0 || comment.length>200) return
    try {
        const res = await fetch('/api/comment/create', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({content : comment, postId, userId : currentUser._id}),
        })
        const data = await res.json()
        if(res.ok){
            setComment('')
            setCommentError(null)
            setDbcomments([data, ...dbComments])
        }
        
    } catch (error) {
        setCommentError(error.message)
    }
  }
  useEffect(() => {
    const getComments = async () => {
        try {
            const res = await fetch(`/api/comment/getcomments/${postId}`,{
                method : "GET"
            })
            if(res.ok){
                const data = await res.json()
                setDbcomments(data)
            }
            
        } catch (error) {
            console.log(error.message);
            
        }

    }
    getComments()

  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setDbcomments(
          dbComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  // delete user function
  const handleDelete = async (commentId) => {
    try {
      if(!currentUser) {
        navigate('/signin');
        return;
      }
      
      const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: 'DELETE',
      })
      if(res.ok) {
        setDbcomments(dbComments.filter(comment => comment._id !== commentId))
        setShowModel(false)
      }
    } catch (error) {
      console.log(error.message);      
    }

  }
  // console.log(dbComments);
  return (
    <div className="max-w-2xl mx-auto p-3">
      {currentUser ? (
        <div className="flex item-center justify-center gap-1 my-5 text-gray-500 text-lg">
          <p>signedIn as: </p>
          <img
            src={currentUser.profilePic}
            alt=""
            className=" w-8 h-8 object-cover rounded-full"
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-cyan-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="">
          <Link to="/signin">
            <span className="text-red-500">Sign In</span> to comment
          </Link>
        </div>
      )}
      {currentUser && (
        <form className="border-teal-500 border rounded-lg p-4" onSubmit={handleSubmit}>
          <Textarea placeholder="Add a comment..." rows="3" maxLength="200" className="resize-none" onChange={(e) => {setComment(e.target.value)}} value={comment}/>
          <div className="flex justify-between mt-2 px-3">
            <p className="text-gray-500 text-md">{200 - comment.length} chars left</p>
            <Button gradientDuoTone='purpleToBlue' outline size='sm' type="submit">Submit</Button>
          </div>
          {
            commentError && <Alert color='failure' className='mt-2' show={commentError}>{commentError}</Alert>
          }
          
        </form> 
      )}
      {
        dbComments.length == 0? (
            <p>No comments yet</p>
        ) : (<>
            <div className="my-4 text-sm flex items-center gap-1">
                <p className="text-lg">Comments</p>
                <div className="border border-gray-300 py-1 px-2 ">
                    <p>{dbComments.length}</p>
                </div>
            </div>
            {
                dbComments.map(comment => (
                    <Comment 
                    key={comment._id}
                    comment = {comment}
                    // handleLike={handleLike}
                    onLike= {handleLike}
                    onDelete={(commentId)=>{
                      setShowModel(true)
                      setCommentToDelete(commentId)
                    }}
                    />
                ))
            }
            </>
        )
      }
       <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
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
              <Button color="failure" onClick={() =>{handleDelete(commentToDelete)}}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CommentSection;
