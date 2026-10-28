import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | CheckTalent",
  description:
    "Read the terms and conditions governing your use of CheckTalent.",
  alternates: {
    canonical: "https://checktalent.tech/terms",
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms of Service govern your access to and use of CheckTalent, including its website, account features, and related services.",
      "By accessing or using CheckTalent, you agree to these Terms. If you do not agree, do not use the service.",
    ],
  },
  {
    title: "2. About CheckTalent",
    paragraphs: [
      "CheckTalent is designed to help individuals demonstrate their skills, present professional work, and share evidence of their abilities. Features may include user profiles, project information, skill assessments, and related professional tools.",
      "Features may change, be added, or be discontinued as the platform develops.",
    ],
  },
  {
    title: "3. Eligibility and Accounts",
    paragraphs: [
      "You must be legally permitted to use CheckTalent under the laws applicable to you. If you are below the age of majority, you may use the service only where permitted by applicable law and with any required consent.",
      "You are responsible for providing accurate information, protecting access to your account, and notifying us if you suspect unauthorized use.",
      "You must not impersonate another person, misrepresent your qualifications, or create accounts for fraudulent purposes.",
    ],
  },
  {
    title: "4. Authentication",
    paragraphs: [
      "CheckTalent may support sign-in using email and password or third-party providers such as Google and GitHub.",
      "Your use of a third-party authentication provider is also subject to that provider's terms and policies. You are responsible for maintaining the security of the accounts you use to access CheckTalent.",
    ],
  },
  {
    title: "5. User Content and Accuracy",
    paragraphs: [
      "You retain ownership of content you submit to CheckTalent, subject to rights held by other parties.",
      "You grant CheckTalent a limited, non-exclusive license to host, store, reproduce, display, and process your content as reasonably necessary to operate, secure, and provide the features you use.",
      "You are responsible for ensuring that information you submit is accurate to the best of your knowledge and that you have the necessary rights and permissions to submit it.",
      "You must not submit fabricated credentials, misleading assessment results, stolen work, confidential information belonging to others, or content that infringes another person's rights.",
    ],
  },
  {
    title: "6. GitHub and Third-Party Integrations",
    paragraphs: [
      "CheckTalent may provide integrations with third-party services, including GitHub. The availability and scope of these features depend on the permissions you authorize and the relevant provider's policies.",
      "You must have the right to access any repositories, projects, or other information you connect or submit. You must not use CheckTalent to access private information without authorization or violate the terms of an integrated service.",
      "CheckTalent is not responsible for the availability, accuracy, or continued operation of third-party services.",
    ],
  },
  {
    title: "7. Acceptable Use",
    paragraphs: [
      "You agree not to use CheckTalent to violate laws, infringe intellectual property rights, deceive users, distribute malicious software, interfere with platform security, or access systems without authorization.",
      "You must not attempt to disrupt the service, circumvent access controls, scrape information in violation of applicable restrictions, or misuse other users' personal information.",
      "We may investigate suspected violations and take reasonable action to protect users and the platform.",
    ],
  },
  {
    title: "8. Intellectual Property",
    paragraphs: [
      "CheckTalent's branding, interface, software, design, and original platform materials are owned by or licensed to their respective rights holders and are protected by applicable intellectual property laws.",
      "Except where expressly permitted, you may not copy, redistribute, modify, reverse engineer, or commercially exploit protected parts of the platform without authorization.",
      "These Terms do not transfer ownership of your original user content to CheckTalent.",
    ],
  },
  {
    title: "9. Assessments and Professional Decisions",
    paragraphs: [
      "Information, profiles, assessments, and evidence displayed on CheckTalent are intended to support the evaluation of skills and professional experience.",
      "Unless explicitly stated for a particular feature, CheckTalent does not guarantee that an assessment or profile is error-free, independently verified, or a complete representation of a person's abilities.",
      "Users, recruiters, and organizations are responsible for making their own informed decisions and conducting any additional verification they consider necessary.",
    ],
  },
  {
    title: "10. Privacy",
    paragraphs: [
      "Our collection and use of personal information are described in our Privacy Policy.",
      "By using CheckTalent, you acknowledge that you have had an opportunity to review the Privacy Policy. Please do not submit information you are not authorized to share.",
    ],
  },
  {
    title: "11. Availability and Changes",
    paragraphs: [
      "We aim to maintain a useful and reliable service but do not guarantee uninterrupted availability or that every feature will always remain available.",
      "We may update, suspend, or discontinue features for operational, security, business, or legal reasons. Where required by law, we will provide appropriate notice.",
    ],
  },
  {
    title: "12. Suspension and Termination",
    paragraphs: [
      "You may stop using CheckTalent at any time. If account deletion is available, you may use the available account controls or contact us for assistance.",
      "We may restrict or suspend access when reasonably necessary to address security risks, unlawful activity, material violations of these Terms, or harm to other users.",
      "Any continuing rights or obligations that should survive termination will remain in effect to the extent permitted by law.",
    ],
  },
  {
    title: "13. Disclaimers",
    paragraphs: [
      'To the extent permitted by applicable law, CheckTalent is provided on an "as available" and "as is" basis without warranties that are not expressly stated or legally required.',
      "We do not guarantee that the platform will meet every user's requirements, remain uninterrupted, or be free from all errors. Nothing in these Terms excludes a warranty or right that cannot legally be excluded.",
    ],
  },
  {
    title: "14. Limitation of Liability",
    paragraphs: [
      "To the extent permitted by applicable law, CheckTalent and its operators will not be liable for indirect, incidental, special, or consequential losses arising from the use of the platform.",
      "Nothing in these Terms limits liability where such limitation is prohibited by law, including liability that cannot legally be excluded or restricted.",
    ],
  },
  {
    title: "15. Changes to These Terms",
    paragraphs: [
      "We may revise these Terms as the service develops or legal requirements change. Updated Terms will be published on this page with a revised effective date when appropriate.",
      "Where required by law, we will obtain any necessary consent or provide notice before material changes take effect.",
    ],
  },
  {
    title: "16. Governing Law",
    paragraphs: [
      "These Terms are subject to applicable laws. Any governing law, jurisdiction, or dispute-resolution provisions should be interpreted consistently with mandatory consumer and other legal protections that apply to you.",
    ],
  },
  {
    title: "17. Contact Us",
    paragraphs: [
      "If you have questions about these Terms or the CheckTalent platform, contact us using the details below.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            CheckTalent<span className="text-[#D9481E]">.</span>
          </Link>

          <Link
            href="/privacy"
            className="text-sm font-medium text-[#D9481E] hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="mb-10 border-b border-stone-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9481E]">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-stone-600">
            Effective date: October 28, 2026
          </p>

          <p className="mt-5 max-w-2xl leading-7 text-stone-600">
            These terms explain the rules for accessing and using CheckTalent.
            Please read them carefully before using the platform.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-xl font-bold">{section.title}</h2>

              <div className="space-y-4 leading-7 text-stone-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.title === "17. Contact Us" && (
                  <div className="rounded-xl border border-stone-200 bg-white p-5">
                    <p>
                      <strong>Service:</strong> CheckTalent
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:adityakumar07024@gmail.com"
                        className="font-medium text-[#D9481E] hover:underline"
                      >
                        adityakumar07024@gmail.com
                      </a>
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href="https://checktalent.tech"
                        className="font-medium text-[#D9481E] hover:underline"
                      >
                        https://checktalent.tech
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-14 border-t border-stone-200 pt-6 text-sm text-stone-500">
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-[#D9481E]">
              Home
            </Link>
            <Link href="/privacy" className="hover:text-[#D9481E]">
              Privacy Policy
            </Link>
            <a
              href="mailto:adityakumar07024@gmail.com"
              className="hover:text-[#D9481E]"
            >
              Contact
            </a>
          </div>

          <p className="mt-4">
            © {new Date().getFullYear()} CheckTalent. All rights reserved.
          </p>
        </footer>
      </article>
    </main>
  );
}