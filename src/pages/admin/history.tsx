import type { HistoryEvent } from "@prisma/client";
import { useSession } from "next-auth/react";
import Router from "next/router";
import type { GetStaticPropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import Layout from "~/lib/components/Layout";
import type { APIMessageResponse } from "~/lib/types";
import { db } from "~/server/db";

function History({ historyEvent }: { historyEvent: HistoryEvent[] }) {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  const currentYear = new Date().getFullYear();
  const startYear = 1960;
  const fullYearRange = Array.from(
    { length: currentYear + 1 - startYear + 1 },
    (_, i) => startYear + i,
  );

  const used = new Set(historyEvent.map((y) => y.year));
  const availableYears = fullYearRange.filter((y) => !used.has(y));

  const [year, setYear] = useState<number | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    t: "submit" | "delete",
  ) => {
    e.preventDefault();
    const response = await fetch("/api/history", {
      method: t === "delete" ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:
        t === "delete"
          ? JSON.stringify({ id })
          : JSON.stringify({ year, title, imageUrl }),
    });
    if (response.status === 200 || response.status === 201) {
      setYear(undefined);
      setTitle(undefined);
      setImageUrl(undefined);

      const data = (await response.json()) as APIMessageResponse;
      toast.success(data.message ?? "History event changed successfully.");
    } else {
      const data = (await response.json()) as APIMessageResponse;
      toast.error(
        data.message ?? "An error occurred while adding the history event.",
      );
    }
  };

  return (
    <Layout>
      <AdminBreadcrumb currentPage="History" />
      <div className="mx-auto max-w-7xl p-6 font-sans">
        <h1 className="mb-8 text-center text-3xl font-bold">History events</h1>
        <form
          onSubmit={(e) => handleSubmit(e, "submit")}
          className="mb-8 min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
          noValidate
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Create history event
          </h2>

          {/* Year */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Year</span>
            <select
              defaultValue=""
              value={year}
              onChange={(e) =>
                setYear(e.target.value ? Number(e.target.value) : undefined)
              }
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select year to add
              </option>
            {availableYears
              .sort((a, b) => b - a)
              .map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          {/* Content */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">
              Content
            </span>
            <span className="mb-1 block font-light text-gray-700">
              Please submit the content on
              <a
                className="ml-1 font-light text-gray-700 hover:text-picton-blue-500"
                href="https://crowdin.com/project/badminton-club-fribourg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Crowdin
              </a>
            </span>
          </label>

          {/* ImageURL */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">
              Image URL
            </span>
            <a
              className="mb-1 block font-light text-gray-700 hover:text-picton-blue-500"
              href="https://console.cloudinary.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ideally using cloudinary
            </a>
            <input
              type="text"
              value={imageUrl ?? undefined}
              onChange={(e) => setImageUrl(e.target.value || undefined)}
              placeholder="Optional"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Year
          </button>
        </form>
        <form
          onSubmit={(e) => handleSubmit(e, "delete")}
          className="mb-8 min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
          noValidate
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Delete year event
          </h2>

          {/* Year */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Year</span>
            <select
              value={id ?? ""}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select year to delete
              </option>
              {historyEvent
                .slice()
                .sort((a, b) => b.year - a.year)
                .map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.year}
                  </option>
                ))}
            </select>
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-red-500 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Delete Year
          </button>
        </form>
      </div>
      <Toaster richColors />
    </Layout>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const historyEvent = await db.historyEvent.findMany();

  return {
    props: {
      messages: messages.default,
      historyEvent,
    },
  };
}

export default History;
