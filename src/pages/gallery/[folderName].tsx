import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import { inter } from "../_app";
import type { SearchResult } from "~/lib/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function FolderPage() {
  const router = useRouter();
  const [resources, setResources] = useState<SearchResult[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const routerQuery = router.query.folderName as string;

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
    fetchResources();
  }, []);

  const filteredResources = resources.filter(
    (result) => result.asset_folder === routerQuery,
  );
  const folderName = filteredResources[0]?.asset_folder;
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, current]);

  if (loading) {
    return <></>;
  }
  if (filteredResources != null && filteredResources.length !== 0) {
    return (
      <>
        <div className="my-8 flex flex-col items-center px-5">
          <div className="grid w-full max-w-[1200px] grid-cols-3">
            <Link
              href="/gallery"
              className="flex w-24 items-center gap-1 self-center rounded-md bg-picton-blue-500 p-1 text-center text-white shadow-sm hover:cursor-pointer hover:bg-picton-blue-500/80 "
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
                    alt="Gallery image"
                    className="max-h-[300px] object-cover hover:opacity-80"
                  />
                </DialogTrigger>
                <DialogContent
                  className="max-h-[600px] max-w-[800px] border-none bg-transparent shadow-none"
                  closeClassName="hidden"
                >
                  <DialogTitle></DialogTitle>
                  <Carousel setApi={setApi} opts={{ startIndex: index }}>
                    <CarouselContent className="flex items-center">
                      {filteredResources.map((result) => (
                        <CarouselItem
                          key={result.public_id}
                          className="items-center"
                        >
                          <a
                            href={
                              "https://res.cloudinary.com/dpgefyzn1/image/upload/v1721078955/" +
                              result.public_id
                            }
                            target="_blank"
                          >
                            <CldImage
                              src={result.public_id}
                              width="1500"
                              height="700"
                              alt="Gallery image"
                              className="max-h-[600px] object-cover"
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
      </>
    );
  }
  return (
    <div className="mt-40 flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-bold">404</h1>
      <p>Sorry, there are no images in this folder</p>
      <Button onClick={() => router.back()} className="hover:opacity-80">
        Return
      </Button>
    </div>
  );
}
