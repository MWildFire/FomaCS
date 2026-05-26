// Training bias → discriminatory outcomes
(function () {
  const canvas = document.getElementById('bias-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const shareInput = document.getElementById('bias-share');
  const shareVal = document.getElementById('bias-share-v');

  const N_TEST = 60;
  let testA = [], testB = [];

  function init() {
    testA = [];
    testB = [];
    // Both groups equally creditworthy: similar distributions
    for (let i = 0; i < N_TEST; i++) {
      testA.push({ score: 30 + Math.random() * 60 });
      testB.push({ score: 30 + Math.random() * 60 });
    }
  }

  function render() {
    const sharePct = parseInt(shareInput.value);
    shareVal.textContent = sharePct + '%';
    const skew = sharePct / 100; // 0.5..0.98

    // Approval rate model — biased toward group A as skew grows.
    // Threshold per group: group B faces a higher bar when training data overweights A.
    // We use a simple shift: threshold_A = base; threshold_B = base + penalty(skew)
    const base = 55;
    const penalty = (skew - 0.5) * 80; // up to 38 points harder for B
    const tA = base;
    const tB = base + penalty;

    const apprA = testA.filter(p => p.score >= tA).length;
    const apprB = testB.filter(p => p.score >= tB).length;
    const rateA = apprA / testA.length;
    const rateB = apprB / testB.length;

    document.getElementById('bias-a-rate').textContent = (rateA * 100).toFixed(0) + '%';
    document.getElementById('bias-b-rate').textContent = (rateB * 100).toFixed(0) + '%';
    const gap = Math.abs(rateA - rateB);
    const gapEl = document.getElementById('bias-gap');
    gapEl.textContent = (gap * 100).toFixed(0) + ' pp';
    gapEl.style.color = gap > 0.3 ? 'var(--red)' : (gap > 0.12 ? 'var(--amber)' : 'var(--green)');

    // Draw
    ctx.clearRect(0, 0, W, H);

    // Training bar at top
    const barY = 30, barH = 30;
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(40, barY, (W - 80) * skew, barH);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(40 + (W - 80) * skew, barY, (W - 80) * (1 - skew), barH);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('Training: Group A — ' + (skew * 100).toFixed(0) + '%', 40 + (W - 80) * skew / 2, barY + 20);
    if ((1 - skew) > 0.05) {
      ctx.fillText('Group B ' + ((1 - skew) * 100).toFixed(0) + '%', 40 + (W - 80) * (skew + (1 - skew) / 2), barY + 20);
    }

    // Group A row
    drawGroup('Group A', '#0ea5e9', testA, tA, 110);
    drawGroup('Group B', '#f59e0b', testB, tB, 230);

    // Caption
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    ctx.fillStyle = '#475569';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'left';
    if (gap > 0.25) {
      ctx.fillStyle = '#b91c1c';
      ctx.fillText(lang === 'ru' ? '⚠ Большой разрыв в одобрениях — алгоритмическая предвзятость' : '⚠ Large approval gap — algorithmic bias', 40, H - 20);
    } else if (gap > 0.1) {
      ctx.fillStyle = '#b45309';
      ctx.fillText(lang === 'ru' ? '⚠ Заметный разрыв — модель учится на скошенных данных' : '⚠ Visible gap — the model is learning skew', 40, H - 20);
    } else {
      ctx.fillStyle = '#047857';
      ctx.fillText(lang === 'ru' ? '✓ Разрыв небольшой' : '✓ Gap is small', 40, H - 20);
    }
  }

  function drawGroup(label, color, group, threshold, y) {
    ctx.fillStyle = color;
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(label, 40, y - 8);

    // Threshold marker
    const x0 = 200, w = W - 240;
    ctx.fillStyle = '#475569';
    ctx.font = '11px system-ui';
    ctx.fillText('Threshold: ' + threshold.toFixed(0), 40, y + 8);

    // Score axis from 0 to 100
    const scoreToX = s => x0 + (s / 100) * w;
    // Background
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(x0, y - 15, w, 85);
    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(x0, y - 15, w, 85);

    // Approval region tint
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.fillRect(scoreToX(threshold), y - 15, scoreToX(100) - scoreToX(threshold), 85);

    // Threshold line
    ctx.strokeStyle = '#1a3a5e';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(scoreToX(threshold), y - 15);
    ctx.lineTo(scoreToX(threshold), y + 70);
    ctx.stroke();
    ctx.setLineDash([]);

    // Dots
    group.forEach((p, i) => {
      const x = scoreToX(p.score);
      const dy = y + 25 + (i % 4) * 10 - 14;
      ctx.beginPath();
      ctx.arc(x, dy, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.score >= threshold ? '#10b981' : '#ef4444';
      ctx.fill();
      ctx.strokeStyle = 'white'; ctx.lineWidth = 1; ctx.stroke();
    });

    // Axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px ui-monospace';
    ctx.textAlign = 'center';
    [0, 50, 100].forEach(s => ctx.fillText(s, scoreToX(s), y + 80));
  }

  shareInput.addEventListener('input', render);
  document.addEventListener('langchange', render);
  init();
  render();
})();
