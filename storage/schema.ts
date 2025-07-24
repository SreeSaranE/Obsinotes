// storage/schema.ts
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  synced?: boolean;
};
