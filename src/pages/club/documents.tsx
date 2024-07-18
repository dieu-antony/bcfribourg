import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/lib/components/ui/table";
import { loadTranslationMessages } from "~/lib/utils/utils";

const Documents = () => {
  const t = useTranslations("documents");

  const documents: {name: string, path: string, description:string}[] = [
    {
      name: t("file1"),
      path: "/documents/statuts_bcf_2024.pdf",
      description: t("desc1"),
    },
    {
      name: t("file2"),
      path: "/documents/charte.pdf",
      description: t("desc2"),
    },
    {
      name:t("file3"),
      path: "/documents/demande_dadmission.docx",
      description: t("desc3"),
    },
    {
      name: t("file4"),
      path: "/documents/qr_code.pdf",
      description: t("desc4"),
    }
  ];

  return (
    <div className="mx-4 my-8 max-w-[1000px] lg:w-[900px] md:min-w-[700px] self-center bg-white p-5 lg:mt-16">
      <h1 className="mb-4 text-xl text-picton-blue-500">{t("title")}</h1>
      <Table>
        <TableBody>
          {documents.map((document, index) => (
            <TableRow key={index}>
              <TableCell>
                <a
                  key={index}
                  href={document.path}
                  className="m-2 flex flex-row items-center gap-1 hover:underline"
                  download={
                    document.path.split("/").pop()!.split(".")[0] + ".pdf"
                  }
                >
                  <FileText />
                  {document.name}
                </a>
              </TableCell>
              <TableCell>{document.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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

export default Documents;
