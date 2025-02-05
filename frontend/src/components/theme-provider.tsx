import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void } | undefined>(undefined)

export function ThemeProvider({ children, theme }: { children: React.ReactNode; theme?: Theme }) {
	const [currentTheme, setTheme] = useState<Theme>(theme ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove("light", "dark")
		root.classList.add(currentTheme)
	}, [currentTheme])

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
