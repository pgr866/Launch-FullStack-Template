import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonitorSmartphone, UserRoundCheck, BrainCircuit } from "lucide-react";

const features = [
	{
		title: "Responsive Design",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		image: <MonitorSmartphone className="text-primary size-8" />,
	},
	{
		title: "Intuitive user interface",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		image: <UserRoundCheck className="text-primary size-8" />,
	},
	{
		title: "AI-Powered insights",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		image: <BrainCircuit className="text-primary size-8" />,
	},
];

const featureList = [
	"Dark/Light theme",
	"Reviews",
	"Features",
	"Pricing",
	"Contact form",
	"Our team",
	"Responsive design",
	"Newsletter",
	"Minimalist",
];

export function Features() {
	return (
		<section id="features" className="py-24 sm:py-32 space-y-8">
			<h1 className="text-3xl lg:text-4xl md:text-center">
				Many{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Great Features
				</span>
			</h1>

			<div className="flex flex-wrap md:justify-center gap-4">
				{featureList.map((feature) => (
					<div key={feature}>
						<Badge variant="secondary" className="text-sm">
							{feature}
						</Badge>
					</div>
				))}
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map(({ title, description, image }) => (
					<Card key={title}>
						<CardHeader>
							<CardTitle>
								<div className="flex items-center justify-between">
									{title}{image}
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>{description}</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
