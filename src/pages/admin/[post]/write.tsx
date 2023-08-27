import Layout from "@/modules/core/infrastructure/components/Layout";
import { PostContent } from "@/modules/posts/domain/entities/PostContent";
import { postContentAdapter } from "@/modules/posts/infrastructure/adapters/postContentAdapter";
import EditPostContent from "@/modules/posts/infrastructure/ui/components/EditPostContent";
import WritePostContent from "@/modules/posts/infrastructure/ui/components/WritePostContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function WritePostContentPage() {
  const [postContent, setPostContent] = useState<PostContent>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        await postContentAdapter.getPostContentByPostIdAndLevel({postId: Number(router.query.post)})
        .then((res) => {
          // @ts-ignore
          if (res === 'content does not exist') {
            setLoading(false)
            return
          }
          if (typeof res.content !== 'string') {
            const contentString = res.content?.map((subArray: string[]) => subArray.join('')).join('\n\n');
            res.content = contentString
          }
          setPostContent(res)
          setLoading(false)
        })
      }
    }

    getData();
  }, [router.query.post]);

  return (
    <Layout>
      {loading && (
        <section className="max-w-[70ch] mx-auto mt-12">
          <p>loading..</p>
        </section>
      )}
      {!loading && postContent?.id && (
        <EditPostContent postContent={postContent} setPostContent={setPostContent}/>
      )}
      {!loading && !postContent?.id && (
        <WritePostContent setPostContent={setPostContent}/>
      )}
    </Layout>
  );
}
