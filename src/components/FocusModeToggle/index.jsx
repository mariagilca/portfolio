import React from 'react';
import clsx from 'clsx';
import {useFocusMode} from '../../context/focusMode';
import styles from './styles.module.css';

export default function FocusModeToggle({className}) {
  const {isFocusMode, toggleFocusMode} = useFocusMode();

  return (
    <button
      type="button"
      className={clsx(
        'button button--secondary button--sm focus-mode-toggle',
        styles.focusModeToggle,
        isFocusMode && styles.focusModeToggleActive,
        className,
      )}
      onClick={toggleFocusMode}
      aria-pressed={isFocusMode}>
      <span className={styles.focusModeLabel}>Focus Mode</span>
      <span
        className={clsx(
          styles.focusModeIndicator,
          isFocusMode ? styles.focusModeIndicatorActive : styles.focusModeIndicatorInactive,
        )}
        aria-hidden="true">
        {isFocusMode ? 'On' : 'Off'}
      </span>
    </button>
  );
}
