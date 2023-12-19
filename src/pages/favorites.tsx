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
  const goBack = () => {
    router.back();
  };
  return (
    <div className="flex flex-col justify-center items-center bg-white gap-y-2">
      <button
        className="absolute left-4 top-8 xl:left-12 xl:top-12"
        onClick={goBack}
      >
        <Image src="/back.svg" alt="back" width={48} height={48} priority />
      </button>
      <div className="my-4 mt-8 bg-red-200s flex justify-center w-full">
        <Image
          src="/logo.png"
          alt="Rick and Morty Banner"
          width={250}
          height={250}
          className="w-[140px] xl:w-[250px]  h-auto"
          priority
        />
      </div>
      <div className="mx-16 mb-8 mt-4">
        {characterFav.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-4">
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
