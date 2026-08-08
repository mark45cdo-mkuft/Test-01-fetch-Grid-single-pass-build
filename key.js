/* IN-GEN single-key launcher: loads the pinned canonical app. */
(() => {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function(input, init) {
    const url = typeof input === "string" ? input : (input && input.url ? input.url : "");
    if (/^https:\/\/docs\.google\.com\/document\/d\/e\/.+\/pub/.test(url)) {
      try {
        const direct = await nativeFetch(input, init);
        if (direct.ok) return direct;
      } catch (_) {}
      return nativeFetch("https://corsproxy.io/?url=" + encodeURIComponent(url));
    }
    return nativeFetch(input, init);
  };

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/gh/mark45cdo-mkuft/Test-01-fetch-Grid-single-pass-build@fd0827fc6ada7264830d784b5d95232e5985eb22/ingen-app.js";
  document.head.appendChild(script);
})();