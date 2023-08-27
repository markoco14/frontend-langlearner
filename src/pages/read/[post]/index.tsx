import Layout from "@/modules/core/infrastructure/components/Layout";
import { ReadPost, WordPair } from "@/modules/posts/domain/entities/ReadPost";
import { readPostAdapter } from "@/modules/posts/infrastructure/adapters/readPostAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [post, setPost] = useState<ReadPost>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [showPinyin, setShowPinyin] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        await readPostAdapter.getCompletePost({
          postId: Number(router.query.post),
        }).then((res) => {
          setPost(res);
        });
        setLoading(false);
      }
    }

    getData();
  }, [router.query.post]);

  function copyTextToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        toast.success("Text successfully copied to clipboard!");
      })
      .catch(function (err) {
        toast.error("Unable to copy text to clipboard: ", err);
      });
  }
  return (
    <Layout>
      {loading && <p>loading..</p>}
      {!loading && post && (
        <article className="relative max-w-[1000px] mx-auto grid gap-4 sm:grid-cols-8 pb-24">
          <section className="col-span-3 col-start-6 row-start-1">
            <div className="sticky top-4 left-0">
              <button
                onClick={() => {
                  if (showPinyin) {
                    setShowPinyin(false)
                  } else {
                    setShowPinyin(true)
                  }
                }}>
                  {showPinyin ? 'Hide Pinyin' : 'Show Pinyin'}
                </button>
              <audio src={post.audio_url} controls></audio>
            </div>
          </section>
          <section className="col-span-5 col-end-6 row-start-1">
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
          </section>
        </article>
      )}
    </Layout>
  );
}
