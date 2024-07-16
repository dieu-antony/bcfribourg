import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import type { SearchResult } from "~/lib/types";

export default function Gallery() {
  const [resources, setResources] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const cachedResources = localStorage.getItem('resources');
      if (cachedResources) {
        setResources(JSON.parse(cachedResources));
        setLoading(false);
      } else {
        const response = await fetch("/api/images/fetch-images");
        const data = await response.json();
        localStorage.setItem('resources', JSON.stringify(data.resources));
        setResources(data.resources);
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter(
    (result) => result.asset_folder.toLowerCase() === "cover images",
  );

  if (loading) {
    return <></>;
  }

  return (
    <div className="my-8 flex flex-col items-center px-5">
      <h1 className="my-8 mt-6 text-4xl font-semibold">Galerie</h1>
      <div className="grid max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-3">
        {filteredResources.map((result) => (
          <a
          key={result.public_id}
          href={"/gallery/" + encodeURI(result.tags[0]!)}
          className="relative block hover:opacity-80 transform duration-100 hover:-translate-y-1"
        >
          <CldImage
            src={result.public_id}
            alt="Cover Image"
            width="400"
            height="300"
            className="object-cover max-h-[250px]"
          />
          <span className="absolute z-10 text-white bottom-0 left-0 p-2 bg-black bg-opacity-75">
            {result.tags[0]}
          </span>
        </a>
        ))}
      </div>
    </div>
  );
}
