import * as React from "react";
import type { EmailData } from "~/lib/types";

export function EmailTemplate({
  firstName,
  lastName,
  email,
  message,
  phone,
  address,
  npa,
  gender,
  birthdate,
  avs,
  license,
  subject,
  comms,
}: EmailData) {
  if (subject == "Inscription") {
    return (
      <div className="font-sans text-base leading-normal">
        <h2 className="mb-6 text-3xl font-bold">Nouvelle inscription!</h2>
        <table className="mb-6 w-full">
          <tbody>
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Nom:</strong>
              </td>
              <td className="border px-4 py-2">{lastName}</td>
            </tr>
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Prénom:</strong>
              </td>
              <td className="border px-4 py-2">{firstName}</td>
            </tr>
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Sexe:</strong>
              </td>
              <td className="border px-4 py-2">{gender}</td>
            </tr>
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Adresse:</strong>
              </td>
              <td className="border px-4 py-2">{address}</td>
            </tr>
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>NPA:</strong>
              </td>
              <td className="border px-4 py-2">{npa}</td>
            </tr>
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Date de naissance:</strong>
              </td>
              <td className="border px-4 py-2">{birthdate}</td>
            </tr>
            {license && (
              <tr className="gap-2">
                <td className="border px-4 py-2">
                  <strong>License SB:</strong>
                </td>
                <td className="border px-4 py-2">{license}</td>
              </tr>
            )}
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Tel Privé:</strong>
              </td>
              <td className="border px-4 py-2">{phone}</td>
            </tr>
            {avs && (
              <tr className="gap-2">
                <td className="border px-4 py-2">
                  <strong>AVS:</strong>
                </td>
                <td className="border px-4 py-2">{avs}</td>
              </tr>
            )}
            <tr className="gap-2">
              <td className="border px-4 py-2">
                <strong>Email:</strong>
              </td>
              <td className="border px-4 py-2">{email}</td>
            </tr>
            {comms && (
              <tr className="gap-2">
                <td className="border px-4 py-2">
                  <strong>Moyen de communication:</strong>
                </td>
                <td className="border px-4 py-2">{comms}</td>
              </tr>
            )}
            {message && (
              <tr className="gap-2">
                <td className="border px-4 py-2">
                  <strong>Message:</strong>
                </td>
                <td className="border px-4 py-2">{message}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="font-sans text-base leading-normal text-black">
        <h2 className="text-md mb-6">
          Enovyé par{" "}
          <strong>
            {firstName} {lastName}
          </strong>
        </h2>
        <div className="mt-4 flex flex-col gap-2">
          <p>
            <strong>Adresse email:</strong> {email}
          </p>
          <strong>Message:</strong>
          <p>{message}</p>
        </div>
      </div>
    );
  }
}
