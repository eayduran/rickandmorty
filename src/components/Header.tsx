import Image from "next/image";
import React from "react";

const Header = ({ goBack }: { goBack: () => void }) => {
  return (
    <div className="my-4 mt-4 md:mt-8 flex justify-between w-full">
      <button className="ml-[4vw] md:ml-16" onClick={goBack}>
        <Image src="/back.svg" alt="back" width={48} height={48} />
      </button>
      <Image
        src="/logo.png"
        alt="Rick and Morty Banner"
        width={250}
        height={250}
        className="w-[140px] xl:w-[250px]  h-auto"
        priority
      />
      <div className="w-12 mr-[4vw] md:mr-16"></div>
    </div>
  );
};

export default Header;
