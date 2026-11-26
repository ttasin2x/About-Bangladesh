    // =========================================================================
    // ANIMATE UI + REACT BITS INTERACTION RUNTIME
    // 1. Global Motion Tempo (0.7x Snappy / 1.0x Normal / 1.3x Calm)
    // 2. Gliding Highlight Pills (TabsHighlight) on segmented switchers
    // 3. React Bits Cursor Spotlight on .bklit-stat-card (fine pointers only)
    // 4. Warm Tooltip State Machine (instant show when moving between points)
    // 5. Animated Icon Blur-Swap on Theme Toggle (Sun <-> Moon)
    // 6. Trust Bar CountUp Odometer Reveal (IntersectionObserver, reduced-motion safe)
    // 7. Off-screen Auto-Pause for Hero Background Video (loops pause off-screen)
    // =========================================================================
    (function initAnimateUIAndReactBits() {
      const reduced = () => BklitUI.prefersReducedMotion();

      // 1. Global Motion Tempo Controller
      const tempos = [
        { val: 1, lbl: '1×' },
        { val: 0.7, lbl: '0.7×' },
        { val: 1.3, lbl: '1.3×' }
      ];
      let tempoIdx = 0;
      try {
        const savedT = parseFloat(localStorage.getItem('bongobhumi_tempo') || '1');
        const found = tempos.findIndex(t => t.val === savedT);
        if (found >= 0) tempoIdx = found;
      } catch (e) {}

      const applyTempo = () => {
        const t = tempos[tempoIdx];
        document.documentElement.style.setProperty('--animate-tempo', String(t.val));
        const lbl = document.getElementById('tempoLbl');
        if (lbl) {
          lbl.textContent = t.lbl;
          lbl.classList.remove('aui-blur-swap');
          void lbl.offsetWidth;
          lbl.classList.add('aui-blur-swap');
        }
        try { localStorage.setItem('bongobhumi_tempo', String(t.val)); } catch (e) {}
      };
      applyTempo();
      document.getElementById('btnMotionTempo')?.addEventListener('click', () => {
        tempoIdx = (tempoIdx + 1) % tempos.length;
        applyTempo();
      });

      // 2. Gliding Highlight Pill (Animate UI TabsHighlight) for all .bklit-seg-group
      function syncGlidingHighlights() {
        document.querySelectorAll('.bklit-seg-group').forEach(group => {
          group.classList.add('aui-glide-group', 'has-glide');
          let pill = group.querySelector(':scope > .aui-glide-pill');
          if (!pill) {
            pill = document.createElement('span');
            pill.className = 'aui-glide-pill';
            pill.setAttribute('aria-hidden', 'true');
            group.insertBefore(pill, group.firstChild);
          }
          const activeBtn = group.querySelector(':scope > button.active');
          if (activeBtn && activeBtn.offsetWidth > 0) {
            pill.style.width = `${activeBtn.offsetWidth}px`;
            pill.style.transform = `translate3d(${activeBtn.offsetLeft}px, 0, 0)`;
            pill.style.opacity = '1';
          } else {
            pill.style.opacity = '0';
          }
        });
      }
      document.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('.bklit-seg-group button')) {
          requestAnimationFrame(syncGlidingHighlights);
        }
      });
      window.addEventListener('resize', () => requestAnimationFrame(syncGlidingHighlights), { passive: true });
      // Scoped observers on .bklit-seg-group only (never observe document.body subtree during scroll!)
      let glideRaf = 0;
      const scheduleGlide = () => {
        if (glideRaf) return;
        glideRaf = requestAnimationFrame(() => { glideRaf = 0; syncGlidingHighlights(); });
      };
      const glideMo = new MutationObserver(scheduleGlide);
      document.querySelectorAll('.bklit-seg-group').forEach(g => {
        glideMo.observe(g, { subtree: true, attributes: true, attributeFilter: ['class'] });
      });
      setTimeout(syncGlidingHighlights, 120);

      // 3. Cursor spotlight disabled for zero pointermove style recalc & flat UnseenBangladesh cards

      // 4. Warm Tooltip State Machine (instant transition between adjacent chart points)
      let warmTimer = null;
      const _origShowTip = showChartTooltip;
      const _origHideTip = hideChartTooltip;
      showChartTooltip = function(ev, htmlContent) {
        clearTimeout(warmTimer);
        const tip = getChartTooltip();
        const wasWarm = tip.dataset.warm === '1';
        tip.classList.toggle('is-warm', wasWarm);
        _origShowTip(ev, htmlContent);
        tip.dataset.warm = '1';
      };
      hideChartTooltip = function() {
        _origHideTip();
        clearTimeout(warmTimer);
        warmTimer = setTimeout(() => {
          const tip = document.getElementById('globalChartTooltip');
          if (tip) {
            tip.dataset.warm = '0';
            tip.classList.remove('is-warm');
          }
        }, 380);
      };

      // 5. Animated Icon Swap on Theme Toggle (Sun <-> Moon blur-rotate entrance)
      document.getElementById('btnThemeToggle')?.addEventListener('click', () => {
        const sun = document.getElementById('iconSun');
        const moon = document.getElementById('iconMoon');
        const activeIcon = document.documentElement.classList.contains('dark') ? sun : moon;
        if (activeIcon) {
          activeIcon.classList.remove('aui-icon-enter');
          void activeIcon.offsetWidth;
          activeIcon.classList.add('aui-icon-enter');
        }
      });

      // 6. Trust Bar CountUp Reveal (React Bits CountUp inspired, BN/EN aware)
      if (!reduced() && typeof IntersectionObserver !== 'undefined') {
        const trustBar = document.getElementById('ubTrustBar');
        if (trustBar) {
          const bnMap = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
          const parseNum = (str) => parseInt(str.replace(/[০-৯]/g, d => bnMap[d]).replace(/[^0-9]/g, ''), 10);
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;
              trustBar.querySelectorAll('b').forEach((el, idx) => {
                const raw = el.textContent.trim();
                const target = parseNum(raw);
                if (!target || isNaN(target)) return;
                const hasPlus = raw.includes('+');
                const isBnNow = /[০-৯]/.test(raw);
                const start = performance.now() + idx * 55;
                const dur = 820 * (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animate-tempo')) || 1);
                const tick = (now) => {
                  const p = Math.max(0, Math.min(1, (now - start) / dur));
                  const eased = 1 - Math.pow(1 - p, 3);
                  const cur = Math.round(target * eased);
                  const formatted = cur.toLocaleString('en-IN') + (hasPlus ? '+' : '');
                  el.textContent = isBnNow ? toBnDigits(formatted) : formatted;
                  if (p < 1) requestAnimationFrame(tick);
                  else el.textContent = raw;
                };
                requestAnimationFrame(tick);
              });
              obs.disconnect();
            });
          }, { threshold: 0.25 });
          obs.observe(trustBar);
        }
      }

      // 7. Off-Screen Auto-Pause for Hero Background Video (Animate UI loop rule)
      const heroVid = document.getElementById('heroBgVideo');
      const heroEl = document.getElementById('ubHero');
      if (heroVid && heroEl && typeof IntersectionObserver !== 'undefined') {
        const vidObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !reduced()) {
              heroVid.play().catch(() => {});
            } else {
              heroVid.pause();
            }
          });
        }, { threshold: 0.05 });
        vidObs.observe(heroEl);
      }
    })();

    // Ensure muted hero video starts cleanly
    const initHeroVid = document.getElementById('heroBgVideo');
    if (initHeroVid) {
      initHeroVid.muted = true;
      initHeroVid.play().catch(() => {});
    }

