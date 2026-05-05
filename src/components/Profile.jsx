import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const Profile = () => {
  const { user, logOut } = useAuth();
  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          {/* Avatar */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="profile"
              />
            </div>
          </div>

          {/* Dropdown */}
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56 space-y-1"
          >
            {/* Name */}
            <li>
              <p className="font-semibold">{user?.displayName || "User"}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </li>

            <div className="divider my-1"></div>

            {/* Dashboard */}
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {/* ⭐ Be Decorator (only normal user) */}
            {user?.role !== "decorator" && (
              <li>
                <Link to="/be-decorator" className="text-primary font-medium">
                  Be a Decorator
                </Link>
              </li>
            )}

            <div className="divider my-1"></div>

            {/* Logout */}
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      )}
    </div>
  );
};

export default Profile;
