import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const CREDENTIALS = ['OpenLM', 'UW Certified', 'Docs-as-code', 'Agents in CI'];

const WORK = [
  {
    field: 'Information architecture',
    artefacts: 'Glossary · Taxonomy · Metadata',
    title: 'Rebuilding a data platform’s documentation around its data',
    summary:
      'Terminology had drifted between services and the same metric answered to different names. I mapped the entities and data flows first, then built the definitions, structure and metadata standards that hold them still.',
    to: '/work/information-architecture-data-platform',
  },
  {
    field: 'Process documentation',
    artefacts: 'Procedures · Decision trees',
    title: 'Writing down a process that only existed in conversation',
    summary:
      'A complex approval chain lived entirely as tribal knowledge. I interviewed the experts, found the steps where ownership was genuinely unclear, and turned the result into procedures people could act on.',
    to: '/work/process-documentation-decision-trees',
  },
  {
    field: 'Consistency at scale',
    artefacts: 'Review gates · Automated checks',
    title: 'Catching inconsistency before a customer does',
    summary:
      'Feature names disagreed across UI strings, product copy and the help centre, and nothing was responsible for noticing. I built the shared source of truth and the automated checks that flag a mismatch at review time instead of in a support ticket.',
    to: '/work/terminology-consistency-at-scale',
  },
];

const PRACTICE = [
  {
    label: 'Pipelines',
    name: 'AI-assisted drafting',
    detail:
      'Agents draft from a diff or a spec, never from a prompt that says “update the docs”. The reviewer checks claims; CI checks everything mechanical.',
  },
  {
    label: 'Agents',
    name: 'Agents scoped to a repo',
    detail:
      'Claude Code and MCP, with tools limited to the docs directory and a task definition that is reviewed like code, including the instruction to stop rather than invent a name.',
  },
  {
    label: 'Control plane',
    name: 'Git in front of everything',
    detail:
      'Every machine-written change arrives as a pull request with a provenance trail. Nothing writes to main, and a revert is one command.',
  },
  {
    label: 'Structure',
    name: 'Information architecture',
    detail:
      'The precondition for any of the above paying off. An agent given three names for one concept will use all three, faster, across more pages.',
  },
  {
    label: 'Governance',
    name: 'Ownership and review',
    detail:
      'Who may change a definition, who signs it off, and how the change reaches the product and the help centre, not just the page where someone noticed.',
  },
];

const WRITING = [
  {
    title: 'I rebuilt my docs site to be boring on purpose',
    date: '3 August 2026',
    to: '/blog/designing-docs-for-restraint',
  },
  {
    title: 'Treating Docusaurus like a docs-as-code platform',
    date: '20 November 2025',
    to: '/blog/docusaurus-docs-as-code',
  },
];

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroWash} aria-hidden="true" />
      <div className={styles.shell}>
        <p className={styles.eyebrow}>
          Technical writer <span aria-hidden="true">·</span> Information
          architect
        </p>

        <h1 className={styles.display}>
          <span className={styles.displayName}>Maria Gilca</span>
          <span className={styles.displayRole}>
            Documentation systems for data-intensive software.
          </span>
        </h1>

        <p className={styles.thesis}>
          Anyone can generate documentation now. Keeping it true is the job:
          agents that draft, gates that catch, and git in front of all of it.
        </p>

        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/work">
            See the work
          </Link>
          <Link className={styles.textAction} to="/practice">
            How I work with AI <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className={styles.credentials}>
          {CREDENTIALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function Work() {
  return (
    <section className={styles.section} aria-labelledby="work-heading">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <h2 id="work-heading">Selected work</h2>
          <p className={styles.sectionNote}>
            Three problems that all turned out to be the same problem.
          </p>
        </div>

        <ul className={styles.workList}>
          {WORK.map((item) => (
            <li key={item.to}>
              <Link className={styles.workRow} to={item.to}>
                <p className={styles.workMeta}>
                  <span>{item.field}</span>
                  <span className={styles.workArtefacts}>{item.artefacts}</span>
                </p>
                <h3 className={styles.workTitle}>{item.title}</h3>
                <p className={styles.workSummary}>{item.summary}</p>
                <span className={styles.workArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Practice() {
  return (
    <section
      className={`${styles.section} ${styles.sectionAlt}`}
      aria-labelledby="practice-heading">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <h2 id="practice-heading">What I build</h2>
          <p className={styles.sectionNote}>
            The split between what an agent drafts and what stays a human
            decision is written down, with the reasoning, on{' '}
            <Link to="/practice">the practice page</Link>.
          </p>
        </div>

        <dl className={styles.practice}>
          {PRACTICE.map((item) => (
            <div className={styles.practiceRow} key={item.name}>
              <dt>
                <span className={styles.practiceLabel}>{item.label}</span>
                <span className={styles.practiceTerm}>{item.name}</span>
              </dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>

        <Link className={styles.textAction} to="/practice">
          Where AI belongs in a documentation pipeline{' '}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section className={styles.section} aria-labelledby="writing-heading">
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <h2 id="writing-heading">Writing</h2>
        </div>

        <ul className={styles.writingList}>
          {WRITING.map((post) => (
            <li key={post.to}>
              <Link className={styles.writingRow} to={post.to}>
                <span className={styles.writingDate}>{post.date}</span>
                <span className={styles.writingTitle}>{post.title}</span>
                <span className={styles.workArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link className={styles.textAction} to="/blog">
          All writing <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      className={`${styles.section} ${styles.contact}`}
      aria-labelledby="contact-heading">
      <div className={styles.shell}>
        <h2 id="contact-heading" className={styles.contactHeading}>
          If your teams disagree about what a term means, that is the work.
        </h2>
        <div className={styles.heroActions}>
          <Link
            className="button button--primary button--lg"
            to="mailto:mariag@voix.com">
            mariag@voix.com
          </Link>
          <Link
            className={styles.textAction}
            to="https://www.linkedin.com/in/maria-gilca/">
            LinkedIn <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    // The theme appends the site title ("Maria Gilca"), so it must not appear
    // here. That is what produced the old duplicated <title>.
    <Layout
      title="Technical Writer & Information Architect"
      description="Technical writer and information architect for data-intensive software. I build documentation pipelines where agents draft, CI gates catch errors, and git governs every change, so docs stay accurate as products grow.">
      <Hero />
      <Work />
      <Practice />
      <Writing />
      <Contact />
    </Layout>
  );
}
