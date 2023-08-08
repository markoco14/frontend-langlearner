import Layout from "@/modules/core/infrastructure/components/Layout";
import { postContentAdapter } from "@/modules/posts/infrastructure/adapters/postContentAdapter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

type PostContent = {
  id: number;
  content: string;
  post: number;
};

type Inputs = {
  content: string;
};

export default function EditPostContent() {
  const [postContent, setPostContent] = useState<PostContent>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (postContent) {
      await postContentAdapter.updatePostContent({postContentId: postContent.id, content: data.content})
      .then((res) => {
        toast.success('Post content editted :)');
        setPostContent(res)
      });
    }
  };

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
        <section className="max-w-[70ch] mx-auto mt-12">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mb-2">
              <label>New Content</label>
              <TextareaAutosize
                autoFocus
                minRows={2}
                defaultValue={postContent.content}
                className="rounded-lg p-4 border w-full"
                {...register("content")}
              />
            </div>
            <button className="underline underline-offset-2 decoration-blue-500 decoration-2">
              Edit
            </button>
          </form>
        </section>
      )}
      {!loading && !postContent?.id && (
        <p>There is nothing to edit. You need to write the post first.</p>
      )}
    </Layout>
  );
}
