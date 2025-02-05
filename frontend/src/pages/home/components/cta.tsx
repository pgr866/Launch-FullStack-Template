import { Button } from "@/components/ui/button";

export function Cta() {
	return (
		<section id="cta" className="py-16 my-24 sm:my-32 relative">
			<div className="absolute w-screen -mx-[calc(50vw-50%+6px)] h-full -my-16 bg-muted/50 flex justify-center"></div>
			<div className="relative px-8 lg:grid lg:grid-cols-2 place-items-center flex justify-center gap-8">
				<div className="lg:col-start-1 max-w-lg">
					<h1 className="text-3xl md:text-4xl">
						All Your
						<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
							{" "}Ideas & Concepts{" "}
						</span>
						In One Interface
					</h1>
					<p className="lead mt-4 mb-8 lg:mb-0">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
						beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi, sed!
					</p>
				</div>

				<div className="space-y-4 lg:col-start-2">
					<Button className="w-full md:mr-4 md:w-auto">Request a Demo</Button>
					<Button variant="outline" className="w-full md:w-auto"> View all features</Button>
				</div>
			</div>
		</section>
	)
}
