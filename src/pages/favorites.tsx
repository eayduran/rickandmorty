import { useSelector } from "react-redux";
import { selectCharacters } from "../store/characterSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import DetailCard from "@/components/DetailCard";
import Header from "@/components/Header";
import { CharacterSpec } from "@/types";

function Favorites() {
  const router = useRouter();
  const characterFav = useSelector((state: RootState) =>
    selectCharacters(state)
  );

  const goBack = () => {
    router.back();
  };

  const renderCharacterCards = () => {
    if (characterFav.length > 0) {
      return (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-2 gap-x-4 mx-16 mb-8 mt-4">
          {characterFav.map((character: CharacterSpec) => (
            <DetailCard key={character.id} character={character} />
          ))}
        </ul>
      );
    } else {
      return <h1>No Character Found</h1>;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white gap-y-2">
      <Header goBack={goBack} />
      {renderCharacterCards()}
    </div>
  );
}

export default Favorites;
