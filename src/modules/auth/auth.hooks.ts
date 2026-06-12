import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "./auth.api";
import type { SignInInput } from "./auth.types";

export const authKeys = {
	session: ["auth", "session"] as const,
};

export function useSignIn() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: SignInInput) => signIn(input),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: authKeys.session });
		},
	});
}
