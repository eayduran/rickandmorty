import { CharacterSpec } from "@/types";
import Image from "next/image";
import React from "react";

const OtherCharacter = ({ character }: { character: CharacterSpec }) => {
  return (
    <div className="flex">
      <div>
        <Image
          src={character.image}
          alt="other-character-2"
          width={100}
          height={50}
        />
      </div>
      <div className="flex flex-col justify-start items-start pl-2">
        <div className="text-2xl text-[rgb(126,126,126)] font-sans">
          {character.name}
        </div>
        <div className="text-2xl italic">{character.dimension}</div>
        <div className="text-xl italic">
          {character.species} / {character.gender}
        </div>
      </div>
    </div>
  );
};

export default OtherCharacter;
