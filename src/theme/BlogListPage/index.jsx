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
import styles from './styles.module.css';

/**
 * An index rather than a feed: date in the left rail, title and standfirst in
 * the measure, hairline between entries. Same idiom as the rest of the site.
 */
function BlogListPageMetadata({metadata}) {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function formatReadingTime(readingTime) {
  if (!readingTime) {
    return null;
  }
  return `${Math.ceil(readingTime)} min read`;
}

function PostRow({post}) {
  const {title, description, permalink, formattedDate, readingTime} =
    post.metadata;

  return (
    <li>
      <Link className={styles.row} to={permalink}>
        <p className={styles.rowMeta}>
          <span>{formattedDate}</span>
          {readingTime && (
            <span className={styles.rowReadingTime}>
              {formatReadingTime(readingTime)}
            </span>
          )}
        </p>
        <div className={styles.rowBody}>
          <h2 className={styles.rowTitle}>{title}</h2>
          {description && <p className={styles.rowSummary}>{description}</p>}
        </div>
        <span className={styles.rowArrow} aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}

function BlogListPageContent({metadata, items}) {
  const {blogTitle, blogDescription} = metadata;

  return (
    <Layout>
      <main className={styles.page}>
        <header>
          <p className={styles.eyebrow}>Notes</p>
          <h1 className={styles.title}>{blogTitle || 'Writing'}</h1>
          {blogDescription && <p className={styles.intro}>{blogDescription}</p>}
        </header>

        {items.length ? (
          <ul className={styles.list}>
            {items.map((item) => (
              <PostRow
                key={item.content.metadata.permalink}
                post={item.content}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.intro}>Nothing published yet.</p>
        )}

        <nav className={styles.paginator}>
          <BlogListPaginator metadata={metadata} />
        </nav>
      </main>
    </Layout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
