import Layout from "@/modules/core/infrastructure/components/Layout";
import { PostContent } from "@/modules/posts/domain/entities/PostContent";
import { postContentAdapter } from "@/modules/posts/infrastructure/adapters/postContentAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function Home() {
  const [post, setPost] = useState<PostContent>();
  const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        await postContentAdapter.getPostContentByPostIdAndLevel({postId: Number(router.query.post)})
        .then((res) => {
          setPost(res);
        });
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
