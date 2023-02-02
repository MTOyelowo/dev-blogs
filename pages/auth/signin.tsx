import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GitHubAuthButton } from "../../components/button";

interface Props {}

const Signin: NextPage<Props> = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  if (status === "loading")
    return (
      <div className="flex justify-center h-screen items-center">
        <h3 className="text-lg animate-pulse transition text-red-500">
          Signing you in...
        </h3>
      </div>
    );

  if (session) {
    setTimeout(() => {
      push("/admin/posts");
    }, 3000);
    return (
      <div className="flex justify-center h-screen items-center">
        <h3 className="font-serif text-lg text-blue-400 place-self-center animate-pulse">
          Sign in successful
        </h3>
      </div>
    );
  }
  const handleLoginWithGithub = async () => {
    await signIn("github");
  };
  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <GitHubAuthButton />
    </div>
  );
};

export default Signin;
