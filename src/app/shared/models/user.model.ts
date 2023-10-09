export interface User {
  email: string;
  displayName: string;
  token: string;
}

export interface Address {
  firstName?: string | null;
  lastName?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
}
