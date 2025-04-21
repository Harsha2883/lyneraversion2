
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, ShieldCheck, ShieldAlert, Info, AlertTriangle } from "lucide-react";

export function CodeOfConductTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code of Conduct</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">1. Our Core Values</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Respect</strong> – We listen, learn, and value every voice.</li>
            <li><strong>Integrity</strong> – We uphold honesty and transparency in all interactions.</li>
            <li><strong>Inclusion</strong> – We welcome people from all cultures, backgrounds, and walks of life.</li>
            <li><strong>Quality</strong> – We strive for excellence in content, delivery, and learner outcomes.</li>
            <li><strong>Responsibility</strong> – We hold ourselves accountable for ethical conduct and sustainability.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">2. For All Users</h2>
          </div>
          <p>All Lynera.ai users must:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain professional, courteous, and inclusive interactions across all communication.</li>
            <li>Use authentic identities and accurate profiles.</li>
            <li>Refrain from hate speech, harassment, trolling, discrimination, or inflammatory remarks.</li>
            <li>Respect intellectual property rights.</li>
            <li>Use platform tools and services only for lawful purposes.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">3. For Learners</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Participate actively and respectfully in all sessions.</li>
            <li>Avoid sharing course content without consent.</li>
            <li>Submit assignments with academic honesty.</li>
            <li>Provide constructive feedback in reviews.</li>
            <li>Respect communication boundaries.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">4. For Content Creators / Instructors</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Deliver original, high-quality content and maintain it.</li>
            <li>Clearly outline course objectives and prerequisites.</li>
            <li>Avoid misleading titles or inflated claims.</li>
            <li>Address queries professionally and timely.</li>
            <li>Comply with copyright laws and licensing norms.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">5. For Mentors / Facilitators</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain clear professional boundaries.</li>
            <li>Respect time zones and personal boundaries.</li>
            <li>Avoid unsolicited messaging.</li>
            <li>Maintain confidentiality of discussions.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">6. Prohibited Conduct</h2>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Harassment, abuse, or intimidation</li>
            <li>Sharing false or defamatory content</li>
            <li>Use of bots or fake accounts</li>
            <li>Unlicensed use of platform content</li>
            <li>Attempting to exploit system vulnerabilities</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">7. Violations & Consequences</h2>
          </div>
          <p>Depending on severity, actions may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Warning or content moderation</li>
            <li>Temporary or permanent account suspension</li>
            <li>Certificate disqualification</li>
            <li>Legal action for major breaches</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold m-0">8. Reporting Violations</h2>
          </div>
          <p>To report violations, please contact:</p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:grievance@lynera.ai" className="text-primary hover:underline">
              grievance@lynera.ai
            </a>
          </p>
          <p className="text-sm text-muted-foreground">All reports are reviewed confidentially and fairly.</p>
        </section>
      </CardContent>
    </Card>
  );
}
