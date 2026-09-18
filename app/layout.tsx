import type { Metadata } from "next";
import Link from "next/link";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { EVENT, SOURCES } from "@/lib/content";
import "./globals.css";

const sans = IBM_Plex_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "AWS 101 Workshop", template: "%s · AWS 101 Workshop" },
  description: "Hands-on AWS 101 workshop from the AWS Student Builder Group at Seneca Polytechnic: launch an EC2 server, connect a database, tear it all down.",
};

const NAV = [
  { href: "/guide/", label: "Guide" },
  { href: "/challenge/", label: "Challenge" },
  { href: "/troubleshooting/", label: "Troubleshooting" },
  { href: "/cost/", label: "Cost & teardown" },
  { href: "/organizers/", label: "Organizers" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <header className="topbar">
          <div className="shell">
            <Link href="/" className="brand">AWS <span>101</span> Workshop</Link>
            <nav className="nav" aria-label="Main">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}>{n.label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="shell">{children}</main>
        <footer className="footer">
          <div className="shell">
            <p>{EVENT.group} · {EVENT.date}. AWS facts checked 2026-09-18; re-check before the event.</p>
            <ul>
              {SOURCES.map((s) => (
                <li key={s.href}><a href={s.href}>{s.label}</a></li>
              ))}
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
