import { FC } from "react";

interface Props {}

const SearchBar: FC<Props> = (props): JSX.Element => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="border-[1.5px] bg-transparent border-secondary-dark rounded-lg text-primary-dark dark:text-primary p-1 focus:border-primary-dark dark:focus:border-primary outline-none transition"
    />
  );
};

export default SearchBar;
