import React, {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import styles from './index.module.css';

const ROLE_DATA = [
  {
    id: 'devs',
    label: 'For Developers',
    title: 'API Specs that Compile',
    description:
      'I treat documentation as code. I write strict OpenAPI (Swagger) specs, implement CI/CD for docs, and ensure your "Time to Hello World" is under 5 minutes.',
    actionText: 'See API Samples',
    link: '/docs/portfolio/sample-openlm-architecture',
  },
  {
    id: 'pms',
    label: 'For Product Managers',
    title: 'Adoption-Driven Content',
    description:
      'Features don’t exist until they are documented. I align documentation releases with product sprints to ensure users adopt new features immediately.',
    actionText: 'See Feature Guides',
    link: '/docs/portfolio/sample-docusaurus-ci-cd',
  },
  {
    id: 'support',
    label: 'For Support Teams',
    title: 'Deflect Tickets at Scale',
    description:
      'I build self-service knowledge bases structured to answer questions before they reach your inbox. Reduced support load means higher ROI.',
    actionText: 'See Knowledge Base',
    link: '/docs/portfolio/sample-localization-workflow',
  },
];

function Hero() {
  return (
    <header className={styles.heroContainer}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Turn complex code into <br />
          adoption-driving docs.
        </h1>
        <p className={styles.heroSubtitle}>
          UW Certified Technical Writer. I bridge the gap between your engineering logic and your user&apos;s success.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/portfolio/overview">
            View Portfolio
          </Link>
          <Link className="button button--secondary button--lg" to="mailto:mariag@voix.com">
            Book Discovery
          </Link>
        </div>
        <div className={styles.heroCodeBlock}>
          <CodeBlock language="json" title="The Transformation">
{`// BEFORE: Confusion
{ "err_cd": 404, "msg": "u_nf" }

// AFTER: Clarity (My Work)
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The user ID provided does not exist.",
    "resolution": "Verify the ID in your dashboard."
  }
}`}
          </CodeBlock>
        </div>
      </div>
    </header>
  );
}

function InteractiveTabs() {
  const [activeTab, setActiveTab] = useState(ROLE_DATA[0]);

  return (
    <section className={styles.tabsSection}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2>Documentation for every stakeholder</h2>
          <p>Select a role to see how I add value.</p>
        </div>
        <div className={styles.tabsContainer}>
          <div className={styles.tabMenu}>
            {ROLE_DATA.map((role) => (
              <button
                key={role.id}
                className={clsx(styles.tabButton, activeTab.id === role.id && styles.activeTab)}
                type="button"
                onClick={() => setActiveTab(role)}>
                {role.label}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            <h3 style={{fontSize: '2rem', marginBottom: '1rem'}}>{activeTab.title}</h3>
            <p style={{fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem', color: '#4b5976'}}>
              {activeTab.description}
            </p>
            <Link className="button button--outline button--primary" to={activeTab.link}>
              {activeTab.actionText} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <span className={styles.marqueeItem}>UNIVERSITY OF WASHINGTON CERTIFIED</span>
            <span className={styles.marqueeItem}>•</span>
            <span className={styles.marqueeItem}>DOCUSAURUS</span>
            <span className={styles.marqueeItem}>•</span>
            <span className={styles.marqueeItem}>OPENAPI</span>
            <span className={styles.marqueeItem}>•</span>
            <span className={styles.marqueeItem}>POSTMAN</span>
            <span className={styles.marqueeItem}>•</span>
            <span className={styles.marqueeItem}>GIT &amp; GITHUB</span>
            <span className={styles.marqueeItem}>•</span>
            <span className={styles.marqueeItem}>MARKDOWN</span>
            <span className={styles.marqueeItem}>•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={`Home | ${siteConfig.title}`} description="Technical Writer Portfolio">
      <main className={styles.pageRoot}>
        <Hero />
        <SocialProof />
        <InteractiveTabs />
      </main>
    </Layout>
  );
}
