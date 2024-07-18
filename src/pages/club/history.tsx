import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/lib/components/ui/accordion";
import ScrollToTop from "~/lib/components/ScrollToTop";
import HistoryCard from "~/lib/components/HistoryCard";
import { useTranslations } from "next-intl";
import Layout from "~/lib/components/Layout";
import type { GetStaticPropsContext } from "next";

const History = () => {
  const t = useTranslations("History");
  
  const content1 = [
    {
      title: t("events.start"),
      description: t("events.startDesc"),
    },
    {
      title: "1969",
      description: t("events.1969"),
    },
    {
      title: "1973",
      description: t("events.1973"),
    },
    {
      title: "1975",
      description: t("events.1975"),
    },
    {
      title: "1976",
      description: t("events.1976"),
    },
    {
      title: "1977",
      description: t("events.1977"),
      imgFile: "hist_1978.jpg",
    },
    {
      title: "1979",
      description: t("events.1979"),
    },
  ];

  const content2 = [
    {
      title: "1982",
      description: t("events.1982"),
    },
    {
      title: "1983",
      description: t("events.1983"),
    },
    {
      title: "1984",
      description: t("events.1984"),
      imgFile: "hist_1984.jpg",
    },
    {
      title: "1985",
      description: t("events.1985"),
    },
    {
      title: "1986",
      description: t("events.1986"),
    },
    {
      title: "1987",
      description: t("events.1987"),
    },
    {
      title: "1988",
      description: t("events.1988"),
    },
    {
      title: "1989",
      description: t("events.1989"),
    },
  ];

  const content3 = [
    {
      title: "1990",
      description: t("events.1990"),
    },
    {
      title: "1991",
      description: t("events.1991"),
    },
    {
      title: "1993",
      description: t("events.1993"),
      imgFile: "hist_1993.jpg",
    },
    {
      title: "1994",
      description: t("events.1994"),
    },
    {
      title: "1995",
      description: t("events.1995"),
    },
    {
      title: "1996",
      description: t("events.1996"),
    },
    {
      title: "1997",
      description: t("events.1997"),
    },
    {
      title: "1999",
      description: t("events.1999"),
    },
  ];

  const content4 = [
    {
      title: "2001",
      description: t("events.2001"),
    },
    {
      title: "2002",
      description: t("events.2002"),
      imgFile: "hist_2002.jpg",
    },
    {
      title: "2004",
      description: t("events.2004"),
    },
    {
      title: "2005",
      description: t("events.2005"),
    },
    {
      title: "2006",
      description: t("events.2006"),
    },
    {
      title: "2007",
      description: t("events.2007"),
    },
    {
      title: "2008",
      description: t("events.2008"),
      imgFile: "hist_2008.jpg",
    },
    {
      title: "2009",
      description: t("events.2009"),
    },
    {
      title: "2010",
      description: t("events.2010"),
    },
    {
      title: "2012",
      description: t("events.2012"),
    },
  ];

  const content5 = [
    {
      title: "2019",
      description: t("events.2019"),
      imgFile: "hist_2019.png",
    },
    {
      title: "2022",
      description: t("events.2022"),

      imgFile: "hist_2022.png",
    },
    {
      title: "2024",
      description: t("events.2024"),
      imgFile: "hist_2024.png",
    },
  ];

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="m-5 flex w-full max-w-[1000px] flex-col gap-4 rounded bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-picton-blue-500">
            {t("title")}
          </h1>
          <p>{t("description")}</p>
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
                {content1.map((item, index) => (
                  <HistoryCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    imgFile={item.imgFile}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              1980 - 1989
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                {content2.map((item, index) => (
                  <HistoryCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    imgFile={item.imgFile}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              1990 - 1999
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                {content3.map((item, index) => (
                  <HistoryCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    imgFile={item.imgFile}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              2000 - 2014
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                {content4.map((item, index) => (
                  <HistoryCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    imgFile={item.imgFile}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="justify-around" onClick={scrollTop}>
              2015 - {new Date().getFullYear()}
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative w-full">
                {content5.map((item, index) => (
                  <HistoryCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    imgFile={item.imgFile}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <ScrollToTop />
    </Layout>
  );
};
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}


export default History;
