/**
 * Persistência do token de autenticação.
 *
 * Guardamos o token devolvido por `/auth/sign-in` no `localStorage` para que
 * o cliente HTTP (`#/lib/api`) o envie no header `Authorization` das próximas
 * requisições. `getToken` é seguro em SSR (retorna `null` sem `window`).
 */

const TOKEN_KEY = "rocha.auth.token";

export function getToken(): string | null {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
	return getToken() !== null;
}
