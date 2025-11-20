import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import TagPill from '../../components/TagPill';
import styles from './styles.module.css';

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

const heroHighlights = [
  {
    title: 'Interactive documentation',
    detail: 'Layouts borrow from product UI so walkthroughs feel like guided demos instead of static text.',
  },
  {
    title: 'Ops-friendly playbooks',
    detail: 'CI/CD, localization, and governance steps are packaged with every article for immediate reuse.',
  },
  {
    title: 'Voice and visuals',
    detail: 'Gradients, glass, and inclusive voice guidance so every release note looks and sounds on-brand.',
  },
];

const heroStats = [
  { value: '32', label: 'Playbooks published' },
  { value: '4 min', label: 'Avg. read time' },
  { value: '100%', label: 'Docs you can ship today' },
];

function formatReadingTime(readingTime) {
  if (!readingTime) {
    return null;
  }
  return `${Math.ceil(readingTime)} min read`;
}

function BlogHero({ metadata, featuredPost }) {
  const { blogTitle, blogDescription } = metadata;
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroGlow} />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Maria Gilca • Field notes</p>
          <h1>{blogTitle || 'Docs strategy dispatches'}</h1>
          <p className={styles.heroSubtitle}>
            {blogDescription ||
              'Documentation experiments inspired by interactive demos, Arcade-like visuals, and systems thinking for fast-moving product teams.'}
          </p>
          <div className={styles.heroActions}>
            <Link className={clsx('button button--lg', styles.heroPrimaryButton)} to="/contact">
              Get a content sprint
            </Link>
            <Link
              className={clsx('button button--lg button--secondary', styles.heroGhostButton)}
              to="/docs/portfolio/overview">
              See client work
            </Link>
          </div>
          <div className={styles.heroHighlights}>
            {heroHighlights.map((item) => (
              <article key={item.title} className={styles.heroHighlightCard}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className={styles.heroAside}>
          <div className={styles.heroBadge}>Latest drop</div>
          {featuredPost ? (
            <div className={styles.heroLatest}>
              <p>{featuredPost.title}</p>
              <div className={styles.heroLatestMeta}>
                <span>{featuredPost.formattedDate}</span>
                {featuredPost.readingTime && (
                  <span>· {formatReadingTime(featuredPost.readingTime)}</span>
                )}
              </div>
              <Link className={styles.heroLatestLink} to={featuredPost.permalink}>
                Read article →
              </Link>
            </div>
          ) : (
            <p className={styles.heroLatest}>
              Fresh essays are in the oven. Subscribe via RSS to be the first to know.
            </p>
          )}
          <div className={styles.heroStats}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.heroStatCard}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
}

function FeaturedPost({ post }) {
  if (!post?.metadata) {
    return null;
  }

  const { metadata } = post;
  const { title, description, tags = [], formattedDate, readingTime, permalink } = metadata;
  const tagLabels = tags.map((tag) => tag.label).slice(0, 3);

  return (
    <section className={styles.featuredSection}>
      <p className={styles.sectionEyebrow}>Narrative spotlight</p>
      <article className={styles.featuredCard}>
        <div className={styles.featuredText}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className={styles.featuredMeta}>
            <span>{formattedDate}</span>
            {readingTime && <span>· {formatReadingTime(readingTime)}</span>}
          </div>
          <div className={styles.tagRow}>
            {tagLabels.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        </div>
        <div className={styles.featuredCta}>
          <Link className={styles.featuredLink} to={permalink}>
            Read the walkthrough
          </Link>
        </div>
      </article>
    </section>
  );
}

function PostCard({ post }) {
  const { metadata } = post;
  const { title, description, permalink, tags = [], formattedDate, readingTime } = metadata;
  const tagLabels = tags.map((tag) => tag.label).slice(0, 2);

  return (
    <article className={styles.postCard}>
      <div className={styles.postMeta}>
        <span>{formattedDate}</span>
        {readingTime && <span>· {formatReadingTime(readingTime)}</span>}
      </div>
      <h3>
        <Link to={permalink}>{title}</Link>
      </h3>
      <p>{description}</p>
      <div className={styles.tagRow}>
        {tagLabels.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
      <Link className={styles.postLink} to={permalink}>
        Dive in →
      </Link>
    </article>
  );
}

function BlogListPageContent({ metadata, items }) {
  const featuredItem = items.length ? items[0] : null;
  const featuredPost = featuredItem?.content ?? null;
  const remainingPosts = featuredPost ? items.slice(1) : items;
  const postsToRender = remainingPosts.map((item) => item.content);

  return (
    <Layout description={metadata.blogDescription} title={metadata.blogTitle}>
      <main className={styles.blogLanding}>
        <BlogHero metadata={metadata} featuredPost={featuredPost?.metadata} />
        {featuredPost && <FeaturedPost post={featuredPost} />}

        <section className={styles.postsSection}>
          <div className={styles.postsHeader}>
            <div>
              <p className={styles.sectionEyebrow}>Latest dispatches</p>
              <h2>Docs inspiration with Arcade-level energy</h2>
            </div>
            <Link className={styles.textLink} to="/blog/tags">
              Browse by topic →
            </Link>
          </div>
          {postsToRender.length ? (
            <div className={styles.postGrid}>
              {postsToRender.map((post) => (
                <PostCard key={post.metadata.permalink} post={post} />
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>More essays are coming soon. Stay tuned!</p>
          )}
        </section>

        <div className={styles.paginator}>
          <BlogListPaginator metadata={metadata} />
        </div>
      </main>
    </Layout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
