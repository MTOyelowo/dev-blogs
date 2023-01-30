import Image from "next/legacy/image";
import { FC } from "react";
import { PostDetail } from "../../utils/types";
import dateformat from "dateformat";
import Link from "next/link";

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;

  return text.substring(0, trimBy).trim() + "...";
};

const PostCard: FC<Props> = ({
  post,
  busy,
  onDeleteClick,
  controls = false,
}): JSX.Element => {
  const { title, slug, meta, tags, thumbnail, createdAt } = post;
  return (
    <div className="rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark flex flex-col h-full">
      <div className="aspect-video relative">
        {!thumbnail ? (
          <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold italic">
            No Image
          </div>
        ) : (
          <Image src={thumbnail} layout="fill" alt="thumbnail" />
        )}
      </div>
      {/*Post Info*/}
      <div className="p-2 flex-1 flex flex-col">
        <Link href={"/" + slug}>
          <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
            <div className="flex items-center space-x-2">
              {tags.map((tag, index) => (
                <span key={tag + index}>#{tag}</span>
              ))}
            </div>
            <span>{dateformat(createdAt, "d-mmm-yyyy")}</span>
          </div>
          <h1 className="font-semibold text-primary-dark dark:text-primary">
            {trimText(title, 50)}
          </h1>
          <p className="text-secondary-dark dark:text-secondary-light">
            {trimText(meta, 70)}
          </p>
        </Link>

        {controls && (
          <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
            {busy ? (
              <span className="animate-pulse">Removing Post...</span>
            ) : (
              <>
                <Link href={"/admin/posts/update/" + slug}>
                  <span className="hover:underline">Edit</span>
                </Link>
                <button onClick={onDeleteClick} className="hover:underline">
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
