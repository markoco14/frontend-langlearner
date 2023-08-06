import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`)
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <section className="max-w-[600px] mx-auto">
          <ul>
            {posts ? (
              posts.map((post: Post, index: number) => (
                <li key={index}>
                  <Link href={`/${post.id}`} className="flex justify-between">
                    <span>{post.title}</span>
                    <Link href={`/${post.id}/edit`}>
                      Edit
                    </Link>
                  </Link>
                </li>
              ))
            ) : (
              <p>no posts</p>
            )}
          </ul>
        </section>
      )}
    </>
  );
};

export default function Home() {
  return (
    <div>
      <PostList />
    </div>
  );
}
