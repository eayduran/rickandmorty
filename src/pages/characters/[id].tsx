import { useEffect, useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import { allCharacterIds } from "../../utils";

import LocationCard from "../../components/LocationCard";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";

import { GetServerSidePropsContext } from "next";
import Link from "next/link";

// import DetailCard from "@/components/DetailCard";
export interface CharacterSpec {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  liked?: boolean;
  gender?: string;
  location: {
    name: string;
  };
}
function CharactersList({
  data,
  totalPages,
}: {
  data: { page: number; items: CharacterSpec[] }[];
  totalPages: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex flex-col justify-between items-center bg-white h-screen pb-2">
      <div className="flex flex-col items-center justify-start gap-y-2 w-full bg-green-100x">
        <Link href="/locations/1" className="my-8">
          <Image
            src="/logo.png"
            alt="Rick and Morty Banner"
            width={250}
            height={250}
            className="w-[140px] xl:w-[250px]  h-auto"
          />
        </Link>
        <div className="px-16 w-full justify-center items-center flex flex-col">
          <ul className="w-full flex justify-between mb-4">
            <li className="font-bold text-xl">Filter by status</li>
            <Link href="/favorites">My Favorites</Link>
          </ul>
          <div className="overflow-x-auto items-center justify-center flex w-full mb-4">
            <ul className="flex gap-x-4">
              <Link
                href={`/characters/${id}/?status=dead`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <div className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl">
                  <Image
                    src="/status-dead.svg"
                    alt="list"
                    width={18}
                    height={18}
                  />
                  <div>Dead</div>
                </div>
              </Link>
              <Link
                href={`/characters/${id}/?status=alive`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <div className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl">
                  <Image
                    src="/status-alive.svg"
                    alt="list"
                    width={18}
                    height={18}
                  />
                  <div>Alive</div>
                </div>
              </Link>
              <Link
                href={`/characters/${id}/?status=unknown`}
                className="flex border-2 items-center justify-center gap-2 rounded-xl"
              >
                <div className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl">
                  <Image
                    src="/status-unknown.svg"
                    alt="list"
                    width={18}
                    height={18}
                  />
                  <div>Unknown</div>
                </div>
              </Link>
              <Link
                href={`/characters/${id}/`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <div className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl">
                  Reset
                </div>
              </Link>
            </ul>
          </div>
          {data[currentPage - 1]?.items.length > 0 ? (
            <ul className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-12 max-w-screen-2xl">
              {data[currentPage - 1].items.map((character: CharacterSpec) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </ul>
          ) : (
            <div className="text-center mt-12">
              <h1>No Character Found</h1>
            </div>
          )}
        </div>
      </div>

      <div className="my-4 pb-4">
        {totalPages > 0 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CharactersList;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, query, req } = context;
  const locationName = query.id;
  const charStatus = query?.status;

  // Fetch data
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${allCharacterIds}`
    );
    const data = await response.json();
    const filteredData = data.filter((character: CharacterSpec) => {
      const formattedLocationName = character.location.name
        .replace(/\s/g, "-")
        .toLowerCase();

      const isLocationMatch = formattedLocationName === locationName;
      const isStatusMatch = charStatus
        ? character.status.toLowerCase() === charStatus
        : true;
      return isLocationMatch && isStatusMatch;
    });

    const itemsPerPage = 20; // Number of items per page
    const paginatedData = [];
    for (let i = 0; i < filteredData.length; i += itemsPerPage) {
      const pageItems = filteredData.slice(i, i + itemsPerPage);
      const pageNumber = Math.floor(i / itemsPerPage) + 1;
      paginatedData.push({ page: pageNumber, items: pageItems });
    }

    return {
      props: {
        data: paginatedData,
        totalPages: paginatedData.length,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
        totalPages: [],
      },
    };
  }
}
