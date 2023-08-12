import Layout from "@/modules/core/infrastructure/components/Layout";
import { ReadPost } from "@/modules/posts/domain/entities/ReadPost";
import { readPostAdapter } from "@/modules/posts/infrastructure/adapters/readPostAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"


export default function Home() {
  const [post, setPost] = useState<ReadPost>();
  const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        const postContent = await readPostAdapter.getPostContentAndPinyin({postId: Number(router.query.post)});
        setPost(postContent);
        setLoading(false);
      }
    }

    getData();
  }, [router.query.post])

  function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text successfully copied to clipboard!');
    }).catch(function(err) {
        console.error('Unable to copy text to clipboard: ', err);
    });
}
  return (
    <Layout>
      {loading && (
        <p>loading..</p>
      )}
      {!loading && post && (
        <article className="max-w-[70ch] mx-auto">
          <h1 className="text-5xl mb-4">{post?.title}</h1>
          <div className="flex flex-wrap">
            {post?.content.map((array: string[], arrayIndex: number) => (
              <p key={arrayIndex}>
                {array.map((word: string, wordIndex: number) => (
                  <span key={wordIndex} className="hover:bg-yellow-200 text-3xl" onClick={() => copyTextToClipboard(word)}>{word}</span>
                ))}
              </p>
        
            ))}
          </div>
        </article>
      )}
    </Layout>
  )
}
