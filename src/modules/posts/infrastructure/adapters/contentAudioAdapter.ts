import { ContentAudio } from "../../domain/entities/ContentAudio";

class ContentAudioAdapter {

	public async createAudio({contentId, contentText}: {contentId: number, contentText: string}): Promise<ContentAudio> {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/content/${contentId}/audio/create/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						post_content: contentText,
					}),
				});		 
		const contentAudio: ContentAudio = await res.json();

		return contentAudio;
	}
	
}

export const contentAudioAdapter = new ContentAudioAdapter();