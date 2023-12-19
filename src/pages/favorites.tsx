import { useSelector } from "react-redux";
import { selectCharacters } from "../store/characterSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DetailCard from "@/components/DetailCard";
import { CharacterSpec } from "./characters/[id]";

function Favorites() {
  const router = useRouter();
  const characterFav = useSelector((state: RootState) =>
    selectCharacters(state)
  );

  return (
    <div className="flex flex-col justify-center items-center bg-white gap-y-2">
      <div className="my-4 mt-8 flex justify-between w-full">
        <button
          className="w-12 ml-16"
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/back.svg" alt="back" width={48} height={48} priority />
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
      <div className="mx-16 mb-8 mt-4">
        {characterFav.length > 0 ? (
          <ul className="grid grid-cols-3 gap-y-2 gap-x-4">
            {characterFav.map((character: CharacterSpec) => (
              <DetailCard key={character.id} character={character} />
            ))}
          </ul>
        ) : (
          <h1>No Character Found</h1>
        )}
      </div>
    </div>
  );
}

export default Favorites;
