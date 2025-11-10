"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// ✅ import MST dataset
import mstData from "../datasets/tooling.json";

type Product = {
	name?: string;
	category?: string;
	description?: string;
	image?: string;
	machine_brand?: string;
	machine_model?: string;
	tooling_system?: string;
	[key: string]: any;
};

type SubCategory = {
	id: string;
	name: string;
	products: Product[];
	[key: string]: any;
};

type MainCategory = {
	id: string;
	label: string;
	data: {
		category: string;
		brand?: string;
		subcategories: { [key: string]: SubCategory };
		[key: string]: any;
	};
};

export default function MSTProductsPage() {
	const router = useRouter();

	// ✅ Transform MST data into main categories
	const mainCategories: MainCategory[] = [
		{
			id: "general",
			label: "General Products",
			data: {
				category: "General Products",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "All General Products",
						products: mstData.mst_corporation_products.general_products,
					},
				},
			},
		},
		{
			id: "new",
			label: "New Products",
			data: {
				category: "New Products",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "Latest Releases",
						products: mstData.mst_corporation_products.new_products,
					},
				},
			},
		},
		{
			id: "shrink_holders",
			label: "Shrink-fit Holders",
			data: {
				category: "Shrink-fit Holders",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "All Shrink-fit Holders",
						products: mstData.mst_corporation_products.shrink_fit_holders,
					},
				},
			},
		},
		{
			id: "shrink_equipment",
			label: "Shrink-fit Equipment",
			data: {
				category: "Shrink-fit Equipment",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "All Equipment",
						products: mstData.mst_corporation_products.shrink_fit_equipment,
					},
				},
			},
		},
		{
			id: "angle",
			label: "Angle Heads",
			data: {
				category: "Angle Heads",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "All Angle Heads",
						products: mstData.mst_corporation_products.angle_heads,
					},
				},
			},
		},
		{
			id: "peripherals",
			label: "Peripherals",
			data: {
				category: "Peripherals",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "All Peripherals",
						products: mstData.mst_corporation_products.peripherals,
					},
				},
			},
		},
		{
			id: "dedicated",
			label: "Dedicated Machine Tooling",
			data: {
				category: "Dedicated Machine Tooling Systems",
				brand: "MST Corporation",
				subcategories: {
					all: {
						id: "all",
						name: "All Tooling Systems",
						products:
							mstData.mst_corporation_products
								.dedicated_machine_tooling_systems,
					},
				},
			},
		},
	];

	// ✅ default main category
	const [selectedMainCat, setSelectedMainCat] = useState<MainCategory>(
		mainCategories[0]
	);

	// ✅ subcategories from selected main category
	const subcategories: SubCategory[] = Object.values(
		selectedMainCat.data.subcategories
	);

	// ✅ default subcategory
	const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
		subcategories[0]?.id
	);

	useEffect(() => {
		// reset on main category change
		setSelectedSubCategory(
			Object.values(selectedMainCat.data.subcategories)[0]?.id
		);
	}, [selectedMainCat]);

	// ✅ current subcategory object
	const currentSub: SubCategory | undefined =
		selectedMainCat.data.subcategories[
			selectedSubCategory as keyof typeof selectedMainCat.data.subcategories
		];

	const products: Product[] = currentSub?.products || [];

	// ✅ SPEC BUILDER
	const getSpecs = (product: any) => {
		const specs: { name: string; value: any }[] = [];

		const add = (label: string, v: any) => {
			if (!v) return;
			if (Array.isArray(v)) specs.push({ name: label, value: v.join(" / ") });
			else specs.push({ name: label, value: String(v) });
		};

		if (product.category) add("Category", product.category);
		if (product.description) add("Description", product.description);
		if (product.machine_brand) add("Machine Brand", product.machine_brand);
		if (product.machine_model) add("Machine Model", product.machine_model);
		if (product.tooling_system) add("Tooling System", product.tooling_system);
		if (product.machine_compatibility)
			add("Compatible With", product.machine_compatibility);

		return specs;
	};

	return (
		<div className="min-h-screen bg-white mb-10">
			{/* ✅ HERO SECTION */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div className="max-w-7xl mx-auto relative z-10">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						{selectedMainCat.data.category}
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl">
						{selectedMainCat.data.brand}
					</p>
				</div>
			</section>

			{/* ✅ MAIN CATEGORY FILTER */}
			<section className="py-6 bg-white sticky top-16 z-40">
				<div className="max-w-7xl mx-auto px-24 flex gap-3 overflow-x-auto hide-scrollbar">
					{mainCategories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setSelectedMainCat(cat)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedMainCat.id === cat.id
									? "bg-black text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}>
							{cat.label}
						</button>
					))}
				</div>
			</section>

			{/* ✅ SUBCATEGORY FILTER */}
			<section className="py-6 bg-white border-b border-gray-200 sticky top-28 z-30">
				<div className="max-w-7xl lg:px-24 mx-auto px-6 flex gap-3 overflow-x-auto hide-scrollbar">
					{subcategories.map((sub: any) => (
						<button
							key={sub.id}
							onClick={() => setSelectedSubCategory(sub.id)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedSubCategory === sub.id
									? "bg-black text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}>
							{sub.name}
						</button>
					))}
				</div>
			</section>

			{/* ✅ PRODUCT GRID */}
			<section className="max-w-7xl mx-auto px-6 mt-10">
				<h2 className="text-2xl font-bold text-gray-900 mb-8">
					{products.length} Products Available
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((item: any, i: number) => (
						<div
							key={i}
							className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
							<div className="p-5">
								<h3 className="text-xl font-bold">{item.name}</h3>
								{item.description && (
									<p className="text-gray-600 text-sm mt-1">
										{item.description}
									</p>
								)}
							</div>

							<div className="flex justify-center bg-gray-50 p-4">
								<Image
									src={item.image || "/placeholder.jpg"}
									alt={item.name || "Product"}
									width={240}
									height={160}
									unoptimized
									className="h-32 object-contain"
								/>
							</div>

							<div className="p-5 flex flex-col gap-2">
								<table className="text-xs">
									<tbody>
										{getSpecs(item).map((spec, idx) => (
											<tr key={idx} className="border-t border-gray-100">
												<td className="py-1 font-medium text-gray-700">
													{spec.name}
												</td>
												<td className="py-1 text-right text-black font-semibold">
													{spec.value}
												</td>
											</tr>
										))}
									</tbody>
								</table>

								<Button
									className="mt-4 bg-gray-900 hover:bg-black"
									onClick={() => router.push(`/Contact?itemId=${item.name}`)}>
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
