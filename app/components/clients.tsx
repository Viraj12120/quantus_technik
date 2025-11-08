"use client";

const logos = [
	{ id: 1, name: "HWACHEON", src: "/1.png" },
	{ id: 2, name: "KEN ICHI", src: "/2.png" },
	{ id: 3, name: "GERARDI", src: "/3.png" },
	{ id: 4, name: "NIDEC", src: "/4.png" },
	{ id: 5, name: "WFL", src: "/5.png" },
	{ id: 6, name: "ZOLLER", src: "/6.png" },
	{ id: 7, name: "JTEKT", src: "/7.png" },
	{ id: 8, name: "ALZMETALL", src: "/8.png" },
	{ id: 9, name: "AUTOMATE", src: "/9.png" },
	{ id: 10, name: "GROB", src: "/10.png" },
	{ id: 11, name: "WENZEL", src: "/11.png" },
	{ id: 12, name: "MST", src: "/12.png" },
	{ id: 13, name: "LOGO13", src: "/13.png" },
	{ id: 14, name: "LOGO14", src: "/14.png" },
	{ id: 15, name: "LOGO15", src: "/15.png" },
];

export default function Client() {
	return (
		<section className="w-full mt-14 flex flex-col items-center justify-center bg-white py-2 px-6 md:px-16">
			<div className="flex justify-center w-full max-w-6xl mb-16">
				<h2 className=" md:text-3xl font-semibold text-gray-900">
					Our Esteemed
				</h2>
			</div>
			<div className="grid grid-cols-3 md:grid-cols-5 gap-10 max-w-6xl w-full">
				{logos.map((logo) => (
					<div key={logo.id} className="flex justify-center items-center">
						<img
							src={logo.src}
							className="max-h-24 object-contain"
							loading="lazy"
						/>
					</div>
				))}
			</div>
		</section>
	);
}
