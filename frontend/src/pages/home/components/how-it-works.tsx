import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessibilityIcon } from "@radix-ui/react-icons"
import { MapPinned, PlaneTakeoff, Gift } from "lucide-react";

const features = [
	{
		icon: <AccessibilityIcon className="size-12 text-primary" />,
		title: "Accessibility",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum"
	},
	{
		icon: <MapPinned className="size-12 text-primary" />,
		title: "Community",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum"
	},
	{
		icon: <PlaneTakeoff className="size-12 text-primary" />,
		title: "Scalability",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum"
	},
	{
		icon: <Gift className="size-12 text-primary" />,
		title: "Gamification",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum"
	},
];

export function HowItWorks() {
	return (
		<section id="howItWorks" className="text-center py-24 sm:py-32">
			<h1 className="text-3xl md:text-4xl">
				How It{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Works{" "}
				</span>
				Step-by-Step Guide
			</h1>
			<p className="md:w-3/4 mx-auto mt-4 mb-8 lead">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{features.map(({ icon, title, description }) => (
					<Card key={title} className="bg-muted/50">
						<CardHeader>
							<CardTitle className="grid gap-4 place-items-center">
								{icon}
								{title}
							</CardTitle>
						</CardHeader>
						<CardContent>{description}</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}