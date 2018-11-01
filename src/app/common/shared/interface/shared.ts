export interface Types {
  name: string;
  color: string;
}

export interface PokeConfig {
  gen: number;
  other: boolean;
}

export interface PokeCardConfig {
  url: string;
  name: string;
  isEsc: boolean;
}

export interface PokeCard {
  id: string;
  gen: string;
  name: string;
  slug: string;
  image: string;
  url: string;
}

export interface BottomSheetData {
  region: string;
  pokemon: PokeCard[];
}
