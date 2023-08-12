export class WordPair {
  constructor(
    public chinese: string,
    public pinyin: string,
  ) {}
}

export class ReadPost {
  constructor(
    public id: number,
    public content: WordPair[][],
    public title: string,
  ) {}
}