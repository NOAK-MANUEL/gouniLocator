export interface LocationType {
  id: string;
  name: string;
  category: string;
  lat: number | null;
  long: number | null;
  description: string | null;
  aliases: string[];
}
