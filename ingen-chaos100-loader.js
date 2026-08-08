/* IN-GEN Park Systems — canonical state-aware incident loader */
(async function(){
  "use strict";
  const root = "payload/chaos100-";
  const parts = await Promise.all([0,1,2,3,4,5].map(async i => {
    const r = await fetch(root + i + ".b64", {cache:"no-store"});
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