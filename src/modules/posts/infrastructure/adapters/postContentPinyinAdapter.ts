import { PostContentPinyin } from "../../domain/entities/PostContentPinyin";

class PostContentPinyinAdapter {

	public async getPostContentPinyinByPostIdAndLevel({postId}: {postId: number}): Promise<PostContentPinyin> {
		// LEVEL NUMBER HARDCODED
		// DEFAULT ASSUMES LEVEL 0 - UNLEVELLED CONTENT
		// WILL ADD LEVELS LATER AND THEN ADD TO REQUEST
		const level = 0;
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/content/pinyin`);		 
		const postContentPinyin: PostContentPinyin = await res.json();

		return postContentPinyin;
	}
}

export const postContentPinyinAdapter = new PostContentPinyinAdapter();