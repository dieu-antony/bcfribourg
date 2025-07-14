import { useSession } from "next-auth/react";
import Router from "next/router";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "~/lib/components/ui/sonner";
import type { APIMessageResponse, PastTeamProps } from "~/lib/types";
import type { GetStaticPropsContext } from "next";
import Layout from "~/lib/components/Layout";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";

const IcData = () => {
  const [teams, setTeams] = useState<PastTeamProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  async function onTeamFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setTeams([]);
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const toastId = toast.loading("Uploading teams...");

    const reader = new FileReader();

    reader.addEventListener("load", function () {
      const parsedTeams = JSON.parse(
        reader.result as string,
      ) as PastTeamProps[];
      setTeams((prev) => [...prev, ...parsedTeams]);
      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Teams uploaded successfully");
    });
    reader.readAsText(file);
  }

  async function onTeamSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (teams.length === 0) return;

    const response = await fetch("/api/pastTeams/create", {
      method: "POST",
      body: JSON.stringify(teams),
    });
    const data = (await response.json()) as APIMessageResponse;
    if (data.status === "success") {
      toast.success(data.message);
    }
    if (data.status === "error") {
      toast.error(data.message);
    }
  }

  if (status === "authenticated") {
    return (
      <Layout>
        <AdminBreadcrumb currentPage="IC Data" />
        <div className="mt-6 flex flex-col items-center justify-center gap-2">
          <div className="container">
            <h2 className="text-xl">Upload Team Interclub Data (JSON file)</h2>
            <form onSubmit={onTeamSubmit}>
              <input
                type="file"
                onChange={onTeamFileUpload}
                accept=".json"
                className="m-1 block w-full rounded-sm border-0 p-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-picton-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                required
              />
              <input
                type="submit"
                value="Submit"
                className="m-1 rounded-sm bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                disabled={loading}
              />
            </form>
          </div>
          <Toaster richColors />
        </div>
      </Layout>
    );
  }
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  return {
    props: {
      messages: messages.default,
    },
  };
}
export default IcData;
