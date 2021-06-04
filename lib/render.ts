export function renderKeys<
  M extends Map<any, any>,
  F extends (k: MapKey<M>) => JSX.Element
>(map: M, render: F): JSX.Element[] {
  function* generatorOfKeys(): Generator<JSX.Element> {
    for (const k of map.keys()) {
      yield render(k);
    }
  }

  return [...generatorOfKeys()];
}

export function renderEntries<
  M extends Map<any, any>,
  F extends (e: [MapKey<M>, MapValue<M>]) => JSX.Element
>(map: M, render: F): JSX.Element[] {
  function* generatorOfEntries(): Generator<JSX.Element> {
    for (const e of map.entries()) {
      yield render(e);
    }
  }
  return [...generatorOfEntries()];
}

export function renderWithLength(
  length: number,
  render: (i: number) => JSX.Element
): JSX.Element[] {
  function* generatorWithLength() {
    for (const e of Array(length).fill(null).keys()) {
      yield render(e);
    }
  }
  return [...generatorWithLength()];
}
