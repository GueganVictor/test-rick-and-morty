export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: 'Dead' | 'Alive' | 'Unknown';
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  imag: string;
  episode: string[];
  url: string;
  created: string;
}
