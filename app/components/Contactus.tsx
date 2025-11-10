"use client";

import { Suspense } from "react";
import Contact from "../components/contact";

export default function ContactPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Contact />
		</Suspense>
	);
}
