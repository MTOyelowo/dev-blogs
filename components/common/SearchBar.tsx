import { FC } from "react";

interface Props {}

const SearchBar: FC<Props> = (props): JSX.Element => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className=" bg-gray-300 rounded-full border-secondary-dark text-primary-dark dark:text-primary p-1 px-2 focus:border-primary-dark dark:focus:border-primary outline-none transition"
    />
  );
};

export default SearchBar;
