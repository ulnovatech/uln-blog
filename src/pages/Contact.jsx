import { HelmetProvider } from "react-helmet-async";

export default function Contact() {
  return (
    <>
      <HelmetProvider>
        <title>Contact ULN Blog</title>
        <meta name="description" content="Get in touch with the ULN Blog team." />
      </HelmetProvider>
      <div>
        <h1 className="text-4xl mb-6">Contact Us</h1>
        <p>Have questions or feedback? Reach out to us at contact@ulnblog.com.</p>
        <div className="mt-8 space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-4 border rounded" />
          <input type="email" placeholder="Your Email" className="w-full p-4 border rounded" />
          <textarea placeholder="Your Message" className="w-full p-4 border rounded h-32" />
          <button type="button" className="primary-button">Send Message</button>
        </div>
      </div>
    </>
  );
}