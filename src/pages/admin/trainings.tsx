import { useSession } from "next-auth/react";
import Router from "next/router";
import type { GetStaticPropsContext } from "next/types";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import AdminBreadcrumb from "~/lib/components/AdminBreadcrumb";
import {
  TrainingDatabaseColumns,
  type TrainingDatabaseColumnsProps,
} from "~/lib/components/dataTables/trainingTable/TrainingDatabaseColumns";
import { TrainingDatabaseTable } from "~/lib/components/dataTables/trainingTable/TrainingDatabaseTable";
import Layout from "~/lib/components/Layout";
import type { APIMessageResponse } from "~/lib/types";
import { db } from "~/server/db";

const juniorsTargets = [
  { value: "JuniorsOlder", label: "14-18 ans" },
  { value: "JuniorsYounger", label: "Jusqu'à 14 ans" },
  { value: "JuniorsAll", label: "Jusqu'à 18 ans" },
];

const adultsTargets = [
  { value: "LowerLeagues", label: "4ème ligue et non licenciés" },
  { value: "UpperLeagues", label: "LNB, 1ère et 2ème ligues" },
  { value: "Licensed", label: "LNB, 1ère, 2ème et 4ème ligues" },
  { value: "All", label: "Licenciés et non licenciés" },
  { value: "FreePlay", label: "Jeu libre" },
  { value: "LowLeagues", label: "4ème ligue" },
  { value: "Unlicensed", label: "Non licenciés" },
];

const daysOfWeek = [
  { value: "1Monday", label: "Lundi" },
  { value: "2Tuesday", label: "Mardi" },
  { value: "3Wednesday", label: "Mercredi" },
  { value: "4Thursday", label: "Jeudi" },
  { value: "5Friday", label: "Vendredi" },
  { value: "6Saturday", label: "Samedi" },
  { value: "7Sunday", label: "Dimanche" },
];

const times = ["18h00 - 20h00", "19h00 - 21h00", "20h00 - 22h00"];

const AdminTrainings = ({
  trainings,
}: {
  trainings: TrainingDatabaseColumnsProps[];
}) => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void Router.replace("/login");
    }
  }, [status]);
  // Trainings form state
  const [trainingType, setTrainingType] = useState<"Adults" | "Juniors">(
    "Adults",
  );
  const [trainingTarget, setTrainingTarget] = useState("");
  const [trainingDay, setTrainingDay] = useState("");
  const [trainingTime, setTrainingTime] = useState("");
  const [trainer, setTrainer] = useState("");

  // Holidays form state
  const [holidayLink, setHolidayLink] = useState("");
  const [holidayStart, setHolidayStart] = useState<Date | null>(null);
  const [holidayEnd, setHolidayEnd] = useState<Date | null>(null);

  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !trainingType ||
      !trainingTarget ||
      !trainingDay ||
      !trainingTime ||
      !trainer
    ) {
      toast.warning("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch("/api/trainings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: trainingType,
          target: trainingTarget,
          day: trainingDay,
          time: trainingTime,
          trainer,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as APIMessageResponse;
        toast.error(
          "Failed to submit training: " +
            (errorData.message ?? response.statusText),
        );
        return;
      }

      toast.success("Training submitted successfully!");

      setTrainingTarget("");
      setTrainingDay("");
      setTrainingTime("");
      setTrainer("");
      setTrainingType("Adults");
    } catch (error) {
      toast.error(
        "An error occurred: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  const handleHolidaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!holidayLink || !holidayStart || !holidayEnd) {
      toast.warning("Please fill all the fields.");
      return;
    }

    try {
      const response = await fetch("/api/seasonDuration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: holidayLink,
          start: holidayStart,
          end: holidayEnd,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as APIMessageResponse;
        toast.error(
          "Failed to submit holiday: " +
            (errorData.message || response.statusText),
        );
        return;
      }

      toast.success("Holiday submitted successfully!");

      // Clear form fields after success
      setHolidayLink("");
      setHolidayStart(null);
      setHolidayEnd(null);
    } catch (error) {
      toast.error(
        "An error occurred: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  return (
    <Layout>
      <AdminBreadcrumb currentPage="Trainings" />
      <div className="mx-auto max-w-7xl p-6 font-sans">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Training & Holiday Setup
        </h1>
        <div className="grid gap-10 md:grid-cols-2">
          {/* Trainings Form */}
          <form
            onSubmit={handleTrainingSubmit}
            className="min-w-[400px] rounded-lg border bg-white p-6 shadow-md"
            noValidate
          >
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Trainings
            </h2>

            {/* Type */}
            <label className="mb-4 block">
              <span className="mb-1 block font-medium text-gray-700">Type</span>
              <select
                value={trainingType}
                onChange={(e) => {
                  setTrainingType(e.target.value as "Adults" | "Juniors");
                  setTrainingTarget("");
                }}
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Adults">Adults</option>
                <option value="Juniors">Juniors</option>
              </select>
            </label>

            {/* Target */}
            <label className="mb-4 block">
              <span className="mb-1 block font-medium text-gray-700">
                Target
              </span>
              <select
                value={trainingTarget}
                onChange={(e) => setTrainingTarget(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select target
                </option>
                {(trainingType === "Juniors"
                  ? juniorsTargets
                  : adultsTargets
                ).map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            {/* Day */}
            <label className="mb-4 block">
              <span className="mb-1 block font-medium text-gray-700">Day</span>
              <select
                value={trainingDay}
                onChange={(e) => setTrainingDay(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select day
                </option>
                {daysOfWeek.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="mb-4 block">
              <span className="mb-1 block font-medium text-gray-700">Day</span>
              <input
                type="text"
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
                placeholder="Trainer's Name"
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Time */}
            <label className="mb-6 block">
              <span className="mb-1 block font-medium text-gray-700">Time</span>
              <select
                value={trainingTime}
                onChange={(e) => setTrainingTime(e.target.value)}
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select time
                </option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Training
            </button>
          </form>

          {/* Holidays Form */}
          <form
            onSubmit={handleHolidaySubmit}
            className="rounded-lg border bg-white p-6 shadow-md"
            noValidate
          >
            <h2 className="mb-6 text-center text-2xl font-semibold">
              Holidays
            </h2>
            {/* Holiday Link */}
            <label className="mb-4 block">
              <a
                className="mb-1 block font-medium text-gray-700 hover:text-blue-500 hover:underline"
                href="https://www.fr.ch/dfac/vacances-scolaires"
                target="_blank"
                rel="noopener noreferrer"
              >
                Holiday Link
              </a>
              <input
                type="url"
                value={holidayLink}
                onChange={(e) => setHolidayLink(e.target.value)}
                placeholder="https://example.com/holiday"
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            {/* Season Start */}
            <label className="mb-4 block">
              <span className="mb-1 block font-medium text-gray-700">
                Season Start
              </span>
              <input
                type="date"
                value={
                  holidayStart
                    ? holidayStart.toISOString().substring(0, 10)
                    : ""
                }
                onChange={(e) =>
                  setHolidayStart(
                    e.target.value ? new Date(e.target.value) : null,
                  )
                }
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            {/* Season End */}
            <label className="mb-4 block">
              <span className="mb-1 block font-medium text-gray-700">
                Season End
              </span>
              <input
                type="date"
                value={
                  holidayEnd ? holidayEnd.toISOString().substring(0, 10) : ""
                }
                onChange={(e) =>
                  setHolidayEnd(
                    e.target.value ? new Date(e.target.value) : null,
                  )
                }
                required
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Submit Holiday
            </button>
          </form>
        </div>
        <TrainingDatabaseTable
          columns={TrainingDatabaseColumns}
          data={trainings}
        />
      </div>
      <Toaster richColors />
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const trainings: TrainingDatabaseColumnsProps[] =
    await db.training.findMany();

  return {
    props: {
      messages: messages.default,
      trainings,
    },
  };
}

export default AdminTrainings;
