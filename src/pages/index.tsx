import { CornerDownRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Highlight } from "~/lib/components/ui/hero-hightlight";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/lib/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const router = useRouter();

  return (
    <>
      <div className="mt-8 flex h-full min-h-max w-full flex-col items-center justify-center md:mt-16">
        <div className="mb-16">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-black sm:text-3xl md:text-4xl lg:text-6xl lg:leading-snug"
          >
            Bienvenue sur le site du
            <br />
            <Highlight className="">Badminton Club Fribourg</Highlight>
            <div className="mt-8 flex justify-around gap-2 ">
              <Link
                href="/calendar"
                className="cursor-pointer rounded-full border border-black px-2 py-2 text-sm font-bold shadow transition-transform duration-300 hover:scale-105 md:px-4 md:text-xl"
              >
                Prochains événements
              </Link>
              <Link
                href="/member"
                className="flex cursor-pointer border border-transparent items-center gap-2 self-center rounded-full bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 px-2 py-2 text-sm font-normal text-white shadow transition-transform duration-300 hover:scale-105 md:px-4 md:text-xl"
              >
                <CornerDownRight size="15px"/>
                Devenir membre
              </Link>
            </div>
          </motion.h1>
        </div>
        <Link href="/gallery" className="max-w-[1000px]">
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="items-center flex max-w-[1000px] max-h-[500px]">
                  <Image
                    src={`/assets/home/${index + 1}.jpg`}
                    alt="Interclub"
                    width={4080}
                    height={2160}
                    className="object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Link>
        <div className="flex flex-col" id="salle">
          <div className="m-5 max-w-[1000px] bg-white p-5 shadow">
            <h2 className="mb-2 bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 bg-clip-text font-bold text-transparent">
              Accès à la salle
            </h2>
            <div>
              <p className="mb-4">
                La salle se situe au Cycle d&apos;Orientation de langue
                allemande (DOSF) du quartier du Torry
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1007.374433125093!2d7.147392573094514!3d46.81173269592182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e692d3e895bc5%3A0xf65c4161fa3558f6!2sSchool%20Cycle%20Guidance%20Language%20German!5e1!3m2!1sen!2sch!4v1710603088742!5m2!1sen!2sch"
                className="mt-2 aspect-video w-full justify-self-center border-0"
              ></iframe>
              <p className="mb-4 mt-4">
                Ci-dessous, vous trouvez un plan détaillé du site lui-même
              </p>
              <a
                href={router.basePath + "assets/plan_du_site_grand.png"}
                target="_blank"
              >
                <Image
                  src="/assets/plan_du_site_grand.png"
                  alt="Plan de la salle"
                  width={800}
                  height={600}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
