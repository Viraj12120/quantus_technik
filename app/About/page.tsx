
import Image from "next/image";

export const metadata = {
	title: "About Us - Our Story & Manufacturing Expertise",
	description:
		"Founded in 2020, Quantus Technik brings decades of engineering expertise with global brands like GROB, ZOLLER, HWACHEON, ALZMETALL. Your trusted manufacturing solutions partner in India.",
	keywords: [
		"Quantus Technik about",
		"manufacturing experts",
		"engineering solutions",
		"industrial partners",
		"machine tool distributors",
	],
	openGraph: {
		title: "About Quantus Technik - Engineering Excellence Since 2020",
		description:
			"Learn about our journey and expertise in manufacturing solutions",
		images: ["/og-about.jpg"],
		url: "https://quantus-technik.com/about",
	},
	alternates: {
		canonical: "/about",
	},
};

export default function AboutUs() {
	const team = [
		{
			id: 1,
			name: "Rajesh Gaikwad",
			position: "Founder & CEO",
			image: "/rajesh.jpg",
		},
		{
			id: 2,
			name: "Anish Ramachandran",
			position: "Partner",
			image: "/anish.jpg",
		},
		{
			id: 3,
			name: "Adinath Parmaj",
			position: "Senior Engineer",
			image: "/adinath.png",
		},
		{
			id: 4,
			name: "Rahul Shinde",
			position: "Lead Service",
			image: "/rahul.jpg",
		},
	];

	return (
		<section className="bg-white  text-gray-800">
			<div className="w-full mx-auto lg:px-24 px-6 sm:px-8 lg:px-12 py-24 space-y-32">
				{/* Hero Section */}
				<div className="relative text-center space-y-5">
					<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
						About <span className="text-gray-900">Quantus Technik</span>
					</h1>
					<p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
						Revolutionizing Indian manufacturing with world-class machine tool
						technology, precision craftsmanship, and automation excellence.
					</p>

					{/* Decorative background element */}
					<div className="absolute inset-0 -z-10  from-gray-50 via-white to-transparent rounded-3xl" />
				</div>

				{/* Our Story */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
							Our Story
						</h2>
						<p className="text-gray-600 leading-relaxed">
							Founded in June 2020, <strong>Quantus Technik</strong> was built
							on a simple vision — to bring world-class machine tool technology
							to India. With decades of experience in industrial manufacturing,
							our team is redefining engineering standards through innovation
							and expertise.
						</p>

						<div className="grid grid-cols-3 gap-6 pt-6">
							<div>
								<h3 className="text-3xl font-bold text-gray-900">5+</h3>
								<p className="text-sm text-gray-500">Years of Legacy</p>
							</div>
							<div>
								<h3 className="text-3xl font-bold text-gray-900">10+</h3>
								<p className="text-sm text-gray-500">Global Partners</p>
							</div>
							<div>
								<h3 className="text-3xl font-bold text-gray-900">100%</h3>
								<p className="text-sm text-gray-500">Client Satisfaction</p>
							</div>
						</div>
					</div>

					<div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
						<Image
							src="/abc.jpg"
							alt="Our Story"
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Vision & Mission */}
				<div className="bg-gray-50 rounded-3xl p-10 md:p-14 space-y-10">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
							<Image
								src="/cd.jpg"
								alt="Vision & Mission"
								fill
								className="object-cover"
							/>
						</div>

						<div className="space-y-8">
							<div>
								<h2 className="text-3xl font-semibold text-gray-900">
									Our Vision
								</h2>
								<p className="text-gray-600 mt-2 leading-relaxed">
									To become India’s most trusted one-stop provider for metal
									cutting, tool management, and smart manufacturing solutions —
									empowering industries to compete globally.
								</p>
							</div>

							<div>
								<h2 className="text-3xl font-semibold text-gray-900">
									Our Mission
								</h2>
								<ul className="text-gray-600 space-y-2 mt-3 list-disc list-inside">
									<li>
										Deliver advanced manufacturing solutions from leading global
										brands
									</li>
									<li>
										Provide expert guidance across every stage of production
									</li>
									<li>
										Enable automation and digital transformation for efficiency
									</li>
									<li>Build long-term partnerships that drive innovation</li>
									<li>
										Bridge the gap between global innovation and Indian industry
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Team Section */}
				<div className="text-center space-y-10">
					<h2 className="text-4xl font-bold text-gray-900">
						Our Team & Commitment
					</h2>

					<p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Our team blends deep technical know-how with strategic insight —
						driving excellence in every machine, every project, and every client
						relationship.
					</p>

					{/* ✅ Centered, evenly spaced, properly aligned grid */}
					<div
						className="
		grid 
		grid-cols-1 
		sm:grid-cols-2 
		md:grid-cols-3 
		lg:grid-cols-4 
		gap-12 
		justify-items-center
		mt-10
	">
						{team.map((member) => (
							<div
								key={member.id}
								className="text-center transition-all duration-300 p-4">
								{/* ✅ Perfectly rounded image with object-cover */}
								<div className="relative aspect-square w-40 mx-auto rounded-full overflow-hidden shadow-lg">
									<Image
										src={member.image}
										alt={member.name}
										fill
										className="object-cover object-center transition-transform duration-500 hover:scale-110"
									/>
								</div>

								<h3 className="text-xl font-semibold text-gray-900 mt-4">
									{member.name}
								</h3>

								<p className="text-sm text-gray-500">{member.position}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
