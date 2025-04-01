import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTranslations } from "next-intl";

const getCurrentYear = (): number => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  if (currentMonth >= 7) {
    return currentDate.getFullYear();
  } else {
    return currentDate.getFullYear() - 1;
  }
};

const CotisationTable = () => {
  const t = useTranslations("Member");
  const cotisation = [
    { catégorie: "Adultes", années: "", cotisation: "270.-", license: "60.-" },
    {
      catégorie: "Juniors U19",
      années:
        (getCurrentYear() - 18).toString() +
        " - " +
        (getCurrentYear() - 17).toString(),
      cotisation: "200.-",
      license: "40.-",
    },
    {
      catégorie: "Juniors U17",
      années:
        (getCurrentYear() - 16).toString() +
        " - " +
        (getCurrentYear() - 15).toString(),
      cotisation: "190.-",
      license: "30.-",
    },
    {
      catégorie: "Juniors U15",
      années:
        (getCurrentYear() - 14).toString() +
        " - " +
        (getCurrentYear() - 13).toString(),
      cotisation: "150.-",
      license: "30.-",
    },
    {
      catégorie: "Juniors U13",
      années: (getCurrentYear() - 12).toString() + " - ",
      cotisation: "120.-",
      license: "",
    },
  ];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-semibold text-picton-blue-500">
          {t("fee")}
        </AccordionTrigger>
        <AccordionContent>
          <Table className="shadow-md">
            <TableHeader>
              <TableRow>
                <TableHead>{t("category")}</TableHead>
                <TableHead>{t("years")}</TableHead>
                <TableHead>{t("fee")}</TableHead>
                <TableHead>{t("licence")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cotisation.map((cotisation) => (
                <TableRow key={cotisation.catégorie}>
                  <TableCell>{cotisation.catégorie}</TableCell>
                  <TableCell>{cotisation.années}</TableCell>
                  <TableCell>{cotisation.cotisation}</TableCell>
                  <TableCell>{cotisation.license}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CotisationTable;
