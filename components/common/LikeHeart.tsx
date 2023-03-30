import { FC, useEffect, useRef, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Props {
  busy?: boolean;
  selected?: boolean;
  label?: string;
  liked?: boolean;
  onClick?(): void;
}

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  onClick,
  busy,
  selected,
}): JSX.Element => {
  const [animateLike, setAnimateLike] = useState(false);
  const timerId: { current: NodeJS.Timeout | null } = useRef(null);

  const likeIcon = liked ? (
    <div className={animateLike ? "animate-bounce" : "animate-none"}>
      <BsHeartFill
        color="#4790FD"
        className={animateLike ? "animate-wiggle" : "animate-none"}
      />
    </div>
  ) : (
    <div className={animateLike ? "animate-bounce" : "animate-none"}>
      <BsHeart className={animateLike ? "animate-wiggle" : "animate-none"} />
    </div>
  );

  useEffect(() => {
    onClick && selected && setAnimateLike(true);
  }, [onClick, selected]);

  useEffect(() => {
    if (animateLike) {
      timerId.current = setTimeout(() => {
        setAnimateLike(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timerId.current as NodeJS.Timeout);
    };
  }, [animateLike, onClick]);

  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex items-center space-x-2 outline-none px-2 p-1 hover:bg-slate-100 rounded-full"
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" /> : likeIcon}

      <span>{label}</span>
    </button>
  );
};

export default LikeHeart;
