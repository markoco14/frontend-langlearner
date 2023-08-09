import { ReadPost } from "../../domain/entities/ReadPost";

class ReadPostAdapter {
  public async getPostContentAndPinyin({
    postId,
  }: {
    postId: number;
  }): Promise<ReadPost> {
    // LEVEL NUMBER HARDCODED
    // DEFAULT ASSUMES LEVEL 0 - UNLEVELLED CONTENT
    // WILL ADD LEVELS LATER AND THEN ADD TO REQUEST
    const level = 0;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/read/posts/${postId}/level/${level}/`
    );
    const postContent: ReadPost = await res.json();

    return postContent;
  }
}

export const readPostAdapter = new ReadPostAdapter();
