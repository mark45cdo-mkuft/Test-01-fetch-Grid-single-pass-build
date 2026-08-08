/* IN-GEN single-key launcher: loads the canonical state-aware incident build. */
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
  script.src = "https://cdn.jsdelivr.net/gh/mark45cdo-mkuft/Test-01-fetch-Grid-single-pass-build@f136d51f469adf6988ac89e80efc813c94657d87/ingen-chaos100-loader.js";
  document.head.appendChild(script);
})();