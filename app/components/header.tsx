"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const handleSmoothScroll = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string
	) => {
		// Check if it's a hash link (anchor link)
		if (href.includes("#")) {
			e.preventDefault();
			const [path, hash] = href.split("#");

			// If we're on the products page or going to products page
			if (path === "/Products" || window.location.pathname === "/Products") {
				// If not on products page, navigate first
				if (window.location.pathname !== "/Products") {
					window.location.href = href;
					return;
				}

				// Scroll to the section
				const element = document.getElementById(hash);
				if (element) {
					const headerOffset = 128; // 16 (top-16) + 64 (header height) + some padding
					const elementPosition = element.getBoundingClientRect().top;
					const offsetPosition =
						elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth",
					});
				}
			}

			// Close mobile menu
			setIsOpen(false);
			setIsMobileProductsOpen(false);
		}
	};

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About Us", href: "/About" },
		{ name: "Industries We Serve", href: "/Industries" },
		{ name: "Contact Us", href: "/Contact" },
		{ name: "Blogs", href: "/Blogs" },
	];

	const productCategories = [
		{
			label: "Machine Tools",
			items: [
				{
					name: "Vertical Machining Centers",
					href: "/Products#vertical-machining-centers",
				},
				{
					name: "Horizontal Machining Centers",
					href: "/Products#horizontal-machining-centers",
				},
				{ name: "Turning Center", href: "/Products#turning-center" },
				{
					name: "5-axis Machining Centers",
					href: "/Products#5-axis-machining-centers",
				},
				{
					name: "Vertical Turning Machines",
					href: "/Products#vertical-turning-machines",
				},
				{ name: "Grinding machines", href: "/Products#grinding-machines" },
			],
		},
		{
			label: "Measuring Machines",
			items: [
				{ name: "Co-ordinate Measuring Machines (CMM)", href: "/Products#cmm" },
				{ name: "Tool Presetter", href: "/Products#tool-presetter" },
			],
		},
		{
			label: "Angle Head",
			items: [
				{ name: "Fixed 90° type", href: "/Products#fixed-90-angle-head" },
				{ name: "Universal type", href: "/Products#universal-angle-head" },
				{ name: "Special type", href: "/Products#special-angle-head" },
			],
		},
		{
			label: "Tool Holders & Tool Management",
			items: [
				{ name: "Mechanical", href: "/Products#mechanical-tool-holders" },
				{ name: "Shrink fit", href: "/Products#shrink-fit" },
				{
					name: "Insert & Tool Management System",
					href: "/Products#tool-management-system",
				},
				{
					name: "Tool management software",
					href: "/Products#tool-management-software",
				},
			],
		},
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="text-xl font-bold text-gray-900">Quantus Technik</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
						{navLinks.slice(0, 3).map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors">
								{link.name}
							</Link>
						))}

						{/* Products Dropdown - Desktop */}
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 hover:text-black transition-colors outline-none">
								Products
								<ChevronDown className="w-4 h-4" />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-64">
								{productCategories.map((category, idx) => (
									<div key={category.label}>
										<DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase">
											{category.label}
										</DropdownMenuLabel>
										{category.items.map((item) => (
											<DropdownMenuItem key={item.name} asChild>
												<Link
													href={item.href}
													className="cursor-pointer"
													onClick={(e) => handleSmoothScroll(e, item.href)}>
													{item.name}
												</Link>
											</DropdownMenuItem>
										))}
										{idx < productCategories.length - 1 && (
											<DropdownMenuSeparator />
										)}
									</div>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link
										href="/Products"
										className="cursor-pointer font-semibold text-blue-600">
										View All Products →
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

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

			{/* Mobile Navigation */}
			{isOpen && (
				<div className="md:hidden bg-white border-t border-gray-200 w-full">
					<nav className="flex flex-col gap-4 px-4 py-4 text-gray-600">
						{navLinks.slice(0, 3).map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors"
								onClick={() => setIsOpen(false)}>
								{link.name}
							</Link>
						))}

						{/* Products Accordion - Mobile */}
						<div>
							<button
								onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
								className="flex items-center justify-between w-full hover:text-black transition-colors">
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
										<div key={category.label}>
											<div className="text-xs font-semibold text-gray-500 uppercase mb-2">
												{category.label}
											</div>
											<div className="space-y-2 ml-2">
												{category.items.map((item) => (
													<Link
														key={item.name}
														href={item.href}
														className="block text-sm hover:text-black transition-colors"
														onClick={(e) => {
															handleSmoothScroll(e, item.href);
														}}>
														{item.name}
													</Link>
												))}
											</div>
										</div>
									))}
									<Link
										href="/Products"
										className="block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-3"
										onClick={() => {
											setIsOpen(false);
											setIsMobileProductsOpen(false);
										}}>
										View All Products →
									</Link>
								</div>
							)}
						</div>

						{navLinks.slice(3).map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="hover:text-black transition-colors"
								onClick={() => setIsOpen(false)}>
								{link.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
