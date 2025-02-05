import { Check, Linkedin, Lightbulb } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function HeroCards() {
	return (
		<div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
			{/* Testimonial */}
			<Card className="absolute w-[340px] -top-[15px]">
				<CardHeader className="flex flex-row items-center gap-4 pb-2">
					<Avatar>
						<AvatarImage src="shadcn_avatar.jpeg" />
						<AvatarFallback>SH</AvatarFallback>
					</Avatar>

					<div className="flex flex-col">
						<CardTitle className="text-lg">John Doe React</CardTitle>
						<CardDescription>@john_doe</CardDescription>
					</div>
				</CardHeader>
				<CardContent>This landing page is awesome!</CardContent>
			</Card>

			{/* Team */}
			<Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center">
				<CardHeader className="mt-8 flex justify-center items-center pb-2">
					<Avatar className="absolute -top-12 w-24 h-24">
						<AvatarImage src="pgr866.jpeg" />
						<AvatarFallback>User</AvatarFallback>
					</Avatar>

					<CardTitle className="text-center">Pablo Gómez</CardTitle>
					<CardDescription className="text-primary">Full Stack Developer</CardDescription>
				</CardHeader>

				<CardContent className="text-center pb-2">
					<p>I really enjoy transforming ideas into functional software that exceeds expectations</p>
				</CardContent>
				<CardFooter>
					<div>
						<a href="https://github.com/pgr866/Launch-FullStack-Template" rel="noreferrer noopener" target="_blank">
							<Button variant="ghost" size="sm">
								<GitHubLogoIcon />
							</Button>
						</a>

						<a href="https://twitter.com/" rel="noreferrer noopener" target="_blank">
							<Button variant="ghost" size="sm">
								<svg viewBox="0 0 24 24" fill="currentColor" >
									<path d="M19 1h4l-8 9 9 13h-7l-6-8-7 8H0l9-10L0 1h8l5 7Zm-1 20h2L6 3H4Z" />
								</svg>
							</Button>
						</a>

						<a href="https://www.linkedin.com/in/pablo-g%C3%B3mez-rivas-10b80b305/" rel="noreferrer noopener" target="_blank">
							<Button variant="ghost" size="sm">
								<Linkedin />
							</Button>
						</a>
					</div>
				</CardFooter>
			</Card>

			{/* Pricing */}
			<Card className="absolute top-[150px] left-[50px] w-72">
				<CardHeader>
					<CardTitle className="flex item-center justify-between">
						Free
						<Badge variant="secondary" className="text-sm text-primary">
							Most popular
						</Badge>
					</CardTitle>
					<div>
						<span className="text-3xl font-bold">$0</span>
						<span className="text-muted-foreground"> /month</span>
					</div>

					<CardDescription>
						Lorem ipsum dolor sit, amet ipsum consectetur adipisicing.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Button className="w-full">Start Free Trial</Button>
				</CardContent>
				<hr className="w-4/5 m-auto mb-4" />
				<CardFooter className="flex">
					<div className="space-y-4">
						{["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
							(benefit) => (
								<span key={benefit} className="flex">
									<Check className="text-green-500" />{" "}
									<small className="m-2">{benefit}</small>
								</span>
							)
						)}
					</div>
				</CardFooter>
			</Card>

			{/* Service */}
			<Card className="absolute w-[350px] -right-[10px] bottom-[35px]">
				<CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
					<div className="mt-1 bg-primary/20 p-1 rounded-2xl">
						<Lightbulb />
					</div>
					<div>
						<CardTitle>Light & dark mode</CardTitle>
						<CardDescription className="text-md mt-2">
							Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur natusm.
						</CardDescription>
					</div>
				</CardHeader>
			</Card>
		</div>
	)
}
