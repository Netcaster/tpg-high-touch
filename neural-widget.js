(function () {
  const KEY      = 'ht_k_2026_tpg';
  const API_URL  = 'https://naluask.com/api/embed/query';
  const COLOR    = '#6366f1';
  const DARK     = '#4f46e5';

  const NEURAL_SVG = `<svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="3.5" fill="white"/>
    <circle cx="15" cy="5"  r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="15" cy="25" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <line x1="15" y1="7.2"   x2="15"   y2="11.5" stroke="white" stroke-width="1" opacity="0.45"/>
    <line x1="21.7" y1="11.2" x2="18.2" y2="13.2" stroke="white" stroke-width="1" opacity="0.45"/>
    <line x1="21.7" y1="18.8" x2="18.2" y2="16.8" stroke="white" stroke-width="1" opacity="0.45"/>
    <line x1="15" y1="22.8"  x2="15"   y2="18.5" stroke="white" stroke-width="1" opacity="0.45"/>
    <line x1="8.3" y1="18.8" x2="11.8" y2="16.8" stroke="white" stroke-width="1" opacity="0.45"/>
    <line x1="8.3" y1="11.2" x2="11.8" y2="13.2" stroke="white" stroke-width="1" opacity="0.45"/>
    <circle cx="15" cy="15" r="7"  stroke="white" stroke-width="0.5" opacity="0.15"/>
    <circle cx="15" cy="15" r="12" stroke="white" stroke-width="0.4" opacity="0.08"/>
  </svg>`;

  const CLOSE_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>`;

  const ARROW_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>`;

  const SEND_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>`;

  const quickLinks = [
    { label: 'Explore the Mission',   href: '#mission' },
    { label: 'R.I.S.E. Infrastructure', href: '#rise' },
    { label: "Women's HQ",            href: '#women' },
    { label: 'Partner Access',        href: '#partner' },
  ];

  const quickFacts = [
    'Capital converted into human outcomes',
    'R.I.S.E. housing + health infrastructure',
    "Women's HQ — protection to reintegration",
    'Auditable impact dashboard',
  ];

  // ── Inject styles ────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #nw-bubble {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, ${COLOR}, ${DARK});
      border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(99,102,241,0.45);
      z-index: 2147483646;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #nw-bubble:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(99,102,241,0.6); }

    #nw-panel {
      position: fixed; bottom: 92px; right: 24px;
      width: 370px; max-height: 540px;
      z-index: 2147483645;
      border-radius: 18px; overflow: hidden;
      box-shadow: 0 8px 48px rgba(0,0,0,0.45);
      display: flex; flex-direction: column;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      opacity: 0; transform: translateY(14px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    #nw-panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

    .nw-header {
      background: linear-gradient(135deg, ${COLOR} 0%, ${DARK} 100%);
      padding: 14px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
    }
    .nw-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(255,255,255,0.15);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .nw-header-text { flex: 1; }
    .nw-header-title { color: #fff; font-weight: 700; font-size: 13px; }
    .nw-header-sub { color: rgba(255,255,255,0.6); font-size: 10px; margin-top: 1px; }
    .nw-close { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 6px; display: flex; }
    .nw-close:hover svg line { stroke: white; }
    .nw-home-btn { background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.6); font-size: 11px; padding: 4px 6px; border-radius: 6px; }
    .nw-home-btn:hover { color: #fff; }

    .nw-body { background: #070b14; flex: 1; overflow-y: auto; display: flex; flex-direction: column; }

    .nw-home { padding: 14px 14px 6px; }
    .nw-welcome { display: flex; gap: 8px; margin-bottom: 12px; }
    .nw-ai-dot { width: 26px; height: 26px; border-radius: 50%; background: ${COLOR};
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; font-size: 9px; font-weight: 700; color: #fff; }
    .nw-bubble-msg { background: #0f1729; border-radius: 4px 14px 14px 14px;
      padding: 9px 12px; font-size: 13px; line-height: 1.55; color: #e2e8f0; max-width: 85%; }

    .nw-fact { display: flex; align-items: center; gap: 8px;
      padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
      color: #94a3b8; font-size: 11.5px; }
    .nw-fact-dot { width: 8px; height: 8px; border-radius: 50%; background: ${COLOR}; flex-shrink: 0; }

    .nw-ask-prompt { margin: 10px 0 6px; padding: 9px 13px; border-radius: 10px;
      background: rgba(99,102,241,0.10); border: 1px solid rgba(99,102,241,0.22);
      color: #a5b4fc; cursor: pointer; transition: background 0.15s; }
    .nw-ask-prompt:hover { background: rgba(99,102,241,0.18); }

    .nw-link { display: flex; align-items: center; justify-content: space-between;
      padding: 9px 13px; border-radius: 10px; margin-bottom: 6px;
      background: rgba(99,102,241,0.07); border: 1px solid rgba(99,102,241,0.16);
      color: #a5b4fc; text-decoration: none; transition: background 0.15s; }
    .nw-link:hover { background: rgba(99,102,241,0.16); color: #a5b4fc; }

    .nw-chat { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
    .nw-msg { display: flex; gap: 8px; align-items: flex-start; }
    .nw-msg.user { justify-content: flex-end; }
    .nw-msg-bubble { max-width: 82%; padding: 9px 12px; font-size: 12.5px; line-height: 1.6; }
    .nw-msg.user .nw-msg-bubble { background: ${COLOR}; border-radius: 14px 4px 14px 14px; color: #fff; }
    .nw-msg.ai  .nw-msg-bubble { background: #0f1729; border-radius: 4px 14px 14px 14px; color: #e2e8f0; }

    .nw-typing { display: flex; gap: 5px; align-items: center; padding: 10px 14px;
      background: #0f1729; border-radius: 4px 14px 14px 14px; width: max-content; }
    .nw-dot { width: 6px; height: 6px; border-radius: 50%; background: ${COLOR}; animation: nwPulse 1.2s infinite; }
    .nw-dot:nth-child(2) { animation-delay: 0.2s; }
    .nw-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes nwPulse { 0%,100%{ opacity:0.3; } 50%{ opacity:1; } }

    .nw-input-row { background: #070b14; border-top: 1px solid rgba(255,255,255,0.06);
      padding: 10px 12px; display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
    .nw-input { flex: 1; background: #0f1729; border: 1px solid rgba(99,102,241,0.25);
      border-radius: 10px; padding: 9px 12px; font-size: 12.5px; color: #e2e8f0;
      outline: none; font-family: inherit; }
    .nw-input:focus { border-color: rgba(99,102,241,0.6); }
    .nw-send { width: 36px; height: 36px; border-radius: 50%; background: ${COLOR};
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.15s; }
    .nw-send:disabled { opacity: 0.4; cursor: not-allowed; }

    .nw-footer { background: #070b14; border-top: 1px solid rgba(255,255,255,0.05);
      padding: 7px 16px; text-align: center; font-size: 10px;
      color: rgba(255,255,255,0.18); flex-shrink: 0; }
    .nw-footer span { color: rgba(255,255,255,0.32); }

    @media (max-width: 440px) { #nw-panel { width: calc(100vw - 16px); right: 8px; } }
  `;
  document.head.appendChild(style);

  // ── Build DOM ────────────────────────────────────────────────────────────
  const bubble = document.createElement('button');
  bubble.id = 'nw-bubble';
  bubble.setAttribute('aria-label', 'Open TPG High Touch Neural assistant');
  bubble.innerHTML = NEURAL_SVG;

  const panel = document.createElement('div');
  panel.id = 'nw-panel';
  panel.innerHTML = `
    <div class="nw-header">
      <div class="nw-avatar">${NEURAL_SVG}</div>
      <div class="nw-header-text">
        <div class="nw-header-title">High Touch Neural</div>
        <div class="nw-header-sub">Powered by Nalu AI</div>
      </div>
      <button class="nw-home-btn" id="nwHomeBtn" style="display:none">Home</button>
      <button class="nw-close" id="nwClose">${CLOSE_SVG}</button>
    </div>
    <div class="nw-body" id="nwBody">
      <div class="nw-home" id="nwHome">
        <div class="nw-welcome">
          <div class="nw-ai-dot">AI</div>
          <div class="nw-bubble-msg">Hi! I'm the High Touch Neural assistant. Ask about R.I.S.E., Women's HQ, health access, or how to partner with TPG.</div>
        </div>
        ${quickFacts.map(f => `<div class="nw-fact"><div class="nw-fact-dot"></div>${f}</div>`).join('')}
        <div class="nw-ask-prompt" id="nwAskPrompt">Ask anything about TPG High Touch… →</div>
        <div style="padding-top:8px;padding-bottom:6px">
          ${quickLinks.map(l => `<a class="nw-link" href="${l.href}">${l.label} ${ARROW_SVG}</a>`).join('')}
        </div>
      </div>
      <div class="nw-chat" id="nwChat" style="display:none"></div>
    </div>
    <div class="nw-input-row" id="nwInputRow" style="display:none">
      <input class="nw-input" id="nwInput" placeholder="Ask about High Touch…" autocomplete="off"/>
      <button class="nw-send" id="nwSend" disabled>${SEND_SVG}</button>
    </div>
    <div class="nw-footer">Powered by <span>Nalu AI</span></div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // ── State ────────────────────────────────────────────────────────────────
  let open = false;
  let view = 'home'; // 'home' | 'chat'
  let loading = false;

  const nwHome    = document.getElementById('nwHome');
  const nwChat    = document.getElementById('nwChat');
  const nwInput   = document.getElementById('nwInput');
  const nwSend    = document.getElementById('nwSend');
  const nwInputRow = document.getElementById('nwInputRow');
  const nwClose   = document.getElementById('nwClose');
  const nwHomeBtn = document.getElementById('nwHomeBtn');
  const nwAskPrompt = document.getElementById('nwAskPrompt');

  function showChat() {
    view = 'chat';
    nwHome.style.display = 'none';
    nwChat.style.display = 'flex';
    nwInputRow.style.display = 'flex';
    nwHomeBtn.style.display = 'inline-block';
    setTimeout(() => nwInput.focus(), 100);
  }

  function showHome() {
    view = 'home';
    nwHome.style.display = 'block';
    nwChat.style.display = 'none';
    nwInputRow.style.display = 'none';
    nwHomeBtn.style.display = 'none';
  }

  function togglePanel() {
    open = !open;
    panel.classList.toggle('open', open);
    bubble.innerHTML = open ? CLOSE_SVG : NEURAL_SVG;
    if (open && view === 'chat') setTimeout(() => nwInput.focus(), 150);
  }

  function appendMsg(role, html) {
    const row = document.createElement('div');
    row.className = `nw-msg ${role}`;
    row.innerHTML = `${role === 'ai' ? '<div class="nw-ai-dot">AI</div>' : ''}<div class="nw-msg-bubble">${html}</div>`;
    nwChat.appendChild(row);
    nwChat.scrollTop = nwChat.scrollHeight;
    return row;
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'nw-msg ai';
    row.id = 'nwTyping';
    row.innerHTML = `<div class="nw-ai-dot">AI</div><div class="nw-typing"><div class="nw-dot"></div><div class="nw-dot"></div><div class="nw-dot"></div></div>`;
    nwChat.appendChild(row);
    nwChat.scrollTop = nwChat.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('nwTyping');
    if (t) t.remove();
  }

  function renderText(t) {
    return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  async function sendMessage() {
    const q = nwInput.value.trim();
    if (!q || loading) return;
    nwInput.value = '';
    nwSend.disabled = true;
    loading = true;
    showChat();
    appendMsg('user', q);
    showTyping();
    try {
      const res  = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: KEY, query: q }),
      });
      const data = await res.json();
      removeTyping();
      appendMsg('ai', renderText(data.response || data.error || 'No response.'));
    } catch {
      removeTyping();
      appendMsg('ai', 'Connection error. Please try again.');
    } finally {
      loading = false;
      nwSend.disabled = !nwInput.value.trim();
    }
  }

  // ── Events ───────────────────────────────────────────────────────────────
  bubble.addEventListener('click', togglePanel);
  nwClose.addEventListener('click', togglePanel);
  nwHomeBtn.addEventListener('click', showHome);
  nwAskPrompt.addEventListener('click', showChat);

  nwInput.addEventListener('input', () => { nwSend.disabled = !nwInput.value.trim() || loading; });
  nwInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
  nwSend.addEventListener('click', sendMessage);
})();
