import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { debounce } from "../lib/utils";
import styled from "styled-components";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ value: p_value, onChange }: Props) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(p_value);
  }, [p_value]);
  const d_onChange = useMemo(
    () => debounce((e: ChangeEvent<HTMLInputElement>) => onChange(e), 500),
    [onChange]
  );
  return (
    <Container>
      <Tooltip htmlFor="search">検索</Tooltip>
      <Base
        id="search"
        value={value}
        onChange={(e) => {
          e.persist();
          d_onChange(e);
          setValue(e.target.value);
        }}
      />
    </Container>
  );
}

const Base = styled.input`
  outline: none;
  padding: 1em 0.75em;
  display: inline-block;
  width: 100%;
  border-radius: 500px;
  border: 2px solid #333;
  transition: border-color 0.3s;
  &:focus {
    border: 2px solid lightgreen;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Tooltip = styled.label`
  position: absolute;
  border-radius: 500px;
  font-size: 12px;
  padding: 0.25em 0.5em;
  top: -12px;
  left: 3px;
  background-color: green;
  color: white;
`;
