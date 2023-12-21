import { GetServerSidePropsContext } from "next";
import LocationCard from "../../components/LocationCard";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { LOCATION_API_URL } from "@/api/apiEndpoints";
import { LocationSpec } from "@/types";
import Skeleton from "react-loading-skeleton";
import Head from "next/head";

function LocationPage({ data }: { data: any }) {
  const router = useRouter();
  const { id } = router.query;

  const goToPage = (page: number) => {
    router.push(`/locations/${page}`);
  };

  const renderLocationCards = () => {
    if (data.results) {
      return (
        <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4">
          {data.results.map((location: LocationSpec) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </ul>
      );
    } else {
      return <Skeleton count={20} height={200} className="w-full" />;
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-white h-screen">
      <Head>
        <title>Locations</title>
      </Head>
      <div className="flex flex-col items-center justify-center gap-y-2 my-4 mt-8">
        <div>
          <Image
            src="/logo.png"
            alt="Rick and Morty Banner"
            width={250}
            height={250}
            className="w-[140px] xl:w-[250px]  h-auto"
            priority={true}
          />
        </div>
        <div className="mx-16 mt-4">{renderLocationCards()}</div>
      </div>
      <div className="my-4 pb-4">
        <Pagination
          totalPages={data.info.pages}
          currentPage={parseInt(id as string)}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
}

export default LocationPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const { url } = req;

  try {
    const response = await fetch(
      LOCATION_API_URL + `?page=${url?.split("?id=")[1]}`
    );
    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}
