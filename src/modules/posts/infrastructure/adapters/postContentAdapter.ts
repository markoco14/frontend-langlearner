import { PostContent } from "../../domain/entities/PostContent";

class PostContentAdapter {

	public async getPostContentByPostIdAndLevel({postId}: {postId: number}): Promise<PostContent> {
		// LEVEL NUMBER HARDCODED
		// DEFAULT ASSUMES LEVEL 0 - UNLEVELLED CONTENT
		// WILL ADD LEVELS LATER AND THEN ADD TO REQUEST
		const level = 0;
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/content/level/${level}/`);		 
		const postContent: PostContent = await res.json();

		return postContent;
	}

	public async writePostContent({ postId, content }: { postId: number, content: string }): Promise<PostContent> {
		const preparedParagraphs: any[] = [];
		const paragraphs = content.split("\n\n")
		paragraphs.forEach((paragraph, index) => {
			if (paragraph.includes("\n")) {
				const section: any[] = paragraph.split("\n")
				
				// OPTION A
				// we lose the true formatting this way
				// for example, list items will each become their own paragraph <p>
				// CODE:
				// section.forEach(item => {
				// 	preparedParagraphs.push(item)
				// })
				// OPTION B
				// we can keep list formatting and render <ul> elements
				// and paragraphs can be <p> elements
				// CODE:
				// preparedParagraphs.push(section)

				// CHOOSING OPTION A FOR SIMPLICITY NOW
				// OPTION A
				section.forEach(item => {
					preparedParagraphs.push(item)
				})
			}
			else {
				preparedParagraphs.push(paragraph);
			}
		})
		
		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/content/write/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						content: preparedParagraphs
					}),
				}
			);
		const data = await response.json();
		const postContent: PostContent = data

		return postContent
	}

	public async updatePostContent({ postContentId, content }: { postContentId: number, content: string }): Promise<PostContent> {
		const preparedParagraphs: any[] = [];
		const paragraphs = content.split("\n\n")
		console.log(paragraphs)
		paragraphs.forEach((paragraph, index) => {
			if (paragraph.includes("\n")) {
				console.log(paragraph.split("\n"))
				const section: any[] = paragraph.split("\n")
				
				// OPTION A
				// we lose the true formatting this way
				// for example, list items will each become their own paragraph <p>
				// CODE:
				// section.forEach(item => {
				// 	preparedParagraphs.push(item)
				// })
				// OPTION B
				// we can keep list formatting and render <ul> elements
				// and paragraphs can be <p> elements
				// CODE:
				// preparedParagraphs.push(section)

				// CHOOSING OPTION A FOR SIMPLICITY NOW
				// OPTION A
				section.forEach(item => {
					preparedParagraphs.push(item)
				})
			}
			else {
				preparedParagraphs.push(paragraph);
			}
		})
		console.log(preparedParagraphs)

		const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/content/${postContentId}/update/`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						content: preparedParagraphs
					}),
				}
			);
		const data = await response.json();
		const postContent: PostContent = data

		return postContent
	}

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