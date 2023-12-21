import Image from "next/image";
import Link from "next/link";
import React from "react";

const Filter = ({ id, status }: { id: string; status: string }) => {
  return (
    <Link
      href={`/characters/${id}${
        status === "Reset" ? "" : `/?status=${status.toLowerCase()}`
      }`}
      className="flex p-2 border-2 border-black items-center justify-center rounded-lg"
    >
      {status !== "Reset" && (
        <Image
          src={`/status-${status}.svg`}
          className="mx-2"
          alt="list"
          width={18}
          height={18}
        />
      )}
      <div className={status !== "Reset" ? "mr-4" : ""}>{status}</div>
    </Link>
  );
};

export default Filter;
