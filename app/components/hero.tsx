"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative w-[95%] sm:w-[98%] mx-auto mt-16 mb-12 overflow-hidden h-[80vh] sm:h-[90vh] lg:h-screen rounded-xl">
			{/* Background image */}
			<div className="absolute inset-0">
				<Image
					src="/hero.jpeg"
					alt="Hero background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/40" />
			</div>

			{/* Top-left logo text */}
			<h2 className="absolute top-6 left-5 sm:left-8 text-4xl sm:text-6xl lg:text-8xl text-white font-bold tracking-wide z-20 leading-tight">
				Quantus <br /> Technik
			</h2>

			{/* Hero Content (Right-aligned text + button) */}
			<div className="relative z-10 w-full sm:w-3/4 lg:w-1/2 px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center ml-auto text-white">
				<p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 leading-relaxed text-justify">
					Your Strategic Partner for World-Class CNC Machine Tools, CAD/CAM
					Solutions & Tool Management Systems
				</p>

				<Button
					variant="default"
					className="w-fit text-sm sm:text-base lg:text-md px-10 sm:px-8 py-8 sm:py-5 rounded-xl font-medium shadow-lg hover:scale-105 transition-all">
					Download Product Catalog
				</Button>
			</div>

			{/* Bottom-right heading */}
			<h1 className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 text-2xl sm:text-3xl lg:text-4xl font-semibold sm:font-bold leading-tight text-white text-right w-[90%]">
				Empowering Precision Manufacturing Through Innovation
			</h1>
		</section>
	);
}
