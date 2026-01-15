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
        <div className="flex items-center justify-between p-4 md:p-6">
          <Link to="/dashboard" className="font-bold uppercase">
            fT.
          </Link>
          <ul className="flex items-center justify-center gap-6">
            {user && (
              <li>
                <span>{user?.username}</span>
              </li>
            )}
            <li>{isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
