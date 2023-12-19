import Image from "next/image";
import Link from "next/link";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export default function LocationCard({ location }: { location: Location }) {
  const locationName = location.name.replace(/\s/g, "-").toLowerCase();
  return (
    <Link
      href={`/characters/${locationName}`}
      className="p-4 flex items-start justify-between border-2 border-gray-800 rounded-lg hover:bg-gray-300 text-black transition"
    >
      <div className="gap-2 flex flex-col">
        <span className="font-extrabold text-xl">{location.name}</span>
        <span>
          <span className="text-slate-500 mr-2">Type:</span>
          <span className="font-medium">{location.type}</span>
        </span>
        <span>
          <span className="text-slate-500 mr-2">Dimension:</span>
          <span className="font-medium">{location.dimension}</span>
        </span>
        <span>
          <span className="text-slate-500 mr-2">Resident Count:</span>
          <span className="font-medium">{location.residents.length}</span>
        </span>
      </div>
      <div className="flex h-full items-center justify-center">
        <Image
          src="/arrow-right.svg"
          alt="arrow-right"
          width={20}
          height={20}
        />
      </div>
    </Link>
  );
}
