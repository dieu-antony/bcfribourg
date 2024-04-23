import Head from "next/head";
import Map from "~/lib/components/Map";
const links = () => {
  return (
    <>
      <Head>
        <title>Liens</title>
      </Head>
      <Map longitude={47.15741469347104} latitude={7.819150610677002}/>

    </>
  );
};

export default links;
