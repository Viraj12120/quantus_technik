"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const navLinks = [
		{ name: "Home", href: "/" },
		{ name: "About Us", href: "/About" },
		{ name: "Products", href: "/Products" },
		{ name: "Industries", href: "/Industries" },
		{ name: "Offers and Deals", href: "/Offer" },
		{ name: "Contact Us", href: "/Contact" },
	];

	return (
		<header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
			<div className="w-full">
				<div className="flex items-center justify-between h-16">
					{/* LOGO */}
					<Link href="/">
						<Image
							src={"/l.svg"}
							alt="Logo"
							width={300}
							height={200}
							className=""
						/>
					</Link>

					{/* DESKTOP NAV */}
					<nav className="hidden md:flex justify-center mr-10 items-center gap-6 text-sm text-gray-600">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className={`hover:text-blue-600 ${
									pathname === link.href ? "text-blue-600 font-medium" : ""
								}`}>
								{link.name}
							</Link>
						))}
					</nav>

					{/* MOBILE MENU BUTTON */}
					<button
						className="md:hidden"
						onClick={() => setIsOpen((prev) => !prev)}>
						{isOpen ? (
							<X className="w-6 h-6 mr-6 cursor cursor-pointer" />
						) : (
							<Menu className="w-6 h-6 mr-6 cursor cursor-pointer" />
						)}
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
										? "text-blue-600 font-medium"
										: "text-gray-600"
								}`}>
								{link.name}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
