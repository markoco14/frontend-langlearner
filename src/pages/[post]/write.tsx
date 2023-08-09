import Layout from "@/modules/core/infrastructure/components/Layout";
import EditPostContent from "@/modules/posts/infrastructure/ui/components/EditPostContent";
import WritePostContent from "@/modules/posts/infrastructure/ui/components/WritePostContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PostContent = {
  id: number;
  content: string;
  post: number;
};

export default function WritePostContentPage() {
  const [postContent, setPostContent] = useState<PostContent>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      if (router.query.post) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${router.query.post}/content/`
        )
          .then((response) => response.json())
          .then((data) => {
            setPostContent(data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error:", error);
          });
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
