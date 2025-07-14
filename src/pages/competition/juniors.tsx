import { format } from "date-fns";
import type { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { db } from "~/server/db";

type juniorCompDataType = {
  id: string;
  type: string;
  location: string;
  date: string;
};

const Juniors = ({
  juniorCompData,
}: {
  juniorCompData: juniorCompDataType[];
}) => {
  const t = useTranslations("CompJuniors");
  return (
    <Layout>
      <Title>{t("title")}</Title>
      <div className="m-4 mt-8 flex max-w-[1000px] flex-col self-center">
        <div className="flex flex-col gap-2 bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold text-picton-blue-500">
            {t("cj.title")}
          </h2>
          <div className="flex flex-col gap-4">
            <span>{t("cj.description")}</span>
            <Table className="max-w-[700px] shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("location")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {juniorCompData
                  .filter((item) => item.type === "CJ")
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{format(new Date(item.date),"dd.MM.yyyy")}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 bg-white p-4 shadow-md">
          <h2 className="text-xl font-semibold text-picton-blue-500">
            Coupe l&apos;Avenir
          </h2>
          <div className="flex flex-col gap-4">
            <span>{t("ca.description")}</span>
            <Table className="max-w-[700px] shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("location")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {juniorCompData
                  .filter((item) => item.type === "Avenir")
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{format(new Date(item.date),"dd.MM.yyyy")}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const juniorCompData = (await db.juniorComp.findMany()).map((comp) => ({
    ...comp,
    date: comp.date.toISOString(),
  }));

  return {
    props: {
      messages: messages.default,
      juniorCompData,
    },
    revalidate: 604800,
  };
}
export default Juniors;
