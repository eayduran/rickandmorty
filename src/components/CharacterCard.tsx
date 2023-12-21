import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  deleteCharacter,
  selectCharacters,
} from "../store/characterSlice";
import { RootState } from "../store/store";
import Image from "next/image";
import Link from "next/link";
import { CharacterSpec } from "@/types";

const FavoriteButton = ({
  isFavorite,
  onClick,
}: {
  isFavorite: boolean;
  onClick: () => void;
}) => {
  const heartIcon = isFavorite ? "/heart-filled.svg" : "/heart-empty.svg";

  return (
    <Image
      className="favorite-button"
      src={heartIcon}
      alt={isFavorite ? "heart-filled" : "heart"}
      width={48}
      height={48}
      onClick={onClick}
    />
  );
};

const CharacterInfo = ({ character }: { character: CharacterSpec }) => {
  return (
    <Link
      href={`/character-detail/${character.id}`}
      className="p-2x w-full flex sm:w-full flex-col justify-center gap-2 items-center relative"
    >
      <Image
        src={character.image}
        alt={character.name}
        width={400}
        height={400}
        className="h-auto w-screen sm:w-[600px]"
      />
      <div className="flex w-full justify-between items-center">
        <div>
          <div className="character-card-name">{character.name}</div>
          <div className="character-card-status">
            <Image
              className="mr-1"
              src={`/status-${character.status.toLowerCase()}.svg`}
              alt="arrow"
              width={18}
              height={18}
            />
            {`${character.status} - ${character.species}`}
          </div>
        </div>
        <Image
          src="/arrow-right.svg"
          className="mr-4 h-auto"
          alt="arrow"
          width={24}
          height={24}
        />
      </div>
    </Link>
  );
};

export default function CharacterCard({
  character,
}: {
  character: CharacterSpec;
}) {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state: RootState) =>
    selectCharacters(state)
  );

  const isFavorite = favoriteCharacters.some(
    (char: CharacterSpec) => char.name === character.name
  );

  const favoriteChar = {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    gender: character.gender,
    location: { name: character.location.name },
  };

  const handleAddToFavorites = () => {
    dispatch(addCharacter(favoriteChar));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(deleteCharacter(character.id));
  };

  return (
    <li className="border-2 w-[92vw] sm:w-auto flex flex-col items-end relative">
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
      />
      <CharacterInfo character={character} />
    </li>
  );
}
