import { role } from "./enum/role";

export interface User {
  id: number;
  name: string;
  firstname: string;
  mail: string;
  password: string;
  role: role;
}

export interface Userlogin {
  mail: string;
  password: string;
}