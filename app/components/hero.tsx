"use client";

import { useState, useEffect } from "react";

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
		}, 100000);
		return () => clearInterval(interval);
	}, [videos.length]);

	return (
		<section className="relative w-[95%] sm:w-[98%] mx-auto mt-4 mb-12 overflow-hidden h-[75vh] sm:h-[85vh] lg:h-screen rounded-xl">
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
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Top-left logo text */}
			{/* <h2 className="absolute top-5 left-4 sm:left-8 text-4xl sm:text-2xl lg:text-7xl text-white font-bold tracking-wide z-20 leading-tight">
				Quantus <br /> Technik
			</h2> */}

			{/* Hero Content */}
			<div className="relative z-10 w-full sm:w-3/4 lg:w-1/2 px-5 sm:px-8 lg:px-10 h-full flex flex-col justify-center ml-auto text-white">
				<p className="text-sm sm:text-base lg:text-4xl font-bold text-white/90 mb-5 sm:mb-6 leading-relaxed text-justify">
					Your Strategic Partner for World-Class CNC Machine Tools, CAD/CAM
					Solutions & Tool Management Systems
				</p>

				{/* <Button
					variant="default"
					className="w-fit text-xs sm:text-lg lg:text-base px-6 sm:px-8 lg:px-10 lg:py-6 py-2 sm:py-3 rounded-lg font-medium shadow-md hover:scale-105 transition-all duration-200">
					Download Product Catalog
				</Button> */}
			</div>

			{/* Bottom-right heading */}
			<h1 className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 text-xl sm:text-2xl lg:text-3xl font-semibold sm:font-bold leading-tight text-white text-right w-[90%]">
				Empowering Precision Manufacturing Through Innovation
			</h1>

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
