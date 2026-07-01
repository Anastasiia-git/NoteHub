import css from "./SearchBox.module.css";
import { Search } from "lucide-react";

interface SearchBoxProps {
  onChange: (value: string) => void;
  value: string;
}

function SearchBox({ onChange, value }: SearchBoxProps) {
  return (
    <label className={css.search}>
      <Search size={20} aria-hidden="true" />
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search notes..."
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <kbd>⌘ K</kbd>
    </label>
  );
}

export default SearchBox;
