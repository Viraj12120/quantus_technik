"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isProductsOpen, setIsProductsOpen] = useState(false);
	const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => setIsOpen(!isOpen);
	const toggleProducts = () => setIsProductsOpen((prev) => !prev);

	// ✅ Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsProductsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About Us", href: "/About" },
		{ name: "Industries We Serve", href: "/Industries" },
		{ name: "Contact Us", href: "/Contact" },
		{ name: "Offers and Promotions", href: "/Blogs" },
	];

	const productCategories = [
		{ label: "Machine Tools" },
		{ label: "Measuring Machines" },
		{ label: "Angle Head" },
		{ label: "Tool Holders & Tool Management" },
	];

	// ✅ Smooth scroll to section or navigate
	const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
		e.preventDefault();

		const formattedId = sectionId
			.toLowerCase()
			.replace(/ & /g, "-")
			.replace(/\s+/g, "-");

		if (window.location.pathname === "/Products") {
			const target = document.getElementById(formattedId);
			if (target) {
				const offset = 100; // header height offset
				const topPos =
					target.getBoundingClientRect().top + window.scrollY - offset;

				window.scrollTo({
					top: topPos,
					behavior: "smooth",
				});
			}
		} else {
			window.location.href = `/Products#${formattedId}`;
		}

		setIsProductsOpen(false);
	};

	return (
		<header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 relative">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2">
						<span className="text-xl racing-sans-one-regular text-blue-500 italic">
							Quantus Technik
						</span>
					</Link>

					{/* ✅ Centered Desktop Navigation */}
					<nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm text-gray-600">
						{navLinks.slice(0, 3).map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors">
								{link.name}
							</Link>
						))}

						{/* ✅ Dropdown stays open until click or outside click */}
						<div ref={dropdownRef} className="relative">
							<button
								onClick={toggleProducts}
								className="flex items-center gap-1 cursor-pointer hover:text-black transition">
								Products
								<ChevronDown
									className={`w-3 h-3 mt-1 transition-transform ${
										isProductsOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							<div
								className={`absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-all duration-200 ease-in-out ${
									isProductsOpen
										? "opacity-100 translate-y-0 pointer-events-auto"
										: "opacity-0 -translate-y-2 pointer-events-none"
								}`}>
								{productCategories.map((category, idx) => (
									<div key={idx} className="mb-3 last:mb-0">
										<a
											href={`/Products#${category.label
												.toLowerCase()
												.replace(/ & /g, "-")
												.replace(/\s+/g, "-")}`}
											onClick={(e) => handleScrollToSection(e, category.label)}
											className="text-xs font-semibold text-gray-700 uppercase mb-2 block hover:text-blue-600 transition-colors">
											{category.label}
										</a>

										{idx < productCategories.length - 1 && (
											<hr className="my-2 border-gray-200" />
										)}
									</div>
								))}
							</div>
						</div>

						{navLinks.slice(3).map((link) => (
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

			{/* ✅ Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden bg-white border-t border-gray-200 w-full">
					<nav className="flex flex-col gap-4 px-4 py-4 text-gray-600">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors"
								onClick={() => setIsOpen(false)}>
								{link.name}
							</Link>
						))}

						{/* Products Dropdown in Mobile */}
						<div>
							<button
								onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
								className="flex items-center justify-between w-full hover:text-black transition">
								Products
								<ChevronDown
									className={`w-4 h-4 transition-transform ${
										isMobileProductsOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{isMobileProductsOpen && (
								<div className="mt-2 ml-4 space-y-3">
									{productCategories.map((category) => (
										<a
											key={category.label}
											href={`/Products#${category.label
												.toLowerCase()
												.replace(/ & /g, "-")
												.replace(/\s+/g, "-")}`}
											onClick={(e) => handleScrollToSection(e, category.label)}
											className="block text-sm text-gray-700 hover:text-blue-600 transition">
											{category.label}
										</a>
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
