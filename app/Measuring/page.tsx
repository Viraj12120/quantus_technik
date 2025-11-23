"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// ✅ import datasets
import measuringData from "../datasets/cmm.json";
import toolData from "../datasets/tools.json";

type Product = {
	model?: string;
	description?: string;
	image?: string;
	measuring_range_mm?:
		| string
		| string[]
		| number[]
		| { x?: number; y?: number[] | string; z?: number };
	accuracy_class?: string | string[];
	accuracy_µm?: string | number | string[] | number[];
	space_requirement_mm?: string | string[] | number[];
	features?: string[];
	software?: string | string[];
	weight?: { device_kg?: number[]; max_workpiece_kg?: number[] };
	dimensions?: {
		overall?: { length?: number[]; width?: number; height?: number };
		working_area?: { [key: string]: any };
	};
	volumetric_uncertainty?: { premium_select?: string };
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

export default function MachinesDetailPage() {
	const router = useRouter();

	// ✅ Combine both datasets as MAIN FILTER OPTIONS
	const mainCategories: MainCategory[] = [
		{
			id: "measuring",
			label: measuringData.measuring_machines.category,
			data: measuringData.measuring_machines,
		},
		{
			id: "tools",
			label: toolData.tool_presetters.category,
			data: toolData.tool_presetters,
		},
	];

	// ✅ default main category: measuring machines
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

	// ✅ UPDATED SPEC BUILDER for all machines (CMM + Tool Presetters)
	const getSpecs = (product: Product) => {
		const specs: { name: string; value: any }[] = [];

		const add = (label: string, v: any) => {
			if (!v) return;
			if (Array.isArray(v)) specs.push({ name: label, value: v.join(" / ") });
			else specs.push({ name: label, value: String(v) });
		};

		const formatRange = (range: any): string => {
			if (!range) return "";

			if (typeof range === "string") return range;

			if (Array.isArray(range)) return range.join(" × ") + " mm";

			if (typeof range === "object") {
				const x = range.x || "";
				const y = Array.isArray(range.y) ? range.y.join("/") : range.y || "";
				const z = range.z || "";
				return `${x} × ${y} × ${z} mm`;
			}

			return String(range);
		};

		const formatWeight = (weight: any): string => {
			if (!weight) return "";

			if (typeof weight === "object") {
				const device = weight.device_kg
					? `Device: ${weight.device_kg.join(" / ")} kg`
					: "";
				const workpiece = weight.max_workpiece_kg
					? `Workpiece: ${weight.max_workpiece_kg.join(" / ")} kg`
					: "";
				return [device, workpiece].filter(Boolean).join(" | ");
			}

			// Handle direct weight values (like net_weight_kg)
			if (typeof weight === "number") return `${weight} kg`;

			return String(weight);
		};

		const formatDimensions = (dimensions: any): string => {
			if (!dimensions?.overall) return "";

			const overall = dimensions.overall;
			const parts = [];

			if (overall.length) {
				parts.push(
					`Length: ${
						Array.isArray(overall.length)
							? overall.length.join("/")
							: overall.length
					} mm`
				);
			}
			if (overall.width) {
				parts.push(`Width: ${overall.width} mm`);
			}
			if (overall.height) {
				parts.push(`Height: ${overall.height} mm`);
			}

			return parts.join(" | ");
		};

		const formatWorkingArea = (dimensions: any): string => {
			if (!dimensions?.working_area) return "";

			const area = dimensions.working_area;
			const parts = [];

			if (area.L1)
				parts.push(
					`L1: ${Array.isArray(area.L1) ? area.L1.join("/") : area.L1} mm`
				);
			if (area.W1) parts.push(`W1: ${area.W1} mm`);
			if (area.H1) parts.push(`H1: ${area.H1} mm`);
			if (area.L2)
				parts.push(
					`L2: ${Array.isArray(area.L2) ? area.L2.join("/") : area.L2} mm`
				);
			if (area.W2) parts.push(`W2: ${area.W2} mm`);
			if (area.H2) parts.push(`H2: ${area.H2} mm`);
			if (area.L3)
				parts.push(
					`L3: ${Array.isArray(area.L3) ? area.L3.join("/") : area.L3} mm`
				);
			if (area.H3) parts.push(`H3: ${area.H3} mm`);

			return parts.join(" | ");
		};

		// ===== COMMON FIELDS (All Products) =====

		// Model and Description - ALWAYS SHOW
		if (product.model) add("Model", product.model);

		// Applications - ALWAYS SHOW if available
		if (product.applications) add("Applications", product.applications);

		// Features - ALWAYS SHOW if available
		if (product.features) add("Features", product.features);

		// Software - ALWAYS SHOW if available
		if (product.software) add("Software", product.software);

		// ===== CMM SPECIFIC FIELDS =====

		// Measuring Range - for CMMs
		if (product.measuring_range_mm) {
			specs.push({
				name: "Measuring Range",
				value: formatRange(product.measuring_range_mm),
			});
		}

		// Accuracy Class - for CMMs
		if (product.accuracy_class) {
			add("Accuracy Class", product.accuracy_class);
		}

		// Volumetric Uncertainty - for LH series
		if (product.volumetric_uncertainty?.premium_select) {
			specs.push({
				name: "Volumetric Uncertainty",
				value: product.volumetric_uncertainty.premium_select,
			});
		}

		// Overall Dimensions - for detailed CMM models
		if (product.dimensions?.overall) {
			const dimensionsValue = formatDimensions(product.dimensions);
			if (dimensionsValue) {
				specs.push({ name: "Overall Dimensions", value: dimensionsValue });
			}
		}

		// Working Area - for detailed CMM models
		if (product.dimensions?.working_area) {
			const workingArea = formatWorkingArea(product.dimensions);
			if (workingArea) {
				specs.push({ name: "Working Area", value: workingArea });
			}
		}

		// Weight - for CMMs
		if (product.weight) {
			const weightValue = formatWeight(product.weight);
			if (weightValue) {
				specs.push({ name: "Weight", value: weightValue });
			}
		} else if (product.net_weight_kg) {
			// For SF series that use net_weight_kg directly
			specs.push({ name: "Weight", value: `${product.net_weight_kg} kg` });
		} else if (product.max_part_weight_kg) {
			// For SF series that use max_part_weight_kg
			specs.push({
				name: "Max Part Weight",
				value: `${product.max_part_weight_kg} kg`,
			});
		}

		// Space Requirement - for SF series
		if (product.space_requirement_mm) {
			specs.push({
				name: "Space Requirement",
				value: formatRange(product.space_requirement_mm),
			});
		}

		// Grid Dimension - for detailed CMM models
		if (product.grid_dimension) {
			specs.push({ name: "Grid Dimension", value: product.grid_dimension });
		}

		// Minimum Distance - for detailed CMM models
		if (product.min_distance) {
			const minDist = product.min_distance;
			const parts = [];
			if (minDist.ceiling) parts.push(`Ceiling: ${minDist.ceiling} mm`);
			if (minDist.wall) parts.push(`Wall: ${minDist.wall} mm`);
			if (parts.length > 0) {
				specs.push({ name: "Minimum Distance", value: parts.join(" | ") });
			}
		}

		// Damping - for SF series
		if (product.damping) {
			specs.push({ name: "Damping", value: product.damping });
		}

		// Design - for LHF series
		if (product.design) {
			specs.push({ name: "Design", value: product.design });
		}

		// Measurement Types - for GT series
		if (product.measurement_types) {
			add("Measurement Types", product.measurement_types);
		}

		// Measurement Axes - for rotary table
		if (product.measurement_axes) {
			specs.push({
				name: "Measurement Axes",
				value: `${product.measurement_axes}`,
			});
		}

		// Rotary Table - for rotary table models
		if (product.rotary_table) {
			specs.push({ name: "Rotary Table", value: product.rotary_table });
		}

		// Arm Lengths - for MMA series
		if (product.arm_lengths_m) {
			specs.push({
				name: "Arm Lengths",
				value: `${product.arm_lengths_m.join(" / ")} m`,
			});
		}

		// Sensors - for MMA series
		if (product.sensors) {
			add("Sensors", product.sensors);
		}

		// Battery - for MMA series
		if (product.battery) {
			specs.push({ name: "Battery", value: product.battery });
		}

		// Scan Rate - for MMA Premium
		if (product.scan_rate) {
			specs.push({ name: "Scan Rate", value: product.scan_rate });
		}

		// Accuracy (µm) - for MMA series
		if (product.accuracy_µm) add("Accuracy (µm)", product.accuracy_µm);

		// Probe Restriction - for CMMs
		if (product.probe_restriction)
			add("Probe Restriction", product.probe_restriction);

		// ===== TOOL PRESETTER SPECIFIC FIELDS =====

		// Variants - for Zoller vertical devices
		if (product.variants) {
			add("Variants", product.variants);
		}

		// Spindle - for Zoller venturion
		if (product.spindle) {
			specs.push({ name: "Spindle", value: product.spindle });
		}

		// Axes - for Zoller CNC machines
		if (product.axes) {
			specs.push({ name: "Axes", value: product.axes });
		}

		// Components - for Zoller venturion
		if (product.components) {
			add("Components", product.components);
		}

		// Operation - for Zoller elephant
		if (product.operation) {
			specs.push({ name: "Operation", value: product.operation });
		}

		// Measuring Range (specific) - for Zoller hyperion
		if (product.measuring_range_z_mm && product.measuring_range_x_mm) {
			specs.push({
				name: "Measuring Range",
				value: `Z: ${product.measuring_range_z_mm} mm | X: ${product.measuring_range_x_mm} mm`,
			});
		}

		// Swivel Range - for Zoller hyperion
		if (product.swivel_range_mm) {
			specs.push({
				name: "Swivel Range",
				value: `${product.swivel_range_mm} mm`,
			});
		}

		// Clamping System - for Zoller tribos
		if (product.clamping_system) {
			specs.push({ name: "Clamping System", value: product.clamping_system });
		}

		// Functions - for Zoller multi-function machines
	
		return specs;
	};

	return (
		<div className="min-h-screen bg-white mb-10">
			{/* ✅ MAIN CATEGORY FILTER */}
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

			{/* ✅ MAIN CATEGORY FILTER (same UI as product page) */}
			<section className="py-6 bg-white sticky top-16 z-40">
				<div className="max-w-7xl mx-auto px-24 flex gap-3 overflow-x-auto">
					{mainCategories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setSelectedMainCat(cat)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedMainCat.id === cat.id
									? "bg-blue-600 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}>
							{cat.label}
						</button>
					))}
				</div>
			</section>

			{/* ✅ SUBCATEGORY FILTER (identical styling) */}
			<section className="py-6 bg-white border-b border-gray-200 sticky top-28 z-30">
				<div className="max-w-7xl lg:px-24 mx-auto px-6 flex gap-3 overflow-x-auto hide-scrollbar">
					{subcategories.map((sub: any) => (
						<button
							key={sub.id}
							onClick={() => setSelectedSubCategory(sub.id)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedSubCategory === sub.id
									? "bg-blue-600 text-white"
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
								<h3 className="text-xl font-bold">{item.model}</h3>
								<p className="text-gray-600">{item.description}</p>
							</div>

							<div className="flex justify-center bg-gray-50 p-4">
								<Image
									src={item.image || "/placeholder.jpg"}
									alt={item.model}
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
