"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
	{ name: "GROB", src: "/grob.svg" },
	{ name: "HWACHEON", src: "/hwacheon.svg" },
	{ name: "ZOLLER", src: "/zoller.svg" },
	{ name: "WENZEL", src: "/wenzel.svg" },
	{ name: "ALZMETALL", src: "/alz.svg" },
	{ name: "mst", src: "/mstt.jpg" },
	{ name: "mill", src: "/mill.png" },
	{ name: "kenchi", src: "/ken.svg" },
	{ name: "jktet", src: "/logo.png" },
	{ name: "gerardi", src: "/gerardi.jpg" },
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function Product() {
	return (
		<section className="w-full py-16 md:py-24 flex flex-col items-center justify-center  px-4 sm:px-6 md:px-16 lg:px-24">
			{/* Heading */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="flex justify-center w-full max-w-6xl mb-12">
				<h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
			</motion.div>

			{/* Logo Grid */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="w-full max-w-6xl">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
					{logos.map((logo) => (
						<motion.div
							key={logo.name}
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center justify-center w-full">
							<div className="relative w-full h-24 md:h-28 flex items-center justify-center bg-[#CAE7FF] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 md:p-6 border border-[#4299e1]">
								<Image
									src={logo.src}
									alt={`${logo.name} logo`}
									width={200}
									height={80}
									className="w-full h-full object-contain grayscale hover:grayscale-0 mix-blend-multiply transition-all duration-300"
									unoptimized
								/>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
