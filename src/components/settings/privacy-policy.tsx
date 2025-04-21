
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PrivacyPolicy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        <h2>Your Privacy Matters</h2>
        <p>This privacy policy describes how we collect, use, and handle your personal information when you use our services.</p>
        
        <h3>Information We Collect</h3>
        <ul>
          <li>Account information (name, email, profile picture)</li>
          <li>Learning progress and course completion data</li>
          <li>Payment information (processed securely by our payment providers)</li>
        </ul>

        <h3>How We Use Your Information</h3>
        <ul>
          <li>To provide and improve our services</li>
          <li>To personalize your learning experience</li>
          <li>To process your payments and maintain your subscription</li>
          <li>To communicate important updates and recommendations</li>
        </ul>
      </CardContent>
    </Card>
  );
}
