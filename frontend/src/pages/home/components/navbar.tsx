import { useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle"

const routeList = [
	{
		href: "#features",
		label: "Features",
	},
	{
		href: "#testimonials",
		label: "Testimonials",
	},
	{
		href: "#pricing",
		label: "Pricing",
	},
	{
		href: "#faq",
		label: "FAQ",
	},
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<header className="sticky top-0 z-40 w-screen -mx-[calc(50vw-50%+6px)] backdrop-blur-lg">
			<NavigationMenu className="mx-auto">
				<NavigationMenuList className="flex justify-between w-screen max-w-[90vw] h-14 gap-8">
					<NavigationMenuItem className="font-bold">
						<a href="/home" rel="noreferrer noopener">
							<h4 className="flex gap-2">
								<img src="logo.svg" alt="Logo" className="logo size-[2rem]" />
								MyApp
							</h4>
						</a>
					</NavigationMenuItem>

					{/* Mobile */}
					<span className="flex md:hidden">
						<Sheet
							open={isOpen}
							onOpenChange={setIsOpen}
						>
							<SheetTrigger className="px-2">
								<Menu
									className="flex md:hidden h-5 w-5"
									onClick={() => setIsOpen(true)}
								>
								</Menu>
							</SheetTrigger>

							<SheetContent side={"left"}>
								<SheetHeader>
									<SheetTitle className="text-center">
										MyApp
									</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col justify-center items-center gap-2 mt-4">
									{routeList.map(({ href, label }) => (
										<Button key={label} variant="ghost" onClick={() => { setIsOpen(false); setTimeout(() => { window.location.href = href; }, 500); }}>
											{label}
										</Button>
									))}
									<a href="https://github.com/pgr866/Launch-FullStack-Template" rel="noreferrer noopener" target="_blank">
										<Button variant="secondary">
											<GitHubLogoIcon />
											GitHub
										</Button>
									</a>
								</nav>
							</SheetContent>
						</Sheet>
						<ThemeToggle />
					</span>

					{/* Desktop */}
					<nav className="hidden md:flex gap-2">
						{routeList.map(({ href, label }) => (
							<a href={href} rel="noreferrer noopener" key={label}>
								<Button variant="ghost">
									{label}
								</Button>
							</a>
						))}
					</nav>

					<div className="hidden md:flex gap-2">
						<a href="https://github.com/pgr866/Launch-FullStack-Template" rel="noreferrer noopener" target="_blank">
							<Button variant="secondary">
								<GitHubLogoIcon />
								GitHub
							</Button>
						</a>
						<ThemeToggle />
					</div>
				</NavigationMenuList>
			</NavigationMenu>
			<Separator className="absolute left-0 w-full" />
		</header>
	)
}
