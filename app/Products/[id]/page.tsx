"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import machiningData from "../../datasets/products.json";
import turningData from "../../datasets/turning.json";
import { useRouter } from "next/navigation";

// Define TypeScript interfaces
interface MachineSpecs {
	travel_mm?: {
		x: number | number[];
		y: number | number[];
		z: number | number[];
	};
	table_mm?: {
		x: number | number[];
		y: number | number[];
	};
	feedrate_m_per_min?: {
		x: number;
		y: number;
		z: number;
	};
	milling_head?: string;
	rotation_angle?: string;
	spindle?: {
		shank?: string;
		rotation_speed_rpm?: number;
		power_kw?: string;
		torque_nm?: string;
	};
	table_load_kg?: number | number[];
	rotary_table?: {
		diameter_mm?: string;
		rotation?: string;
	};
	notes?: string;
	// Existing properties for backward compatibility
	pallet_size_mm?: number | number[] | null;
	stroke_mm?: number[];
	spindle_speed_rpm?: number[];
	number_of_tools?: number[];
	table_size_mm?: string;
	working_travel_mm?: number[];
	speed_max_m_per_min?: number[];
	interference_diameter_mm?: number;
}

interface Machine {
	model: string;
	series?: string;
	description: string;
	type: string;
	image: string;
	detail_url?: string;
	specs?: MachineSpecs;
	// Existing properties for backward compatibility
	pallet_size_mm?: number | number[] | null;
	stroke_mm?: number[];
	spindle_speed_rpm?: number[];
	number_of_tools?: number[];
	table_size_mm?: string;
	working_travel_mm?: number[];
	speed_max_m_per_min?: number[];
	interference_diameter_mm?: number;
	brand?: string;
	chuck_size_inch?: number | number[];
	max_turning_diameter_mm?: number;
	max_turning_length_mm?: number;
	max_cutting_height_mm?: number;
	spindle_motor_kw?: number | number[];
	y_axis?: boolean;
	big_bore?: boolean;
	tool_magazine?: boolean;
	twin_turret?: boolean;
	twin_spindle?: boolean;
	stroke_y_mm?: number;
}

interface ManufacturerData {
	id: string;
	machines: Machine[];
}

interface MachiningData {
	ken?: ManufacturerData;
	grob?: ManufacturerData;
	hwacheon?: ManufacturerData;
	alzmetall?: ManufacturerData;
	horizontal?: { machines: Machine[] };
	vertical?: { products: Machine[] };
	"5-axis"?: Machine[];
}

// Type assertion for the imported data
const machiningDataTyped = machiningData as unknown as MachiningData;

// 5-axis filter categories
const fiveAxisFilters = [
	{ id: "all", name: "All 5-Axis" },
	{ id: "simultaneous", name: "Simultaneous" },
	{ id: "gantry", name: "Gantry" },
	{ id: "double_column", name: "Double Column" },
	{ id: "millturn", name: "MillTurn" },
];

// Machine classification function
const classify5AxisMachine = (machine: Machine): string[] => {
	const categories: string[] = [];
	const model = machine.model.toLowerCase();
	const description = machine.description.toLowerCase();
	const type = machine.type?.toLowerCase() || "";

	// Simultaneous classification
	if (
		type.includes("simultaneous") ||
		description.includes("simultaneous") ||
		model.includes("g") || // G-series are typically simultaneous
		model.includes("focus") ||
		model.includes("rotor") ||
		model.includes("compact") ||
		model.includes("linmax")
	) {
		categories.push("simultaneous");
	}

	// Gantry classification
	if (
		type.includes("gantry") ||
		description.includes("gantry") ||
		model.includes("compactb") ||
		model.includes("linmaxb") ||
		model.includes("torque") ||
		model.includes("twin")
	) {
		categories.push("gantry");
	}

	// Double Column classification
	if (
		type.includes("double column") ||
		description.includes("double column") ||
		model.includes("focus5") ||
		model.includes("saber") ||
		(model.includes("rhino") && model.includes("t"))
	) {
		categories.push("double_column");
	}

	// MillTurn classification
	if (
		type.includes("millturn") ||
		description.includes("millturn") ||
		description.includes("multitasking") ||
		(model.includes("m") &&
			!isNaN(parseInt(model.replace("m", "").replace("-g", "")))) || // M-series models
		model.includes("i2")
	) {
		categories.push("millturn");
	}

	// Default to simultaneous if no specific category found
	if (categories.length === 0) {
		categories.push("simultaneous");
	}

	return categories;
};

function isValidUrl(url: any) {
	if (!url || typeof url !== "string") return false;
	if (url.trim() === "") return false;

	try {
		// For relative URLs
		if (url.startsWith("/")) return true;

		// For remote URLs
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

// Helper function to get manufacturer for a machine
const getManufacturer = (machine: Machine): string => {
	if (machiningDataTyped.ken?.machines?.includes(machine)) return "ken";
	if (machiningDataTyped.grob?.machines?.includes(machine)) return "grob";
	if (machiningDataTyped.alzmetall?.machines?.includes(machine))
		return "alzmetall";

	// Check if it's from Hwacheon datasets
	if (machiningDataTyped.horizontal?.machines?.includes(machine))
		return "hwacheon";
	if (machiningDataTyped.vertical?.products?.includes(machine))
		return "hwacheon";
	if (machiningDataTyped["5-axis"]?.includes(machine)) return "hwacheon";

	return "other";
};

export default function ProductDetailPage() {
	const params = useParams();
	const productId = params.id as string;
	const router = useRouter();

	// Determine category based on route
	const isTurningCenter = productId === "turning-centers";
	const isMachiningCenter = productId === "machining-center";

	// ✅ Sub-categories (Horizontal, Vertical, 5-Axis)
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
	const [selected5AxisFilter, setSelected5AxisFilter] = useState("all");

	useEffect(() => {
		setSelectedSubCategory(
			isTurningCenter ? "horizontal_turning" : "horizontal"
		);
		setSelected5AxisFilter("all");
	}, [productId, isTurningCenter]);

	// ✅ UPDATED: Fetch products with proper typing and arranged in sequence
	const getProducts = (): Machine[] => {
		if (!isMachiningCenter) {
			// Turning centers logic
			if (selectedSubCategory === "horizontal_turning") {
				return (turningData as any).horizontal_turning?.products || [];
			}
			return (turningData as any).vertical_turning?.products || [];
		}

		// Machining centers logic
		let products: Machine[] = [];

		// Get base products based on subcategory
		if (selectedSubCategory === "horizontal") {
			// Horizontal machines from all manufacturers - arranged in sequence
			const kenHorizontal =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type?.includes("Horizontal") ||
						machine.description?.includes("Horizontal")
				) || [];

			const grobHorizontal =
				machiningDataTyped.grob?.machines?.filter(
					(machine) =>
						machine.type?.includes("Horizontal") ||
						machine.description?.includes("Horizontal")
				) || [];

			const hwacheonHorizontal = machiningDataTyped.horizontal?.machines || [];

			const alzmetallHorizontal =
				machiningDataTyped.alzmetall?.machines?.filter(
					(machine) =>
						machine.type?.includes("Horizontal") ||
						machine.description?.includes("Horizontal")
				) || [];

			// Arrange in sequence: KEN → GROB → Hwacheon → Alzmetall
			products = [
				...kenHorizontal,
				...grobHorizontal,
				...hwacheonHorizontal,
				...alzmetallHorizontal,
			];
		} else if (selectedSubCategory === "vertical") {
			// Vertical machines from all manufacturers - arranged in sequence
			const kenVertical =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type === "Vertical" ||
						machine.description?.includes("Vertical")
				) || [];

			const grobVertical =
				machiningDataTyped.grob?.machines?.filter(
					(machine) =>
						machine.type === "Vertical" ||
						machine.description?.includes("Vertical")
				) || [];

			const hwacheonVertical = machiningDataTyped.vertical?.products || [];

			const alzmetallVertical =
				machiningDataTyped.alzmetall?.machines?.filter(
					(machine) =>
						machine.type === "Vertical" ||
						machine.description?.includes("Vertical")
				) || [];

			// Arrange in sequence: KEN → GROB → Hwacheon → Alzmetall
			products = [
				...kenVertical,
				...grobVertical,
				...hwacheonVertical,
				...alzmetallVertical,
			];
		} else if (selectedSubCategory === "5-axis") {
			// 5-axis machines from all manufacturers - arranged in sequence
			const ken5Axis =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type?.includes("5-Axis") ||
						machine.description?.includes("5-Axis")
				) || [];

			const grob5Axis = machiningDataTyped.grob?.machines || []; // All GROB are 5-axis

			const hwacheon5Axis = machiningDataTyped["5-axis"] || [];

			const alzmetall5Axis =
				machiningDataTyped.alzmetall?.machines?.filter(
					(machine) =>
						machine.type?.includes("5-Axis") ||
						machine.description?.includes("5-Axis")
				) || [];

			// Arrange in sequence: KEN → GROB → Hwacheon → Alzmetall
			products = [
				...ken5Axis,
				...grob5Axis,
				...hwacheon5Axis,
				...alzmetall5Axis,
			];
		}

		return products;
	};

	const allProducts = getProducts();

	// Filter 5-axis products based on selected filter
	const categoryProducts =
		selectedSubCategory === "5-axis" && selected5AxisFilter !== "all"
			? allProducts.filter((machine) => {
					const categories = classify5AxisMachine(machine);
					return categories.includes(selected5AxisFilter);
			  })
			: allProducts;

	const heroProduct = categoryProducts[0];
	const [mainImage, setMainImage] = useState(heroProduct?.image || "");

	useEffect(() => {
		setMainImage(heroProduct?.image || "");
	}, [heroProduct]);

	// ✅ ENHANCED: Updated specs function with KEN machine detailed specifications
	function getSpecs(product: Machine) {
		const baseSpecs = [
			{ name: "Model", value: product.model },
			{ name: "Description", value: product.description },
		];

		// Check manufacturer and add appropriate specs
		const isKen = machiningDataTyped.ken?.machines?.includes(product);
		const isGrob = machiningDataTyped.grob?.machines?.includes(product);
		const isAlzmetall =
			machiningDataTyped.alzmetall?.machines?.includes(product);
		const isHwacheon = !isKen && !isGrob && !isAlzmetall;

		// KEN-specific specs with detailed specifications
		if (isKen && product.specs) {
			const specs = product.specs;

			// Add type if available
			if (product.type) {
				baseSpecs.push({ name: "Type", value: product.type });
			}

			// Travel specifications
			if (specs.travel_mm) {
				const travel = specs.travel_mm;
				const xTravel = Array.isArray(travel.x) ? travel.x.join("/") : travel.x;
				const yTravel = Array.isArray(travel.y) ? travel.y.join("/") : travel.y;
				const zTravel = travel.z;

				baseSpecs.push({
					name: "Travel (X/Y/Z mm)",
					value: `${xTravel} / ${yTravel} / ${zTravel}`,
				});
			}

			// Table specifications
			if (specs.table_mm) {
				const table = specs.table_mm;
				baseSpecs.push({
					name: "Table (X/Y mm)",
					value: `${table.x} / ${table.y}`,
				});
			}

			// Feedrate specifications
			if (specs.feedrate_m_per_min) {
				const feed = specs.feedrate_m_per_min;
				baseSpecs.push({
					name: "Feedrate (X/Y/Z m/min)",
					value: `${feed.x} / ${feed.y} / ${feed.z}`,
				});
			}

			// Milling head and rotation
			if (specs.milling_head) {
				baseSpecs.push({ name: "Milling Head", value: specs.milling_head });
			}

			if (specs.rotation_angle) {
				baseSpecs.push({ name: "Rotation Angle", value: specs.rotation_angle });
			}

			// Spindle specifications
			if (specs.spindle) {
				const spindle = specs.spindle;
				if (spindle.shank) {
					baseSpecs.push({ name: "Spindle Shank", value: spindle.shank });
				}
				if (spindle.rotation_speed_rpm) {
					baseSpecs.push({
						name: "Spindle Speed",
						value: `${spindle.rotation_speed_rpm.toLocaleString()} rpm`,
					});
				}
				if (spindle.power_kw) {
					baseSpecs.push({
						name: "Spindle Power",
						value: `${spindle.power_kw} kW`,
					});
				}
				if (spindle.torque_nm) {
					baseSpecs.push({
						name: "Spindle Torque",
						value: `${spindle.torque_nm} Nm`,
					});
				}
			}

			// Additional specifications
			if (specs.table_load_kg) {
				baseSpecs.push({
					name: "Table Load",
					value: `${
						Array.isArray(specs.table_load_kg)
							? specs.table_load_kg.join("/")
							: specs.table_load_kg
					} kg`,
				});
			}

			if (specs.rotary_table) {
				const rotary = specs.rotary_table;
				if (rotary.diameter_mm) {
					baseSpecs.push({ name: "Rotary Table", value: rotary.diameter_mm });
				}
				if (rotary.rotation) {
					baseSpecs.push({ name: "Table Rotation", value: rotary.rotation });
				}
			}

			if (specs.notes) {
				baseSpecs.push({ name: "Notes", value: specs.notes });
			}

			return baseSpecs;
		}

		// GROB-specific specs (unchanged)
		if (isGrob) {
			if (product.working_travel_mm) {
				baseSpecs.push({
					name: "Working Travel (mm)",
					value: `X:${product.working_travel_mm[0]} | Y:${product.working_travel_mm[1]} | Z:${product.working_travel_mm[2]}`,
				});
			}
			if (product.speed_max_m_per_min) {
				baseSpecs.push({
					name: "Rapid Traverse (m/min)",
					value: `X:${product.speed_max_m_per_min[0]} | Y:${product.speed_max_m_per_min[1]} | Z:${product.speed_max_m_per_min[2]}`,
				});
			}
			if (product.interference_diameter_mm) {
				baseSpecs.push({
					name: "Interference Diameter",
					value: `${product.interference_diameter_mm} mm`,
				});
			}
			if (product.spindle_speed_rpm) {
				baseSpecs.push({
					name: "Spindle Speed (rpm)",
					value: Array.isArray(product.spindle_speed_rpm)
						? `${product.spindle_speed_rpm[0]} max`
						: `${product.spindle_speed_rpm}`,
				});
			}
			if (product.number_of_tools) {
				baseSpecs.push({
					name: "Number of Tools",
					value: Array.isArray(product.number_of_tools)
						? product.number_of_tools[0].toString()
						: product.number_of_tools || "N/A",
				});
			}
			baseSpecs.push({
				name: "Type",
				value: "5-Axis Universal Machining Center",
			});
			return baseSpecs;
		}

		// Alzmetall-specific specs (unchanged)
		if (isAlzmetall) {
			if (product.table_size_mm) {
				baseSpecs.push({
					name: "Table Size (mm)",
					value: product.table_size_mm,
				});
			}
			if (product.stroke_mm) {
				baseSpecs.push({
					name: "Stroke (mm)",
					value: product.stroke_mm.join(" × "),
				});
			}
			if (product.spindle_speed_rpm) {
				baseSpecs.push({
					name: "Spindle Speed (rpm)",
					value: product.spindle_speed_rpm.join(" / "),
				});
			}
			if (product.number_of_tools) {
				baseSpecs.push({
					name: "Number of Tools",
					value: product.number_of_tools.join(" / "),
				});
			}
			if (product.type) {
				baseSpecs.push({ name: "Type", value: product.type });
			}
			return baseSpecs;
		}

		// Hwacheon specs (original logic - unchanged)
		if (isMachiningCenter) {
			if (selectedSubCategory === "horizontal") {
				return [
					...baseSpecs,
					{
						name: "Pallet Size (mm)",
						value: product.pallet_size_mm?.toString() || "N/A",
					},
					{
						name: "Stroke (mm)",
						value: product.stroke_mm?.join(" × ") || "N/A",
					},
					{
						name: "Spindle Speed (rpm)",
						value: product.spindle_speed_rpm?.join(" / ") || "N/A",
					},
					{
						name: "Number of Tools",
						value: product.number_of_tools?.join(" / ") || "N/A",
					},
					{ name: "Type", value: product.type || "N/A" },
				];
			}

			if (selectedSubCategory === "vertical") {
				return [
					...baseSpecs,
					{
						name: "Stroke (mm)",
						value: product.stroke_mm?.join(" × ") || "N/A",
					},
					{
						name: "Spindle Speed (rpm)",
						value: product.spindle_speed_rpm?.join(" / ") || "N/A",
					},
					{
						name: "Number of Tools",
						value: product.number_of_tools?.join(" / ") || "N/A",
					},
				];
			}

			if (selectedSubCategory === "5-axis") {
				const specs = [...baseSpecs];

				if (product.table_size_mm) {
					specs.push({ name: "Table Size (mm)", value: product.table_size_mm });
				} else if (product.working_travel_mm) {
					specs.push({
						name: "Table Size (mm)",
						value: `${product.working_travel_mm[0]} × ${product.working_travel_mm[1]}`,
					});
				}

				if (product.stroke_mm) {
					specs.push({
						name: "Stroke (mm)",
						value: `X:${product.stroke_mm[0]} | Y:${product.stroke_mm[1]} | Z:${product.stroke_mm[2]}`,
					});
				} else if (product.working_travel_mm) {
					specs.push({
						name: "Stroke (mm)",
						value: `X:${product.working_travel_mm[0]} | Y:${product.working_travel_mm[1]} | Z:${product.working_travel_mm[2]}`,
					});
				}

				if (product.spindle_speed_rpm) {
					specs.push({
						name: "Spindle Speed (rpm)",
						value: Array.isArray(product.spindle_speed_rpm)
							? `${product.spindle_speed_rpm[0]} max`
							: product.spindle_speed_rpm || "N/A",
					});
				}

				if (product.number_of_tools) {
					specs.push({
						name: "Number of Tools",
						value: Array.isArray(product.number_of_tools)
							? product.number_of_tools[0].toString()
							: product.number_of_tools || "N/A",
					});
				}

				if (product.type) {
					specs.push({ name: "Type", value: product.type });
				}

				return specs;
			}
		}

		// Default case - return basic specs
		return baseSpecs;
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
						{heroProduct?.description}
					</p>
				</div>
			</section>

			{/* SUBCATEGORY BUTTONS */}
			<section className="py-4 bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
					{/* Subcategory Filter */}
					<div className="flex gap-3 mb-4 flex-wrap justify-center">
						{subCategories.map((subCat) => (
							<button
								key={subCat.id}
								onClick={() => {
									setSelectedSubCategory(subCat.id);
									setSelected5AxisFilter("all");
								}}
								className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
									selectedSubCategory === subCat.id
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}>
								{subCat.name}
							</button>
						))}
					</div>

					{/* 5-Axis Specific Filters */}
					{selectedSubCategory === "5-axis" && (
						<div className="flex gap-3 mt-2 flex-wrap justify-center">
							{fiveAxisFilters.map((filter) => (
								<button
									key={filter.id}
									onClick={() => setSelected5AxisFilter(filter.id)}
									className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
										selected5AxisFilter === filter.id
											? "bg-blue-600 text-white"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}>
									{filter.name}
								</button>
							))}
						</div>
					)}
				</div>
			</section>

			{/* PRODUCT GRID */}
			<section className="w-full mx-auto px-6">
				<div className="mb-12 mt-12">
					<h2 className="text-2xl font-bold text-gray-900">
						{categoryProducts.length} Products Available
						{selectedSubCategory === "5-axis" &&
							selected5AxisFilter !== "all" && (
								<span className="text-blue-600 ml-2">
									(
									{
										fiveAxisFilters.find((f) => f.id === selected5AxisFilter)
											?.name
									}
									)
								</span>
							)}
					</h2>
				</div>

				{/* ZERO PRODUCT FALLBACK */}
				{categoryProducts.length === 0 ? (
					<div className="w-full py-24 flex flex-col items-center justify-center text-center">
						<h2 className="text-2xl font-bold text-gray-800 mb-3">
							No Products Found
						</h2>

						<p className="text-gray-500 max-w-md mb-6">
							We couldn't find any machines matching your selected category.
							Please try adjusting the filters.
						</p>

						<Button
							className="bg-black text-white hover:bg-gray-800"
							onClick={() => {
								setSelectedSubCategory(
									isTurningCenter ? "horizontal_turning" : "horizontal"
								);
								setSelected5AxisFilter("all");
							}}>
							Reset Filters
						</Button>
					</div>
				) : (
					/* PRODUCT GRID */
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-24">
						{categoryProducts.map((item, i) => (
							<div
								key={i}
								className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between min-h-[400px]">
								<div className="p-5">
									<h3 className="text-xl font-bold text-black-700">
										{item.model}
									</h3>
									<p className="text-gray-600 text-md">{item.description}</p>
									{selectedSubCategory === "5-axis" && (
										<div className="mt-2 flex flex-wrap gap-1">
											{classify5AxisMachine(item).map((category, idx) => (
												<span
													key={idx}
													className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
													{fiveAxisFilters.find((f) => f.id === category)?.name}
												</span>
											))}
										</div>
									)}
								</div>

								<div className="flex items-center justify-center bg-gray-50 p-4">
									<Image
										src={
											isValidUrl(item.image) ? item.image : "/placeholder.jpg"
										}
										alt={item?.model || "Product image"}
										width={240}
										height={160}
										unoptimized={true}
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
										className="w-full mt-4 bg-gray-900 hover:bg-black"
										onClick={() =>
											router.push(`/Contact?itemId=${item.model}`)
										}>
										Enquiry Now
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
