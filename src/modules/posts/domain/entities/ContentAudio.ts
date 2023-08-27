export class ContentAudio {
  constructor(
    public id: number,
		public post_content: number,
    public audio_url: string,
		public timestamps: null,
    // TODO: not ideal solution, but holds for now until error handling done better
    public detail?: string,
  ) {}
}