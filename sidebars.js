// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * The sidebar hierarchy is also the source of the BreadcrumbList structured data
 * on every doc page, so it is shaped as a reader's path rather than a file
 * listing. The category carries a `link` deliberately: Docusaurus drops
 * breadcrumb items that have no href, and a linkless category would leave the
 * case studies with a single-item (invalid) breadcrumb trail.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  workSidebar: [
    {
      type: 'category',
      label: 'Selected work',
      link: {type: 'doc', id: 'overview'},
      collapsed: false,
      items: [
        'information-architecture-data-platform',
        'process-documentation-decision-trees',
        'terminology-consistency-at-scale',
      ],
    },
  ],
};

export default sidebars;
