"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import angleHeadsData from "../../datasets/angle.json";

export default function AngleHeadsDetailPage() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const products = angleHeadsData.categories.flatMap((cat) => cat.models);
	const product = products.find((p) => p.id === id);

	const [mainImage, setMainImage] = useState(
		product?.image || "/placeholder.jpg"
	);
	useEffect(() => {
		setMainImage(product?.image || "/placeholder.jpg");
	}, [product]);

	const getSpecs = (prod: any) => {
		if (!prod) return [];

		const specs: { name: string; value: string; }[] = [];
		const add = (label: string, value: any) => {
			if (!value) return;
			specs.push({
				name: label,
				value: Array.isArray(value) ? value.join(" / ") : String(value),
			});
		};

		add("Model", prod.name);
		add("Max RPM", prod.max_rpm);
		add("Torque (Nm)", prod.torque_nm);
		add("Weight (Kg)", prod.weight_kg);
		add("Features", prod.features);

		return specs;
	};

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
				Product not found.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white mb-10 max-w-5xl mx-auto py-8 px-6">
			<section className="bg-black text-white rounded p-6 mb-12">
				<h1 className="text-4xl font-bold mb-2">{product.name}</h1>
			</section>
			<section className="flex justify-center mb-12">
				<Image
					src={mainImage}
					alt={product.name}
					width={400}
					height={240}
					className="object-contain rounded shadow"
					unoptimized
				/>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">
					Technical Specifications
				</h2>
				<table className="w-full text-left text-sm border border-gray-200 rounded">
					<tbody>
						{getSpecs(product).map((spec, idx) => (
							<tr
								key={idx}
								className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
								<td className="py-2 px-4 font-medium text-gray-700">
									{spec.name}
								</td>
								<td className="py-2 px-4 text-gray-900">{spec.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>

			<section className="mt-10">
				<Button
					className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded"
					onClick={() => router.push(`/Contact?itemId=${product.name}`)}>
					Enquiry Now
				</Button>
			</section>
	
    	</div>
	
    );
}
