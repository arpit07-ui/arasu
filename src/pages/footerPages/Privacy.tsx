import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At Biodiversity Explorer ("we", "us", or "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website biodiversityexplorer.com (the "Site").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We may collect the following types of information:
            </p>
            <h3 className="text-xl font-medium text-gray-700 mt-4 mb-2">Personal Data</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Name and contact information (email, address, phone number)</li>
              <li>Account credentials (if you create an account)</li>
              <li>Payment information (if you make purchases)</li>
              <li>Demographic information</li>
            </ul>
            
            <h3 className="text-xl font-medium text-gray-700 mt-4 mb-2">Non-Personal Data</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Browser type and version</li>
              <li>IP address and general location</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We may use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information for improving our site</li>
              <li>To monitor usage of our site</li>
              <li>To detect, prevent and address technical issues</li>
              <li>For scientific research and biodiversity conservation purposes (anonymized data)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences</li>
                <li><strong>Analytics Cookies:</strong> Help us improve our services</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li><strong>Service Providers:</strong> With third parties who perform services for us</li>
              <li><strong>Business Transfers:</strong> In connection with any merger or sale of company assets</li>
              <li><strong>Scientific Research:</strong> Anonymized data may be shared with research institutions for biodiversity conservation</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data. However, no internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed">
              Your information may be transferred to — and maintained on — computers located outside of your country where data protection laws may differ. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Your Data Protection Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>The right to access, update or delete your information</li>
              <li>The right of rectification if your data is inaccurate</li>
              <li>The right to object to our processing of your data</li>
              <li>The right to request restriction of processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our Site is not intended for children under 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>By email: privacy@biodiversityexplorer.com</li>
              <li>By mail: 123 Conservation Way, Green City, GC 12345</li>
              <li>By phone: (123) 456-7890</li>
            </ul>
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

export default PrivacyPolicy;