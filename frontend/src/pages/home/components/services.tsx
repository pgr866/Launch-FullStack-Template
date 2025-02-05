import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartNoAxesCombined, Wallet, CalendarSync } from "lucide-react";

const serviceList = [
	{
		title: "Code Collaboration",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		icon: <ChartNoAxesCombined />,
	},
	{
		title: "Project Management",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		icon: <Wallet />,
	},
	{
		title: "Task Automation",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		icon: <CalendarSync />,
	},
];

export function Services() {
	return (
		<section className="py-24 sm:py-32">
			<div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
				<div>
					<h1 className="text-3xl md:text-4xl">
						<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
							Client-Centric{" "}
						</span>
						Services
					</h1>

					<p className="lead mb-8">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor.
					</p>

					<div className="flex flex-col gap-8">
						{serviceList.map(({ icon, title, description }) => (
							<Card key={title}>
								<CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
									<div className="mt-1 bg-primary/20 p-1 rounded-lg">
										{icon}
									</div>
									<div>
										<CardTitle>{title}</CardTitle>
										<CardDescription className="text-md mt-2">
											{description}
										</CardDescription>
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>

				<img src="logo.svg" alt="Logo" className="logo w-[300px] md:w-[500px] lg:w-[600px] object-contain" />
			</div>
		</section>
	)
}
