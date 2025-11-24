"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
	const videos = [
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179062/2_WS_intro-pg-ken_imspdp.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179053/6_WS_intro-pg-wenzel_izcloo.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179042/1_WS_intro-pg-GROB_jv4gn0.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1763995579/VID-20251124-WA0004_qtoyry.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1763995575/VID-20251124-WA0002_hqdcjn.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1763995577/VID-20251124-WA0006_tgwqtg.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1763995577/VID-20251124-WA0003_uevttf.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1763995576/VID-20251124-WA0005_rubgz3.mp4",
		"https://res.cloudinary.com/domgx4mk9/video/upload/v1762179042/4_WS_intro-pg-gerardi_oa7qkp.mp4"
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
				<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
			</div>

			

			{/* Content */}
			<div className="relative z-10 flex justify-end h-full items-center px-6 sm:px-10 mt-24">
				<div className="max-w-xl">
					<h1 className="text-3xl sm:text-2xl lg:text-5xl font-bold mt-32 text-white mb-2 leading-tight">
						Engineering Solutions{" "}
						<span className="">for a Smarter Industry</span>
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
