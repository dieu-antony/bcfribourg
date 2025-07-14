import { useSession } from "next-auth/react";
import Router from "next/router";
import type { GetStaticPropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import {
  ContactDatabaseColumns,
  type ContactDatabaseColumnsProps,
} from "~/lib/components/dataTables/contactTable/ContactDatabaseColumns";
import { ContactDatabaseTable } from "~/lib/components/dataTables/contactTable/ContactDatabaseTable";
import Layout from "~/lib/components/Layout";
import type { APIMessageResponse } from "~/lib/types";
import { db } from "~/server/db";

function Contacts({ contacts }: { contacts: ContactDatabaseColumnsProps[] }) {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);

  const POSITIONS = ["AdultsTraining", "JuniorsTraining", "Tournament"];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("AdultsTraining");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, position }),
    });
    if (response.status === 200 || response.status === 201) {
      setName("");
      setPhone("");
      setPosition("AdultsTraining");
      const data = (await response.json()) as APIMessageResponse;
      toast.success(data.message ?? "Contact added successfully.");
    } else {
      const data = (await response.json()) as APIMessageResponse;
      toast.error(
        data.message ?? "An error occurred while adding the contact.",
      );
    }
  };

  return (
    <Layout>
      <AdminBreadcrumb currentPage="Contacts" />
      <div className="mx-auto max-w-7xl p-6 font-sans">
        <h1 className="mb-8 text-center text-3xl font-bold">Contacts</h1>

        <form
          onSubmit={handleContactSubmit}
          className="mb-8 min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
          noValidate
        >
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Add new contact
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
            <span className="mb-1 block font-medium text-gray-700">Phone number</span>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="078 553 12 45"
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Position */}
          <label className="mb-4 block">
            <span className="mb-1 block font-medium text-gray-700">Position</span>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select role
              </option>
              {POSITIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Contact
          </button>
        </form>
        <ContactDatabaseTable
          columns={ContactDatabaseColumns}
          data={contacts}
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

  const contacts: ContactDatabaseColumnsProps[] = await db.contact.findMany();

  return {
    props: {
      messages: messages.default,
      contacts,
    },
  };
}

export default Contacts;
