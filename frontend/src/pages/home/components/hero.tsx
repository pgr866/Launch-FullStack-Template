import { useNavigate } from "react-router-dom";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { HeroCards } from "./hero-cards";

export function Hero() {
	const navigate = useNavigate();

	return (
		<section className="grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
			<div className="lg:text-start space-y-6 text-center">
				<main className="text-5xl md:text-6xl font-bold max-w-lg lg:mx-0 mx-auto">
					<h1 className="inline">
						<span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
							Shadcn
						</span>
						{" "}landing page for{" "}
						<span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
							React
						</span>
						{" "}developers
					</h1>
				</main>

				<p className="lead md:w-10/12 mx-auto lg:mx-0">
					Build your React landing page effortlessly with the required sections to your project.
				</p>

				<div className="space-y-4 md:space-y-0 md:space-x-4">
					<Button className="w-full md:w-1/3" onClick={() => navigate("/login")}>Get Started</Button>
					<a href="https://github.com/pgr866/Launch-FullStack-Template" rel="noreferrer noopener" target="_blank">
						<Button variant="outline" className="w-full md:w-1/3 relative top-1">
							<GitHubLogoIcon />
							GitHub Repository
						</Button>
					</a>
				</div>
			</div>

			{/* Hero cards sections */}
			<div className="z-10">
				<HeroCards />
			</div>

			{/* Shadow effect */}
			<div className="shadow"></div>
		</section>
	)
}
