import { PostContent } from "../../domain/entities/PostContent";

class PostContentAdapter {

	public async writePostContent({ postId, content }: { postId: number, content: string }): Promise<PostContent> {
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/content/write/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						content: content
					}),
				}
			);
		const data = await response.json();
		const postContent: PostContent = data

		return postContent
	}

	// public async listPosts(): Promise<Post[]> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);		 
	// 	const posts: Post[] = await res.json();

	// 	return posts;
	// }

	// public async createPostTitle({ title }: { title: string }): Promise<Post> {
	// 	const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_API_URL}/posts/write/`,
	// 			{
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					title: title,
	// 				}),
	// 			}
	// 		);
	// 	const data = await response.json();
	// 	const school: Post = data

	// 	return school
	// }

	// public async deletePostTitleById({id}: {id: number}) {
	// 	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/delete/`,{
	// 		method: 'DELETE'
	// 	})

	// 	return response;
	// }

	// public async getPostContentByPostId({ id }: { id: number }): Promise<PostContent> {
	// 	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/content/`);		
	// 	const postContent: PostContent = await res.json();

	// 	return postContent;
	// }

	
}

export const postContentAdapter = new PostContentAdapter();