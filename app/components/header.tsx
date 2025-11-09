"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isProductsOpen, setIsProductsOpen] = useState(false);
	const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	// close dropdown on outside click
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsProductsOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About Us", href: "/About" },
		{ name: "Industries We Serve", href: "/Industries" },
		{ name: "Contact Us", href: "/Contact" },
		{ name: "Offers and Promotions", href: "/Offers" },
	];

	const productCategories = [
		{ label: "Machine Tools" },
		{ label: "Measuring Machines" },
		{ label: "Angle Head" },
		{ label: "Tool Holders & Tool Management" },
	];

	const formatId = (text: string) =>
		text.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

	return (
		<header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* LOGO */}
					<Link
						href="/"
						className="text-xl racing-sans-one-regular text-blue-500 italic">
						Quantus Technik
					</Link>

					{/* DESKTOP NAV */}
					<nav className="hidden md:flex justify-center items-center gap-6 text-sm text-gray-600">
						{navLinks.slice(0, 3).map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`hover:text-black ${
									pathname === link.href ? "text-black font-medium" : ""
								}`}>
								{link.name}
							</Link>
						))}

						{/* PRODUCTS DROPDOWN */}
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() => setIsProductsOpen((prev) => !prev)}
								className="flex items-center gap-1 hover:text-black">
								Products
								<ChevronDown
									className={`w-3 h-3 transition ${
										isProductsOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{/* DROPDOWN MENU */}
							<div
								className={`absolute left-0 mt-3 w-56 bg-white border border-gray-200 
                                rounded-lg shadow-lg p-4 transition-all duration-200 ease-in-out
								${
									isProductsOpen
										? "opacity-100 scale-100"
										: "opacity-0 scale-95 pointer-events-none"
								}`}>
								{productCategories.map((cat, index) => (
									<a
										key={cat.label}
										href={`/Products#${formatId(cat.label)}`}
										className="block text-sm text-gray-700 hover:text-blue-600 py-2">
										{cat.label}
									</a>
								))}
							</div>
						</div>

						{navLinks.slice(3).map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`hover:text-black ${
									pathname === link.href ? "text-black font-medium" : ""
								}`}>
								{link.name}
							</Link>
						))}
					</nav>

					{/* MOBILE MENU BUTTON */}
					<button
						className="md:hidden"
						onClick={() => setIsOpen((prev) => !prev)}>
						{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
					</button>
				</div>
			</div>

			{/* MOBILE MENU */}
			{isOpen && (
				<div className="md:hidden bg-white border-t border-gray-200">
					<nav className="flex flex-col gap-4 px-4 py-4">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`text-sm ${
									pathname === link.href
										? "text-black font-medium"
										: "text-gray-600"
								}`}>
								{link.name}
							</Link>
						))}

						{/* MOBILE PRODUCTS */}
						<div>
							<button
								onClick={() => setIsMobileProductsOpen((prev) => !prev)}
								className="flex items-center justify-between w-full">
								Products
								<ChevronDown
									className={`w-4 h-4 transition ${
										isMobileProductsOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{isMobileProductsOpen && (
								<div className="ml-4 mt-3 space-y-2">
									{productCategories.map((cat) => (
										<Link
											key={cat.label}
											href={`/Products#${formatId(cat.label)}`}
											className="text-sm flex flex-col text-gray-700 hover:text-blue-600">
											{cat.label}
										</Link>
									))}
								</div>
							)}
						</div>
					</nav>
				</div>
			)}
		</header>
	);
}
