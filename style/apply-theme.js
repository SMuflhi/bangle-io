/**
 *
 * @param {['dark', 'light']} theme
 */
export function applyTheme(theme) {
  const element = document.documentElement;
  updateStyleHelper(theme, 'font-color', element);
  updateStyleHelper(theme, 'font-lighter-color', element);
  updateStyleHelper(theme, 'accent-color', element);
  updateStyleHelper(theme, 'accent-2-color', element);
  updateStyleHelper(theme, 'accent-stronger-color', element);
  updateStyleHelper(theme, 'bg-color', element);
  updateStyleHelper(theme, 'bg-stronger-color', element);
  updateStyleHelper(theme, 'border-color', element);
  updateStyleHelper(theme, 'activity-bar-color', element);
  updateStyleHelper(theme, 'activity-bar-font-color', element);
}

function updateStyleHelper(theme, style, element) {
  element.style.setProperty(`--${style}`, `var(--${theme}-${style})`);
}