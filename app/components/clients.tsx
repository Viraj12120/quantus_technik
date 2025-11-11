"use client";

import { motion } from "framer-motion";

const logos = [
	{ id: 1, name: "HWACHEON", src: "/1.png" },
	{ id: 2, name: "KEN ICHI", src: "/2.png" },
	{ id: 3, name: "GERARDI", src: "/3.jpg" },
	{ id: 4, name: "NIDEC", src: "/4.png" },
	{ id: 5, name: "WFL", src: "/5.png" },
	{ id: 6, name: "ZOLLER", src: "/6.png" },
	{ id: 7, name: "JTEKT", src: "/7.png" },
	{ id: 8, name: "ALZMETALL", src: "/8.png" },
	{ id: 9, name: "AUTOMATE", src: "/9.png" },
	{ id: 10, name: "GROB", src: "/10.png" },
	{ id: 11, name: "WENZEL", src: "/11.png" },
	{ id: 12, name: "MST", src: "/12.png" },
	{ id: 13, name: "LOGO13", src: "/13.png" },
	{ id: 14, name: "LOGO14", src: "/14.png" },
	{ id: 15, name: "LOGO15", src: "/15.png" },
];

export default function Client() {
	const marqueeLogos = [...logos, ...logos];

	return (
		<section className="w-full md:py-24 flex flex-col items-center justify-center px-4 sm:px-6 md:px-16">
			<div className="flex justify-center w-full max-w-6xl mx-auto mb-20">
				<h2 className="text-3xl font-bold text-gray-900">Our Esteemed</h2>
			</div>

			<div className="max-w-6xl mx-auto overflow-hidden">
				<motion.div
					className="flex gap-44 w-[200%] mb-24"
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}>
					{marqueeLogos.map((logo, idx) => (
						<div
							key={idx}
							className="flex justify-center items-center min-w-[120px]">
							<img
								src={logo.src}
								alt={logo.name}
								className="max-h-36 object-contain"
								loading="lazy"
							/>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
