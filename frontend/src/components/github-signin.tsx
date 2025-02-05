import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { githubLogin } from "@/api";
import { useSearchParams } from "react-router-dom";

export function GithubSignin() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const generateState = () => {
		const array = new Uint8Array(16);
		crypto.getRandomValues(array);
		return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
	};

	const handleGithubLogin = async () => {
		try {
			const state = generateState();
			sessionStorage.setItem("github_oauth_state", state);
			const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
			const redirectUri = window.location.origin + "/login/";
			const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user&state=${state}`;
			window.location.href = githubAuthUrl;
		} catch (error) {
			toast({ title: "GitHub Login failed", description: "Try to login with credentials" });
		}
	};

	useEffect(() => {
		const code = searchParams.get("code");
		const stateFromUrl = searchParams.get("state");
		const stateFromStorage = sessionStorage.getItem("github_oauth_state");
		sessionStorage.removeItem("github_oauth_state");
		if (code) {
			const gihubLogin = async () => {
				try {
					if (stateFromUrl !== stateFromStorage || !stateFromUrl || !stateFromStorage) {
						throw new Error("State mismatch. Security check failed.");
					}
					await githubLogin(code);
					navigate("/portal");
					toast({ description: "GitHub Login successfully" });
				} catch (error) {
					navigate("/login");
					toast({ title: "GitHub Login failed", description: "Try to login with credentials" });
				}
			};
			gihubLogin();
		}
	}, []);

	return (
		<Button variant="outline" onClick={handleGithubLogin}>
			<GitHubLogoIcon />
			GitHub
		</Button>
	)
}
