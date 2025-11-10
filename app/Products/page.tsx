import ProductsPage from "../components/mainProducts";

export const metadata = {
	title: "Products - Machine Tools, Measuring Systems & Tool Management",
	description:
		"Explore our product portfolio including machine tools, measuring systems and tool management solutions.",
	keywords: [
		"machine tools",
		"CNC machines",
		"measuring machines",
		"tool management",
		"angle heads",
		"tool holders",
		"industrial equipment",
	],
	openGraph: {
		title: "Product Portfolio - Premium Manufacturing Equipment",
		description: "Complete range of machine tools and industrial solutions",
		images: ["/og-products.jpg"],
		url: "https://quantus-technik.com/products",
	},
	alternates: { canonical: "/products" },
};

export default function ProductPage() {
	return <ProductsPage />;
}
