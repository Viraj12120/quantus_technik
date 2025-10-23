"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative w-[95%] sm:w-[98%] mx-auto mt-24 mb-12 overflow-hidden h-[75vh] sm:h-[85vh] lg:h-screen rounded-xl">
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
			<h2 className="absolute top-5 left-4 sm:left-8 text-4xl sm:text-2xl lg:text-7xl text-white font-bold tracking-wide z-20 leading-tight">
				Quantus <br /> Technik
			</h2>

			{/* Hero Content (Right-aligned text + button) */}
			<div className="relative z-10 w-full sm:w-3/4 lg:w-1/2 px-5 sm:px-8 lg:px-10 h-full flex flex-col justify-center ml-auto text-white">
				<p className="text-sm sm:text-base lg:text-lg text-white/90 mb-5 sm:mb-6 leading-relaxed text-justify">
					Your Strategic Partner for World-Class CNC Machine Tools, CAD/CAM
					Solutions & Tool Management Systems
				</p>

				<Button
					variant="default"
					className="w-fit text-xs sm:text-sm lg:text-base px-6 sm:px-8 lg:px-10 lg:py-6 py-2 sm:py-3 rounded-lg font-medium shadow-md hover:scale-105 transition-all duration-200">
					Download Product Catalog
				</Button>
			</div>

			{/* Bottom-right heading */}
			<h1 className="absolute bottom-5 sm:bottom-8 right-4 sm:right-8 text-xl sm:text-2xl lg:text-3xl font-semibold sm:font-bold leading-tight text-white text-right w-[90%]">
				Empowering Precision Manufacturing Through Innovation
			</h1>
		</section>
	);
}
