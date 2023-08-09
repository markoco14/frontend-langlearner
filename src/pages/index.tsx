import Layout from "@/modules/core/infrastructure/components/Layout";
import { Post } from "@/modules/posts/domain/entities/Post";
import { postAdapter } from "@/modules/posts/infrastructure/adapters/postAdapter";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const posts = await postAdapter.listPosts();
      setPosts(posts);
      setLoading(false);
    }

    getData();
  }, []);

  async function handleDelete(id: number) {
    await postAdapter.deletePostTitleById({id: id})
    .then((res) => {
      toast.success('Deleted successfully')
      setPosts((prevPosts) =>
          prevPosts?.filter(
            (post) => post.id !== id
          )
        );
    })
  }

  return (
    <>
      {loading ? (
        <section className="max-w-[600px] mx-auto mb-4">
          <p>loading...</p>
        </section>
      ) : (
        <section className="max-w-[600px] mx-auto mb-4">
          <ul>
            {posts ? (
              posts.map((post: Post, index: number) => (
                <li key={index}>
                  <div className="flex justify-between">
                    <span className="whitespace-normal">{post.title}</span>
                    <div className="flex gap-2 items-baseline">
                      <Link  href={`/${post.id}`}>Read</Link>
                      <Link  href={`/${post.id}/pinyin`}>Pinyin</Link>
                      <Link href={`/${post.id}/write`}>Write</Link>
                      <Link href={`/${post.id}/edit`}>Edit</Link>
                      <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>no posts</p>
            )}
          </ul>
        </section>
      )}
    </>
  );
};

const CreatePostForm = () => {
  const [isCreated, setIsCreated] = useState<boolean>(false);

  type Inputs = {
    title: string;
  }

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newPost = await postAdapter.createPostTitle({title: data.title})
    .then((res) => {
      toast.success('Post title saved')
      setIsCreated(true)
      reset();
    });
  
  };
  return (
    <section className="max-w-[600px] mx-auto mb-4">
      {isCreated ? (
        <button onClick={() => setIsCreated(false)}>Make another</button>
      ) : (

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input type="text" className="border rounded shadow p-2"
          {...register('title', {required: true})}
          />
          {errors.title && <p className="bg-red-100 text-red-700 p-2 rounded">You need a title</p>}
        </div>
        <button>Save</button>
      </form>
      )}
    </section>
  );
};

export default function Home() {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  return (
    <Layout>
      {isCreating ? <CreatePostForm /> : <PostList />}
        {isCreating ? (
          <button
            className="bg-red-100 hover:bg-red-300 text-red-700 px-2 rounded"
            onClick={() => setIsCreating(false)}
          >
            Back
          </button>
        ) : (
          <button
            className="bg-blue-100 hover:bg-blue-300 text-blue-700 px-2 rounded"
            onClick={() => setIsCreating(true)}
          >
            Create Post Title
          </button>
        )}
    </Layout>
  );
}
