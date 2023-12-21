import Image from "next/image";
import Link from "next/link";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

// Component for displaying location details using semantic elements
const LocationDetails = ({ location }: { location: Location }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-extrabold text-xl mb-2">{location.name}</h2>
      <dl className="grid gap-2">
        <div className="flex items-center">
          <dt className="text-slate-500 mr-2">Type:</dt>
          <dd className="font-medium">{location.type}</dd>
        </div>
        <div className="flex items-center">
          <dt className="text-slate-500 mr-2">Dimension:</dt>
          <dd className="font-medium">{location.dimension}</dd>
        </div>
        <div className="flex items-center">
          <dt className="text-slate-500 mr-2">Resident Count:</dt>
          <dd className="font-medium">{location.residents.length}</dd>
        </div>
      </dl>
    </div>
  );
};

// Component for displaying the arrow icon
const ArrowIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <Image src="/arrow-right.svg" alt="arrow-right" width={20} height={20} />
    </div>
  );
};

// Main LocationCard component using semantic elements
export default function LocationCard({ location }: { location: Location }) {
  const locationName = location.name.replace(/\s/g, "-").toLowerCase();

  return (
    <Link
      href={`/characters/${locationName}`}
      className="p-4 flex items-start justify-between border-2 border-gray-800 rounded-lg hover:bg-gray-300 text-black transition"
    >
      <div>
        <LocationDetails location={location} />
      </div>
      <ArrowIcon />
    </Link>
  );
}
