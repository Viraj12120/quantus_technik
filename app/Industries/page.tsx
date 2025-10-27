"use client"
import { motion } from "framer-motion";

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
				"https://img.freepik.com/free-photo/woman-charging-electro-car-by-her-house_1303-17809.jpg?t=st=1761551001~exp=1761554601~hmac=08b277bc6dc78330c43709e497822c5b31d0b872fbbaac091de0fc39c08b9d7c&w=1480",
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
			title: "Medical Electronics / Semiconductors",
			image:
				"https://img.freepik.com/free-photo/close-up-hand-with-glove-holding-chip_23-2148925545.jpg?t=st=1761551060~exp=1761554660~hmac=e8b691c8ccfb1fff8506fd9bd8d41a10ad4a492f5aca31ebd9d057ec5d85a21d&w=1480",
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
				"INDEX Swiss-type lathes for small precision parts",
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
				"https://img.freepik.com/free-photo/worker-face-mask-controlling-coffee-roasting-process-coffee-roaster-working-roasting-equipment-man-mask-uniform-working-with-machinery-appliance_74855-20118.jpg?t=st=1761551195~exp=1761554795~hmac=66663e02baf78045c9c365ce1d36f6ae4fd83bfaf02a1649e165441d8d8ed199&w=1480",
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
				"SolidCAM with HSM strategies",
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
				"ALZMETALL versatile VMC and drilling machines",
				"INDEX universal turning machines",
				"Gerardi workholding solutions",
				"Schüssler tool holders",
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
											className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-500"
										/>
										<div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
										<div className="absolute bottom-0 left-0 right-0 p-8  from-black/80 to-transparent">
											<h2 className="text-3xl font-bold text-white">
												{industry.title}
											</h2>
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
									<div>
										<h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
											Our Solutions
										</h3>
										<ul className="space-y-3">
											{industry.solutions.map((solution, i) => (
												<li
													key={i}
													className="flex items-start gap-3 text-gray-700">
													<span className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0"></span>
													<span className="text-sm leading-relaxed">
														{solution}
													</span>
												</li>
											))}
										</ul>
									</div>

									{/* Applications */}
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
							</div>
						);
					})}
				</div>
			</section>

			{/* CTA Section */}

			{/* Partner Brands */}
			<section className="max-w-6xl mx-auto px-4 py-20">
				<div className="text-center mb-12">
					<p className="text-sm uppercase tracking-wider text-blue-600/80 mb-2">
						Trusted Partners
					</p>
					<h3 className="text-3xl font-bold text-black">
						World-Class Technology Providers
					</h3>
				</div>
				<div className="overflow-hidden mt-10">
					<motion.div
						className="flex gap-12"
						animate={{ x: ["0%", "-50%"] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 20,
							ease: "linear",
						}}>
						{[...Array(200)].flatMap(() =>
							[
								"GROB",
								"HWACHEON",
								"ZOLLER",
								"INDEX",
								"WENZEL",
								"ALZMETALL",
							].map((brand) => (
								<div
									key={brand + Math.random()}
									className="flex items-center justify-center w-32">
									<span className="font-bold text-gray-400 hover:text-black transition-colors text-lg cursor-default whitespace-nowrap">
										{brand}
									</span>
								</div>
							))
						)}
					</motion.div>
				</div>
			</section>
		</div>
	);
}
