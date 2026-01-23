import useAuth from "@/hooks/useAuth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 w-full bg-accent">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-10 md:px-6">
          <Link to="/dashboard" className="font-black">
            Taskflow
          </Link>
          <ul className="flex items-center justify-center gap-6">
            {user && (
              <li>
                <span className="text-sm text-neutral-500 font-semibold">{user?.username}</span>
              </li>
            )}
            <li>{isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
