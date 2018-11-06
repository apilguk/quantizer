export class TypedNode<T> {
  public set(value: T): any;
  public get(): T;
}

export module State {
  export class Map<T = {}> {
    public get(): T;
    public get<K extends keyof T>(key: K): T[K];
    public get<K extends keyof T>(...args: K[]): Pick<T, K>;
    public set(a: T): void;
    public merge<K extends keyof T>(a: Partial<T>): void;
    public merge<K extends keyof T>(a: K, b: T[K]): void;
    public setAttribute<K extends keyof T>(a: K, b: T[K]): void;
    public getAttribute<K extends keyof T>(a: K): T[K];
    public map(handler: (value: any, key?: string) => T): T;
    public find<K extends keyof T>(key: K): any;
    public clone(): this;
    public toJSON(): string;
    public fromJSON(str: string): this;
  }

  export class List<T = {}> {
    public set(source: Partial<T>): void;
    public get(): T[];
    public get<K extends keyof T>(key: K): T[K][];
    public get<K extends keyof T>(...args: K[]): Pick<T, K>[];
    public clear(): void;
    public concat(source: T[]): void;
    public push(element: T): void;
    public map(handler: (value: T, index?: string) => any): T[];
    public at(index: number): T | undefined;
    public where<K extends keyof T>(key: K, value: T[K]): T | undefined;
    public filter(index: number): T[];
    public sortBy<K extends keyof T>(key: K): this;
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

export class Factory<I, O> {
  constructor(factory: (data: I) => O);
  get(data: I): O;
}
