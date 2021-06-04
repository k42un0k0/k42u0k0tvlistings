type MapKey<M> = M extends Map<infer K, any> ? K : never;
type MapValue<M> = M extends Map<any, infer V> ? V : never;
