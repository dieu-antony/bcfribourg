import { useSession } from "next-auth/react";
import Router from "next/router";
import type { GetStaticPropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import {
  SponsorDatabaseColumns,
  type SponsorDatabaseColumnsProps,
} from "~/lib/components/dataTables/sponsorTable/SponsorDatabaseColumns";
import { SponsorDatabaseTable } from "~/lib/components/dataTables/sponsorTable/SponsorDatabaseTable";
import Layout from "~/lib/components/Layout";
import type { APIMessageResponse } from "~/lib/types";
import { db } from "~/server/db";

function Sponsors({ sponsors }: { sponsors: SponsorDatabaseColumnsProps[] }) {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [tier, setTier] = useState(3);
  const [logoUrl, setLogoUrl] = useState("");

  const handleSponsorSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/sponsors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link, tier, logoUrl }),
    });
    if (response.status === 200 || response.status === 201) {
      setName("");
      setLink("");
      setTier(3);
      setLogoUrl("");

      const data = (await response.json()) as APIMessageResponse;
      toast.success(data.message ?? "Sponsor added successfully.");
    } else {
      const data = (await response.json()) as APIMessageResponse;
      toast.error(
        data.message ?? "An error occurred while adding the sponsor.",
      );
    }
  };

  return (
    <Layout>
      <AdminBreadcrumb currentPage="Sponsor" />
      <div className="mx-auto max-w-7xl p-6 font-sans">
        <h1 className="mb-8 text-center text-3xl font-bold">Sponsors</h1>

        <form
          onSubmit={handleSponsorSubmit}
          className="mb-8 min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
          noValidate
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Add new a sponsor
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
            <span className="mb-1 block font-medium text-gray-700">Link</span>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Tier</span>
            <select
              value={tier}
              onChange={(e) => setTier(Number(e.target.value))}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>Or</option>
              <option value={2}>Argent</option>
              <option value={3}>Bronze</option>
            </select>
          </label>

          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Photo</span>
            <a
              className="mb-1 block font-light text-gray-700 hover:text-picton-blue-500"
              href="https://console.cloudinary.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ideally using cloudinary
            </a>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Link to photo"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Sponsor
          </button>
        </form>
        <SponsorDatabaseTable
          columns={SponsorDatabaseColumns}
          data={sponsors}
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

  const sponsors: SponsorDatabaseColumnsProps[] = await db.sponsor.findMany();

  return {
    props: {
      messages: messages.default,
      sponsors,
    },
  };
}

export default Sponsors;
