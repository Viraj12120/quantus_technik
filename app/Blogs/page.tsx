"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import Link from "next/link";

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

	// Get popular articles (split into main and side)
	const mainPopularArticle: Blog | null = filteredBlogs[1] || null;
	const sidePopularArticles: Blog[] = filteredBlogs.slice(2, 5);

	// Get recent posts in grid format
	const recentPosts: Blog[] = filteredBlogs.slice(5, 11);

	// Get project posts
	const projectPosts: Blog[] = filteredBlogs.slice(11, 14);

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
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section with Featured Post */}
			{featuredPost && (
				<section className="relative h-[70vh] min-h-[500px] overflow-hidden">
					<div className="absolute inset-0 bg-black to-transparent"></div>

					<div className="absolute inset-0 flex flex-col justify-end">
						<div className="max-w-7xl mx-auto px-6 pb-16 text-white w-full">
							<div className="max-w-2xl">
								<div className="text-sm mb-4 flex items-center gap-2">
									<span>Home</span>
									<span>›</span>
									<span>{featuredPost.category}</span>
								</div>
								<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
									{featuredPost.title}
								</h1>
								<div className="flex items-center gap-4 mb-6">
									<button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
										Read More
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Bottom category links */}
					<div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
						<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white text-sm">
							<button className="hover:underline">
								{featuredPost.category}
							</button>
						</div>
					</div>
				</section>
			)}

			{/* Category Filter */}
			<section className="bg-white border-b border-gray-200 sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex items-center justify-between py-4">
						<span className="text-sm text-gray-500">{selectedCategory}</span>
						<div className="flex gap-8 overflow-x-auto">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`whitespace-nowrap text-sm font-medium transition-colors ${
										selectedCategory === category
											? "text-black"
											: "text-gray-500 hover:text-black"
									}`}>
									{category}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Popular Articles Section */}
			<section className="max-w-7xl mx-auto px-6 py-16">
				<div className="flex items-center justify-between mb-8">
					<div>
						<p className="text-sm text-gray-500 mb-2">{selectedCategory}</p>
						<h2 className="text-4xl font-bold text-black">Popular Articles</h2>
					</div>
					<div className="text-sm text-gray-600">
						<p>
							Figura & Fync has been using the coastline knowledge to promote
							native
						</p>
						<p>wildlife and to maintain sustainable.</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Main Large Article */}
					{mainPopularArticle && (
						<article className="group cursor-pointer">
							<a
								href={mainPopularArticle.link}
								target="_blank"
								rel="noopener noreferrer">
								<div className="relative h-96 overflow-hidden rounded-2xl mb-4">
									<img
										src={mainPopularArticle.image}
										alt={mainPopularArticle.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<h3 className="text-2xl font-bold text-black mb-3 group-hover:underline">
									{mainPopularArticle.title}
								</h3>
								<p className="text-gray-600 text-sm mb-3">
									{mainPopularArticle.excerpt.substring(0, 150)}...
								</p>
								<span className="text-sm text-gray-500">
									{mainPopularArticle.category}
								</span>
							</a>
						</article>
					)}

					{/* Side Articles */}
					<div className="space-y-6">
						{sidePopularArticles.map((article, idx) => (
							<article key={idx} className="group cursor-pointer flex gap-4">
								<a
									href={article.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex gap-4 w-full">
									<div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl">
										<img
											src={article.image}
											alt={article.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<div className="flex-1">
										<h4 className="text-lg font-bold text-black mb-2 group-hover:underline line-clamp-2">
											{article.title}
										</h4>
										<p className="text-xs text-gray-500 mb-2 line-clamp-2">
											{article.excerpt.substring(0, 100)}...
										</p>
										<span className="text-xs text-gray-500">
											{article.category}
										</span>
									</div>
								</a>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Latest Articles Grid */}
			<section className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex items-center justify-between mb-8">
						<div>
							<p className="text-sm text-gray-500 mb-2">{selectedCategory}</p>
							<h2 className="text-4xl font-bold text-black">Latest Articles</h2>
						</div>
						<div className="text-sm text-gray-600">
							<p>
								Figura & Fync has been using the coastline knowledge to promote
							</p>
							<p>native wildlife and to maintain sustainable.</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{recentPosts.map((post, idx) => (
							<article
								key={idx}
								className="group cursor-pointer bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
								<a href={post.link} target="_blank" rel="noopener noreferrer">
									<div className="relative h-56 overflow-hidden">
										<img
											src={post.image}
											alt={post.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold text-black mb-3 group-hover:underline line-clamp-2">
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

			{/* Project Section */}
			<section className="max-w-7xl mx-auto px-6 py-16">
				<div className="flex items-center justify-between mb-8">
					<div>
						<p className="text-sm text-gray-500 mb-2">Our Project</p>
						<h2 className="text-4xl font-bold text-black">
							Discover Our Global
							<br />
							Conservation Projects
						</h2>
					</div>
					<Link href={`https://industrytoday.com/`}>
						<button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors cursor cursor-pointer">
							See More
						</button>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{projectPosts.map((project, idx) => (
						<article
							key={idx}
							className="group cursor-pointer relative h-96 overflow-hidden rounded-2xl">
							<a href={project.link} target="_blank" rel="noopener noreferrer">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
								<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
									<h3 className="text-xl font-bold mb-2 group-hover:underline">
										{project.title}
									</h3>
									<p className="text-sm text-gray-200 line-clamp-2">
										{project.excerpt.substring(0, 100)}...
									</p>
								</div>
							</a>
						</article>
					))}
				</div>
			</section>
		</div>
	);
}
