"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface FormData {
	firstName: string;
	lastName: string;
	companyName: string;
	city: string;
	phoneNo: string;
	email: string;
	message: string;
	model: string;
}

export default function Contact() {
	const searchParams = useSearchParams();
	const itemId = searchParams.get("itemId");

	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		companyName: "",
		city: "",
		phoneNo: "",
		email: "",
		message: "",
		model: itemId || "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (formData: FormData) => {
		const {
			firstName,
			lastName,
			companyName,
			city,
			phoneNo,
			email,
			model,
			message,
		} = formData;

		const subject = encodeURIComponent(
			`Enquiry Form from ${firstName} ${lastName}`
		);

		const body = encodeURIComponent(
			`Product Model / ID: ${model}\n\n` +
				`Name: ${firstName} ${lastName}\n` +
				`Company: ${companyName}\n` +
				`City: ${city}\n` +
				`Phone: ${phoneNo}\n` +
				`Email: ${email}\n\n` +
				`Message:\n${message}`
		);

		const mailtoLink = `mailto:sales@quantusteknik.com?subject=${subject}&body=${body}`;

		window.location.href = mailtoLink;
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-6 py-28">
				<div className="grid md:grid-cols-2 gap-12 items-start">
					{/* Left Section */}
					<div>
						<h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
							Get in —
							<br /> touch with us
						</h1>

						<p className="text-gray-600 mb-6 text-sm sm:text-base">
							We're here to help! Whether you have questions about our products,
							machining requirements, or want to schedule a demonstration — our
							team is ready to assist.
						</p>

						<div className="space-y-6 text-sm">
							{/* Office Locations */}
							<div className="flex flex-col md:flex-row md:flex-wrap gap-6">
								<div className="flex flex-col md:flex-row gap-6 w-full md:justify-between">
									{/* Pune */}
									<div className="md:w-1/2">
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
											U. Gaikwad
										</p>
										<p>
											<span className="font-medium">Phone:</span> +91
											92255-13636
										</p>
									</div>

									{/* Bangalore */}
									<div className="md:w-1/2">
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
											<span className="font-medium">Contact:</span> Mr. Anish
											Ramachandran
										</p>
										<p>
											<span className="font-medium">Phone:</span> +91
											80889-09933
										</p>
									</div>
								</div>

								{/* Kolhapur */}
								<div className="w-full flex  md:justify-start">
									<div className="md:w-1/2">
										<h3 className="font-semibold text-base mb-1">
											Regional Sales - Kolhapur
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Office : MIDC Shiroli
											<br />
											Kolhapur – 416005
											<br />
											Maharashtra, India
										</p>
										<p className="mt-1">
											<span className="font-medium">Contact:</span> Mr. Adinath
											Parmaj
										</p>
										<p>
											<span className="font-medium">Phone:</span> +91
											+91 91753-36367
										</p>
									</div>
								</div>
							</div>

							<p className="text-gray-500 mt-4">
								Available Monday to Saturday, 9 AM - 6 PM IST
							</p>
						</div>

						<div className="mt-4 flex justify-start">
							<Link href="/About">
								<button className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition flex items-center gap-2 text-sm cursor-pointer">
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

					{/* Form Section */}
					<div className="bg-white p-10 sm:p-12 rounded-2xl shadow-sm">
						<div className="grid md:grid-cols-2 gap-4 mb-4">
							{/* First Name */}
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
									className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
								/>
							</div>

							{/* Last Name */}
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
									className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
								/>
							</div>
						</div>

						{/* Company & City */}
						<div className="grid md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Company Name
								</label>
								<input
									type="text"
									name="companyName"
									value={formData.companyName}
									onChange={handleChange}
									placeholder="Enter your company name..."
									className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">City</label>
								<input
									type="text"
									name="city"
									value={formData.city}
									onChange={handleChange}
									placeholder="Enter your city..."
									className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
								/>
							</div>
						</div>

						{/* Phone & Email */}
						<div className="grid md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Phone Number *
								</label>
								<input
									type="tel"
									name="phoneNo"
									value={formData.phoneNo}
									onChange={handleChange}
									placeholder="Enter your phone number..."
									className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Email *
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Enter your email..."
									className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
								/>
							</div>
						</div>

						{/* Product Model — show only if query exists */}
						{itemId && (
							<div className="mb-4">
								<label className="block text-sm font-medium mb-2">
									Product Model
								</label>
								<input
									type="text"
									name="model"
									value={formData.model}
									disabled
									className="w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 text-sm cursor-not-allowed"
								/>
							</div>
						)}

						{/* Message */}
						<div className="mb-6">
							<label className="block text-sm font-medium mb-2">
								How Can We Help You? *
							</label>
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows={5}
								placeholder="Write your message..."
								className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:text-gray-500 text-sm"
							/>
						</div>

						{/* Submit Button */}
						<button
							type="button"
							onClick={() => handleSubmit(formData)}
							className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm font-medium cursor-pointer">
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
