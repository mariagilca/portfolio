import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ROWS from '@site/src/data/pipeline';
import styles from './practice.module.css';

const AGENT_TASK = `# .claude/agents/docs-draft.md
---
name: docs-draft
description: Draft documentation for a merged PR. Opens a PR; never writes to main.
tools: Read, Grep, Glob, Edit, Write, Bash(git*), Bash(npm run build)
---

You draft documentation from a diff. You do not decide what is true.

1. Read the diff and the linked issue. Read the existing docs it affects.
2. If the change introduces a concept with no agreed name, STOP and open an
   issue asking for the naming decision. Do not invent a name.
3. Draft into a new branch. Match the surrounding page's structure and voice.
4. Run the build. Broken links and anchors must fail before a human sees it.
5. Open a PR. In the description, list every claim you could not verify from
   the diff, as a checklist for the reviewer.

Never edit a page whose front matter sets \`review: locked\`.`;

const CI_GATE = `# .github/workflows/docs.yml  (the non-negotiables)
- run: npm run build              # broken links + anchors fail the build
- run: npx vale docs/             # terminology + style, from the agreed term list
- run: node scripts/stale.mjs     # flags pages past their review date
# No step in this file can be skipped by the author of the change.`;

export default function Practice() {
  const {siteConfig} = useDocusaurusContext();
  const origin = siteConfig.url.replace(/\/$/, '');
  const siteRoot = `${origin}${siteConfig.baseUrl}`;
  const pageUrl = `${siteRoot}practice/`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    headline: 'Where AI belongs in a documentation pipeline',
    description:
      'A working split between what an agent can draft, what a gate has to catch, and what stays a human decision, plus how the agents are wired and why git is the control plane.',
    inLanguage: 'en',
    image: `${siteRoot}img/social-card.png`,
    author: {'@id': `${siteRoot}#person`},
    isPartOf: {'@id': `${siteRoot}#website`},
    about: [
      'AI-assisted documentation',
      'Documentation agents',
      'Docs-as-code',
      'Technical writing',
    ],
  };

  return (
    <Layout
      title="Where AI belongs in a documentation pipeline"
      description="Which documentation tasks an agent can safely draft, which need an automated gate, and which stay human decisions, with the agent wiring, the CI gates, and the failure modes I have actually hit.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>

      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Practice</p>
          <h1 className={styles.title}>
            Where AI belongs in a documentation pipeline
          </h1>
          <p className={styles.lead}>
            Generating documentation stopped being the hard part. Verifying it
            didn't, so the bottleneck moved, and the system has to move with it.
          </p>
          <p className={styles.note}>
            This is how I actually work: what I hand to an agent, what I make CI
            catch, and what I refuse to automate. The split isn't about how
            difficult a task is. It's about whether the answer already exists
            somewhere an agent can read. If it does, an agent can draft it. If the
            answer has to be <em>decided</em>, a person decides it.
          </p>
        </header>

        <section className={styles.section} aria-labelledby="table-heading">
          <h2 id="table-heading" className={styles.h2}>
            The split
          </h2>

          <div className={styles.table} role="table" aria-label="Which documentation tasks are delegated to an agent">
            <div className={styles.thead} role="row">
              <span role="columnheader">Task</span>
              <span role="columnheader">Agent drafts</span>
              <span role="columnheader">Gate</span>
              <span role="columnheader">Human only</span>
            </div>

            {ROWS.map((row) => (
              <div className={styles.row} role="row" key={row.task}>
                <div className={styles.cellTask} role="cell">
                  <span className={styles.taskName}>{row.task}</span>
                  <span className={styles.taskWhy}>{row.why}</span>
                </div>

                <div className={styles.cellMark} role="cell">
                  <span className={styles.mobileLabel}>Agent drafts</span>
                  {row.mode === 'agent' ? (
                    <span className={styles.dot} aria-label="yes" />
                  ) : (
                    <span className={styles.empty} aria-label="no">
                      ·
                    </span>
                  )}
                </div>

                <div className={styles.cellGate} role="cell">
                  <span className={styles.mobileLabel}>Gate</span>
                  {row.gate ? (
                    <span
                      className={
                        row.gate === 'auto' ? styles.gateAuto : styles.gateReview
                      }>
                      {row.gate === 'auto' ? 'Automated' : 'Human review'}
                    </span>
                  ) : (
                    <span className={styles.empty}>·</span>
                  )}
                </div>

                <div className={styles.cellMark} role="cell">
                  <span className={styles.mobileLabel}>Human only</span>
                  {row.mode === 'human' ? (
                    <span className={styles.dotHuman} aria-label="yes" />
                  ) : (
                    <span className={styles.empty} aria-label="no">
                      ·
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className={styles.pullquote}>
            Every agent change arrives as a pull request. Nothing writes directly
            to the <code>main</code> branch.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="wiring-heading">
          <h2 id="wiring-heading" className={styles.h2}>
            How the agents are wired
          </h2>
          <p className={styles.body}>
            I run agents against the docs repo with Claude Code, with tools scoped
            to the documentation directory and an MCP server for the issue tracker
            when the agent needs the context behind a change. The task definition
            lives in the repo and is reviewed like code, because it <em>is</em>{' '}
            code: it's the thing that decides what the agent is allowed to
            conclude.
          </p>
          <p className={styles.body}>
            The single most useful instruction in any of them is the one that tells
            the agent to stop:
          </p>
          <div className={styles.code}>
            <CodeBlock language="markdown" title="An agent that knows what it doesn't know">
              {AGENT_TASK}
            </CodeBlock>
          </div>
          <p className={styles.body}>
            Without step 2, an agent facing an unnamed concept will name it, and a
            plausible invented name is worse than a blocked PR, because it
            propagates before anyone notices it was never decided.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="git-heading">
          <h2 id="git-heading" className={styles.h2}>
            Git is the control plane
          </h2>
          <p className={styles.body}>
            Docs-as-code mattered before AI. It matters more now, because it is the
            only part of the setup that scales with volume: a diff a human approves,
            a provenance trail that records what was machine-drafted, and a revert
            that is one command rather than an archaeology project.
          </p>
          <p className={styles.body}>
            So the mechanical checks belong in CI, where the author of a change
            cannot wave them through:
          </p>
          <div className={styles.code}>
            <CodeBlock language="yaml" title="The gates that don't negotiate">
              {CI_GATE}
            </CodeBlock>
          </div>
          <p className={styles.body}>
            The point of automating these is not tidiness. It's that when draft
            volume goes up tenfold, review is the constraint, so a human's
            attention has to be spent on claims, not on trailing whitespace and
            dead links.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="limits-heading">
          <h2 id="limits-heading" className={styles.h2}>
            What this doesn't fix
          </h2>
          <dl className={styles.limits}>
            <div className={styles.limitRow}>
              <dt>AI amplifies the information architecture you already have</dt>
              <dd>
                If a concept has three names and no owner, an agent will use all
                three, faster, across more pages. Structure first is not a
                preference; it's the precondition for any of this paying off.
              </dd>
            </div>
            <div className={styles.limitRow}>
              <dt>Confident wrong specifics</dt>
              <dd>
                Version numbers, parameter names, default values, limits. These
                read as authoritative and are the most likely thing to be invented,
                which is why they belong in the reviewer's checklist rather than
                the reviewer's judgement.
              </dd>
            </div>
            <div className={styles.limitRow}>
              <dt>It cannot know what changed unless you hand it the diff</dt>
              <dd>
                An agent asked to "update the docs" will rewrite prose. An agent
                given a diff will document a change. The difference is entirely in
                what you gave it.
              </dd>
            </div>
            <div className={styles.limitRow}>
              <dt>It smooths over ambiguity that was the actual signal</dt>
              <dd>
                When a spec is unclear, a model resolves it silently and moves on.
                That unclear spec was information, usually that a decision hadn't
                been made. Losing it is the failure mode nobody logs.
              </dd>
            </div>
          </dl>
        </section>

        <section className={styles.closing} aria-labelledby="closing-heading">
          <h2 id="closing-heading" className={styles.closingHeading}>
            Anyone can generate documentation now. Keeping it true is the job.
          </h2>
          <div className={styles.closingActions}>
            <Link className="button button--primary button--lg" to="/work">
              See the work
            </Link>
            <Link className={styles.textAction} to="/contact">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
