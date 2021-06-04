export function entries<M extends Map<any, any>>(
  map: M
): [MapKey<M>, MapValue<M>][] {
  return [...map.entries()];
}

export function keys<M extends Map<any, any>>(map: M): MapKey<M>[] {
  return [...map.keys()];
}
