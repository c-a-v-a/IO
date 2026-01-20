import * as SQLite from "expo-sqlite";
import DatabaseData from "./DatabaseData";
import Element from "./Element";
import { OrderingEnum } from "./OrderingEnum";
import QueryParams from "./QueryParams";

export default class Database {
  private static instance: Database;
  private db?: SQLite.SQLiteDatabase;


  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public async init(): Promise<SQLite.SQLiteDatabase> {
    if (!this.db) {
      this.db = await SQLite.openDatabaseAsync("memsearcher");
      
      await this.db.runAsync(
        `CREATE TABLE IF NOT EXISTS elements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          createdAt INTEGER,
          used INTEGER,
          tags TEXT,
          uri TEXT
        );`
      );
    }

    return this.db;
  }

  public async getElements(params?: QueryParams) {
    if (!this.db) {
      await this.init();
    }

    let query = "SELECT * FROM elements";
    const queryParams: any[] = [];

    if (params?.name && params.name.trim().length > 0) {
      query += " WHERE name LIKE ?";
      queryParams.push(`%${params.name}%`);
    }

    switch (params?.order) {
      case OrderingEnum.CREATED_AT_ASC:
        query += " ORDER BY createdAt ASC";
        break;
      case OrderingEnum.CREATED_AT_DESC:
        query += " ORDER BY createdAt DESC";
        break;
      case OrderingEnum.NAME_ASC:
        query += " ORDER BY name ASC";
        break;
      case OrderingEnum.NAME_DESC:
        query += " ORDER BY name DESC";
        break;
      case OrderingEnum.USED_ASC:
        query += " ORDER BY used ASC";
        break;
      case OrderingEnum.USED_DESC:
        query += " ORDER BY used DESC";
        break;
    }

    const allRows = await this.db!.getAllAsync(query, queryParams) as DatabaseData[];
    const elements: Element[] = [];

    for (const row of allRows) {
      elements.push(new Element(
        row.id,
        row.name,
        row.createdAt,
        row.used,
        row.tags.split(',').map(tag => tag.trim()),
        row.uri
      ));
    }

    return elements;
  }

  public async insertElement(element: Element) {
    if (!this.db) {
      await this.init();
    }

    await this.db!.runAsync(
      `INSERT INTO elements (name, createdAt, used, tags, uri)
      VALUES (?, ?, ?, ?, ?)`,
      [
        element.getName(),
        element.getCreatedAt(),
        element.getUsed(),
        element.getTags().join(","),
        element.getUri()
      ]
    );
  }

  public async updateElement(element: Element) {
    if (element.getId() === null) {
      return;
    }

    if (!this.db) {
      await this.init();
    }

    await this.db!.runAsync(
      `UPDATE elements SET name = ?, tags = ?, used = ? WHERE id = ?`,
      [
        element.getName(),
        element.getTags().join(","),
        element.getUsed(),
        element.getId()
      ]
    )
  }

  public async getElement(id: number) {
    if (!this.db) {
      await this.init();
    }

    const element = await this.db!.getFirstAsync(
      `SELECT * FROM elements WHERE id = ?`,
      [ id ]
    ) as DatabaseData;

    return new Element(
      element.id,
      element.name,
      element.createdAt,
      element.used,
      element.tags.split(",").map(tag => tag.trim()),
      element.uri
    );
  }
}