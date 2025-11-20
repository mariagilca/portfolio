import React from 'react';

const FocusModeContext = React.createContext({isFocusMode: false, toggleFocusMode: () => {}});

function getInitialState() {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const stored = window.localStorage.getItem('focus-mode-enabled');
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    return false;
  }
}

export function FocusModeProvider({children}) {
  const [isFocusMode, setIsFocusMode] = React.useState(getInitialState);

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    document.body.classList.toggle('focus-mode-active', isFocusMode);
    try {
      window.localStorage.setItem('focus-mode-enabled', JSON.stringify(isFocusMode));
    } catch (error) {
      // ignore storage failures
    }
    return () => {
      document.body.classList.remove('focus-mode-active');
    };
  }, [isFocusMode]);

  const toggleFocusMode = React.useCallback(() => {
    setIsFocusMode((prev) => !prev);
  }, []);

  const value = React.useMemo(() => ({isFocusMode, toggleFocusMode}), [isFocusMode, toggleFocusMode]);

  return <FocusModeContext.Provider value={value}>{children}</FocusModeContext.Provider>;
}

export function useFocusMode() {
  const context = React.useContext(FocusModeContext);
  if (!context) {
    throw new Error('useFocusMode must be used within FocusModeProvider');
  }
  return context;
}
