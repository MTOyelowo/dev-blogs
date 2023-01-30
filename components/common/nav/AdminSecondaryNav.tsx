import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import useDarkMode from "../../../hooks/useDarkMode";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";
import ProfileHead from "../ProfileHead";
import SearchBar from "../SearchBar";

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push("/admin/posts/create");
  const handleLogout = async () => await signOut();

  const options: dropDownOptions = [
    {
      label: "Add new post",
      onClick: navigateToCreateNewPost,
    },
    {
      label: "Change theme",
      onClick: toggleTheme,
    },
    {
      label: "Log Out",
      onClick: handleLogout,
    },
  ];
  return (
    <div className="flex items-center justify-between">
      {/*Search Bar*/}
      <SearchBar />
      {/*Options / Profile Head*/}
      <DropdownOptions
        head={<ProfileHead nameInitial="M" />}
        options={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
