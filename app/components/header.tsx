"use client";

import { Menu } from "lucide-react";

export default function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center gap-8">
						<div className="text-xl font-bold text-gray-900">Quantus Technik</div>
						<nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
							<a href="#" className="hover:text-gray-900">
								About
							</a>
							<a href="#" className="hover:text-gray-900">
								Service
							</a>
							<a href="#" className="hover:text-gray-900">
								Product
							</a>
						</nav>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-xs text-gray-500">London 08.24.53</div>
						<button className="md:hidden">
							<Menu className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
