import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ContentWrapper from "../../components/common/admin/ContentWrapper";
import LatestCommentListCard from "../../components/common/admin/LatestCommentListCard";
import LatestPostListCard from "../../components/common/admin/LatestPostListCard";
import LatestUserTable from "../../components/common/admin/LatestUserTable";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  LatestComment,
  LatestUserProfile,
  PostDetail,
} from "../../utils/types";

interface Props {
  users?: LatestUserProfile[];
}

const Admin: NextPage<Props> = () => {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>();
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

  useEffect(() => {
    //fetch latest posts
    axios("/api/posts?limit=5&skip=0")
      .then(({ data }) => {
        setLatestPosts(data.posts);
      })
      .catch((err) => console.log(err));

    //fetch latest comments
    axios("/api/comment/latest")
      .then(({ data }) => {
        setLatestComments(data.comments);
      })
      .catch((err) => console.log(err));

    //fetch latest users
    axios("/api/user/")
      .then(({ data }) => {
        setLatestUsers(data.users);
        console.log(data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper title="Latest Posts" seeAllRoute="/admin/posts">
          {latestPosts?.map(({ id, title, meta, slug }) => {
            return (
              <LatestPostListCard
                title={title}
                key={id}
                slug={slug}
                meta={meta}
              />
            );
          })}
        </ContentWrapper>
        <ContentWrapper title="Latest Comments" seeAllRoute="/admin/">
          {latestComments?.map((comment) => {
            return <LatestCommentListCard key={comment.id} comment={comment} />;
          })}
        </ContentWrapper>
      </div>
      {/*Latest Users*/}
      <div className="max-w-[500px]">
        <ContentWrapper title="Latest Users" seeAllRoute="/admin">
          <LatestUserTable users={latestUsers} />
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
