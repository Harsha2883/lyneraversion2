
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CodeOfConductTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code of Conduct</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none space-y-4">
        <section>
          <h2>Our Community Commitment</h2>
          <p>We are dedicated to providing a welcoming, inclusive, and harassment-free environment for everyone, regardless of background, identity, or experience.</p>
        </section>

        <section>
          <h3>Expected Behavior</h3>
          <ul>
            <li>Be respectful and considerate of others</li>
            <li>Use inclusive language</li>
            <li>Be open to constructive feedback</li>
            <li>Show empathy towards fellow community members</li>
          </ul>
        </section>

        <section>
          <h3>Unacceptable Behavior</h3>
          <ul>
            <li>Harassment or discrimination of any form</li>
            <li>Offensive or derogatory comments</li>
            <li>Trolling, insulting, or derogatory remarks</li>
            <li>Public or private harassment</li>
            <li>Publishing others' private information without explicit permission</li>
          </ul>
        </section>

        <section>
          <h3>Consequences of Unacceptable Behavior</h3>
          <p>Unacceptable behavior from any community member will not be tolerated. Anyone asked to stop inappropriate behavior is expected to comply immediately.</p>
        </section>

        <section>
          <h3>Reporting Guidelines</h3>
          <p>If you experience or witness unacceptable behavior, please report it to our support team. All complaints will be reviewed and investigated promptly and fairly.</p>
        </section>
      </CardContent>
    </Card>
  );
}
