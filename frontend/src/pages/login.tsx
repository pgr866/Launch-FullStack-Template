import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleSignin } from "@/components/google-signin"
import { GithubSignin } from "@/components/github-signin"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { login } from "@/api";

export function Login() {
	const { toast } = useToast()
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			await login(email, password);
			navigate("/portal");
			toast({ description: "Login successfully" });
		} catch (error) {
			const axiosError = error as { isAxiosError?: boolean; response?: { data?: Record<string, unknown> } };
			const errorMessage = axiosError?.isAxiosError && axiosError.response?.data
				? Object.entries(axiosError.response.data).map(([k, v]) =>
					k === "non_field_errors" || k === "detail" ? (Array.isArray(v) ? v[0] : v) : `${k}: ${(Array.isArray(v) ? v[0] : v)}`).shift()
				: "Something went wrong";
			toast({ title: "Login failed", description: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-center px-4 flex-wrap overflow-hidden">
			<div className="fixed top-4 right-4">
				<ThemeToggle />
			</div>
			{/* <img src="logo.svg" alt="Logo" className="logo size-[25rem]"/> */}
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Login with your GitHub or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid grid-cols-2 gap-6">
							<GithubSignin></GithubSignin>
							<GoogleSignin></GoogleSignin>
						</div>
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-[1px] border-border" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-card px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="email">Email or Username</Label>
							</div>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link to="/recover-password" className="ml-auto inline-block text-sm underline">
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required />
						</div>
						<Button onClick={handleLogin} disabled={isLoading} className="w-full">
							{isLoading ? (
								<><Loader2 className="animate-spin mr-2" />Loading...</>
							) : (
								"Login"
							)}
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link to="/signup" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div >
	)
}
