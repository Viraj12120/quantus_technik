import ContactPage from "../components/Contactus";



export const metadata = {
  title: 'Contact Quantus Technik | Pune & Bangalore Offices',
  description: 'Get in touch with Quantus Technik. Contact our Pune head office or Bangalore regional office for machine tools, automation solutions, and manufacturing equipment inquiries.',
  keywords: ['contact Quantus Technik', 'Pune office', 'Bangalore office', 'machine tool inquiries', 'technical support', 'sales contact'],
  openGraph: {
    title: 'Contact Quantus Technik - Manufacturing Solutions',
    description: 'Reach out to our engineering experts for your manufacturing needs',
    images: ['/og-contact.jpg'],
    url: 'https://quantus-technik.com/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}


export default function ContactsPage() {
	return (
		<ContactPage/>
	);
}
