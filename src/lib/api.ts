/**
 * Cliente HTTP tipado para falar com a API.
 *
 * A base da API vem de `VITE_API_URL`. Quando essa variável não está
 * configurada, `isApiConfigured` fica `false` e os módulos caem no mock
 * data — assim o app continua funcionando sem um backend rodando.
 */

export const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
export const isApiConfigured = API_URL.length > 0;

/** Erro lançado quando a API responde com status fora da faixa 2xx. */
export class ApiError extends Error {
	constructor(
		readonly status: number,
		message: string,
		readonly body?: unknown,
	) {
		super(message);
		this.name = "ApiError";
	}
}

type QueryValue = string | number | boolean | undefined | null;
export type QueryParams = Record<string, QueryValue>;

function buildQuery(params?: QueryParams): string {
	if (!params) return "";
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null || value === "") continue;
		search.append(key, String(value));
	}
	const qs = search.toString();
	return qs ? `?${qs}` : "";
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
	/** Query string aplicada à URL (valores vazios são ignorados). */
	params?: QueryParams;
	/** Corpo da requisição — serializado como JSON automaticamente. */
	body?: unknown;
}

async function request<T>(
	path: string,
	options: RequestOptions = {},
): Promise<T> {
	const { params, body, headers, ...init } = options;
	const url = `${API_URL}${path}${buildQuery(params)}`;

	const response = await fetch(url, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => undefined);
		throw new ApiError(
			response.status,
			`Requisição falhou: ${response.status} ${response.statusText}`,
			errorBody,
		);
	}

	// 204 No Content não tem corpo para parsear.
	if (response.status === 204) return undefined as T;
	return (await response.json()) as T;
}

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "GET" }),
	post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "POST", body }),
	put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "PUT", body }),
	patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "PATCH", body }),
	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "DELETE" }),
};
