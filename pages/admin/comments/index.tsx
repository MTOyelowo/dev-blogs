import { NextPage } from "next";
import Comments from "../../../components/common/Comments";
import AdminLayout from "../../../components/layout/AdminLayout";

interface Props {}

const AdminComments: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <h1 className="text-primary-dark dark:text-primary text-2xl font-semibold py-2 transition">
        Comments
      </h1>
      <div className="max-w-4xl mx-auto">
        <Comments fetchAll />
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
