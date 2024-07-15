import { StickyScroll } from "~/lib/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import ScrollToTop from "~/lib/components/ScrollToTop";

const content1 = [
  {
    title: "Au commencement…",
    description:
      "Quelques adolescents du quartier du Jura jouent au jeu de volant. Objectif principal: Trouver des endroits à l'abri du vent! Parmi eux: Jean-Claude Doutaz, Pierre Guerra et Claude Page. A la fin des années soixante, les compères découvrent que le jeu de volant est un sport qui se pratique dans des clubs, il s'agit du badminton! Ils s'inscrivent au BC Wünnewil, seul club du canton.",
    content: (
      <div className="sticky flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  {
    title: "1969",
    description:
      "Le 12 novembre se tient l'assemblée de fondation du club, le Badminton Club Fribourg est né! Il compte 5 membres: Jean-Claude Doutaz (président), Pierre Guerra (caissier), Pierre Lorson (secrétaire), Rico Casutt et Juliette Guerra. Grâce à quelques bonnes relations, la petite troupe obtient la salle de sport du Schönberg les lundis et jeudis soirs. Toutefois lors de la saison 1969/1970 les joueurs du BC Fribourg participent pour leur 1ère saison en interclub sous les couleurs du BC Wünnewil. Jean-Claude Doutaz doit toutefois quitter la présidence du BC Fribourg. Pierre Guerra prend les rennes du club. Les couleurs du BC Fribourg sont dorénavant défendues en interclubs. Une équipe, composée de quatre messieurs, joue en 2e ligue.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  {
    title: "1973",
    description:
      "Le club poursuit son petit bonhomme de chemin. Il compte désormais 10 membres. La saison est marquée par l'ascension de l'équipe en 1e ligue. Une promotion décidée par la fédération suisse à l'aide de quelques artifices du règlement. Les femmes ont désormais droit de cité sur les courts. Elles rejoignent l'équipe. Parmi elle: Jane Skinner, anglaise, rejoint Fribourg en 1972. Elle fut ainsi la première joueuse étrangère dans les rangs du BC Fribourg.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  {
    title: "1975",
    description: "L'équipe est reléguée en 2e ligue.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  {
    title: "1976",
    description:
      "Une rencontre officielle opposant la Suisse à la Chine se déroule à la salle du Belluard, devant pas moins de 800 spectateurs. Un match placé sous haute tension, les Chinois très protocolaires et en pleine révolution culturelle ont donné du fil à retordre aux organisateurs. Mais aussi une visibilité au badminton qui apparaît pour la première fois dans les médias fribourgeois.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  {
    title: "1977",
    description:
      "Changement au comité: Marcel Petignat reprend la présidence et Pierre Guerra devient vice-président. Le club organise ses premières sorties hors de la salle : promenades, skis, etc.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  {
    title: "1979",
    description:
      "Lors de l'introduction de J+S, les deux entraîneurs du club, Pierre Guerra et Marcel Petignat, diplômés de l'Association suisse de badminton, font la transition et deviennent moniteurs J+S. Les membres du club peuvent désormais s'entraîner les mardis soirs au Collège Saint-Michel.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1978.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1978"
        />
      </div>
    ),
  },
  // {
  //   title: "",
  //   description: "",
  //   content: (
  //     <div className="flex h-full  w-full items-center justify-center text-white">
  //       <Image
  //         src="/assets/history/hist_1978.jpg"
  //         width={300}
  //         height={300}
  //         className="h-full w-full object-contain"
  //         alt="1978"
  //       />
  //     </div>
  //   ),
  // },
];

const content2 = [
  {
    title: "1982",
    description:
      "Les joueurs du club quittent la salle du Schönberg pour rejoindre la salle du Jura les lundis et vendredis soirs. Pour la première fois depuis sa fondation, le Badminton Club Fribourg compte deux équipes en championnat: l'équipe 1 évolue en 2e ligue, l'équipe 2 en 3e ligue. Parmi les joueurs, deux noms devenus incontournables sur les courts: Jean-Charles Bossens et Felice Marchesi.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1983",
    description:
      "Les premiers entraînements juniors sont dispensés par Pierre Guerra. Les résultats ne tardent pas: Francine Guerra est sélectionnée au cadre national junior (J14). Ascension de l'équipe 2 en 2e ligue. Felice Marchesi monte à deux reprises sur la deuxième marche du podium des championnats lémaniques, en simple messieurs D.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1984",
    description:
      "Le club organise les Championnats suisses juniors à la salle de Sainte-Croix.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1985",
    description:
      "Ascension en 1ère ligue pour la première équipe du club. Le BC Fribourg compte deux arbitres officiels: Daniel Dupraz et Marcel Petignat.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1986",
    description:
      "Francine Guerra remporte le championnat suisse junior, à la Chaux-de-Fonds. Elle décroche la médaille d'or en simple J14 et la médaille de bronze en double avec Santi Wibowo (Genève). En interclub, le BC Fribourg compte désormais 4 équipes.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1987",
    description:
      "Francine Guerra fait une nouvelle fois parler d'elle en championnat suisse junior, à Stein: elle fait un triplé. Médaille d'or en simple dame J14, en double dame avec Cathia Etzensberger (Bâle) et en mixte aux côtés de Martin Tschumi. Valentine Ayer et Véronique Petignat remportent quant à elles la deuxième place en double dame. Première organisation des Championnats fribourgeois en collaboration avec Villars-sur-Glâne.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1988",
    description:
      "Championnat suisse junior à Winthertour: En J14 Francine Guerra et Valentine Ayer remportent le titre de championne suisse junior en double dame. Valentine Ayer et Yvan Haymoz (Tavel) décroche la médaille d'or en mixte. Francine Guerra termine sur la deuxième marche du podium en simple dame J16. Daniel Dupraz reprend la présidence du club.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  {
    title: "1989",
    description:
      "Le BC Fribourg organise les championnats fribourgeois à Sainte-Croix et marque ainsi son 20 e anniversaire. Les médailles pleuvent à nouveau en championnat suisse junior: En catégorie J16 Francine Guerra et Valentine Ayer gagnent le double dame. Cette dernière remporte également le mixte avec son partenaire singinois, Yvan Haymoz. Chez les hommes, Didier Page obtient 3 médailles d'or : en simple, en double avec Damiano Slongo (Tavel) et le mixte avec Caroline Kull (Tavel).",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1984.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1984"
        />
      </div>
    ),
  },
  // {
  //   title: "",
  //   description: "",
  //   content: (
  //     <div className="flex h-full  w-full items-center justify-center text-white">
  //       <Image
  //         src="/assets/history/hist_1984.jpg"
  //         width={300}
  //         height={300}
  //         className="h-full w-full object-contain"
  //         alt="1984"
  //       />
  //     </div>
  //   ),
  // },
];

const content3 = [
  {
    title: "1990",
    description:
      "Le championnat suisse junior se déroule à Fribourg: Francine Guerra remporte le simple dame et le double dame, avec Valentine Ayer, en catégorie J18. En J16, Didier Page obtient la première place en double homme aux côtés de Patrick Bovard (Lausanne). Il monte sur la deuxième marche en simple et en mixte, avec Caroline Kull (Tavel). Le club compte ses premiers joueurs classés A: Claudine Francey, Francine Guerra, Jean-Charles Bossens, Felice Marchesi et Didier Page.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1991",
    description:
      "La saison est marquée par l'ascension de la première équipe en ligue B.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1993",
    description:
      "Le BC Fribourg organise une nouvelle fois les championnats fribourgeois et fête la même saison la promotion de son équipe en ligue A.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1994",
    description:
      "Encore une promotion, cette fois la 4e ligue rejoint la 3e ligue au terme de la saison. Les entraînements du club se déroulent désormais à la salle du CO de Pérolles.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1995",
    description:
      "Saison noire pour le BC Fribourg: la première équipe cède sa place en LNA pour retomber en ligue B. Même sort pour la 3e ligue qui retrouve la 4e ligue.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1996",
    description:
      "Le BC Fribourg et le BC Tavel s'associent. La collaboration entre les deux clubs se met en place aux entraînements et pour la première équipe. Les juniors sont pour la première fois finalistes de la coupe de l'avenir.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1997",
    description:
      "La première équipe se nomme désormais officiellement Union Fribourg Tafers.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  {
    title: "1999",
    description:
      "Les 30 ans du club sont fêtés dignement. Une sortie en Suisse centrale, à Morschach est organisée pour l'occasion. Quant au souper annuel du club, il compte plus de 100 personnes. Au niveau sportif, le BC Fribourg voit son équipe de 2e ligue retomber en 3e ligue.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_1993.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="1993"
        />
      </div>
    ),
  },
  // {
  //   title: "",
  //   description: "",
  //   content: (
  //     <div className="flex h-full  w-full items-center justify-center text-white">
  //       <Image
  //         src="/assets/history/hist_1993.jpg"
  //         width={300}
  //         height={300}
  //         className="h-full w-full object-contain"
  //         alt="1993"
  //       />
  //     </div>
  //   ),
  // },
];

const content4 = [
  {
    title: "2001",
    description:
      "Le BC Fribourg organise les championnats fribourgeois avec la collaboration du BC Granges-Paccot.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2002.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2002"
        />
      </div>
    ),
  },
  {
    title: "2002",
    description: "L'équipe de 2e ligue fête sa promotion en 1e ligue.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2002.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2002"
        />
      </div>
    ),
  },
  {
    title: "2004",
    description:
      "Le club se réjouit une nouvelle fois des bons résultats en interclub, la 4e ligue assure sa promotion en 3e. Sortie juniors organisées.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2002.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2002"
        />
      </div>
    ),
  },
  {
    title: "2005",
    description:
      "Le BC Fribourg, en étroite collaboration avec le BC Tafers, organise les championnats fribourgeois. Le premier camp d'été, se déroulant sur un week-end, est organisé à Yverdon.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2002.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2002"
        />
      </div>
    ),
  },
  {
    title: "2006",
    description:
      "La 3e ligue se voit rétrograder en 4e ligue au terme de la saison.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2002.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2002"
        />
      </div>
    ),
  },
  {
    title: "2007",
    description:
      "L'Union n'est plus réservée à l'élite. Lors de la coupe de l'avenir, les juniors, tant fribourgeois que singinois, défendent les couleurs de l'Union Fribourg-Tafers.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2002.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2002"
        />
      </div>
    ),
  },
  {
    title: "2008",
    description:
      "La 4e ligue termine brillamment première et rejoint ainsi la 3e ligue.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2008.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2008"
        />
      </div>
    ),
  },
  {
    title: "2009",
    description:
      "Pour marquer son 40e anniversaire, le club organise les championnats fribourgeois en collaboration avec le BC Tafers. La 3e ligue, après plusieurs tentatives, assure sa promotion et joue désormais en 2e ligue. Le club compte désormais des équipes dans toutes les ligues interclub, de la ligue A à la 4e ligue. Cadeau d'anniversaire, le BCF a désormais son site internet.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2008.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2008"
        />
      </div>
    ),
  },
  {
    title: "2010",
    description:
      "Une 3e équipe de 4e ligue est crée. Le club compte désormais 8 équipes en interclub.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2008.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2008"
        />
      </div>
    ),
  },
  {
    title: "2012",
    description:
      "A partir de la saison 2012-2013, toutes nos équipes sont intégrées à l'Union Fribourg-Tavel ! Nous comptons une 9ème équipe et sommes à nouveaux présents dans toutes les ligues.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2008.jpg"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2008"
        />
      </div>
    ),
  },
  // {
  //   title: "",
  //   description: "",
  //   content: (
  //     <div className="flex h-full w-full items-center justify-center text-white">
  //       <Image
  //         src="/assets/history/hist_1978.jpg"
  //         width={300}
  //         height={300}
  //         className="h-full w-full object-contain"
  //         alt="1978"
  //       />
  //     </div>
  //   ),
  // },
];

const content5 = [
  {
    title: "2019",
    description:
      "Le BC Fribourg fête son 50ème anniversaire. A cette occasion, le club organise notamment une sortie d'été sur les hauteurs de Loèche-les-bains.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2019.png"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2019"
        />
      </div>
    ),
  },
  {
    title: "2022",
    description:
      "Le club organise les championnats fribourgeois en collaboration avec le BC Villars-sur-Glâne.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2022.png"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2022"
        />
      </div>
    ),
  },
  {
    title: "2024",
    description:
      "L'Union Tafers-Fribourg doit retirer son équipe de la NLA. L'Union continuera avec 5 équipes en interclub, dont une en NLB, une en 1ère ligue, une en 2ème ligue et deux en 4ème ligue.",
    content: (
      <div className="flex h-full  w-full items-center justify-center text-white">
        <Image
          src="/assets/history/hist_2024.png"
          width={300}
          height={300}
          className="h-full w-full object-contain"
          alt="2024"
        />
      </div>
    ),
  },
  // {
  //   title: "",
  //   description: "",
  //   content: (
  //     <div className="flex h-full  w-full items-center justify-center text-white">
  //       <Image
  //         src="/assets/history/hist_2024.png"
  //         width={300}
  //         height={300}
  //         className="h-full w-full object-contain"
  //         alt="2024"
  //       />
  //     </div>
  //   ),
  // },
];

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const History = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="m-5 flex w-full max-w-[1000px] flex-col gap-4 rounded bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-picton-blue-500">
            Histoire du club
          </h1>
          <p>
            Le Badminton Club de Fribourg a été fondé officiellement le 12
            novembre 1969. Voici quelques-uns des faits marquants de la vie de
            notre club depuis ses débuts jusqu&apos;à aujourd&apos;hui:
          </p>
        </div>
      </div>
      <div className="mx-5 mb-8 w-full max-w-[1000px] self-center">
        <Accordion
          type="single"
          collapsible
          className="w-full rounded bg-white shadow-sm"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              1969 - 1979
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                <StickyScroll content={content1} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              1980 - 1989
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                <StickyScroll content={content2} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              1990 - 1999
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                <StickyScroll content={content3} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              2000 - 2014
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                <StickyScroll content={content4} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              2015 - {new Date().getFullYear()}
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                <StickyScroll content={content5} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <ScrollToTop />
    </>
  );
};

export default History;
