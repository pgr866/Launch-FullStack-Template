import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";

export function ScrollToTop() {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		const handleScroll = () => setShowTopBtn(window.scrollY > 400);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const goToTop = () =>
		window.scrollTo({ top: 0, behavior: "smooth" });

	return showTopBtn ? (
		<Button
			onClick={goToTop}
			className="fixed bottom-4 right-4 opacity-90 shadow-md"
			size="icon"
		>
			<ArrowUpToLine className="h-4 w-4" />
		</Button>
	) : null;
}
