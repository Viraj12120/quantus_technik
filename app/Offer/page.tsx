import Image from "next/image";
import Link from "next/link";

export const metadata = {
	title: "Special Offers & Deals | Machine Tools & Equipment Promotions",
	description:
		"Discover current special offers, promotions, and deals on premium machine tools, measuring equipment, and manufacturing solutions from QuantusTechnik and our partner brands.",
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
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			{/* Header Section */}
			<div className="max-w-4xl mx-auto mt-16 text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					2 Special Offers & Promotions
				</h1>
				<p className="text-md lg:text-xl text-gray-600 max-w-2xl mx-auto">
					Exclusive deals and limited-time promotions on premium manufacturing
					solutions
				</p>
			</div>

			{/* HwaCheon 80th Anniversary Promotion */}
			<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
				{/* First Card */}
				<div className="bg-white border border-gray-300 rounded-lg p-6">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">GERARDI</h2>

					<div className="flex justify-center">
						<img
							src="/H.png"
							alt="GERARDI Year End Sale"
							className="max-w-full h-auto rounded-lg"
						/>
					</div>
					<div className="flex gap-4 mt-4">
						<a
							href="/PROMO.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-green-600 text-white px-4 py-2 rounded text-sm mt-12">
							View PDF Brochure
						</a>
					</div>
				</div>

				{/* Second Card - PDF Preview Same as Image */}
				<div className="bg-white border border-gray-300 rounded-lg p-6">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">HWACHEON</h2>

					<img
						src="/g.jpg"
						alt="GERARDI Year End Sale"
						className="max-w-full h-auto rounded-lg"
					/>
				</div>
			</div>
		</div>
	);
}
