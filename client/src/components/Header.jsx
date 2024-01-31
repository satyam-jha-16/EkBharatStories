import React from "react";
import { Avatar, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "flowbite-react";
import { FaMoon } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux"
import { setTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import logo from '../assets/logo.png'

const Header = () => {
  const navigate = useNavigate();
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const handleSignout = async () => {
      try {
          const res = await fetch('/api/user/signout', {
              method:"POST"
          })
          const data = res.json()
          if(!res.ok){
              console.log("unable to signout");
          } else{
              dispatch(signoutSuccess())
              navigate("/signin")
          }
      } catch (error) {
          console.log(error.message)
      }
    }
  return (
    <div className="shadow-lg z-50 top-0 fixed w-full mb-32 ">
      <Navbar className="border-b-2 bg-white border-gray-200 px-1 lg:px-6 py-7 ">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm lg:text-2xl font-semibold dark:text-white"
          >
            {/* <h1 className="px-2 py-1 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-lg text-blue-500">
              EkBharatStories
            </h1> */}
            <img src={logo} className="w-28 h-28" />
          </Link>
          <form>
            <TextInput
              shadow
              sizing="md"
              type="text"
              placeholder="Search ..."
              rightIcon={AiOutlineSearch}
              className="hidden lg:inline "
            />
          </form>
          <Button className="w-12 h-10 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
          </Button>

          <div className="flex gap-2 md:order-2">
            <Button pill className="w-12 h-10 hidden sm:inline" color="gray" onClick={() =>{dispatch(setTheme())}}>
              <FaMoon />
            </Button>
            {currentUser ? (
              <Dropdown arrowIcon={false}
              inline
              label={

                <Avatar
                alt="user" 
                img={currentUser.profilePic}
                rounded
                />
              }
              >
                <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item  onClick={handleSignout}>Sign out</Dropdown.Item>              
                
              </Dropdown>
            ):(
              <Link
              to="/signin"
              className="text-lg sm:text-xl"
            >
              <Button gradientDuoTone="purpleToBlue" outline size='sm'>Sign In</Button>
            </Link>
            )}
            
            <Navbar.Toggle />
          </div>
            <Navbar.Collapse>
                <Navbar.Link active = {path === "/"} as={'div'}>
                    <Link to="/"

                    >
                        <h1 className="text-2xl font-normal">Home</h1>
                    </Link>
                </Navbar.Link>
                <Navbar.Link active = {path === "/newsletter"} as={'div'}>
                    <Link to="newsletter">
                        <h1 className="text-2xl font-normal">News Letter</h1>
                    </Link>
                </Navbar.Link>
                {
                  currentUser && (
                    <Navbar.Link active = {path === "/create-post"} as={'div'}>
                    <Link to="create-post">
                        <h1 className="text-2xl font-normal">Create Post</h1>
                    </Link>
                </Navbar.Link>

                  )
                }
                
                <Navbar.Link active = {path === "/about"} as={'div'}>
                    <Link to="/about">
                        <h1 className="text-2xl font-normal">About</h1>
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
      </Navbar>
      </div>

  );
};

export default Header;
