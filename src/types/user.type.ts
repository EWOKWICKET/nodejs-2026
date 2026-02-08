import { SoftDelete } from './soft-delete';

export type User = SoftDelete & {
  id: string;
  name: string;
  email: string;
};
