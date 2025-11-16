import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.hwacheon.com",
			},
			{
				protocol: "https",
				hostname: "www.grobgroup.com",
			},
			{ protocol: "https", hostname: "www.jtekt.co.jp" },
			{
				protocol: "https",
				hostname: "marvel-b1-cdn.bc0a.com",
			},
			{
				protocol: "https",
				hostname: "toyoda.jtekt.co.jp",
			},
			{
				protocol: "https",
				hostname: "cdn.prod.website-files.com",
			},
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
			},
			{
				protocol: "https",
				hostname: "www.foxvalleymetrology.com",
			},
			{
				protocol: "https",
				hostname: "www.mst-corp.co.jp",
			},
			{
				protocol: "http",
				hostname: "www.gerardispa.com",
			},
			{
				protocol: "https",
				hostname: "www.kencnc.com",
				pathname: "/assets/source/Images_Product/**",
			},
			{
				protocol: "https",
				hostname: "kencnc.com",
				pathname: "/assets/source/Images_Product/**",
			},
			{
				protocol: "https",
				hostname: "alzmetall.de",
				pathname: "/wp-content/uploads/**",
			},
		],
	},
	reactStrictMode: true,
	experimental: {
		optimizePackageImports: [],
	},
};

export default nextConfig;
