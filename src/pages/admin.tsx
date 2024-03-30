import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";

const admin = () => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);
  if (status === "authenticated") {
    return (
      <>
        <div>admin</div>
        {JSON.stringify(data.user, null, 2)}
      </>
    );
  }
};

export default admin;
