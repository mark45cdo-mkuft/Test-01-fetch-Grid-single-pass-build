/* IN-GEN Park Systems — rotating incident commentary extension */
(() => {
  "use strict";
  if (window.__INGEN_RANDOM_LINES_INSTALLED__) return;
  window.__INGEN_RANDOM_LINES_INSTALLED__ = true;

  const pools = {
    gate: [
      "Gate cycle complete. The animal has interpreted this as product feedback.",
      "Gate motor reports PASS. Containment has requested a separate meeting.",
      "Gate opened on command. The command is now under review.",
      "Gate closed successfully. Geography remains unresolved.",
      "Gate telemetry green. The thing on the wrong side remains statistically inconvenient.",
      "Mechanical interlock functioning. Strategic interlock not found.",
      "Gate response time excellent. Decision quality outside specification.",
      "Gate position verified. Animal position has declined verification.",
      "Closure confirmed. Consequences remain open.",
      "Access route established. This was not the requested kind of accessibility.",
      "Gate control has completed its task and would like that noted in the minutes.",
      "Door discipline nominal. Animal discipline has not joined the programme."
    ],
    goat: [
      "Goat deployed under revised confidence model: none.",
      "Goat status upgraded from resource to stakeholder.",
      "Goat has entered the operational theatre without reading the risk assessment.",
      "Procurement confirms goat availability. Ethics has gone to lunch.",
      "Goat standing by. T-Rex has not been copied into the email.",
      "Goat has been positioned according to a plan no one is prepared to own.",
      "Goat remains outside. This is technically where goats often are.",
      "Goat contingency activated. Contingency has noticed it is a goat."
    ],
    storm: [
      "Weather event escalated from environmental factor to project manager.",
      "Storm simulation active. The sky has assumed root privileges.",
      "Rainfall now exceeds the specification's emotional bandwidth.",
      "Lightning detected. Electrical systems are taking this personally.",
      "Storm has entered production without completing staging.",
      "Wind speed nominal for a hurricane and excessive for everything else.",
      "Weather service reports severe conditions. Management reports seasonal ambience.",
      "Storm cell stationary. Blame allocation mobile.",
      "Precipitation has exceeded the drainage system's career expectations.",
      "Atmosphere currently operating outside change-control."
    ],
    diagnostics: [
      "Diagnostics found no faults in the diagnostic subsystem. Confidence remains decorative.",
      "System health check complete. Several systems are healthy in isolation.",
      "Containment logic PASS. Reality integration pending.",
      "All sensors responding. None have volunteered responsibility.",
      "Diagnostic confidence high. Correlation with events remains a research topic.",
      "Self-test complete. The system has cleared itself of all allegations.",
      "Telemetry coherent. Situation less so.",
      "Error budget intact. Animal budget unclear.",
      "Subsystems individually nominal. Combined behaviour has requested legal counsel.",
      "Diagnostic suite complete. The park remains outside scope."
    ],
    management: [
      "Management has reviewed the incident and found the incident insufficiently aligned with quarterly objectives.",
      "Management confidence remains high because the dashboard is green.",
      "Executive summary generated. Difficult nouns removed.",
      "Management has requested fewer red indicators and no change to underlying conditions.",
      "Incident ownership transferred to a calendar invite.",
      "Leadership response initiated. A slide deck is forming.",
      "Management has classified the event as operationally educational.",
      "Root cause review postponed pending a more convenient root."
    ],
    power: [
      "Power restored. Causality remains intermittent.",
      "Backup generators online. Primary judgement remains unavailable.",
      "Voltage nominal. Confidence borrowed.",
      "Electrical continuity restored. Narrative continuity still degraded.",
      "Fence power stable. Fence usefulness dependent on where the animals are.",
      "Generators report success. The darkness has filed an appeal.",
      "Power distribution normal. Distribution of dinosaurs still under investigation.",
      "Grid restored. The problem has diversified beyond electricity."
    ],
    tracker: [
      "Tracker confidence 99.8%. Historical performance has not been invited.",
      "Signal acquired. Meaning still buffering.",
      "Tracker sees the T-Rex. The T-Rex has not acknowledged the tracker.",
      "Position estimate stable. Animal attitude unconstrained.",
      "Tracker solution converged. Survival model remains iterative.",
      "Location confidence high. Distance preference higher.",
      "Field unit reports target nearby. 'Nearby' has been escalated for review.",
      "Tracker telemetry clean. Footprints continue to offer competing data."
    ],
    lockdown: [
      "Lockdown complete. Everything that was already outside has complied symbolically.",
      "Emergency procedure executed perfectly against the building.",
      "All doors secured. External problems retain external access.",
      "Lockdown status green. Park status philosophically mixed.",
      "Emergency controls engaged. Emergency remains customer-facing.",
      "Reopening authorised. Risk has been reclassified as visitor experience."
    ]
  };

  const bags = Object.create(null);
  function next(category) {
    const pool = pools[category] || [];
    if (!pool.length) return "";
    let bag = bags[category];
    if (!bag || !bag.length) {
      bag = pool.map((_, i) => i);
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      bags[category] = bag;
    }
    return pool[bag.pop()];
  }

  function say(category, cls = "a") {
    const line = next(category);
    if (line && typeof window.log === "function") window.log(line, cls);
  }

  function wrap(name, after) {
    const original = window[name];
    if (typeof original !== "function" || original.__ingenWrapped) return;
    const wrapped = function (...args) {
      const result = original.apply(this, args);
      after(...args);
      return result;
    };
    wrapped.__ingenWrapped = true;
    window[name] = wrapped;
  }

  wrap("toggleGate", () => say("gate", "a"));
  wrap("deployGoat", () => say("goat", "a"));
  wrap("cycleFences", () => say("power", "a"));
  wrap("storm", () => {
    say("storm", "a");
    setTimeout(() => say("power", "a"), 1900);
  });
  wrap("diagnostics", () => {
    setTimeout(() => say("diagnostics", "c"), 1450);
    setTimeout(() => say("management", "a"), 1580);
  });
  wrap("magicWord", () => setTimeout(() => say("management", "a"), 780));
  wrap("lockdown", () => say("lockdown", "r"));
  wrap("restoreLockdown", () => say("lockdown", "a"));
  wrap("findTrexTracker", () => say("tracker", "a"));

  window.__INGEN_RANDOM_LINES__ = {
    count: Object.values(pools).reduce((n, pool) => n + pool.length, 0),
    categories: Object.fromEntries(Object.entries(pools).map(([k, v]) => [k, v.length]))
  };
})();
