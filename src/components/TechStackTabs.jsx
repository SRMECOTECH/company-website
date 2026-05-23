import { useState } from 'react';
import { TECH_STACK } from '../data/services.js';

const TABS = Object.keys(TECH_STACK);

export default function TechStackTabs() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div>
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={t === active}
            className={`tab ${t === active ? 'active' : ''}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="tab-panel mt-6" key={active}>
        {TECH_STACK[active].map((label) => (
          <div key={label} className="tech-chip">{label}</div>
        ))}
      </div>
    </div>
  );
}
