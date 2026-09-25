import { ADD_ONS, BROKEN_PAGE_SHOT, DIFFERENCES, EVENT, PARTS, SHOT_NOTE, STUCK, TEARDOWN, TUTORIAL } from "@/lib/content";
import { Architecture } from "./diagram";
import { Figure } from "./figure";
import Walkthrough from "./walkthrough";

export default function Home() {
  return (
    <>
      <div className="hero">
        <p className="kicker">{EVENT.group}</p>
        <h1>Build a web app on AWS, in ninety minutes.</h1>
        <p className="lede">
          A server on EC2, a PostgreSQL database on RDS, and a PHP page that saves to it. Every step is on this page, in
          order, with the commands ready to copy. Then you extend it with your team, and delete it all before you leave.
        </p>
        <ul className="facts">
          <li>
            <b>When</b>
            {EVENT.date}
          </li>
          <li>
            <b>Long</b>
            {EVENT.length}
          </li>
          <li>
            <b>Where</b>
            {EVENT.format}
          </li>
          <li>
            <b>Bring</b>
            A laptop
          </li>
        </ul>
        <p>
          This is AWS&apos;s own tutorial, <a href={TUTORIAL.href}>{TUTORIAL.title}</a>, with the five changes in{" "}
          <a href="#differences">today&apos;s changes</a> already applied. You do not need it open to follow along, but
          it is worth reading afterwards.
        </p>
      </div>

      <section id="before">
        <h2>Before you come</h2>
        <ul>
          <li>
            Create an AWS account and choose the <strong>free plan</strong>. A card is needed at signup; a debit card
            works. The free plan never charges it unless you choose to upgrade.
          </li>
          <li>Sign in once and make sure you can see the AWS Console.</li>
          <li>Bring a laptop. Tablets and phones won&apos;t work.</li>
          <li>Can&apos;t make an account? Come anyway. You&apos;ll pair with someone who has one.</li>
        </ul>
      </section>

      <section id="build">
        <h2>What you are building</h2>
        <p>
          Two resources and one rule between them. The database never gets a route from the internet: the only thing
          allowed to reach it on port 5432 is the instance sitting in front of it.
        </p>
        <Architecture />
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>Part</th>
                <th>What you make</th>
                <th>How long</th>
              </tr>
            </thead>
            <tbody>
              {PARTS.map((p) => (
                <tr key={p.id}>
                  <td>
                    <a href={`#${p.id}`}>
                      <strong>0{p.n}</strong> {p.title}
                    </a>
                  </td>
                  <td>{p.what}</td>
                  <td>{p.minutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Do them in order. Part 2 takes several minutes to finish creating, so start Part 3 while you wait.</p>
        <div className="callout info">
          <strong>About the screenshots</strong>
          {SHOT_NOTE}
        </div>
      </section>

      <section id="differences">
        <h2>Where today differs from the tutorial</h2>
        <p>
          The steps below already have these five changes baked in. They are listed so you know what changed and why,
          and so the tutorial still makes sense when you read it at home.
        </p>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Tutorial says</th>
                <th>Today</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              {DIFFERENCES.map((d) => (
                <tr key={d.step}>
                  <td>{d.step}</td>
                  <td className="muted">{d.tutorial}</td>
                  <td>
                    <strong>{d.today}</strong>
                  </td>
                  <td>{d.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="callout">
          <strong>The one idea to take home</strong>A security group blocks all inbound traffic until you add a rule.
          Your browser reaches the server because of the HTTP rule. The server reaches the database because of a rule
          the RDS console wrote for you. That is networking, not IAM.
        </div>
      </section>

      <Walkthrough />

      <section id="challenge">
        <h2>Team challenge</h2>
        <p>Once your sample page saves data, team up in 2s or 3s. Score as many points as you can in 20 minutes.</p>
        <div className="cards">
          {ADD_ONS.map((a) => (
            <div className="card" key={a.title}>
              <p className="pts">
                {a.points} {a.points === 1 ? "POINT" : "POINTS"}
              </p>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              {a.href && (
                <p>
                  <a href={a.href}>{a.link} (AWS docs)</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="stuck">
        <h2>Stuck?</h2>
        <p>Check the region first, then this list, then wave at a helper.</p>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>What you see</th>
                <th>What to do</th>
              </tr>
            </thead>
            <tbody>
              {STUCK.map((s) => (
                <tr key={s.symptom}>
                  <td>{s.symptom}</td>
                  <td>{s.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Figure shot={BROKEN_PAGE_SHOT} />
      </section>

      <section id="teardown">
        <h2>Before you leave: delete everything</h2>
        <p>
          On the free plan nothing here can charge your card, but running resources burn the credits you would rather
          spend on your own projects. We do this together at the end.
        </p>
        <ol>
          {TEARDOWN.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>

      <section id="cost">
        <h2>How the free plan works now</h2>
        <p>
          AWS changed its free tier in July 2025. New accounts pick a free plan or a paid plan. The free plan gives $100
          in credits at signup and up to $100 more for trying core services, never charges your card unless you upgrade,
          and closes after six months or when the credits run out. It is not &ldquo;free for a year&rdquo; any more.
          Check <a href="https://aws.amazon.com/free/">aws.amazon.com/free</a> for the current rules.
        </p>
      </section>
    </>
  );
}
