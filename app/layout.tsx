import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "QuantusTechnik - Your Productivity Improvement Partner",
		template: "%s | QuantusTechnik",
	},
	description:
		"Leading provider of machine tools, automation systems, and industrial manufacturing solutions across aerospace, automotive, medical, and die-mould industries.",
	keywords: [
		"machine tools",
		"automation solutions",
		"manufacturing",
		"CNC machines",
		"tool management",
		"aerospace manufacturing",
		"automotive engineering",
	],
	authors: [{ name: "QuantusTechnik" }],
	creator: "QuantusTechnik",
	publisher: "QuantusTechnik",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://quantus-technik.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "QuantusTechnik - Manufacturing Solutions Partner",
		description:
			"Your productivity improvement partner for machine tools, automation, and manufacturing solutions",
		url: "https://quantus-technik.com",
		siteName: "QuantusTechnik",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "QuantusTechnik - Manufacturing Solutions",
			},
		],
		locale: "en_IN",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "QuantusTechnik - Manufacturing Solutions",
		description: "Your productivity improvement partner",
		images: ["/og-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [{ url: "/qt.png" }],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
		shortcut: ["/qt.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/qt.png" type="image/png" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header />

				{children}
				<Footer />
			</body>
		</html>
	);
}
