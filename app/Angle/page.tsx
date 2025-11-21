// app/Angle/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import angleHeadsData from "../datasets/angle.json";
import Link from "next/link";

type Product = {
	model: string;
	type: number;
	ratio: string;
	weight_kg: number | number[];
	rpm: number | string;
	output_diameter: number;
	torque_nm: number;
	output: string;
	collet_range?: string;
	adjustable?: string;
	series?: string;
	special?: boolean;
	spindle?: string;
	image?: string;
};

type Category = {
	description?: string;
	models: Product[];
};

type SeriesData = {
	description: string;
	total_models: number;
	categories: {
		[key: string]: Category;
	};
};

type MainCategory = {
	id: string;
	label: string;
	description: string;
	desc: string;
	key: "ATC" | "MTC";
};

type SubCategory = {
	id: string;
	label: string;
	description: string;
	desc: String;
	products: Product[];
};

export default function AngleHeadsPage() {
	const router = useRouter();

	// ✅ Main categories: ATC and MTC
	const mainCategories: MainCategory[] = [
		{
			id: "atc-series",
			label: "ATC Series (Automatic Tool Change)",
			description: angleHeadsData.catalog.series.ATC.description,
			desc: angleHeadsData.catalog.series.ATC.desc,
			key: "ATC",
		},
		{
			id: "mtc-series",
			label: "MTC Series (Manual Tool Change)",
			description: angleHeadsData.catalog.series.MTC.description,
			desc: angleHeadsData.catalog.series.MTC.desc,

			key: "MTC",
		},
	];

	const [selectedMainCat, setSelectedMainCat] = useState<MainCategory>(
		mainCategories[0]
	);

	// ✅ Build subcategories from selected series
	const buildSubcategories = (seriesKey: "ATC" | "MTC"): SubCategory[] => {
		const seriesData = angleHeadsData.catalog.series[seriesKey];
		const categories = seriesData.categories;

		return Object.entries(categories).map(([key, category]) => ({
			id: key.toLowerCase().replace(/_/g, "-"),
			label: formatCategoryLabel(key),
			description: category.description || "",
			desc: category.desc,
			products: category.models,
		}));
	};

	// ✅ Format category labels
	const formatCategoryLabel = (key: string): string => {
		const labels: { [key: string]: string } = {
			LIGHT: "Light Series",
			MINI: "Mini Series",
			SLIM: "Slim Series",
			STD_90: "Standard 90°",
			EXTENDED: "Extended Reach",
			GMU: "GMU (Adjustable Angle)",
			DOUBLE: "Double Output",
			OFFSET: "Offset Series",
			XL: "XL Series",
		};
		return labels[key] || key.replace(/_/g, " ");
	};

	const subcategories: SubCategory[] = buildSubcategories(selectedMainCat.key);

	const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
		subcategories[0]?.id
	);

	useEffect(() => {
		const newSubcategories = buildSubcategories(selectedMainCat.key);
		setSelectedSubCategory(newSubcategories[0]?.id);
	}, [selectedMainCat]);

	// ✅ Current subcategory
	const currentSub = subcategories.find(
		(sub) => sub.id === selectedSubCategory
	);
	const products: Product[] = currentSub?.products || [];

	// ✅ Get specifications for display
	const getSpecs = (product: Product) => {
		const specs: { name: string; value: any }[] = [];

		const add = (label: string, v: any) => {
			if (v === undefined || v === null) return;
			if (Array.isArray(v)) {
				specs.push({ name: label, value: v.join(" / ") });
			} else {
				specs.push({ name: label, value: String(v) });
			}
		};

		add("Model", product.model);
		add("Type", product.type);
		add("Ratio", product.ratio);
		add("Max RPM", product.rpm);
		add("Torque (Nm)", product.torque_nm);
		add("Weight (kg)", product.weight_kg);
		add("Output", product.output);
		if (product.collet_range) add("Collet Range", product.collet_range);
		if (product.adjustable) add("Adjustable", product.adjustable);
		if (product.series) add("Series", product.series);

		return specs;
	};

	// ✅ Format weight display
	const formatWeight = (weight: number | number[]): string => {
		if (Array.isArray(weight)) {
			return `${Math.min(...weight)} - ${Math.max(...weight)} kg`;
		}
		return `${weight} kg`;
	};

	return (
		<div className="min-h-screen bg-white mb-10">
			{/* ✅ HERO SECTION */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div className="max-w-7xl mx-auto relative z-10">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						Gerardi Classic Line Angle Heads
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl mb-8">
						{angleHeadsData.catalog.total_models} models available • 100% Made
						in Italy • Over 50 years of experience
					</p>
				</div>
			</section>

			{/* ✅ MAIN CATEGORY TABS (ATC / MTC) */}
			<section className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
				<div className="w-full flex justify-center px-6 flex gap-2">
					{mainCategories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setSelectedMainCat(cat)}
							className={`px-6 py-4 font-semibold transition-all border-b-4 ${
								selectedMainCat.id === cat.id
									? "border-blue-600 text-black"
									: "border-transparent text-gray-500 hover:text-gray-900"
							}`}>
							{cat.label}
							<span className="ml-2 text-sm text-gray-500">
								(
								{
									angleHeadsData.catalog.series[cat.key as "ATC" | "MTC"]
										.total_models
								}
								)
							</span>
						</button>
					))}
				</div>
			</section>

			{/* ✅ SERIES DESCRIPTION */}
			{selectedMainCat.key === "ATC" && (
				<section className=" py-10 px-6">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* Card 1 */}
							<div className="bg-white p-5 shadow-md rounded-xl border border-gray-200 h-[210px] flex flex-col">
								<h3 className="font-semibold text-lg text-gray-900 mb-2">
									Integral Shank & Shaft
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Main shaft is a single solid piece with case-hardened taper
									providing maximum rigidity. Fits any spindle.
								</p>
							</div>

							{/* Card 2 */}
							<div className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
								<h3 className="font-semibold text-lg text-gray-900 mb-2">
									ABEC 9 Ball Bearings
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Supported by pre-loaded super-precision angular contact
									bearings with long-life grease lubrication.
								</p>
							</div>

							{/* Card 3 */}
							<div className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
								<h3 className="font-semibold text-lg text-gray-900 mb-2">
									Main Body
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Treated steel head with 360° positioning, internal air
									pressure, high rigidity, corrosion resistance.
								</p>
							</div>

							{/* Card 4 */}
							<div className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
								<h3 className="font-semibold text-lg text-gray-900 mb-2">
									Gleason Gears
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Ground spiral bevel gears ensure low noise, reduced heat, high
									RPM, longer life & smooth power transmission.
								</p>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* ✅ MTC OVERVIEW – ONLY SHOW FOR MTC */}
			{selectedMainCat.key === "MTC" && (
				<section className="py-10 px-6">
					<div className="max-w-xl mx-auto">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
							{/* Card 1 - Ingranaggi / Gears */}
							<div className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
								<h3 className="font-semibold text-lg text-gray-900 mb-2">
									Ingranaggi – Gears
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Gleason ground spiral bevel gears deliver maximum performance
									with minimum vibration.
								</p>
							</div>

							{/* Card 2 - Cuscinetti / Bearings */}
							<div className="bg-white p-5 shadow-md rounded-xl border border-gray-200">
								<h3 className="font-semibold text-lg text-gray-900 mb-2">
									Cuscinetti – Bearings
								</h3>
								<p className="text-gray-700 text-sm leading-relaxed">
									Angular contact preloaded ball bearings of precision class
									ABEC 9 ensure reliability and exceptional performance.
								</p>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* ✅ SUBCATEGORY FILTER */}
			<section className="py-6 bg-white border-b border-gray-200 sticky top-[73px] z-30">
				<div className="w-full flex justify-center px-6 flex gap-3 overflow-x-auto hide-scrollbar">
					{subcategories.map((sub) => (
						<button
							key={sub.id}
							onClick={() => setSelectedSubCategory(sub.id)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedSubCategory === sub.id
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}>
							{sub.label}
						</button>
					))}
				</div>
			</section>

			{/* ✅ PRODUCT GRID */}
			<section className="max-w-7xl mx-auto px-6 mt-10">
				<div className="mb-12">
					<h2 className="text-2xl font-bold text-gray-900">
						 {currentSub?.label} Models Available
					</h2>
					{currentSub?.description && (
						<p className="text-gray-600 mt-2">{currentSub.description}</p>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((item, i) => (
						<div
							key={i}
							className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
							{/* Product Header */}
							<div className="p-5 bg-gradient-to-br  from-gray-50 to-white">
								<h3 className="text-xl font-bold flex items-center text-gray-900">
									{item.model}
									{item.adjustable && (
										<span className="inline-block ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
											{item.adjustable}
										</span>
									)}
								</h3>
								<p className="text-gray-600 text-sm mt-1">
									Type {item.type} • {item.ratio} ratio
								</p>

								{/* {item.series && (
									<span className="inline-block mt-2 ml-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
										{item.series}
									</span>
								)} */}
							</div>

							{/* Product Image */}
							<div className="flex justify-center bg-gray-50 p-6">
								<Image
									src={item.image || "/placeholder-angle-head.png"}
									alt={item.model}
									width={240}
									height={180}
									className="h-36 object-contain bg-transparent"
								/>
							</div>

							{/* Key Specs */}
							<div className="p-5 bg-white">
								{/* Additional Specs Table */}
								<table className="w-full text-xs border-t border-gray-100">
									<tbody>
										<tr className="border-b border-gray-100">
											<td className="py-2 font-medium text-gray-700">
												Max RPM
											</td>
											<td className="py-2 text-right text-black font-semibold">
												{item.rpm}
											</td>
										</tr>
										<tr className="border-b border-gray-100">
											<td className="py-2 font-medium text-gray-700">Torque</td>
											<td className="py-2 text-right text-black font-semibold">
												{item.torque_nm} Nm
											</td>
										</tr>
										<tr className="border-b border-gray-100">
											<td className="py-2 font-medium text-gray-700">Weight</td>
											<td className="py-2 text-right text-black font-semibold">
												{formatWeight(item.weight_kg)}
											</td>
										</tr>
										<tr className="border-b border-gray-100">
											<td className="py-2 font-medium text-gray-700">Max Ø</td>
											<td className="py-2 text-right text-black font-semibold">
												{item.output_diameter}mm
											</td>
										</tr>
										<tr className="border-b border-gray-100">
											<td className="py-2 font-medium text-gray-700">Output</td>
											<td className="py-2 text-right text-black font-semibold">
												{item.output}
											</td>
										</tr>
										{item.collet_range && (
											<tr className="border-b border-gray-100">
												<td className="py-2 font-medium text-gray-700">
													Collet Range
												</td>
												<td className="py-2 text-right text-black font-semibold">
													{item.collet_range}
												</td>
											</tr>
										)}
									</tbody>
								</table>

								<Button
									className="w-full mt-4 bg-gray-900 hover:bg-black"
									onClick={() => router.push(`/Contact?itemId=${item.model}`)}>
									Enquiry Now
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* ✅ CTA SECTION */}
			<section className="relative py-20 px-6 bg-black text-white overflow-hidden mt-16">
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Need Custom Angle Head Solutions?
					</h2>
					<p className="text-xl text-gray-300 mb-8">
						Our experts can help you find the perfect angle head configuration
						for your specific machining requirements.
					</p>
					<Button
						className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg text-lg"
						onClick={() => window.open("/fillform.pdf", "_blank")}>
						Download Enquiry Form
					</Button>
				</div>
			</section>
		</div>
	);
}
