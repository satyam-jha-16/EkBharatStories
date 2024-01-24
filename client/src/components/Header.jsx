import React from "react";
import { Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "flowbite-react";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname;
  return (
      <Navbar className="border-b-2 bg-white border-gray-200 px-1 lg:px-6 py-7 shadow-lg">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-lg sm:text-3xl font-semibold dark:text-white"
          >
            <h1 className="px-2 py-1 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-lg text-blue-500">
              EkBharatStories
            </h1>
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
            <Button pill className="w-12 h-10 hidden sm:inline" color="gray">
              <FaMoon />
            </Button>
            <Link
              to="/signin"
              className="text-lg sm:text-xl"
            >
              <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
            </Link>
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
                <Navbar.Link active = {path === "/about"} >
                    <Link to="/about">
                        <h1 className="text-2xl font-normal">About</h1>
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
      </Navbar>

  );
};

export default Header;
