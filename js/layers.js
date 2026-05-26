// TCP/IP layer encapsulation animation
(function () {
  const svg = document.getElementById('layers-svg');
  if (!svg) return;
  const sendBtn = document.getElementById('layers-send');
  const resetBtn = document.getElementById('layers-reset');
  const NS = 'http://www.w3.org/2000/svg';

  const LAYERS = [
    { en: 'Application', ru: 'Прикладной', detail: { en: 'HTTP / DNS / SMTP', ru: 'HTTP / DNS / SMTP' }, header: 'DATA', color: '#0ea5e9' },
    { en: 'Transport', ru: 'Транспортный', detail: { en: 'TCP / UDP · ports', ru: 'TCP / UDP · порты' }, header: 'TCP', color: '#8b5cf6' },
    { en: 'Internet', ru: 'Межсетевой', detail: { en: 'IP · routing', ru: 'IP · маршрутизация' }, header: 'IP', color: '#f59e0b' },
    { en: 'Network Access', ru: 'Сетевого доступа', detail: { en: 'MAC · physical', ru: 'MAC · физический' }, header: 'ETH', color: '#10b981' }
  ];

  function render(stage = -1) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    // Left column: sender stack (top to bottom = top of stack to bottom)
    const colW = 200;
    const rowH = 60;
    const startY = 30;
    const senderX = 40;
    const receiverX = 560;

    LAYERS.forEach((layer, i) => {
      // Sender layer box
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', senderX); rect.setAttribute('y', startY + i * rowH);
      rect.setAttribute('width', colW); rect.setAttribute('height', rowH - 10);
      rect.setAttribute('rx', 8);
      rect.setAttribute('fill', stage >= i && stage < LAYERS.length ? layer.color : '#f1f5f9');
      rect.setAttribute('stroke', '#cbd5e1');
      svg.appendChild(rect);

      const txt = document.createElementNS(NS, 'text');
      txt.setAttribute('x', senderX + 12); txt.setAttribute('y', startY + i * rowH + 22);
      txt.setAttribute('font-weight', '700'); txt.setAttribute('font-size', '13');
      txt.setAttribute('fill', stage >= i && stage < LAYERS.length ? 'white' : '#0f172a');
      txt.textContent = layer[lang];
      svg.appendChild(txt);

      const sub = document.createElementNS(NS, 'text');
      sub.setAttribute('x', senderX + 12); sub.setAttribute('y', startY + i * rowH + 38);
      sub.setAttribute('font-size', '10');
      sub.setAttribute('font-family', 'ui-monospace, monospace');
      sub.setAttribute('fill', stage >= i && stage < LAYERS.length ? 'rgba(255,255,255,0.85)' : '#475569');
      sub.textContent = layer.detail[lang];
      svg.appendChild(sub);

      // Receiver mirror (bottom to top)
      const recvI = LAYERS.length - 1 - i;
      const rRect = document.createElementNS(NS, 'rect');
      rRect.setAttribute('x', receiverX); rRect.setAttribute('y', startY + recvI * rowH);
      rRect.setAttribute('width', colW); rRect.setAttribute('height', rowH - 10);
      rRect.setAttribute('rx', 8);
      const recvStage = stage - LAYERS.length;
      rRect.setAttribute('fill', recvStage >= i ? layer.color : '#f1f5f9');
      rRect.setAttribute('stroke', '#cbd5e1');
      svg.appendChild(rRect);

      const rTxt = document.createElementNS(NS, 'text');
      rTxt.setAttribute('x', receiverX + 12); rTxt.setAttribute('y', startY + recvI * rowH + 22);
      rTxt.setAttribute('font-weight', '700'); rTxt.setAttribute('font-size', '13');
      rTxt.setAttribute('fill', recvStage >= i ? 'white' : '#0f172a');
      rTxt.textContent = layer[lang];
      svg.appendChild(rTxt);

      const rSub = document.createElementNS(NS, 'text');
      rSub.setAttribute('x', receiverX + 12); rSub.setAttribute('y', startY + recvI * rowH + 38);
      rSub.setAttribute('font-size', '10');
      rSub.setAttribute('font-family', 'ui-monospace, monospace');
      rSub.setAttribute('fill', recvStage >= i ? 'rgba(255,255,255,0.85)' : '#475569');
      rSub.textContent = layer.detail[lang];
      svg.appendChild(rSub);
    });

    // Sender / Receiver labels
    const sendLabel = document.createElementNS(NS, 'text');
    sendLabel.setAttribute('x', senderX); sendLabel.setAttribute('y', 18);
    sendLabel.setAttribute('font-weight', '700'); sendLabel.setAttribute('font-size', '12');
    sendLabel.setAttribute('fill', '#1a3a5e');
    sendLabel.textContent = lang === 'ru' ? 'ОТПРАВИТЕЛЬ (энкапсуляция ↓)' : 'SENDER (encapsulating ↓)';
    svg.appendChild(sendLabel);
    const recvLabel = document.createElementNS(NS, 'text');
    recvLabel.setAttribute('x', receiverX); recvLabel.setAttribute('y', 18);
    recvLabel.setAttribute('font-weight', '700'); recvLabel.setAttribute('font-size', '12');
    recvLabel.setAttribute('fill', '#1a3a5e');
    recvLabel.textContent = lang === 'ru' ? 'ПОЛУЧАТЕЛЬ (де-энкапсуляция ↑)' : 'RECEIVER (de-encapsulating ↑)';
    svg.appendChild(recvLabel);

    // Packet builder visual in the middle
    drawPacket(stage);
  }

  function drawPacket(stage) {
    // Show what headers the packet currently has
    const midX = 280;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    // No stage = idle
    if (stage < 0) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', 400); t.setAttribute('y', 320);
      t.setAttribute('font-size', '12'); t.setAttribute('fill', '#94a3b8');
      t.setAttribute('text-anchor', 'middle');
      t.textContent = lang === 'ru' ? 'Нажмите «Отправить»' : 'Press "Send packet"';
      svg.appendChild(t);
      return;
    }

    // Build a stack of header tags + DATA, from outermost to innermost
    // Stage 0 → just DATA (added by Application)
    // Stage 1 → TCP + DATA
    // Stage 2 → IP + TCP + DATA
    // Stage 3 → ETH + IP + TCP + DATA (on the wire)
    // Stages 4..7 = peeling at receiver
    const headers = [];
    if (stage >= 3 && stage <= 4) headers.push({ label: 'ETH', color: '#10b981' });
    if (stage >= 2 && stage <= 5) headers.push({ label: 'IP', color: '#f59e0b' });
    if (stage >= 1 && stage <= 6) headers.push({ label: 'TCP', color: '#8b5cf6' });
    headers.push({ label: 'DATA', color: '#0ea5e9' });

    // Position packet relative to stage
    let packetX;
    if (stage < 4) {
      // descending sender stack
      packetX = midX + (stage * 8);
    } else if (stage === 4) {
      // mid-flight
      packetX = 400;
    } else {
      // ascending receiver stack
      packetX = midX + (stage - 4) * 8 + 60;
    }
    const packetY = 270;

    // Draw blocks left to right
    let x = packetX - 50;
    const blockW = 36;
    headers.forEach(h => {
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', x); r.setAttribute('y', packetY);
      r.setAttribute('width', blockW); r.setAttribute('height', 30);
      r.setAttribute('fill', h.color); r.setAttribute('rx', 4);
      svg.appendChild(r);
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', x + blockW / 2); t.setAttribute('y', packetY + 19);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '11'); t.setAttribute('fill', 'white');
      t.setAttribute('font-weight', '700');
      t.setAttribute('font-family', 'ui-monospace, monospace');
      t.textContent = h.label;
      svg.appendChild(t);
      x += blockW + 2;
    });

    // Status text
    const status = document.createElementNS(NS, 'text');
    status.setAttribute('x', 400); status.setAttribute('y', 325);
    status.setAttribute('text-anchor', 'middle');
    status.setAttribute('font-size', '12'); status.setAttribute('fill', '#475569');
    const stages = [
      { en: 'Application layer: data ready', ru: 'Прикладной: данные готовы' },
      { en: 'Transport layer: + TCP header (ports, ACK, seq)', ru: 'Транспортный: + заголовок TCP (порты, ACK, seq)' },
      { en: 'Internet layer: + IP header (source/dest IP)', ru: 'Межсетевой: + IP-заголовок (src/dst IP)' },
      { en: 'Network Access: + Ethernet/MAC header', ru: 'Сетевого доступа: + Ethernet/MAC' },
      { en: '→ travelling on the wire →', ru: '→ передача по проводу →' },
      { en: 'Receiver Network Access: ETH header stripped', ru: 'Получатель: сняли ETH' },
      { en: 'Receiver Internet: IP header stripped', ru: 'Получатель: сняли IP' },
      { en: 'Receiver Transport: TCP header stripped', ru: 'Получатель: сняли TCP' },
      { en: 'Receiver Application: original data delivered ✓', ru: 'Получатель: исходные данные доставлены ✓' }
    ];
    status.textContent = (stages[stage] || stages[0])[lang];
    svg.appendChild(status);
  }

  let stage = -1;
  let animTimer = null;

  function step() {
    stage++;
    if (stage > 8) {
      clearInterval(animTimer);
      animTimer = null;
      return;
    }
    render(stage);
  }

  sendBtn.addEventListener('click', () => {
    if (animTimer) return;
    stage = -1;
    animTimer = setInterval(step, 800);
  });
  resetBtn.addEventListener('click', () => {
    if (animTimer) { clearInterval(animTimer); animTimer = null; }
    stage = -1;
    render(-1);
  });
  document.addEventListener('langchange', () => render(stage));

  render(-1);
})();
