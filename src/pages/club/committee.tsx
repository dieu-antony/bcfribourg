import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import CommitteeCard from "~/lib/components/CommitteeCard";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";
import { db } from "~/server/db";
import type { CommitteeCardProps, Role } from "~/lib/types";

type CommitteeMember = {
  photoUrl: string;
  role: Role;
  role2: Role | "";
  name: string;
  email: string;
};

type Props = {
  members: CommitteeMember[];
};

const ROLE_ORDER: string[] = ["president", "vicePresident", "secretary"];

const rank = (m: { role: string; role2: string }) => {
  const ranks = [m.role, m.role2]
    .map((r) => ROLE_ORDER.indexOf(r))
    .filter((i) => i !== -1);
  return ranks.length > 0 ? Math.min(...ranks) : ROLE_ORDER.length;
};

const Committee = ({ members }: Props) => {
  const t = useTranslations("Committee");

  const info: CommitteeCardProps["info"][] = members.map((member) => ({
    imgRef: member.photoUrl,
    role: t(member.role),
    role2: member.role2 === "" ? "" : t(member.role2),
    name: member.name,
    email: member.email,
  }));

  return (
    <Layout>
      <Title>{t("title")}</Title>

      <div className="mx-auto mb-12 mt-6 flex w-full max-w-[1000px] flex-col gap-6 px-5">
        <section className="rounded border-l-4 border-picton-blue-500 bg-white p-5 shadow-md sm:p-6">
          <p className="leading-relaxed text-slate-700">
            {t("desc")}
          </p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {info.map((member, index) => (
            <CommitteeCard key={index} info={member} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const members = await db.committeeMember
    .findMany({
      select: {
        photoUrl: true,
        role: true,
        role2: true,
        name: true,
        email: true,
      },
    })
    .then((data) => {
      const sorted = data
        .map((member) => ({
          ...member,
          role2: member.role2 ?? "",
        }))
        .sort((a, b) => rank(a) - rank(b));
      return sorted;
    });

  return {
    props: {
      messages: messages.default,
      members,
    },
    revalidate: 604800,
  };
}

export default Committee;
