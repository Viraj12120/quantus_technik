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
		<section className="relative w-[95%] mx-auto mt-20 mb-10 overflow-hidden h-[85vh] rounded-lg shadow-2xl">
			{/* Background Video */}
			<div className="absolute inset-0">
				<video
					key={videos[current]}
					src={videos[current]}
					autoPlay
					muted
					loop
					playsInline
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
			</div>

			{/* Logo */}
			<div className="absolute top-4 left-4 z-20">
				<Image
					src="/qt.png"
					alt="Quantus Technik Logo"
					width={70}
					height={70}
					className="w-14 h-14 sm:w-16 sm:h-16 rounded  backdrop-blur-sm p-2 shadow-lg opacity-40 hover:opacity-60 transition"
					priority
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
				<div className="max-w-xl">
					<h1 className="text-3xl sm:text-2xl lg:text-6xl font-bold mt-12 text-white mb-2 leading-tight">
						Engineering Solutions for a{" "}
						<span className="">Smarter Industry</span>
					</h1>

					<p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
						Empowering Precision Manufacturing Through Innovation
					</p>
				</div>
			</div>

			{/* Video Dots */}
			<div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
				{videos.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrent(index)}
						aria-label={`Video ${index + 1}`}
						className={`w-2 h-2 rounded-full transition-all 
					${current === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}
				`}
					/>
				))}
			</div>
		</section>
	);
}
