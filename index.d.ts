export class TypedNode<T> {
  public set(value: T): any;
  public get(): T;
}

export module State {
  export class Map<T = {}> extends TypedNode<T> {
    constructor(value?: T, schema?: Schema) 
    public get(): T;
    public get<K extends keyof T>(key: K): T[K];
    public get<K extends keyof T>(...args: K[]): Pick<T, K>;
    public set(source: T): this;
    public merge<K extends keyof T>(a: Partial<T>): void;
    public setAttribute<K extends keyof T>(a: K, b: T[K]): this;
    public getAttribute<K extends keyof T>(a: K): T[K];
    public map<K extends keyof T, V>(handler: (value: T[K], key?: K) => V): V[];
    public find<K extends keyof T>(key: K): any;
    public clone(): this;
    public toJSON(): string;
    public fromJSON(str: string): this;
  }

  export class List<T, R> {
    constructor(value?: Partial<T>[], schema?: Schema) 
    length: number;
    public set(source: Partial<T>[]): void;
    public get<K extends keyof T>(key: K): T[K][];
    public get<K extends keyof T>(...args: K[]): Pick<T, K>[];
    public clear(): this;
    public concat(source: Partial<T>[]): this;
    public push(element: Partial<T>): this;
    public map<V>(handler: (value: T, index?: string) => V): V[];
    public at(index: number): R | undefined;
    public where<K extends keyof T>(key: K, value: T[K]): R | undefined;
    public where(map: Partial<T>): R | undefined;
    public filter(handler: (item: R) => boolean): R[];
    public sortBy<K extends keyof T>(key: K): this;
    public remove(toRemove: R[]): void;
    public remove(toRemove: R): void;
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

export type Validator = (value: any) => boolean;

export class Type {
  constructor(param: {
    name: string;
    instance: new () => TypedNode<any>;
    validate: Validator;
    required?: boolean;
    nested?: new () => Schema | Type | TypedNode<any>;
  })
  static Any: Type;
  static Boolean: Type;
  static List: Type;
  static Map: Type;
  static Number: Type;
  static String: Type;
  static UUID: Type;
  static ObjectID: Type;
}

export const is: {
  func: Validator;
  promise: Validator;
  list: Validator;
  number: Validator;
  boolean: Validator;
  string: Validator;
  map: Validator;
  factory: Validator;
  node: Validator;
  schema: Validator;
  sym: Validator;
  type: Validator;
  uuid: Validator;
  object_id: Validator;
  error: Validator;
};

export class Factory<I, O> {
  constructor(factory: (data: I) => O);
  get(data: I): O;
}
