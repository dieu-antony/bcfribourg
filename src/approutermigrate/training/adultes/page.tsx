const adultes = () => {
  return (
    <div className="m-5 max-w-[1000px] bg-gray-100 p-5">
      <h2 className="mb-2 bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 bg-clip-text font-bold text-transparent">
        Horaires d'entraînments
      </h2>
      <div>
        <p className="mb-4">
          Les horaires des entraînements des adultes du BC Fribourg (ainsi que
          du jeu libre) pour la saison 2023-2024 sont les suivants:
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1007.374433125093!2d7.147392573094514!3d46.81173269592182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e692d3e895bc5%3A0xf65c4161fa3558f6!2sSchool%20Cycle%20Guidance%20Language%20German!5e1!3m2!1sen!2sch!4v1710603088742!5m2!1sen!2sch"
          className="mt-2 aspect-video w-full justify-self-center border-0"
        ></iframe>
        <p className="mb-4 mt-4">
          Ci-dessous, vous trouvez un plan détaillé du site lui-même (cliquez
          sur l'image pour agrandir).
        </p>
        <img src="/assets/plan_du_site_grand.png" className="w-full" />
      </div>
    </div>
  );
};

export default adultes;
