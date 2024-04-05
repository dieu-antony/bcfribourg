import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BC Fribourg</title>
      </Head>
      <div className="flex h-full min-h-max w-full flex-col items-center justify-center pt-16">
        <h1 className="p-10 text-3xl font-bold">
          Bienvenue sur le site du
          <span className="bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 bg-clip-text text-transparent">
            {" "}
            Badminton Club Fribourg
          </span>
        </h1>
        <div className="flex flex-col">
          <div className="m-5 max-w-[1000px] bg-gray-100 p-5">
            <h2 className="mb-2 bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 bg-clip-text font-bold text-transparent">
              Accès à la salle
            </h2>
            <div>
              <p className="mb-4">
                La salle se situe au Cycle d'Orientation de langue allemande
                (DOSF) de la quartier du Torry
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1007.374433125093!2d7.147392573094514!3d46.81173269592182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e692d3e895bc5%3A0xf65c4161fa3558f6!2sSchool%20Cycle%20Guidance%20Language%20German!5e1!3m2!1sen!2sch!4v1710603088742!5m2!1sen!2sch"
                className="mt-2 aspect-video w-full justify-self-center border-0"
              ></iframe>
              <p className="mb-4 mt-4">
                Ci-dessous, vous trouvez un plan détaillé du site lui-même
                (cliquez sur l'image pour agrandir).
              </p>
              <img src="/assets/plan_du_site_grand.png" className="w-full" />
            </div>
          </div>
          <div className="w-50 m-5 min-h-[50px] bg-gray-100 p-5">
            <h2>Devenir membre</h2>
          </div>
          <div className="w-50 m-5 min-h-[50px] bg-gray-100 p-5">
            <h2>Contact</h2>
          </div>
        </div>
      </div>
    </>
  );
}
