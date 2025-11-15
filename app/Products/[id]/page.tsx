"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import machiningData from "../../datasets/products.json";
import turningData from "../../datasets/turning.json";
import { useRouter } from "next/navigation";

// Define TypeScript interfaces
interface Machine {
	model: string;
	description: string;
	image: string;
	detail_url?: string;
	pallet_size_mm?: number | number[] | null;
	stroke_mm?: number[];
	spindle_speed_rpm?: number[];
	number_of_tools?: number[];
	type?: string;
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
const machiningDataTyped = machiningData as MachiningData;

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

	// ✅ Manufacturer filter options
	const manufacturerOptions = [
		{ id: "all", name: "All Manufacturers" },
		{ id: "hwacheon", name: "Hwacheon" },
		{ id: "ken", name: "KEN" },
		{ id: "grob", name: "GROB" },
		{ id: "alzmetall", name: "Alzmetall" },
	];

	// Default value update
	const [selectedSubCategory, setSelectedSubCategory] = useState(
		isTurningCenter ? "horizontal_turning" : "horizontal"
	);
	const [selectedManufacturer, setSelectedManufacturer] = useState("all");

	useEffect(() => {
		setSelectedSubCategory(
			isTurningCenter ? "horizontal_turning" : "horizontal"
		);
		setSelectedManufacturer("all");
	}, [productId, isTurningCenter]);

	// ✅ UPDATED: Fetch products with proper typing
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
			// Horizontal machines from all manufacturers
			const hwacheonHorizontal = machiningDataTyped.horizontal?.machines || [];
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
			const alzmetallHorizontal =
				machiningDataTyped.alzmetall?.machines?.filter(
					(machine) =>
						machine.type?.includes("Horizontal") ||
						machine.description?.includes("Horizontal")
				) || [];

			products = [
				...hwacheonHorizontal,
				...kenHorizontal,
				...grobHorizontal,
				...alzmetallHorizontal,
			];
		} else if (selectedSubCategory === "vertical") {
			// Vertical machines from all manufacturers
			const hwacheonVertical = machiningDataTyped.vertical?.products || [];
			const kenVertical =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type === "Vertical" ||
						machine.description?.includes("Vertical")
				) || [];
			const alzmetallVertical =
				machiningDataTyped.alzmetall?.machines?.filter(
					(machine) =>
						machine.type === "Vertical" ||
						machine.description?.includes("Vertical")
				) || [];

			products = [...hwacheonVertical, ...kenVertical, ...alzmetallVertical];
		} else if (selectedSubCategory === "5-axis") {
			// 5-axis machines from all manufacturers
			const hwacheon5Axis = machiningDataTyped["5-axis"] || [];
			const ken5Axis =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type?.includes("5-Axis") ||
						machine.description?.includes("5-Axis")
				) || [];
			const grob5Axis = machiningDataTyped.grob?.machines || []; // All GROB are 5-axis
			const alzmetall5Axis =
				machiningDataTyped.alzmetall?.machines?.filter(
					(machine) =>
						machine.type?.includes("5-Axis") ||
						machine.description?.includes("5-Axis")
				) || [];

			products = [
				...hwacheon5Axis,
				...ken5Axis,
				...grob5Axis,
				...alzmetall5Axis,
			];
		}

		// Apply manufacturer filter
		if (selectedManufacturer !== "all") {
			products = products.filter((product) => {
				// Check which manufacturer this product belongs to
				const isHwacheon =
					machiningDataTyped.horizontal?.machines?.includes(product) ||
					machiningDataTyped.vertical?.products?.includes(product) ||
					machiningDataTyped["5-axis"]?.includes(product);

				const isKen = machiningDataTyped.ken?.machines?.includes(product);
				const isGrob = machiningDataTyped.grob?.machines?.includes(product);
				const isAlzmetall =
					machiningDataTyped.alzmetall?.machines?.includes(product);

				switch (selectedManufacturer) {
					case "hwacheon":
						return isHwacheon;
					case "ken":
						return isKen;
					case "grob":
						return isGrob;
					case "alzmetall":
						return isAlzmetall;
					default:
						return true;
				}
			});
		}

		return products;
	};

	const categoryProducts = getProducts();
	const heroProduct = categoryProducts[0];
	const [mainImage, setMainImage] = useState(heroProduct?.image || "");

	useEffect(() => {
		setMainImage(heroProduct?.image || "");
	}, [heroProduct]);

	// ✅ UPDATED: Enhanced specs function with proper typing
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

		// KEN-specific specs
		if (isKen) {
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

		// GROB-specific specs
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
						: product.number_of_tools|| "N/A",
				});
			}
			baseSpecs.push({
				name: "Type",
				value: "5-Axis Universal Machining Center",
			});
			return baseSpecs;
		}

		// Alzmetall-specific specs
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

		// Hwacheon specs (original logic)
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
								onClick={() => setSelectedSubCategory(subCat.id)}
								className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
									selectedSubCategory === subCat.id
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}>
								{subCat.name}
							</button>
						))}
					</div>

					{/* Manufacturer Filter */}
					<div className="flex gap-3 flex-wrap justify-center">
						{manufacturerOptions.map((manufacturer) => (
							<button
								key={manufacturer.id}
								onClick={() => setSelectedManufacturer(manufacturer.id)}
								className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
									selectedManufacturer === manufacturer.id
										? "bg-blue-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}>
								{manufacturer.name}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* PRODUCT GRID */}
			<section className="w-full mx-auto px-6">
				<div className="mb-12 mt-12">
					<h2 className="text-2xl font-bold text-gray-900">
						{categoryProducts.length} Products Available
						{selectedManufacturer !== "all" && (
							<span className="text-blue-600 ml-2">
								-{" "}
								{
									manufacturerOptions.find((m) => m.id === selectedManufacturer)
										?.name
								}
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
							We couldn’t find any machines matching your selected category or
							manufacturer. Please try adjusting the filters.
						</p>

						<Button
							className="bg-black text-white hover:bg-gray-800"
							onClick={() => {
								setSelectedManufacturer("all");
								setSelectedSubCategory(
									isTurningCenter ? "horizontal_turning" : "horizontal"
								);
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
