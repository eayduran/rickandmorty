import { useDispatch, useSelector } from "react-redux";
import {
  addCharacter,
  deleteCharacter,
  selectCharacters,
} from "../store/characterSlice";

import { RootState } from "../store/store";
import { CharacterSpec } from "@/pages/characters/[id]";
import Image from "next/image";

export default function DetailCard({
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
      {/* <div className="z-10 flex h-8 w-8 justify-end items-center bg-blue-200 absolute right-8 top-8"> */}
      {characterFav.some((char) => char.name === character.name) ? ( // Returns true
        <Image
          className="z-10 absolute right-5 top-5 h-auto"
          src="/heart-filled.svg"
          alt="heart"
          height="10"
          width="36"
          onClick={() => {
            dispatch(deleteCharacter(character.id));
          }}
        />
      ) : (
        <Image
          className="z-10 absolute right-5 top-5 h-auto"
          src="/heart-empty.svg"
          alt="heart"
          height="10"
          width="36"
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
      {/* </div> */}
      <div className="bg-gray-400s p-2 flex flex-col justify-center gap-2 items-center relative">
        <Image
          src={character.image}
          alt={character.name}
          height="10"
          width={400}
        />
        <div className="flex flex-col justify-between items-center w-full">
          <div className="w-full text-2xl text-gray-400 sbg-red-200">
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
            <div className="flex items-center justify-end text-sm font-medium">
              {character.species} / {character.gender}
            </div>
          </div>
          <div className="flex w-full">{character.location.name}</div>
        </div>
      </div>
    </div>
  );
}
