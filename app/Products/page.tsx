"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Handle URL hash on page load
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

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth",
					});
				}
			}, 100);
		}
	}, []);

	const categories = [
		{ id: "all", name: "All Products" },
		{ id: "machine-tools", name: "Machine Tools" },
		{ id: "measuring", name: "Measuring Machines" },
		{ id: "angle-head", name: "Angle Head" },
		{ id: "tool-holders", name: "Tool Holders & Management" },
	];

	const machineTools = [
		{
			id: "vertical-machining-centers",
			name: "Vertical Machining Centers",
			description: "High-precision vertical machining for complex components",
			image:
				"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
			features: [
				"5-axis capability",
				"High-speed spindle",
				"Precision control",
			],
			category: "machine-tools",
		},
		{
			id: "horizontal-machining-centers",
			name: "Horizontal Machining Centers",
			description: "Superior machining efficiency for large workpieces",
			image:
				"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
			features: ["Pallet changer", "High rigidity", "Automated operation"],
			category: "machine-tools",
		},
		{
			id: "turning-center",
			name: "Turning Center",
			description: "Advanced turning solutions for precision manufacturing",
			image:
				"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
			features: ["Multi-tasking", "Live tooling", "Y-axis capability"],
			category: "machine-tools",
		},
		{
			id: "5-axis-machining-centers",
			name: "5-axis Machining Centers",
			description: "Ultimate flexibility for complex geometries",
			image:
				"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
			features: [
				"Simultaneous 5-axis",
				"Precision positioning",
				"Enhanced productivity",
			],
			category: "machine-tools",
		},
		{
			id: "vertical-turning-machines",
			name: "Vertical Turning Machines",
			description: "Efficient machining for large diameter workpieces",
			image:
				"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
			features: ["Large capacity", "Rigid construction", "High torque"],
			category: "machine-tools",
		},
		{
			id: "grinding-machines",
			name: "Grinding Machines",
			description: "Precision grinding for superior surface finish",
			image:
				"https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80",
			features: ["Sub-micron accuracy", "Automated cycles", "Advanced control"],
			category: "machine-tools",
		},
	];

	const measuringMachines = [
		{
			id: "cmm",
			name: "Co-ordinate Measuring Machines (CMM)",
			description: "Ultimate precision in dimensional measurement",
			image:
				"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
			features: [
				"Micron-level accuracy",
				"Automated inspection",
				"3D scanning",
			],
			category: "measuring",
		},
		{
			id: "tool-presetter",
			name: "Tool Presetter",
			description: "Fast and accurate tool measurement systems",
			image:
				"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
			features: ["Quick setup", "Digital readout", "Database integration"],
			category: "measuring",
		},
	];

	const angleHeads = [
		{
			id: "fixed-90-angle-head",
			name: "Fixed 90° Type",
			description: "Standard right-angle machining solution",
			image:
				"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
			features: ["Fixed 90° angle", "High rigidity", "Easy mounting"],
			category: "angle-head",
		},
		{
			id: "universal-angle-head",
			name: "Universal Type",
			description: "Adjustable angle head for versatile machining",
			image:
				"https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80",
			features: ["Multiple angles", "Precision adjustment", "Wide application"],
			category: "angle-head",
		},
		{
			id: "special-angle-head",
			name: "Special Type",
			description: "Custom angle heads for specific applications",
			image:
				"https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
			features: ["Custom design", "Application-specific", "High performance"],
			category: "angle-head",
		},
	];

	const toolHolders = [
		{
			id: "mechanical-tool-holders",
			name: "Mechanical Tool Holders",
			description: "Reliable mechanical clamping systems",
			image:
				"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
			features: ["Strong clamping force", "Easy operation", "Cost-effective"],
			category: "tool-holders",
		},
		{
			id: "shrink-fit",
			name: "Shrink Fit",
			description: "High-precision thermal clamping technology",
			image:
				"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
			features: ["Superior balance", "High precision", "Maximum rigidity"],
			category: "tool-holders",
		},
		{
			id: "tool-management-system",
			name: "Insert & Tool Management System",
			description: "Complete tool management solution",
			image:
				"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
			features: [
				"Inventory tracking",
				"Tool life monitoring",
				"RFID integration",
			],
			category: "tool-holders",
		},
		{
			id: "tool-management-software",
			name: "Tool Management Software",
			description: "Digital solution for tool optimization",
			image:
				"https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80",
			features: ["Real-time tracking", "Analytics", "Cloud-based"],
			category: "tool-holders",
		},
	];

	const allProducts = [
		...machineTools,
		...measuringMachines,
		...angleHeads,
		...toolHolders,
	];

	const filteredProducts =
		selectedCategory === "all"
			? allProducts
			: allProducts.filter((p) => p.category === selectedCategory);

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
				<div className="absolute inset-0 opacity-20">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"url(https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1600&q=80)",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}></div>
				</div>
				<div className="max-w-7xl mx-auto relative z-10">
					<div className="max-w-3xl">
						<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
							Precision Engineering
							<br />
							<span className="text-gray-400">Made Simple</span>
						</h1>
						<p className="text-xl text-gray-300 mb-8 leading-relaxed">
							Discover our comprehensive range of advanced machining solutions
							designed to elevate your manufacturing capabilities and precision
							standards.
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
			</section>

			{/* Stats Section */}
			<section className="py-12 bg-gray-50 border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div key={index} className="text-center">
								<div className="text-4xl font-bold text-black mb-2">
									{stat.number}
								</div>
								<div className="text-sm text-gray-600">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Category Filter */}
			<section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex gap-4 overflow-x-auto pb-2">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`px-6 py-3 rounded-full whitespace-nowrap transition ${
									selectedCategory === category.id
										? "bg-blue-700 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}>
								{category.name}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Machine Tools Section */}
			{(selectedCategory === "all" || selectedCategory === "machine-tools") && (
				<section className="py-16 px-6 bg-white" id="machine-tools">
					<div className="max-w-7xl mx-auto">
						<div className="mb-12">
							<h2 className="text-4xl font-bold text-black mb-4">
								Machine Tools
							</h2>
							<p className="text-blue-600/60 text-lg">
								Advanced machining centers for precision manufacturing
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{machineTools.map((product) => (
								<div
									key={product.id}
									id={product.id}
									className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 scroll-mt-32">
									<div className="relative h-64 overflow-hidden bg-gray-100">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale"
										/>
										<div className="absolute inset-0 from-black/60 to-transparent"></div>
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition">
											{product.name}
										</h3>
										<p className="text-gray-600 mb-4 text-sm">
											{product.description}
										</p>
										<div className="space-y-2 mb-4">
											{product.features.map((feature, idx) => (
												<div
													key={idx}
													className="flex items-center gap-2 text-sm text-gray-700">
													<Check className="w-4 h-4 text-black shrink-0" />
													<span>{feature}</span>
												</div>
											))}
										</div>
										<button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2 group-hover:gap-3">
											Learn More
											<ChevronRight className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Measuring Machines Section */}
			{(selectedCategory === "all" || selectedCategory === "measuring") && (
				<section className="py-16 px-6 bg-gray-50" id="measuring">
					<div className="max-w-7xl mx-auto">
						<div className="mb-12">
							<h2 className="text-4xl font-bold text-black mb-4">
								Measuring Machines
							</h2>
							<p className="text-blue-600/60 text-lg">
								Precision measurement for quality assurance
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-8">
							{measuringMachines.map((product) => (
								<div
									key={product.id}
									id={product.id}
									className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 scroll-mt-32">
									<div className="md:flex">
										<div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-gray-100">
											<img
												src={product.image}
												alt={product.name}
												className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale"
											/>
										</div>
										<div className="md:w-1/2 p-8">
											<h3 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition">
												{product.name}
											</h3>
											<p className="text-gray-600 mb-6">
												{product.description}
											</p>
											<div className="space-y-3 mb-6">
												{product.features.map((feature, idx) => (
													<div
														key={idx}
														className="flex items-center gap-2 text-gray-700">
														<Check className="w-5 h-5 text-black shrink-0" />
														<span>{feature}</span>
													</div>
												))}
											</div>
											<button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition flex items-center gap-2">
												View Details
												<ChevronRight className="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Angle Head Section */}
			{(selectedCategory === "all" || selectedCategory === "angle-head") && (
				<section className="py-16 px-6 bg-white" id="angle-head">
					<div className="max-w-7xl mx-auto">
						<div className="mb-12">
							<h2 className="text-4xl font-bold text-black mb-4">Angle Head</h2>
							<p className="text-blue-600/60 text-lg">
								Versatile angle heads for multi-axis machining
							</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							{angleHeads.map((product) => (
								<div
									key={product.id}
									id={product.id}
									className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 scroll-mt-32">
									<div className="relative h-56 overflow-hidden bg-gray-100">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale"
										/>
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition">
											{product.name}
										</h3>
										<p className="text-gray-600 mb-4 text-sm">
											{product.description}
										</p>
										<div className="space-y-2 mb-4">
											{product.features.map((feature, idx) => (
												<div
													key={idx}
													className="flex items-center gap-2 text-sm text-gray-700">
													<Check className="w-4 h-4 text-black shrink-0" />
													<span>{feature}</span>
												</div>
											))}
										</div>
										<button className="w-full bg-white border-2 border-black text-black py-3 rounded-full hover:bg-black hover:text-white transition flex items-center justify-center gap-2">
											Explore
											<ChevronRight className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Tool Holders Section */}
			{(selectedCategory === "all" || selectedCategory === "tool-holders") && (
				<section className="py-16 px-6 bg-gray-50" id="tool-holders">
					<div className="max-w-7xl mx-auto">
						<div className="mb-12">
							<h2 className="text-4xl font-bold text-black mb-4">
								Tool Holders & Management
							</h2>
							<p className="text-blue-600/60 text-lg">
								Complete tool management solutions for optimal efficiency
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{toolHolders.map((product) => (
								<div
									key={product.id}
									id={product.id}
									className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 scroll-mt-32">
									<div className="relative h-48 overflow-hidden bg-gray-100">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale"
										/>
									</div>
									<div className="p-5">
										<h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition">
											{product.name}
										</h3>
										<p className="text-gray-600 mb-4 text-sm">
											{product.description}
										</p>
										<div className="space-y-1 mb-4">
											{product.features.map((feature, idx) => (
												<div
													key={idx}
													className="flex items-center gap-2 text-xs text-gray-700">
													<Check className="w-3 h-3 text-black shrink-0" />
													<span>{feature}</span>
												</div>
											))}
										</div>
										<button className="w-full bg-black text-white py-2.5 rounded-full hover:bg-gray-800 transition text-sm flex items-center justify-center gap-2">
											Details
											<ChevronRight className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* CTA Section */}
			<section className="relative py-20 px-6 bg-black text-white overflow-hidden">
				<div className="absolute inset-0 opacity-20">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"url(https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=80)",
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}></div>
				</div>
				<div className="max-w-4xl mx-auto text-center relative z-10">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Ready to Transform Your Manufacturing?
					</h2>
					<p className="text-xl text-gray-300 mb-8">
						Let our experts help you find the perfect solution for your
						precision machining needs
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/Contact">
							<button className="bg-white cursor cursor-pointer c text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
								Request a Demo
							</button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
