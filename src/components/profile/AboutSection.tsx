import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const AboutSection = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="about">
        <AccordionTrigger className="text-xl font-semibold">About</AccordionTrigger>
        <AccordionContent className="prose max-w-none">
          <p>Welcome to our learning platform! We are dedicated to providing high-quality educational content and fostering meaningful engagement within our community. Our mission is to make learning accessible, engaging, and effective for all students.</p>
          <p className="mt-4">Our platform offers:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Comprehensive lesson materials</li>
            <li>Interactive learning experiences</li>
            <li>Community engagement opportunities</li>
            <li>Progress tracking and analytics</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="privacy">
        <AccordionTrigger className="text-xl font-semibold">Privacy Policy</AccordionTrigger>
        <AccordionContent className="prose max-w-none">
          <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
          <h4 className="font-bold mt-4">Information We Collect</h4>
          <ul className="list-disc pl-6 mt-2">
            <li>Personal information (name, email, phone number)</li>
            <li>Educational progress and engagement data</li>
            <li>Usage information and analytics</li>
          </ul>
          <h4 className="font-bold mt-4">How We Use Your Information</h4>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide and improve our educational services</li>
            <li>To personalize your learning experience</li>
            <li>To communicate important updates and information</li>
          </ul>
          <h4 className="font-bold mt-4">Data Protection</h4>
          <p>We implement various security measures to protect your personal information and ensure it is not accessed, disclosed, altered, or destroyed without authorization.</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="terms">
        <AccordionTrigger className="text-xl font-semibold">Terms and Conditions</AccordionTrigger>
        <AccordionContent className="prose max-w-none">
          <p>By using our platform, you agree to these Terms and Conditions. Please read them carefully.</p>
          <h4 className="font-bold mt-4">User Responsibilities</h4>
          <ul className="list-disc pl-6 mt-2">
            <li>Maintain accurate and up-to-date profile information</li>
            <li>Respect intellectual property rights</li>
            <li>Follow community guidelines and engagement policies</li>
          </ul>
          <h4 className="font-bold mt-4">Platform Usage</h4>
          <ul className="list-disc pl-6 mt-2">
            <li>Access to content is for personal, non-commercial use</li>
            <li>Sharing account credentials is prohibited</li>
            <li>Users must not engage in disruptive behavior</li>
          </ul>
          <h4 className="font-bold mt-4">Content Guidelines</h4>
          <p>All content must be appropriate for an educational environment and respect intellectual property rights. Users are responsible for any content they share or create on the platform.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};