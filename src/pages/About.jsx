import { HelmetProvider } from "react-helmet-async";

export default function About() {
  return (
    <>
      <HelmetProvider>
        <title>About ULN Blog</title>
        <meta name="description" content="Learn more about ULN Blog and our mission in tech." />
      </HelmetProvider>
      <div>
        <h1 className="text-4xl mb-6">About Us</h1>
        <p>ULN Blog is dedicated to providing the latest insights in technology, tutorials, and industry news. Our team of experts shares knowledge to help you stay ahead in the tech world.</p>
        <p className="mt-4">Founded in 2023, we aim to foster a community of learners and innovators.</p>
      </div>
    </>
  );
}