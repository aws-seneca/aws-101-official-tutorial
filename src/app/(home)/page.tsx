import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Terminal } from 'lucide-react';

const sections = [
  {
    href: '/docs/workshop',
    icon: Terminal,
    title: 'Workshop',
    body: 'Deploy a sign-up app to EC2, then move its data to Amazon RDS with one line of configuration.',
  },
  {
    href: '/docs/concepts',
    icon: BookOpen,
    title: 'Concepts',
    body: 'Study notes on the services behind the workshop: EC2, security groups and VPC, RDS, IAM, S3, and costs.',
  },
  {
    href: '/docs/architecture',
    icon: Layers,
    title: 'Architecture',
    body: 'How the same app grows: one server, a managed database, a load-balanced fleet, then serverless.',
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-16 sm:py-24">
      <p className="text-sm font-medium text-fd-muted-foreground">AWS Student Builder Group at Seneca Polytechnic</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        AWS 101 Study Guide
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-pretty text-fd-muted-foreground">
        The hands-on workshop from October 7, 2026, and the notes to go further: what each service does, and how
        real systems are put together.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/docs/workshop"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          Start the workshop <ArrowRight className="size-4" />
        </Link>
        <Link href="/docs" className="inline-flex items-center rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-fd-muted">
          How this guide works
        </Link>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {sections.map(({ href, icon: Icon, title, body }) => (
          <Link key={href} href={href} className="group rounded-xl border bg-fd-card p-5 transition-colors hover:bg-fd-muted/60">
            <Icon className="size-5 text-[#AD5DFE]" aria-hidden />
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">{body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
              Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
