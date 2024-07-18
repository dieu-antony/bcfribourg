import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { loadTranslationMessages } from "~/lib/utils/utils";

const juniors = () => {
  const t = useTranslations("compJuniors");
  const circuitJunior = [
    { lieu: "Payerne", date: "30.11.2024" },
    { lieu: "Kerzers", date: "18.01.2025" },
    { lieu: "Gurmels", date: "15.02.2025" },
    { lieu: "Bulle", date: "22.02.2025" },
    { lieu: "Romont", date: "05.04.2025" },
    { lieu: "Masters: Villars-sur-Glâne", date: "18.05.2025" },
  ];
  const coupeAvenir = [
    { lieu: "CO de Pérolles, Fribourg", date: "23.11.2024" },
    { lieu: "CO de Pérolles, Fribourg", date: "14.12.2024" },
    { lieu: "CO de Pérolles, Fribourg", date: "11.01.2025" },
    { lieu: "CO de Pérolles, Fribourg", date: "08.02.2025" },
    { lieu: "CO de Pérolles, Fribourg", date: "29.03.2025" },
  ];
  return (
    <>
      <div className="m-4 mt-8 flex max-w-[1000px] flex-col self-center">
        <div className="flex flex-col gap-2 bg-white p-4 shadow-md">
          <h1 className="text-xl font-semibold text-picton-blue-500">
            {t("cj.title")}
          </h1>
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
                {circuitJunior.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.lieu}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 bg-white p-4 shadow-md">
          <h1 className="text-xl font-semibold text-picton-blue-500">
            Coupe l&apos;Avenir
          </h1>
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
                {coupeAvenir.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.lieu}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getStaticProps({ locale }: { locale: string }) {
  const messages = await loadTranslationMessages(locale);
  return {
    props: {
      messages,
    },
  };
}

export default juniors;
