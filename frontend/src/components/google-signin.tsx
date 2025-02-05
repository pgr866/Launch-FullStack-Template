import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { googleLogin } from "@/api";
import { useGoogleLogin } from "@react-oauth/google";

export function GoogleSignin() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				await googleLogin(tokenResponse.access_token);
				navigate("/portal");
				toast({ description: "Google Login successfully" });
			} catch (error) {
				toast({ title: "Google Login failed", description: "Try to login with credentials" });
			}
		},
		onError: () => toast({ title: "Google Login failed", description: "An error occurred during Google login." }),
	});

	return (
		<Button variant="outline" onClick={() => handleGoogleLogin()}>
			<svg viewBox="0 0 24 24" fill="currentColor">
				<path d="M12.5 11v3.2h7.8a7 7 0 0 1-1.8 4.1 8 8 0 0 1-6 2.4A8.6 8.6 0 0 1 3.9 12a8.6 8.6 0 0 1 14.5-6.4l2.3-2.3C18.7 1.4 16 0 12.5 0 5.9 0 .3 5.4.3 12S6 24 12.5 24a11 11 0 0 0 8.4-3.4 11 11 0 0 0 2.8-7.6c0-.8 0-1.5-.2-2z" />
			</svg>
			Google
		</Button>
	);
}
