/* IN-GEN Park Systems — canonical state-aware incident loader */
(async function(){
  "use strict";
  const root = "https://cdn.jsdelivr.net/gh/mark45cdo-mkuft/Test-01-fetch-Grid-single-pass-build@5e1715a4aa2a29774f0f0b77a8d3110ad7e6d619/payload/chaos100-";
  const parts = await Promise.all([0,1,2,3,4,5].map(async i => {
    const r = await fetch(root + i + ".b64");
    if (!r.ok) throw new Error("payload part " + i + " returned HTTP " + r.status);
    return (await r.text()).trim();
  }));
  const payload = parts.join("");
  const bytes = Uint8Array.from(atob(payload), c => c.charCodeAt(0));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  const html = await new Response(stream).text();
  document.open();
  document.write(html);
  document.close();
})().catch(err => {
  document.body.innerHTML = "<pre style='color:#9f9;background:#030605;padding:20px'>IN-GEN loader fault: " + String(err) + "</pre>";
});