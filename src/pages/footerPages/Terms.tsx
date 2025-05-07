import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-700 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Terms and Conditions
          </h1>
          <p className="text-green-100 text-center mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Biodiversity Explorer ("the Website"). These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using the Website, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><span className="font-medium">"Content"</span> refers to all text, images, data, information, and other materials available on the Website.</li>
              <li><span className="font-medium">"User"</span> means any person who accesses or uses the Website.</li>
              <li><span className="font-medium">"Services"</span> means all services provided through the Website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By using this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Intellectual Property Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              All Content on this Website, unless otherwise noted, is the property of Biodiversity Explorer or its content suppliers and protected by international copyright and intellectual property laws. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Biodiversity data</li>
              <li>Species information</li>
              <li>Photographs and illustrations</li>
              <li>Research materials</li>
              <li>Website design and layout</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Permitted Use</h2>
            <p className="text-gray-600 leading-relaxed">
              You may use the Website and its Content for:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Personal, non-commercial purposes</li>
              <li>Educational and research purposes</li>
              <li>Conservation initiatives</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-2">
              with proper attribution to Biodiversity Explorer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-600 leading-relaxed">
              You may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Use the Content for commercial purposes without express written permission</li>
              <li>Modify, reproduce, or redistribute Content without authorization</li>
              <li>Use automated systems (e.g., bots, scrapers) to extract data</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Harm or exploit biodiversity information for illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Accuracy</h2>
            <p className="text-gray-600 leading-relaxed">
              While we strive for accuracy, biodiversity information may change. We do not guarantee the completeness or accuracy of the Content. Users should verify critical information through additional sources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. User Contributions</h2>
            <p className="text-gray-600 leading-relaxed">
              If the Website allows user contributions:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>You retain ownership but grant us a license to use the content</li>
              <li>You warrant that you have necessary rights to share the content</li>
              <li>We may remove any content that violates these Terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. Our Privacy Policy, which explains how we collect and use your information, is incorporated into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Links to Third-Party Sites</h2>
            <p className="text-gray-600 leading-relaxed">
              The Website may contain links to external sites. We are not responsible for the content or practices of these sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              The Website is provided "as is" without warranties of any kind. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>The Website will be error-free</li>
              <li>The Content will be accurate or complete</li>
              <li>The Website will be available without interruption</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Biodiversity Explorer shall not be liable for any damages resulting from:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Use or inability to use the Website</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Any other matter relating to the Website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless Biodiversity Explorer from any claims arising from your use of the Website or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may modify these Terms at any time. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by the laws of [Your Country/State] without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">16. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, contact us at:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Email: contact@biodiversityexplorer.com</li>
              <li>Address: 123 Conservation Way, Green City, GC 12345</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">17. Entire Agreement</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms constitute the entire agreement between you and Biodiversity Explorer regarding the Website.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Biodiversity Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;