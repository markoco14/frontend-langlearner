import { Post } from "../../domain/entities/Post";
import { PostContent } from "../../domain/entities/PostContent";

class PostAdapter {

	public async listPosts(): Promise<Post[]> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);		 
		const posts: Post[] = await res.json();

		return posts;
	}

	public async createPostTitle({ title }: { title: string }): Promise<Post> {
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/write/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: title,
					}),
				}
			);
		const data = await response.json();
		const school: Post = data

		return school
	}

	public async deletePostTitleById({id}: {id: number}) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/delete/`,{
			method: 'DELETE'
		})

		return response;
	}

}

export const postAdapter = new PostAdapter();