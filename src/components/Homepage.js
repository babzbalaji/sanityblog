import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="homepage text-center mt-5">
      <h1>Welcome to Babz blog</h1>
      <Link to="/blog">View blogs</Link>
    </div>
  );
}
