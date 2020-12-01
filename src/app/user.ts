export interface Roles{
  subscriber?: boolean;
  editor?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}

