export default class Element {
  private id: number | null;
  private name: string;
  private createdAt: number;
  private used: number;
  private tags: string[];
  private uri: string;

  public constructor(id: number | null, name: string, createdAt: number, used: number, tags: string[], uri: string) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.used = used;
    this.tags = tags;
    this.uri = uri;
  }

  public getId(): number | null {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getCreatedAt(): number {
    return this.createdAt;
  }

  public getUsed(): number {
    return this.used;
  }

  public getTags(): string[] {
    return this.tags;
  }

  public setTags(tags: string[]) {
    this.tags = tags;
  }

  public getUri(): string {
    return this.uri;
  }

  public use() {
    this.used++;
  }
}