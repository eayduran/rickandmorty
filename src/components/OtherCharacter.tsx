import { CharacterSpec } from "@/types";
import Image from "next/image";
import React from "react";

const OtherCharacter = ({ character }: { character: CharacterSpec }) => {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <Image
          src={character.image}
          alt="other-character-2"
          width={100}
          height={50}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-medium text-[rgb(126,126,126)]">
          {character.name}
        </h2>
        <p className="text-sm italic mb-1">{character.dimension}</p>
        <p className="text-sm italic">
          {character.species} / {character.gender}
        </p>
      </div>
    </div>
  );
};

export default OtherCharacter;
