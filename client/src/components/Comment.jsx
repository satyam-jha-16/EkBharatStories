import React from 'react'
import moment from 'moment'

function Comment({comment}) {
    const [user, setUser] = React.useState({})
    // console.log(comment);
    React.useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`,{
                    method : "GET"
                })
                const data = await res.json()
                // console.log(data);
                if(res.ok){
                    setUser(data);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
        
    }, [comment])


    console.log(user);
    
    return (
    <div className='flex p-4 border-b dark:border-gray-400'>
        <div className="flex-shrink-0 mr-3">
            <img src={user.profilePic} alt={user.username} className='w-10 h-10 rounded-full bg-gray-400'/>
        </div>
        <div className="">
            <div className="flex gap-2 items-center mb-4">
                <span className='text-sm font-bold mr-1 truncate'>{user ? `@${user.username}` : "anonymous"}</span>
                <span className='text-sm text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment