export interface CharacterSpec {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  liked?: boolean;
  gender?: string;
  dimension?: string;
  location: {
    name: string;
  };
}

export interface CharacterList {
  data: { page: number; items: CharacterSpec[] }[];
  totalPages: number;
}

export interface CharacterDetail {
  selectedCharacter: CharacterSpec;
  otherCharacters: CharacterSpec[];
}

export interface LocationSpec {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}
