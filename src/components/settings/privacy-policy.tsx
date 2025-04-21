
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrivacyPolicy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none space-y-6">
        <section>
          <h2>1. Who We Are</h2>
          <p>Lynera.ai is a global platform headquartered in India and operating internationally, with users across Europe, North America, Asia, and other regions. We comply with applicable privacy laws, including:</p>
          <ul>
            <li>General Data Protection Regulation (GDPR) – European Union</li>
            <li>California Consumer Privacy Act (CCPA/CPRA) – United States</li>
            <li>Digital Personal Data Protection Act (DPDP) – India</li>
            <li>UK Data Protection Act</li>
            <li>Singapore PDPA, South Korea PIPA, and other applicable laws</li>
          </ul>
        </section>

        <section>
          <h2>2. What Information We Collect</h2>
          <h3>a) Personal Identifiers</h3>
          <ul>
            <li>Full name, email address, phone number</li>
            <li>Account login credentials (hashed)</li>
            <li>Organization, job title (if applicable)</li>
          </ul>

          <h3>b) Device and Usage Information</h3>
          <ul>
            <li>IP address, browser type, device information</li>
            <li>Referring URLs, time zone, and location (approximate)</li>
            <li>Pages visited, time spent, and learning activity data</li>
          </ul>

          <h3>c) Payment and Transaction Data</h3>
          <ul>
            <li>Transaction amount, subscription plan</li>
            <li>Payment method details (processed securely by third-party providers)</li>
          </ul>

          <h3>d) Learning Profile Data</h3>
          <ul>
            <li>Course enrollments, progress, test results</li>
            <li>AI interactions, certification data</li>
          </ul>
        </section>

        <section>
          <h2>3. Legal Bases for Processing (GDPR Compliance)</h2>
          <p>For users in the European Union, we process personal data based on:</p>
          <ul>
            <li>Your consent (e.g., marketing, optional data collection)</li>
            <li>Performance of a contract (e.g., delivering educational services)</li>
            <li>Legitimate interest (e.g., improving platform security and performance)</li>
            <li>Compliance with legal obligations (e.g., tax or regulatory)</li>
          </ul>
        </section>

        <section>
          <h2>4. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and personalize our Services</li>
            <li>Deliver certifications and monitor progress</li>
            <li>Respond to support inquiries</li>
            <li>Send updates, course information, or newsletters (only with your consent)</li>
            <li>Monitor platform performance and prevent fraud</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
        </section>

        <section>
          <h2>5. Your Privacy Rights</h2>
          
          <h3>🇪🇺 EU/UK Residents (GDPR)</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access, rectify, or delete your data</li>
            <li>Restrict or object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h3>🇺🇸 California Residents (CCPA/CPRA)</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Know what data we collect and why</li>
            <li>Request deletion of your data</li>
            <li>Opt out of "sale" or "sharing" of personal data (we do not sell your data)</li>
            <li>Non-discrimination for exercising your rights</li>
          </ul>

          <h3>🇮🇳 India (DPDP Act)</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access and correct your personal data</li>
            <li>Nominate a data fiduciary in case of disability or death</li>
            <li>Request deletion or withdrawal of consent</li>
          </ul>

          <h3>🌏 Other Regions</h3>
          <p>We extend similar rights to users globally, subject to local laws.</p>
          <p>To exercise your rights, email us at privacy@lynera.ai.</p>
        </section>

        <section>
          <h2>6. Cross-Border Data Transfers</h2>
          <p>Your data may be stored or processed outside your country, including in the United States, India, or the EU. We use standard contractual clauses and data transfer agreements to ensure your data remains protected and compliant with international privacy standards.</p>
        </section>

        <section>
          <h2>7. Data Retention</h2>
          <p>We retain personal data only as long as necessary to:</p>
          <ul>
            <li>Deliver services</li>
            <li>Comply with legal and contractual obligations</li>
            <li>Resolve disputes and enforce our agreements</li>
          </ul>
          <p>You may request data deletion at any time, subject to our legal retention obligations.</p>
        </section>

        <section>
          <h2>8. Security Measures</h2>
          <p>We implement appropriate technical and organizational security measures to protect your data, including:</p>
          <ul>
            <li>End-to-end encryption (TLS/SSL)</li>
            <li>Secure server infrastructure</li>
            <li>Access controls and regular audits</li>
            <li>Data minimization and anonymization (where possible)</li>
          </ul>
          <p>Despite these efforts, no method of transmission is 100% secure.</p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>Our platform is not intended for children under the age of 13 (or 16, depending on local law). We do not knowingly collect data from minors without parental consent.</p>
        </section>

        <section>
          <h2>10. Third-Party Services and Cookies</h2>
          <p>Our Services may include third-party tools (e.g., analytics, payment gateways, AI plugins). We encourage reviewing their privacy policies. We use cookies and similar technologies for:</p>
          <ul>
            <li>User experience enhancement</li>
            <li>Analytics and performance</li>
            <li>Authentication and personalization</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings or via our Cookie Notice.</p>
        </section>

        <section>
          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last Updated" date. Where required, we will notify you via email or in-app messages.</p>
        </section>

        <section>
          <h2>12. Contact Us</h2>
          <p>For any questions, requests, or complaints regarding this policy, please contact:</p>
          <p className="font-semibold">Lynera.ai Privacy Office</p>
          <ul>
            <li>📧 Email: privacy@lynera.ai</li>
            <li>🌐 Website: https://www.lynera.ai</li>
            <li>📍 Registered Office: [Insert your office address here]</li>
          </ul>

          <p>For EU data subjects, you may also contact our EU Representative at:</p>
          <p>📧 gdpr-rep@lynera.ai</p>

          <p>For Indian users under DPDP Act:</p>
          <p>📧 grievance.officer@lynera.ai</p>
        </section>

        <section className="text-sm text-muted-foreground mt-8">
          <p>This policy is accessible at: https://lynera.ai/privacypolicies</p>
        </section>
      </CardContent>
    </Card>
  );
}
