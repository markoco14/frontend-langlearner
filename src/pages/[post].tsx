import Layout from "@/modules/core/infrastructure/components/Layout";
import { postAdapter } from "@/modules/posts/infrastructure/adapters/postAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

type PostContent = {
  id: number;
  content: string;
	post: number;
}

export default function Home() {
  const [post, setPost] = useState<PostContent>();
  const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        const postContent = await postAdapter.getPostContentByPostId({id: Number(router.query.post)});
        setPost(postContent);
        setLoading(false);
      }
    }

    getData();
  }, [router.query.post])
  return (
    <Layout>
      {loading && (
        <p>loading..</p>
      )}
      {!loading && post && (
        <article className="max-w-[70ch] mx-auto">
          <p>{post.content}</p>
        </article>
      )}
    </Layout>
  )
}
