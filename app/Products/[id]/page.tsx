"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import machiningData from "../../datasets/products.json";
import turningData from "../../datasets/turning.json";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
	const params = useParams();
	const productId = params.id as string;
	const router = useRouter();

	// Determine category based on route
	const isTurningCenter = productId === "turning-centers";
	const isMachiningCenter = productId === "machining-center";

	// ✅ Updated sub-categories (5-axis added)
	const subCategories = isMachiningCenter
		? [
				{ id: "horizontal", name: "Horizontal" },
				{ id: "vertical", name: "Vertical" },
				{ id: "5-axis", name: "5-Axis" },
		  ]
		: [
				{ id: "horizontal_turning", name: "Horizontal Turning" },
				{ id: "vertical_turning", name: "Vertical Turning" },
		  ];

	// Default value update
	const [selectedSubCategory, setSelectedSubCategory] = useState(
		isTurningCenter ? "horizontal_turning" : "horizontal"
	);

	useEffect(() => {
		setSelectedSubCategory(
			isTurningCenter ? "horizontal_turning" : "horizontal"
		);
	}, [productId, isTurningCenter]);

	// ✅ Updated: Fetch products including 5-axis
	const getProducts = () => {
		if (isMachiningCenter) {
			if (selectedSubCategory === "horizontal")
				return machiningData.horizontal.machines;

			if (selectedSubCategory === "vertical")
				return machiningData.vertical.products;

			if (selectedSubCategory === "5-axis") return machiningData["5-axis"]; // ✅ NEW
		}

		// Turning
		if (selectedSubCategory === "horizontal_turning")
			return turningData.horizontal_turning.products;

		return turningData.vertical_turning.products;
	};

	const categoryProducts = getProducts();
	const heroProduct = categoryProducts[0];
	const [mainImage, setMainImage] = useState(heroProduct?.image);

	useEffect(() => {
		setMainImage(heroProduct?.image);
	}, [heroProduct]);

	// ✅ UPDATED: Specs including support for 5-axis
	function getSpecs(product: any) {
		if (isMachiningCenter) {
			if (selectedSubCategory === "horizontal") {
				return [
					{ name: "Model", value: product.model },
					{ name: "Description", value: product.description },
					{ name: "Pallet Size (mm)", value: product.pallet_size_mm ?? "N/A" },
					{ name: "Stroke (mm)", value: product.stroke_mm?.join(" × ") },
					{
						name: "Spindle Speed (rpm)",
						value: product.spindle_speed_rpm?.join(" / "),
					},
					{
						name: "Number of Tools",
						value: product.number_of_tools?.join(" / "),
					},
					{ name: "Type", value: product.type },
				];
			}

			if (selectedSubCategory === "vertical") {
				return [
					{ name: "Model", value: product.model },
					{ name: "Description", value: product.description },
					{ name: "Stroke (mm)", value: product.stroke_mm?.join(" × ") },
					{
						name: "Spindle Speed (rpm)",
						value: product.spindle_speed_rpm?.join(" / "),
					},
					{
						name: "Number of Tools",
						value: product.number_of_tools?.join(" / "),
					},
				];
			}

			// ✅ NEW: 5-Axis category specs
			if (selectedSubCategory === "5-axis") {
				return [
					{ name: "Model", value: product.model },
					{ name: "Description", value: product.description },
					{ name: "Table Size (mm)", value: product.table_size_mm },
					{ name: "Stroke (mm)", value: product.stroke_mm?.join(" × ") },
					{
						name: "Spindle Speed (rpm)",
						value: product.spindle_speed_rpm?.join(" / "),
					},
					{
						name: "Number of Tools",
						value: product.number_of_tools?.join(" / "),
					},
					{ name: "Type", value: product.type },
				];
			}
		}

		// ✅ Turning specs
		if (selectedSubCategory === "horizontal_turning") {
			const specs = [
				{ name: "Model", value: product.model },
				{ name: "Description", value: product.description },
				{
					name: "Chuck Size",
					value: Array.isArray(product.chuck_size_inch)
						? product.chuck_size_inch.join('" / ') + '"'
						: product.chuck_size_inch + '"',
				},
				{ name: "Max Turning Ø (mm)", value: product.max_turning_diameter_mm },
				{
					name: "Max Turning Length (mm)",
					value: product.max_turning_length_mm,
				},
				{
					name: "Spindle Speed (rpm)",
					value: Array.isArray(product.spindle_speed_rpm)
						? product.spindle_speed_rpm.join(" / ")
						: product.spindle_speed_rpm,
				},
				{
					name: "Spindle Motor (kW)",
					value: Array.isArray(product.spindle_motor_kw)
						? product.spindle_motor_kw.join(" / ")
						: product.spindle_motor_kw,
				},
				{ name: "Number of Tools", value: product.number_of_tools },
			];

			if (product.y_axis) specs.push({ name: "Y-Axis", value: "✓" });
			if (product.big_bore) specs.push({ name: "Big Bore", value: "✓" });
			if (product.tool_magazine)
				specs.push({ name: "Tool Magazine", value: "✓" });
			if (product.twin_turret) specs.push({ name: "Twin Turret", value: "✓" });
			if (product.twin_spindle)
				specs.push({ name: "Twin Spindle", value: "✓" });

			return specs;
		}

		// Vertical Turning
		const specs = [
			{ name: "Model", value: product.model },
			{ name: "Description", value: product.description },
			{
				name: "Chuck Size",
				value: Array.isArray(product.chuck_size_inch)
					? product.chuck_size_inch.join('" / ') + '"'
					: product.chuck_size_inch + '"',
			},
			{
				name: "Max Turning Ø (mm)",
				value: product.max_turning_diameter_mm,
			},
			{
				name: "Max Cutting Height (mm)",
				value: product.max_cutting_height_mm,
			},
			{
				name: "Spindle Speed (rpm)",
				value: Array.isArray(product.spindle_speed_rpm)
					? product.spindle_speed_rpm.join(" / ")
					: product.spindle_speed_rpm,
			},
			{
				name: "Spindle Motor (kW)",
				value: Array.isArray(product.spindle_motor_kw)
					? product.spindle_motor_kw.join(" / ")
					: product.spindle_motor_kw,
			},
			{ name: "Number of Tools", value: product.number_of_tools },
		];

		if (product.y_axis) {
			specs.push({ name: "Y-Axis", value: "✓" });
			specs.push({ name: "Y-Axis Stroke (mm)", value: product.stroke_y_mm });
		}

		return specs;
	}

	// ✅ Updated Title Resolver
	const getSubCategoryTitle = () => {
		const subCats = isMachiningCenter
			? [
					{ id: "horizontal", name: "Horizontal" },
					{ id: "vertical", name: "Vertical" },
					{ id: "5-axis", name: "5-Axis" },
			  ]
			: [
					{ id: "horizontal_turning", name: "Horizontal Turning" },
					{ id: "vertical_turning", name: "Vertical Turning" },
			  ];

		return subCats.find((c) => c.id === selectedSubCategory)?.name ?? "";
	};

	return (
		<div className="min-h-screen bg-white mb-10">
			{/* HERO */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div className="mx-auto relative z-10 max-w-7xl">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						<span className="text-gray-400">{getSubCategoryTitle()}</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl">
						{heroProduct?.desc}
					</p>
				</div>
			</section>

			{/* SUBCATEGORY BUTTONS */}
			<section className="py-4 bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 flex gap-3 overflow-x-auto">
					{subCategories.map((subCat) => (
						<button
							key={subCat.id}
							onClick={() => setSelectedSubCategory(subCat.id)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedSubCategory === subCat.id
									? "bg-black text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}>
							{subCat.name}
						</button>
					))}
				</div>
			</section>

			{/* PRODUCT GRID */}
			<section className="w-full mx-auto px-6 ">
				<div className="mb-12 mt-12">
					<h2 className="text-2xl font-bold text-gray-900">
						{categoryProducts.length} Products Available
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-24">
					{categoryProducts.map((item, i) => (
						<div
							key={i}
							className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between min-h-[350px]">
							<div className="p-5">
								<h3 className="text-xl font-bold text-black-700">
									{item.model}
								</h3>
								<p className="text-gray-600 text-md">{item.description}</p>
							</div>

							<div className="flex items-center justify-center bg-gray-50 p-4">
								<Image
									src={item.image || "/placeholder.jpg"}
									alt={item.model}
									width={240}
									height={160}
									unoptimized={item.image?.startsWith("http")}
									className="h-32 object-contain"
								/>
							</div>

							<div className="px-5 pb-4 mt-2 flex flex-col flex-grow">
								<table className="w-full text-xs flex-grow">
									<tbody>
										{getSpecs(item).map((spec, idx) => (
											<tr key={idx} className="border-t border-gray-100">
												<td className="py-1.5 text-gray-700 font-medium">
													{spec.name}
												</td>
												<td className="py-1.5 text-right font-semibold text-black">
													{spec.value}
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<Button
									className="w-full mt-auto bg-gray-900 hover:bg-black"
									onClick={() => router.push(`/Contact?itemId=${item.model}`)}>
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
