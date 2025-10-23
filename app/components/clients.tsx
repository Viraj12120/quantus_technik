"use client";

import { motion } from "framer-motion";

export default function Client() {
	const clients = [
		{
			name: "Manu Arora",
			role: "Tech Innovator & Entrepreneur",
			testimonial:
				"What a fantastic AI Proactiv AI is, I just love it. It has completely transformed the way I approach problems and develop solutions.",
			image: "/hero.jpeg",
		},
		{
			name: "Tyler Durden",
			role: "Creative Director & Business Owner",
			testimonial:
				"I made a soap with the help of AI, it was so easy to use. I'm so glad this happened because it revolutionized my entire business model.",
			image: "/hero.jpeg",
		},
		{
			name: "Alice Johnson",
			role: "Senior Software Engineer",
			testimonial:
				"This AI has transformed the way I work! It's like having a brilliant assistant who knows exactly what I need before I even ask.",
			image: "/hero.jpeg",
		},
	];

	const duplicatedClients = [...clients, ...clients];

	return (
		<section className="py-16 ">
			<div className="max-w-6xl mx-auto px-6 text-center">
				<h2 className="text-4xl text-gray-900 font-bold mb-8">Loved by Our Clients</h2>

				<div className="overflow-hidden">
					<motion.div
						className="flex gap-6"
						animate={{ x: ["0%", "-50%"] }}
						transition={{
							repeat: Infinity,
							repeatType: "loop",
							duration: 30,
							ease: "linear",
						}}>
						{duplicatedClients.map((client, index) => (
							<div
								key={index}
								className="flex-shrink-0 w-72 mb-8 mt-8  bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
								<img
									src={client.image}
									alt={client.name}
									className="w-16 h-16 rounded-full mb-2 object-cover"
								/>
								<p className="text-gray-600 text-sm italic mb-2 overflow-hidden text-ellipsis break-words">
									{client.testimonial}
								</p>
								<h3 className="text-md font-semibold">{client.name}</h3>
								<p className="text-xs text-gray-500">{client.role}</p>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
