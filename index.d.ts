export class TypedNode<T> {
  public set(value: T): any;
  public get(): T;
}

export module State {
  export class Map<T> extends TypedNode<T> {
    public get(...args: (keyof T)[]): any;
    public set(a: T | keyof T, b?: any): void;
    public merge(a: T | string, b?: any): void;
    public setAttribute(a: string, b?: any): void;
    public getAttribute(a: string): any;
    public map(handler: (value: any, key?: string) => any): any;
    public find(key: string): any;
    public clone(): this;
    public toJSON(): string;
    public fromJSON(str: string): this;
  }

  export class List<T> extends TypedNode<T> {
    public set(source: T | any): any;
    public get(...args: (keyof T)[]): any;
    public clear(): void;
    public concat(source: any[]): void;
    public push(element: T): void;
    public map(handler: (value: T, index?: string) => any): T[];
    public at(index: number): T;
    public where(key: string, value: any): T;
    public filter(index: number): T[];
    public sortBy(key: string): this;
    public remove(toRemove: any): void;
  }

  export class Boolean extends TypedNode<boolean> { }
  export class String extends TypedNode<string> { }
  export class Number extends TypedNode<number> { }
  export class ObjectID extends TypedNode<string> { }
  export class UUID extends TypedNode<string> { }
  export class Any extends TypedNode<any> { }
}

export class Schema {
  constructor(name: string, fields: object, strict?: boolean);
}

export class Type {
  static Any: Type;
  static Boolean: Type;
  static List: Type;
  static Map: Type;
  static Number: Type;
  static String: Type;
  static UUID: Type;
  static ObjectID: Type;
}
