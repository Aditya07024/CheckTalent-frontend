import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CheckTalent",
  description:
    "Learn how CheckTalent collects, uses, stores, and protects your personal information.",
  alternates: {
    canonical: "https://checktalent.tech/privacy",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to CheckTalent. We provide a platform designed to help
          individuals demonstrate their skills, showcase their work, and
          present verifiable evidence of their professional abilities.
        </p>
        <p>
          This Privacy Policy explains how CheckTalent collects, uses,
          stores, and protects personal information when you visit our
          website or use our services.
        </p>
        <p>
          By using CheckTalent, you acknowledge that you have read this
          Privacy Policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          Depending on the features you use, we may collect the following
          categories of information:
        </p>

        <h3 className="mt-5 font-semibold text-[#1C1613]">
          Account information
        </h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Name and email address.</li>
          <li>Account identifiers provided by authentication services.</li>
          <li>Profile information that you choose to provide.</li>
        </ul>

        <h3 className="mt-5 font-semibold text-[#1C1613]">
          Authentication information
        </h3>
        <p>
          CheckTalent supports account authentication through available
          providers, which may include Google, GitHub, and email/password.
          Authentication providers process information according to their
          own privacy policies.
        </p>
        <p>
          When you sign in using an external provider, we may receive
          information such as your name, email address, profile image,
          and provider-specific account identifier, depending on the
          permissions granted and the provider's response.
        </p>

        <h3 className="mt-5 font-semibold text-[#1C1613]">
          User-generated information
        </h3>
        <p>
          We may collect information you submit through the platform,
          including profile details, skills, project descriptions,
          assessments, and supporting evidence.
        </p>

        <h3 className="mt-5 font-semibold text-[#1C1613]">
          Technical information
        </h3>
        <p>
          Our systems may process technical information such as browser
          type, device information, IP address, timestamps, and diagnostic
          data when necessary for security, troubleshooting, and service
          operation.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We may use your information to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Create and manage your account.</li>
          <li>Authenticate users and maintain account security.</li>
          <li>Provide CheckTalent's features and services.</li>
          <li>Display your profile, skills, and evidence when you choose to share them.</li>
          <li>Improve platform functionality and user experience.</li>
          <li>Detect fraud, abuse, and unauthorized activity.</li>
          <li>Respond to support requests and communicate important updates.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
        <p>
          We do not claim ownership of the content you submit. Your use of
          that content remains subject to this policy and our Terms of
          Service.
        </p>
      </>
    ),
  },
  {
    title: "4. Authentication and Third-Party Services",
    content: (
      <>
        <p>
          CheckTalent may use Firebase Authentication and third-party
          authentication providers to support account creation and sign-in.
        </p>
        <p>
          When you choose an authentication provider, that provider may
          process information under its own terms and privacy policy.
          CheckTalent receives the information needed to authenticate you
          and operate your account.
        </p>
        <p>
          If CheckTalent offers GitHub account or repository integration,
          access to GitHub information will depend on the permissions
          you authorize. We will use that information only for the
          disclosed purposes of the relevant feature and in accordance
          with applicable permissions.
        </p>
        <p>
          We do not require your GitHub password to be shared with
          CheckTalent. You can review and revoke third-party application
          permissions through the relevant provider's settings.
        </p>
        <p>
          Third-party services are governed by their own privacy policies.
          Please review those policies before using their services.
        </p>
      </>
    ),
  },
  {
    title: "5. Sharing and Disclosure",
    content: (
      <>
        <p>
          We do not sell your personal information. We may disclose
          information in the following circumstances:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Service providers:</strong> To providers that help us
            operate, secure, host, or maintain CheckTalent.
          </li>
          <li>
            <strong>Sharing you authorize:</strong> When you choose to make
            a profile, project, or other information available to another
            user or organization.
          </li>
          <li>
            <strong>Legal obligations:</strong> When disclosure is required
            by applicable law or a valid legal process.
          </li>
          <li>
            <strong>Security and protection:</strong> When reasonably
            necessary to investigate fraud, protect users, or safeguard
            our rights and systems.
          </li>
          <li>
            <strong>Business changes:</strong> In connection with a merger,
            acquisition, or transfer of business assets, subject to
            applicable legal requirements.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Storage and Security",
    content: (
      <>
        <p>
          We use reasonable technical and organizational measures designed
          to protect personal information against unauthorized access,
          disclosure, alteration, and destruction.
        </p>
        <p>
          No method of transmission or electronic storage is completely
          secure. We cannot guarantee absolute security.
        </p>
        <p>
          We retain information for as long as reasonably necessary to
          provide our services, maintain accounts, resolve disputes,
          enforce agreements, and meet legal obligations.
        </p>
      </>
    ),
  },
  {
    title: "7. Your Privacy Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have the
          right to:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of your personal information.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Object to or request restrictions on certain processing.</li>
          <li>Request a copy of certain information you provided.</li>
        </ul>
        <p>
          To submit a privacy request, contact us at the email address
          provided below. We may need to verify your identity before
          processing your request.
        </p>
        <p>
          Some information may need to be retained where required by law
          or necessary for legitimate security and legal purposes.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies and Similar Technologies",
    content: (
      <>
        <p>
          CheckTalent and its service providers may use cookies, browser
          storage, or similar technologies when necessary to support
          authentication, security, session management, and website
          functionality.
        </p>
        <p>
          The technologies used depend on the features enabled on the
          website and the third-party services integrated with it.
          Browser settings may allow you to control certain cookies,
          although disabling them may affect functionality.
        </p>
      </>
    ),
  },
  {
    title: "9. Children's Privacy",
    content: (
      <p>
        CheckTalent is not intended for children who are below the minimum
        age permitted to use the service under applicable law. We do not
        knowingly collect personal information from children in violation
        of applicable requirements. If you believe a child has provided
        personal information improperly, please contact us.
      </p>
    ),
  },
  {
    title: "10. International Data Processing",
    content: (
      <p>
        Depending on the service providers we use, your information may
        be processed or stored in countries other than your country of
        residence. Where required, we take appropriate steps to support
        lawful international transfers and protect personal information.
      </p>
    ),
  },
  {
    title: "11. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy as CheckTalent evolves or as
        legal requirements change. We will publish the updated version
        on this page and revise the effective date when appropriate.
        Continued use of the service after an update is subject to
        applicable law.
      </p>
    ),
  },
  {
    title: "12. Contact Us",
    content: (
      <>
        <p>
          If you have questions about this Privacy Policy, our data
          practices, or a privacy request, contact us:
        </p>
        <p>
          <strong>Service:</strong> CheckTalent
          <br />
          <strong>Email:</strong>{" "}
          <a
            href="mailto:adityakumar07024@gmail.com"
            className="font-medium text-[#D9481E] hover:underline"
          >
            adityakumar07024@gmail.com
          </a>
          <br />
          <strong>Website:</strong>{" "}
          <a
            href="https://checktalent.tech"
            className="font-medium text-[#D9481E] hover:underline"
          >
            https://checktalent.tech
          </a>
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1C1613]">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            CheckTalent<span className="text-[#D9481E]">.</span>
          </Link>

          <Link
            href="/terms"
            className="text-sm font-medium text-[#D9481E] hover:underline"
          >
            Terms of Service
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="mb-10 border-b border-stone-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D9481E]">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-stone-600">
            Effective date: October 28, 2026
          </p>

          <p className="mt-5 max-w-2xl leading-7 text-stone-600">
            Your privacy matters to us. This policy explains how CheckTalent
            handles your information when you use our website and services.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-xl font-bold">{section.title}</h2>
              <div className="space-y-4 leading-7 text-stone-700">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-14 border-t border-stone-200 pt-6 text-sm text-stone-500">
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-[#D9481E]">
              Home
            </Link>
            <Link href="/terms" className="hover:text-[#D9481E]">
              Terms of Service
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