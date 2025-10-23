"use client";

export default function Footer() {
	return (
		<footer className="bg-white text-black py-12 border-t border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Social Links */}
				<div className="flex flex-col md:flex-row items-center justify-between mb-12 pb-8  border-gray-200">
					<div className="flex gap-6 text-sm font-medium">
						<a href="#" className="hover:text-gray-600">
							Twitter
						</a>
						<span className="text-gray-400">&gt;</span>
						<a href="#" className="hover:text-gray-600">
							Instagram
						</a>
						<span className="text-gray-400">&gt;</span>
						<a href="#" className="hover:text-gray-600">
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
						<h4 className="font-semibold text-black mb-6">About</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<a href="#" className="hover:text-black">
									Problem
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Solution
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Technology
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Product
								</a>
							</li>
						</ul>
					</div>

					{/* Products Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">Products</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<a href="#" className="hover:text-black">
									Ken ICHI
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									GROB
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									HwaCheon
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Gerardi (Angle Head)
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									JTEKT WENZE
								</a>
							</li>
						</ul>
					</div>

					{/* Industries Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">Industries</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<a href="#" className="hover:text-black">
									Aerospace
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Tooling
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Manufacturing
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Automotive
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Energy
								</a>
							</li>
						</ul>
					</div>

					{/* Blogs or Additional Section */}
					<div>
						<h4 className="font-semibold text-black mb-6">Blogs</h4>
						<ul className="space-y-3 text-sm text-gray-700">
							<li>
								<a href="#" className="hover:text-black">
									Latest Updates
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Case Studies
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									News
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-black">
									Insights
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 pt-8 border-t border-gray-200">
					<p>2025@etitud.com</p>
					<a href="#" className="hover:text-black mt-4 md:mt-0">
						Privacy Policy
					</a>
					<a href="#" className="hover:text-black mt-4 md:mt-0">
						Terms of service
					</a>
				</div>
			</div>
		</footer>
	);
}
