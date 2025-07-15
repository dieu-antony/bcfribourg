import { useSession } from "next-auth/react";
import Router from "next/router";
import type { GetStaticPropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import {
  CommitteeDatabaseColumns,
  type CommitteeDatabaseColumnsProps,
} from "~/lib/components/dataTables/committeeTable/CommitteeDatabaseColumns";
import { CommitteeDatabaseTable } from "~/lib/components/dataTables/committeeTable/CommitteeDatabaseTable";
import Layout from "~/lib/components/Layout";
import type { APIMessageResponse } from "~/lib/types";
import { db } from "~/server/db";

function Committee({ members }: { members: CommitteeDatabaseColumnsProps[] }) {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  const ROLES = [
    {
      value: "president",
      label: "Président",
    },
    { value: "treasurer", label: "Caissière" },
    { value: "vicePresident", label: "Vice-présidente" },
    { value: "events", label: "Evènements" },
    { value: "secretary", label: "Secrétaire" },
    { value: "interclubs", label: "Resp. interclubs" },
    { value: "sup", label: "Resp. ligues supérieures" },
    { value: "junior", label: "Resp. juniors" },
    { value: "media", label: "Resp. communication et médias" },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [role2, setRole2] = useState(null as string | null);
  const [photoUrl, setPhotoUrl] = useState("");

  const handleMemberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/committeeMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, role, role2, photoUrl }),
    });
    if (response.status === 200 || response.status === 201) {
      setName("");
      setEmail("");
      setRole("");
      setRole2(null);
      setPhotoUrl("");

      const data = (await response.json()) as APIMessageResponse;
      toast.success(data.message ?? "Member added successfully.");
    } else {
      const data = (await response.json()) as APIMessageResponse;
      toast.error(
        data.message ?? "An error occurred while adding the member.",
      );
    }
  };

  return (
    <Layout>
      <AdminBreadcrumb currentPage="Committee" />
      <div className="mx-auto max-w-7xl p-6 font-sans">
        <h1 className="mb-8 text-center text-3xl font-bold">Committee Members</h1>

        <form
          onSubmit={handleMemberSubmit}
          className="mb-8 min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
          noValidate
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Add new Member
          </h2>
          {/* Name */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          {/* Role 1 */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Role 1</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select role
              </option>
              {ROLES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          {/* Role 2 */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Role 2 (optional)</span>
            <select
              value={role2 ?? ""}
              onChange={(e) =>
                e.target.value === ""
                  ? setRole2(null)
                  : setRole2(e.target.value)
              }
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No second role</option>
              {ROLES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Photo</span>
            <a className="mb-1 block font-light text-gray-700 hover:text-picton-blue-500"
                href="https://console.cloudinary.com/"
                target="_blank"
                rel="noopener noreferrer"
            >Ideally using cloudinary</a>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Link to photo"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Member
          </button>
        </form>
        <CommitteeDatabaseTable
          columns={CommitteeDatabaseColumns}
          data={members}
        />
      </div>
      <Toaster richColors />
    </Layout>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const members: CommitteeDatabaseColumnsProps[] =
    await db.committeeMember.findMany();

  return {
    props: {
      messages: messages.default,
      members,
    },
  };
}

export default Committee;
