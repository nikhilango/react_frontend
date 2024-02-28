import { Role } from './Role.model';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  group_id: string;
  roles: Role[];
};
