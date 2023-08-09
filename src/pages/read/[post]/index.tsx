import Layout from "@/modules/core/infrastructure/components/Layout";
import { ReadPost } from "@/modules/posts/domain/entities/ReadPost";
import { readPostAdapter } from "@/modules/posts/infrastructure/adapters/readPostAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

type ContentPinyinPair = {
  word: string,
  pinyin: string
}

type ReadContent = {
  title: string,
  content: ContentPinyinPair[],
}


export default function Home() {
  const [post, setPost] = useState<ReadContent>();
  const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        const postContent = await readPostAdapter.getPostContentAndPinyin({postId: Number(router.query.post)});
        const contentArray = postContent.content.split('');
        console.log(postContent)
        console.log(contentArray)
        const pinyinArray = postContent.pinyin.split(' ');
        console.log(pinyinArray)
        console.log('length of arrays', contentArray.length, pinyinArray.length)


        const readContentArray: ContentPinyinPair[] = []
        contentArray.forEach((word, index) => {
          const data: ContentPinyinPair = {
            word: word,
            pinyin: pinyinArray[index]
          }
          readContentArray.push(data)
        })

        const readContent = {
          title: postContent.title,
          content: readContentArray
        }
        
        console.log(readContent)
        setPost(readContent);
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
          <h1 className="text-5xl mb-4">{post?.title}</h1>
          <div className="flex flex-wrap">

            {post?.content?.map((contentPinyinPair: ContentPinyinPair, index: number) => (
              <div key={index} className="flex flex-col whitespace-normal">
                <span className="text-center text-3xl">{contentPinyinPair.word}</span>
                <span className="text-center text-sm">{contentPinyinPair.pinyin}</span>
              </div>
            ))}
          </div>
        </article>
      )}
    </Layout>
  )
}
