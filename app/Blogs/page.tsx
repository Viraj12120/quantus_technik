"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Loader2 } from "lucide-react";

// TypeScript Interfaces
interface Blog {
	title: string;
	excerpt: string;
	image: string;
	category: string;
	date: string;
	readTime: string;
	link: string;
	author: string;
}

interface ApiResponse {
	success: boolean;
	blogs: Blog[];
	total: number;
	error?: string;
	message?: string;
}

export default function Blogs() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] =
		useState<string>("All Articles");

	// Fixed categories matching Industry Today sections
	const categories: string[] = [
		"All Articles",
		"Aerospace",
		"Automotive",
		"Engineering",
		"Technology",
		"Supply Chain",
	];

	// Fetch blogs from API
	useEffect(() => {
		async function fetchBlogs() {
			try {
				setLoading(true);
				const response = await fetch("/api/blogs");
				const data: ApiResponse = await response.json();
				console.log("data", data);

				if (data.success) {
					setBlogs(data.blogs);
				} else {
					setError(data.error || "Failed to load blogs");
				}
			} catch (err) {
				setError("Failed to fetch blogs. Please try again later.");
				console.error("Error fetching blogs:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchBlogs();
	}, []);

	// Filter blogs by category
	const filteredBlogs: Blog[] =
		selectedCategory === "All Articles"
			? blogs
			: blogs.filter((blog) =>
					blog.category.toLowerCase().includes(selectedCategory.toLowerCase())
			  );

	// Get featured post (most recent)
	const featuredPost: Blog | null = filteredBlogs[0] || null;

	// Get popular articles (next 4 posts)
	const popularArticles: Blog[] = filteredBlogs.slice(1, 5);

	// Get recent posts
	const recentPosts: Blog[] = filteredBlogs.slice(5, 11);

	if (loading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-400" />
					<p className="text-gray-600">Loading latest articles...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center max-w-md">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (blogs.length === 0) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div className="text-center max-w-md">
					<p className="text-gray-600 mb-4">
						No articles available at the moment.
					</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
						Refresh
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section with Featured Post */}
			{featuredPost && (
				<section className="relative h-[600px] bg-black overflow-hidden">
					
					<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

					<div className="absolute inset-0 flex items-end">
						<div className="max-w-6xl mx-auto px-4 pb-16 text-white w-full">
							<div className="max-w-3xl">
								
								<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
									{featuredPost.title}
								</h1>
								<p className="text-lg text-gray-200 mb-6">
									{featuredPost.excerpt}
								</p>
								<div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
									<span>{featuredPost.date}</span>
									<span className="flex items-center gap-1">
										<Clock className="w-4 h-4" />
										{featuredPost.readTime}
									</span>
								</div>
								<a
									href={featuredPost.link}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group">
									Read Article
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</a>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Category Filter */}
			<section className="border-b border-gray-200 sticky top-16 bg-white z-40">
				<div className="max-w-6xl mx-auto px-4">
					<div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`whitespace-nowrap text-sm font-medium transition-colors pb-2 border-b-2 ${
									selectedCategory === category
										? "text-black border-black"
										: "text-gray-600 border-transparent hover:text-black hover:border-black"
								}`}>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Popular Articles */}
			{popularArticles.length > 0 && (
				<section className="max-w-6xl mx-auto px-4 py-16">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-3xl font-bold text-black">Popular Articles</h2>
						<a
							href="https://industrytoday.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1">
							View All
							<ArrowRight className="w-4 h-4" />
						</a>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{popularArticles.map((article, idx) => (
							<article key={idx} className="group cursor-pointer">
								<a
									href={article.link}
									target="_blank"
									rel="noopener noreferrer">
									<div className="relative h-64 overflow-hidden rounded-lg mb-4">
										<img
											src={article.image}
											alt={article.title}
											className="w-full h-full object-cover  group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
										/>
										<div className="absolute top-4 left-4">
											<span className="inline-block px-3 py-1 bg-white text-black text-xs font-medium rounded-full">
												{article.category}
											</span>
										</div>
									</div>
									<h3 className="text-xl font-bold text-black mb-2 group-hover:underline">
										{article.title}
									</h3>
									<p className="text-gray-600 text-sm mb-3 line-clamp-2">
										{article.excerpt}
									</p>
									<div className="flex items-center gap-4 text-xs text-gray-500">
										<span>{article.date}</span>
										<span className="flex items-center gap-1">
											<Clock className="w-3 h-3" />
											{article.readTime}
										</span>
									</div>
								</a>
							</article>
						))}
					</div>
				</section>
			)}

			{/* Latest Articles */}
			{recentPosts.length > 0 && (
				<section className="bg-gray-50 py-16">
					<div className="max-w-6xl mx-auto px-4">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-3xl font-bold text-black">Latest Articles</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{recentPosts.map((post, idx) => (
								<article
									key={idx}
									className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
									<a href={post.link} target="_blank" rel="noopener noreferrer">
										<div className="relative h-48 overflow-hidden">
											<img
												src={post.image}
												alt={post.title}
												className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-500"
											/>
										</div>
										<div className="p-5">
											<span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-3">
												{post.category}
											</span>
											<h3 className="text-lg font-bold text-black mb-2 group-hover:underline line-clamp-2">
												{post.title}
											</h3>
											<p className="text-xs text-gray-500">{post.date}</p>
										</div>
									</a>
								</article>
							))}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
