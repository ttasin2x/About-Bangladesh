    // =========================================================================
    // INTERACTIVE CHART TOOLTIP & SCROLL/TAB ANIMATION ENGINE (ZERO GLOW)
    // =========================================================================
    const chartUIState = {
      lineShowBd: true,
      lineShowWd: true,
      radarShowBd: true,
      radarShowWd: true,
      radarActiveIdx: 2
    };

    function getChartTooltip() {
      let el = document.getElementById('globalChartTooltip');
      if (!el) {
        el = document.createElement('div');
        el.id = 'globalChartTooltip';
        el.className = 'chart-tooltip';
        document.body.appendChild(el);
      }
      return el;
    }

    function positionChartTooltip(ev) {
      const tip = getChartTooltip();
      const pad = 14;
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const tw = tip.offsetWidth || 210;
      const th = tip.offsetHeight || 72;
      let left = clientX + 16;
      let top = clientY - th - 14;
      if (left + tw + pad > window.innerWidth) left = clientX - tw - 16;
      if (left < pad) left = pad;
      if (top < pad) top = clientY + 18;
      if (top + th + pad > window.innerHeight) top = window.innerHeight - th - pad;
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
    }

    function showChartTooltip(ev, htmlContent) {
      const tip = getChartTooltip();
      tip.innerHTML = htmlContent;
      tip.classList.add('visible');
      positionChartTooltip(ev);
    }

    function hideChartTooltip() {
      const tip = document.getElementById('globalChartTooltip');
      if (tip) tip.classList.remove('visible');
    }

    function spinReplayBtn(id) {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.classList.remove('spinning');
      void btn.offsetWidth;
      btn.classList.add('spinning');
      setTimeout(() => btn.classList.remove('spinning'), 520);
    }

    function syncReplayLabels() {
      const lbl = state.lang === 'bn' ? 'অ্যানিমেট' : 'Replay';
      document.querySelectorAll('.replay-lbl').forEach(el => { el.textContent = lbl; });
    }

    let chartBarObserver = null;
    function getChartBarObserver() {
      if (chartBarObserver || typeof IntersectionObserver === 'undefined') return chartBarObserver;
      chartBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetW = el.dataset.animWidth;
            if (targetW) {
              requestAnimationFrame(() => { el.style.width = targetW; });
            }
            chartBarObserver.unobserve(el);
          }
        });
      }, { threshold: 0.12 });
      return chartBarObserver;
    }

    function animateBarsIn(rootEl, immediate = false) {
      if (!rootEl) return;
      const bars = rootEl.querySelectorAll('[data-anim-width]');
      const obs = getChartBarObserver();
      bars.forEach((bar, i) => {
        bar.style.setProperty('--bar-idx', i);
        bar.style.width = '0%';
        if (immediate || !obs) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bar.style.width = bar.dataset.animWidth;
            });
          });
        } else {
          obs.observe(bar);
        }
      });
    }

    function bindTooltipElements(rootEl) {
      if (!rootEl) return;
      rootEl.querySelectorAll('[data-tip-html]').forEach(el => {
        el.addEventListener('mouseenter', (ev) => showChartTooltip(ev, el.dataset.tipHtml));
        el.addEventListener('mousemove', (ev) => positionChartTooltip(ev));
        el.addEventListener('mouseleave', hideChartTooltip);
      });
    }

    function animateTextNumber(d3Sel, fromVal, toVal, duration, formatFn) {
      d3Sel.interrupt();
      d3Sel.transition().duration(duration).ease(d3.easeCubicOut)
        .tween('text', function() {
          const interp = d3.interpolateNumber(fromVal, toVal);
          return function(t) {
            this.textContent = formatFn(interp(t));
          };
        });
    }

    // =========================================================================
    // PAGE 4: RELIGIONS OF BANGLADESH (INTERACTIVE D3 CHARTS + DETAIL CARDS)
    // =========================================================================
    function renderReligionPage() {
      syncReplayLabels();
      renderReligionDonut(true);
      renderReligionBarChart();
      renderReligionDetailCards();
    }

    let _donutLastPct = 91.04;
    function renderReligionDonut(animateEntry = false) {
      const isBn = state.lang === 'bn';
      const sel = RELIGIONS_2022.find(r => r.id === state.selectedReligionId) || RELIGIONS_2022[0];
      const svgEl = document.getElementById('religionDonutSvg');

      if (typeof d3 !== 'undefined' && svgEl) {
        const svg = d3.select('#religionDonutSvg');
        const size = 280, radius = 108, innerR = 64;
        const pie = d3.pie().sort(null).value(d => Math.max(d.pct, 1.8)).padAngle(0.024);
        const arc = d3.arc().innerRadius(innerR).outerRadius(radius).cornerRadius(7);
        const arcActive = d3.arc().innerRadius(innerR - 3).outerRadius(radius + 9).cornerRadius(7);
        const pieData = pie(RELIGIONS_2022);

        const needRebuild = animateEntry || svg.select('g.donut-root').empty() || svg.attr('data-lang') !== state.lang;

        if (needRebuild) {
          svg.selectAll('*').remove();
          svg.attr('data-lang', state.lang);
          const g = svg.append('g').attr('class', 'donut-root').attr('transform', `translate(${size / 2},${size / 2})`);

          // Subtle flat background track ring
          g.append('circle').attr('r', (radius + innerR) / 2).attr('fill', 'none')
            .attr('stroke', '#EEF3F0').attr('stroke-width', radius - innerR);

          const paths = g.selectAll('path.donut-slice')
            .data(pieData, d => d.data.id)
            .enter()
            .append('path')
            .attr('class', 'donut-slice')
            .attr('fill', d => d.data.color)
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', 1.5)
            .on('mouseenter', function(event, d) {
              if (state.selectedReligionId !== d.data.id) {
                state.selectedReligionId = d.data.id;
                updateDonutSelection(false);
                updateReligionLegendHighlight();
                renderReligionDetailCards();
              }
              const r = d.data;
              showChartTooltip(event,
                `<div class="flex items-center gap-2 font-bold text-[#16211C] mb-1"><span style="width:9px;height:9px;border-radius:99px;background:${r.color};display:inline-block;"></span>${isBn ? r.nameBn : r.nameEn}</div>` +
                `<div class="text-xs font-extrabold" style="color:${r.color}">${fmtNum(r.pct, state.lang)}% · ${fmtNum(r.pop, state.lang)}</div>` +
                `<div class="text-[11px] text-[#5D6762] mt-0.5">${isBn ? 'বিবিএস ২০২২ জনশুমারি (ক্লিক করে ফোকাস করুন)' : 'BBS 2022 Census (click to lock focus)'}</div>`
              );
            })
            .on('mousemove', function(event) { positionChartTooltip(event); })
            .on('mouseleave', function() { hideChartTooltip(); })
            .on('click', function(event, d) {
              state.selectedReligionId = d.data.id;
              updateDonutSelection(false);
              updateReligionLegendHighlight();
              renderReligionDetailCards();
            });

          // Smooth radial sweep-in entry animation
          paths.transition()
            .duration(820)
            .delay((d, i) => i * 70)
            .ease(d3.easeCubicOut)
            .attrTween('d', function(d) {
              const targetArc = d.data.id === sel.id ? arcActive : arc;
              const interp = d3.interpolate(d.startAngle, d.endAngle);
              return function(t) {
                return targetArc({ ...d, endAngle: interp(t) });
              };
            })
            .attr('transform', d => {
              if (d.data.id !== sel.id) return 'translate(0,0)';
              const mid = (d.startAngle + d.endAngle) / 2 - Math.PI / 2;
              return `translate(${Math.cos(mid) * 5},${Math.sin(mid) * 5})`;
            })
            .attr('opacity', d => d.data.id === sel.id ? 1 : 0.78);

          // Center readout group
          const centerG = g.append('g').attr('class', 'donut-center');
          centerG.append('text').attr('class', 'donut-lbl-name').attr('text-anchor', 'middle').attr('y', -15)
            .style('font-family', "'HindSiliguri', 'NotoSansBengali', sans-serif")
            .style('font-size', '13px').style('font-weight', '700').style('fill', '#5D6762')
            .text(isBn ? sel.nameBn : sel.nameEn);

          const pctText = centerG.append('text').attr('class', 'donut-lbl-pct').attr('text-anchor', 'middle').attr('y', 14)
            .style('font-family', "'HindSiliguri', 'NotoSansBengali', sans-serif")
            .style('font-size', '26px').style('font-weight', '800').style('fill', sel.color)
            .text('0%');
          animateTextNumber(pctText, 0, sel.pct, 760, v => `${fmtNum(Number(v.toFixed(2)), state.lang)}%`);
          _donutLastPct = sel.pct;

          centerG.append('text').attr('class', 'donut-lbl-pop').attr('text-anchor', 'middle').attr('y', 36)
            .style('font-family', "'NotoSansBengali', sans-serif")
            .style('font-size', '11px').style('font-weight', '600').style('fill', '#2B352F')
            .text(fmtNum(sel.pop, state.lang));
        } else {
          updateDonutSelection(false);
        }

        function updateDonutSelection(instant) {
          const cur = RELIGIONS_2022.find(r => r.id === state.selectedReligionId) || RELIGIONS_2022[0];
          const dur = instant ? 0 : 280;
          const root = svg.select('g.donut-root');
          root.selectAll('path.donut-slice')
            .interrupt()
            .transition().duration(dur).ease(d3.easeCubicOut)
            .attr('d', d => d.data.id === cur.id ? arcActive(d) : arc(d))
            .attr('transform', d => {
              if (d.data.id !== cur.id) return 'translate(0,0)';
              const mid = (d.startAngle + d.endAngle) / 2 - Math.PI / 2;
              return `translate(${Math.cos(mid) * 5},${Math.sin(mid) * 5})`;
            })
            .attr('opacity', d => d.data.id === cur.id ? 1 : 0.72);

          root.select('.donut-lbl-name').text(isBn ? cur.nameBn : cur.nameEn);
          const pctSel = root.select('.donut-lbl-pct').style('fill', cur.color);
          animateTextNumber(pctSel, _donutLastPct, cur.pct, 320, v => `${fmtNum(Number(v.toFixed(2)), state.lang)}%`);
          _donutLastPct = cur.pct;
          root.select('.donut-lbl-pop').text(fmtNum(cur.pop, state.lang));
        }
      }

      const legend = document.getElementById('religionLegend');
      legend.innerHTML = RELIGIONS_2022.map(r => {
        const active = r.id === sel.id;
        return `
          <button type="button" data-rel-id="${r.id}" class="w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl border text-left transition-all duration-200 ${active ? 'bg-[#E6F2EC] border-[#0F7A53] translate-x-1' : 'bg-white border-[#E4E8E6] hover:border-[#0F6B4F] hover:bg-[#F5F9F7]'}">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-3 h-3 rounded-full shrink-0" style="background:${r.color}"></span>
              <span class="text-sm font-bold text-[#16211C] truncate">${isBn ? r.nameBn : r.nameEn}</span>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs text-[#5D6762] hidden sm:inline">${fmtNum(r.pop, state.lang)}</span>
              <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full ${active ? 'bg-[#0F7A53] text-white' : 'bg-[#E6EFEA] text-[#16211C]'}">${fmtNum(r.pct, state.lang)}%</span>
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

    function updateReligionLegendHighlight() {
      const legend = document.getElementById('religionLegend');
      if (!legend) return;
      legend.querySelectorAll('button[data-rel-id]').forEach(btn => {
        const active = btn.dataset.relId === state.selectedReligionId;
        btn.className = `w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl border text-left transition-all duration-200 ${active ? 'bg-[#E6F2EC] border-[#0F7A53] translate-x-1' : 'bg-white border-[#E4E8E6] hover:border-[#0F6B4F] hover:bg-[#F5F9F7]'}`;
        const pill = btn.querySelector('span.font-extrabold');
        if (pill) {
          pill.className = `text-xs font-extrabold px-2.5 py-0.5 rounded-full ${active ? 'bg-[#0F7A53] text-white' : 'bg-[#E6EFEA] text-[#16211C]'}`;
        }
      });
    }

    function renderReligionBarChart() {
      const isBn = state.lang === 'bn';
      ['minority', 'trend', 'div'].forEach(m => {
        const id = m === 'minority' ? 'relChartModeMinority' : (m === 'trend' ? 'relChartModeTrend' : 'relChartModeDiv');
        document.getElementById(id).classList.toggle('active', state.religionChartMode === m);
      });

      const wrap = document.getElementById('religionBarChartWrap');
      const caption = document.getElementById('barCaption');
      const note = document.getElementById('religionChartNote');

      if (state.religionChartMode === 'minority') {
        caption.textContent = isBn
          ? 'বাংলাদেশের সংখ্যালঘু ধর্মীয় জনগোষ্ঠীর মোট সংখ্যা (বিবিএস ২০২২ — যেকোনো বারে হোভার বা ক্লিক করুন)'
          : 'Population of religious minorities in Bangladesh (BBS 2022 — hover or click any bar to inspect)';
        const minorities = RELIGIONS_2022.filter(r => r.id !== 'islam');
        const totalMin = minorities.reduce((s, x) => s + x.pop, 0);
        const maxPop = Math.max(...minorities.map(m => m.pop));
        wrap.innerHTML = `
          <div class="space-y-2 chart-rows-dimming">
            ${minorities.map((m, idx) => {
              const wPct = Math.max(5, (m.pop / maxPop) * 100);
              const shareOfMin = ((m.pop / totalMin) * 100).toFixed(1);
              const tip = `<div class='font-bold text-[#16211C] mb-1'>${isBn ? m.nameBn : m.nameEn}</div>` +
                `<div class='font-extrabold' style='color:${m.color}'>${fmtNum(m.pop, state.lang)} (${fmtNum(m.pct, state.lang)}%)</div>` +
                `<div class='text-[11px] text-[#5D6762] mt-0.5'>${isBn ? 'সংখ্যালঘুদের মধ্যে অংশ' : 'Share among minorities'}: ${fmtNum(shareOfMin, state.lang)}%</div>`;
              return `
                <div class="chart-row-interactive space-y-1.5 ${state.selectedReligionId === m.id ? 'is-focused' : ''}" data-rel-bar="${m.id}" data-tip-html="${tip.replace(/"/g, '&quot;')}">
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-heading font-bold text-[#16211C] flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${m.color}"></span>
                      ${isBn ? m.nameBn : m.nameEn}
                    </span>
                    <span class="text-xs font-bold text-[#2B352F]">${fmtNum(m.pop, state.lang)} <span class="text-[#5D6762]">(${fmtNum(m.pct, state.lang)}%)</span></span>
                  </div>
                  <div class="w-full h-7 bg-[#E6EFEA] rounded-full overflow-hidden p-1">
                    <div class="h-full rounded-full chart-anim-bar" style="background:${m.color};--bar-idx:${idx}" data-anim-width="${wPct.toFixed(1)}%"></div>
                  </div>
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
        note.innerHTML = isBn
          ? '<strong>তথ্য নোট:</strong> মোট গণনাকৃত ১৬ কোটি ৫১ লক্ষ ৫৮ হাজার ৬১৬ জনের মধ্যে ইসলাম ধর্মাবলম্বী ১৫ কোটি ৩ লক্ষ ৬০ হাজার ৪০৪ জন (৯১.০৪%) এবং সব সংখ্যালঘু ধর্ম মিলিয়ে মোট ১ কোটি ৪৮ লক্ষ ৩১ হাজার ২৪২ জন (৮.৯৬%)।'
          : '<strong>Data Note:</strong> Out of 165,158,616 enumerated people in 2022, Islam accounts for 150,360,404 (91.04%) while minority faiths combined represent ~14.83 million (8.96%).';
      } else if (state.religionChartMode === 'trend') {
        caption.textContent = isBn
          ? '১৯৭১, ২০১১ ও ২০২২ সালের শুমারিতে ধর্মভিত্তিক শতকরা হারের পরিবর্তন (যেকোনো অংশে হোভার করুন)'
          : 'Historical census share shift across 1971, 2011, and 2022 (hover any segment for delta)';
        const base = RELIGION_TRENDS[0];
        wrap.innerHTML = `
          <div class="space-y-3.5">
            ${RELIGION_TRENDS.map((row, idx) => {
              const dIslam = (row.islam - base.islam).toFixed(2);
              const dHindu = (row.hinduism - base.hinduism).toFixed(2);
              const dOth = (row.others - base.others).toFixed(2);
              const yrLbl = isBn ? row.yearBn + ' সাল' : 'Year ' + row.year;
              const mkTip = (name, val, delta, col) =>
                `<div class='font-bold text-[#16211C] mb-0.5'>${yrLbl} · ${name}</div>` +
                `<div class='font-extrabold' style='color:${col}'>${fmtNum(val, state.lang)}%</div>` +
                (idx > 0 ? `<div class='text-[11px] text-[#5D6762]'>${isBn ? '১৯৭১ থেকে পরিবর্তন' : 'Change vs 1971'}: ${Number(delta) >= 0 ? '+' : ''}${fmtNum(delta, state.lang)}%</div>` : `<div class='text-[11px] text-[#5D6762]'>${isBn ? 'ভিত্তি বছর (১৯৭১)' : 'Baseline year (1971)'}</div>`);
              return `
                <div class="rounded-2xl bg-white border border-[#E4E8E6] hover:border-[#0C6B58] transition-colors p-3.5 space-y-2">
                  <div class="flex items-center justify-between flex-wrap gap-2">
                    <span class="font-heading text-base font-bold text-[#16211C]">${yrLbl}</span>
                    <div class="flex flex-wrap items-center gap-3 text-xs font-bold">
                      <span class="text-[#0F6B4F]">${isBn ? 'ইসলাম' : 'Islam'}: ${fmtNum(row.islam, state.lang)}%</span>
                      <span class="text-[#C96A2B]">${isBn ? 'হিন্দু' : 'Hindu'}: ${fmtNum(row.hinduism, state.lang)}%</span>
                      <span class="text-[#2C7A8C]">${isBn ? 'অন্যান্য' : 'Others'}: ${fmtNum(row.others, state.lang)}%</span>
                    </div>
                  </div>
                  <div class="w-full h-6 rounded-full overflow-hidden flex bg-[#E6EFEA] gap-0.5 p-0.5">
                    <div class="h-full rounded-l-full chart-anim-bar chart-seg-interactive" style="background:#0F7A53;--bar-idx:${idx}" data-anim-width="${row.islam}%" data-tip-html="${mkTip(isBn ? 'ইসলাম' : 'Islam', row.islam, dIslam, '#0F7A53').replace(/"/g, '&quot;')}"></div>
                    <div class="h-full chart-anim-bar chart-seg-interactive" style="background:#C96A2B;--bar-idx:${idx + 1}" data-anim-width="${row.hinduism}%" data-tip-html="${mkTip(isBn ? 'হিন্দু ধর্ম' : 'Hinduism', row.hinduism, dHindu, '#C96A2B').replace(/"/g, '&quot;')}"></div>
                    <div class="h-full rounded-r-full chart-anim-bar chart-seg-interactive" style="background:#2C7A8C;--bar-idx:${idx + 2}" data-anim-width="${Math.max(2.2, row.others)}%" data-tip-html="${mkTip(isBn ? 'বৌদ্ধ, খ্রিস্টান ও অন্যান্য' : 'Buddhism, Christianity & Others', row.others, dOth, '#2C7A8C').replace(/"/g, '&quot;')}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
        note.innerHTML = isBn
          ? '<strong>ঐতিহাসিক ধারা:</strong> ১৯৭১ সালে মুসলিম জনসংখ্যা ছিল ৮৫.৪% এবং হিন্দু জনসংখ্যা ছিল ১৩.৫%। ২০২২ সালে তা পরিবর্তিত হয়ে ইসলাম ৯১.০৪% এবং হিন্দু ৭.৯৫%-এ দাঁড়িয়েছে; বৌদ্ধ, খ্রিস্টান ও অন্যান্য মিলিয়ে প্রায় ১.০৩% স্থিতিশীল রয়েছে।'
          : '<strong>Historical Trend:</strong> Between 1971 and 2022, the Muslim share rose from 85.4% to 91.04%, the Hindu share shifted from 13.5% to 7.95%, and Buddhism, Christianity & others remained steady around ~1.03%.';
      } else {
        const natAvg = 7.95;
        const avgPos = ((natAvg / 15) * 100).toFixed(1);
        caption.textContent = isBn
          ? '২০২২ শুমারি অনুযায়ী শীর্ষ ৩টি ও সর্বনিম্ন বিভাগে হিন্দু জনসংখ্যার হার (ড্যাশড লাইন = জাতীয় গড় ৭.৯৫%)'
          : 'Highest & lowest divisional Hindu shares (BBS 2022 · dashed line = 7.95% national avg)';
        wrap.innerHTML = `
          <div class="space-y-2 chart-rows-dimming">
            <div class="flex items-center justify-end text-[11px] font-bold text-[#0C6B58] pb-0.5">
              <span>${isBn ? 'জাতীয় গড়: ৭.৯৫%' : 'National Avg: 7.95%'}</span>
            </div>
            ${HINDU_DIV_HIGHLIGHTS.map((d, idx) => {
              const wPct = (d.pct / 15) * 100;
              const diff = (d.pct - natAvg).toFixed(2);
              const tip = `<div class='font-bold text-[#16211C] mb-1'>${isBn ? d.divBn : d.divEn}</div>` +
                `<div class='font-extrabold' style='color:${d.color}'>${fmtNum(d.pct, state.lang)}% ${isBn ? 'হিন্দু জনসংখ্যা' : 'Hindu share'}</div>` +
                `<div class='text-[11px] text-[#5D6762] mt-0.5'>${isBn ? 'জাতীয় গড় (৭.৯৫%) থেকে' : 'vs National Avg (7.95%)'}: ${Number(diff) >= 0 ? '+' : ''}${fmtNum(diff, state.lang)}%</div>`;
              return `
                <div class="chart-row-interactive space-y-1" data-tip-html="${tip.replace(/"/g, '&quot;')}">
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-heading font-bold text-[#16211C]">${isBn ? d.divBn : d.divEn}</span>
                    <span class="text-xs font-extrabold text-[#16211C]">${fmtNum(d.pct, state.lang)}%</span>
                  </div>
                  <div class="relative w-full h-6 bg-[#E6EFEA] rounded-full overflow-hidden p-1">
                    <div class="benchmark-tick" style="left:${avgPos}%" title="National Avg 7.95%"></div>
                    <div class="h-full rounded-full chart-anim-bar" style="background:${d.color};--bar-idx:${idx}" data-anim-width="${wPct.toFixed(1)}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
        note.innerHTML = isBn
          ? '<strong>আঞ্চলিক বৈচিত্র্য:</strong> ২০২২ শুমারি অনুযায়ী সিলেট (১৩.৫%), রংপুর (১২.৯৮%) ও খুলনা (১১.৫২%) বিভাগে হিন্দু ধর্মাবলম্বীদের অনুপাত জাতীয় গড়ের (৭.৯৫%) তুলনায় অনেক বেশি; আর বৌদ্ধ ধর্মাবলম্বীরা প্রধানত চট্টগ্রাম বিভাগে কেন্দ্রীভূত।'
          : '<strong>Regional Distribution:</strong> Sylhet (13.5%), Rangpur (12.98%), and Khulna (11.52%) exceed the 7.95% national average for Hindu share, while Buddhist populations are heavily concentrated in Chattogram Division.';
      }

      animateBarsIn(wrap, true);
      bindTooltipElements(wrap);
    }

    function renderReligionDetailCards() {
      const isBn = state.lang === 'bn';
      const grid = document.getElementById('religionDetailCards');
      grid.innerHTML = RELIGIONS_2022.map(r => {
        const isSel = r.id === state.selectedReligionId;
        return `
          <div class="rounded-[24px] p-5 sm:p-6 bg-white border-2 transition modern-lift ${isSel ? 'border-[#0F7A53]' : 'border-[#E4E8E6]'}">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div class="flex items-center gap-2.5">
                <span class="w-3.5 h-3.5 rounded-full shrink-0" style="background:${r.color}"></span>
                <h3 class="font-heading text-xl font-bold text-[#16211C]">${isBn ? r.nameBn : r.nameEn}</h3>
              </div>
              <span class="font-heading text-xl font-extrabold" style="color:${r.color}">${fmtNum(r.pct, state.lang)}%</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="micro-pill">${isBn ? r.tagBn : r.tagEn}</span>
              <span class="micro-pill">${isBn ? 'জনসংখ্যা:' : 'Pop:'} ${fmtNum(r.pop, state.lang)}</span>
            </div>
            <p class="text-sm text-[#16211C] leading-[1.8] mb-2.5">${isBn ? r.summaryBn : r.summaryEn}</p>
            <p class="text-sm text-[#2B352F] leading-[1.8] mb-3">${isBn ? r.historyBn : r.historyEn}</p>
            <div class="text-xs text-[#2B352F] bg-[#F3F5F0] rounded-2xl px-3.5 py-2.5">
              <strong class="text-[#16211C]">${isBn ? 'আঞ্চলিক উপস্থিতি:' : 'Regional Presence:'}</strong> ${isBn ? r.regionsBn : r.regionsEn}
            </div>
          </div>
        `;
      }).join('');
    }

    function renderAllDistrictsDirectory() {
      const grid = document.getElementById('allDistrictsDirectory');
      const isBn = state.lang === 'bn';
      grid.innerHTML = DIVISIONS.map(div => {
        const isCurrentDiv = div.id === state.selectedDivisionId;
        return `
          <div class="rounded-[22px] p-4 sm:p-5 border ${isCurrentDiv ? 'bg-[#EDF5F0] border-[#0F7A53]' : 'bg-white border-[#E4E8E6]'}">
            <div class="flex items-center justify-between gap-2 mb-3">
              <button type="button" data-dir-div="${div.id}" class="flex items-center gap-2 text-left hover:underline">
                <span class="w-3 h-3 rounded-full shrink-0" style="background:${div.color}"></span>
                <span class="font-heading text-base font-bold text-[#16211C]">${isBn ? div.nameBn : div.nameEn}</span>
              </button>
              <span class="text-xs font-bold text-[#5D6762]">${fmtNum(div.districts.length, state.lang)} ${isBn ? 'জেলা' : 'districts'} · ${fmtYear(div.est, state.lang)}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${div.districts.map(dist => {
                const isSel = dist.id === state.selectedDistrictId;
                return `
                  <button type="button" data-dir-dist="${dist.id}" class="px-3 py-1.5 rounded-full text-xs font-semibold border ${isSel ? 'bg-[#121714] text-white border-[#121714]' : 'bg-[#F5F7F6] text-[#16211C] border-[#E4E8E6] hover:border-[#0F6B4F] hover:text-[#0F6B4F]'}">
                    ${isBn ? dist.nameBn : dist.nameEn}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
      grid.querySelectorAll('button[data-dir-div]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.activeTimelineId = null;
          state.mapLayer = 'divisions';
          selectDivision(btn.dataset.dirDiv, { autoZoom: true });
          document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      grid.querySelectorAll('button[data-dir-dist]').forEach(btn => {
        btn.addEventListener('click', () => focusDistrictFromCard(btn.dataset.dirDist, true));
      });
    }

    function renderNationalTimeline() {
      const grid = document.getElementById('nationalTimelineGrid');
      const isBn = state.lang === 'bn';
      grid.innerHTML = NATIONAL_TIMELINE.map(item => {
        const active = state.activeTimelineId === item.id;
        return `
          <button type="button" data-timeline-id="${item.id}" class="text-left rounded-[22px] p-5 border transition flex flex-col justify-between ${active ? 'border-[#0F7A53] bg-[#E6F2EC]' : 'border-[#E4E8E6] bg-white hover:border-[#0F6B4F]'}">
            <div>
              <div class="inline-block text-xs font-mono font-bold px-3 py-1 rounded-full ${active ? 'bg-[#0B4D36] text-white' : 'bg-[#121714] text-white'} mb-3">
                ${isBn ? item.yearBn : item.yearEn}
              </div>
              <h3 class="font-heading text-base font-bold text-[#16211C] leading-snug">${isBn ? item.titleBn : item.titleEn}</h3>
              <p class="text-sm text-[#2B352F] mt-2 leading-relaxed">${isBn ? item.descBn : item.descEn}</p>
            </div>
          </button>
        `;
      }).join('');
      grid.querySelectorAll('button[data-timeline-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.timelineId;
          state.activeTimelineId = state.activeTimelineId === id ? null : id;
          if (state.activeTimelineId) {
            state.mapLayer = 'divisions';
            resetMapZoom();
            document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          renderAll();
        });
      });
    }

    
    function makeFamousFallbackSvg(title, division) {
      const safeTitle = String(title || '').replace(/[<>&"']/g, '');
      const safeDiv = String(division || '').replace(/[<>&"']/g, '');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#084B3E"/><stop offset="100%" stop-color="#0C6B58"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><circle cx="520" cy="90" r="110" fill="rgba(255,255,255,0.07)"/><circle cx="110" cy="340" r="130" fill="rgba(255,255,255,0.06)"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="34" font-weight="700">${safeTitle}</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="#CBEFE0" font-family="sans-serif" font-size="18" font-weight="600">${safeDiv}</text></svg>`;
      return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }

    function renderPhotoShowcase() {
      const bodyEl = document.getElementById('famousShowcaseBody');
      const eyebrowEl = document.getElementById('famousShowcaseEyebrow');
      const titleEl = document.getElementById('famousShowcaseTitle');
      const badgeEl = document.getElementById('famousShowcaseCountBadge');
      const backBtn = document.getElementById('btnShowDivisionFamous');
      const backLabel = document.getElementById('btnShowDivisionFamousLabel');
      if (!bodyEl) return;

      const isBn = state.lang === 'bn';
      const activeDiv = DIVISION_BY_ID[state.selectedDivisionId] || DIVISIONS[0];
      const activeDist = state.selectedDistrictId ? DISTRICT_BY_ID[state.selectedDistrictId] : null;

      if (activeDist) {
        const media = DISTRICT_MEDIA[activeDist.id] || {};
        const distName = isBn ? activeDist.nameBn : activeDist.nameEn;
        const divName = isBn ? activeDist.divisionNameBn : activeDist.divisionNameEn;
        const famousText = isBn ? activeDist.famousBn : activeDist.famousEn;
        const caption = isBn ? (media.captionBn || distName) : (media.captionEn || distName);
        const fallbackUri = makeFamousFallbackSvg(distName, divName);
        const imgSrc = media.img || fallbackUri;

        if (eyebrowEl) eyebrowEl.textContent = isBn ? `${divName} · নির্বাচিত জেলার বিশেষ পরিচিতি` : `${divName} · Selected District Specialty`;
        if (titleEl) titleEl.textContent = isBn ? `${distName} জেলা কিসের জন্য বিখ্যাত` : `What ${distName} District Is Famous For`;
        if (badgeEl) badgeEl.textContent = isBn ? '১টি নির্বাচিত জেলা' : '1 Selected District';
        if (backBtn) {
          backBtn.classList.remove('hidden');
          backBtn.onclick = () => selectDivision(activeDist.divisionId, { autoZoom: true });
        }
        if (backLabel) backLabel.textContent = isBn ? `${divName}-এর সব জেলা দেখুন` : `View all ${divName} districts`;

        bodyEl.innerHTML = `
          <article class="famous-spotlight-card">
            <div class="famous-spotlight-media">
              <img src="${imgSrc}" alt="${caption}" loading="eager" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fallbackUri}';" />
              <div class="famous-caption-chip">${caption}</div>
            </div>
            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#E4F2EE] text-[#084B3E] text-xs font-bold">${divName}</span>
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#FEF3EC] text-[#A4481E] text-xs font-bold">${isBn ? 'বিখ্যাত ঐতিহ্য ও পরিচিতি' : 'Famous Heritage & Identity'}</span>
              </div>
              <div>
                <h3 class="font-heading text-2xl sm:text-3xl font-bold text-[#16211C]">${distName}</h3>
                <p class="text-sm sm:text-[15px] text-[#2B352F] leading-relaxed mt-2.5">${famousText}</p>
              </div>
              <div class="pt-2 flex flex-wrap items-center gap-2.5">
                <button type="button" onclick="zoomToDistrict('${activeDist.id}'); document.getElementById('mapWorkspace')?.scrollIntoView({behavior:'smooth', block:'start'});" class="px-4 py-2 rounded-xl bg-[#0C6B58] text-white hover:bg-[#084B3E] text-xs font-bold transition">
                  ${isBn ? 'মানচিত্রে অবস্থান দেখুন' : 'Locate on Map'}
                </button>
                <button type="button" onclick="selectDivision('${activeDist.divisionId}', { autoZoom: true })" class="px-4 py-2 rounded-xl bg-[#E4F2EE] text-[#084B3E] hover:bg-[#CEEBE2] text-xs font-bold transition">
                  ${isBn ? `${divName}-এর অন্য জেলাসমূহ` : `Other Districts in ${divName}`}
                </button>
              </div>
            </div>
          </article>
        `;
      } else {
        const divDistricts = ALL_DISTRICTS.filter(d => d.divisionId === activeDiv.id);
        const divName = isBn ? activeDiv.nameBn : activeDiv.nameEn;

        if (eyebrowEl) eyebrowEl.textContent = isBn ? `${divName} · জেলার ঐতিহ্য ও দর্শনীয় স্থান` : `${divName} · District Specialties & Landmarks`;
        if (titleEl) titleEl.textContent = isBn ? `${divName}-এর জেলাসমূহ কিসের জন্য বিখ্যাত` : `What ${divName} Districts Are Famous For`;
        if (badgeEl) badgeEl.textContent = isBn ? `${toBnDigits(divDistricts.length)}টি জেলা · ক্লিক করে বিস্তারিত দেখুন` : `${divDistricts.length} Districts · Click to Focus`;
        if (backBtn) backBtn.classList.add('hidden');

        bodyEl.innerHTML = `<div class="ub-photo-grid-dynamic">${divDistricts.map(d => {
          const media = DISTRICT_MEDIA[d.id] || {};
          const distName = isBn ? d.nameBn : d.nameEn;
          const famousText = isBn ? d.famousBn : d.famousEn;
          const caption = isBn ? (media.captionBn || distName) : (media.captionEn || distName);
          const fallbackUri = makeFamousFallbackSvg(distName, divName);
          const imgSrc = media.img || fallbackUri;
          return `
            <button type="button" onclick="focusDistrictFromCard('${d.id}', false)" class="famous-dist-card group">
              <div class="ub-thumb">
                <img src="${imgSrc}" alt="${caption}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${fallbackUri}';" />
              </div>
              <div class="space-y-1.5 w-full">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-heading text-base font-bold text-[#16211C] group-hover:text-[#0C6B58] transition">${distName}</span>
                  <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E4F2EE] text-[#084B3E] shrink-0">${divName}</span>
                </div>
                <div class="text-[11px] font-semibold text-[#C45D2C] truncate">${caption}</div>
                <p class="text-xs text-[#5D6762] leading-relaxed line-clamp-3">${famousText}</p>
              </div>
            </button>
          `;
        }).join('')}</div>`;
      }
    }

    function renderAll() {
      renderStaticCopy();
      renderFeaturedBanner();
      renderDivisionPills();
      renderDistrictSpotlight();
      renderPhotoShowcase();
      renderDetailHeader();
      renderDetailTabs();
      renderDetailBody();
      renderOriginSection();
      renderEthnicStatsSection();
      renderReligionPage();
      renderBangladeshPage();
      renderWorldPage();
      renderAboutPage();
      renderComparePage();
      const cmpBtnLbl = document.getElementById('btnOpenCompareLbl');
      if (cmpBtnLbl) cmpBtnLbl.textContent = state.lang === 'bn' ? 'বাংলাদেশ বনাম উন্নত দেশ তুলনা করুন →' : 'Compare Bangladesh vs Developed Countries →';
      renderAllDistrictsDirectory();
      renderNationalTimeline();
      renderMapLayers();
      if (animState.initialized) { renderAnimStaticCopy(); renderAnimStepper(); renderAnimStoryCards(); }
    }


