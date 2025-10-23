"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
}

export default function Contact() {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (formData: FormData) => {
		const { firstName, lastName, email, message } = formData;

		// Construct the email body
		const subject = encodeURIComponent(
			`Enquiry Form  from ${firstName} ${lastName}`
		);
		const body = encodeURIComponent(
			`Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
		);

		// Construct mailto link
		const mailtoLink = `mailto:rajesh.gaikwaad@quantus-technik.com?subject=${subject}&body=${body}`;

		// Open default mail client
		window.location.href = mailtoLink;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navbar */}
			<div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-amber-600 rounded-full"></div>
					<span className="font-semibold text-gray-800 text-lg">
						Quantus Technik
					</span>
				</div>
				<div className="flex gap-6 text-sm font-medium">
					<button className="hover:text-amber-500 transition">Features</button>
					<button className="hover:text-amber-500 transition">Resources</button>
					<button className="hover:text-amber-500 transition">Company</button>
					<button className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition">
						Contact us
					</button>
				</div>
			</div>

			{/* Main Section */}
			<div className="max-w-7xl mx-auto px-6 py-10">
				<div className="grid md:grid-cols-2 gap-12 items-start">
					{/* Left Content */}
					<div>
						<h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
							Get in —<br /> touch with us
						</h1>
						<p className="text-gray-600 mb-6 text-sm sm:text-base">
							We're here to help! Whether you have a question about our
							products, need assistance with your machining requirements, or
							want to schedule a demonstration, our team is ready to assist you.
						</p>

						<div className="space-y-6 text-sm">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h3 className="font-semibold text-base mb-1">
										Head Office - Pune
									</h3>
									<p className="text-gray-600 leading-relaxed">
										B4-401, The Crest Malpani Estate
										<br />
										Pimple Saudagar, Pune – 411027
										<br />
										Maharashtra, India
									</p>
									<p className="mt-1">
										<span className="font-medium">Contact:</span> Mr. Rajesh
										Gaikwad
									</p>
									<p>
										<span className="font-medium">Phone:</span> +91 95614-11918
									</p>
								</div>

								<div>
									<h3 className="font-semibold text-base mb-1">
										Regional Office - Bangalore
									</h3>
									<p className="text-gray-600 leading-relaxed">
										#131 A-Block, United Crossandra
										<br />
										Horamavu Agara, Bangalore – 560043
										<br />
										Karnataka, India
									</p>
									<p className="mt-1">
										<span className="font-medium">Contact:</span> Mr. Anish R.
									</p>
									<p>
										<span className="font-medium">Phone:</span> +91 80889-09933
									</p>
								</div>
							</div>

							<p className="text-gray-500 mt-4">
								Available Monday to Friday, 9 AM - 6 PM IST
							</p>

							<div className="mt-4 flex justify-center md:justify-start sm:justify-center">
								<Link href="/About">
									<button className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition flex items-center gap-2 text-sm">
										Learn More
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								</Link>
							</div>
						</div>
					</div>

					{/* Compact Form */}
					<div className="bg-white p-10 sm:p-12 rounded-2xl shadow-sm">
						<div className="grid md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									First Name *
								</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									placeholder="Enter your first name..."
									className="w-full px-4 py-3.5 bg-gray-50 rounded-lg border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Last Name *
								</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									placeholder="Enter your last name..."
									className="w-full px-4 py-3.5 bg-gray-50 rounded-lg border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
								/>
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium mb-2">Email *</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Enter your email..."
								className="w-full px-4 py-3.5 bg-gray-50 rounded-lg border border-gray-200 
                 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
							/>
						</div>

						<div className="mb-6">
							<label className="block text-sm font-medium mb-2">
								How Can We Help You? *
							</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Write your message..."
								rows={5} // increased rows for larger height
								className="w-full px-4 py-3.5 bg-gray-50 rounded-lg border border-gray-200 
                 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
							/>
						</div>

						<button
							type="button"
							onClick={() => handleSubmit(formData)}
							className="w-full bg-gray-900 text-white px-6 py-3 rounded-full 
               hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm font-medium cursor cursor-pointer">
							Send Message
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
