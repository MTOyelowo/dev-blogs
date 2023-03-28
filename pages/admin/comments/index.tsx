import { NextPage } from "next";
import Comments from "../../../components/common/Comments";
import AdminLayout from "../../../components/layout/AdminLayout";

interface Props {}

const AdminComments: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <Comments fetchAll />
    </AdminLayout>
  );
};

export default AdminComments;
