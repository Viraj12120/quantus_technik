"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-white text-black py-12 border-t border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Social Links */}
				<div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-8  border-gray-200">
					<div className="flex gap-6 text-sm font-medium">
						<a
							href="https://www.linkedin.com/company/quantus-technik/posts/?feedView=all"
							className="hover:text-gray-600">
							LinkedIn
						</a>
						<span className="text-gray-400">&gt;</span>
						<a
							href="https://www.instagram.com/quantus_technik/"
							className="hover:text-gray-600">
							Instagram
						</a>
						<span className="text-gray-400">&gt;</span>
						<a
							href="https://www.youtube.com/@quantus-technik3846"
							className="hover:text-gray-600">
							Youtube
						</a>
					</div>
				</div>

				{/* Footer Links */}
				<div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
					{/* Company Info */}
					<div className="md:col-span-1">
						<div className="flex items-center gap-2 mb-4">
							<h3 className="font-bold text-lg">Quantus Technik</h3>
						</div>
						<p className="text-sm text-gray-600 leading-relaxed">
							Quantus Technik delivers high-precision machinery and innovative
							solutions to serve diverse industries, including aerospace,
							tooling, and manufacturing.
						</p>
					</div>

					{/* About Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">About Us</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<a href="/About" className="hover:text-black">
									Who we are
								</a>
							</li>
							<li>
								<a href="/Products" className="hover:text-black">
									Products
								</a>
							</li>
						</ul>
					</div>

					{/* Products Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">Products</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<Link
									href="https://www.kencnc.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-black">
									Ken ICHI
								</Link>
							</li>
							<li>
								<Link
									href="https://www.grobgroup.com/en/"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-black">
									GROB
								</Link>
							</li>
							<li>
								<Link
									href="https://www.hwacheon.com/en/main.do"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-black">
									HwaCheon
								</Link>
							</li>
							<li>
								<Link
									href="http://www.gerardispa.com/company"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-black">
									Gerardi
								</Link>
							</li>
							<li>
								<Link
									href="https://www.wenzel-group.com/en/product-categories"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-black">
									WENZEL
								</Link>
							</li>
						</ul>
					</div>

					{/* Industries Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">Industries</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<a href="/Industries#" className="hover:text-black">
									Aerospace
								</a>
							</li>

							<li>
								<a href="Industries#" className="hover:text-black">
									Manufacturing
								</a>
							</li>
							<li>
								<a href="Industries#" className="hover:text-black">
									Automotive
								</a>
							</li>
						</ul>
					</div>

					{/* Blogs or Additional Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">Offers and Deals</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							{/* <li>
								<a href="/Blogs" className="hover:text-black">
									Latest Updates
								</a>
							</li>

							<li>
								<a href="/Blogs" className="hover:text-black">
									News
								</a>
							</li> */}
						</ul>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-gray-200 mt-8 pt-6">
					<div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
						{/* Left Section */}
						<p className="text-center md:text-left">
							© 2025 Quantus Technik.com
						</p>

						{/* Center Section - Links */}
						<div className="flex items-center gap-6">
							<a href="#" className="hover:text-black transition-colors">
								Privacy Policy
							</a>
							<a href="#" className="hover:text-black transition-colors">
								Terms of Service
							</a>
						</div>

						{/* Right Section - Credits */}
						<div className="flex flex-col md:flex-row items-center gap-2 text-gray-500 text-xs md:text-sm">
							<span className=" transition-colors">
								Designed by{" "}
								<span className="font-medium text-gray-700">
									Akshata Jangam
								</span>
							</span>
							<span className="hidden md:inline">|</span>
							<span className=" transition-colors">
								Developed by{" "}
								<span className="font-medium text-gray-700">Viraj Disale</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
