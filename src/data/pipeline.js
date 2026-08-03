/**
 * The decision table on /practice.
 *
 * Ordered from most safely delegated to never delegated. The `why` column is the
 * load-bearing part: the split is not about how hard a task is, it's about
 * whether the answer already exists somewhere an agent can read. If it does, an
 * agent can draft it. If the answer has to be *decided*, a person decides it.
 *
 *   mode: 'agent'  an agent produces it, a gate catches errors
 *   mode: 'human'  a person produces it; no agent step
 *   gate:          what stops a wrong answer reaching main ('auto' | 'review' | null)
 */

const ROWS = [
  {
    task: 'First draft from a spec or PR diff',
    mode: 'agent',
    gate: 'review',
    why: 'The source of truth already exists in the diff. Drafting from it is transcription with structure, which is exactly what models are good at.',
  },
  {
    task: 'Release notes from a commit range',
    mode: 'agent',
    gate: 'review',
    why: 'Same reason, plus the commit trail is already the record. The reviewer is checking emphasis and audience, not facts.',
  },
  {
    task: 'Restructuring or splitting an overgrown page',
    mode: 'agent',
    gate: 'review',
    why: 'No new claims are introduced. The risk is a broken anchor or a lost section, and both are cheap to detect.',
  },
  {
    task: 'Terminology and style consistency sweep',
    mode: 'agent',
    gate: 'auto',
    why: 'Deterministic once the preferred term is decided. The decision is human; finding the 40 places that disagree is not.',
  },
  {
    task: 'Stale-page, broken-link and orphaned-asset audits',
    mode: 'agent',
    gate: 'auto',
    why: 'Mechanical, tedious, and the failure mode is a false positive a human dismisses in seconds.',
  },
  {
    task: 'Translating already-approved source content',
    mode: 'agent',
    gate: 'review',
    why: 'Safe only once the source is frozen and the terms are settled. Translating unsettled source multiplies the ambiguity instead of resolving it.',
  },
  {
    task: 'Deciding what is actually true of the product',
    mode: 'human',
    gate: null,
    why: 'A model will produce a confident, plausible answer where no answer exists yet. That is the single most expensive failure in documentation.',
  },
  {
    task: 'Naming a concept, and what the name means',
    mode: 'human',
    gate: null,
    why: 'A naming decision is a commitment other teams inherit. It needs an owner who can be asked why, not a plausible suggestion.',
  },
  {
    task: 'Deprecation and breaking-change calls',
    mode: 'human',
    gate: null,
    why: 'The words are trivial; the decision behind them is a product decision with customers attached.',
  },
  {
    task: 'Anything with a security, legal or compliance consequence',
    mode: 'human',
    gate: null,
    why: 'The cost of being confidently wrong is unbounded, and the reviewer needs accountability rather than a diff.',
  },
];

export default ROWS;
