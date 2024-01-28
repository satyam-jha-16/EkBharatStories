import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {useSelector} from 'react-redux'

function SideBar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromUrl = urlParams.get("tab");
    if (tabfromUrl) setTab(tabfromUrl);
  }, [location.search]);
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-3">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
            active={tab === "posts"}
            icon={HiDocumentText}
            >
              Your Posts
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            labelColor="dark"
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
