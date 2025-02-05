import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingList = [
	{
		title: "Free",
		popular: false,
		price: 0,
		description:
			"Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
		buttonText: "Get Started",
		benefitList: [
			"1 Team member",
			"2 GB Storage",
			"Upto 4 pages",
			"Community support",
			"lorem ipsum dolor",
		],
	},
	{
		title: "Premium",
		popular: true,
		price: 5,
		description:
			"Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
		buttonText: "Start Free Trial",
		benefitList: [
			"4 Team member",
			"4 GB Storage",
			"Upto 6 pages",
			"Priority support",
			"lorem ipsum dolor",
		],
	},
	{
		title: "Enterprise",
		popular: false,
		price: 40,
		description:
			"Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
		buttonText: "Contact US",
		benefitList: [
			"10 Team member",
			"8 GB Storage",
			"Upto 10 pages",
			"Priority support",
			"lorem ipsum dolor",
		],
	},
];

export function Pricing() {
	return (
		<section id="pricing" className="py-24 sm:py-32">
			<h1 className="text-3xl md:text-4xl text-center">
				Get
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					{" "}
					Unlimited{" "}
				</span>
				Access
			</h1>
			<p className="lead pb-8 text-center">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias reiciendis.
			</p>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{pricingList.map(({ title, popular, price, description, buttonText, benefitList }) => (
					<Card
						key={title}
						className={popular ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10" : ""}>
						<CardHeader>
							<CardTitle className="flex item-center justify-between">
								{title}
								{popular
									? (<Badge variant="secondary" className="text-sm text-primary">
										Most popular
									</Badge>
									) : null}
							</CardTitle>
							<div>
								<span className="text-3xl font-bold">${price}</span>
								<span className="muted"> /month</span>
							</div>

							<CardDescription>{description}</CardDescription>
						</CardHeader>

						<CardContent>
							<Button className="w-full">{buttonText}</Button>
						</CardContent>

						<hr className="w-4/5 m-auto mb-4" />

						<CardFooter className="flex">
							<div className="space-y-4">
								{benefitList.map((benefit) => (
									<span key={benefit} className="flex">
										<Check className="text-green-500" />{" "}
										<small className="m-2">{benefit}</small>
									</span>
								))}
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	)
}
