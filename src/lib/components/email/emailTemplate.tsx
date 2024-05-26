import * as React from "react";
import type { EmailData } from "~/lib/types";
export function EmailTemplate({
  firstName,
  lastName,
  email,
  message,
  phone,
  natel,
  address,
  npa,
  gender,
  birthdate,
  avs,
  license,
  subject,
}: EmailData) {
  if (subject == "inscription") {
    return (
      <div className="font-sans text-base leading-normal">
        <h1 className="mb-6 text-3xl font-bold">Nouvelle inscription!</h1>
        <table className="mb-6 w-full">
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <strong>Nom:</strong>
              </td>
              <td className="border px-4 py-2">{lastName}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>Prénom:</strong>
              </td>
              <td className="border px-4 py-2">{firstName}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>Sexe:</strong>
              </td>
              <td className="border px-4 py-2">{gender}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>Adresse:</strong>
              </td>
              <td className="border px-4 py-2">{address}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>NPA:</strong>
              </td>
              <td className="border px-4 py-2">{npa}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>Date de naissance:</strong>
              </td>
              <td className="border px-4 py-2">{birthdate}</td>
            </tr>
            {license && (
              <tr>
                <td className="border px-4 py-2">
                  <strong>License SB:</strong>
                </td>
                <td className="border px-4 py-2">{license}</td>
              </tr>
            )}
            <tr>
              <td className="border px-4 py-2">
                <strong>Tel Privé:</strong>
              </td>
              <td className="border px-4 py-2">{phone}</td>
            </tr>
            {natel && (
              <tr>
                <td className="border px-4 py-2">
                  <strong>Natel:</strong>
                </td>
                <td className="border px-4 py-2">{natel}</td>
              </tr>
            )}
            {avs && (
              <tr>
                <td className="border px-4 py-2">
                  <strong>AVS:</strong>
                </td>
                <td className="border px-4 py-2">{avs}</td>
              </tr>
            )}
            <tr>
              <td className="border px-4 py-2">
                <strong>Email:</strong>
              </td>
              <td className="border px-4 py-2">{email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>Message:</strong>
              </td>
              <td className="border px-4 py-2">{message}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">
                <strong>Sujet:</strong>
              </td>
              <td className="border px-4 py-2">{subject}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="font-sans text-base leading-normal">
        <h1 className="mb-6 text-xl font-bold">
          Enovyé par{" "}
          <strong>
            {lastName}, {firstName}
          </strong>
        </h1>
        <div>{message}</div>
        <div className="mt-6">
          <strong>Adresse email:</strong> {email}
        </div>
      </div>
    );
  }
}
