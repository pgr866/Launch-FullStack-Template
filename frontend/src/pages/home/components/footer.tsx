export function Footer() {
	return (
		<footer id="footer">
			<hr className="w-full mx-auto" />
			<section className="py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
				<div className="flex justify-left col-span-full xl:col-span-2">
					<a href="/home" rel="noreferrer noopener">
						<h4 className="flex gap-2">
							<img src="logo.svg" alt="Logo" className="logo size-[2rem]" />
							MyApp
						</h4>
					</a>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Follow US</h3>
					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Github
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							X
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Dribbble
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Platforms</h3>
					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Web
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Mobile
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Desktop
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">About</h3>
					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Features
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Pricing
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							FAQ
						</a>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-bold text-lg">Community</h3>
					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Youtube
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Discord
						</a>
					</div>

					<div>
						<a href="#" rel="noreferrer noopener" className="opacity-60 hover:opacity-100">
							Twitch
						</a>
					</div>
				</div>
			</section>

			<section className="container pb-14 text-center">
				<small>
					&copy; 2025 Landing page made by{" "}
					<a
						href="https://www.linkedin.com/in/pablo-g%C3%B3mez-rivas-10b80b305/"
						rel="noreferrer noopener"
						target="_blank"
						className="text-primary transition-all border-primary hover:border-b-2"
					>
						Pablo Gómez
					</a>
				</small>
			</section>
		</footer>
	)
}
