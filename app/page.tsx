import Image from "next/image";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import ProductShowcase from "./components/why";
import WhyChooseQuantus from "./components/why";
import Product from "./components/products";

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<Features />
			<WhyChooseQuantus />
			<Product/>
		</>
	);
}
