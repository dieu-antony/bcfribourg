import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import AccentBar from "~/lib/components/AccentBar";
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
  phone: string;
};

type Props = {
  members: CommitteeMember[];
};

const Committee = ({ members }: Props) => {
  const t = useTranslations("Committee");

  const info: CommitteeCardProps["info"][] = members.map((member) => ({
    imgRef: member.photoUrl,
    role: t(member.role),
    role2: member.role2 === "" ? "" : t(member.role2),
    name: member.name,
    email: member.email,
    phone: member.phone,
  }));

  return (
    <Layout>
      <Title>{t("title")}</Title>
      <div className="mb-4 mt-4 flex max-w-[1000px] flex-col place-items-center items-center self-center md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="relative mx-12 my-4 bg-white p-4 shadow-sm md:col-span-2 md:mx-20 lg:col-span-3 lg:mx-4">
          <p>{t("desc")}</p>
          <AccentBar />
        </div>

        {info.map((member, index) => (
          <CommitteeCard key={index} info={member} />
        ))}
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
        phone: true,
      },
    })
    .then((data) => {
      const sorted = data
        .map((member) => ({
          ...member,
          role2: member.role2 ?? "",
        }))
        .sort((a, b) => {
          const aIsPresident =
            a.role === "president" || a.role2 === "president";
          const bIsPresident =
            b.role === "president" || b.role2 === "president";
          if (aIsPresident && !bIsPresident) return -1;
          if (!aIsPresident && bIsPresident) return 1;
          return 0;
        });
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
