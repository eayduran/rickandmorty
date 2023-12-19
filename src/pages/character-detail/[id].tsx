import DetailCard from "../../components/DetailCard";
import { CharacterSpec } from "../characters/[id]";
import { allCharacterIds } from "../../utils";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

function CharacterDetail({
  selectedCharacter,
  otherCharacters,
}: {
  selectedCharacter: CharacterSpec;
  otherCharacters: CharacterSpec[];
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center bg-white gap-y-2">
      <div className="my-4 mt-8 flex justify-between w-full">
        <button
          className="w-12 ml-16"
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/back.svg" alt="back" width={48} height={50} />
        </button>
        <Image
          src="/logo.png"
          alt="Rick and Morty Banner"
          width={200}
          height={200}
          priority
        />
        <div className="w-12 mr-16"></div>
      </div>
      <div className="px-16 bg-green-200s w-full h-full">
        {selectedCharacter ? (
          <ul className="flex justify-around items-start bg-blue-200s w-full h-full">
            <DetailCard character={selectedCharacter} />
            <div className="bg-red-200s w-1/3">
              <div className="font-extrabold text-xl mb-4">
                Other Characters
              </div>
              <div className="mb-4">
                {otherCharacters && (
                  <div className="flex">
                    <div>
                      <Image
                        src={otherCharacters[0].image}
                        alt="other-character-1"
                        width={100}
                        height={50}
                      />
                    </div>
                    <div className="bg-red-200s flex flex-col justify-start items-start pl-2">
                      <div className="text-2xl text-gray-500 font-sans">
                        {otherCharacters[0].name}
                      </div>
                      <div className="text-2xl italic">
                        {otherCharacters[0].location.name}
                      </div>
                      <div className="text-xl italic">
                        {otherCharacters[0].species} /{" "}
                        {otherCharacters[0].gender}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {otherCharacters && (
                  <div className="flex">
                    <div>
                      <Image
                        src={otherCharacters[1].image}
                        alt="other-character-2"
                        width={100}
                        height={50}
                      />
                    </div>
                    <div className="bg-red-200s flex flex-col justify-start items-start pl-2">
                      <div className="text-2xl text-gray-500 font-sans">
                        {otherCharacters[1].name}
                      </div>
                      <div className="text-2xl italic">
                        {otherCharacters[1].location.name}
                      </div>
                      <div className="text-xl italic">
                        {otherCharacters[1].species} /{" "}
                        {otherCharacters[1].gender}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ul>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="text-2xl font-bold">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const charId = query.id;

  // Fetch data
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${allCharacterIds}`
    );
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
