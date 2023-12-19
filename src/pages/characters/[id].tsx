import { useEffect, useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import { allCharacterIds } from "../../utils";

import LocationCard from "../../components/LocationCard";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";

import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import DetailCard from "@/components/DetailCard";
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

  return (
    // <div className="flex flex-col justify-between items-center bg-white h-screen pb-2">
    //   <div className="flex flex-col items-center justify-start gap-y-2 w-full bg-green-100s">
    //     <a href="/locations/1" className="my-8">
    //       <Image
    //         className="h-auto"
    //         src="/logo.png"
    //         alt="Rick and Morty Banner"
    //         width={200}
    //         height={200}
    //         priority
    //       />
    //     </a>
    //     <div className="px-16 w-full">
    //       <ul className="w-full flex justify-between mb-4">
    //         <li className="font-bold text-3xl">Characters</li>
    //         <ul className="flex">
    //           <span className="flex items-center justify-center mr-2">
    //             Filter by status
    //           </span>
    //           <a
    //             href={`?status=dead`}
    //             className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
    //           >
    //             <Image
    //               src="/status-dead.svg"
    //               alt="dead"
    //               width={18}
    //               height={18}
    //             />
    //             <span>Dead</span>
    //           </a>
    //           <a
    //             href={`?status=alive`}
    //             className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
    //           >
    //             <Image
    //               src="/status-alive.svg"
    //               alt="alive"
    //               width={18}
    //               height={18}
    //             />
    //             <span>Alive</span>
    //           </a>
    //           <a
    //             href={`?status=unknown`}
    //             className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
    //           >
    //             <Image
    //               src="/status-unknown.svg"
    //               alt="unknown"
    //               width={18}
    //               height={18}
    //             />
    //             <span>Unknown</span>
    //           </a>
    //           <a
    //             href={`?`}
    //             className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
    //           >
    //             <span>Reset</span>
    //           </a>
    //         </ul>
    //         <Link href="/favorites">My Favorites</Link>
    //       </ul>
    //       {data.length > 0 ? (
    //         data[currentPage - 1].items.map(
    //           (character: CharacterSpec, index: number) => (
    //             <DetailCard key={character.id} character={character} />
    //           )
    //         )
    //       ) : (
    //         <div className="text-center mt-12">
    //           <h1>No Character Found</h1>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   <div className="my-4 pb-4">
    //     {totalPages > 0 ? (
    //       <Pagination
    //         totalPages={totalPages}
    //         currentPage={currentPage}
    //         onPageChange={setCurrentPage}
    //       />
    //     ) : null}
    //   </div>
    // </div>

    <div className="flex flex-col justify-between items-center bg-white h-screen pb-2">
      <div className="flex flex-col items-center justify-start gap-y-2 w-full bg-green-100x">
        <a href="/locations/1" className="my-8">
          <Image
            src="/logo.png"
            alt="Rick and Morty Banner"
            width={200}
            height={200}
          />
        </a>
        <div className="px-16 w-full justify-center items-center flex flex-col">
          <ul className="w-full flex justify-between mb-4">
            <li className="font-bold text-3xl">Characters</li>
            <ul className="flex">
              <span className="flex items-center justify-center mr-2">
                Filter by status
              </span>
              <a
                href={`?status=dead`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <Image
                  src="/status-dead.svg"
                  alt="list"
                  width={18}
                  height={18}
                />
                <span>Dead</span>
              </a>
              <a
                href={`?status=alive`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <Image
                  src="/status-alive.svg"
                  alt="list"
                  width={18}
                  height={18}
                />
                <span>Alive</span>
              </a>
              <a
                href={`?status=unknown`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <Image
                  src="/status-unknown.svg"
                  alt="list"
                  width={18}
                  height={18}
                />
                <span>Unknown</span>
              </a>
              <a
                href={`?`}
                className="flex w-28 border-2 items-center justify-center gap-2 rounded-xl"
              >
                <span>Reset</span>
              </a>
            </ul>
            <Link href="/favorites">My Favorites</Link>
          </ul>
          {data[currentPage - 1]?.items.length > 0 ? (
            <ul className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-12 max-w-screen-2xl">
              {data[currentPage - 1].items.map(
                (
                  character: CharacterSpec // Remove the type annotation for character
                ) => (
                  <CharacterCard key={character.id} character={character} />
                )
              )}
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
