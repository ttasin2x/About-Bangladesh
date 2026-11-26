    // =========================================================================
    // BKLIT UI CHART ENGINE & DESIGN SYSTEM UPGRADE
    // Implements: CSS Token Theming (Light/Dark), Background Patterns w/ 4-Side
    // Edge Fade, Dashed Edge-Faded Grid, Sparklines w/ useSparklineHover,
    // BarSquares (Squircle LED-Meter) + BarColumnTrack, BarLollipop, PieChart
    // & RingChart + PieCenter/RingCenter, TrendLine (OLS Regression),
    // ChartTooltip (Crosshair + X-Axis Date Pill + Ring Hover Dots), and
    // Skeleton Shimmer Replay (1100ms cubic-bezier(0.85, 0, 0.15, 1)).
    // =========================================================================
    const BklitUI = (function() {
      let _uid = 0;
      const uid = (prefix) => `${prefix}-${++_uid}`;
      const prefersReducedMotion = () =>
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const bklitEase = (t) => {
        // Approximate cubic-bezier(0.85, 0, 0.15, 1)
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const token = (name, fallback) => {
        try {
          const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
          return val || fallback;
        } catch (e) {
          return fallback;
        }
      };

      // 1. Bklit <Background /> — Subtle dot or diagonal pattern with 4-side edge fade
      function addBackground(svg, g, w, h, opts = {}) {
        const variant = opts.variant || 'dots'; // 'dots' | 'diagonal'
        const patId = uid('bklit-pat');
        const maskId = uid('bklit-mask');
        const hGradId = uid('bklit-hfade');
        const vGradId = uid('bklit-vfade');
        const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');

        if (variant === 'diagonal') {
          const pat = defs.append('pattern')
            .attr('id', patId).attr('width', 10).attr('height', 10)
            .attr('patternUnits', 'userSpaceOnUse').attr('patternTransform', 'rotate(45)');
          pat.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 10)
            .attr('stroke', 'var(--chart-grid)').attr('stroke-width', 1.2);
        } else {
          const pat = defs.append('pattern')
            .attr('id', patId).attr('width', 14).attr('height', 14)
            .attr('patternUnits', 'userSpaceOnUse');
          pat.append('circle').attr('cx', 7).attr('cy', 7).attr('r', 1.1)
            .attr('fill', 'var(--chart-grid)');
        }

        // 4-side edge fade mask
        const hg = defs.append('linearGradient').attr('id', hGradId).attr('x1', '0%').attr('x2', '100%');
        hg.append('stop').attr('offset', '0%').attr('stop-color', '#000');
        hg.append('stop').attr('offset', '14%').attr('stop-color', '#fff');
        hg.append('stop').attr('offset', '86%').attr('stop-color', '#fff');
        hg.append('stop').attr('offset', '100%').attr('stop-color', '#000');

        const vg = defs.append('linearGradient').attr('id', vGradId).attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
        vg.append('stop').attr('offset', '0%').attr('stop-color', '#000');
        vg.append('stop').attr('offset', '14%').attr('stop-color', '#fff');
        vg.append('stop').attr('offset', '86%').attr('stop-color', '#fff');
        vg.append('stop').attr('offset', '100%').attr('stop-color', '#000');

        const msk = defs.append('mask').attr('id', maskId);
        msk.append('rect').attr('width', w).attr('height', h).attr('fill', `url(#${hGradId})`);
        msk.append('rect').attr('width', w).attr('height', h).attr('fill', `url(#${vGradId})`).style('mix-blend-mode', 'multiply');

        g.append('rect')
          .attr('class', 'bklit-bg-rect')
          .attr('width', w).attr('height', h)
          .attr('fill', `url(#${patId})`)
          .attr('mask', `url(#${maskId})`)
          .attr('opacity', opts.opacity ?? 0.9)
          .style('pointer-events', 'none');
      }

      // 2. Bklit <Grid /> — Dashed horizontal gridlines with horizontal edge fade
      function addGrid(svg, g, yScale, w, ticks, opts = {}) {
        const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
        const gradId = uid('bklit-gridfade');
        const gr = defs.append('linearGradient').attr('id', gradId).attr('x1', '0%').attr('x2', '100%');
        gr.append('stop').attr('offset', '0%').attr('stop-color', 'var(--chart-grid)').attr('stop-opacity', 0.15);
        gr.append('stop').attr('offset', '12%').attr('stop-color', 'var(--chart-grid)').attr('stop-opacity', 1);
        gr.append('stop').attr('offset', '88%').attr('stop-color', 'var(--chart-grid)').attr('stop-opacity', 1);
        gr.append('stop').attr('offset', '100%').attr('stop-color', 'var(--chart-grid)').attr('stop-opacity', 0.15);

        const gridG = g.append('g').attr('class', 'bklit-grid');
        ticks.forEach(tk => {
          const isHl = Array.isArray(opts.highlightRowValues) && opts.highlightRowValues.includes(tk);
          gridG.append('line')
            .attr('x1', 0).attr('x2', w)
            .attr('y1', yScale(tk)).attr('y2', yScale(tk))
            .attr('stroke', isHl ? 'var(--chart-line-primary)' : `url(#${gradId})`)
            .attr('stroke-width', isHl ? 1.4 : 1)
            .attr('stroke-dasharray', isHl ? 'none' : '3 4')
            .attr('opacity', isHl ? 0.55 : 1);
          if (opts.formatTick) {
            gridG.append('text')
              .attr('x', -10).attr('y', yScale(tk) + 3.5)
              .attr('text-anchor', 'end')
              .style('font-size', '10px').style('font-weight', '600')
              .style('fill', 'var(--chart-muted)')
              .style('font-variant-numeric', 'tabular-nums')
              .text(opts.formatTick(tk));
          }
        });
      }

      // 3. Bklit <TrendLine /> — Least-squares linear regression helper
      function computeTrend(values) {
        const n = values.length;
        if (n < 2) return values.slice();
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        for (let i = 0; i < n; i++) {
          sumX += i; sumY += values[i]; sumXY += i * values[i]; sumXX += i * i;
        }
        const denom = (n * sumXX - sumX * sumX) || 1;
        const slope = (n * sumXY - sumX * sumY) / denom;
        const intercept = (sumY - slope * sumX) / n;
        return values.map((_, i) => intercept + slope * i);
      }

      // 4. Bklit BarSquares (Squircle LED-Meter Segmented Bar + Ghost Track)
      function squircleBarHTML(pct, colorExpr, totalCells = 24, refPct = null) {
        const clamped = Math.max(0, Math.min(100, pct));
        const filled = Math.max(1, Math.round((clamped / 100) * totalCells));
        let cells = '';
        for (let i = 0; i < totalCells; i++) {
          const on = i < filled;
          cells += `<span class="bklit-sq-cell ${on ? 'is-filled' : ''}" style="${on ? `--sq-color:${colorExpr};--sq-idx:${i};` : ''}"></span>`;
        }
        const refLine = refPct !== null
          ? `<div class="benchmark-tick" style="left:${refPct}%;background:var(--chart-ink);opacity:0.45;" title="Benchmark ${refPct}%"></div>`
          : '';
        return `<div class="bklit-squircle-track">${refLine}${cells}</div>`;
      }

      // 5. Bklit BarLollipop SVG Chart (Thin stem + ring/dot cap)
      function renderLollipop(container, items, opts = {}) {
        if (typeof d3 === 'undefined' || !container) return;
        const isBn = state.lang === 'bn';
        const W = 560;
        const rowH = 44;
        const m = { t: 10, r: 96, b: 14, l: 126 };
        const H = m.t + m.b + items.length * rowH;
        const innerW = W - m.l - m.r;
        const innerH = H - m.t - m.b;

        container.innerHTML = `<svg class="w-full" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bklit Lollipop Chart"></svg>`;
        const svg = d3.select(container).select('svg');
        const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);

        const maxVal = d3.max(items, d => d.value) * 1.08 || 1;
        const x = d3.scaleLinear().domain([0, maxVal]).range([0, innerW]);
        const y = d3.scaleBand().domain(items.map(d => d.id)).range([0, innerH]).padding(0.32);

        // Subtle vertical baseline
        g.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', innerH)
          .attr('stroke', 'var(--chart-border)').attr('stroke-width', 1.5);

        const dur = prefersReducedMotion() ? 0 : 950;
        items.forEach((d, i) => {
          const cy = y(d.id) + y.bandwidth() / 2;
          const tx = Math.max(8, x(d.value));
          const rowG = g.append('g').style('cursor', 'pointer');

          // Ghost track
          rowG.append('line').attr('x1', 0).attr('x2', innerW).attr('y1', cy).attr('y2', cy)
            .attr('stroke', 'var(--chart-track)').attr('stroke-width', 2).attr('stroke-dasharray', '2 4');

          // Label
          rowG.append('text').attr('x', -10).attr('y', cy + 4).attr('text-anchor', 'end')
            .style('font-size', '12px').style('font-weight', '700').style('fill', 'var(--chart-ink)')
            .text(d.label);

          // Stem
          const stem = rowG.append('line').attr('x1', 0).attr('x2', 0).attr('y1', cy).attr('y2', cy)
            .attr('stroke', d.color).attr('stroke-width', 3).attr('stroke-linecap', 'round');
          stem.transition().duration(dur).delay(i * 65).ease(bklitEase).attr('x2', tx);

          // Ring outer + inner dot cap
          const ring = rowG.append('circle').attr('cx', 0).attr('cy', cy).attr('r', 8.5)
            .attr('fill', 'var(--chart-surface)').attr('stroke', d.color).attr('stroke-width', 2.4);
          ring.transition().duration(dur).delay(i * 65).ease(bklitEase).attr('cx', tx);

          const dot = rowG.append('circle').attr('cx', 0).attr('cy', cy).attr('r', 3.4)
            .attr('fill', d.color);
          dot.transition().duration(dur).delay(i * 65).ease(bklitEase).attr('cx', tx);

          // Value label
          const valLbl = rowG.append('text').attr('x', tx + 15).attr('y', cy + 4)
            .style('font-size', '11.5px').style('font-weight', '800').style('fill', 'var(--chart-ink)')
            .style('font-variant-numeric', 'tabular-nums').attr('opacity', 0)
            .text(d.valueLabel);
          valLbl.transition().duration(400).delay(i * 65 + (dur ? 450 : 0)).attr('opacity', 1);

          // Hover interaction
          rowG.append('rect').attr('x', -m.l).attr('y', cy - rowH / 2).attr('width', W).attr('height', rowH)
            .attr('fill', 'transparent')
            .on('mouseenter', (ev) => {
              ring.attr('r', 10.5);
              if (d.tipHtml) showChartTooltip(ev, d.tipHtml);
            })
            .on('mousemove', (ev) => positionChartTooltip(ev))
            .on('mouseleave', () => {
              ring.attr('r', 8.5);
              hideChartTooltip();
            })
            .on('click', () => { if (opts.onClick) opts.onClick(d); });
        });
      }

      // 6. Bklit Sparkline + useSparklineHover (AreaSparkline / LineSparkline / BarSparkline)
      function renderSparklineCard(cardEl, cfg) {
        if (typeof d3 === 'undefined' || !cardEl) return;
        const valEl = cardEl.querySelector('[data-spark-val]');
        const periodEl = cardEl.querySelector('[data-spark-period]');
        const wrap = cardEl.querySelector('.bklit-sparkline-wrap');
        if (!wrap) return;

        const W = 220, H = 46, pad = 4;
        const pts = cfg.series;
        const last = pts[pts.length - 1];
        const color = cfg.color || 'var(--chart-1)';
        const kind = cfg.kind || 'area'; // 'area' | 'line' | 'bar'
        const gradId = uid('bklit-spg');

        wrap.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"></svg>`;
        const svg = d3.select(wrap).select('svg');
        const defs = svg.append('defs');
        const lg = defs.append('linearGradient').attr('id', gradId).attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
        lg.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.28);
        lg.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0.01);

        const minV = d3.min(pts, d => d.v);
        const maxV = d3.max(pts, d => d.v);
        const span = (maxV - minV) || 1;
        const x = d3.scaleLinear().domain([0, pts.length - 1]).range([pad, W - pad]);
        const y = d3.scaleLinear().domain([minV - span * 0.12, maxV + span * 0.14]).range([H - pad, pad]);
        const dur = prefersReducedMotion() ? 0 : 900;

        let barsSel = null, mainPath = null, areaPath = null, endDot = null;

        if (kind === 'bar') {
          const bw = Math.max(4, (W - pad * 2) / pts.length - 3);
          barsSel = svg.selectAll('rect.sp-bar').data(pts).enter().append('rect')
            .attr('class', 'sp-bar')
            .attr('x', (d, i) => x(i) - bw / 2)
            .attr('width', bw)
            .attr('rx', 3)
            .attr('y', H - pad).attr('height', 0)
            .attr('fill', color)
            .style('transition', 'opacity 0.18s ease');
          barsSel.transition().duration(dur).delay((d, i) => i * 40).ease(bklitEase)
            .attr('y', d => y(d.v))
            .attr('height', d => Math.max(3, (H - pad) - y(d.v)));
        } else {
          const lineGen = d3.line().x((d, i) => x(i)).y(d => y(d.v)).curve(d3.curveMonotoneX);
          if (kind === 'area') {
            const areaGen = d3.area().x((d, i) => x(i)).y0(H - pad).y1(d => y(d.v)).curve(d3.curveMonotoneX);
            areaPath = svg.append('path').datum(pts).attr('d', areaGen).attr('fill', `url(#${gradId})`)
              .attr('opacity', 0).style('transition', 'opacity 0.2s ease');
            areaPath.transition().duration(dur).ease(bklitEase).attr('opacity', 1);
          }
          mainPath = svg.append('path').datum(pts).attr('d', lineGen)
            .attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.2)
            .attr('stroke-linecap', 'round').style('transition', 'opacity 0.2s ease');
          const len = mainPath.node() ? mainPath.node().getTotalLength() : 260;
          if (dur > 0) {
            mainPath.attr('stroke-dasharray', `${len} ${len}`).attr('stroke-dashoffset', len)
              .transition().duration(dur).ease(bklitEase).attr('stroke-dashoffset', 0)
              .on('end', function() { d3.select(this).attr('stroke-dasharray', 'none'); });
          }
          endDot = svg.append('circle')
            .attr('cx', x(pts.length - 1)).attr('cy', y(last.v)).attr('r', 3.4)
            .attr('fill', color).attr('stroke', 'var(--chart-surface)').attr('stroke-width', 1.6);
        }

        // useSparklineHover crosshair + active ring dot (no floating tooltip by Bklit design)
        const crosshair = svg.append('line').attr('y1', 0).attr('y2', H)
          .attr('stroke', 'var(--chart-crosshair)').attr('stroke-width', 1.2).attr('stroke-dasharray', '2 3')
          .style('opacity', 0).style('pointer-events', 'none');
        const hoverRing = svg.append('circle').attr('r', 5)
          .attr('fill', 'var(--chart-surface)').attr('stroke', color).attr('stroke-width', 2.2)
          .style('opacity', 0).style('pointer-events', 'none');

        const setActive = (idx) => {
          const p = pts[idx];
          if (!p) return;
          const px = x(idx), py = y(p.v);
          crosshair.attr('x1', px).attr('x2', px).style('opacity', 0.85);
          if (kind === 'bar' && barsSel) {
            barsSel.style('opacity', (d, i) => i === idx ? 1 : 0.38);
          } else {
            hoverRing.attr('cx', px).attr('cy', py).style('opacity', 1);
            if (mainPath) mainPath.style('opacity', 0.55);
            if (areaPath) areaPath.style('opacity', 0.55);
          }
          if (valEl) valEl.textContent = cfg.formatVal(p.v);
          if (periodEl) periodEl.textContent = p.lbl;
        };

        const resetActive = () => {
          crosshair.style('opacity', 0);
          hoverRing.style('opacity', 0);
          if (barsSel) barsSel.style('opacity', 1);
          if (mainPath) mainPath.style('opacity', 1);
          if (areaPath) areaPath.style('opacity', 1);
          if (valEl) valEl.textContent = cfg.formatVal(last.v);
          if (periodEl) periodEl.textContent = cfg.defaultPeriod;
        };

        svg.append('rect').attr('width', W).attr('height', H).attr('fill', 'transparent')
          .on('mousemove touchmove', function(ev) {
            const [mx] = d3.pointer(ev, this);
            const idx = Math.max(0, Math.min(pts.length - 1, Math.round(x.invert(mx))));
            setActive(idx);
          })
          .on('mouseleave touchend', resetActive);
      }

      // 7. Brief Bklit Skeleton Shimmer helper for chart replay
      function withShimmer(targetEl, fn) {
        if (!targetEl || prefersReducedMotion()) { fn(); return; }
        targetEl.classList.add('bklit-shimmer');
        setTimeout(() => {
          targetEl.classList.remove('bklit-shimmer');
          fn();
        }, 220);
      }

      return { uid, prefersReducedMotion, bklitEase, token, addBackground, addGrid, computeTrend, squircleBarHTML, renderLollipop, renderSparklineCard, withShimmer };
    })();

    // Bklit Interactive State Extensions
    const bklitState = {
      relChartGeom: 'donut',     // 'donut' | 'rings'
      relBarStyle: 'squircle',   // 'squircle' | 'rounded' | 'lollipop'
      wLineShowTrend: false,
      wBarStyle: 'squircle',     // 'squircle' | 'rounded'
      theme: 'light'
    };

    // =========================================================================
    // LIGHT / DARK THEME CONTROLLER (Bklit CSS Token Architecture)
    // =========================================================================
    (function initBklitTheme() {
      let saved = 'light';
      try { saved = localStorage.getItem('bongobhumi_theme') || 'light'; } catch (e) {}
      const applyTheme = (mode) => {
        bklitState.theme = mode;
        document.documentElement.classList.toggle('dark', mode === 'dark');
        const sun = document.getElementById('iconSun');
        const moon = document.getElementById('iconMoon');
        if (sun && moon) {
          sun.classList.toggle('hidden', mode !== 'dark');
          moon.classList.toggle('hidden', mode === 'dark');
        }
        try { localStorage.setItem('bongobhumi_theme', mode); } catch (e) {}
      };
      applyTheme(saved);
      const btn = document.getElementById('btnThemeToggle');
      if (btn) {
        btn.addEventListener('click', () => {
          applyTheme(bklitState.theme === 'dark' ? 'light' : 'dark');
        });
      }
    })();

    // =========================================================================
    // UPGRADED RELIGION PIECHART (DONUT) & RINGCHART + LINKED EXTERNAL LEGEND
    // =========================================================================
    const _origRenderReligionDonut = renderReligionDonut;
    renderReligionDonut = function(animateEntry = false) {
      const isBn = state.lang === 'bn';
      const sel = RELIGIONS_2022.find(r => r.id === state.selectedReligionId) || RELIGIONS_2022[0];
      const svgEl = document.getElementById('religionDonutSvg');
      const btnD = document.getElementById('btnRelStyleDonut');
      const btnR = document.getElementById('btnRelStyleRings');
      if (btnD && btnR) {
        btnD.textContent = isBn ? 'ডোনাট' : 'Donut';
        btnR.textContent = isBn ? 'রিং' : 'Rings';
        btnD.classList.toggle('active', bklitState.relChartGeom === 'donut');
        btnR.classList.toggle('active', bklitState.relChartGeom === 'rings');
      }

      if (typeof d3 !== 'undefined' && svgEl) {
        const svg = d3.select('#religionDonutSvg');
        const size = 280;
        const dur = BklitUI.prefersReducedMotion() ? 0 : 1100;

        if (bklitState.relChartGeom === 'rings') {
          // Bklit RingChart: Concentric Progress Arcs + RingCenter
          svg.selectAll('*').remove();
          svg.attr('data-lang', state.lang);
          const g = svg.append('g').attr('class', 'donut-root').attr('transform', `translate(${size / 2},${size / 2})`);
          const ringWidth = 10, ringGap = 5, outerStart = 122;

          RELIGIONS_2022.forEach((r, idx) => {
            const outerR = outerStart - idx * (ringWidth + ringGap);
            const innerR = outerR - ringWidth;
            const isSel = r.id === sel.id;
            const sweepAngle = Math.max(0.28, (r.pct / 100) * Math.PI * 2);

            // Ghost track ring
            const trackArc = d3.arc().innerRadius(innerR).outerRadius(outerR).startAngle(0).endAngle(Math.PI * 2);
            g.append('path').attr('d', trackArc()).attr('fill', 'var(--chart-track)').attr('opacity', 0.85);

            // Active progress arc with rounded caps
            const progArc = d3.arc().innerRadius(innerR).outerRadius(outerR).cornerRadius(ringWidth / 2).startAngle(0);
            const path = g.append('path')
              .attr('fill', r.color)
              .attr('opacity', isSel ? 1 : 0.65)
              .style('cursor', 'pointer')
              .on('mouseenter', (ev) => {
                if (state.selectedReligionId !== r.id) {
                  state.selectedReligionId = r.id;
                  renderReligionDonut(false);
                  renderReligionDetailCards();
                }
                showChartTooltip(ev,
                  `<div class="flex items-center gap-2 font-bold mb-1"><span style="width:9px;height:9px;border-radius:99px;background:${r.color};display:inline-block;"></span>${isBn ? r.nameBn : r.nameEn}</div>` +
                  `<div class="text-xs font-extrabold bklit-num" style="color:${r.color}">${fmtNum(r.pct, state.lang)}% · ${fmtNum(r.pop, state.lang)}</div>`
                );
              })
              .on('mousemove', (ev) => positionChartTooltip(ev))
              .on('mouseleave', hideChartTooltip)
              .on('click', () => {
                state.selectedReligionId = r.id;
                renderReligionDonut(false);
                renderReligionDetailCards();
              });

            if (animateEntry && dur > 0) {
              path.transition().duration(dur).delay(idx * 80).ease(BklitUI.bklitEase)
                .attrTween('d', () => {
                  const interp = d3.interpolate(0, sweepAngle);
                  return t => progArc({ endAngle: interp(t) });
                });
            } else {
              path.attr('d', progArc({ endAngle: sweepAngle }));
            }
          });

          // RingCenter
          const centerG = g.append('g').attr('class', 'donut-center');
          centerG.append('text').attr('text-anchor', 'middle').attr('y', -8)
            .style('font-size', '11px').style('font-weight', '700').style('fill', 'var(--chart-muted)')
            .text(isBn ? sel.nameBn : sel.nameEn);
          centerG.append('text').attr('text-anchor', 'middle').attr('y', 14)
            .style('font-size', '20px').style('font-weight', '800').style('fill', sel.color)
            .style('font-variant-numeric', 'tabular-nums')
            .text(`${fmtNum(sel.pct, state.lang)}%`);
        } else {
          // Bklit PieChart (Donut) + PieCenter
          const radius = 110, innerR = 68;
          const pie = d3.pie().sort(null).value(d => Math.max(d.pct, 1.8)).padAngle(0.028);
          const arc = d3.arc().innerRadius(innerR).outerRadius(radius).cornerRadius(8);
          const arcActive = d3.arc().innerRadius(innerR - 2).outerRadius(radius + 8).cornerRadius(8);
          const pieData = pie(RELIGIONS_2022);

          svg.selectAll('*').remove();
          svg.attr('data-lang', state.lang);
          const g = svg.append('g').attr('class', 'donut-root').attr('transform', `translate(${size / 2},${size / 2})`);

          // Ghost track ring
          g.append('circle').attr('r', (radius + innerR) / 2).attr('fill', 'none')
            .attr('stroke', 'var(--chart-track)').attr('stroke-width', radius - innerR);

          const paths = g.selectAll('path.donut-slice').data(pieData, d => d.data.id).enter()
            .append('path').attr('class', 'donut-slice')
            .attr('fill', d => d.data.color)
            .attr('stroke', 'var(--chart-surface)').attr('stroke-width', 2)
            .style('cursor', 'pointer')
            .on('mouseenter', function(ev, d) {
              if (state.selectedReligionId !== d.data.id) {
                state.selectedReligionId = d.data.id;
                renderReligionDonut(false);
                renderReligionDetailCards();
              }
              const r = d.data;
              showChartTooltip(ev,
                `<div class="flex items-center gap-2 font-bold mb-1"><span style="width:9px;height:9px;border-radius:99px;background:${r.color};display:inline-block;"></span>${isBn ? r.nameBn : r.nameEn}</div>` +
                `<div class="text-xs font-extrabold bklit-num" style="color:${r.color}">${fmtNum(r.pct, state.lang)}% · ${fmtNum(r.pop, state.lang)}</div>` +
                `<div class="text-[11px] opacity-75 mt-0.5">${isBn ? 'বিবিএস ২০২২ জনশুমারি' : 'BBS 2022 Census'}</div>`
              );
            })
            .on('mousemove', ev => positionChartTooltip(ev))
            .on('mouseleave', hideChartTooltip)
            .on('click', (ev, d) => {
              state.selectedReligionId = d.data.id;
              renderReligionDonut(false);
              renderReligionDetailCards();
            });

          if (animateEntry && dur > 0) {
            paths.transition().duration(dur).delay((d, i) => i * 65).ease(BklitUI.bklitEase)
              .attrTween('d', function(d) {
                const targetArc = d.data.id === sel.id ? arcActive : arc;
                const interp = d3.interpolate(d.startAngle, d.endAngle);
                return t => targetArc({ ...d, endAngle: interp(t) });
              })
              .attr('opacity', d => d.data.id === sel.id ? 1 : 0.72);
          } else {
            paths.attr('d', d => d.data.id === sel.id ? arcActive(d) : arc(d))
              .attr('opacity', d => d.data.id === sel.id ? 1 : 0.72);
          }

          // PieCenter
          const centerG = g.append('g').attr('class', 'donut-center');
          centerG.append('text').attr('text-anchor', 'middle').attr('y', -16)
            .style('font-size', '12.5px').style('font-weight', '700').style('fill', 'var(--chart-muted)')
            .text(isBn ? sel.nameBn : sel.nameEn);
          const pctText = centerG.append('text').attr('text-anchor', 'middle').attr('y', 13)
            .style('font-size', '26px').style('font-weight', '800').style('fill', sel.color)
            .style('font-variant-numeric', 'tabular-nums')
            .text(`${fmtNum(sel.pct, state.lang)}%`);
          if (animateEntry && dur > 0) {
            animateTextNumber(pctText, 0, sel.pct, 820, v => `${fmtNum(Number(v.toFixed(2)), state.lang)}%`);
          }
          centerG.append('text').attr('text-anchor', 'middle').attr('y', 35)
            .style('font-size', '11px').style('font-weight', '600').style('fill', 'var(--chart-muted)')
            .style('font-variant-numeric', 'tabular-nums')
            .text(fmtNum(sel.pop, state.lang));
        }
      }

      // External Bklit Legend with LegendProgress & Linked Hover
      const legend = document.getElementById('religionLegend');
      if (legend) {
        legend.innerHTML = RELIGIONS_2022.map(r => {
          const active = r.id === sel.id;
          return `
            <button type="button" data-rel-id="${r.id}" class="w-full px-3.5 py-2 rounded-[14px] border text-left transition-all duration-200 ${active ? 'bg-[#E6F2EC] border-[#0F7A53]' : 'bg-white border-[#E4E8E6] hover:border-[#0F6B4F]'}">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5 min-w-0">
                  <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${r.color}"></span>
                  <span class="text-sm font-bold text-[#16211C] truncate">${isBn ? r.nameBn : r.nameEn}</span>
                </div>
                <div class="flex items-center gap-2.5 shrink-0 bklit-num">
                  <span class="text-xs text-[#5D6762] hidden sm:inline">${fmtNum(r.pop, state.lang)}</span>
                  <span class="text-xs font-extrabold px-2 py-0.5 rounded-full ${active ? 'bg-[#0F7A53] text-white' : 'bg-[#E6EFEA] text-[#16211C]'}">${fmtNum(r.pct, state.lang)}%</span>
                </div>
              </div>
              <div class="bklit-legend-progress">
                <div class="bklit-legend-progress-fill" style="width:${Math.max(2, r.pct)}%;background:${r.color};"></div>
              </div>
            </button>
          `;
        }).join('');

        legend.querySelectorAll('button[data-rel-id]').forEach(btn => {
          const activate = () => {
            if (state.selectedReligionId !== btn.dataset.relId) {
              state.selectedReligionId = btn.dataset.relId;
              renderReligionDonut(false);
              renderReligionDetailCards();
            }
          };
          btn.addEventListener('mouseenter', activate);
          btn.addEventListener('click', activate);
        });
      }
    };

    // =========================================================================
    // UPGRADED RELIGION BAR CHART (BarSquares Squircle / Rounded / BarLollipop)
    // =========================================================================
    const _origRenderReligionBarChart = renderReligionBarChart;
    renderReligionBarChart = function() {
      const isBn = state.lang === 'bn';
      const styleWrap = document.getElementById('relBarStyleWrap');
      const bSq = document.getElementById('btnRelBarSquircle');
      const bRd = document.getElementById('btnRelBarRounded');
      const bLp = document.getElementById('btnRelBarLollipop');
      if (bSq && bRd && bLp) {
        bSq.textContent = isBn ? 'স্কোয়ার্কল' : 'Squircle';
        bRd.textContent = isBn ? 'রাউন্ডেড' : 'Rounded';
        bLp.textContent = isBn ? 'ললিপপ' : 'Lollipop';
        bSq.classList.toggle('active', bklitState.relBarStyle === 'squircle');
        bRd.classList.toggle('active', bklitState.relBarStyle === 'rounded');
        bLp.classList.toggle('active', bklitState.relBarStyle === 'lollipop');
      }
      if (styleWrap) {
        styleWrap.classList.toggle('hidden', state.religionChartMode !== 'minority');
      }

      if (state.religionChartMode !== 'minority' || bklitState.relBarStyle === 'rounded') {
        _origRenderReligionBarChart();
        return;
      }

      ['minority', 'trend', 'div'].forEach(m => {
        const id = m === 'minority' ? 'relChartModeMinority' : (m === 'trend' ? 'relChartModeTrend' : 'relChartModeDiv');
        document.getElementById(id)?.classList.toggle('active', state.religionChartMode === m);
      });

      const wrap = document.getElementById('religionBarChartWrap');
      const caption = document.getElementById('barCaption');
      const note = document.getElementById('religionChartNote');
      const minorities = RELIGIONS_2022.filter(r => r.id !== 'islam');
      const totalMin = minorities.reduce((s, x) => s + x.pop, 0);
      const maxPop = Math.max(...minorities.map(m => m.pop));

      caption.textContent = isBn
        ? 'বাংলাদেশের সংখ্যালঘু ধর্মীয় জনগোষ্ঠীর মোট সংখ্যা (বিবিএস ২০২২ — যেকোনো বারে হোভার বা ক্লিক করুন)'
        : 'Population of religious minorities in Bangladesh (BBS 2022 — hover or click to inspect)';

      if (bklitState.relBarStyle === 'lollipop') {
        const items = minorities.map(m => {
          const shareOfMin = ((m.pop / totalMin) * 100).toFixed(1);
          return {
            id: m.id,
            label: isBn ? m.nameBn : m.nameEn,
            value: m.pop,
            valueLabel: `${fmtNum(m.pct, state.lang)}%`,
            color: m.color,
            tipHtml: `<div class='font-bold mb-1'>${isBn ? m.nameBn : m.nameEn}</div>` +
              `<div class='font-extrabold bklit-num' style='color:${m.color}'>${fmtNum(m.pop, state.lang)} (${fmtNum(m.pct, state.lang)}%)</div>` +
              `<div class='text-[11px] opacity-75 mt-0.5'>${isBn ? 'সংখ্যালঘুদের মধ্যে অংশ' : 'Share among minorities'}: ${fmtNum(shareOfMin, state.lang)}%</div>`
          };
        });
        BklitUI.renderLollipop(wrap, items, {
          onClick: (d) => {
            state.selectedReligionId = d.id;
            renderReligionDonut(false);
            renderReligionDetailCards();
          }
        });
      } else {
        // Bklit BarSquares (Squircle LED-Meter + BarColumnTrack)
        wrap.innerHTML = `
          <div class="space-y-3 chart-rows-dimming">
            ${minorities.map(m => {
              const wPct = Math.max(6, (m.pop / maxPop) * 100);
              const shareOfMin = ((m.pop / totalMin) * 100).toFixed(1);
              const tip = `<div class='font-bold mb-1'>${isBn ? m.nameBn : m.nameEn}</div>` +
                `<div class='font-extrabold bklit-num' style='color:${m.color}'>${fmtNum(m.pop, state.lang)} (${fmtNum(m.pct, state.lang)}%)</div>` +
                `<div class='text-[11px] opacity-75 mt-0.5'>${isBn ? 'সংখ্যালঘুদের মধ্যে অংশ' : 'Share among minorities'}: ${fmtNum(shareOfMin, state.lang)}%</div>`;
              return `
                <div class="chart-row-interactive space-y-1.5 ${state.selectedReligionId === m.id ? 'is-focused' : ''}" data-rel-bar="${m.id}" data-tip-html="${tip.replace(/"/g, '&quot;')}">
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-heading font-bold text-[#16211C] flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${m.color}"></span>
                      ${isBn ? m.nameBn : m.nameEn}
                    </span>
                    <span class="text-xs font-bold text-[#2B352F] bklit-num">${fmtNum(m.pop, state.lang)} <span class="text-[#5D6762]">(${fmtNum(m.pct, state.lang)}%)</span></span>
                  </div>
                  ${BklitUI.squircleBarHTML(wPct, m.color, 24)}
                </div>
              `;
            }).join('')}
          </div>
        `;
        wrap.querySelectorAll('[data-rel-bar]').forEach(row => {
          row.addEventListener('click', () => {
            state.selectedReligionId = row.dataset.relBar;
            renderReligionDonut(false);
            renderReligionDetailCards();
            wrap.querySelectorAll('[data-rel-bar]').forEach(el => el.classList.toggle('is-focused', el === row));
          });
        });
        bindTooltipElements(wrap);
      }

      note.innerHTML = isBn
        ? '<strong>তথ্য নোট:</strong> মোট গণনাকৃত ১৬ কোটি ৫১ লক্ষ ৫৮ হাজার ৬১৬ জনের মধ্যে ইসলাম ধর্মাবলম্বী ১৫ কোটি ৩ লক্ষ ৬০ হাজার ৪০৪ জন (৯১.০৪%) এবং সব সংখ্যালঘু ধর্ম মিলিয়ে মোট ১ কোটি ৪৮ লক্ষ ৩১ হাজার ২৪২ জন (৮.৯৬%)।'
        : '<strong>Data Note:</strong> Out of 165,158,616 enumerated people in 2022, Islam accounts for 150,360,404 (91.04%) while minority faiths combined represent ~14.83 million (8.96%).';
    };

    // =========================================================================
    // UPGRADED WORLD PAGE KPI SPARKLINE STAT CARDS + LINE + RADAR + BAR CHARTS
    // =========================================================================
    const _origRenderWorldPage = renderWorldPage;
    renderWorldPage = function() {
      _origRenderWorldPage();
      const isBn = state.lang === 'bn';
      const kpiWrap = document.getElementById('wHeroKpis');
      if (kpiWrap) {
        const sparkKpis = [
          {
            id: 'wkpi-pop',
            lbl: isBn ? 'জনসংখ্যা (বিশ্বে ৮ম)' : 'Population (#8 Globally)',
            badge: '2.15% World',
            pos: true,
            kind: 'area',
            color: 'var(--chart-1)',
            defaultPeriod: isBn ? '২০২৫ · ০.১০% ভূমিতে' : '2025 · on 0.10% land',
            formatVal: v => `${fmtNum(v, state.lang)}M`,
            series: [
              { lbl: '1971', v: 67.8 }, { lbl: '1991', v: 111.4 }, { lbl: '2001', v: 130.5 },
              { lbl: '2011', v: 149.8 }, { lbl: '2022', v: 165.2 }, { lbl: '2025', v: 171.6 }
            ]
          },
          {
            id: 'wkpi-gdp',
            lbl: isBn ? 'জিডিপি অর্থনীতি (#৩৬)' : 'GDP Economy (#36)',
            badge: 'PPP #26',
            pos: true,
            kind: 'line',
            color: 'var(--chart-2)',
            defaultPeriod: isBn ? 'IMF ২০২৬ প্রাক্কলন' : 'IMF 2026 est.',
            formatVal: v => `$${fmtNum(v, state.lang)}B`,
            series: [
              { lbl: '2000', v: 53 }, { lbl: '2010', v: 115 }, { lbl: '2015', v: 195 },
              { lbl: '2020', v: 374 }, { lbl: '2024', v: 455 }, { lbl: '2026', v: 506 }
            ]
          },
          {
            id: 'wkpi-mil',
            lbl: isBn ? 'সামরিক শক্তি সূচক' : 'Military Power (GFP)',
            badge: 'Top 26%',
            pos: true,
            kind: 'bar',
            color: 'var(--chart-4)',
            defaultPeriod: isBn ? 'GFP ২০২৬ · ৩৭তম / ১৪৫' : 'GFP 2026 · 37th / 145',
            formatVal: v => `#${fmtNum(v, state.lang)}`,
            series: [
              { lbl: '2018', v: 56 }, { lbl: '2020', v: 46 }, { lbl: '2022', v: 46 },
              { lbl: '2024', v: 37 }, { lbl: '2025', v: 35 }, { lbl: '2026', v: 37 }
            ]
          },
          {
            id: 'wkpi-rmg',
            lbl: isBn ? 'পোশাক রপ্তানি (#২)' : 'RMG Exports (#2)',
            badge: 'Hilsa #1',
            pos: true,
            kind: 'area',
            color: 'var(--chart-3)',
            defaultPeriod: isBn ? '২০২৪–২৫ · বিলিয়ন USD' : '2024–25 · $B USD',
            formatVal: v => `$${fmtNum(v, state.lang)}B`,
            series: [
              { lbl: '2005', v: 6.4 }, { lbl: '2010', v: 12.5 }, { lbl: '2015', v: 25.5 },
              { lbl: '2020', v: 27.9 }, { lbl: '2023', v: 46.9 }, { lbl: '2025', v: 47.4 }
            ]
          }
        ];

        kpiWrap.innerHTML = sparkKpis.map(k => {
          const last = k.series[k.series.length - 1];
          return `
            <div class="bklit-stat-card" id="${k.id}">
              <div class="flex flex-col gap-1">
                <div class="text-[11px] font-bold text-[var(--chart-muted)] leading-snug break-words">${k.lbl}</div>
                <div class="flex items-center justify-between flex-wrap gap-1.5">
                  <div class="font-heading text-lg sm:text-xl font-extrabold text-[var(--chart-ink)] bklit-num" data-spark-val>${k.formatVal(last.v)}</div>
                  <span class="bklit-trend-badge shrink-0 ${k.pos ? 'pos' : 'neg'}">${k.badge}</span>
                </div>
              </div>
              <div class="bklit-sparkline-wrap"></div>
              <div class="text-[11px] font-semibold text-[var(--chart-muted)] leading-snug break-words" data-spark-period>${k.defaultPeriod}</div>
            </div>
          `;
        }).join('');

        sparkKpis.forEach(k => BklitUI.renderSparklineCard(document.getElementById(k.id), k));
      }
    };

    // Upgraded World Line Chart: Bklit AreaChart + Background (faded dots) + Dashed Edge-Faded Grid
    // + Gradient Area + Terminal Marker + TrendLine (OLS) + ChartTooltip (Crosshair + X-Axis Date Pill + Ring Dots)
    renderWorldLineChart = function() {
      syncReplayLabels();
      const isBn = state.lang === 'bn';
      ['life', 'gdp', 'hdi'].forEach(m => {
        const id = m === 'life' ? 'btnWLineLife' : (m === 'gdp' ? 'btnWLineGdp' : 'btnWLineHdi');
        document.getElementById(id)?.classList.toggle('active', state.worldLineMetric === m);
      });
      const btnTrend = document.getElementById('btnWLineTrend');
      if (btnTrend) {
        btnTrend.textContent = isBn ? 'ট্রেন্ড লাইন' : 'Trend Line';
        btnTrend.classList.toggle('active', bklitState.wLineShowTrend);
      }

      const cfg = WORLD_LINE_DATA[state.worldLineMetric];
      document.getElementById('wLineCaption').textContent = isBn ? cfg.captionBn : cfg.captionEn;
      document.getElementById('wLineInsight').innerHTML = isBn ? cfg.insightBn : cfg.insightEn;

      if (typeof d3 === 'undefined') return;
      const svg = d3.select('#worldLineSvg');
      svg.selectAll('*').remove();

      const W = 580, H = 270, m = { t: 22, r: 28, b: 40, l: 52 };
      const innerW = W - m.l - m.r, innerH = H - m.t - m.b;
      const defs = svg.append('defs');
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);

      const pts = cfg.points;
      const x = d3.scalePoint().domain(pts.map(p => p.yr)).range([0, innerW]).padding(0.12);
      const maxVal = d3.max(pts, p => Math.max(p.bd, p.wd)) * 1.14;
      const minVal = state.worldLineMetric === 'life' ? 40 : (state.worldLineMetric === 'hdi' ? 0.3 : 0);
      const y = d3.scaleLinear().domain([minVal, maxVal]).range([innerH, 0]);
      const fmtVal = v => state.worldLineMetric === 'gdp' ? `$${Math.round(v).toLocaleString()}` : (state.worldLineMetric === 'hdi' ? v.toFixed(3) : v.toFixed(1));
      const fmtValDisp = v => isBn ? toBnDigits(fmtVal(v)) : fmtVal(v);
      const dur = BklitUI.prefersReducedMotion() ? 0 : 1100;

      // Layer 1: Bklit Dashed Edge-Faded Grid (one decorative layer — crisp & restrained)
      BklitUI.addGrid(svg, g, y, innerW, y.ticks(4), {
        formatTick: tk => state.worldLineMetric === 'gdp' ? `$${tk}` : (state.worldLineMetric === 'hdi' ? tk.toFixed(2) : (isBn ? toBnDigits(tk) : tk))
      });

      // X-axis tick labels
      pts.forEach(p => {
        g.append('text').attr('class', `wl-xlbl-${p.yr}`).attr('x', x(p.yr)).attr('y', innerH + 22).attr('text-anchor', 'middle')
          .style('font-size', '11px').style('fill', 'var(--chart-muted)').style('font-weight', '700')
          .style('font-variant-numeric', 'tabular-nums')
          .text(isBn ? toBnDigits(p.yr) : p.yr);
      });

      // Gradient fill for Bangladesh Area
      const areaGradId = BklitUI.uid('bklit-area');
      const ag = defs.append('linearGradient').attr('id', areaGradId).attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1');
      ag.append('stop').attr('offset', '0%').attr('stop-color', 'var(--chart-1)').attr('stop-opacity', 0.24);
      ag.append('stop').attr('offset', '100%').attr('stop-color', 'var(--chart-1)').attr('stop-opacity', 0.01);

      const wdGroup = g.append('g').style('transition', 'opacity 0.22s ease').style('opacity', chartUIState.lineShowWd ? 1 : 0.12);
      const bdGroup = g.append('g').style('transition', 'opacity 0.22s ease').style('opacity', chartUIState.lineShowBd ? 1 : 0.12);

      // World Avg dashed line
      const lineWd = d3.line().x(d => x(d.yr)).y(d => y(d.wd)).curve(d3.curveMonotoneX);
      const wdPath = wdGroup.append('path').datum(pts).attr('fill', 'none').attr('stroke', 'var(--chart-line-secondary)').attr('stroke-width', 2.2).attr('d', lineWd);
      if (dur > 0) {
        const wdLen = wdPath.node() ? wdPath.node().getTotalLength() : 600;
        wdPath.attr('stroke-dasharray', `${wdLen} ${wdLen}`).attr('stroke-dashoffset', wdLen)
          .transition().duration(dur * 0.85).ease(BklitUI.bklitEase).attr('stroke-dashoffset', 0)
          .on('end', function() { d3.select(this).attr('stroke-dasharray', '5 4'); });
      } else {
        wdPath.attr('stroke-dasharray', '5 4');
      }

      // Bangladesh gradient area
      const areaBd = d3.area().x(d => x(d.yr)).y0(innerH).y1(d => y(d.bd)).curve(d3.curveMonotoneX);
      bdGroup.append('path').datum(pts).attr('fill', `url(#${areaGradId})`).attr('d', areaBd)
        .attr('opacity', 0).transition().delay(dur ? 200 : 0).duration(dur * 0.65).ease(BklitUI.bklitEase).attr('opacity', 1);

      // Bangladesh monotone line
      const lineBd = d3.line().x(d => x(d.yr)).y(d => y(d.bd)).curve(d3.curveMonotoneX);
      const bdPath = bdGroup.append('path').datum(pts).attr('fill', 'none').attr('stroke', 'var(--chart-1)').attr('stroke-width', 3).attr('stroke-linecap', 'round').attr('d', lineBd);
      if (dur > 0) {
        const bdLen = bdPath.node() ? bdPath.node().getTotalLength() : 600;
        bdPath.attr('stroke-dasharray', `${bdLen} ${bdLen}`).attr('stroke-dashoffset', bdLen)
          .transition().duration(dur).ease(BklitUI.bklitEase).attr('stroke-dashoffset', 0);
      }

      // Optional Bklit TrendLine (Least-squares regression overlay)
      if (bklitState.wLineShowTrend) {
        const trendVals = BklitUI.computeTrend(pts.map(p => p.bd));
        const tPts = pts.map((p, i) => ({ yr: p.yr, v: trendVals[i] }));
        const tLine = d3.line().x(d => x(d.yr)).y(d => y(d.v));
        bdGroup.append('path').datum(tPts).attr('d', tLine)
          .attr('fill', 'none').attr('stroke', 'var(--chart-3)').attr('stroke-width', 1.8)
          .attr('stroke-dasharray', '6 4').attr('opacity', 0.9);
      }

      // Bklit LineSeriesTerminalMarker at last point
      const lastPt = pts[pts.length - 1];
      bdGroup.append('circle').attr('cx', x(lastPt.yr)).attr('cy', y(lastPt.bd)).attr('r', 8.5)
        .attr('fill', 'none').attr('stroke', 'var(--chart-1)').attr('stroke-width', 1.6).attr('opacity', 0.38);

      // Crosshair + X-Axis Date Pill (Bklit ChartTooltip showDatePill + dotVariant="ring")
      const guideLine = g.append('line').attr('y1', 0).attr('y2', innerH)
        .attr('stroke', 'var(--chart-crosshair)').attr('stroke-width', 1.3).attr('stroke-dasharray', '3 3')
        .style('opacity', 0).style('pointer-events', 'none');

      const datePillG = g.append('g').style('opacity', 0).style('pointer-events', 'none');
      datePillG.append('rect').attr('x', -24).attr('y', innerH + 6).attr('width', 48).attr('height', 22).attr('rx', 11)
        .attr('fill', 'var(--chart-1)');
      const datePillTxt = datePillG.append('text').attr('x', 0).attr('y', innerH + 21).attr('text-anchor', 'middle')
        .style('font-size', '10.5px').style('font-weight', '800').style('fill', '#FFFFFF')
        .style('font-variant-numeric', 'tabular-nums');

      const hoverRingBd = g.append('circle').attr('r', 6.5).attr('fill', 'var(--chart-surface)')
        .attr('stroke', 'var(--chart-1)').attr('stroke-width', 2.6).style('opacity', 0).style('pointer-events', 'none');
      const hoverRingWd = g.append('circle').attr('r', 5.2).attr('fill', 'var(--chart-surface)')
        .attr('stroke', 'var(--chart-line-secondary)').attr('stroke-width', 2.2).style('opacity', 0).style('pointer-events', 'none');

      // Vertex point markers
      pts.forEach((p, idx) => {
        wdGroup.append('circle').attr('cx', x(p.yr)).attr('cy', y(p.wd)).attr('r', 3.2)
          .attr('fill', 'var(--chart-line-secondary)').attr('stroke', 'var(--chart-surface)').attr('stroke-width', 1.4);
        bdGroup.append('circle').attr('cx', x(p.yr)).attr('cy', y(p.bd)).attr('r', 4.2)
          .attr('fill', 'var(--chart-1)').attr('stroke', 'var(--chart-surface)').attr('stroke-width', 1.8);
        if (idx === 0 || idx === pts.length - 1) {
          const fmtShort = v => state.worldLineMetric === 'gdp' ? `$${v}` : (state.worldLineMetric === 'hdi' ? v.toFixed(2) : v);
          bdGroup.append('text').attr('x', x(p.yr)).attr('y', y(p.bd) - 11).attr('text-anchor', 'middle')
            .style('font-size', '10.5px').style('font-weight', '800').style('fill', 'var(--chart-1)')
            .style('font-variant-numeric', 'tabular-nums')
            .text(isBn ? toBnDigits(fmtShort(p.bd)) : fmtShort(p.bd));
        }
      });

      const xs = pts.map(p => x(p.yr));
      g.append('rect').attr('width', innerW).attr('height', innerH).attr('fill', 'transparent').style('cursor', 'crosshair')
        .on('mousemove touchmove', function(ev) {
          const [mx] = d3.pointer(ev, this);
          let bestIdx = 0, bestDist = Infinity;
          xs.forEach((xv, i) => { const d = Math.abs(mx - xv); if (d < bestDist) { bestDist = d; bestIdx = i; } });
          const p = pts[bestIdx];
          const px = xs[bestIdx];
          guideLine.attr('x1', px).attr('x2', px).style('opacity', 0.9);
          datePillG.attr('transform', `translate(${px},0)`).style('opacity', 1);
          datePillTxt.text(isBn ? toBnDigits(p.yr) : p.yr);
          hoverRingBd.attr('cx', px).attr('cy', y(p.bd)).style('opacity', chartUIState.lineShowBd ? 1 : 0);
          hoverRingWd.attr('cx', px).attr('cy', y(p.wd)).style('opacity', chartUIState.lineShowWd ? 1 : 0);

          const diff = p.bd - p.wd;
          const unit = isBn ? cfg.unitBn : cfg.unitEn;
          const unitSuffix = state.worldLineMetric === 'gdp' ? '' : (unit ? ' ' + unit : '');
          const diffSign = diff >= 0 ? '+' : '';
          const diffStr = state.worldLineMetric === 'gdp'
            ? `${diffSign}$${Math.round(diff).toLocaleString()}`
            : (state.worldLineMetric === 'hdi' ? `${diffSign}${diff.toFixed(3)}` : `${diffSign}${diff.toFixed(1)}${unitSuffix}`);
          const diffColor = diff >= 0 ? 'var(--chart-positive)' : 'var(--chart-negative)';
          showChartTooltip(ev,
            `<div class="font-heading font-extrabold mb-1">${isBn ? toBnDigits(p.yr) + ' সাল' : 'Year ' + p.yr}</div>` +
            `<div class="flex items-center justify-between gap-4 bklit-num"><span style="color:var(--chart-1)" class="font-bold">${isBn ? 'বাংলাদেশ' : 'Bangladesh'}:</span><span style="color:var(--chart-1)" class="font-extrabold">${fmtValDisp(p.bd)}${unitSuffix}</span></div>` +
            `<div class="flex items-center justify-between gap-4 bklit-num"><span class="opacity-75 font-semibold">${state.worldLineMetric === 'gdp' ? (isBn ? 'উন্নয়নশীল বিশ্ব' : 'Emerging World') : (isBn ? 'বিশ্ব গড়' : 'World Avg')}:</span><span class="font-bold">${fmtValDisp(p.wd)}${unitSuffix}</span></div>` +
            `<div class="mt-1 pt-1 border-t border-[var(--chart-border)] text-[11px] font-bold bklit-num" style="color:${diffColor}">${isBn ? 'পার্থক্য' : 'Gap'}: ${isBn ? toBnDigits(diffStr) : diffStr}</div>`
          );
        })
        .on('mouseleave touchend', () => {
          guideLine.style('opacity', 0);
          datePillG.style('opacity', 0);
          hoverRingBd.style('opacity', 0);
          hoverRingWd.style('opacity', 0);
          hideChartTooltip();
        });

      // External Bklit Legend outside the chart root
      const extLeg = document.getElementById('wLineExternalLegend');
      if (extLeg) {
        const wdLabel = state.worldLineMetric === 'gdp' ? (isBn ? 'উন্নয়নশীল বিশ্ব গড়' : 'Emerging World Avg') : (isBn ? 'বিশ্ব গড়' : 'World Avg');
        extLeg.innerHTML = `
          <button type="button" id="wLegBtnBd" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--chart-border)] bg-[var(--chart-surface-muted)] transition" style="opacity:${chartUIState.lineShowBd ? 1 : 0.42}">
            <span class="w-2.5 h-2.5 rounded-full" style="background:var(--chart-1)"></span>
            <span class="text-[var(--chart-ink)]">${isBn ? 'বাংলাদেশ' : 'Bangladesh'}</span>
          </button>
          <button type="button" id="wLegBtnWd" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--chart-border)] bg-[var(--chart-surface-muted)] transition" style="opacity:${chartUIState.lineShowWd ? 1 : 0.42}">
            <span class="w-3 h-0.5 border-t-2 border-dashed" style="border-color:var(--chart-line-secondary)"></span>
            <span class="text-[var(--chart-muted)]">${wdLabel}</span>
          </button>
          ${bklitState.wLineShowTrend ? `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--chart-border)] bg-[var(--chart-surface-muted)]"><span class="w-3 h-0.5 border-t-2 border-dashed" style="border-color:var(--chart-3)"></span><span style="color:var(--chart-3)">${isBn ? 'রিগ্রেশন ট্রেন্ড' : 'OLS Trend'}</span></span>` : ''}
        `;
        document.getElementById('wLegBtnBd')?.addEventListener('click', () => {
          chartUIState.lineShowBd = !chartUIState.lineShowBd;
          renderWorldLineChart();
        });
        document.getElementById('wLegBtnWd')?.addEventListener('click', () => {
          chartUIState.lineShowWd = !chartUIState.lineShowWd;
          renderWorldLineChart();
        });
      }
    };

    // Upgraded World Benchmark Bar Chart: Bklit BarSquares + 50% ReferenceLine
    const _origRenderWorldBarChart = renderWorldBarChart;
    renderWorldBarChart = function() {
      const isBn = state.lang === 'bn';
      const bSq = document.getElementById('btnWBarSquircle');
      const bRd = document.getElementById('btnWBarRounded');
      if (bSq && bRd) {
        bSq.textContent = isBn ? 'স্কোয়ার্কল' : 'Squircle';
        bRd.textContent = isBn ? 'রাউন্ডেড' : 'Rounded';
        bSq.classList.toggle('active', bklitState.wBarStyle === 'squircle');
        bRd.classList.toggle('active', bklitState.wBarStyle === 'rounded');
      }
      _origRenderWorldBarChart();
      if (bklitState.wBarStyle === 'squircle') {
        const box = document.getElementById('wBarContent');
        if (!box) return;
        box.querySelectorAll('.relative.w-full.h-4').forEach(track => {
          const bar = track.querySelector('.chart-anim-bar');
          if (!bar) return;
          const pct = parseFloat(bar.dataset.animWidth || '50');
          const col = bar.style.background || 'var(--chart-1)';
          track.outerHTML = BklitUI.squircleBarHTML(pct, col, 24, 50);
        });
      }
    };

    // Upgraded Ethnic Stats Section: Add Bklit BarSquares on Top 3 Districts + Lollipop Chart for Major Communities
    const _origRenderEthnicStatsSection = renderEthnicStatsSection;
    renderEthnicStatsSection = function() {
      _origRenderEthnicStatsSection();
      const isBn = state.lang === 'bn';
      const box = document.getElementById('ethnicStatsBody');
      if (!box) return;

      // Upgrade Top 3 district progress bars into Bklit BarSquares
      box.querySelectorAll('.w-full.h-3.rounded-full').forEach(track => {
        const bar = track.querySelector('.chart-anim-bar');
        if (!bar) return;
        const pct = parseFloat(bar.dataset.animWidth || '40');
        const tipAttr = track.getAttribute('data-tip-html') || '';
        const wrapper = document.createElement('div');
        wrapper.className = 'my-2.5 cursor-pointer';
        if (tipAttr) wrapper.setAttribute('data-tip-html', tipAttr);
        wrapper.innerHTML = BklitUI.squircleBarHTML(pct, 'var(--chart-1)', 20);
        track.replaceWith(wrapper);
      });
      bindTooltipElements(box);

      // Inject a clean Bklit BarLollipop visual summary for Top Ethnic Communities (2022)
      if (!document.getElementById('bklitEthnicLollipopCard') && typeof TOP_ETHNIC_GROUPS_2022 !== 'undefined') {
        const lolliSec = document.createElement('div');
        lolliSec.id = 'bklitEthnicLollipopCard';
        lolliSec.className = 'rounded-[18px] border border-[var(--chart-border)] bg-[var(--chart-surface-muted)] p-4 sm:p-5';
        lolliSec.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <span class="inline-block text-[11px] font-bold text-[#0F6B4F] bg-[#DCEFE5] px-2.5 py-0.5 rounded-full">${isBn ? 'ললিপপ চার্ট · বিবিএস ২০২২' : 'LOLLIPOP CHART · BBS 2022'}</span>
              <h4 class="font-heading text-base font-bold text-[#16211C] mt-1">${isBn ? 'শীর্ষ ক্ষুদ্র নৃগোষ্ঠীসমূহের জনসংখ্যা তুলনা' : 'Top Ethnic Communities by Population Share'}</h4>
            </div>
          </div>
          <div id="bklitEthnicLollipopWrap" class="w-full overflow-x-auto"></div>
        `;
        box.insertBefore(lolliSec, box.children[1] || null);
        const palette = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
        const topItems = TOP_ETHNIC_GROUPS_2022.slice(0, 6).map((g, i) => ({
          id: 'eth-' + i,
          label: isBn ? g.nameBn : g.nameEn,
          value: g.pct,
          valueLabel: `${fmtNum(g.pct, state.lang)}%`,
          color: palette[i % palette.length],
          tipHtml: `<div class='font-bold mb-1'>${isBn ? g.nameBn : g.nameEn}</div>` +
            `<div class='font-extrabold bklit-num' style='color:${palette[i % palette.length]}'>${fmtNum(g.pop, state.lang)} (${fmtNum(g.pct, state.lang)}%)</div>` +
            `<div class='text-[11px] opacity-75 mt-0.5'>${isBn ? g.regionBn : g.regionEn}</div>`
        }));
        BklitUI.renderLollipop(document.getElementById('bklitEthnicLollipopWrap'), topItems);
      }
    };

    // Hook into renderAll so Page 1 Sparkline Stat Cards update on language switch too
    const _origRenderAll = renderAll;
    renderAll = function() {
      _origRenderAll();
    };

    // Bind new Bklit interactive controls
    document.getElementById('btnRelStyleDonut')?.addEventListener('click', () => {
      bklitState.relChartGeom = 'donut';
      BklitUI.withShimmer(document.getElementById('religionDonutSvg')?.parentElement, () => renderReligionDonut(true));
    });
    document.getElementById('btnRelStyleRings')?.addEventListener('click', () => {
      bklitState.relChartGeom = 'rings';
      BklitUI.withShimmer(document.getElementById('religionDonutSvg')?.parentElement, () => renderReligionDonut(true));
    });
    document.getElementById('btnRelBarSquircle')?.addEventListener('click', () => {
      bklitState.relBarStyle = 'squircle';
      renderReligionBarChart();
    });
    document.getElementById('btnRelBarRounded')?.addEventListener('click', () => {
      bklitState.relBarStyle = 'rounded';
      renderReligionBarChart();
    });
    document.getElementById('btnRelBarLollipop')?.addEventListener('click', () => {
      bklitState.relBarStyle = 'lollipop';
      renderReligionBarChart();
    });
    document.getElementById('btnWLineTrend')?.addEventListener('click', () => {
      bklitState.wLineShowTrend = !bklitState.wLineShowTrend;
      renderWorldLineChart();
    });
    document.getElementById('btnWBarSquircle')?.addEventListener('click', () => {
      bklitState.wBarStyle = 'squircle';
      renderWorldBarChart();
    });
    document.getElementById('btnWBarRounded')?.addEventListener('click', () => {
      bklitState.wBarStyle = 'rounded';
      renderWorldBarChart();
    });



