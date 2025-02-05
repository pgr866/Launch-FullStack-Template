import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQList = [
	{
		question: "Is this template free?",
		answer: "Yes. It is a free ChadcnUI template.",
		value: "item-1",
	},
	{
		question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
		value: "item-2",
	},
	{
		question:
			"Lorem ipsum dolor sit amet  Consectetur natus dolores minus quibusdam?",
		answer:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis necessitatibus maxime quis ipsa vitae cumque quo?",
		value: "item-3",
	},
	{
		question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit?",
		answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
		value: "item-4",
	},
	{
		question:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur natus?",
		answer:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
		value: "item-5",
	},
];

export const FAQ = () => {
	return (
		<section id="faq" className="py-24 sm:py-32">
			<h1 className="text-3xl md:text-4xl mb-4">
				Frequently Asked{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Questions
				</span>
			</h1>

			<Accordion type="single" collapsible className="w-full AccordionRoot pb-4">
				{FAQList.map(({ question, answer, value }) => (
					<AccordionItem key={value} value={value}>
						<AccordionTrigger className="text-base text-left">
							{question}
						</AccordionTrigger>

						<AccordionContent>{answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			<small>
				Still have questions?{" "}
				<a href="#" rel="noreferrer noopener" className="text-primary transition-all border-primary hover:border-b-2">
					Contact us
				</a>
			</small>
		</section>
	)
}
