import { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

interface SeacrhBoxProps {
  onChange: (searchWord: string) => void;
}

export default function SearchBox({ onChange }: SeacrhBoxProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <input
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
