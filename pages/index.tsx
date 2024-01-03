import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma'
import { useSelector} from '../context/index';
import { TODOSState } from "../context/reducer"


export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  const todosContext: TODOSState = useSelector(
    (state: TODOSState) => state,
  );
  const {
    todos,
    filter,
    filterResult
  } = todosContext;
  const myList = filter ? filterResult : todos

  return (
    <Layout>
      <main className="page">
        <h2>My TODO List</h2>
        <ul className="container">
          {myList.sort((a, b) => Number(a.priority)- Number(b.priority))
            .map((post) => (
            <li key={post.id} className="post">
              <Post post={post} />
            </li>
          ))}
        </ul>
      </main>
      <style jsx>{`
        .container {
          list-style: outside none none;
          padding: 0;
        }
        .post {
          border-radius: 4px;
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
