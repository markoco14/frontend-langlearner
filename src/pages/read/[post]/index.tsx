import Layout from "@/modules/core/infrastructure/components/Layout";
import { ReadPost, WordPair } from "@/modules/posts/domain/entities/ReadPost";
import { readPostAdapter } from "@/modules/posts/infrastructure/adapters/readPostAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [post, setPost] = useState<ReadPost>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showPinyin, setShowPinyin] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        const postContent = await readPostAdapter.getPostContentAndPinyin({
          postId: Number(router.query.post),
        });
        setPost(postContent);
        setLoading(false);
      }
    }

    getData();
  }, [router.query.post]);

  function copyTextToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        console.log("Text successfully copied to clipboard!");
      })
      .catch(function (err) {
        console.error("Unable to copy text to clipboard: ", err);
      });
  }
  return (
    <Layout>
      {loading && <p>loading..</p>}
      {!loading && post && (
        <article className="relative max-w-[70ch] mx-auto">
          <div className="w-full sticky top-4 flex justify-end bg-slate-900">
            <button
              className="absolute top-0 -right-[48px]"
              onClick={() => {
                if (showPinyin) {
                  setShowPinyin(false)
                } else {
                  setShowPinyin(true)
                }
              }}>
                {showPinyin ? 'Hide Pinyin' : 'Show Pinyin'}
              </button>
          </div>
          <h1 className="text-5xl mb-4">{post?.title}</h1>
          <div className="">
            {post?.content.map((array: WordPair[], arrayIndex: number) => (
              <p key={arrayIndex} className="flex flex-wrap">
                {array.map((word: WordPair, wordIndex: number) => (
                  <span key={wordIndex} className="flex flex-col items-center">
                    <span
                      className="hover:bg-yellow-200 hover:cursor-pointer text-3xl text-center w-full"
                      onClick={() => copyTextToClipboard(word.chinese)}
                    >
                      {word.chinese}
                    </span>
                    {showPinyin && (
                      <span
                        className="hover:bg-yellow-200 text-center w-full"
                      >
                        {word.pinyin}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </article>
      )}
    </Layout>
  );
}
