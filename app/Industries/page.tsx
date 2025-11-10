"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// export const metadata = {
// 	title: "Industries We Serve | Aerospace, Automotive, Medical & More",
// 	description:
// 		"Quantus Technik provides specialized manufacturing solutions for aerospace, automotive, medical, die-mould, electric vehicle electronics, and heavy engineering industries.",
// 	keywords: [
// 		"aerospace manufacturing",
// 		"automotive industry solutions",
// 		"medical equipment manufacturing",
// 		"die-mould industry",
// 		"EV electronics",
// 		"heavy engineering",
// 	],
// 	openGraph: {
// 		title: "Industries Served - Aerospace, Automotive, Medical & More",
// 		description: "Specialized manufacturing solutions for diverse industries",
// 		images: ["/og-industries.jpg"],
// 		url: "https://quantus-technik.com/industries",
// 	},
// 	alternates: {
// 		canonical: "/industries",
// 	},
// };

export default function Industries() {
	const industries = [
		{
			title: "Aerospace",
			image:
				"https://img.freepik.com/free-photo/place-flying-sunset-sky_1112-1132.jpg?t=st=1761550524~exp=1761554124~hmac=dd998c076fb4facd55cbf925a85e875af473a265b43ff2544bba84abd2be41d3&w=740",
			challenges: [
				"Complex geometries requiring 5-axis machining",
				"Tight tolerances on critical components",
				"Exotic materials (titanium, Inconel, composites)",
				"Traceability and quality documentation",
				"Large-format component manufacturing",
			],
			solutions: [
				"GROB & KEN ICHI 5-axis gantry machining centers",
				"HWACHEON precision machining centers",
				"WENZEL CMM for quality assurance",
				"ZOLLER tool presetting for dimensional accuracy",
				"SolidCAM for advanced programming",
			],
			applications: [
				"Turbine blades and housings",
				"Structural components",
				"Landing gear parts",
				"Engine components",
				"Brackets and fittings",
			],
		},
		{
			title: "Automotive / Electric Vehicle",
			image:
				"/electric.jpg",
			challenges: [
				"Shift from ICE to electric powertrains",
				"Lightweight design requirements",
				"Mass production efficiency",
				"Automation and Industry 4.0",
				"Battery technology manufacturing",
			],
			solutions: [
				"GROB F-Series for EV battery housings and chassis",
				"HWACHEON high-volume production centers",
				"INDEX-TRAUB turning solutions for drivetrain components",
				"ALZMETALL for transmission parts",
				"JTEKT for engine component machining",
				"Complete automation integration",
			],
			applications: [
				"Battery trays and housings",
				"Electric motor components",
				"Chassis and structural parts",
				"Transmission components",
				"Brake systems",
				"Engine blocks and heads (ICE)",
				"Mega-casting and giga-casting machining",
			],
		},
		{
			title: "Medical Electronics & Semiconductors",
			image:
				"/semi.jpg",
			challenges: [
				"Micron-level tolerances",
				"Biocompatible material machining",
				"Clean manufacturing environments",
				"Complete documentation and validation",
				"Small to medium batch production",
			],
			solutions: [
				"GROB G-Series universal machining centers",
				"HWACHEON precision equipment",
				"WENZEL coordinate measuring machines",
				"ZOLLER tool presetting for consistent quality",
				"JTEKT grinding solutions",
			],
			applications: [
				"Surgical instruments",
				"Implant components",
				"Prosthetics",
				"Medical device housings",
				"Dental components",
				"Semiconductor manufacturing equipment",
			],
		},
		{
			title: "Die & Mould",
			image:
				"/die.jpg",
			challenges: [
				"High-precision surface finishing",
				"Complex 3D contours",
				"Hard material machining",
				"Long cutting depths",
				"Graphite electrode machining",
			],
			solutions: [
				"HWACHEON graphite and high-speed machining centers",
				"ALZMETALL 5-axis milling for complex cavities",
				"GROB universal machining for mold plates",
				"KEN 5-axis solution for ultra precision surface finish and flexibility",
				"ZOLLER for tool management and presetting",
			],
			applications: [
				"Injection mold cavities and cores",
				"Die casting dies",
				"Forging dies",
				"Press tools",
				"Extrusion dies",
				"Electrode manufacturing",
			],
		},
		{
			title: "Heavy Engineering & General Manufacturing",
			image:
				"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
			challenges: [
				"Flexible manufacturing systems",
				"Job shop versatility",
				"Rapid changeover capability",
				"Cost-effective solutions",
				"Scalable automation",
			],
			solutions: [
				"HWACHEON full range of machining centers",
				"ALZMETALL versatile GROB & Alzmetall",
				"Gerald Angle Head & Work-holding solutions",
				"Gerardi workholding solutions",
				"MST Tool holders",
				"Creintors automation and storage",
			],
			applications: [
				"Valve bodies",
				"Pump components",
				"Hydraulic components",
				"General mechanical parts",
				"Fixtures and tooling",
				"Maintenance parts",
			],
		},
	];

	const logos = [
		{ name: "GROB", src: "/grob.svg" },
		{ name: "HWACHEON", src: "/hwacheon.svg" },
		{ name: "ZOLLER", src: "/zoller.svg" },
		{ name: "WENZEL", src: "/wenzel.svg" },
		{ name: "ALZMETALL", src: "/alz.svg" },
		{ name: "mst", src: "/mst.png" },
		{ name: "mill", src: "/mill.png" },
		{ name: "kenchi", src: "/k.svg" },
		{ name: "jktet", src: "/jktet.svg" },
		{ name: "gerardi", src: "/gerardi.jpg" },
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section */}
			<section className="bg-black text-white flex justify-center py-36 px-4">
				<div className="w-full text-center mx-auto">
					<h1 className="text-5xl md:text-6xl font-bold mb-6">
						Industries We Serve
					</h1>
					<p className="text-xl text-gray-400 mx-auto">
						Delivering precision manufacturing solutions across critical sectors
					</p>
				</div>
			</section>

			{/* Industries */}
			<section className="max-w-6xl mx-auto px-4 py-20">
				<div className="space-y-32">
					{industries.map((industry, idx) => {
						const isEven = idx % 2 === 0;

						return (
							<div
								key={industry.title}
								className={`flex flex-col ${
									isEven ? "lg:flex-row" : "lg:flex-row-reverse"
								} gap-12 items-start`}>
								{/* Image Section */}
								<div className="lg:w-1/2">
									<div className="relative h-[400px] w-full overflow-hidden group">
										<img
											src={industry.image}
											alt={industry.title}
											className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500"
										/>
										<div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
										<div className="absolute bottom-0 left-0 right-0 p-8 from-black/80 to-transparent">
											<h2 className="text-3xl font-bold text-white">
												{industry.title}
											</h2>
										</div>
									</div>
									<div className="border-t border-gray-200 pt-6">
										<h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
											Applications
										</h3>
										<div className="flex flex-wrap gap-2">
											{industry.applications.map((app, i) => (
												<span
													key={i}
													className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 cursor-default">
													{app}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* Content Section */}
								<div className="lg:w-1/2 space-y-8">
									{/* Challenges */}
									<div>
										<h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
											Challenges We Address
										</h3>
										<ul className="space-y-3">
											{industry.challenges.map((challenge, i) => (
												<li
													key={i}
													className="flex items-start gap-3 text-gray-700">
													<span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
													<span className="text-sm text-blue-600/80 leading-relaxed">
														{challenge}
													</span>
												</li>
											))}
										</ul>
									</div>

									{/* Solutions */}
									<section className="my-12">
										<h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-8">
											Our Solutions
										</h3>

										{/* ✅ UPDATED GRID CONTAINER WITH LOGOS */}
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
											{logos.map((logo, index) => (
												<motion.div
													key={logo.name}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.5, delay: index * 0.1 }}
													className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center h-24">
													<div className="relative w-16 h-12 mb-2">
														<Image
															src={logo.src}
															alt={logo.name}
															fill
															className="object-contain"
															sizes="(max-width: 64px) 100vw, 64px"
														/>
													</div>
													<span className="text-xs font-medium text-gray-700 text-center">
														{logo.name}
													</span>
												</motion.div>
											))}
										</div>
									</section>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	);
}
