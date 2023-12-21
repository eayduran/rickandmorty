import DetailCard from "../../components/DetailCard";
import { CHARACTER_API_URL, allCharacterIds } from "../../utils";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import OtherCharacter from "@/components/OtherCharacter";
import { CharacterDetail, CharacterSpec } from "@/types";

function CharacterDetail({
  selectedCharacter,
  otherCharacters,
}: CharacterDetail) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const renderOtherCharacters = () => {
    if (!selectedCharacter) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      );
    }

    return (
      <div className="px-[4vw] flex flex-col h-full items-start justify-start md:justify-center md:items-start md:mt-4 md:flex-row md:w-full md:gap-x-12">
        <DetailCard character={selectedCharacter} />
        <div className="flex-col justify-start items-start flex mt-6 gap-y-4 md:mt-0 md:w-1/3 md:h-full">
          <div className="font-extrabold text-2xl">Other Characters</div>
          {otherCharacters?.length > 0 && (
            <>
              <OtherCharacter character={otherCharacters[0]} />
              <OtherCharacter character={otherCharacters[1]} />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white gap-y-2">
      <Header goBack={goBack} />
      {renderOtherCharacters()}
    </div>
  );
}

export default CharacterDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const charId = query.id;

  // Fetch data
  try {
    const response = await fetch(CHARACTER_API_URL + allCharacterIds);
    const data = await response.json();

    const selectedCharacter = data.filter((character: CharacterSpec) => {
      return character.id.toString() === charId;
    })[0];

    const otherCharacters = data.filter((character: CharacterSpec) => {
      return (
        character.status === selectedCharacter.status &&
        character.location.name === selectedCharacter.location.name
      );
    });

    try {
      const locationResponse = await fetch(selectedCharacter.location.url);
      const locationData = await locationResponse.json();
      const selectedDimension = locationData.dimension;
      selectedCharacter.dimension = selectedDimension;
      otherCharacters[0].dimension = selectedDimension;
      otherCharacters[1].dimension = selectedDimension;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        props: {
          selectedCharacter: undefined,
          otherCharacters: [],
        },
      };
    }

    return {
      props: {
        selectedCharacter,
        otherCharacters,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        selectedCharacter: undefined,
        otherCharacters: [],
      },
    };
  }
}
