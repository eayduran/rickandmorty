import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  deleteCharacter,
  selectCharacters,
} from "../store/characterSlice";
import { RootState } from "../store/store";
import Image from "next/image";
import { CharacterSpec } from "@/types";

// FavoriteButton for DetailCard
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
      src={heartIcon}
      alt="heart"
      width={60}
      height={60}
      className="favorite-button"
      onClick={onClick}
    />
  );
};

// CharacterDetails for DetailCard
const CharacterDetails = ({ character }: { character: CharacterSpec }) => {
  return (
    <div className="flex flex-col justify-center gap-2 items-center relative">
      <Image
        src={character.image}
        alt={character.name}
        width={600}
        height={600}
      />
      <div className="flex flex-col justify-between items-center w-full">
        <div className="detail-name">{character.name}</div>
        <div className="items-center justify-between w-full flex">
          <div className="detail-status">
            <Image
              src={`/status-${character.status.toLowerCase()}.svg`}
              alt="arrow"
              height="10"
              width={18}
            />
            <div className="ml-2">
              {character.status} - {character.species}
            </div>
          </div>
          <div className="detail-species">
            {character.species} / {character.gender}
          </div>
        </div>
        <div className="detail-dimension">{character.dimension}</div>
      </div>
    </div>
  );
};

// DetailCard components
export default function DetailCard({
  character,
}: {
  character: CharacterSpec;
}) {
  const dispatch = useDispatch();
  const detailCharacters = useSelector((state: RootState) =>
    selectCharacters(state)
  );

  const favoriteCharacter = {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    gender: character.gender,
    location: { name: character.location.name },
  };

  const isFavorite = detailCharacters.some(
    (char) => char.name === character.name
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(deleteCharacter(character.id));
    } else {
      dispatch(addCharacter(favoriteCharacter));
    }
  };

  return (
    <div className="border-2 flex flex-col items-end relative">
      <FavoriteButton isFavorite={isFavorite} onClick={handleToggleFavorite} />
      <CharacterDetails character={character} />
    </div>
  );
}
