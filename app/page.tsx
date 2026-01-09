import Image from "next/image";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import WhyChooseQuantus from "./components/why";
import Product from "./components/products";
import Client from "./components/clients";

export const metadata = {
	title: "Your Productivity Improvement Partner | Machine Tools & Automation",
	description:
		"QuantusTechnik is your premier manufacturing solutions partner offering high-quality machine tools, automation systems, and tool management solutions across aerospace, automotive, medical, and die-mould industries.",
	keywords: [
		"machine tools",
		"automation solutions",
		"manufacturing",
		"CNC machines",
		"GROB",
		"HWACHEON",
		"ZOLLER",
		"ALZMETALL",
	],
	openGraph: {
		title: "QuantusTechnik - Your Productivity Improvement Partner",
		description:
			"Leading provider of machine tools, automation systems, and industrial manufacturing solutions",
		images: ["/Q.png"],
		url: "https://quantus-technik.com",
	},
	alternates: {
		canonical: "/",
	},
};

export default function Home() {
	return (
		<>
			<Hero />
			<Features />
			<WhyChooseQuantus />
			<Product />
			<Client />
		</>
	);
}
