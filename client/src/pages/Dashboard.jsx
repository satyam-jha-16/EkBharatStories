import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Profile from '../components/Profile'
import DashPosts from '../components/DashPosts'
import DashUserPosts from '../components/DashUserPosts'
import Dashusers from '../components/Dashusers'


function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabfromUrl = urlParams.get('tab')
    if(tabfromUrl) setTab(tabfromUrl)

  },[location.search])
  return (
    <div className='pt-32 min-h-screen flex flex-col md:flex-row '>
      <div>
        {/* sidebar */}
        <SideBar />
      </div>

      <div className='mx-auto'>
        {/* tab-bar */}
        {tab === 'profile' && <Profile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'userposts' && <DashUserPosts />}
        {tab === 'users' && <Dashusers />}
      </div>
      
    </div>
  )
}

export default Dashboard