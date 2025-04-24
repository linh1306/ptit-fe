import { IUser } from "@app/type/schema.type";
import { createFetcher } from ".";

export type ISignInBody = Pick<IUser, "email" | "password">;

export interface ISignInRes {
  token: string;
}

export type ISignUpBody = Pick<IUser, "code" | "email" | "name" | "date_of_birth" | "course" | "password">;

export interface ISignUpRes {
  success: boolean;
}

export default {
  getMe: createFetcher<void, IUser>("auth/me", "get"),
  signIn: createFetcher<ISignInBody, ISignInRes>("auth/sign-in", "post"),
  signUp: createFetcher<ISignUpBody, ISignUpRes>("auth/sign-up", "post"),
  signOut: createFetcher<void, void>("auth/sign-out", "delete"),
};