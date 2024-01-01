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
  const [done, setDone] = useState(post.done);

  const handleDone = async() => {
    const isDone = !done;
    try {
      const body = { id: post.id, done: isDone };
      await fetch('/api/put/done', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      setDone(isDone);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="todo-actions">
        <label className="todo-action-done">
          Done:
            <input
              type="checkbox"
              name="done"
              checked={done}
              onChange={handleDone}
            />
        </label>
        <button aria-label="delete" className="todo-action-delete">Delete</button>
      </section>
      <article className={done ? `todo--done` : ''}>
        <h3
          className="todo-title"
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        >
          {post.title}
        </h3>
        <small>By {authorName}</small>
        <ReactMarkdown children={post.content} />
      </article>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        .todo-title{
          cursor: pointer;
          text-decoration-line: underline;
        }
        .todo--done {
          text-decoration-line: line-through;
        }
        .todo-actions {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }
        .todo-action-done {
          cursor: pointer;
        }
        .todo-action-delete {
          background-color: #dd4848;
          border: none;
          border-radius: 4px;
          color: #f2f2f2;
          padding: 4px 16px;
          font-size: medium;
        }
      `}</style>
    </div>
  );
};

export default Post;
