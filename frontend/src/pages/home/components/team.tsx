import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const teamList = [
	{
		imageUrl: "user1.jpeg",
		name: "Emma Smith",
		position: "Product Manager",
		socialNetworks: [
			{
				name: "Linkedin",
				url: "https://www.linkedin.com/in/pablo-g%C3%B3mez-rivas-10b80b305/",
			},
			{
				name: "Facebook",
				url: "https://www.facebook.com/",
			},
			{
				name: "Instagram",
				url: "https://www.instagram.com/",
			},
		],
	},
	{
		imageUrl: "user2.jpeg",
		name: "John Doe",
		position: "Tech Lead",
		socialNetworks: [
			{
				name: "Linkedin",
				url: "https://www.linkedin.com/in/pablo-g%C3%B3mez-rivas-10b80b305/",
			},
			{
				name: "Facebook",
				url: "https://www.facebook.com/",
			},
			{
				name: "Instagram",
				url: "https://www.instagram.com/",
			},
		],
	},
	{
		imageUrl: "user3.jpeg",
		name: "Ashley Ross",
		position: "Frontend Developer",
		socialNetworks: [
			{
				name: "Linkedin",
				url: "https://www.linkedin.com/in/pablo-g%C3%B3mez-rivas-10b80b305/",
			},

			{
				name: "Instagram",
				url: "https://www.instagram.com/",
			},
		],
	},
	{
		imageUrl: "user4.jpeg",
		name: "Bruce Rogers",
		position: "Backend Developer",
		socialNetworks: [
			{
				name: "Linkedin",
				url: "https://www.linkedin.com/in/leopoldo-miranda/",
			},
			{
				name: "Facebook",
				url: "https://www.facebook.com/",
			},
		],
	},
];

export function Team() {
	return (
		<section id="team" className="py-24 sm:py-32">
			<h1 className="text-3xl md:text-4xl">
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Our Dedicated{" "}
				</span>
				Crew
			</h1>

			<p className="lead mb-10">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!
			</p>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
				{teamList.map(
					({ imageUrl, name, position, socialNetworks }) => (
						<Card key={name} className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center">
							<CardHeader className="mt-8 flex justify-center items-center pb-2">
								<Avatar className="absolute -top-12 w-24 h-24">
									<AvatarImage src={imageUrl} />
									<AvatarFallback>User</AvatarFallback>
								</Avatar>
								<CardTitle className="text-center">{name}</CardTitle>
								<CardDescription className="text-primary">
									{position}
								</CardDescription>
							</CardHeader>

							<CardContent className="text-center pb-2">
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</CardContent>

							<CardFooter>
								{socialNetworks.map(({ name, url }) => (
									<div key={name}>
										<a href={url} rel="noreferrer noopener" target="_blank">
											<Button variant="ghost" size="sm">
												{name === "Linkedin" && <Linkedin />}
												{name === "Facebook" && <Facebook />}
												{name === "Instagram" && <Instagram />}
											</Button>
										</a>
									</div>
								))}
							</CardFooter>
						</Card>
					)
				)}
			</div>
		</section>
	)
}
