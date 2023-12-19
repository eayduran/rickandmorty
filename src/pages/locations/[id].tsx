import { useEffect, useState } from "react";
import LocationCard from "../../components/LocationCard";
import Image from "next/image";
import Pagination from "@/components/Pagination";
// import Pagination from "../../components/Pagination";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./index.css";
// import Skeleton from "react-loading-skeleton";

export interface LocationSpec {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

function Location({ data }: { data: any }) {
  const [locations, setLocations] = useState<never[]>([]); // Provide a type for the characters state variable
  const [totalPages, setTotalPages] = useState<number>(50);
  // const route = useLocation();
  // const pageNumber = route.pathname.split("/locations/")[1];
  // const navigate = useNavigate();

  function GoToPage(page: number) {
    // navigate(`/locations/${page}`);
  }

  // useEffect(() => {
  //   fetch(`https://rickandmortyapi.com/api/location/?page=${1}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTotalPages(data.info.pages);
  //       setLocations(data.results);
  //     });
  // }, []);
  return (
    <div className="flex flex-col justify-between items-center bg-white h-screen">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="my-4 mt-8">
          <Image
            src="/logo.png"
            alt="Rick and Morty Banner"
            width={200}
            height={200}
          />
        </div>
        <div className="mx-16">
          <div className="w-full font-bold text-3xl mb-4">Locations</div>
          {data.results ? (
            <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-4">
              {data.results.map(
                (
                  location: LocationSpec // Remove the type annotation for character
                ) => (
                  <LocationCard key={location.id} location={location} />
                )
              )}
            </ul>
          ) : (
            // <Skeleton count={10} />
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div className="my-4 pb-4">
        <Pagination
          totalPages={totalPages}
          currentPage={parseInt("2")}
          onPageChange={GoToPage}
        />
      </div>
    </div>
  );
}

export default Location;

export async function getServerSideProps() {
  // Fetch data
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/location/?page=${1}`
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
        data: [], // Return an empty array or handle the error case accordingly
      },
    };
  }
}
