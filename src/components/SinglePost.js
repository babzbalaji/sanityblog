import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import client from "../client";
import BlockContent from "@sanity/block-content-to-react";

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

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

  return (
    <div className=" single-post">
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            {isLoading ? (
              <h1 className="">Loading...</h1>
            ) : (
              <section className="">
                <h1 className="">{singlePost.title}</h1>
                {singlePost.mainImage && singlePost.mainImage.asset && (
                  <img
                    src={singlePost.mainImage.asset.url}
                    alt={singlePost.title}
                    title={singlePost.title}
                    className=" img-fluid"
                  />
                )}

                <div className="">
                  <BlockContent
                    blocks={singlePost.body}
                    projectId="gp437nhz"
                    dataset="production"
                  />
                </div>
              </section>
            )}
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
}
