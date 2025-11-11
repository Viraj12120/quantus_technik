"use client";
import { useLottie } from "lottie-react";
import robotAnimation from "../../public/robo.json";
import Image from "next/image";

export default function Offersd() {
	const options = {
		animationData: robotAnimation,
		loop: true,
		autoplay: true,
	};


	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			{/* Header Section */}
			<div className="max-w-4xl mx-auto mt-16 text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					Special Offers & Promotions
				</h1>
				<p className="text-xl text-gray-600 max-w-2xl mx-auto">
					Exclusive deals and limited-time promotions on premium manufacturing
					solutions
				</p>
			</div>

			{/* HwaCheon 80th Anniversary Promotion */}
			<div className="max-w-6xl mx-auto mb-16">
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100">
					<div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
						<h2 className="text-3xl md:text-4xl font-bold text-center">
							✨ HwaCheon 80th Anniversary Special ✨
						</h2>
						<p className="text-center text-blue-100 mt-3 text-lg">
							80 Years of Innovation - Limited Time Offer
						</p>
					</div>

					<div className="p-10">
						{/* Machine Series Grid */}
						<div className="grid md:grid-cols-2 gap-10 mb-10">
							{/* CUTEX-180 Series */}
							<div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									CUTEX-180 Y-axis Series
								</h3>
								<p className="text-gray-600 mb-4">
									Compact Horizontal Turning Center with 6"-8" Chuck Loaded with
									Options
								</p>

								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											Chuck Size:
										</span>
										<span className="text-gray-900">
											A: 6"(A2-5) | B: 8"(A2-6)
										</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											NC Control:
										</span>
										<span className="text-gray-900">Fanuc Qi-TF Plus</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											Max. Spindle Speed:
										</span>
										<span className="text-gray-900">
											A: 6,000rpm | B: 4,500rpm
										</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											Max. Bar Size:
										</span>
										<span className="text-gray-900">A: Ø51mm | B: Ø65mm</span>
									</div>
								</div>
							</div>

							{/* Hi-TECH-230 Series */}
							<div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
								<h3 className="text-2xl font-bold text-gray-900 mb-4">
									Hi-TECH-230 Y-axis Series
								</h3>
								<p className="text-gray-600 mb-4">
									Box Way Type Horizontal Turning Center with 8"-10" Chuck
									Loaded with Options
								</p>

								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											Chuck Size:
										</span>
										<span className="text-gray-900">
											A: 8"(A2-6) | B/C: 10"(A2-8)
										</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											NC Control:
										</span>
										<span className="text-gray-900">Fanuc Qi-TF Plus</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											Max. Spindle Speed:
										</span>
										<span className="text-gray-900">
											A: 4,500rpm | B/C: 3,500rpm
										</span>
									</div>
									<div className="flex justify-between">
										<span className="font-semibold text-gray-700">
											Max. Bar Size:
										</span>
										<span className="text-gray-900">A: Ø65mm | B/C: Ø81mm</span>
									</div>
								</div>
							</div>
						</div>

						{/* Promotion Details */}
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 shadow-sm">
							<h4 className="text-lg font-bold text-yellow-800 mb-2">
								Promotion Details
							</h4>
							<p className="text-yellow-700 text-sm mb-2">
								<strong>Applicable Models:</strong> Hi-TECH-230 A/B/C models
								with YMC/YSMC configuration, and CUTEX-180 A/B models with
								YMC/YSMC configurations.
							</p>
							<p className="text-yellow-700 text-sm">
								<strong>Promotional Period Ends:</strong> 31st December 2025
							</p>
						</div>

						<div className="text-center">
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition transform hover:scale-105">
								Contact Us for Special Promotional Offer
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* ✅ Second Card — Now Fully Matched */}
			<div className="max-w-6xl mx-auto mb-16">
				<div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-100">
					{/* Header Section */}
					<div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white relative">
						<h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
							⭐ YEAR END SALE ⭐
						</h2>

						<span className="absolute top-8 right-8 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-bold rotate-6 shadow-md">
							SPECIAL DISCOUNT
						</span>
					</div>

					<div className="p-10">
						{/* Made in Italy */}
						<div className="flex items-center gap-2 mb-8">
							<h3 className="text-lg font-semibold text-gray-700 tracking-wide">
								MADE IN ITALY
							</h3>
							<div className="flex gap-1">
								<div className="w-4 h-3 bg-green-600"></div>
								<div className="w-4 h-3 bg-white border border-gray-300"></div>
								<div className="w-4 h-3 bg-red-600"></div>
							</div>
						</div>

						{/* Product Boxes */}
						<div className="grid grid-cols-3 gap-10 mb-10">
							{["/g.png", "/g1.png", "/g2.png"].map((img, index) => (
								<div
									key={index}
									className="border border-2 p-6 rounded-xl shadow-sm bg-white flex justify-center items-center">
									<Image
										src={img}
										width={200}
										height={200}
										alt={`box-image-${index}`}
										unoptimized
										className="rounded-lg object-contain"
									/>
								</div>
							))}
						</div>

						{/* Highlights */}
						<div className="mb-8">
							<h4 className="text-xl font-bold text-gray-900 mb-4">
								KEY HIGHLIGHTS :
							</h4>
							<ul className="space-y-3 text-gray-700">
								<li className="flex gap-2 items-start">
									<span className="text-blue-600 text-xl">✔</span>
									High rigidity & precision construction
								</li>
								<li className="flex gap-2 items-start">
									<span className="text-blue-600 text-xl">✔</span>
									Versatility & modularity for different machines
								</li>
								<li className="flex gap-2 items-start">
									<span className="text-blue-600 text-xl">✔</span>
									Enhanced coolant and tooling support
								</li>
								<li className="flex gap-2 items-start">
									<span className="text-blue-600 text-xl">✔</span>
									Global Quality and Support, Made in Italy
								</li>
							</ul>
						</div>

						{/* Button */}
						<div className="text-center">
							<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition transform hover:scale-105">
								Contact for Special Offer
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
