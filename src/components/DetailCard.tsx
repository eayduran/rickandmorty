import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  deleteCharacter,
  selectCharacters,
} from "../store/characterSlice";

import { RootState } from "../store/store";
import Image from "next/image";
import { CharacterSpec } from "@/types";

export default function DetailCard({
  character,
}: {
  character: CharacterSpec;
}) {
  const dispatch = useDispatch();
  const detailCharacter = useSelector((state: RootState) =>
    selectCharacters(state)
  );
  const favoriteCharacter = {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    gender: character.gender,
    location: {
      name: character.location.name,
    },
  };

  return (
    <div className="border-2 flex flex-col items-end relative">
      {detailCharacter.some((char) => char.name === character.name) ? ( // Returns true
        <Image
          src="/heart-filled.svg"
          alt="heart"
          width={60}
          height={60}
          className="z-10 w-[36px] sm:w-[60px] absolute right-5 top-5 h-auto"
          onClick={() => {
            dispatch(deleteCharacter(character.id));
          }}
        />
      ) : (
        <Image
          src="/heart-empty.svg"
          alt="heart"
          width={60}
          height={60}
          className="z-10 w-[36px] sm:w-[60px] absolute right-5 top-5 h-auto"
          onClick={() => {
            dispatch(addCharacter(favoriteCharacter));
          }}
        />
      )}
      {/* </div> */}
      <div className="flex flex-col justify-center gap-2 items-center relative">
        <Image
          src={character.image}
          alt={character.name}
          width={600}
          height={600}
        />
        <div className="flex flex-col justify-between items-center w-full">
          <div className="w-full text-2xl text-[rgb(126,126,126)]">
            {character.name}
          </div>

          <div className="items-center justify-between w-full flex">
            <div className="flex items-center text-sm font-medium">
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
            <div className="flex items-center justify-end text-sm font-medium italic">
              {character.species} / {character.gender}
            </div>
          </div>
          <div className="flex w-full italic">{character.dimension}</div>
        </div>
      </div>
    </div>
  );
}
