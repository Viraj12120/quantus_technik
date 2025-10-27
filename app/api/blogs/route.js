// app/api/blogs/route.js
import Parser from "rss-parser";

export async function GET(request) {
	const parser = new Parser({
		customFields: {
			item: [
				["media:content", "mediaContent"],
				["media:thumbnail", "mediaThumbnail"],
				["content:encoded", "contentEncoded"],
			],
		},
	});

	try {
		// Industry Today RSS feed URL
		const feed = await parser.parseURL("https://industrytoday.com/feed/");

		// Transform feed items to match your blog structure
		const blogs = feed.items.map((item) => {
			// Extract image from various possible sources
			let image =
				"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80"; // fallback

			if (item.mediaContent && item.mediaContent.$?.url) {
				image = item.mediaContent.$.url;
			} else if (item.mediaThumbnail && item.mediaThumbnail.$?.url) {
				image = item.mediaThumbnail.$.url;
			} else if (item.enclosure && item.enclosure.url) {
				image = item.enclosure.url;
			} else if (item.contentEncoded) {
				// Try to extract first image from content
				const imgMatch = item.contentEncoded.match(/<img[^>]+src="([^">]+)"/);
				if (imgMatch) image = imgMatch[1];
			}

			// Extract category
			const category =
				item.categories && item.categories.length > 0
					? item.categories[0]
					: "Industry Insights";

			// Calculate read time (rough estimate based on content length)
			const contentLength =
				item.contentSnippet?.length || item.content?.length || 0;
			const readTime =
				Math.max(3, Math.ceil(contentLength / 1000)) + " min read";

			return {
				title: item.title,
				excerpt: item.contentSnippet || item.content?.substring(0, 200) + "...",
				image: image,
				category: category,
				date: new Date(item.pubDate).toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				}),
				readTime: readTime,
				link: item.link,
				author: item.creator || item.author || "Industry Today",
			};
		});

		return Response.json({
			success: true,
			blogs: blogs,
			total: blogs.length,
		});
	} catch (error) {
		console.error("Error fetching RSS feed:", error);
		return Response.json(
			{
				success: false,
				error: "Failed to fetch blogs",
				message: error.message,
			},
			{ status: 500 }
		);
	}
}

// Add caching headers to reduce API calls
export const revalidate = 3600; // Revalidate every hour
