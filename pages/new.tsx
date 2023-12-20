import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const NewTODO: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
        const body = { title, content, priority };
        await fetch('/api/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        window.alert("New TODO Created!");
        await Router.push('/new');
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h3>New TODO</h3>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}  
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <label>
            Pick a Priority:
            <select
                name="priority"
                id="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="">--Please choose a priority--</option>
                <option value="0">Urgent</option>
                <option value="1">Important</option>
                <option value="2">Normal</option>
                <option value="3">Not urgent</option>
                <option value="spider">Not urgent nor Important</option>
            </select>
          </label>

          <input disabled={!content || !title || !priority} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        select {
            width: 100%;
            padding: 0.5rem;
            margin: 0.5rem 0;
            border-radius: 0.25rem;
            border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default NewTODO;