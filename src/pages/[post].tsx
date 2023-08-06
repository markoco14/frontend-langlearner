import { useRouter } from "next/router";
import { useEffect, useState } from "react"

type PostContent = {
  id: number;
  content: string;
	post: number;
}

export default function Home() {
  const [post, setPost] = useState<PostContent>();
  const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter()

  useEffect(() => {
    async function getData() {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${router.query.post}/content/`)
      .then(response => response.json())
      .then(data => {
				console.log(data)
        setPost(data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.error('Error:', error)
      });
    }

    getData();
  }, [router.query.post])
  return (
    <div>
      {loading && (
        <p>loading..</p>
      )}
      {!loading && post && (
        <article className="max-w-[70ch] mx-auto">
					<p>{post.content}</p>
        </article>
      )}
    </div>
  )
}
