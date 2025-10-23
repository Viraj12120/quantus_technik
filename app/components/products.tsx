"use client";
import { useState } from "react";

const products = [
	{
		id: 1,
		category: "MACHINE TOOLS",
		name: "HWACHEON Machine Tool Co., Ltd (South Korea)",
		description:
			"South Korea's First & Largest Independent CNC Machine Tool Builder",
		imageMain: "/hero.jpeg",
		imageSide: "/hero.jpeg",
		imageWorker: "/hero.jpeg",
	},
	{
		id: 2,
		category: "MACHINE TOOLS",
		name: "ALZMETALL GmbH & Co. KG (Germany)",
		description: "Precision, Performance & Quality Since 1945",
		imageMain: "/hero.jpeg",
		imageSide: "/hero.jpeg",
		imageWorker: "/hero.jpeg",
	},
	{
		id: 3,
		category: "MACHINE TOOLS",
		name: "GROB-WERKE GmbH & Co. KG (Germany)",
		description: "From Bavaria to the World - Industry 4.0 Leaders",
		imageMain: "/hero.jpeg",
		imageSide: "/hero.jpeg",
		imageWorker: "/hero.jpeg",
	},
	{
		id: 4,
		category: "MACHINE TOOLS",
		name: "KEN ICHI Machine Co., Ltd (Taiwan)",
		description:
			"Asia's Only Professional 5-Axis Gantry Machining Center Manufacturer",
		imageMain: "/hero.jpeg",
		imageSide: "/hero.jpeg",
		imageWorker: "/hero.jpeg",
	},
];

export default function Product() {
	const [index, setIndex] = useState(0);
	const product = products[index];

	const nextProduct = () => setIndex((prev) => (prev + 1) % products.length);
	const prevProduct = () =>
		setIndex((prev) => (prev - 1 + products.length) % products.length);

	return (
		<section className="w-full min-h-screen flex flex-col items-center justify-center bg-white py-20 px-6 md:px-16 relative">
			{/* Header */}
			<div className="flex justify-between items-center w-full max-w-6xl mb-16">
				<div>
					<p className="text-gray-400 text-sm tracking-wider mb-1">03</p>
					<h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
						OurProduct
					</h2>
				</div>
				<div className=" text-white w-10 h-10 flex items-center justify-center rounded-full text-lg">
					 🌐
				</div>
			</div>

			{/* Product Grid */}
			<div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
				{/* Left Image */}
				<div className="col-span-1 flex flex-col">
					<img
						src={product.imageMain}
						alt={product.name}
						className="rounded-2xl h-96 object-fill shadow-md mb-4"
					/>
					<div className="flex gap-2">
						<span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
							Agri-Business
						</span>
						<span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
							Seeds
						</span>
					</div>
				</div>

				{/* Center Text */}
				<div className="col-span-1 flex flex-col justify-center">
					<h3 className="text-xl font-semibold text-gray-900 mb-3">
						{product.name}
					</h3>
					<p className="text-gray-600 mb-6">{product.description}</p>
					<p className="text-gray-400 text-sm mb-1">Est. Time</p>
					<p className="text-gray-600 text-sm mb-8">©2025 New Tech</p>

					<div className="flex gap-3">
						<button
							onClick={prevProduct}
							className="border border-gray-400 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-100 transition">
							Prev
						</button>
						<button
							onClick={nextProduct}
							className="border border-gray-800 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
							→
						</button>
					</div>
				</div>

				{/* Right Images */}
				<div className="col-span-1 flex flex-col justify-center relative">
					{/* Top Image (Aligned Right) */}
					<div className="flex justify-end mb-10">
						<div className="flex flex-col items-end">
							<img
								src={product.imageSide}
								alt="Field"
								className="w-[230px] md:w-[280px] rounded-2xl shadow-sm object-cover"
							/>
						</div>
					</div>

					{/* Bottom Image (Aligned Left) */}
					<div className="flex flex-col md:flex-row items-start gap-3 md:gap-6">
						<div className="relative">
							<img
								src={product.imageWorker}
								alt="Worker"
								className="w-[230px] md:w-[300px] rounded-2xl shadow-sm object-cover"
							/>
							<div className="absolute bottom-3 left-3 bg-[#fefefe] rounded-full p-2 shadow-md">
								<img
									src="/icons/seed-icon.svg"
									alt="icon"
									className="w-5 h-5"
								/>
							</div>
						</div>
						<div className="flex flex-col justify-center">
							<p className="text-sm font-medium text-gray-700">Worker</p>
							<p className="text-xs text-gray-500">Effected more than 100k</p>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-between items-center w-full max-w-6xl mt-16 text-gray-400 text-sm">
				<p>
					{String(index + 1).padStart(2, "0")} /{" "}
					{String(products.length).padStart(2, "0")}
				</p>
				<p className="italic">It’s late-night street sessions</p>
			</div>
		</section>
	);
}
