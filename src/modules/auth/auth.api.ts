import { api } from "#/lib/api";
import { setToken } from "./auth.storage";
import type { SignInInput, SignInResponse } from "./auth.types";

export async function signIn(input: SignInInput): Promise<SignInResponse> {
	const result = await api.post<SignInResponse>("/auth/sign-in", input);
	setToken(result.token);
	return result;
}
