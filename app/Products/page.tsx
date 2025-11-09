"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");

	useEffect(() => {
		if (window.location.hash) {
			const hash = window.location.hash.substring(1);
			setTimeout(() => {
				const element = document.getElementById(hash);
				if (element) {
					const headerOffset = 128;
					const elementPosition = element.getBoundingClientRect().top;
					const offsetPosition =
						elementPosition + window.pageYOffset - headerOffset;
					window.scrollTo({ top: offsetPosition, behavior: "smooth" });
				}
			}, 100);
		}
	}, []);

	const categories = [
		{ id: "all", name: "All Products" },
		{ id: "machine-tools", name: "Machine Tools" },
		{ id: "measuring", name: "Measuring Machines" },
		{ id: "angle-head", name: "Angle Head" },
		{ id: "tool-management", name: "Tool Holders & Management" },
	];

	const products = [
		{
			id: "turning-centers",
			name: "Turning Centers",
			category: "machine-tools",
			description:
				"Versatile machining centers providing superior speed, rigidity, and accuracy.",
			image: "/turn.jpg",
			features: [
				"2-axis CNC (HwaCheon)",
				"Turnmill Centers (HwaCheon)",
				"Twin Spindle – Single turret (with Magazine (opt.)) (HwaCheon)",
				"Twin Center – Twin Turret (HwaCheon)",
				"Multi-tasking machines (HwaCheon)",
				"Vertical Turning Lathes - Turret Type (HwaCheon)",
				"Vertical Turning Lathes - RAM type (HwaCheon)",
				"Vertical Turning Lathes - With Y-axis (HwaCheon)",
			],
		},
		{
			id: "machining-center",
			name: "Machining Centers",
			category: "machine-tools",
			description:
				"High performance vertical, horizontal, and 5-axis machining centers.",
			image: "/pp.jpg",
			features: [
				"Vertical Machining Centers (HwaCheon)",
				"Horizontal Machining Centers (HwaCheon, JTEKT)",
				"Drill-Tap Centers (HwaCheon)",
				"Twin-Spindle VMC (HwaCheon)",
				"Twin-Table (APC) VMC (HwaCheon)",
				"4-axis HMC (HwaCheon, JTEKT)",
				"5-axis HMC (JTEKT)",
				"Universal 5-axis Machines (GROB, Alzmetall, HwaCheon)",
				"5-axis Double Column (KEN CNC)",
				"5-axis Gantry (KEN CNC)",
				"5-axis MillTurn (GROB, Alzmetall)",
			],
		},
		{
			id: "grinding-machines",
			name: "Grinding Machines",
			category: "grinders",
			description:
				"High-precision grinding solutions including cylindrical, crankshaft, camshaft, roll, and eccentric pin grinders.",
			image: "/grinding.png",
			features: [
				"CNC Cylindrical Grinders (JTEKT)",
				"Crankshaft Grinders (JTEKT)",
				"Camshaft Grinders (JTEKT)",
				"Eccentric PIN Grinder (JTEKT)",
				"Roll Grinders (JTEKT)",
			],
		},
		{
			id: "measuring-machines",
			name: "Measuring Machines",
			category: "measuring",
			description:
				"High-precision metrology systems for dimensional verification, gear measurement, and tool inspection.",
			image: "/cmm.jpg",
			features: [
				"3D Coordinate Measuring Machine (Wenzel)",
				"Shop-floor Measuring Machine (Wenzel)",
				"Measuring Machine for Gears & Shafts (Wenzel)",
				"Mobile Measurement Solution (Wenzel)",
				"Vertical devices (Zoller)",
				"Horizontal devices (Zoller)",
				"Inspection solutions (Zoller)",
			],
		},

		{
			id: "angle-head",
			name: "Angle Head",
			category: "angle-head",
			description:
				"Precision angle heads for multi-axis machining with fixed and universal configurations.",
			image: "/ah.jpg",
			features: [
				"Fixed Type – 45° & 90° (Gerardi)",
				"Universal Type – 0° to 90° (Gerardi)",
				"Special (customised) (Gerardi)",
			],
		},
		{
			id: "tool-management",
			name: "Tool Holder & Tool Management",
			category: "tool-management",
			description:
				"Advanced tool holding and management systems designed for precision machining, durability, and efficient tool organization.",
			image: "/tool.jpg",
			features: [
				"Mechanical Holder (MST)",
				"ShrinkFit Holder (MST)",
				"ShrinkFit Machines (MST)",
				"Tool Management System (C-automate) (ZOLLER)",
			],
		},
	];

	const filtered =
		selectedCategory === "all"
			? products
			: products.filter((p) => p.category === selectedCategory);

	const stats = [
		{ number: "50+", label: "Customers" },
		{ number: "45+", label: "Years Combined Experience" },
		{ number: "98%", label: "Client Satisfaction" },
		{ number: "24/7", label: "Technical Support" },
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="/product123.jpg"
						alt="Hero background"
						className=" object-cover opacity-20"
						fill
					/>
				</div>

				<div className="max-w-7xl mx-auto relative z-10">
					<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
						Precision Engineering <br />
						<span className="text-gray-400">Made Simple</span>
					</h1>
					<p className="text-xl text-gray-300 max-w-3xl">
						Discover our comprehensive range of advanced machining solutions
						designed to elevate your manufacturing capabilities.
					</p>
				</div>
			</section>

			{/* Stats */}
			<section className="py-12 bg-gray-50 border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((s, i) => (
						<div key={i} className="text-center">
							<p className="text-4xl font-bold text-black mb-2">{s.number}</p>
							<p className="text-sm text-gray-600">{s.label}</p>
						</div>
					))}
				</div>
			</section>

			{/* Filter */}
			<section className="py-6 bg-white border-b border-gray-200  top-16 z-40">
				<div className="max-w-7xl mx-auto px-6 flex gap-3 overflow-x-auto">
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setSelectedCategory(cat.id)}
							className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all ${
								selectedCategory === cat.id
									? "bg-black text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}>
							{cat.name}
						</button>
					))}
				</div>
			</section>

			{/* Products Grid */}
			<section className="py-16 px-6 bg-white">
				<div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
					{filtered.map((p) => (
						<div
							key={p.id}
							className="flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden h-full">
							{/* Image */}
							<div className="h-56 overflow-hidden">
								<img
									src={p.image}
									alt={p.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
							</div>

							{/* Content */}
							<div className="flex flex-col flex-grow p-6">
								<h3 className="text-xl font-semibold text-black mb-2">
									{p.name}
								</h3>
								<p className="text-gray-600 text-sm mb-4 flex-grow">
									{p.description}
								</p>

								{/* Consistent button at bottom */}
								<Link
									href={
										p.category === "grinders"
											? `/Grinders/${p.id}`
											: p.category === "measuring"
											? `/Measuring/${p.id}`
											: p.category === "angle-head"
											? `/Angle/${p.id}`
											: `/Products/${p.id}`
									}
									className="mt-auto">
									<button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
										Learn More <ChevronRight className="w-4 h-4" />
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* CTA */}
			<section className="relative py-20 px-6 bg-black text-white overflow-hidden">
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Ready to Transform Your Manufacturing?
					</h2>
					<p className="text-xl text-gray-300 mb-8">
						Let our experts help you find the perfect solution for your
						precision machining needs.
					</p>
					<Link href="/Contact">
						<button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
							Request a Demo
						</button>
					</Link>
				</div>
			</section>
		</div>
	);
}
