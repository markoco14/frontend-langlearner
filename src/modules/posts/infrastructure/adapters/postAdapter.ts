import { Post } from "../../domain/entities/Post";

class PostAdapter {

	public async listPosts(): Promise<Post[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);		
		const posts: Post[] = await res.json();

		return posts;
	}

	
}

export const postAdapter = new PostAdapter();