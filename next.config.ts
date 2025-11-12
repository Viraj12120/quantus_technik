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
		],
	},
};

export default nextConfig;

