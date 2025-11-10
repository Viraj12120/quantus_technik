
export const metadata = {
	title: "Special Offers & Deals | Machine Tools & Equipment Promotions",
	description:
		"Discover current special offers, promotions, and deals on premium machine tools, measuring equipment, and manufacturing solutions from Quantus Technik and our partner brands.",
	keywords: [
		"machine tool offers",
		"manufacturing equipment deals",
		"special promotions",
		"industrial equipment discounts",
		"limited time offers",
	],
	openGraph: {
		title: "Special Offers - Machine Tools & Equipment Deals",
		description: "Exclusive promotions on premium manufacturing solutions",
		images: ["/og-offers.jpg"],
		url: "https://quantus-technik.com/offers",
	},
	alternates: {
		canonical: "/offers",
	},
	robots: {
		index: false, // Often you might want to hide offers pages from indexing
		follow: true,
	},
};

export default function Offer() {
	return (
		<h1 className="flex justify-center items-center min-h-screen text-4xl">
			Under Construction...
		</h1>
	);
}
