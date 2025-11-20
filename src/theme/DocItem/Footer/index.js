/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import FocusModeToggle from '@site/src/components/FocusModeToggle';

export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {frontMatter} = metadata;
  if (frontMatter?.hide_table_of_contents) {
    return null;
  }
  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      <FocusModeToggle />
    </footer>
  );
}
