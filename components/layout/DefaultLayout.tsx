import { FC, ReactNode } from "react";
import AppHead from "../common/AppHead";
import UserNav from "../common/nav/UserNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children, title, desc }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
        <div className="sticky top-0 z-10">
          <UserNav />
        </div>
        <div className="max-w-4xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
