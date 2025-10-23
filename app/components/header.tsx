"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About Us", href: "/about" },
		{ name: "Industries We Serve", href: "/industries" },
		{ name: "Products", href: "/products" },
		{ name: "Contact Us", href: "/contact" },
		{ name: "Blogs", href: "/blogs" },
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 ">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="text-xl font-bold text-gray-900">Quantus Technik</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex gap-6 text-sm text-gray-600">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors">
								{link.name}
							</Link>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<div className="flex items-center md:hidden">
						<button onClick={toggleMenu}>
							{isOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden bg-white border-t border-gray-200 w-full">
					<nav className="flex flex-col gap-4 px-4 py-4 text-gray-600">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors"
								onClick={() => setIsOpen(false)} 
							>
								{link.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
