import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import LatestUserTable from "../../../components/common/admin/LatestUserTable";
import PageNavigator from "../../../components/common/PageNavigator";
import AdminLayout from "../../../components/layout/AdminLayout";
import { LatestUserProfile } from "../../../utils/types";

interface Props {}

const limit = 5;
let currentPageNo = 0;

const Users: NextPage<Props> = () => {
  const [users, setUsers] = useState<LatestUserProfile[]>();
  const [reachedEnd, setReachedEnd] = useState(false);

  // fetching all users

  const fetchAllUsers = (pageNo = currentPageNo) => {
    axios(`/api/user/?pageNo=${pageNo}&limit=${limit}`)
      .then(({ data }) => {
        if (!data.users.length) {
          currentPageNo -= 1;
          return setReachedEnd(true);
        }

        setUsers(data.users);
      })
      .catch((err) => console.log(err));
  };

  const handleOnNextClick = () => {
    if (reachedEnd) return;
    currentPageNo += 1;
    fetchAllUsers(currentPageNo);
  };
  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedEnd) setReachedEnd(false);
    currentPageNo -= 1;
    fetchAllUsers(currentPageNo);
  };

  useEffect(fetchAllUsers, []);

  return (
    <AdminLayout>
      <h1 className="text-primary-dark dark:text-primary text-2xl font-semibold py-2 transition">
        Users
      </h1>
      <LatestUserTable users={users} />
      <div className="py-10 flex justify-end">
        <PageNavigator
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
