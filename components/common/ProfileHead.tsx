import classNames from "classnames";
import Image from "next/legacy/image";
import { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const commonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileHead: FC<Props> = ({
  lightOnly,
  avatar,
  nameInitial,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-primary-dark bg-primary"
      : "dark:text-primary-dark text-primary bg-primary-dark dark:bg-primary";
  }, [lightOnly]);
  return (
    <div className="flex items-center">
      <div className={classNames(commonClasses, getStyle())}>
        {avatar ? (
          <Image src={avatar} layout="fill" alt="Profile" />
        ) : (
          nameInitial
        )}
      </div>
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary" : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
