"use client";

import Image from "next/image";

export default function AboutUs() {
	const team = [
		{
			id: 1,
			name: "Rajesh Gaikwad",
			position: "Founder & CEO",
			image: "/hero.jpeg",
		},
		{
			id: 2,
			name: "Sneha Patel",
			position: "Head of Operations",
			image: "/hero.jpeg",
		},
		{
			id: 3,
			name: "Amit Desai",
			position: "Technical Director",
			image: "/hero.jpeg",
		},
		{
			id: 4,
			name: "Priya Mehta",
			position: "Marketing Manager",
			image: "/hero.jpeg",
		},
	];

	return (
		<section className="bg-white text-gray-800">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 space-y-32">
				{/* Hero Section */}
				<div className="relative text-center space-y-5">
					<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
						About <span className="text-gray-900">Quantus-Technik</span>
					</h1>
					<p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
						Revolutionizing Indian manufacturing with world-class machine tool
						technology, precision craftsmanship, and automation excellence.
					</p>

					{/* Decorative background element */}
					<div className="absolute inset-0 -z-10  from-gray-50 via-white to-transparent rounded-3xl" />
				</div>

				{/* Our Story */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
							Our Story
						</h2>
						<p className="text-gray-600 leading-relaxed">
							Founded in June 2020, <strong>QUANTUS-TECHNIK</strong> was built
							on a simple vision — to bring world-class machine tool technology
							to India. With decades of experience in industrial manufacturing,
							our team is redefining engineering standards through innovation
							and expertise.
						</p>

						<div className="grid grid-cols-3 gap-6 pt-6">
							<div>
								<h3 className="text-3xl font-bold text-gray-900">73+</h3>
								<p className="text-sm text-gray-500">Years of Legacy</p>
							</div>
							<div>
								<h3 className="text-3xl font-bold text-gray-900">10+</h3>
								<p className="text-sm text-gray-500">Global Partners</p>
							</div>
							<div>
								<h3 className="text-3xl font-bold text-gray-900">100%</h3>
								<p className="text-sm text-gray-500">Client Satisfaction</p>
							</div>
						</div>
					</div>

					<div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
						<Image
							src="/hero.jpeg"
							alt="Our Story"
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Vision & Mission */}
				<div className="bg-gray-50 rounded-3xl p-10 md:p-14 space-y-10">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
							<Image
								src="/hero.jpeg"
								alt="Vision & Mission"
								fill
								className="object-cover"
							/>
						</div>

						<div className="space-y-8">
							<div>
								<h2 className="text-3xl font-semibold text-gray-900">
									Our Vision
								</h2>
								<p className="text-gray-600 mt-2 leading-relaxed">
									To become India’s most trusted one-stop provider for metal
									cutting, tool management, and smart manufacturing solutions —
									empowering industries to compete globally.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-semibold text-gray-900">
									Our Mission
								</h2>
								<ul className="text-gray-600 space-y-2 mt-3 list-disc list-inside">
									<li>
										Deliver advanced manufacturing solutions from leading global
										brands
									</li>
									<li>
										Provide expert guidance across every stage of production
									</li>
									<li>
										Enable automation and digital transformation for efficiency
									</li>
									<li>Build long-term partnerships that drive innovation</li>
									<li>
										Bridge the gap between global innovation and Indian industry
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Team Section */}
				<div className="text-center space-y-8">
					<h2 className="text-4xl font-bold text-gray-900">
						Our Team & Commitment
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Our team blends deep technical know-how with strategic insight —
						driving excellence in every machine, every project, and every client
						relationship.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
						{team.map((member) => (
							<div
								key={member.id}
								className="bg-white  transition-all duration-300">
								<div className="relative aspect-square w-36 mx-auto rounded-full overflow-hidden">
									<Image
										src={member.image}
										alt={member.name}
										fill
										className="object-cover transition-transform duration-500 hover:scale-105"
									/>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mt-4">
									{member.name}
								</h3>
								<p className="text-sm text-gray-500">{member.position}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
