"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
	const videos = [
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179062/2_WS_intro-pg-ken_imspdp.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179053/6_WS_intro-pg-wenzel_izcloo.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179042/1_WS_intro-pg-GROB_jv4gn0.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179042/4_WS_intro-pg-gerardi_oa7qkp.mp4",
	];

	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % videos.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [videos.length]);

	return (
		<section className="relative w-[95%] sm:w-[98%] mx-auto my-20 mb-12 overflow-hidden h-[75vh] sm:h-[85vh] lg:h-screen rounded-xl">
			{/* Background Video */}
			<div className="absolute inset-0">
				<video
					key={videos[current]}
					src={videos[current]}
					autoPlay
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
				/>
				<div className="absolute inset-0 bg-black/80" />
			</div>

			{/* Top-left logo text */}
			<div className="absolute top-2 left-2 sm:left-8 z-20 flex items-center gap-3">
				<Image
					src="/qt.png" // Replace with your logo file path
					alt="Quantus Technik Logo"
					width={74}
					height={74}
					className="rounded  p-2 bg-opacity-80 shadow opacity-30"
				/>
			</div>

			{/* Hero Content */}
			<div className="relative z-10  sm:w-3/4  px-5 sm:px-8 lg:px-10 h-full flex flex-col justify-center text-white">
				<p className="text-sm sm:text-base lg:text-6xl font-semibold text-white/90 mb-5 sm:mb-6 leading-16 px-14">
					Engineering Solutions for a Smarter Industry
				</p>
				<h1 className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 text-8xl sm:text-2xl lg:text-3xl leading-tight text-white text-right w-full">
					Empowering Precision Manufacturing Through Innovation
				</h1>
			</div>

			{/* Bottom-right heading */}

			{/* Video Indicator Dots */}
			<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
				{videos.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						className={`w-2 h-2 rounded-full transition-all duration-300 ${
							current === index
								? "bg-white scale-125 shadow-md"
								: "bg-white/50 hover:bg-white/80"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
