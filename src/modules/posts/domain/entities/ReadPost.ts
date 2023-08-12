export class ReadPost {
  constructor(
    public id: number,
    public content: string[][],
		public pinyin: string,
    public title: string,
  ) {}
}