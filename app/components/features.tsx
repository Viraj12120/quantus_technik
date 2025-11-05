"use client";

import Image from "next/image";
import { motion } from "framer-motion";



export default function Features() {
	const images = [
		{ src: "/exhi.jpg", alt: "quantas" },
		{ src: "/IM.jpg", alt: "quantas" },
		// { src: "/hero.jpeg", alt: "Advanced Machinery" },
		// { src: "/hero.jpeg", alt: "Production Line" },
	];

	return (
		<section className=" bg-white">
			{/* Partner Brands */}
			<section className="max-w-6xl mx-auto px-4 my-12 ">
				<div className="text-center ">
					<p className="text-lg uppercase tracking-wider text-blue-600/80 font-bold">
						Our Trusted OEMs Partners{" "}
					</p>
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

			<div className="lg:px-24 mx-auto px-6 flex flex-col lg:flex-row justify-between gap-12">
				{/* Left Column — Key Stats */}
				<div className="flex-1 space-y-10">
					<div className="my-14">
						<h2 className="text-8xl font-bold text-gray-900 mb-2">5+</h2>
						<p className="text-gray-600 text-lg">Years and Growing...</p>
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
								desc: "Pan-India ",
								icon: "🌏",
							},
							{
								title: "Industries Served",
								desc: "All Major Manufacturing Sectors",
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
						technology, <span className="text-blue-700">Quantus Technik</span>{" "}
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
