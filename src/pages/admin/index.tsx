import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { Button } from "~/lib/components/ui/button";
import type { GetStaticPropsContext } from "next";
import Layout from "~/lib/components/Layout";

const Admin = () => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <Layout>
        <Head>
          <title>Admin</title>
        </Head>
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Admin</h1>
          <h2 className="text-xl">
            Logged in as <span className="font-bold">{data.user?.email}</span>
          </h2>
          <Button onClick={() => Router.push("/admin/icdata")}>IC Data</Button>
          <Button onClick={() => Router.push("/admin/players")}>Players</Button>
          <Button onClick={() => Router.push("/admin/calendar")}>
            Calendar
          </Button>
        </div>
      </Layout>
    );
  }
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}

export default Admin;
