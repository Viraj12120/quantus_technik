"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import machiningData from "../../datasets/products.json";
import turningData from "../../datasets/turning.json";
import { useRouter } from "next/navigation";

// Define TypeScript interfaces based on your exact JSON structure
interface MachineSpecs {
	travel_mm?: {
		x: number | number[] | string;
		y: number | number[] | string;
		z: number | number[] | string;
	};
	table_mm?: {
		x: number | string;
		y: number | string;
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
		power_kw?: string | number;
		torque_nm?: string | number;
	};
	table_load_kg?: number | number[];
	rotary_table?: {
		diameter_mm?: string;
		rotation?: string;
	};
	notes?: string;
	cutting_tool_interface?: string;
	max_tool_positions?: number;
	workpiece_capacity_kg?: number;
	max_workpiece_weight_kg?: number;
	interference_diameter?: number;
	table_diameter?: string | number;
	table_load?: string | number;
	spindle_taper?: {
		[key: string]: string;
	};
}

interface SpecItem {
	name: string;
	value: string | number | (string | number)[];
}

interface Machine {
	model: string;
	series?: string;
	description: string;
	type?: string;
	image: string;
	detail_url?: string;
	specs?: MachineSpecs;
	min_indexing_angle?: string;
	table_load?: string | number;
	feedrate?: string;
	max_bar_size_mm?: string | number;
	max_turning_length_mm?: string | number;
	spindle_motor_kw?: number;
	max_cutting_length_mm?: string | number;
	tool_type?: string;
	table_diameter?: string;
	extra_title?: string;
	types?: string[];
	stroke_mm?: string | number[];
	spindle_speed_rpm?: string | number[];
	number_of_tools?: string | number[];
	table_size_mm?: string;
	working_travel_mm?: number[];
	speed_max_m_per_min?: number[];
	interference_diameter_mm?: number;
	brand?: string;
	pallet_size_mm?: number | string; // JTEKT uses this
	table_load_kg?: number | number[];
	pallet_size?: number | string; // For JTEKT - ADD THIS

	rotary_table?: {
		diameter_mm?: string;
		rotation?: string;
	};
	feedrate_m_per_min?: {
		x: number;
		y: number;
		z: number;
	};
	milling_head?: string;
	rotation_angle?: string;
	swing_over_bed_mm?: number;
	max_turning_diameter_mm?: number;
	control?: string;
	filters?: string[];
	stroke_xyz_mm?: string | number[]; // For JTEKT - ADD THIS
	spindle_speed_min_1?: string | number[]; // For JTEKT - ADD THIS

	// GROB-specific properties
	travel_mm?: {
		x: number;
		y: number;
		z: number;
	};
	interference_diameter?: number;
	spindle?: {
		rotation_speed_rpm?: string | number;
		power_kw?: string;
		torque_nm?: string;
	};
	spindle_taper?: {
		[key: string]: string;
	};
}

interface ManufacturerData {
	id: string;
	machines?: Machine[];
	products?: Machine[];
}

interface MachiningData {
	ken?: {
		id: string;
		machines: Machine[];
	};
	horizontal?: {
		id: string;
		machines: Machine[];
		jtekt?: {
			id: string;
			machines: Machine[];
		};
		grob?: {
			id: string;
			machines: Machine[];
		};
		alzmetall?: {
			id: string;
			machines: Machine[];
		};
	};
	vertical?: {
		id: string;
		products: Machine[];
	};
	"5-axis"?: {
		id: string;
		machines: Machine[];
	};
}

// Type assertion for the imported data - using your exact structure
const machiningDataTyped = machiningData as unknown as MachiningData;

// 5-axis filter categories
const fiveAxisFilters = [
	{ id: "all", name: "All 5-Axis" },
	{ id: "simultaneous", name: "Simultaneous" },
	{ id: "gantry", name: "Gantry" },
	{ id: "double_column", name: "Double Column" },
	{ id: "millturn", name: "MillTurn" },
];

// Machine classification function - FIXED to use the filters array from the data
const classify5AxisMachine = (machine: Machine): string[] => {
	// If the machine has a filters array, use it directly
	if (machine.filters && Array.isArray(machine.filters)) {
		return machine.filters;
	}

	// Fallback to the original classification logic
	const categories: string[] = [];
	const model = machine.model.toLowerCase();
	const description = machine.description.toLowerCase();
	const type = machine.type?.toLowerCase() || "";

	// Simultaneous classification
	if (
		type.includes("simultaneous") ||
		description.includes("simultaneous") ||
		model.includes("g") ||
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
		model.includes("saber")
	) {
		categories.push("double_column");
	}

	// MillTurn classification
	if (
		type.includes("millturn") ||
		description.includes("millturn") ||
		description.includes("multitasking") ||
		(model.includes("m") &&
			!isNaN(parseInt(model.replace("m", "").replace("-g", "")))) ||
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

// FIXED: Improved helper function to get manufacturer for a machine
const getManufacturer = (machine: Machine): string => {
	const model = machine.model;
	const modelLower = model.toLowerCase();
	const descriptionLower = machine.description?.toLowerCase() || "";

	// Check GROB machines in 5-axis section FIRST
	if (
		machiningDataTyped["5-axis"]?.machines?.some(
			(m) => m.model === model && m.series?.includes("G-Series")
		)
	)
		return "grob";

	// Check GROB machines in horizontal section
	if (
		machiningDataTyped.horizontal?.grob?.machines?.some(
			(m) => m.model === model
		)
	)
		return "grob";

	// Check for GROB by model pattern (G-series models)
	if (modelLower.startsWith("g") && !modelLower.includes("gantry")) {
		return "grob";
	}

	// Check Alzmetall machines (nested under horizontal)
	if (
		machiningDataTyped.horizontal?.alzmetall?.machines?.some(
			(m) => m.model === model
		)
	)
		return "alzmetall";

	// Check JTEKT machines
	if (
		machiningDataTyped.horizontal?.jtekt?.machines?.some(
			(m) => m.model === model
		)
	)
		return "jtekt";

	// Also check if JTEKT data is at the root level
	if (
		(machiningDataTyped as any).jtekt?.horizontal?.machines?.some(
			(m: Machine) => m.model === model
		)
	)
		return "jtekt";

	// Check for JTEKT model patterns
	if (modelLower.startsWith("fh") || modelLower.startsWith("th")) {
		return "jtekt";
	}

	// Check KEN machines
	if (machiningDataTyped.ken?.machines?.some((m) => m.model === model))
		return "ken";

	// Check Hwacheon horizontal machines
	if (machiningDataTyped.horizontal?.machines?.some((m) => m.model === model))
		return "hwacheon";

	// Check Hwacheon vertical machines
	if (machiningDataTyped.vertical?.products?.some((m) => m.model === model))
		return "hwacheon";

	// Check 5-axis machines - identify GROB by G-series pattern
	if (machiningDataTyped["5-axis"]?.machines?.some((m) => m.model === model)) {
		// If it's a G-series machine in 5-axis, it's GROB
		if (modelLower.startsWith("g")) {
			return "grob";
		}
		return "ken";
	}

	// Fallback: Check for manufacturer-specific patterns in model or description
	// Check GROB patterns first in fallback
	if (modelLower.includes("grob") || descriptionLower.includes("grob"))
		return "grob";

	if (modelLower.includes("jtekt") || descriptionLower.includes("jtekt"))
		return "jtekt";
	if (
		modelLower.includes("alzmetall") ||
		descriptionLower.includes("alzmetall")
	)
		return "alzmetall";
	if (modelLower.includes("ken") || descriptionLower.includes("ken"))
		return "ken";
	if (modelLower.includes("hwacheon") || descriptionLower.includes("hwacheon"))
		return "hwacheon";

	return "other";
};
// Helper function to format array or string values
const formatArrayOrString = (value: any): string => {
	if (!value) return "N/A";
	if (Array.isArray(value)) return value.join(" / ");
	if (typeof value === "string") return value;
	return String(value);
};

// Helper function to format travel specifications
const formatTravelValue = (value: any): string => {
	if (!value) return "N/A";
	if (Array.isArray(value)) return value.join(" / ") + " mm";
	if (typeof value === "number") return `${value} mm`;
	return value;
};

export default function ProductDetailPage() {
	const params = useParams();
	const productId = params.id as string;
	const router = useRouter();

	// Determine category based on route
	const isTurningCenter = productId === "turning-centers";
	const isMachiningCenter = productId === "machining-center";

	// Sub-categories
	const subCategories = isMachiningCenter
		? [
				{ id: "vertical", name: "Vertical" },

				{ id: "horizontal", name: "Horizontal" },
				{ id: "5-axis", name: "5-Axis" },
		  ]
		: [
				{ id: "horizontal_turning", name: "Horizontal Turning" },
				{ id: "vertical_turning", name: "Vertical Turning" },
		  ];

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

	// Get products based on selected subcategory using your exact JSON structure
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

		if (selectedSubCategory === "horizontal") {
			// Get horizontal machines from all sources
			const kenHorizontal =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type?.includes("Horizontal") ||
						machine.description?.includes("Horizontal")
				) || [];

			// FIX: Access the nested structure correctly
			const hwacheonHorizontal = machiningDataTyped.horizontal?.machines || [];

			const grobHorizontal =
				machiningDataTyped.horizontal?.grob?.machines || [];

			const alzmetallHorizontal =
				machiningDataTyped.horizontal?.alzmetall?.machines || [];

			// FIXED: Properly access JTEKT horizontal machines
			const jtektHorizontal =
				machiningDataTyped.horizontal?.jtekt?.machines || [];

			// Also check if JTEKT data is at the root level
			const jtektRootHorizontal =
				(machiningDataTyped as any).jtekt?.horizontal?.machines || [];

			products = [
				...kenHorizontal,
				...hwacheonHorizontal,
				...grobHorizontal,
				...alzmetallHorizontal,
				...jtektHorizontal,
				...jtektRootHorizontal,
			];
		} else if (selectedSubCategory === "vertical") {
			// Get vertical machines from all sources
			const kenVertical =
				machiningDataTyped.ken?.machines?.filter(
					(machine) =>
						machine.type?.includes("Vertical") ||
						machine.description?.includes("Vertical")
				) || [];

			const hwacheonVertical = machiningDataTyped.vertical?.products || [];

			const grobVertical =
				machiningDataTyped.horizontal?.grob?.machines?.filter(
					(machine) =>
						machine.type?.includes("Vertical") ||
						machine.description?.includes("Vertical")
				) || [];

			const alzmetallVertical =
				machiningDataTyped.horizontal?.alzmetall?.machines?.filter(
					(machine) =>
						machine.type?.includes("Vertical") ||
						machine.description?.includes("Vertical")
				) || [];

			// Add JTEKT vertical if available
			const jtektVertical =
				machiningDataTyped.horizontal?.jtekt?.machines?.filter(
					(machine) =>
						machine.type?.includes("Vertical") ||
						machine.description?.includes("Vertical")
				) || [];

			products = [
				...kenVertical,
				...hwacheonVertical,
				...grobVertical,
				...alzmetallVertical,
				...jtektVertical,
			];
		} else if (selectedSubCategory === "5-axis") {
			// Get 5-axis machines from all sources
			const ken5Axis =
				machiningDataTyped.ken?.machines?.filter(
					(m) => m.type?.includes("5-Axis") || m.description?.includes("5-Axis")
				) || [];

			const hwacheon5Axis = machiningDataTyped["5-axis"]?.machines || [];

			const grob5Axis =
				machiningDataTyped.horizontal?.grob?.machines?.filter(
					(m) => m.type?.includes("5-Axis") || m.description?.includes("5-Axis")
				) || [];

			const alzmetall5Axis =
				machiningDataTyped.horizontal?.alzmetall?.machines?.filter(
					(machine) =>
						machine.type?.includes("5-Axis") ||
						machine.description?.includes("5-Axis")
				) || [];

			// Add JTEKT 5-axis if available
			const jtekt5Axis =
				machiningDataTyped.horizontal?.jtekt?.machines?.filter(
					(m) => m.type?.includes("5-Axis") || m.description?.includes("5-Axis")
				) || [];

			products = [
				...ken5Axis,
				...hwacheon5Axis,
				...grob5Axis,
				...alzmetall5Axis,
				...jtekt5Axis,
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

	// Enhanced specs function that works with your exact JSON structure
	function getSpecs(product: Machine): { name: string; value: string }[] {
		const baseSpecs: { name: string; value: string }[] = [];

		// Check manufacturer type
		const manufacturer = getManufacturer(product);

		const ensureString = (value: any): string => {
			if (value === null || value === undefined) return "";
			if (typeof value === "string") return value;
			if (typeof value === "number") return value.toString();
			if (Array.isArray(value)) return value.join(" / ");
			return String(value);
		};

		if (isTurningCenter) {
			// Max Turning Diameter
			if (product.max_turning_diameter_mm) {
				baseSpecs.push({
					name: "Max Cutting Diameter",
					value: ensureString(product.max_turning_diameter_mm) + " mm",
				});
			}

			// Max Bar Size (mainly for horizontal turning)
			if (product.max_bar_size_mm) {
				baseSpecs.push({
					name: "Max Bar Size",
					value: ensureString(product.max_bar_size_mm) + " mm",
				});
			}

			// Max Cutting Length - use max_cutting_length_mm for vertical, max_turning_length_mm for horizontal
			if (
				selectedSubCategory === "vertical_turning" &&
				product.max_cutting_length_mm
			) {
				baseSpecs.push({
					name: "Max Cutting Length",
					value: ensureString(product.max_cutting_length_mm) + " mm",
				});
			} else if (product.max_turning_length_mm) {
				baseSpecs.push({
					name: "Max Cutting Length",
					value: ensureString(product.max_turning_length_mm) + " mm",
				});
			}

			// Spindle Motor Power
			if (product.spindle_motor_kw) {
				baseSpecs.push({
					name: "Spindle Motor",
					value: ensureString(product.spindle_motor_kw) + " kW",
				});
			}

			// Tool Type (for both horizontal and vertical)
			if (product.tool_type) {
				baseSpecs.push({
					name: "Type",
					value: product.tool_type.replace(/_/g, "  ").toUpperCase(),
				});
			}

			// Swing Over Bed (if available)
			if (product.swing_over_bed_mm) {
				baseSpecs.push({
					name: "Swing Over Bed",
					value: ensureString(product.swing_over_bed_mm) + " mm",
				});
			}

			// Control System (if available)
			if (product.control) {
				baseSpecs.push({
					name: "Control System",
					value: product.control,
				});
			}

			return baseSpecs;
		}

		// JTEKT machines
		if (manufacturer === "jtekt") {
			console.log("Processing as JTEKT machine:", product.model);

			// Pallet size
			if (product.pallet_size) {
				baseSpecs.push({
					name: "Pallet Size",
					value: ensureString(product.pallet_size),
				});
			}

			// Stroke/Working travel
			if (product.stroke_xyz_mm) {
				baseSpecs.push({
					name: "Working Travel",
					value: ensureString(product.stroke_xyz_mm),
				});
			}

			// Spindle speed
			if (product.spindle_speed_min_1) {
				baseSpecs.push({
					name: "Spindle Speed",
					value: ensureString(product.spindle_speed_min_1) + " rpm",
				});
			}

			// Add description if available

			if (product.min_indexing_angle) {
				baseSpecs.push({
					name: "Min Indexing Angle",
					value: product.min_indexing_angle,
				});
			}

			if (product.table_load) {
				baseSpecs.push({
					name: "Table Load",
					value: ensureString(product.table_load),
				});
			}

			if (product.feedrate) {
				baseSpecs.push({
					name: "Feedrate",
					value: product.feedrate + " m/min",
				});
			}
			if (product.number_of_tools) {
				baseSpecs.push({
					name: "Number of Tools",
					value: ensureString(product.number_of_tools),
				});
			}
			console.log("Final specs for JTEKT:", baseSpecs);
			return baseSpecs;
		}

		// KEN machines - use detailed specs (this includes 5-axis machines)
		if (
			(manufacturer === "ken" || manufacturer === "hwacheon") &&
			product.specs
		) {
			const specs = product.specs;

			// Travel specifications
			if (specs.travel_mm) {
				const travel = specs.travel_mm;
				baseSpecs.push(
					{ name: "Travel X", value: formatTravelValue(travel.x) },
					{ name: "Travel Y", value: formatTravelValue(travel.y) },
					{ name: "Travel Z", value: formatTravelValue(travel.z) }
				);
			}

			// Table specifications
			if (specs.table_mm) {
				const table = specs.table_mm;
				baseSpecs.push({
					name: "Table Size",
					value: `${ensureString(table.x)} x ${ensureString(table.y)} mm`,
				});
			}

			// Feedrate specifications
			if (specs.feedrate_m_per_min) {
				const feed = specs.feedrate_m_per_min;
				baseSpecs.push({
					name: "Feedrate",
					value: `X:${feed.x} / Y:${feed.y} / Z:${feed.z} m/min`,
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
						value: `${spindle.rotation_speed_rpm?.toLocaleString()} rpm`,
					});
				}
				if (spindle.power_kw) {
					baseSpecs.push({
						name: "Spindle Power",
						value: ensureString(spindle.power_kw) + " kW",
					});
				}
				if (spindle.torque_nm) {
					baseSpecs.push({
						name: "Spindle Torque",
						value: ensureString(spindle.torque_nm) + " Nm",
					});
				}
			}

			// Additional specifications
			if (specs.table_load_kg) {
				baseSpecs.push({
					name: "Table Load",
					value: ensureString(specs.table_load_kg) + " kg",
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

			// Add series if available
			if (product.series) {
				baseSpecs.push({ name: "Series", value: product.series });
			}

			// Add type
			if (product.type) {
				baseSpecs.push({ name: "Type", value: product.type });
			}

			return baseSpecs;
		}

		// GROB machines
		if (manufacturer === "grob") {
			if (product.specs) {
				const specs = product.specs;

				// Working Travel
				if (specs.travel_mm) {
					baseSpecs.push({
						name: "Working Travel",
						value: `${specs.travel_mm.x} |${specs.travel_mm.y} | ${specs.travel_mm.z} mm`,
					});
				}

				// Rapid Traverse
				if (specs.feedrate_m_per_min) {
					baseSpecs.push({
						name: "Rapid Traverse",
						value: `${specs.feedrate_m_per_min.x} | ${specs.feedrate_m_per_min.y} | ${specs.feedrate_m_per_min.z} m/min`,
					});
				}

				// Interference Diameter
				if (specs.interference_diameter !== undefined) {
					baseSpecs.push({
						name: "Interference Diameter",
						value: ensureString(specs.interference_diameter) + " mm",
					});
				}

				// Table Diameter
				if (specs.table_diameter !== undefined) {
					baseSpecs.push({
						name: "Table Diameter",
						value: ensureString(specs.table_diameter) + " mm",
					});
				}

				// Table Load
				if (specs.table_load !== undefined) {
					baseSpecs.push({
						name: "Table Load",
						value: ensureString(specs.table_load) + " kg",
					});
				}

				// Spindle Specs
				if (specs.spindle) {
					if (specs.spindle.rotation_speed_rpm !== undefined) {
						baseSpecs.push({
							name: "Spindle Speed",
							value: ensureString(specs.spindle.rotation_speed_rpm) + " rpm",
						});
					}
					if (specs.spindle.power_kw !== undefined) {
						baseSpecs.push({
							name: "Spindle Power",
							value: ensureString(specs.spindle.power_kw) + " kW",
						});
					}
					if (specs.spindle.torque_nm !== undefined) {
						baseSpecs.push({
							name: "Spindle Torque",
							value: ensureString(specs.spindle.torque_nm) + " Nm",
						});
					}
				}

				// Spindle Taper (supports array or object)
				if (specs.spindle_taper) {
					let taperValue = "";

					if (Array.isArray(specs.spindle_taper)) {
						taperValue = specs.spindle_taper.join(" / ");
					} else if (typeof specs.spindle_taper === "object") {
						taperValue = Object.keys(specs.spindle_taper).join(" / ");
					}

					if (taperValue.trim() !== "") {
						baseSpecs.push({
							name: "Spindle Taper",
							value: taperValue,
						});
					}
				}
			}

			if (product.brand) {
				baseSpecs.push({ name: "Brand", value: product.brand });
			}

			return baseSpecs;
		}

		// Alzmetall machines
		if (manufacturer === "alzmetall" && product.specs) {
			const specs = product.specs;

			if (specs.travel_mm) {
				const travel = specs.travel_mm;
				baseSpecs.push(
					{ name: "Travel X", value: formatTravelValue(travel.x) },
					{ name: "Travel Y", value: formatTravelValue(travel.y) },
					{ name: "Travel Z", value: formatTravelValue(travel.z) }
				);
			}

			if (specs.cutting_tool_interface) {
				baseSpecs.push({
					name: "Tool Interface",
					value: specs.cutting_tool_interface,
				});
			}

			if (specs.max_tool_positions) {
				baseSpecs.push({
					name: "Max Tool Positions",
					value: ensureString(specs.max_tool_positions),
				});
			}

			if (specs.workpiece_capacity_kg) {
				baseSpecs.push({
					name: "Workpiece Capacity",
					value: ensureString(specs.workpiece_capacity_kg) + " kg",
				});
			}

			return baseSpecs;
		}

		// Hwacheon and other machines - use common properties
		if (product.stroke_mm) {
			baseSpecs.push({
				name: "Stroke",
				value: ensureString(product.stroke_mm),
			});
		}

		if (product.spindle_speed_rpm) {
			baseSpecs.push({
				name: "Spindle Speed",
				value: ensureString(product.spindle_speed_rpm),
			});
		}

		if (product.number_of_tools) {
			baseSpecs.push({
				name: "Number of Tools",
				value: ensureString(product.number_of_tools),
			});
		}

		if (product.type) {
			baseSpecs.push({ name: "Type", value: product.type });
		}

		// For horizontal machines with pallet size
		if (selectedSubCategory === "horizontal" && product.pallet_size_mm) {
			baseSpecs.push({
				name: "Pallet Size",
				value: ensureString(product.pallet_size_mm),
			});
		}

		// For 5-axis machines with table size
		if (selectedSubCategory === "5-axis" && product.table_size_mm) {
			baseSpecs.push({ name: "Table Size", value: product.table_size_mm });
		}

		// Add series if available
		if (product.series) {
			baseSpecs.push({ name: "Series", value: product.series });
		}

		return baseSpecs;
	}

	// Get subcategory title
	const getSubCategoryTitle = () => {
		const subCats = isMachiningCenter
			? [
					{ id: "vertical", name: "Vertical Machining Center" },
					{ id: "horizontal", name: "Horizontal Machining Center" },
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
				</div>
			</section>

			{/* SUBCATEGORY BUTTONS */}
			<section className="py-4 bg-white border-b border-gray-200">
				<div className="w-full mx-auto px-6 flex flex-col items-center justify-center">
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
										? "bg-black text-white"
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
											? "bg-black text-white"
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
								className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between min-h-[450px]">
								<div className="p-5">
									<div className="flex gap-4 items-center">
										<h3 className="text-xl font-bold text-black-700">
											{item.model}
										</h3>
										{/* {selectedSubCategory === "5-axis" && (
											<div className="flex flex-wrap gap-1">
												{classify5AxisMachine(item).map((category, idx) => (
													<span
														key={idx}
														className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
														{
															fiveAxisFilters.find((f) => f.id === category)
																?.name
														}
													</span>
												))}
											</div>
										)} */}
									</div>
									<p className="text-gray-600 text-md">{item.description}</p>
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
										className="h-32 object-contain mix-blend-multiply"
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
