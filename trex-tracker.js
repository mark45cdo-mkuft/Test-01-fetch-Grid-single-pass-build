/* IN-GEN Park Systems — simulated T-Rex proximity tracker */
(function(){
  "use strict";

  const $ = s => document.querySelector(s);
  let base = null;
  let track = null;
  const ASSESSMENT_URL="https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub";

  function installPresentationGuard(){
    if($("#jpPresentationGuard")) return;
    const style=document.createElement("style");
    style.id="jpPresentationGuard";
    style.textContent=`
      details.devtools{
        margin-top:12px !important;
        border:2px solid #385643 !important;
        background:#030806 !important;
        box-shadow:inset 0 0 20px rgba(0,0,0,.42),0 0 0 1px rgba(116,242,154,.08) !important;
        padding:0 !important;
      }
      details.devtools summary{
        display:block !important;
        padding:11px 12px !important;
        border:0 !important;
        background:#09110c !important;
        color:#a7bbaa !important;
        font-weight:800 !important;
        letter-spacing:.075em !important;
      }
      details.devtools summary::before{
        content:"▸  ";
        color:#74f29a;
      }
      details.devtools[open] summary{
        border-bottom:1px solid #385643 !important;
        background:#0b1510 !important;
      }
      details.devtools[open] summary::before{content:"▾  ";}
      details.devtools .devinner{
        padding:11px !important;
        background:#040906 !important;
      }
    `;
    document.head.appendChild(style);
  }

  function installAssessmentRoute(){
    const input=$("#docUrl");
    if(!input) return;
    input.value=ASSESSMENT_URL;
    input.setAttribute("aria-label","Assessment verification Google Doc URL");
    const label=input.previousElementSibling;
    if(label && label.tagName==="LABEL") label.textContent="ASSESSMENT VERIFICATION GOOGLE DOC URL";
    const status=$("#assignmentStatus");
    if(status) status.textContent="Verification document loaded. Decode this remote source to reveal the assessment's uppercase secret message.";
  }

  function geo(){
    return new Promise((resolve,reject)=>{
      if(!navigator.geolocation) return reject(new Error("geolocation unavailable"));
      navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:true,timeout:8000,maximumAge:60000});
    });
  }

  function offset(lat,lon,distanceM,bearingDeg){
    const R=6371000;
    const br=bearingDeg*Math.PI/180;
    const p1=lat*Math.PI/180;
    const l1=lon*Math.PI/180;
    const d=distanceM/R;
    const p2=Math.asin(Math.sin(p1)*Math.cos(d)+Math.cos(p1)*Math.sin(d)*Math.cos(br));
    const l2=l1+Math.atan2(Math.sin(br)*Math.sin(d)*Math.cos(p1),Math.cos(d)-Math.sin(p1)*Math.sin(p2));
    return {lat:p2*180/Math.PI,lon:l2*180/Math.PI};
  }

  function compass(deg){
    const dirs=["N","NE","E","SE","S","SW","W","NW"];
    return dirs[Math.round(((deg%360)+360)%360/45)%8];
  }

  function logLine(msg,cls="a"){
    const c=$("#console");
    if(!c) return;
    const t=new Date().toLocaleTimeString([], {hour12:false});
    c.innerHTML += `<div><span class="t">[${t}]</span> <span class="${cls}">${msg}</span></div>`;
    c.scrollTop=c.scrollHeight;
  }

  async function acquire(){
    const out=$("#trexTrackText");
    if(!out) return;
    out.style.display="block";
    out.textContent="T-Rex tracker acquiring device reference…";
    try{
      if(!base){
        const p=await geo();
        base={lat:p.coords.latitude,lon:p.coords.longitude,accuracy:p.coords.accuracy};
      }

      let distance,bearing;
      if(!track){
        distance=12+Math.random()*38;
        bearing=Math.random()*360;
      }else{
        distance=Math.max(5,Math.min(50,track.distance+(Math.random()*12-2)));
        bearing=(track.bearing+(Math.random()*36-18)+360)%360;
      }

      const pos=offset(base.lat,base.lon,distance,bearing);
      track={lat:pos.lat,lon:pos.lon,distance,bearing};

      out.innerHTML=`<strong>T-REX TRACKER · SIMULATED CONTACT</strong><br>Range: ~${Math.round(distance)} m<br>Bearing: ${Math.round(bearing).toString().padStart(3,"0")}° ${compass(bearing)}<br>Track: ${pos.lat.toFixed(6)}, ${pos.lon.toFixed(6)}<br><span style="opacity:.72">FICTIONAL TRAINING POSITION · NOT A REAL ANIMAL DETECTION</span>`;

      const q=encodeURIComponent(`${pos.lat},${pos.lon}`);
      const frame=$("#mapFrame"), link=$("#mapLink");
      if(frame){
        frame.src=`https://maps.google.com/maps?q=${q}&t=k&z=20&output=embed`;
        frame.classList.add("show");
      }
      if(link){
        link.href=`https://www.google.com/maps/search/?api=1&query=${q}`;
        link.textContent="OPEN SIMULATED T-REX TRACK IN GOOGLE MAPS";
        link.classList.add("show");
      }
      logLine(`T-Rex tracker acquired simulated contact: ${Math.round(distance)} m / ${Math.round(bearing)}°.` ,"r");
    }catch(e){
      out.innerHTML="<strong>T-REX TRACKER</strong><br>Device reference unavailable. Location permission is required before fictional megafauna can be misplaced accurately.";
      logLine("T-Rex tracker failed to acquire device reference.","a");
    }
  }

  function install(){
    installPresentationGuard();
    installAssessmentRoute();
    if($("#trexTrackerBtn")) return;
    const locBtn=[...document.querySelectorAll("button")].find(b=>/SHOW YOUR OWN LOCATION/i.test(b.textContent));
    if(!locBtn) return setTimeout(install,100);

    const btn=document.createElement("button");
    btn.id="trexTrackerBtn";
    btn.className="btn red";
    btn.textContent="T-REX TRACKER · SIMULATED";
    btn.addEventListener("click",acquire);
    locBtn.insertAdjacentElement("afterend",btn);

    const card=locBtn.parentElement && locBtn.parentElement.querySelector(".locationCard");
    if(card && !$("#trexTrackText")){
      const out=document.createElement("div");
      out.className="locline";
      out.id="trexTrackText";
      out.style.cssText="display:none;margin-top:8px;border-top:1px solid #293b30;padding-top:8px";
      const frame=card.querySelector("#mapFrame");
      card.insertBefore(out,frame||card.firstChild);
    }
    logLine("Assessment verification source armed. Simulated T-Rex proximity tracker online.","a");
  }

  install();
})();