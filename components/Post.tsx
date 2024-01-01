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
  const [deleted, setDeleted] = useState('');

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

  const handleDelete = async () => {
    if(window.confirm("Are you sure about that?")) {
      const body = { id: post.id }
      await fetch(`/api/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      });
      setDeleted('fadeOutRight');
      setTimeout(() => {
        setDeleted('todo--invisible');
      }, 1000);
    }
  };

  return (
    <div className={deleted}>
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
        <button
          aria-label="delete"
          className="todo-action-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
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
          transition: fadeOutRight;
        }
        .todo--invisible {
          display: none
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

        @keyframes fadeOutRight {
          from {
            opacity: 1;
          }
        
          to {
            height: 0;
            opacity: 0;
            overflow: hidden;
            padding: 0;
            transform: translate3d(100%, 0, 0);
          }
        }
        
        .fadeOutRight {
          animation-duration: 1s;
          animation-name: fadeOutRight;
        }
      `}</style>
    </div>
  );
};

export default Post;
