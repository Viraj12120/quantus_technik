"use client";
import { useLottie } from "lottie-react";
import robotAnimation from "../../public/robo.json";

export default function Offersd() {
	const options = {
		animationData: robotAnimation,
		loop: true,
		autoplay: true,
	};

	const { View } = useLottie(options);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8">
			<div className="max-w-md w-full">
				{/* Lottie Animation */}
				<div className="w-64 h-64 mx-auto mb-8">{View}</div>

				{/* Content */}
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Special Offers
					</h1>
					<p className="text-lg text-gray-600 mb-8">
						Exciting deals and promotions coming soon!
					</p>
					<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
						<p className="text-yellow-800 font-medium">
							Stay tuned for our latest offers and discounts on premium
							manufacturing solutions.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
