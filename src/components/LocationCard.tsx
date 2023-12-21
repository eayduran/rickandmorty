import Image from "next/image";
import Link from "next/link";
import { Location } from "@/types";

// Component for displaying location details
const LocationDetails = ({ location }: { location: Location }) => {
  return (
    <div className="flex flex-col">
      <h2 className="location-name">{location.name}</h2>
      <dl className="grid gap-2">
        <div className="flex items-center">
          <dt className="location-text-variable">Type:</dt>
          <dd className="location-text">{location.type}</dd>
        </div>
        <div className="flex items-center">
          <dt className="location-text-variable">Dimension:</dt>
          <dd className="location-text">{location.dimension}</dd>
        </div>
        <div className="flex items-center">
          <dt className="location-text-variable">Resident Count:</dt>
          <dd className="location-text">{location.residents.length}</dd>
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

// Main LocationCard component
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
