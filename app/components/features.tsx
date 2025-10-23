"use client";

import Image from "next/image";

export default function Features() {
	const images = [
		{ src: "/hero.jpeg", alt: "CNC Machinery" },
		{ src: "/hero.jpeg", alt: "Manufacturing Tech" },
		{ src: "/hero.jpeg", alt: "Advanced Machinery" },
		{ src: "/hero.jpeg", alt: "Production Line" },
	];

	return (
		<section className="py-10 bg-white">
			<div className="lg:px-24 mx-auto px-6 flex flex-col lg:flex-row justify-between gap-12">
				{/* Left Column — Key Stats */}
				<div className="flex-1 space-y-10">
					<div className="my-14">
						<h2 className="text-8xl font-bold text-gray-900 mb-2">50+</h2>
						<p className="text-gray-600 text-lg">
							Years of Combined Experience
						</p>
					</div>

					{/* Bullet Points */}
					<div className="space-y-2">
						{[
							{ title: "Founded", desc: "June 2020", icon: "🏢" },
							{
								title: "Global Partnerships",
								desc: "11 World-Leading OEMs",
								icon: "🤝",
							},
							{
								title: "Geographic Coverage",
								desc: "Pan-India from Pune & Bangalore",
								icon: "🌏",
							},
							{
								title: "Industries Served",
								desc: "5+ Critical Manufacturing Sectors",
								icon: "🏭",
							},
						].map((item, idx) => (
							<div
								key={idx}
								className="flex items-start gap-4 p-3 rounded-lg transition-all">
								<div>
									<h3 className="font-semibold text-gray-900 text-lg transition-colors">
										{item.title}
									</h3>
									<p className="text-gray-600">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right Column — Description + Images */}
				<div className="flex-1 space-y-8">
					<p className="text-4xl leading-snug text-gray-900 font-semibold">
						As India's premier solution partner for advanced manufacturing
						technology, <span className="text-blue-700">Quantus-Technik</span>{" "}
						bridges the gap between global innovation and local excellence.
					</p>
					<p className="text-gray-700 text-lg leading-relaxed">
						Since 2020, we've been transforming manufacturing facilities across
						aerospace, automotive, medical, die & mould, and electronics
						industries with cutting-edge CNC machinery and intelligent tool
						management solutions.
					</p>

					{/* Image Section */}
					<div className="grid grid-cols-2 gap-4">
						{images.slice(0, 2).map((img, idx) => (
							<div key={idx} className="rounded-xl overflow-hidden">
								<Image
									src={img.src}
									alt={img.alt}
									width={400}
									height={300}
									className="object-cover w-full h-full"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
