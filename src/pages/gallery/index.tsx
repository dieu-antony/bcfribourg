import type { GetStaticPropsContext } from "next";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "~/lib/components/Layout";
import type { SearchResult } from "~/lib/types";

export default function Gallery() {
  const [resources, setResources] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const cachedResources = localStorage.getItem("resources");
      if (cachedResources) {
        setResources(JSON.parse(cachedResources));
        setLoading(false);
      } else {
        const response = await fetch("/api/images/fetch-images");
        const data = await response.json();
        localStorage.setItem("resources", JSON.stringify(data.resources));
        setResources(data.resources);
        setLoading(false);
      }
    };
    void fetchResources();
  }, []);

  const filteredResources = resources.filter(
    (result) => result.asset_folder.toLowerCase() === "cover images",
  );

  if (loading) {
    return <Layout><span/></Layout>;
  }

  return (
    <Layout>
      <div className="my-8 flex flex-col items-center px-5">
        <h1 className="my-8 mt-6 text-4xl font-semibold">Galerie</h1>
        <div className="grid max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-3">
          {filteredResources.map((result) => (
            <Link
              key={result.public_id}
              href={"/gallery/folder/" + encodeURI(result.tags[0] ?? "Championnats%20Fribourgeois%202024")}
              className="relative block transform duration-100 hover:-translate-y-1 hover:opacity-80"
            >
              <CldImage
                src={result.public_id}
                alt="Cover Image"
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
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
