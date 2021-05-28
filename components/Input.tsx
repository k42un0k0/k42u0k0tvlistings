import { ChangeEvent, useEffect, useState } from "react";

let t: number = 0;
function debounce(cb: () => void, ms: number) {
  clearTimeout(t);
  t = setTimeout(cb, ms);
}

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ value, onChange }: Props) {
  const [target, setTarget] = useState("");
  useEffect(() => {
    setTarget(value);
  }, [value]);
  return (
    <input
      value={target}
      onChange={(e) => {
        e.persist();
        debounce(() => onChange(e), 500);
        setTarget(e.target.value);
      }}
    />
  );
}
