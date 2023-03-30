import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import useAuth from "../../../hooks/useAuth";
import { UserProfile } from "../../../utils/types";

interface Props {}

const MyProfile: NextPage<Props> = () => {
  const [socials, setSocials] = useState({ twitter: "", facebook: "" });
  const userProfile = useAuth();

  const [user, setUser] = useState<UserProfile>();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const { data } = await axios.patch(
        `/api/user/single-user?email=${userProfile?.email}`,
        { content: { twitter: socials.twitter, facebook: socials.facebook } }
      );
      console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setSocials({ ...socials, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios(
          `/api/user/single-user?email=${userProfile?.email}`
        );

        setUser(data.user);
      } catch (error) {}
    };
    fetchUser();
  }, [userProfile?.email]);

  return (
    <AdminLayout>
      <h1 className="mb-2 text-2xl font-semibold">My Admin Profile</h1>
      <div className="border h-[400px] w-[350px] p-2 rounded-md space-y-4">
        {/*Profile Icons*/}
        {user?.avatar ? (
          <div className="flex justify-end p-2">
            <div className="w-12 aspect-square relative">
              <Image
                src={user?.avatar}
                alt={user?.name}
                fill
                className="rounded-full"
              />
            </div>
          </div>
        ) : null}
        <div className="flex border-b space-x-2 h-10 pt-4">
          <h2 className="font-semibold">Name:</h2>
          <p className="text-gray-500">{user?.name}</p>
        </div>
        <div className="flex border-b space-x-2 h-10 pt-4">
          <h2 className="font-semibold">Email:</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <div className="flex border-b space-x-2 h-10 pt-4">
          <h2 className="font-semibold">Twitter:</h2>
          {user?.twitter === "" ? (
            <input
              type="text"
              name="twitter"
              onChange={handleChange}
              placeholder="Enter twitter handle here..."
              className="p-2 outline-none"
            />
          ) : (
            <input
              type="text"
              name="twitter"
              onChange={handleChange}
              placeholder={user?.twitter}
              className="p-2 outline-none text-gray-500"
            />
          )}
        </div>
        <div className="flex border-b space-x-2 h-10 pt-4">
          <h2 className="font-semibold">Facebook:</h2>
          {user?.facebook === "" ? (
            <input
              type="text"
              name="facebook"
              onChange={handleChange}
              placeholder="Enter facebook link here..."
              className="p-2 outline-none"
            />
          ) : (
            <input
              type="text"
              name="facebook"
              onChange={handleChange}
              placeholder={user?.facebook}
              className="p-2 outline-none text-gray-500"
            />
          )}
        </div>
        <div className="flex justify-end p-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 p-1 px-2 font-semibold text-white rounded-md place-self-end"
          >
            Submit
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MyProfile;
