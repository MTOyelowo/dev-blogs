import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

import Logo from "../Logo";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface Props {
  navItems: {
    href: string;
    label: string;
    icon: IconType;
  }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const toggleNav = (visibility: boolean) => {
    const currentNav = navRef.current;
    if (!currentNav) return;

    const { classList } = currentNav;

    if (visibility) {
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0"
    >
      <div>
        {/*LOGO*/}
        <Link href="/admin">
          <div className="flex items-center space-x-2 p-3 mb-10 cursor-pointer ">
            <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
            {visible && (
              <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none">
                Admin
              </span>
            )}
          </div>
        </Link>
        {/*NAV ITEMS*/}
        <div>
          {navItems.map((item) => {
            return (
              <Tippy key={item.href} content={item.label}>
                <Link href={item.href} key={item.href}>
                  <div className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition mb-6">
                    <item.icon size={24} />
                    {visible && (
                      <span className="ml-2 leading-none">{item.label}</span>
                    )}
                  </div>
                </Link>
              </Tippy>
            );
          })}
        </div>
      </div>
      {/*NAV TOGGLER BUTTON*/}
      <button
        onClick={updateNavState}
        className="text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
