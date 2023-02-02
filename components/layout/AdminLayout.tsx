import Link from "next/link";
import { FC, ReactNode } from "react";
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineFileAdd,
} from "react-icons/ai";

import AdminNav from "../common/nav/AdminNav";
import AppHead from "../common/AppHead";
import AdminSecondaryNav from "../common/nav/AdminSecondaryNav";

interface Props {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
  { href: "/admin/posts", icon: AiOutlineContainer, label: "Posts" },
  { href: "/admin/users", icon: AiOutlineTeam, label: "Users" },
  { href: "/admin/comments", icon: AiOutlineMail, label: "Comments" },
];

const AdminLayout: FC<Props> = ({ children, title }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4 dark:bg-primary-dark bg-primary">
          <div className="sticky top-0 z-10">
            <AdminSecondaryNav />
          </div>

          {children}
        </div>

        {/*Create Button*/}
        <Link href="/admin/posts/create">
          <div className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-1 p-3 mt-10 rounded-full hover:scale-90 shadow-sm transition">
            <AiOutlineFileAdd size={25} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
