import React from "react";
import avatar from "../../assets/img/avatar.png";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className=" bg-[#e2edf5] py-4">
      <div className="navbar w-[90%] mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            Dobby Image Gallary
          </a>
        </div>
        <div className="flex-none">
          <h1 className="text-xl mr-3">{user?.name}</h1>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-[100px] rounded-full">
                <img src={avatar} alrt="profile picture" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={logOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
