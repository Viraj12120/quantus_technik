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
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 space-y-24">
				{/* Hero Section */}
				<div className="text-center space-y-3">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
						About <span className="text-gray-900">QUANTUS-TECHNIK</span>
					</h1>
					<p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
						Revolutionizing Indian manufacturing with world-class machine tool
						technology and innovative production solutions.
					</p>
				</div>

				{/* Our Story */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-4">
						<h2 className="text-4xl font-semibold">Our Story</h2>
						<p className="text-gray-600 leading-relaxed">
							Founded in June 2020, QUANTUS-TECHNIK was built on a simple vision
							— to bring world-class machine tool technology to India. Our
							journey is powered by decades of expertise from engineers who have
							led global industrial transformation.
						</p>
					</div>
					<div className="relative w-full h-72 md:h-80 rounded-xl overflow-hidden shadow-sm">
						<Image
							src="/hero.jpeg"
							alt="Our Story"
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Vision & Mission */}
				<div className="grid md:grid-cols-2 gap-12 items-start">
					<div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-sm">
						<Image
							src="/hero.jpeg"
							alt="Vision & Mission"
							fill
							className="object-cover"
						/>
					</div>

					<div className="space-y-6">
						<div>
							<h2 className="text-4xl font-semibold">Our Vision</h2>
							<p className="text-gray-600 leading-relaxed mt-2">
								To become India’s most trusted one-stop provider for metal
								cutting, tool management, and smart manufacturing solutions —
								empowering industries to compete globally.
							</p>
						</div>

						<div>
							<h2 className="text-4xl font-semibold mt-8">Our Mission</h2>
							<ul className="text-gray-600 space-y-2 mt-3 list-disc list-inside">
								<li>
									Deliver advanced manufacturing solutions from leading
									technology partners
								</li>
								<li>
									Provide expert guidance across the full product lifecycle
								</li>
								<li>
									Enable automation and digital transformation for efficiency
								</li>
								<li>
									Build long-term partnerships focused on productivity and
									innovation
								</li>
								<li>
									Bridge the gap between global innovation and Indian industry
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Team & Commitment */}
				<div className="text-center space-y-8">
					<h2 className="text-4xl font-semibold">Our Team & Commitment</h2>
					<p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Our expert team blends deep technical know-how with strategic
						commercial insight. We proudly represent premium technology partners
						and ensure consistent support from consultation to after-sales.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
						{team.map((member) => (
							<div
								key={member.id}
								className="flex flex-col items-center ">
								<div className="relative aspect-square w-36 sm:w-44 rounded-full overflow-hidden shadow-md">
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
