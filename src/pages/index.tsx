import Layout from "@/modules/core/infrastructure/components/Layout";
import { Post } from "@/modules/posts/domain/entities/Post";
import { postAdapter } from "@/modules/posts/infrastructure/adapters/postAdapter";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const posts = await postAdapter.listPosts();
      setPosts(posts);
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <section className="max-w-[600px] mx-auto mb-4">
          <p>loading...</p>
        </section>
      ) : (
        <section className="max-w-[600px] mx-auto mb-4">
          <ul>
            {posts ? (
              posts.map((post: Post, index: number) => (
                <li key={index}>
                  <div className="flex justify-between">
                    <Link  href={`/read/${post.id}`} className="whitespace-normal">{post.title}</Link>
                  </div>
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
    <Layout>
      <PostList />
    </Layout>
  );
}
