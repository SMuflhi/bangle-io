export type ThemeType = 'dark' | 'light';

export function applyTheme(theme: ThemeType) {
  const element = document.documentElement;
  updateStyleHelper(theme, 'font-color', element);
  updateStyleHelper(theme, 'link-color', element);
  updateStyleHelper(theme, 'text-highlight-color', element);
  updateStyleHelper(theme, 'font-lighter-color', element);
  updateStyleHelper(theme, 'accent-color', element);
  updateStyleHelper(theme, 'accent-2-color', element);
  updateStyleHelper(theme, 'accent-stronger-color', element);
  updateStyleHelper(theme, 'bg-color', element);
  updateStyleHelper(theme, 'error-bg-color', element);
  updateStyleHelper(theme, 'bg-stronger-color', element);
  updateStyleHelper(theme, 'border-color', element);
  updateStyleHelper(theme, 'activity-bar-color', element);
  updateStyleHelper(theme, 'activity-bar-font-color', element);
  updateStyleHelper(theme, 'modal-overlay-color', element);
  updateStyleHelper(theme, 'note-tag-font-color', element);
  updateStyleHelper(theme, 'note-tag-bg-color', element);

  updateStyleHelper(theme, 'severity-error-color', element);
  updateStyleHelper(theme, 'severity-warning-color', element);
  updateStyleHelper(theme, 'severity-info-color', element);
  updateStyleHelper(theme, 'severity-success-color', element);
}

function updateStyleHelper(
  theme: ThemeType,
  style: string,
  element: HTMLElement,
) {
  element.style.setProperty(`--${style}`, `var(--${theme}-${style})`);
}