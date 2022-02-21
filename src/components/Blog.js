import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../client";

export default function Blog() {
  const [post, setPost] = useState([]);
  const [categories, setCategory] = useState([]);

  // console.log("categories", categories);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
        title,
        slug,
        body,
        mainImage{
          asset-> {
            _id,
            url
          },
          alt
        }
      }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   client
  //     .fetch(
  //       `*[_type == "post"] {
  //             title,
  //             slug,
  //             body,
  //             categories,
  //             mainImage{
  //               asset-> {
  //                 _id,
  //                 url
  //               },
  //               alt
  //             },

  //           }`
  //     )
  //     .then((data) => setCategory(data))
  //     .catch(console.error);
  // }, []);

  return (
    <div className="blog-page">
      <div className="container">
        <div className="row ">
          {post.map((posts) => {
            return (
              <div className="card mr-4 mt-4 p-2">
                <div key={posts.slug.current}>
                  <img
                    className="img-fluid"
                    src={posts.mainImage.asset.url}
                    alt={posts.title}
                  />
                  <h4>{posts.title}</h4>
                  <Link to={`/blog/${posts.slug.current}`}>Read more</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
