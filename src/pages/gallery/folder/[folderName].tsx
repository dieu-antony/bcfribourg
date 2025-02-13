import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { Button } from "~/lib/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/lib/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/lib/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import type { SearchResult } from "~/lib/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import Layout, { inter } from "~/lib/components/Layout";
import ScrollToTop from "~/lib/components/ScrollToTop";

type FolderPageProps = {
  initialResources: SearchResult[];
};

const FolderPage = ({ initialResources }: FolderPageProps) => {
  const router = useRouter();
  const [resources, setResources] = useState<SearchResult[]>(initialResources);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const routerQuery = router.query.folderName as string;
  const normalizedFolder = routerQuery ? routerQuery.trim().toLowerCase() : "";

  useEffect(() => {
    if (!router.isReady) return;

    const fetchResources = async () => {
      try {
        const folderKey = `resources_${normalizedFolder}`;
        const cachedResources = localStorage.getItem(folderKey);
        if (cachedResources) {
          setResources(JSON.parse(cachedResources) as SearchResult[]);
        } else {
          setLoading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/images/fetch-images`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = (await response.json()) as {
            status: string;
            resources: SearchResult[];
          };
          const folderResources = data.resources.filter((result) =>
            result.asset_folder.trim().toLowerCase() === normalizedFolder
          );
          localStorage.setItem(folderKey, JSON.stringify(folderResources));
          setResources(folderResources);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchResources();
  }, [router.isReady, normalizedFolder]);

  const filteredResources = resources.filter((result) =>
    result.asset_folder.trim().toLowerCase() === normalizedFolder
  );

  const folderName = filteredResources[0]?.asset_folder;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  if (loading) {
    return (
      <Layout>
        <span />
      </Layout>
    );
  }

  if (filteredResources.length > 0) {
    return (
      <Layout>
        <div className="my-8 flex flex-col items-center px-5">
          <div className="grid w-full max-w-[1200px] grid-cols-3">
            <Link
              href="/gallery"
              className="flex w-24 items-center gap-1 self-center rounded-md bg-picton-blue-500 p-1 text-center text-white shadow-md hover:cursor-pointer hover:bg-picton-blue-500/80"
            >
              <ChevronLeft size="20px" /> Galerie
            </Link>
            <h1 className="my-8 self-center text-center text-xl font-semibold">
              {folderName}
            </h1>
          </div>
          <div className="grid max-w-[1200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredResources.map((result, index) => (
              <Dialog key={result.public_id}>
                <DialogTrigger onClick={() => setCurrent(index)}>
                  <CldImage
                    src={result.public_id}
                    width="300"
                    height="200"
                    alt="Badminton Fribourg"
                    className="max-h-[300px] object-cover hover:opacity-80"
                  />
                </DialogTrigger>
                <DialogContent
                  className="max-w-[800px] border-none bg-transparent shadow-none"
                  closeClassName="hidden"
                >
                  <DialogTitle />
                  <Carousel setApi={setApi} opts={{ startIndex: index }}>
                    <CarouselContent className="flex items-center">
                      {filteredResources.map((result) => (
                        <CarouselItem
                          key={result.public_id}
                          className="items-center"
                        >
                          <a
                            href={`https://res.cloudinary.com/dpgefyzn1/image/upload/v1721078955/${result.public_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <CldImage
                              src={result.public_id}
                              width="1500"
                              height="600"
                              alt="Badminton Fribourg"
                              className="max-h-[800px] object-cover"
                            />
                          </a>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="translate-x-8 border-none bg-gray-400 hover:bg-gray-400/80 md:translate-x-0" />
                    <CarouselNext className="-translate-x-8 border-none bg-gray-400 hover:bg-gray-400/80 md:translate-x-0" />
                  </Carousel>
                  <DialogDescription
                    className={`bg-gray-400 py-2 text-center ${inter.variable} font-sans text-black`}
                  >
                    {current + 1} / {count}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
        <ScrollToTop />
      </Layout>
    );
  }

  return (
    <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-bold">404</h1>
      <p>There are no images in this folder</p>
      <Button onClick={() => router.back()} className="hover:opacity-80">
        Back
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale, res }) => {
  const messages = (await import(`../../../../messages/${locale}.json`)) as IntlMessages;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images/fetch-images`);
  const data = (await response.json()) as {
    status: string;
    resources: SearchResult[];
  };

  const folderParam = (params?.folderName as string)?.trim().toLowerCase();

  const initialResources = data.resources.filter((resource: SearchResult) =>
    resource.asset_folder.trim().toLowerCase() === folderParam
  );

  if (initialResources.length === 0) {
    return {
      notFound: true,
    };
  }

  res.setHeader('Cache-Control', 's-maxage=28800, stale-while-revalidate=28800');

  return {
    props: {
      messages: messages.default,
      initialResources,
    },
  };
};

export default FolderPage;
