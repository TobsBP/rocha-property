import { api, isApiConfigured } from "#/lib/api";
import { setToken } from "./auth.storage";
import type { SignInInput, SignInResponse } from "./auth.types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function signIn(input: SignInInput): Promise<SignInResponse> {
	const result = isApiConfigured
		? await api.post<SignInResponse>("/auth/sign-in", input)
		: await mockSignIn(input);

	setToken(result.token);
	return result;
}

async function mockSignIn(input: SignInInput): Promise<SignInResponse> {
	await delay(600);
	if (!input.email || !input.password) {
		throw new Error("Informe e-mail e senha.");
	}
	return { token: `mock-token-${btoa(input.email)}` };
}
