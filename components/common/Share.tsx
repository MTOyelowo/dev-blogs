import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "next-share";
import { FC } from "react";

interface Props {
  url: string;
  title?: string;
  quote?: string;
}

const Share: FC<Props> = ({ url, title, quote }): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <p className="font-semibold text-primary-dark dark:text-primary">
        Share:
      </p>
      <FacebookShareButton url={url} quote={quote} title={title}>
        <FacebookIcon round size={28} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={28} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon round size={28} />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} source={quote} title={title}>
        <LinkedinIcon round size={28} />
      </LinkedinShareButton>
      <RedditShareButton url={url} title={title}>
        <RedditIcon round size={28} />
      </RedditShareButton>
    </div>
  );
};

export default Share;
