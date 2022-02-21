import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import client from "../client";
import BlockContent from "@sanity/block-content-to-react";

export default function Category() {
  const [singlePost, setSinglePost] = useState([]);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
            title,
            body,
            mainImage {
              asset -> {
                _id,
                url
              },
              alt
            }
          }`
      )
      .then((data) => setSinglePost(data[0]));
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "category"] {
            title,
        }`
      )
      .then((data) => setCategory(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div className="flex flex-wrap justify-center">
          <p>{category.title}</p>
        </div>
      ))}
    </div>
  );
}
