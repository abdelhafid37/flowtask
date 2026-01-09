import useAuth from "@/hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      <div className="container">
        <div className="flex items-center justify-between p-4">
          <Link to="/">flowtask</Link>
          <ul className="flex items-center justify-center gap-6">
            {user && (
              <li>
                <span>{user?.username}</span>
              </li>
            )}
            <li>
              {isAuthenticated && <Button onClick={logout}>Logout</Button>}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
