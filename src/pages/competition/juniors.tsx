import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";

const juniors = () => {
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
            Circuit Junior
          </h1>
          <div className="flex flex-col gap-4">
            <span>
              Le Circuit Junior est une série de tournois pour les juniors en
              simple. Les catégories sont U11, U13, U15, U17 et U19. Pour plus
              d&apos;informations, veuillez consulter le site de l&apos;AFB. Pour
              l&apos;Inscription, veuillez contacter votre entraineur!
            </span>
            <Table className="max-w-[700px] shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Date</TableHead>
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
            Coupe Avenir
          </h1>
          <div className="flex flex-col gap-4">
            <span>
              La Coupe Avenir est un tournois sous forme &quot;interclub&quot; (en equipe)
              pour juniors avec 2 catégories: U12 et U16. Pour plus
              d&apos;informations, veuillez consulter le site de l&apos;AFB. Pour
              l&apos;Inscription, veuillez contacter votre entraineur!
            </span>
            <Table className="max-w-[700px] shadow-md">
              <TableHeader>
                <TableRow>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Date</TableHead>
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

export default juniors;
