import { useSession } from "next-auth/react";
import Router from "next/router";
import type { GetStaticPropsContext } from "next/types";
import React, { type FormEvent, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import {
  JuniorCompDatabaseColumns,
  type JuniorCompDatabaseColumnsProps,
} from "~/lib/components/dataTables/juniorCompTable/JuniorCompDatabaseColumns";
import { JuniorCompDatabaseTable } from "~/lib/components/dataTables/juniorCompTable/JuniorCompDatabaseTable";
import Layout from "~/lib/components/Layout";
import type { APIMessageResponse } from "~/lib/types";
import { db } from "~/server/db";

function JuniorCompetitions({
  comps,
}: {
  comps: JuniorCompDatabaseColumnsProps[];
}) {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  async function handleCompSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("/api/juniorComp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, location, date }),
    });
    if (response.status === 200 || response.status === 201) {
      setLocation("");
      setType("");
      setDate("");
      const data = (await response.json()) as APIMessageResponse;
      toast.success(data.message || "Competition added successfully.");
    } else {
      const data = (await response.json()) as APIMessageResponse;
      toast.error(
        data.message || "An error occurred while adding the competition.",
      );
    }
  }

  return (
    <Layout>
      <AdminBreadcrumb currentPage="Junior Competitions" />
      <div className="mx-auto max-w-7xl p-6 font-sans">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Junior Competition
        </h1>

        <form
          onSubmit={handleCompSubmit}
          className="mb-8 min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
          noValidate
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Add new competition
          </h2>

          {/* Location */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">
              Location
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Type */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value={"CJ"}>Circuit Junior</option>
              <option value={"Avenir"}>Coupe de l&apos;Avenir</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Competition
          </button>
        </form>
        <JuniorCompDatabaseTable
          columns={JuniorCompDatabaseColumns}
          data={comps}
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

  const comps = (await db.juniorComp.findMany()).map((comp) => ({
    ...comp,
    date: comp.date.toISOString(),
  }));

  return {
    props: {
      messages: messages.default,
      comps,
    },
  };
}
export default JuniorCompetitions;
