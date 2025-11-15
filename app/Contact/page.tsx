import ContactPage from "../components/Contactus";

export const metadata = {
	title: "Contact QuantusTechnik | Pune & Bangalore Offices",
	description:
		"Get in touch with QuantusTechnik. Contact our Pune head office or Bangalore regional office for machine tools, automation solutions, and manufacturing equipment inquiries.",
	keywords: [
		"contact QuantusTechnik",
		"Pune office",
		"Bangalore office",
		"machine tool inquiries",
		"technical support",
		"sales contact",
	],
	openGraph: {
		title: "Contact QuantusTechnik - Manufacturing Solutions",
		description:
			"Reach out to our engineering experts for your manufacturing needs",
		images: ["/og-contact.jpg"],
		url: "https://quantus-technik.com/contact",
	},
	alternates: {
		canonical: "/contact",
	},
};

export default function ContactsPage() {
	return <ContactPage />;
}
