export const THEME_KEY = "tpm-theme";

/** Runs before the page paints (see layout.tsx) so there is no flash of the wrong theme. */
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}})();`;
