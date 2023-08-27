import Layout from "@/modules/core/infrastructure/components/Layout";
import { PostContentPinyin } from "@/modules/posts/domain/entities/PostContentPinyin";
import { postContentPinyinAdapter } from "@/modules/posts/infrastructure/adapters/postContentPinyinAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function Home() {
  const [post, setPost] = useState<PostContentPinyin>();
  const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        const postContent = await postContentPinyinAdapter.getPostContentPinyinByPostIdAndLevel({postId: Number(router.query.post)});
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
          <p>{post.pinyin_content}</p>
        </article>
      )}
    </Layout>
  )
}
