import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { EVENT, LINKS } from "@/lib/content";
import "./globals.css";

const sans = IBM_Plex_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWS 101 Workshop",
  description: "AWS 101 workshop from the AWS Student Builder Group at Seneca Polytechnic: build a web server and an RDS database with the official AWS tutorial.",
};

const NAV = [
  { href: "#tutorial", label: "Tutorial" },
  { href: "#differences", label: "Today's changes" },
  { href: "#challenge", label: "Challenge" },
  { href: "#stuck", label: "Stuck?" },
  { href: "#teardown", label: "Teardown" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <header className="topbar">
          <div className="shell">
            <a href="#top" className="brand">AWS <span>101</span> Workshop</a>
            <nav className="nav" aria-label="Sections">
              {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            </nav>
          </div>
        </header>
        <main className="shell" id="top">{children}</main>
        <footer className="footer">
          <div className="shell">
            <p>{EVENT.group} · {EVENT.date}. Official AWS documentation:</p>
            <ul>{LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
