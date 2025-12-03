"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import grindersData from "../datasets/grinders.json";

export default function GrinderDetailPage() {
	const params = useParams();
	const router = useRouter();

	// Assuming a single grinders category; adapt if multiple subcategories needed
	const categoryProducts = grindersData.products || [];
	const heroProduct = categoryProducts[0];
	const [mainImage, setMainImage] = useState(
		heroProduct?.image || "/placeholder.jpg"
	);

	useEffect(() => {
		setMainImage(heroProduct?.image || "/placeholder.jpg");
	}, [heroProduct]);

	// Map grinder specs to display-friendly name and value array
	function getSpecs(product: any) {
		if (!product) return [];

		// Typical specs mapped - adjust as per your data structure
		const specs = [];

		if (product.category)
			specs.push({ name: "Category", value: product.category });
		

		if (product.typical_specs) {
			for (const [key, value] of Object.entries(product.typical_specs)) {
				if (Array.isArray(value)) {
					specs.push({
						name: key.replace(/_/g, " "),
						value: value.join(" / "),
					});
				} else {
					specs.push({ name: key.replace(/_/g, " "), value: String(value) });
				}
			}
		}

		// Add examples count if present
		if (product.examples) {
			specs.push({
				name: "Example Models",
				value: product.examples.length.toString(),
			});
		}

		return specs;
	}

	return (
		<div className="min-h-screen  bg-white mb-10">
			{/* HERO */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div className="mx-auto relative z-10 max-w-7xl">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						{"Grinders"}
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl">
						Extensive lineup of high-performance universal, cylindrical,
						camshaft, and crankshaft grinding machines. Originally designed for
						high-production automotive manufacturing, these grinders excel in
						the most demanding applications.
					</p>
				</div>
			</section>

			{/* PRODUCT GRID */}
			<section className="w-full mx-auto px-6">
				<div className="mb-12 mt-12">
					<h2 className="text-2xl font-bold text-gray-900">
						{categoryProducts.length} Products Available
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-24">
					{categoryProducts.map((item, i) => (
						<div
							key={i}
							className="flex flex-col justify-between bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition min-h-[300px] overflow-hidden">
							<div className="p-5">
								<h3 className="text-xl font-bold text-black-700">
									{item.category || "N/A"}
								</h3>
								<p className="text-gray-600 text-md min-h-[52px]">
									{item.description || "N/A"}
								</p>
							</div>

							<div className="flex items-center justify-center bg-gray-50 p-4">
								<Image
									src={item.image || "/placeholder.jpg"}
									alt={item.category || "Product Image"}
									width={240}
									height={240}
									className="h-32 object-contain mix-blend-multiply"
								/>
							</div>

							<div className="px-5 pb-4 mt-2 flex flex-col flex-grow">
								{/* <table className="w-full text-xs">
									<tbody>
										{getSpecs(item).length > 0 ? (
											getSpecs(item).map((spec, idx) => (
												<tr key={idx} className="border-t border-gray-100">
													<td className="py-1.5 text-gray-700 font-medium">
														{spec.name}
													</td>
													<td className="py-1.5 text-right font-semibold text-black">
														{spec.value}
													</td>
												</tr>
											))
										) : (
											<tr className="border-t border-gray-100">
												<td className="py-1.5 text-gray-700 font-medium">
													Specs
												</td>
												<td className="py-1.5 text-right font-semibold text-black">
													N/A
												</td>
											</tr>
										)}
									</tbody>
								</table> */}

								<Button
									className="w-full mt-auto bg-gray-900 hover:bg-black"
									onClick={() =>
										router.push(`/Contact?itemId=${item.category || ""}`)
									}>
									Enquiry Now
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
