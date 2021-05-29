import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { debounce } from "../lib/utils";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ value, onChange }: Props) {
  const [target, setTarget] = useState("");
  useEffect(() => {
    setTarget(value);
  }, [value]);
  const onChange_d = useMemo(
    () => debounce((e: ChangeEvent<HTMLInputElement>) => onChange(e), 500),
    [onChange]
  );
  return (
    <input
      value={target}
      onChange={(e) => {
        e.persist();
        onChange_d(e);
        setTarget(e.target.value);
      }}
    />
  );
}
