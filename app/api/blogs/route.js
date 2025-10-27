// app/api/blogs/route.js
import Parser from "rss-parser";

// CORS headers configuration
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request) {
	return new Response(null, {
		status: 200,
		headers: corsHeaders,
	});
}

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

	// Define feed URLs with their corresponding categories
	const feeds = [
		{
			url: "https://industrytoday.com/category/articles/aerospace/feed/",
			category: "Aerospace",
		},
		{
			url: "https://industrytoday.com/category/articles/automotive/feed/",
			category: "Automotive",
		},
		{
			url: "https://industrytoday.com/category/articles/engineering/feed/",
			category: "Engineering",
		},
		{
			url: "https://industrytoday.com/category/articles/technology/feed/",
			category: "Technology",
		},
		{
			url: "https://industrytoday.com/category/articles/supply-chain/feed/",
			category: "Supply Chain",
		},
	];

	try {
		// Fetch all feeds in parallel with their category tags
		const feedPromises = feeds.map(async ({ url, category }) => {
			try {
				const feed = await parser.parseURL(url);
				return { feed, category };
			} catch (error) {
				console.error(`Error fetching feed ${url}:`, error);
				return null;
			}
		});

		const feedResults = await Promise.all(feedPromises);

		// Combine all feed items with their assigned categories
		const allItems = feedResults
			.filter((result) => result !== null)
			.flatMap(({ feed, category }) =>
				feed.items.map((item) => ({ ...item, assignedCategory: category }))
			);

		// Remove duplicates based on link
		const uniqueItems = Array.from(
			new Map(allItems.map((item) => [item.link, item])).values()
		);

		// Transform feed items to match your blog structure
		const blogs = uniqueItems.map((item) => {
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

			// Use the assigned category from the feed URL
			const category = item.assignedCategory || "Articles";

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
				pubDate: item.pubDate, // Keep original date for sorting
			};
		});

		// Sort blogs by publication date (newest first)
		blogs.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

		// Remove the pubDate field before sending response
		blogs.forEach((blog) => delete blog.pubDate);

		return new Response(
			JSON.stringify({
				success: true,
				blogs: blogs,
				total: blogs.length,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					...corsHeaders,
				},
			}
		);
	} catch (error) {
		console.error("Error fetching RSS feeds:", error);
		return new Response(
			JSON.stringify({
				success: false,
				error: "Failed to fetch blogs",
				message: error.message,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					...corsHeaders,
				},
			}
		);
	}
}

// Add caching headers to reduce API calls
export const revalidate = 3600; // Revalidate every hour
