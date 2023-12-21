import { useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import { GetServerSidePropsContext } from "next";
import { CharacterList, CharacterSpec } from "@/types";
import { CHARACTER_API_URL, allCharacterIds } from "@/utils";

function CharactersListPage({ data, totalPages }: CharacterList) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  const goBack = () => {
    router.push("/locations/1");
  };

  const renderCharacterCards = () => {
    if (data[currentPage - 1]?.items.length > 0) {
      return (
        <ul className="grid grid-flow-col overflow-x-auto w-full sm:w-auto sm:overflow-x-hidden sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 max-w-screen-2xl">
          {data[currentPage - 1].items.map((character: CharacterSpec) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </ul>
      );
    } else {
      return (
        <div className="text-center mt-12">
          <h1>No Character Found</h1>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-white h-screen pb-2">
      <div className="flex h-full sm:h-auto flex-col items-center justify-start gap-y-2 w-full">
        <Header goBack={goBack} />
        <div className="px-[4vw] sm:px-16 w-full h-full justify-start items-center flex flex-col">
          <ul className="w-full md:max-w-screen-2xl flex justify-between mb-2">
            <li className="font-medium text-xl">Filter by status</li>
            <Link href="/favorites" className="font-medium text-xl underline">
              My Favorites
            </Link>
          </ul>
          <div className="overflow-x-auto sm:h-auto overflow-y-hidden items-center justify-start sm:justify-center flex w-full mb-4">
            <div className="flex gap-x-4">
              {["Alive", "Dead", "Unknown", "Reset"].map((status, index) => (
                <Filter key={index} id={id as string} status={status} />
              ))}
            </div>
          </div>
          {renderCharacterCards()}
        </div>
      </div>
      <div className="mt-2 sm:my-4 sm:pb-4">
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default CharactersListPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, query, req } = context;
  const locationName = query.id;
  const charStatus = query?.status;

  // Fetch data
  try {
    const response = await fetch(CHARACTER_API_URL + allCharacterIds);
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
