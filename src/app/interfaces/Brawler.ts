export interface Brawler {
  id: number;
  name: string | null;
  brawler_class: { id?: number; name?: string | null } | null;
  category: { id?: number; name: string | null } | null;
  image_url: string | null;
  rarity: string | null;
  description: string | null;
  super_name: string | null;
  super_description: string | null;
  title: string | null;
  facts: { text: string }[] | null;
  tips: { text: string }[] | null;
}
