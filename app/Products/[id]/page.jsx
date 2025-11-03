"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// ✅ Fully Linked Product Dataset (6 Products)
const products = [
	// 🟥 HWACHEON – Turning Center
	{
		id: "hwaheon-turning-center",
		brand: "HwaCheon",
		name: "Turning Center Hi-TECH 230",
		category: "Machine Tools",
		subtitle: "High precision 2-axis CNC turning solution",
		heroImage:
			"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80",
		gallery: [
			"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
			"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
			"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
		],
		quickSpecs: [
			{ name: "Chuck Size", value: "10 inch" },
			{ name: "Max Turning Diameter", value: "400 mm" },
			{ name: "Spindle Speed", value: "4,000 rpm" },
			{ name: "Power", value: "18.5 kW" },
		],
		description: `
      The HwaCheon Hi-TECH 230 Turning Center offers superior precision and performance 
      for medium-to-heavy duty turning applications. Designed with a rigid bed structure, 
      it ensures consistent accuracy even under heavy load conditions.
    `,
		applications: `
      Ideal for automotive components, machine parts, and aerospace fittings. 
      Perfect for high-volume precision manufacturing environments.
    `,
		specs: [
			{ name: "Max Swing", value: "Ø550 mm" },
			{ name: "Max Cutting Length", value: "600 mm" },
			{ name: "Spindle Nose", value: "A2-8" },
			{ name: "Tool Capacity", value: "12 stations" },
			{ name: "Control", value: "Fanuc Oi-TF Plus" },
		],
		related: [
			{
				id: "hwaheon-vesta-1050b",
				name: "VESTA-1050B",
				image:
					"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
				subtitle: "Vertical Machining Center",
			},
			{
				id: "ken-ichi-5axis",
				name: "KEN ICHI 5-Axis",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-hero.jpg",
				subtitle: "High-Speed 5-Axis Center",
			},
			{
				id: "gerardi-evolution-line",
				name: "Gerardi Evolution Line",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-evolution.jpg",
				subtitle: "Angle Head System",
			},
			{
				id: "wenzel-lh-108",
				name: "WENZEL LH 108",
				image:
					"https://img.freepik.com/free-photo/high-precision-industry-machine_1098-19323.jpg",
				subtitle: "Bridge-style CMM",
			},
		],
	},

	// 🟧 HWACHEON – VMC
	{
		id: "hwaheon-vesta-1050b",
		brand: "HwaCheon",
		name: "VESTA-1050B Vertical Machining Center",
		category: "Machine Tools",
		subtitle: "Heavy-duty vertical machining center with box-way design",
		heroImage:
			"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80",
		gallery: [
			"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
			"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
			"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
		],
		quickSpecs: [
			{ name: "Travel (X/Y/Z)", value: "1,050 / 600 / 600 mm" },
			{ name: "Spindle Speed", value: "8,000 rpm / 6,000 rpm" },
			{ name: "Tool Magazine", value: "24 / 30 tools" },
			{ name: "Design", value: "Box way all axes" },
		],
		description: `
      The VESTA-1050B offers exceptional rigidity and accuracy for heavy vertical milling 
      operations, with gear-driven high torque spindles and box guideways in all axes.
    `,
		applications: `
      Suitable for mold & die work, heavy parts machining, and precision structural components.
    `,
		specs: [
			{ name: "Spindle Type", value: "Gear-driven high-torque" },
			{ name: "Control", value: "Fanuc / Siemens (optional)" },
		],
		related: [
			{
				id: "hwaheon-turning-center",
				name: "Hi-TECH 230",
				image:
					"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
				subtitle: "Turning Center",
			},
			{
				id: "grob-g550",
				name: "GROB G550",
				image:
					"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
				subtitle: "5-Axis Machining Center",
			},
			{
				id: "ken-ichi-5axis",
				name: "KEN ICHI 5-Axis",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-hero.jpg",
				subtitle: "High-Speed 5-Axis",
			},
		],
	},

	// 🟩 KEN ICHI
	{
		id: "ken-ichi-5axis",
		brand: "KEN ICHI",
		name: "High-Speed 5-Axis Machining Center",
		category: "Machine Tools",
		subtitle: "Precision 5-Axis CNC Machining for Aerospace & Automotive",
		heroImage:
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-hero.jpg",
		gallery: [
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-1.jpg",
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-2.jpg",
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-3.jpg",
		],
		quickSpecs: [
			{ name: "Spindle Speed", value: "24,000 rpm" },
			{ name: "Power", value: "42 / 55 kW" },
			{ name: "Torque", value: "87 Nm" },
			{ name: "Feedrate", value: "60 m/min (X/Y), 48 m/min (Z)" },
		],
		description: `
      The KEN ICHI 5-Axis Center offers unmatched precision and stiffness, combining torque-motor direct drives with linear X/Y axes for top-tier performance.
    `,
		applications: `
      Perfect for aerospace engine housings, structural parts, and automotive precision molds.
    `,
		specs: [
			{ name: "Travel (X/Y/Z)", value: "4060 / 2300 / 800 mm" },
			{ name: "Spindle Taper", value: "HSK-A63" },
			{ name: "Table Load", value: "4000 kg" },
		],
		related: [
			{
				id: "grob-g550",
				name: "GROB G550",
				image:
					"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
				subtitle: "5-Axis Universal",
			},
			{
				id: "hwaheon-vesta-1050b",
				name: "VESTA-1050B",
				image:
					"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
				subtitle: "Vertical Machining Center",
			},
			{
				id: "gerardi-evolution-line",
				name: "Gerardi Evolution Line",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-evolution.jpg",
				subtitle: "Angle Head System",
			},
		],
	},

	// 🟦 GERARDI
	{
		id: "gerardi-evolution-line",
		brand: "Gerardi",
		name: "Evolution Line – Modular Angle Heads",
		category: "Tooling Systems",
		subtitle: "Modular, High-Speed Angle Heads with Interchangeable Shanks",
		heroImage:
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-evolution.jpg",
		gallery: [
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-1.jpg",
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-2.jpg",
			"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-3.jpg",
		],
		quickSpecs: [
			{ name: "Max Speed", value: "10,000 rpm" },
			{ name: "Coolant Pressure", value: "Up to 70 Bar" },
			{ name: "Bearings", value: "ABEC 9 Precision" },
		],
		description: `
      The Gerardi Evolution Line provides precise, modular angle heads optimized for high-speed drilling, milling, and tapping applications.
    `,
		applications: `
      Perfect for 5-axis and horizontal machining centers in aerospace and mold & die work.
    `,
		specs: [
			{ name: "Material", value: "Treated Steel / Aluminum" },
			{ name: "Tool Change", value: "ATC / MTC" },
		],
		related: [
			{
				id: "ken-ichi-5axis",
				name: "KEN ICHI 5-Axis",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-hero.jpg",
				subtitle: "High-Speed 5-Axis",
			},
			{
				id: "hwaheon-turning-center",
				name: "Hi-TECH 230",
				image:
					"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
				subtitle: "Turning Center",
			},
			{
				id: "wenzel-lh-108",
				name: "WENZEL LH 108",
				image:
					"https://img.freepik.com/free-photo/high-precision-industry-machine_1098-19323.jpg",
				subtitle: "Measuring Machine",
			},
		],
	},

	// 🟪 GROB
	{
		id: "grob-g550",
		brand: "GROB",
		name: "GROB G550",
		category: "Machine Tools",
		subtitle: "5-Axis Universal Machining Center",
		heroImage:
			"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&q=80",
		gallery: [
			"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
			"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
			"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
		],
		quickSpecs: [
			{ name: "Travel (X/Y/Z)", value: "800 / 1,020 / 970 mm" },
			{ name: "Spindle Speed", value: "12,000 rpm" },
			{ name: "Table Size (Ø)", value: "770 mm" },
			{ name: "Table Load", value: "800 kg" },
		],
		description: `
      The GROB G550 is a high-performance 5-axis universal machining center with a unique horizontal spindle and strong torque dynamics.
    `,
		applications: `
      Suitable for aerospace, die & mold, and precision component manufacturing.
    `,
		specs: [
			{ name: "A-axis Range", value: "230°" },
			{ name: "B/C Rotation", value: "360°" },
		],
		related: [
			{
				id: "ken-ichi-5axis",
				name: "KEN ICHI 5-Axis",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/ken-ichi-hero.jpg",
				subtitle: "High-Speed 5-Axis",
			},
			{
				id: "hwaheon-vesta-1050b",
				name: "VESTA-1050B",
				image:
					"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
				subtitle: "Vertical Machining Center",
			},
			{
				id: "wenzel-lh-108",
				name: "WENZEL LH 108",
				image:
					"https://img.freepik.com/free-photo/high-precision-industry-machine_1098-19323.jpg",
				subtitle: "CMM Bridge",
			},
		],
	},

	// 🟫 WENZEL
	{
		id: "wenzel-lh-108",
		brand: "WENZEL",
		name: "WENZEL LH 108",
		category: "Measuring Machines",
		subtitle: "Bridge-style Air-Bearing Coordinate Measuring Machine",
		heroImage:
			"https://img.freepik.com/free-photo/high-precision-industry-machine_1098-19323.jpg",
		gallery: [
			"https://img.freepik.com/free-photo/modern-industrial-lab-equipment_1098-19544.jpg",
			"https://img.freepik.com/free-photo/robotic-arm-inspection-device_1098-19782.jpg",
			"https://img.freepik.com/free-photo/precision-3d-measuring-equipment_1098-19834.jpg",
		],
		quickSpecs: [
			{ name: "Volume", value: "1000 × 1200/1600/3000 × 800 mm" },
			{ name: "Accuracy", value: "1.3 + L/400 µm" },
			{ name: "Guide", value: "Air-bearing" },
		],
		description: `
      The WENZEL LH 108 provides exceptional measuring precision with modular design and long-term stability.
    `,
		applications: `
      Ideal for metrology labs, aerospace, and production quality control.
    `,
		specs: [
			{ name: "Structure", value: "Granite base, air-bearing axes" },
			{ name: "Sensors", value: "Scanning / Touch / Optical" },
		],
		related: [
			{
				id: "grob-g550",
				name: "GROB G550",
				image:
					"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
				subtitle: "5-Axis Machining",
			},
			{
				id: "gerardi-evolution-line",
				name: "Gerardi Evolution Line",
				image:
					"https://res.cloudinary.com/domgx4mk9/image/upload/v1731023331/gerardi-evolution.jpg",
				subtitle: "Angle Head System",
			},
			{
				id: "hwaheon-turning-center",
				name: "Hi-TECH 230",
				image:
					"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
				subtitle: "Turning Center",
			},
		],
	},
];

export default function ProductDetailPage() {
	const params = useParams();
	const product = products.find((p) => p.id === params.id) || products[0];
	const [tab, setTab] = useState("specs");
	const [mainImage, setMainImage] = useState(product.heroImage);

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div
					className="absolute inset-0 opacity-30 bg-cover bg-center"
					style={{ backgroundImage: `url(${product.heroImage})` }}></div>
				<div className="max-w-7xl mx-auto relative z-10">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						{product.brand}{" "}
						<span className="text-gray-400">{product.name}</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl">{product.subtitle}</p>
				</div>
			</section>

			{/* Product Content */}
			<section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
				{/* Left: Image Gallery */}
				<div>
					<img
						src={mainImage}
						alt={product.name}
						className="w-full h-[400px] object-cover rounded-xl border border-gray-200"
					/>
					<div className="flex gap-3 mt-4">
						{product.gallery.map((img, idx) => (
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

				{/* Right: Product Details */}
				<div className="flex flex-col justify-between">
					<div>
						<h2 className="text-3xl font-bold mb-4">{product.name}</h2>
						<p className="text-gray-600 mb-6">{product.description}</p>

						<div className="bg-gray-50 rounded-lg p-6 mb-6">
							<h4 className="font-semibold mb-3 text-black">Quick Specs</h4>
							<ul className="space-y-2">
								{product.quickSpecs.map((spec, i) => (
									<li
										key={i}
										className="flex justify-between text-sm border-b last:border-none pb-1">
										<span className="text-gray-700">{spec.name}</span>
										<span className="font-medium">{spec.value}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition">
						Request a Quote
					</button>
				</div>
			</section>

			{/* Tabs Section */}
			<section className="max-w-7xl mx-auto px-6 mt-10">
				<div className="bg-white rounded-lg shadow">
					<div className="flex border-b">
						{["specs", "applications", "description"].map((key) => (
							<button
								key={key}
								onClick={() => setTab(key)}
								className={`px-6 py-3 text-sm font-medium transition ${
									tab === key
										? "border-b-2 border-black text-black"
										: "text-gray-500"
								}`}>
								{key.charAt(0).toUpperCase() + key.slice(1)}
							</button>
						))}
					</div>

					<div className="p-6 min-h-[200px]">
						{tab === "specs" && (
							<div className="grid grid-cols-2 gap-4">
								{product.specs.map((spec, i) => (
									<div key={i} className="flex justify-between">
										<span className="text-gray-600">{spec.name}</span>
										<span className="font-medium">{spec.value}</span>
									</div>
								))}
							</div>
						)}

						{tab === "applications" && (
							<p className="text-gray-700 leading-relaxed">
								{product.applications}
							</p>
						)}

						{tab === "description" && (
							<p className="text-gray-700 leading-relaxed">
								{product.description}
							</p>
						)}
					</div>
				</div>
			</section>

			{/* Related Products */}
			<section className="max-w-7xl mx-auto px-6 mt-20 mb-16">
				<h3 className="text-3xl font-semibold mb-8">Related Products</h3>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
					{product.related.map((rp) => (
						<div
							key={rp.id}
							className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden h-full">
							<img
								src={rp.image}
								alt={rp.name}
								className="w-full h-40 object-cover"
							/>
							<div className="flex flex-col p-5 flex-grow">
								<h4 className="text-lg font-semibold mb-2">{rp.name}</h4>
								<p className="text-gray-600 text-sm flex-grow">{rp.subtitle}</p>
								<Link
									href={`/products/${rp.id}`}
									className="mt-auto text-black flex items-center gap-1 font-medium hover:underline">
									Learn More <ChevronRight className="w-4 h-4" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
