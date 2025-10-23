"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function WhyChooseQuantus() {
	const tabs = [
		{
			id: "global",
			label: "Global",
			title: "Global Technology, Local Expertise",
			desc: "We represent the finest machine tool manufacturers from Germany, South Korea, Japan, Taiwan, Italy, and Israel — delivering turnkey solutions tailored to Indian manufacturing needs. Our collaborations ensure access to world-class precision, reliability, and automation. At QUANTUS-TECHNIK, we bridge global innovation with local expertise to create a seamless ecosystem for modern manufacturing.",
		},
		{
			id: "why",
			label: "Why Choose",
			title: "Why Choose QUANTUS-TECHNIK?",
			desc: "We combine cutting-edge technology with strong global partnerships to deliver performance-driven solutions for India’s evolving industries. Our approach integrates innovation, efficiency, and sustainability at every step. From consultation to commissioning, we focus on empowering manufacturers to grow smarter, faster, and more competitively in today’s industrial landscape.",
		},
		{
			id: "technology",
			label: "Technology",
			title: "End-to-End Solutions",
			desc: "From precision 5-axis machining centers to intelligent tool management software, we deliver comprehensive ecosystems built for speed, accuracy, and scalability. Our technology suite includes smart automation, process optimization, and digital monitoring — ensuring consistent results. Each solution is engineered to enhance productivity while minimizing downtime and operational costs.",
		},
		{
			id: "support",
			label: "Support",
			title: "Expert Technical Support",
			desc: "Our techno-commercial engineers bring deep expertise in automation, application engineering, and advanced machining processes. We provide hands-on guidance, from installation to optimization, ensuring seamless integration into your workflow. With proactive service and responsive technical support, we help you maintain peak efficiency across every production stage.",
		},
	];

	const bars = [30, 60, 90, 60, 100, 80];
	const [efficiency, setEfficiency] = useState(0);
	const [display, setDisplay] = useState(0);
	const [activeTab, setActiveTab] = useState("why");

	// Simulate number counters
	useEffect(() => {
		let start = 0;
		const end = 300;
		const duration = 1500;
		const stepTime = 20;
		const increment = (end / duration) * stepTime;

		const timer = setInterval(() => {
			start += increment;
			if (start >= end) {
				start = end;
				clearInterval(timer);
			}
			setEfficiency(Math.floor(start));
		}, stepTime);

		let count = 0;
		const countTimer = setInterval(() => {
			count += 2;
			if (count >= 100) {
				count = 100;
				clearInterval(countTimer);
			}
			setDisplay(count);
		}, 40);

		return () => {
			clearInterval(timer);
			clearInterval(countTimer);
		};
	}, []);

	return (
		<section className="bg-gray-50 py-20">
			<div className="mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
				{/* LEFT SECTION - IMAGE + METRICS */}
				<div className="relative rounded-3xl overflow-hidden bg-white shadow-lg transition-all duration-500">
					<Image
						src="/hero.jpeg"
						alt="Quantus Technik Machinery"
						width={600}
						height={1000}
						className="object-cover w-full h-[600px]"
					/>

					{/* Percentage Box */}
					<div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 h-28 shadow-md flex flex-col space-y-10">
						<p className="text-4xl font-bold text-gray-800 mt-2 relative inline-block transition-all duration-500">
							{display}
							<span className="absolute text-xl top-0 align-top">%</span>
						</p>
						<p className="text-sm text-gray-600">Client Satisfaction</p>
					</div>
				</div>

				{/* RIGHT SECTION - TEXT + CHARTS */}
				<div className="space-y-10 transition-all duration-700">
					{/* Tabs Row */}
					<div className="space-y-10">
						{/* TABS */}
						<div className="flex flex-wrap gap-6 text-gray-400 font-medium">
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`pb-1 transition border-b-2 ${
										activeTab === tab.id
											? "text-gray-900 border-blue-700"
											: "border-transparent hover:text-gray-900"
									}`}>
									{tab.label}
								</button>
							))}
						</div>

						{/* ACTIVE TAB CONTENT */}
						<div className="transition-opacity duration-500 ease-in-out">
							<h2 className="text-4xl font-bold text-gray-900 leading-snug mb-4">
								{tabs.find((tab) => tab.id === activeTab)?.title}
							</h2>
							<p className="text-gray-600 text-lg leading-relaxed">
								{tabs.find((tab) => tab.id === activeTab)?.desc}
							</p>
						</div>
					</div>

					{/* STATS ROW */}
					<div className="grid grid-cols-2 gap-6">
						{/* Growth Card */}
						<div className="bg-white rounded-2xl p-6 shadow-sm transition-all duration-500 hover:shadow-md">
							<h4 className="font-semibold text-gray-900 mb-3">Growth</h4>
							<div className="flex items-end gap-1 h-24">
								{bars.map((h, i) => (
									<div
										key={i}
										className="w-4 bg-gray-800 rounded-t-lg transition-all duration-700 ease-out"
										style={{
											height: `${h}%`,
											transitionDelay: `${i * 100}ms`,
										}}
									/>
								))}
							</div>
						</div>

						{/* Efficiency Card */}
						<div className="bg-[#F4F754] rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-500 hover:shadow-md">
							<div>
								<h4 className="font-semibold text-gray-900 mb-3">Efficiency</h4>
								<p className="text-gray-700 text-sm">up to</p>
								<h3 className="text-4xl font-bold text-gray-900">
									{efficiency}%
								</h3>
							</div>

							<div className="flex items-center justify-end">
								<div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center transform transition-transform duration-500 hover:rotate-180">
									↑
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
