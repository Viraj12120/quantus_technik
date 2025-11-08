"use client";
import { motion } from "framer-motion";

const logos = [
	{ name: "GROB", src: "/grob.svg" },
	{ name: "HWACHEON", src: "/hwacheon.svg" },
	{ name: "ZOLLER", src: "/zoller.svg" },
	{ name: "WENZEL", src: "/wenzel.svg" },
	{ name: "ALZMETALL", src: "/alz.svg" },
];

export default function Product() {
	return (
		<section className="w-full mt-24 flex flex-col items-center justify-center bg-white  px-6 md:px-16">
			<div className="flex justify-center w-full max-w-6xl ">
				<h2 className="text-3xl md:text-3xl font-semibold text-gray-900">
					Our Products
				</h2>
			</div>
			<section className="w-full py-12 flex justify-center">
				<div className=" max-w-6xl overflow-hidden px-4">
					<motion.div
						className="flex gap-16 whitespace-nowrap" // increased gap slightly
						animate={{ x: ["0%", "-50%"] }}
						transition={{
							repeat: Infinity,
							duration: 20,
							ease: "linear",
						}}>
						{[...Array(1)].flatMap(() =>
							logos.map((logo, idx) => (
								<div
									key={logo.name + idx}
									className="flex items-center justify-center w-40" // increased width
								>
									<img
										src={logo.src}
										alt={logo.name}
										className="h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
									/>
								</div>
							))
						)}
					</motion.div>
				</div>
			</section>
		</section>
	);
}
