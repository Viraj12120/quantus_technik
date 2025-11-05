"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import products from "../../datasets/products.json";

export default function ProductDetailPage() {
	// Separate the hero (first product) and rest of the series
	const heroProduct = products[0];
	const seriesProducts = products.slice(1);

	const [tab, setTab] = useState("overview");
	const [mainImage, setMainImage] = useState(heroProduct.img);

	return (
		<div className="min-h-screen bg-white">
			{/* ================= HERO SECTION ================= */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div
					className="absolute inset-0 opacity-30 bg-cover bg-center"
					style={{ backgroundImage: `url(${heroProduct.img})` }}></div>

				<div className="max-w-7xl mx-auto relative z-10">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						{heroProduct.brand}{" "}
						<span className="text-gray-400">{heroProduct.name}</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl">
						{heroProduct.subtitle}
					</p>
				</div>
			</section>

			{/* ================= HERO PRODUCT DETAILS ================= */}
			<section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
				{/* Left: Image Gallery */}
				<div>
					<img
						src={mainImage}
						alt={heroProduct.name}
						className="w-full h-[400px] object-cover rounded-xl border border-gray-200"
					/>
					<div className="flex gap-3 mt-4">
						{heroProduct.gallery?.map((img, idx) => (
							<img
								key={idx}
								src={img}
								onClick={() => setMainImage(img)}
								className={`w-24 h-24 object-cover rounded-lg cursor-pointer border ${
									mainImage === img ? "border-black" : "border-gray-300"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Right: Product Info */}
				<div className="flex flex-col justify-between">
					<div>
						<h2 className="text-3xl font-bold mb-4">{heroProduct.name}</h2>
						<p className="text-gray-600 mb-6">{heroProduct.description}</p>

						{heroProduct.quickSpecs && (
							<div className="bg-gray-50 rounded-lg p-6 mb-6">
								<h4 className="font-semibold mb-3 text-black">Quick Specs</h4>
								<ul className="space-y-2">
									{heroProduct.quickSpecs.map((spec, i) => (
										<li
											key={i}
											className="flex justify-between text-sm border-b last:border-none pb-1">
											<span className="text-gray-700">{spec.name}</span>
											<span className="font-medium">{spec.value}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition">
						Request a Quote
					</button>
				</div>
			</section>

			{/* ================= TAB SECTION ================= */}
			<section className="max-w-7xl mx-auto px-6 mt-10 mb-20">
				<div className="bg-white rounded-lg shadow">
					<div className="flex border-b overflow-x-auto">
						{["overview", "series", "applications"].map((key) => (
							<button
								key={key}
								onClick={() => setTab(key)}
								className={`px-6 py-3 text-sm font-medium transition whitespace-nowrap ${
									tab === key
										? "border-b-2 border-black text-black"
										: "text-gray-500"
								}`}>
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</button>
						))}
					</div>

					<div className="p-6 min-h-[200px]">
						{/* Overview */}
						{tab === "overview" && (
							<div className="space-y-6">
								<h3 className="text-xl font-semibold mb-4">Product Overview</h3>
								<p className="text-gray-700 leading-relaxed">
									{heroProduct.description}
								</p>
							</div>
						)}

						{/* Series */}
						{tab === "series" && (
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
								{seriesProducts.map((item, i) => (
									<div
										key={i}
										className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
										<img
											src={item.img}
											alt={item.name}
											className="w-full h-48 object-cover"
										/>
										<div className="p-5 flex flex-col flex-grow">
											<h4 className="text-lg font-semibold mb-2">
												{item.name}
											</h4>
											<p className="text-sm text-gray-600 mb-3 flex-grow">
												{item.subtitle}
											</p>

											<Link
												href={`/products/${item.id}`}
												className="text-black font-medium flex items-center gap-1 hover:underline mt-auto">
												Learn More <ChevronRight className="w-4 h-4" />
											</Link>
										</div>
									</div>
								))}
							</div>
						)}

						{/* Applications */}
						{tab === "applications" && (
							<div>
								<h3 className="text-xl font-semibold mb-4">Applications</h3>
								<p className="text-gray-700 leading-relaxed">
									{heroProduct.applications}
								</p>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}
