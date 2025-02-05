import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { GoogleSignin } from "@/components/google-signin"
import { GithubSignin } from "@/components/github-signin"
import { ThemeToggle } from "@/components/theme-toggle"
import { useToast } from "@/hooks/use-toast"
import { createUser, validateEmail } from "@/api";

export function Signup() {
	const { toast } = useToast()
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [code, setCode] = useState("");
	const [emailSent, setEmailSent] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSendEmail = async () => {
		try {
			setIsLoading(true);
			if (password !== repeatPassword) {
				throw new Error("Passwords do not match");
			}
			await validateEmail(email, username, password);
			setEmailSent(true);
		} catch (error) {
			const axiosError = error as { isAxiosError?: boolean; response?: { data?: Record<string, unknown> } };
			const errorMessage = axiosError?.isAxiosError && axiosError.response?.data
				? Object.entries(axiosError.response.data).map(([k, v]) =>
					k === "non_field_errors" || k === "detail" ? (Array.isArray(v) ? v[0] : v) : `${k}: ${(Array.isArray(v) ? v[0] : v)}`).shift()
				: "Passwords do not match";
			toast({ title: "Sign-up failed", description: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignup = async () => {
		try {
			setIsLoading(true);
			await createUser({ email: email, username: username, password: password }, code);
			navigate("/portal");
			toast({ description: "Sign-up successful" });
		} catch (error) {
			const axiosError = error as { isAxiosError?: boolean; response?: { data?: Record<string, unknown> } };
			const errorMessage = axiosError?.isAxiosError && axiosError.response?.data
				? Object.entries(axiosError.response.data).map(([k, v]) =>
					k === "non_field_errors" || k === "detail" ? (Array.isArray(v) ? v[0] : v) : `${k}: ${(Array.isArray(v) ? v[0] : v)}`).shift()
				: "Something went wrong";
			toast({ title: "Sign-up failed", description: errorMessage });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="flex h-screen w-full items-center justify-center px-4 flex-wrap overflow-hidden">
				<div className="fixed top-4 right-4">
					<ThemeToggle />
				</div>
				{/* <img src="logo.svg" alt="Logo" className="logo size-[25rem]"/> */}
				<Card className="mx-auto w-full max-w-sm">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">Create an account</CardTitle>
						<CardDescription>
							Sign up with your GitHub or Google account
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
									<Label htmlFor="username">Username</Label>
								</div>
								<Input
									id="username"
									type="text"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="email">Email</Label>
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
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="repeat_password">Repeat Password</Label>
								</div>
								<Input
									id="repeat_password"
									type="password"
									value={repeatPassword}
									onChange={(e) => setRepeatPassword(e.target.value)}
									required
								/>
							</div>
							<Button onClick={handleSendEmail} disabled={isLoading} className="w-full">
								{isLoading ? (
									<><Loader2 className="animate-spin mr-2" />Loading...</>
								) : (
									"Create account"
								)}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link to="/login" className="underline">
								Sign in
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
			<Dialog open={emailSent} onOpenChange={(open) => setEmailSent(open)}>
				<DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => { e.preventDefault(); }}>
					<DialogHeader>
						<DialogTitle className="text-2xl">Verify your email</DialogTitle>
						<DialogDescription>
							Enter the 6-digit code sent to your email address to verify your account.
						</DialogDescription>
					</DialogHeader>
					<InputOTP containerClassName="flex justify-center mb-2" maxLength={6} value={code} onChange={(newCode) => setCode(newCode)}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<DialogFooter>
						<Button onClick={handleSignup} disabled={isLoading} className="w-full">
							{isLoading ? (
								<><Loader2 className="animate-spin mr-2" />Loading...</>
							) : (
								"Verify"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
