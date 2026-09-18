import { ADD_ONS, DIFFERENCES, EVENT, STUCK, TEARDOWN, TUTORIAL } from "@/lib/content";

export default function Home() {
  return (
    <>
      <p className="eyebrow">{EVENT.group}</p>
      <h1>AWS 101 Workshop</h1>
      <ul className="chips">
        <li>{EVENT.date}</li>
        <li>{EVENT.length}</li>
        <li>{EVENT.format}</li>
        <li>Bring a laptop</li>
      </ul>
      <p className="lede">
        Today you build a real web app on AWS, in the real AWS Console, following AWS&apos;s own tutorial: a server on EC2,
        a PostgreSQL database on RDS, and a PHP page that saves to it. Then you extend it with your team, and delete it all
        before you leave.
      </p>

      <section id="before">
        <h2>Before you come</h2>
        <ul>
          <li>Create an AWS account and choose the <strong>free plan</strong>. A card is needed at signup; a debit card
            works. The free plan never charges it unless you choose to upgrade.</li>
          <li>Sign in once and make sure you can see the AWS Console.</li>
          <li>Bring a laptop. Tablets and phones won&apos;t work.</li>
          <li>Can&apos;t make an account? Come anyway. You&apos;ll pair with someone who has one.</li>
        </ul>
      </section>

      <section id="tutorial">
        <h2>What we build: the official AWS tutorial</h2>
        <p>We follow <a href={TUTORIAL.href}>{TUTORIAL.title}</a> together, in three parts. Keep it open in a tab.</p>
        <ol className="parts">
          {TUTORIAL.parts.map((p) => (
            <li key={p.href} className="card">
              <h3><a href={p.href}>{p.title}</a></h3>
              <p className="muted">{p.what}</p>
            </li>
          ))}
        </ol>
        <p>You&apos;re done when <code>http://&lt;your public IP&gt;/SamplePage.php</code> saves a name and address and
          shows it in the table.</p>
      </section>

      <section id="differences">
        <h2>Where today differs from the tutorial</h2>
        <p>Follow the tutorial, except for these five choices.</p>
        <div className="tbl">
          <table>
            <thead><tr><th>Step</th><th>Tutorial says</th><th>Today</th><th>Why</th></tr></thead>
            <tbody>
              {DIFFERENCES.map((d) => (
                <tr key={d.step}><td>{d.step}</td><td>{d.tutorial}</td><td><strong>{d.today}</strong></td><td>{d.why}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="callout info">
          <strong>The one idea to take home</strong>
          A security group blocks all inbound traffic until you add a rule. Your browser reaches the server because of the
          HTTP rule. The server reaches the database because of a rule the RDS console created for you. That&apos;s
          networking, not IAM.
        </div>
      </section>

      <section id="challenge">
        <h2>Team challenge</h2>
        <p>Once your sample page saves data, team up in 2s or 3s. Score as many points as you can in 20 minutes.</p>
        <div className="cards">
          {ADD_ONS.map((a) => (
            <div className="card" key={a.title}>
              <div className="pts">{a.points} <small>{a.points === 1 ? "point" : "points"}</small></div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              {a.href && <p><a href={a.href}>{a.link} (AWS docs)</a></p>}
            </div>
          ))}
        </div>
      </section>

      <section id="stuck">
        <h2>Stuck?</h2>
        <p>Check the region first, then this list, then wave at a helper.</p>
        <div className="tbl">
          <table>
            <thead><tr><th>What you see</th><th>What to do</th></tr></thead>
            <tbody>
              {STUCK.map((s) => <tr key={s.symptom}><td>{s.symptom}</td><td>{s.fix}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section id="teardown">
        <h2>Before you leave: delete everything</h2>
        <p>On the free plan nothing here can charge your card, but running resources burn the credits you&apos;d rather
          spend on your own projects. We do this together at the end.</p>
        <ol>{TEARDOWN.map((t) => <li key={t}>{t}</li>)}</ol>
      </section>

      <section id="cost">
        <h2>How the free plan works now</h2>
        <p>AWS changed its free tier in July 2025. New accounts pick a free plan or a paid plan. The free plan gives $100 in
          credits at signup and up to $100 more for trying core services, never charges your card unless you upgrade, and
          closes after six months or when the credits run out. It is not “free for a year” any more. Check{" "}
          <a href="https://aws.amazon.com/free/">aws.amazon.com/free</a> for the current rules.</p>
      </section>
    </>
  );
}
