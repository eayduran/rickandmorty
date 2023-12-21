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

export default function CharacterCard({
  character,
}: {
  character: CharacterSpec;
}) {
  // Take data from global store
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state: RootState) =>
    selectCharacters(state)
  );
  const favoriteChar = {
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
    <li className="border-2 w-[92vw] sm:w-auto flex flex-col items-end relative">
      {favoriteCharacters.some(
        (char: CharacterSpec) => char.name === character.name
      ) ? (
        <Image
          className="z-10 absolute right-5 top-5 h-auto sm:w-[64px]"
          src="/heart-filled.svg"
          alt="heart-filled"
          width={48}
          height={48}
          onClick={() => dispatch(deleteCharacter(character.id))}
        />
      ) : (
        <Image
          className="z-10 absolute right-5 top-5 h-auto sm:w-[64px]"
          src="/heart-empty.svg"
          alt="heart"
          width={48}
          height={48}
          onClick={() => {
            dispatch(addCharacter(favoriteChar));
          }}
        />
      )}
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
            <div className="text-[rgb(126,126,126)] text-xl w-32 lg:w-40 truncate">
              {character.name}
            </div>
            <div className="flex items-center text-sm font-medium">
              <Image
                className="mr-1"
                src={`/status-${character.status.toLowerCase()}.svg`}
                alt="arrow"
                width={18}
                height={18}
              />
              {character.status} - {character.species}
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
    </li>
  );
}
