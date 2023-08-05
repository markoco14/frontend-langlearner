import { useEffect, useState } from "react"

export default function Home() {
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      // SIGNED URL
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/content/get-audio-url/`)
      .then(response => response.json())
      .then(data => {
        setAudioUrl(data.url)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.error('Error:', error)
      });
    }

    getData();
  }, [])
  return (
    <div>
      {loading && (
        <p>loading..</p>
      )}
      {!loading && audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg"></source>
        </audio>
      )}
    </div>
  )
}
