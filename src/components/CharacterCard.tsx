import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  deleteCharacter,
  selectCharacters,
} from "../store/characterSlice";

import { CharacterSpec } from "../pages/characters/[id]";
import { RootState } from "../store/store";
import Image from "next/image";
import Link from "next/link";

export default function CharacterCard({
  character,
}: {
  character: CharacterSpec;
}) {
  const dispatch = useDispatch();
  const characterFav = useSelector((state: RootState) =>
    selectCharacters(state)
  );

  return (
    <div className="bg-red-200s border-2 flex flex-col items-end relative">
      {characterFav.some(
        (char: CharacterSpec) => char.name === character.name
      ) ? (
        <Image
          className="z-10 absolute right-5 top-5 h-auto"
          src="/heart-filled.svg"
          alt="heart"
          width={36}
          height={36}
          onClick={() => {
            dispatch(deleteCharacter(character.id));
          }}
        />
      ) : (
        <Image
          className="z-10 absolute right-5 top-5 h-auto"
          src="/heart-empty.svg"
          alt="heart"
          width={36}
          height={36}
          onClick={() => {
            dispatch(
              addCharacter({
                id: character.id,
                name: character.name,
                status: character.status,
                species: character.species,
                image: character.image,
                gender: character.gender,
                location: {
                  name: character.location.name,
                },
              })
            );
          }}
        />
      )}
      <Link
        href={`/character-detail/${character.id}`}
        className="w-76 p-2 flex flex-col justify-center gap-2 items-center relative"
      >
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="h-auto"
        />
        <div className="flex justify-between items-center bg-blue-200s px-6s w-full">
          <div className="bg-red-200s">
            <div className="font-bold text-xl w-32 lg:w-40 truncate">
              {character.name}
            </div>
            <div className="flex items-center text-sm font-medium bg-green-200s">
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
          <Image src="/arrow-right.svg" alt="arrow" width={24} height={24} />
        </div>
      </Link>
    </div>
  );
}
