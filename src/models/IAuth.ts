export interface IAuth {
  status: string;
  token: string | null;
  errorMessage: string;
  user: string | null;
}
