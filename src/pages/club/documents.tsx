import { FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/lib/components/ui/table";

const Documents = () => {
  const documents: {name: string, path: string, description:string}[] = [
    {
      name: "Statuts",
      path: "/documents/statuts_bcf_2024.pdf",
      description: "Statuts du Badminton Club Fribourg",
    },
    {
      name: "Charte",
      path: "/documents/charte.pdf",
      description: "Charte d'éthique",
    },
    {
      name:"Formulaire d'inscription",
      path: "/documents/inscription.pdf",
      description: "Formulaire d'inscription au club",
    },
    {
      name: "Code QR",
      path: "/documents/qr_code.pdf",
      description: "Code QR pour paiements",
    }
  ];

  return (
    <div className="mx-4 my-8 max-w-[1000px] lg:w-[900px] md:min-w-[700px] self-center bg-white p-5 lg:mt-16">
      <h1 className="mb-4 text-xl text-picton-blue-500">Documents</h1>
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

export default Documents;
