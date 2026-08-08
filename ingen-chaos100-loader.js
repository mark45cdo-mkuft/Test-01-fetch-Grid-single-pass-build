/* IN-GEN Park Systems — canonical state-aware incident loader */
(async function(){
  "use strict";
  const ASSESSMENT_URL="https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub";
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

  // Assessment-path guard: the core payload historically contained an F calibration URL.
  // Set the website-supplied verification source before any user action and clear demo output.
  const source=document.querySelector("#docUrl");
  if(source){
    source.value=ASSESSMENT_URL;
    source.setAttribute("aria-label","Assessment verification Google Doc URL");
    const label=source.previousElementSibling;
    if(label && label.tagName==="LABEL") label.textContent="ASSESSMENT VERIFICATION GOOGLE DOC URL";
  }
  const grid=document.querySelector("#gridSurface");
  if(grid) grid.textContent="AWAITING ASSESSMENT DOCUMENT…";
  const mode=document.querySelector("#modeLabel");
  if(mode) mode.textContent="ASSESSMENT STANDBY";
  const srcLabel=document.querySelector("#sourceLabel");
  if(srcLabel) srcLabel.textContent="SOURCE: WEBSITE-SUPPLIED DOCUMENT";
  const status=document.querySelector("#assignmentStatus");
  if(status) status.textContent="Assessment source loaded. Press DECODE PUBLISHED DOCUMENT to fetch and reconstruct the required hidden message.";

  // Capture phase runs before the payload's inline onclick handler, eliminating any stale/default F source.
  const decodeBtn=[...document.querySelectorAll("button")].find(b=>/DECODE PUBLISHED DOCUMENT/i.test(b.textContent));
  if(decodeBtn){
    decodeBtn.addEventListener("click",()=>{
      const input=document.querySelector("#docUrl");
      if(input) input.value=ASSESSMENT_URL;
    },true);
  }

  const tracker=document.createElement("script");
  tracker.src="trex-tracker.js?v=assessment-source-restored-v3";
  tracker.defer=true;
  document.body.appendChild(tracker);
})().catch(err => {
  document.body.innerHTML = "<pre style='color:#9f9;background:#030605;padding:20px'>IN-GEN loader fault: " + String(err) + "</pre>";
});