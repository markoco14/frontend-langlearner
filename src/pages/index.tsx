import { postAdapter } from "@/modules/posts/infrastructure/adapters/postAdapter";
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
      const posts = await postAdapter.listPosts();
      setPosts(posts)
      setLoading(false)
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
