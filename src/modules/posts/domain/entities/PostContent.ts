export class PostContent {
  constructor(
    public id: number,
    public content: string | string[][],
		public post: number,
    public level: number,
  ) {}
}