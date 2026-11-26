    function setupGlobalSearch() {
      const input = document.getElementById('globalSearchInput');
      const dropdown = document.getElementById('globalSearchResults');
      const btnSearch = document.getElementById('btnGlobalSearch');
      const btnClear = document.getElementById('btnClearGlobalSearch');
      if (!input || !dropdown) return;

      const findMatches = (rawStr) => {
        const raw = (rawStr || '').trim().toLowerCase();
        if (!raw) return { divMatches: [], distMatches: [] };
        const qNorm = normName(raw);
        const divMatches = DIVISIONS.filter(d =>
          d.nameBn.toLowerCase().includes(raw) ||
          d.nameEn.toLowerCase().includes(raw) ||
          (d.shortBn && d.shortBn.toLowerCase().includes(raw)) ||
          (d.shortEn && d.shortEn.toLowerCase().includes(raw)) ||
          normName(d.nameEn).includes(qNorm) ||
          DIVISION_ALIASES[qNorm] === d.id
        );
        const distMatches = ALL_DISTRICTS.filter(d =>
          d.nameBn.toLowerCase().includes(raw) ||
          d.nameEn.toLowerCase().includes(raw) ||
          normName(d.nameEn).includes(qNorm) ||
          DISTRICT_ALIASES[qNorm] === d.id
        ).slice(0, 12);
        return { divMatches, distMatches };
      };

      const selectSearchDivision = (divId) => {
        state.mapLayer = 'divisions';
        state.activeTab = 'overview';
        selectDivision(divId, { autoZoom: true });
        dropdown.classList.add('hidden');
        dropdown.style.display = 'none';
        setTimeout(() => document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      };

      const selectSearchDistrict = (distId) => {
        focusDistrictFromCard(distId, true);
        dropdown.classList.add('hidden');
        dropdown.style.display = 'none';
      };

      const renderSearchDropdown = () => {
        const raw = input.value.trim();
        if (btnClear) {
          btnClear.classList.toggle('hidden', !raw);
          btnClear.style.display = raw ? 'inline-flex' : 'none';
        }
        if (!raw) {
          dropdown.classList.add('hidden');
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          return { divMatches: [], distMatches: [] };
        }
        const isBn = state.lang === 'bn';
        const { divMatches, distMatches } = findMatches(raw);

        if (divMatches.length === 0 && distMatches.length === 0) {
          dropdown.innerHTML = `<div class="px-4 py-3.5 text-xs font-medium text-[#5A6B64]">${isBn ? 'কোনো বিভাগ বা জেলা পাওয়া যায়নি। (যেমন: ঢাকা, সিলেট, কক্সবাজার, বরগুনা)' : 'No division or district found.'}</div>`;
          dropdown.classList.remove('hidden');
          dropdown.style.display = 'block';
          return { divMatches, distMatches };
        }
        let htmlOut = '';
        divMatches.forEach(d => {
          htmlOut += `
            <button type="button" data-search-div="${d.id}" class="w-full text-left px-4 py-2.5 hover:bg-[#F1F8F5] flex items-center justify-between gap-2 border-b border-[#E7EFEA] bg-white cursor-pointer">
              <div>
                <div class="text-sm font-bold text-[#0F1C17]">${isBn ? d.nameBn : d.nameEn}</div>
                <div class="text-[11px] text-[#5A6B64]">${isBn ? `${toBnDigits(d.districts.length)}টি জেলা` : `${d.districts.length} districts`}</div>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#DCEFE5] text-[#0B4D36] font-bold">${isBn ? 'বিভাগ' : 'Division'}</span>
            </button>
          `;
        });
        distMatches.forEach(d => {
          htmlOut += `
            <button type="button" data-search-dist="${d.id}" class="w-full text-left px-4 py-2.5 hover:bg-[#F1F8F5] flex items-center justify-between gap-2 border-b border-[#E7EFEA] bg-white cursor-pointer">
              <div>
                <div class="text-sm font-bold text-[#0F1C17]">${isBn ? d.nameBn + ' জেলা' : d.nameEn + ' District'}</div>
                <div class="text-xs text-[#5A6B64]">${isBn ? d.divisionNameBn : d.divisionNameEn} · ${fmtYear(d.est, state.lang)}</div>
              </div>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#E6EFEA] text-[#0F1C17] font-bold">${isBn ? 'জেলা' : 'District'}</span>
            </button>
          `;
        });
        dropdown.innerHTML = htmlOut;
        dropdown.classList.remove('hidden');
        dropdown.style.display = 'block';

        dropdown.querySelectorAll('button[data-search-div]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectSearchDivision(btn.dataset.searchDiv);
          });
        });
        dropdown.querySelectorAll('button[data-search-dist]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectSearchDistrict(btn.dataset.searchDist);
          });
        });
        return { divMatches, distMatches };
      };

      const triggerDirectSearch = () => {
        const raw = input.value.trim();
        if (!raw) {
          input.focus();
          return;
        }
        const { divMatches, distMatches } = renderSearchDropdown();
        if (distMatches.length > 0) {
          selectSearchDistrict(distMatches[0].id);
        } else if (divMatches.length > 0) {
          selectSearchDivision(divMatches[0].id);
        }
      };

      input.addEventListener('input', renderSearchDropdown);
      input.addEventListener('focus', () => { if (input.value.trim()) renderSearchDropdown(); });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerDirectSearch();
        } else if (e.key === 'Escape') {
          dropdown.classList.add('hidden');
          dropdown.style.display = 'none';
        }
      });
      btnSearch?.addEventListener('click', (e) => {
        e.preventDefault();
        triggerDirectSearch();
      });
      btnClear?.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        renderSearchDropdown();
        input.focus();
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.ub-ask-box')) {
          dropdown.classList.add('hidden');
          dropdown.style.display = 'none';
        }
      });
    }

    document.querySelectorAll('[data-page-target]').forEach(btn => {
      btn.addEventListener('click', () => { if (btn.dataset.pageTarget === 'animation') unlockAudioAndSpeech(); switchPage(btn.dataset.pageTarget); });
    });
    document.getElementById('brandHomeBtn').addEventListener('click', () => switchPage('districts'));
    document.getElementById('btnTopMapQuick').addEventListener('click', () => {
      switchPage('districts', false);
    requestAnimationFrame(() => updateDockBubble(false));
    setTimeout(() => updateDockBubble(false), 180);
      setTimeout(() => document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    });

    document.getElementById('btnLangBn').addEventListener('click', () => { state.lang = 'bn'; renderAll(); });
    document.getElementById('btnLangEn').addEventListener('click', () => { state.lang = 'en'; renderAll(); });
    document.getElementById('btnCycleDivision').addEventListener('click', () => {
      const idx = DIVISIONS.findIndex(d => d.id === state.selectedDivisionId);
      const next = DIVISIONS[(idx + 1) % DIVISIONS.length];
      state.activeTimelineId = null;
      selectDivision(next.id, { autoZoom: true });
    });
    document.getElementById('btnLayerDivisions').addEventListener('click', () => { state.mapLayer = 'divisions'; state.selectedDistrictId = null; renderAll(); });
    document.getElementById('btnLayerDistricts').addEventListener('click', () => { state.mapLayer = 'districts'; state.activeTimelineId = null; renderAll(); });
    document.getElementById('btnToggleLabels').addEventListener('click', () => { state.showDistLabels = !state.showDistLabels; renderAll(); });

    document.getElementById('tabOverview').addEventListener('click', () => { state.activeTab = 'overview'; renderDetailTabs(); renderDetailBody(); });
    document.getElementById('tabFormation').addEventListener('click', () => { state.activeTab = 'formation'; renderDetailTabs(); renderDetailBody(); });
    document.getElementById('tabDistricts').addEventListener('click', () => { state.activeTab = 'districts'; renderDetailTabs(); renderDetailBody(); });

    document.getElementById('originTabAncestry').addEventListener('click', () => { state.originTab = 'ancestry'; renderOriginSection(); });
    document.getElementById('originTabJanapada').addEventListener('click', () => { state.originTab = 'janapada'; renderOriginSection(); });
    document.getElementById('originTab1947').addEventListener('click', () => { state.originTab = '1947'; renderOriginSection(); });
    document.getElementById('originTab4Groups').addEventListener('click', () => { state.originTab = 'groups4'; renderOriginSection(); });

    document.getElementById('relChartModeMinority').addEventListener('click', () => { state.religionChartMode = 'minority'; renderReligionBarChart(); });
    document.getElementById('relChartModeTrend').addEventListener('click', () => { state.religionChartMode = 'trend'; renderReligionBarChart(); });
    document.getElementById('relChartModeDiv').addEventListener('click', () => { state.religionChartMode = 'div'; renderReligionBarChart(); });

    document.getElementById('btnZoomIn').addEventListener('click', () => { if (mapSvg && mapZoom) mapSvg.transition().duration(260).call(mapZoom.scaleBy, 1.45); });
    document.getElementById('btnZoomOut').addEventListener('click', () => { if (mapSvg && mapZoom) mapSvg.transition().duration(260).call(mapZoom.scaleBy, 0.7); });
    document.getElementById('btnZoomReset').addEventListener('click', () => { state.activeTimelineId = null; state.selectedDistrictId = null; resetMapZoom(); renderAll(); });


    document.getElementById('btnAnimPlayPause')?.addEventListener('click', () => {
      unlockAudioAndSpeech();
      if (animState.playing) pauseAnimTour();
      else { startAnimTour(); const d = DIVISION_BY_ID[ANIM_ORDER[animState.divIdx]]; const ds = animState.distIdx >= 0 ? DISTRICT_BY_ID[d.districts[animState.distIdx]?.id] : null; speakPlaceNameOnly(ds ? ds.nameBn + ' জেলা' : d.nameBn, ds ? ds.nameEn + ' District' : d.nameEn, Boolean(ds)); }
    });
    document.getElementById('btnAnimNext')?.addEventListener('click', () => stepAnimForward());
    document.getElementById('btnAnimPrev')?.addEventListener('click', () => stepAnimBackward());
    document.getElementById('btnAnimRestart')?.addEventListener('click', () => {
      goToAnimStop(0, -1, false);
      startAnimTour();
    });
    document.getElementById('btnAnimVoice')?.addEventListener('click', () => {
      animState.voiceEnabled = !animState.voiceEnabled;
      if (!animState.voiceEnabled) {
        stopAnimVoice();
      } else {
        const div = DIVISION_BY_ID[ANIM_ORDER[animState.divIdx]];
        const distObj = (animState.distIdx >= 0 && div.districts[animState.distIdx])
          ? DISTRICT_BY_ID[div.districts[animState.distIdx].id]
          : null;
        unlockAudioAndSpeech();
        const bnSp = distObj ? `${distObj.nameBn} জেলা` : div.nameBn;
        const enSp = distObj ? `${distObj.nameEn} District` : div.nameEn;
        speakPlaceNameOnly(bnSp, enSp, Boolean(distObj));
      }
      updateAnimVoiceButton();
    });
    document.getElementById('btnAnimModeDiv')?.addEventListener('click', () => {
      animState.mode = 'div';
      document.getElementById('btnAnimModeDiv').classList.add('active');
      document.getElementById('btnAnimModeDeep').classList.remove('active');
      goToAnimStop(animState.divIdx, -1, false);
    });
    document.getElementById('btnAnimModeDeep')?.addEventListener('click', () => {
      animState.mode = 'deep';
      document.getElementById('btnAnimModeDeep').classList.add('active');
      document.getElementById('btnAnimModeDiv').classList.remove('active');
      scheduleNextAnimStep();
    });
    [document.getElementById('btnAnimSpeed1'), document.getElementById('btnAnimSpeed15')].forEach(btn => {
      btn?.addEventListener('click', () => {
        animState.speed = Number(btn.dataset.speed);
        document.getElementById('btnAnimSpeed1').classList.toggle('active', animState.speed === 1);
        document.getElementById('btnAnimSpeed15').classList.toggle('active', animState.speed !== 1);
        scheduleNextAnimStep();
      });
    });


    document.getElementById('btnWLineLife')?.addEventListener('click', () => { state.worldLineMetric = 'life'; renderWorldLineChart(); });
    document.getElementById('btnWLineGdp')?.addEventListener('click', () => { state.worldLineMetric = 'gdp'; renderWorldLineChart(); });
    document.getElementById('btnWLineHdi')?.addEventListener('click', () => { state.worldLineMetric = 'hdi'; renderWorldLineChart(); });
    document.getElementById('btnWCatMil')?.addEventListener('click', () => { state.worldBarCat = 'mil'; renderWorldBarChart(); });
    document.getElementById('btnWCatEco')?.addEventListener('click', () => { state.worldBarCat = 'eco'; renderWorldBarChart(); });
    document.getElementById('btnWCatAgri')?.addEventListener('click', () => { state.worldBarCat = 'agri'; renderWorldBarChart(); });
    document.getElementById('btnWCatGeo')?.addEventListener('click', () => { state.worldBarCat = 'geo'; renderWorldBarChart(); });
    document.getElementById('btnReplayDonut')?.addEventListener('click', () => { spinReplayBtn('btnReplayDonut'); renderReligionDonut(true); renderReligionBarChart(); });
    document.getElementById('btnReplayWorldLine')?.addEventListener('click', () => { spinReplayBtn('btnReplayWorldLine'); renderWorldLineChart(); });
    document.getElementById('btnReplayWorldRadar')?.addEventListener('click', () => { spinReplayBtn('btnReplayWorldRadar'); renderWorldRadarChart(); });

    setupGlobalSearch();
    initMap();
    renderAll();
    switchPage('districts', false);
    requestAnimationFrame(() => updateDockBubble(false));
    setTimeout(() => updateDockBubble(false), 180);
  

    function ubJumpPage(pageId) {
      if (pageId !== 'districts') {
        if (typeof switchPage === 'function') switchPage(pageId, true);
        return;
      }
      if (typeof switchPage === 'function') switchPage('districts', false);
      const target = document.getElementById('mapWorkspace') || document.querySelector('main');
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 82;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
    window.ubJumpPage = ubJumpPage;
    document.querySelectorAll('[data-photo-dist]').forEach(btn => {
      btn.addEventListener('click', () => {
        const distId = btn.getAttribute('data-photo-dist');
        if (distId && typeof focusDistrictFromCard === 'function') {
          focusDistrictFromCard(distId, true);
        }
      });
    });
    document.querySelectorAll('.top-page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.currentPage !== 'districts') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
    // Toggle navbar tucked light/dark state on scroll (Taste Skill style)
    (function() {
      const navWrap = document.querySelector('.ub-nav-wrap');
      const heroEl = document.getElementById('ubHero');
      if (!navWrap) return;
      let cachedThreshold = 40;
      let tuckTicking = false;
      const measureHero = () => {
        cachedThreshold = heroEl && heroEl.offsetHeight > 0 ? Math.max(40, heroEl.offsetHeight - 86) : 40;
      };
      const syncNavTuck = () => {
        tuckTicking = false;
        const heroHidden = document.body.classList.contains('subpage-active') || !heroEl || cachedThreshold <= 40;
        const tucked = heroHidden || window.scrollY > cachedThreshold;
        const nextVal = tucked ? 'true' : 'false';
        if (navWrap.getAttribute('data-tucked') !== nextVal) {
          navWrap.setAttribute('data-tucked', nextVal);
        }
      };
      const onScrollTuck = () => {
        if (!tuckTicking) {
          tuckTicking = true;
          requestAnimationFrame(syncNavTuck);
        }
      };
      measureHero();
      syncNavTuck();
      window.addEventListener('scroll', onScrollTuck, { passive: true });
      window.addEventListener('resize', () => { measureHero(); onScrollTuck(); }, { passive: true });
      const mo = new MutationObserver(() => { measureHero(); syncNavTuck(); });
      mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    })();

    // Taste Skill Motion Layer: Word-by-word Hero Rise, Pointer Sunrise Drift, Gliding Nav Chip & Scroll Reveals
    (function() {
      // 1) Masked word-by-word rise for Hero H1 (preserves <em> and <br>)
      const heroH1 = document.querySelector('.ub-hero h1');
      if (heroH1) {
        let wordIdx = 0;
        const wrapTextNodes = (node) => {
          Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === 3 && child.textContent.trim()) {
              const frag = document.createDocumentFragment();
              const parts = child.textContent.split(/(\s+)/);
              parts.forEach((p) => {
                if (!p) return;
                if (/^\s+$/.test(p)) {
                  frag.appendChild(document.createTextNode(p));
                } else {
                  const outer = document.createElement('span');
                  outer.className = 'ts-word';
                  const inner = document.createElement('span');
                  inner.style.setProperty('--w', String(wordIdx++));
                  inner.textContent = p;
                  outer.appendChild(inner);
                  frag.appendChild(outer);
                }
              });
              child.parentNode.replaceChild(frag, child);
            } else if (child.nodeType === 1 && child.tagName !== 'BR' && !child.classList.contains('ts-word')) {
              wrapTextNodes(child);
            }
          });
        };
        wrapTextNodes(heroH1);
      }

      // 2) Hero horizon kept static (zero pointermove getBoundingClientRect layout thrash)

      // 3) Gliding spring pill indicator in top desktop navbar (.ts-nav-chip)
      const navBtns = Array.from(document.querySelectorAll('.ub-nav .top-page-btn'));
      if (navBtns.length) {
        const host = navBtns[0].parentElement;
        if (host) {
          host.classList.add('ub-nav-links-host');
          const chip = document.createElement('span');
          chip.className = 'ts-nav-chip';
          chip.setAttribute('aria-hidden', 'true');
          host.insertBefore(chip, host.firstChild);

          const moveChip = (targetBtn) => {
            const active = targetBtn || host.querySelector('.top-page-btn.active-nav') || navBtns[0];
            if (!active || host.offsetParent === null) {
              chip.style.opacity = '0';
              return;
            }
            const hr = host.getBoundingClientRect();
            const br = active.getBoundingClientRect();
            if (br.width <= 0) return;
            host.classList.add('has-chip');
            chip.style.opacity = '1';
            chip.style.width = br.width.toFixed(1) + 'px';
            chip.style.transform = 'translateX(' + (br.left - hr.left).toFixed(1) + 'px)';
          };

          requestAnimationFrame(() => moveChip());
          window.addEventListener('resize', () => moveChip(), { passive: true });
          navBtns.forEach((btn) => {
            btn.addEventListener('click', () => requestAnimationFrame(() => moveChip(btn)));
          });
          const navMo = new MutationObserver(() => requestAnimationFrame(() => moveChip()));
          navBtns.forEach((b) => navMo.observe(b, { attributes: true, attributeFilter: ['class'] }));
        }
      }

      // 4) Scroll-triggered staggered entrance for stats & cards (immediately reveals in-viewport items)
      const statBtns = Array.from(document.querySelectorAll('.ub-stats button'));
      statBtns.forEach((el, idx) => {
        el.setAttribute('data-ts-enter', '');
        el.style.setProperty('--enter-i', String(idx));
      });
      const revealEls = [
        ...statBtns,
        ...Array.from(document.querySelectorAll('main .lux-card, #ubPhotoShowcase'))
      ];
      revealEls.forEach((el, idx) => {
        if (!el.hasAttribute('data-ts-enter')) {
          el.setAttribute('data-ts-enter', '');
          el.style.setProperty('--enter-i', String(idx % 4));
        }
      });

      const revealInView = (el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.98) {
          el.classList.add('is-in');
          return true;
        }
        return false;
      };

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.04, rootMargin: '0px 0px -24px 0px' });

        revealEls.forEach((el) => {
          if (!revealInView(el)) io.observe(el);
        });
      } else {
        revealEls.forEach((el) => el.classList.add('is-in'));
      }
    })();

    // MapBangladesh.com Universal All-Pages Scroll-Linked Drift, De-Blur & Text Reveal Engine (Pages 1–7)
    (function() {
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
      const mainEl = document.querySelector('main#top');
      if (!mainEl) return;

      let textIo = null;
      let cardIo = null;
      let driftGrids = [];
      let ticking = false;
      let refreshTimer = null;

      const isDriftableGrid = (el) => {
        if (!el || el.offsetParent === null) return false;
        if (el.id === 'mapWorkspace' || el.closest('#mapContainer') || el.closest('#animMapContainer')) return false;
        if (el.querySelector('svg#bdMapSvg, canvas')) return false;
        const kids = Array.from(el.children).filter(c => c.offsetParent !== null);
        if (kids.length < 2) return false;
        const firstRect = kids[0].getBoundingClientRect();
        return firstRect.width > 90 && firstRect.height > 44;
      };

      const runDrift = () => {
        ticking = false;
        const vh = window.innerHeight || 800;
        driftGrids.forEach((grid) => {
          if (!grid || !grid.isConnected || grid.offsetParent === null) return;
          const items = Array.from(grid.children).filter(c => c.offsetParent !== null);
          if (!items.length) return;
          const gridRect = grid.getBoundingClientRect();
          const W = grid.clientWidth || 1;
          if (gridRect.top > vh) {
            items.forEach((li) => { li._mbk = null; });
          }
          items.forEach((li) => {
            const r = li.getBoundingClientRect();
            const col = Math.round((r.left - gridRect.left) / (r.width || 1));
            const cols = Math.max(1, Math.round(W / (r.width || W)));
            const side = cols < 2 ? 0 : (col === 0 ? -1 : (col === cols - 1 ? 1 : 0));
            let k = clamp01((r.top - vh * 0.48 - col * vh * 0.05) / (vh * 0.54));
            if (li._mbk != null && k > li._mbk) k = li._mbk;
            li._mbk = k;

            const children = li.children;
            const far = Math.min(W * 0.30, 130);
            if (children.length > 0) {
              for (let j = 0; j < children.length; j++) {
                const kk = 1 - easeOutCubic(clamp01(1 - k * (1 + j * 0.22)));
                const dx = side * far * kk;
                const dy = (side ? 42 : 92) * kk;
                const rot = side * 8.5 * kk;
                const sc = 1 - 0.055 * kk;
                children[j].style.transform = kk > 0.005
                  ? `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`
                  : '';
                children[j].style.opacity = kk > 0.005 ? (1 - kk).toFixed(3) : '';
                children[j].style.filter = kk > 0.02 ? `blur(${(kk * 4.5).toFixed(1)}px)` : '';
              }
            } else {
              const kk = 1 - easeOutCubic(clamp01(1 - k));
              const dx = side * far * kk;
              const dy = (side ? 42 : 92) * kk;
              li.style.transform = kk > 0.005 ? `translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0)` : '';
              li.style.opacity = kk > 0.005 ? (1 - kk).toFixed(3) : '';
            }
          });
        });
      };

      const reqDrift = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(runDrift);
        }
      };

      const bindActivePageAnimations = (resetVisible = false) => {
        const activePage = mainEl.querySelector('.active-page') || mainEl;
        if (textIo) textIo.disconnect();
        if (cardIo) cardIo.disconnect();

        // 1) UnseenBangladesh-style Smooth Rise & Fade Reveal on headings & kickers
        const textTargets = Array.from(activePage.querySelectorAll('h2, h3, .ub-cu-ey, #dirEyebrow, #timelineEyebrow'));
        textIo = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-shown');
              textIo.unobserve(entry.target);
            }
          });
        }, { threshold: 0.06, rootMargin: '0px 0px -48px 0px' });

        textTargets.forEach((el, idx) => {
          el.classList.add('mb-text-reveal');
          el.style.setProperty('--rv-i', String(idx % 4));
          if (resetVisible) el.classList.remove('is-shown');
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-shown')));
          } else {
            textIo.observe(el);
          }
        });

        // 2) UnseenBangladesh-style Smooth Block, Card & Footer Reveal (.rv -> .in feel)
        const cardTargets = Array.from(activePage.querySelectorAll('.lux-card, .famous-spotlight-card, .bklit-stat-card, #ubPhotoShowcase, #allDistrictsDirectory > div, #nationalTimelineGrid > button, #nationalTimelineGrid > div'));
        const ftEl = document.querySelector('.ub-ft');
        if (ftEl) cardTargets.push(ftEl);
        cardIo = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              cardIo.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: '0px 0px -54px 0px' });

        cardTargets.forEach((el, idx) => {
          el.setAttribute('data-ts-enter', '');
          el.style.setProperty('--enter-i', String(idx % 4));
          if (resetVisible) el.classList.remove('is-in');
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
            requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
          } else {
            cardIo.observe(el);
          }
        });

        // Lightweight scroll fallback to guarantee reveal inside any viewport/iframe
        if (!window.__ubRevealScrollBound) {
          window.__ubRevealScrollBound = true;
          let rvRaf = 0;
          const checkVisible = () => {
            rvRaf = 0;
            const vh = window.innerHeight || 800;
            const cutoff = vh * 0.94;
            document.querySelectorAll('[data-ts-enter]:not(.is-in)').forEach((el) => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.top < cutoff && r.bottom > 0) el.classList.add('is-in');
            });
            document.querySelectorAll('.mb-text-reveal:not(.is-shown)').forEach((el) => {
              const r = el.getBoundingClientRect();
              if (r.width > 0 && r.top < cutoff && r.bottom > 0) el.classList.add('is-shown');
            });
          };
          window.addEventListener('scroll', () => {
            if (!rvRaf) rvRaf = requestAnimationFrame(checkVisible);
          }, { passive: true });
        }

        // 3) Skip heavy per-scroll blur/reflow drift for 60fps butter-smooth scrolling (IntersectionObserver handles clean reveals)
        driftGrids = [];
      };

      const scheduleBind = (resetVisible = false) => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => bindActivePageAnimations(resetVisible), 70);
      };

      // Observe page switches (.active-page class changes) & dynamic subpage DOM renders
      const pageSections = Array.from(mainEl.querySelectorAll('[id^="page-"]'));
      const classMo = new MutationObserver(() => scheduleBind(true));
      pageSections.forEach((sec) => {
        classMo.observe(sec, { attributes: true, attributeFilter: ['class'] });
      });

      // Lightweight scroll progress only; no subtree MutationObserver thrashing or per-scroll drift
      const domMo = new MutationObserver(() => scheduleBind(false));
      domMo.observe(mainEl, { childList: true, subtree: false });
      window.addEventListener('resize', () => scheduleBind(false), { passive: true });
      setTimeout(() => bindActivePageAnimations(false), 100);
    })();

    // Top Scroll Progress Bar & Floating Back-to-Top Pill (zero-reflow cached scrollHeight)
    (function() {
      const bar = document.getElementById('ubScrollProgress');
      const topBtn = document.getElementById('ubBackTopBtn');
      let progTicking = false;
      let cachedMax = 1;
      let lastShowTop = false;
      const measureMax = () => {
        cachedMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      };
      const onScroll = () => {
        progTicking = false;
        const sy = window.scrollY;
        const ratio = Math.min(1, Math.max(0, sy / cachedMax));
        if (bar) bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
        if (topBtn) {
          const showTop = sy > 360;
          if (showTop !== lastShowTop) {
            lastShowTop = showTop;
            topBtn.classList.toggle('visible', showTop);
          }
        }
      };
      const reqProgress = () => {
        if (!progTicking) {
          progTicking = true;
          requestAnimationFrame(onScroll);
        }
      };
      measureMax();
      if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(() => { measureMax(); }).observe(document.body);
      }
      window.addEventListener('scroll', reqProgress, { passive: true });
      window.addEventListener('resize', () => { measureMax(); onScroll(); }, { passive: true });
      onScroll();
      topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    })();


