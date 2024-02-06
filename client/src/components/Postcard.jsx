// import React from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

function Postcard({post}) {
  console.log(post);
  console.log(post.slug);
  return (
    <div className='group relative w-full lg:w-[500px] border border-blue-500 h-[350px] overflow-hidden rounded-xl transition-all mt-5' >
        <Link to={`/post/${post.slug}`}>
            <img src={post.image} alt={post.title} className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-150 z-20'/>
        </Link>
        <div className="p-3 flex flex-col gap-3">
            <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
            <span className='text-sm italic'>{post.author}</span>
            <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute p-3 bottom-[-200px] left-0 right-0 border border-blue-500 text-blue-500 group-hover:text-white group-hover:bg-blue-500 transition-all duration-300 text-center py-2 rounded-lg !rounded-tl-none m-2'>
                Read Article
            </Link>
        </div>
    </div>
  )
}

export default Postcard