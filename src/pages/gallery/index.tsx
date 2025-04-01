import type { GetStaticPropsContext } from "next";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import Layout from "~/lib/components/Layout";
import { Title } from "~/lib/components/Title";
import type { SearchResult } from "~/lib/types";

type GalleryProps = {
  initialData: SearchResult[];
};

export default function Gallery({ initialData }: GalleryProps) {
  const t = useTranslations("Gallery");
  const [resources] = useState<SearchResult[]>(initialData);

  const filteredResources = resources.filter(
    (result) => result.asset_folder.toLowerCase() === "cover images",
  );

  return (
    <Layout>
      <Title>{t("title")}</Title>
      <div className="my-8 flex flex-col items-center px-5">
        <div className="grid max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-3">
          {filteredResources.map((result) => (
            <Link
              key={result.public_id}
              href={
                "/gallery/folder/" +
                encodeURI(
                  result.tags[0] ?? "Championnats%20Fribourgeois%202024",
                )
              }
              className="relative block transform duration-100 hover:-translate-y-1 hover:opacity-80"
            >
              <CldImage
                src={result.public_id}
                alt="Badminton Fribourg"
                width="400"
                height="300"
                className="max-h-[250px] object-cover"
              />
              <span className="absolute bottom-0 left-0 z-10 bg-black bg-opacity-75 p-2 text-white">
                {result.tags[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(
    `../../../messages/${locale}.json`
  )) as IntlMessages;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/images/fetch-images`,
  );
  const result = (await res.json()) as {
    status: string;
    resources: SearchResult[];
  };

  return {
    props: {
      messages: messages.default,
      initialData: result.resources,
    },
    revalidate: 86400,
  };
}
