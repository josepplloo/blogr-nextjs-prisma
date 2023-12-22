import React, { useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  done: boolean;
  priority: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const [done, setDone] = useState(false);

  const handleDone = () => {
    setDone(!done)
    // update the code
  };

  return (
    <div>
      <label>
        Done:
          <input
            type="checkbox"
            name="done"
            checked={done}
            onChange={handleDone}
          />
      </label>
      <button>delete</button>
      <h2 onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
