import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<div>
			<Button variant="ghost" className="size-[2.5rem]" onClick={toggleTheme}>
				<Sun className="size-[1.2rem] hidden transition-all dark:block" />
				<Moon className="size-[1.2rem] block transition-all dark:hidden" />
			</Button>
		</div>
	);
}
