// TCP vs UDP packet animation
(function () {
  const canvas = document.getElementById('proto-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const startBtn = document.getElementById('proto-start');
  const resetBtn = document.getElementById('proto-reset');
  const lossInput = document.getElementById('proto-loss');
  const lossVal = document.getElementById('proto-loss-val');
  const speedInput = document.getElementById('proto-speed');

  const NUM_PACKETS = 12;
  const R = 13;
  const X_SENDER = 80, X_RECEIVER = W - 80;
  const LANES = {
    tcp: { y: 90, label: 'TCP', color: '#0ea5e9', arrivalY: 175 },
    udp: { y: 280, label: 'UDP', color: '#f59e0b', arrivalY: 365 }
  };

  let running = false;
  let frame = 0;
  let packets = [];
  let stats;
  let nextSeq;
  let lastSendFrame;
  let speedMul = 3;
  let scheduledRetr = [];

  function initState() {
    packets = [];
    stats = {
      tcp: { sent: 0, recv: 0, retr: 0, lost: 0, delivered: new Set() },
      udp: { sent: 0, recv: 0, retr: 0, lost: 0, delivered: new Set() }
    };
    nextSeq = { tcp: 0, udp: 0 };
    lastSendFrame = { tcp: -100, udp: -100 };
    scheduledRetr = [];
    frame = 0;
    updateStats();
  }

  function lossRate() { return parseInt(lossInput.value) / 100; }
  function sendInterval() {
    speedMul = parseInt(speedInput.value);
    return Math.max(12, 40 - speedMul * 6);
  }

  function spawn(protocol, seqOverride = null, retr = false) {
    const seq = seqOverride !== null ? seqOverride : nextSeq[protocol]++;
    const lane = LANES[protocol];
    const willLose = Math.random() < lossRate();
    packets.push({
      protocol, seq, retr,
      x: X_SENDER + 20, y: lane.y,
      lost: willLose,
      lostAt: willLose ? (X_SENDER + 60 + Math.random() * (X_RECEIVER - X_SENDER - 120)) : null,
      counted: false,
      done: false,
      bornAt: frame
    });
    if (!retr) stats[protocol].sent++;
  }

  function tick() {
    frame++;
    const dx = 1.5 + speedMul * 0.45;
    const si = sendInterval();

    // Spawn new packets
    if (stats.tcp.sent < NUM_PACKETS && frame - lastSendFrame.tcp >= si) {
      spawn('tcp');
      lastSendFrame.tcp = frame;
    }
    if (stats.udp.sent < NUM_PACKETS && frame - lastSendFrame.udp >= si) {
      spawn('udp');
      lastSendFrame.udp = frame;
    }

    // Process scheduled retransmissions
    for (let i = scheduledRetr.length - 1; i >= 0; i--) {
      if (frame >= scheduledRetr[i].fireAt) {
        spawn('tcp', scheduledRetr[i].seq, true);
        stats.tcp.retr++;
        scheduledRetr.splice(i, 1);
      }
    }

    // Move packets
    for (const p of packets) {
      if (p.done) continue;
      const lane = LANES[p.protocol];
      if (p.lost && p.x >= p.lostAt) {
        // Falling off
        p.y += 4;
        if (p.y > lane.y + 60) {
          if (!p.counted) {
            stats[p.protocol].lost++;
            p.counted = true;
            // TCP retransmits with delay
            if (p.protocol === 'tcp') {
              scheduledRetr.push({ seq: p.seq, fireAt: frame + 30 });
            }
          }
          if (p.y > lane.y + 90) p.done = true;
        }
      } else {
        p.x += dx;
        if (!p.lost && p.x >= X_RECEIVER) {
          if (!p.counted) {
            // Only count once per seq
            if (!stats[p.protocol].delivered.has(p.seq)) {
              stats[p.protocol].delivered.add(p.seq);
              stats[p.protocol].recv++;
            }
            p.counted = true;
            p.done = true;
            p.arrivalFrame = frame;
          }
        }
      }
    }

    // Garbage-collect old finished packets
    packets = packets.filter(p => !p.done || (frame - (p.arrivalFrame || frame) < 30 && !p.lost) || (p.lost && !p.counted));
    // (keep recently arrived for a moment for visual smoothness)
    packets = packets.filter(p => {
      if (!p.done) return true;
      if (p.lost) return false;
      return frame - p.arrivalFrame < 12;
    });

    updateStats();

    // End condition
    if (
      stats.tcp.sent >= NUM_PACKETS &&
      stats.udp.sent >= NUM_PACKETS &&
      stats.tcp.recv >= NUM_PACKETS &&
      scheduledRetr.length === 0 &&
      packets.length === 0 &&
      (stats.udp.recv + stats.udp.lost >= NUM_PACKETS)
    ) {
      running = false;
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      startBtn.textContent = lang === 'ru' ? '⟲ Заново' : '⟲ Replay';
    }
  }

  function updateStats() {
    document.getElementById('tcp-recv').textContent = stats.tcp.recv + ' / ' + NUM_PACKETS;
    document.getElementById('tcp-retr').textContent = stats.tcp.retr;
    document.getElementById('udp-recv').textContent = stats.udp.recv + ' / ' + NUM_PACKETS;
    document.getElementById('udp-lost').textContent = stats.udp.lost;
  }

  function drawLane(lane) {
    // backdrop
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(50, lane.y - 30, W - 100, 60);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, lane.y - 30, W - 100, 60);

    // sender
    ctx.fillStyle = lane.color;
    ctx.beginPath();
    ctx.arc(X_SENDER, lane.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px ui-monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SRC', X_SENDER, lane.y + 4);

    // receiver
    ctx.fillStyle = '#1a3a5e';
    ctx.beginPath();
    ctx.arc(X_RECEIVER, lane.y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText('DST', X_RECEIVER, lane.y + 4);

    // protocol label
    ctx.fillStyle = lane.color;
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(lane.label, 18, lane.y - 35);

    // arrival rail
    ctx.fillStyle = '#fff';
    ctx.fillRect(50, lane.arrivalY, W - 100, 34);
    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(50, lane.arrivalY, W - 100, 34);

    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    ctx.font = '10px ui-monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    const labelTxt = lane.label === 'TCP'
      ? (lang === 'ru' ? 'Получатель (TCP упорядочивает по seq)' : 'Receiver buffer (TCP re-orders by seq)')
      : (lang === 'ru' ? 'Получатель (UDP — порядок прихода)' : 'Receiver buffer (UDP — arrival order)');
    ctx.fillText(labelTxt, 56, lane.arrivalY - 4);
  }

  function drawArrivals(protocol) {
    const lane = LANES[protocol];
    const slotW = (W - 140) / NUM_PACKETS;
    for (let i = 0; i < NUM_PACKETS; i++) {
      const x = 70 + i * slotW + slotW / 2;
      const y = lane.arrivalY + 17;
      const has = stats[protocol].delivered.has(i);
      ctx.beginPath();
      ctx.fillStyle = has ? '#10b981' : '#e2e8f0';
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      if (has) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px ui-monospace';
        ctx.textAlign = 'center';
        ctx.fillText(i, x, y + 3);
      } else {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px ui-monospace';
        ctx.textAlign = 'center';
        ctx.fillText(i, x, y + 3);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    drawLane(LANES.tcp);
    drawLane(LANES.udp);

    // Packets in transit
    for (const p of packets) {
      const lane = LANES[p.protocol];
      // colour
      let fill;
      if (p.lost && p.x >= p.lostAt - 1) fill = '#ef4444';
      else if (p.retr) fill = '#f59e0b';
      else fill = lane.color;

      ctx.fillStyle = fill;
      ctx.fillRect(p.x - R, p.y - R, 2 * R, 2 * R);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px ui-monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.seq, p.x, p.y + 4);

      if (p.retr) {
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 8px system-ui';
        ctx.fillText('RTX', p.x, p.y - R - 4);
      }
      if (p.lost && p.x >= p.lostAt - 1) {
        // X mark
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x - R + 3, p.y - R + 3); ctx.lineTo(p.x + R - 3, p.y + R - 3);
        ctx.moveTo(p.x + R - 3, p.y - R + 3); ctx.lineTo(p.x - R + 3, p.y + R - 3);
        ctx.stroke();
      }
    }

    drawArrivals('tcp');
    drawArrivals('udp');
  }

  function loop() {
    if (running) tick();
    draw();
    requestAnimationFrame(loop);
  }

  function start() {
    const allDoneTCP = stats.tcp.sent >= NUM_PACKETS && stats.tcp.recv >= NUM_PACKETS;
    const allDoneUDP = stats.udp.sent >= NUM_PACKETS && (stats.udp.recv + stats.udp.lost >= NUM_PACKETS);
    if (allDoneTCP && allDoneUDP) initState();
    running = true;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    startBtn.textContent = lang === 'ru' ? '⏸ Пауза' : '⏸ Pause';
  }
  function pause() {
    running = false;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    startBtn.textContent = lang === 'ru' ? '▶ Старт' : '▶ Start';
  }

  startBtn.addEventListener('click', () => (running ? pause() : start()));
  resetBtn.addEventListener('click', () => { running = false; initState(); draw(); pause(); });
  lossInput.addEventListener('input', () => { lossVal.textContent = lossInput.value + '%'; });
  document.addEventListener('langchange', () => {
    if (!running) pause(); else { /* keep label */ }
  });

  initState();
  draw();
  loop();
})();
