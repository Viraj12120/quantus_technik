// app/Offers/page.tsx
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
		index: false,
		follow: true,
	},
};

export default function Offer() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<h1 className="text-4xl font-bold">Offers Page - Basic Test</h1>
		</div>
	);
}
