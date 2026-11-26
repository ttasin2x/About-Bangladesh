
    // PAGE 5: DOCUMENTARY ANIMATED MAP TOUR ENGINE (DOTTED ARROWS + CAMERA)
    // =========================================================================
    const ANIM_ORDER = ['dhaka', 'chattogram', 'barishal', 'khulna', 'rajshahi', 'rangpur', 'mymensingh', 'sylhet'];
    const animState = {
      initialized: false,
      playing: false,
      voiceEnabled: true,
      mode: 'deep', // 'div' | 'deep' (includes district-by-district showcase inside each division)
      speed: 1,
      divIdx: 0,
      distIdx: -1, // -1 = showing division overview, >= 0 = showing district inside division
      timer: null,
      svg: null,
      rootG: null,
      mapLayerG: null,
      routeLayerG: null,
      markerLayerG: null,
      zoom: null
    };

    function initAnimMapIfNeeded() {
      if (animState.initialized || typeof d3 === 'undefined') {
        renderAnimStaticCopy();
        renderAnimStepper();
        return;
      }
      animState.initialized = true;
      animState.svg = d3.select('#animMapSvg');
      animState.svg.selectAll('*').remove();

      // Define crisp arrowhead marker (flat, zero glow)
      const defs = animState.svg.append('defs');
      defs.append('marker')
        .attr('id', 'animArrowHead')
        .attr('viewBox', '0 0 12 12')
        .attr('refX', 9)
        .attr('refY', 6)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M 1 1.5 L 10.5 6 L 1 10.5 L 3.4 6 Z')
        .attr('fill', '#121714');

      defs.append('marker')
        .attr('id', 'animDistArrow')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 8)
        .attr('refY', 5)
        .attr('markerWidth', 6.5)
        .attr('markerHeight', 6.5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 1 1.5 L 9 5 L 1 8.5 Z')
        .attr('fill', '#B83B2A');

      // Subtle Cartographic Grid behind the map (studio aesthetic, zero glow)
      const bgGrid = animState.svg.append('g').attr('class', 'anim-bg-grid').style('pointer-events', 'none');
      for (let gx = 60; gx < MAP_DATA.w; gx += 75) {
        bgGrid.append('line').attr('x1', gx).attr('y1', 0).attr('x2', gx).attr('y2', MAP_DATA.h)
          .attr('stroke', 'rgba(15, 122, 83, 0.065)').attr('stroke-width', 1).attr('stroke-dasharray', '3 6');
      }
      for (let gy = 70; gy < MAP_DATA.h; gy += 80) {
        bgGrid.append('line').attr('x1', 0).attr('y1', gy).attr('x2', MAP_DATA.w).attr('y2', gy)
          .attr('stroke', 'rgba(15, 122, 83, 0.065)').attr('stroke-width', 1).attr('stroke-dasharray', '3 6');
      }

      animState.rootG = animState.svg.append('g').attr('class', 'anim-root');
      // Soft flat silhouette lift shadow directly beneath Bangladesh
      const shadowG = animState.rootG.append('g').attr('transform', 'translate(4, 6)').style('pointer-events', 'none');
      shadowG.selectAll('path')
        .data(MAP_FEATURES)
        .enter()
        .append('path')
        .attr('d', d => d.d)
        .attr('fill', 'rgba(15, 122, 83, 0.11)');

      animState.mapLayerG = animState.rootG.append('g').attr('class', 'anim-map-layer');
      animState.routeLayerG = animState.rootG.append('g').attr('class', 'anim-route-layer');
      animState.markerLayerG = animState.rootG.append('g').attr('class', 'anim-marker-layer');

      animState.zoom = d3.zoom()
        .scaleExtent([1, 5.5])
        .on('zoom', (event) => {
          animState.rootG.attr('transform', event.transform);
        });

      // Draw all 64 district polygons once
      animState.mapLayerG.selectAll('path')
        .data(MAP_FEATURES)
        .enter()
        .append('path')
        .attr('id', d => `anim-poly-${d.distId || normName(d.n)}`)
        .attr('class', 'anim-dist-path')
        .attr('d', d => d.d)
        .attr('fill', '#D9E5DD')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 0.75);

      renderAnimStaticCopy();
      goToAnimStop(0, -1, false);
    }


    let cachedVoices = [];
    let speechUnlocked = false;
    let audioCtx = null;

    function loadSpeechVoices() {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const v = window.speechSynthesis.getVoices();
      if (v && v.length) cachedVoices = v;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      loadSpeechVoices();
      window.speechSynthesis.onvoiceschanged = loadSpeechVoices;
    }

    function unlockAudioAndSpeech() {
      try {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
          const AC = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AC();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      } catch (e) {}
      try {
        if ('speechSynthesis' in window) {
          loadSpeechVoices();
          window.speechSynthesis.resume();
          if (!speechUnlocked) {
            speechUnlocked = true;
            const prime = new SpeechSynthesisUtterance(' ');
            prime.volume = 0;
            window.speechSynthesis.speak(prime);
          }
        }
      } catch (e) {}
    }

    function playSoftArrivalChime(isDist = false) {
      if (!animState.voiceEnabled || state.currentPage !== 'animation') return;
      try {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
          const AC = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AC();
        }
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const now = audioCtx.currentTime;
        const notes = isDist ? [587.33, 783.99] : [440, 554.37, 659.25];
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.065);
          gain.gain.setValueAtTime(0.0001, now + i * 0.065);
          gain.gain.exponentialRampToValueAtTime(0.045, now + i * 0.065 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.065 + 0.24);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + i * 0.065);
          osc.stop(now + i * 0.065 + 0.26);
        });
      } catch (e) {}
    }

    function stopAnimVoice() {
      clearTimeout(animState.speakTimer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    }

    function speakPlaceNameOnly(bnText, enText, isDist = false) {
      if (!animState.voiceEnabled || state.currentPage !== 'animation') return;
      playSoftArrivalChime(isDist);
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      try {
        clearTimeout(animState.speakTimer);
        const wasSpeaking = window.speechSynthesis.speaking || window.speechSynthesis.pending;
        if (wasSpeaking) window.speechSynthesis.cancel();

        const doSpeak = () => {
          loadSpeechVoices();
          const isBn = state.lang === 'bn';
          const bnVoice = cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('bn-bd'))
            || cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('bn'));
          const enVoice = cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('en-us'))
            || cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith('en'));

          // Smart fallback: if Bengali mode but OS has NO Bengali TTS installed, speak clean English/phonetic place name so user ALWAYS hears crisp voice!
          let textToSpeak = isBn ? bnText : enText;
          let targetLang = isBn ? 'bn-BD' : 'en-US';
          let chosenVoice = isBn ? bnVoice : enVoice;

          if (isBn && !bnVoice && cachedVoices.length > 0 && enText) {
            textToSpeak = enText;
            targetLang = enVoice?.lang || 'en-US';
            chosenVoice = enVoice || cachedVoices[0];
          }

          if (!textToSpeak) return;
          const utter = new SpeechSynthesisUtterance(textToSpeak);
          utter.lang = targetLang;
          utter.rate = animState.speed > 1 ? 1.05 : 0.94;
          utter.pitch = 1.0;
          utter.volume = 1.0;
          if (chosenVoice) utter.voice = chosenVoice;

          window.speechSynthesis.resume();
          window.speechSynthesis.speak(utter);
        };

        if (wasSpeaking) {
          animState.speakTimer = setTimeout(doSpeak, 55);
        } else {
          doSpeak();
        }
      } catch (e) {}
    }

    function updateAnimVoiceButton() {
      const isBn = state.lang === 'bn';
      const btn = document.getElementById('btnAnimVoice');
      const lbl = document.getElementById('animVoiceLabel');
      const icon = document.getElementById('animVoiceIcon');
      if (!btn || !lbl || !icon) return;
      if (animState.voiceEnabled) {
        btn.className = 'h-9 px-3.5 rounded-full bg-[#DCEFE5] border border-[#0F7A53] text-[#0F6B4F] text-xs font-bold inline-flex items-center gap-1.5 transition';
        lbl.textContent = isBn ? 'ভয়েস চালু' : 'Voice On';
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>';
      } else {
        btn.className = 'h-9 px-3.5 rounded-full bg-[#F5F7F6] border border-[#E4E8E6] text-[#5D6762] text-xs font-bold inline-flex items-center gap-1.5 transition hover:border-[#0F6B4F]';
        lbl.textContent = isBn ? 'ভয়েস বন্ধ' : 'Voice Off';
        icon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
      }
    }

    function renderAnimStaticCopy() {
      const isBn = state.lang === 'bn';
      const setT = (id, bn, en) => { const el = document.getElementById(id); if (el) el.textContent = isBn ? bn : en; };
      setT('animEyebrow', 'পৃষ্ঠা ৫ · ইন্টারেক্টিভ ম্যাপ অ্যানিমেশন', 'PAGE 5 · ANIMATED MAP JOURNEY');
      setT('animPageTitle', 'মানচিত্র অ্যানিমেশন: এক বিভাগ থেকে আরেক বিভাগে ইতিহাস ভ্রমণ', 'Animated Map Tour: Division-by-Division Journey Across Bangladesh');
      setT('btnAnimModeDiv', 'শুধু বিভাগ', 'Divisions Only');
      setT('btnAnimModeDeep', 'বিভাগ + জেলা', 'Divisions + Districts');
      setT('animLegRoute', 'ভ্রমণ পথ', 'Route');
      setT('animLegDiv', 'বিভাগ', 'Division');
      setT('animLegDist', 'জেলা', 'District');
      updateAnimPlayButton();
      updateAnimVoiceButton();
    }

    function updateAnimPlayButton() {
      const isBn = state.lang === 'bn';
      const lbl = document.getElementById('animPlayLabel');
      const icon = document.getElementById('animPlayIcon');
      if (!lbl || !icon) return;
      if (animState.playing) {
        lbl.textContent = isBn ? 'থামান' : 'Pause';
        icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect>';
      } else {
        lbl.textContent = isBn ? 'চালু করুন' : 'Play Tour';
        icon.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
      }
    }

    function renderAnimStepper() {
      const bar = document.getElementById('animStepperBar');
      if (!bar) return;
      const isBn = state.lang === 'bn';
      bar.innerHTML = ANIM_ORDER.map((divId, idx) => {
        const div = DIVISION_BY_ID[divId];
        const isCurrent = idx === animState.divIdx;
        const isVisited = idx < animState.divIdx;
        return `
          <button type="button" data-anim-step="${idx}"
            class="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition ${
              isCurrent ? 'bg-[#0B4D36] text-white border-[#0F7A53]' :
              (isVisited ? 'bg-[#DCEFE5] text-[#0F6B4F] border-[#CBE4D7]' : 'bg-[#F5F7F6] text-[#5D6762] border-[#E4E8E6] hover:border-[#0F6B4F]')
            }">
            <span class="font-mono text-[10px]">${fmtNum(idx + 1, state.lang)}</span>
            <span>${isBn ? div.shortBn : div.shortEn}</span>
          </button>
        `;
      }).join('');
      bar.querySelectorAll('button[data-anim-step]').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetIdx = Number(btn.dataset.animStep);
          goToAnimStop(targetIdx, -1, true);
        });
      });
    }

    function makeCurvePath(p1, p2) {
      const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      const dist = Math.hypot(dx, dy) || 1;
      const mx = (p1[0] + p2[0]) / 2;
      const my = (p1[1] + p2[1]) / 2;
      const bend = Math.min(55, dist * 0.24);
      const nx = -dy / dist, ny = dx / dist;
      const cx = mx + nx * bend, cy = my + ny * bend;
      return `M ${p1[0]} ${p1[1]} Q ${cx} ${cy} ${p2[0]} ${p2[1]}`;
    }

    let animCameraView = [MAP_DATA.w / 2, MAP_DATA.h / 2, MAP_DATA.h];

    function glideCameraToView(targetView, duration = 1250) {
      if (!animState.svg || !animState.rootG) return;
      const startView = animCameraView;
      const interp = d3.interpolateZoom(startView, targetView);
      animState.svg.interrupt('cam');
      animState.svg.transition('cam')
        .duration(Math.max(550, Math.round(duration / animState.speed)))
        .ease(d3.easeCubicInOut)
        .tween('cameraGlide', () => t => {
          const v = interp(t);
          animCameraView = v;
          const k = MAP_DATA.h / v[2];
          // Slight upward framing offset (-34px) so floating bottom info card never covers the focused division/district
          const tx = MAP_DATA.w / 2 - v[0] * k;
          const ty = (MAP_DATA.h * 0.44) - v[1] * k;
          animState.rootG.attr('transform', `translate(${tx},${ty}) scale(${k})`);
        });
    }

    function animZoomToDivision(divId, duration = 1250) {
      if (!animState.mapLayerG) return;
      const nodes = animState.mapLayerG.selectAll('path').filter(d => d.divId === divId).nodes();
      if (!nodes.length) return;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(n => {
        const b = n.getBBox();
        if (b.x < minX) minX = b.x;
        if (b.y < minY) minY = b.y;
        if (b.x + b.width > maxX) maxX = b.x + b.width;
        if (b.y + b.height > maxY) maxY = b.y + b.height;
      });
      const w = maxX - minX, h = maxY - minY;
      const cx = minX + w / 2, cy = minY + h / 2;
      const viewSpan = Math.max(260, Math.min(MAP_DATA.h * 0.72, Math.max(w * 2.15, h * 1.95)));
      glideCameraToView([cx, cy, viewSpan], duration);
    }

    function animZoomToDistrict(distId, duration = 950) {
      const node = document.getElementById(`anim-poly-${distId}`);
      if (!node) return;
      const b = node.getBBox();
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      const viewSpan = Math.max(210, Math.min(360, Math.max(b.width * 3.4, b.height * 3.1)));
      glideCameraToView([cx, cy, viewSpan], duration);
    }

    function showAnimFloatCard(div, distObj, delayMs = 0) {
      const card = document.getElementById('animFloatCard');
      if (!card) return;
      const isBn = state.lang === 'bn';
      card.classList.remove('is-shown');
      card.classList.add('is-hidden');

      clearTimeout(animState.floatTimer);
      animState.floatTimer = setTimeout(() => {
        const stepDurSec = ((distObj ? 3.8 : 4.8) / animState.speed).toFixed(2);
        if (distObj) {
          card.innerHTML = `
            <div class="space-y-1.5">
              <div class="flex items-center justify-between gap-2 stagger-1">
                <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDF0EE] text-[#B83B2A]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#B83B2A]"></span>
                  <span>${isBn ? div.shortBn + ' বিভাগ · জেলা' : div.shortEn + ' · District'}</span>
                </span>
                <span class="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#121714] text-white">${isBn ? 'প্রতিষ্ঠা ' + fmtYear(distObj.est, 'bn') : 'Est. ' + distObj.est}</span>
              </div>
              <div class="flex items-baseline justify-between gap-2 stagger-2">
                <h4 class="font-heading text-lg sm:text-xl font-bold text-[#16211C] leading-tight">${isBn ? distObj.nameBn + ' জেলা' : distObj.nameEn + ' District'}</h4>
                <button type="button" data-replay-voice class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF0EE] text-[#B83B2A] text-[11px] font-bold hover:bg-[#B83B2A] hover:text-white transition shrink-0">${animState.voiceEnabled ? '<span class="voice-bars"><span></span><span></span><span></span></span>' : ''}<span>${isBn ? 'শুনুন' : 'Speak'}</span></button>
              </div>
              <p class="text-xs sm:text-[13px] text-[#1D2621] leading-[1.6] line-clamp-2 stagger-3">
                <strong class="text-[#B83B2A]">${isBn ? 'বিখ্যাত:' : 'Famous for:'}</strong> ${isBn ? distObj.famousBn : distObj.famousEn}
              </p>
              ${animState.playing ? `<div class="w-full h-1 bg-[#E5EAE6] rounded-full overflow-hidden mt-1.5"><div class="h-full bg-[#B83B2A] rounded-full float-progress-bar" style="--step-dur:${stepDurSec}s"></div></div>` : ''}
            </div>
          `;
        } else {
          const deep = DIVISION_DEEP[div.id];
          card.innerHTML = `
            <div class="space-y-1.5">
              <div class="flex items-center justify-between gap-2 stagger-1">
                <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCEFE5] text-[#0F6B4F]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0B4D36]"></span>
                  <span>${isBn ? `ধাপ ${fmtNum(animState.divIdx + 1, 'bn')} / ৮ · ${deep.janapadaBn}` : `Stop ${animState.divIdx + 1} / 8 · ${deep.janapadaEn}`}</span>
                </span>
                <span class="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0B4D36] text-white">${fmtNum(div.districts.length, state.lang)} ${isBn ? 'জেলা' : 'Districts'}</span>
              </div>
              <div class="flex items-baseline justify-between gap-2 stagger-2">
                <h4 class="font-heading text-lg sm:text-xl font-bold text-[#16211C] leading-tight">${isBn ? div.nameBn : div.nameEn}</h4>
                <button type="button" data-replay-voice class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCEFE5] text-[#0F6B4F] text-[11px] font-bold hover:bg-[#0B4D36] hover:text-white transition shrink-0">${animState.voiceEnabled ? '<span class="voice-bars"><span></span><span></span><span></span></span>' : ''}<span>${isBn ? 'শুনুন' : 'Speak'}</span></button>
              </div>
              <p class="text-xs sm:text-[13px] text-[#2B352F] leading-relaxed line-clamp-2 stagger-3">${isBn ? div.taglineBn : div.taglineEn}</p>
              ${animState.playing ? `<div class="w-full h-1 bg-[#E5EAE6] rounded-full overflow-hidden mt-1.5"><div class="h-full bg-[#0B4D36] rounded-full float-progress-bar" style="--step-dur:${stepDurSec}s"></div></div>` : ''}
            </div>
          `;
        }
        const replayBtn = card.querySelector('[data-replay-voice]');
        if (replayBtn) {
          replayBtn.addEventListener('click', () => {
            unlockAudioAndSpeech();
            const bnSp = distObj ? `${distObj.nameBn} জেলা` : div.nameBn;
            const enSp = distObj ? `${distObj.nameEn} District` : div.nameEn;
            speakPlaceNameOnly(bnSp, enSp, Boolean(distObj));
          });
        }
        requestAnimationFrame(() => {
          card.classList.remove('is-hidden');
          card.classList.add('is-shown');
          const bnSp = distObj ? `${distObj.nameBn} জেলা` : div.nameBn;
          const enSp = distObj ? `${distObj.nameEn} District` : div.nameEn;
          speakPlaceNameOnly(bnSp, enSp, Boolean(distObj));
        });
      }, delayMs);
    }

    function goToAnimStop(divIdx, distIdx = -1, drawIncomingRoute = true) {
      const prevDivId = ANIM_ORDER[animState.divIdx];
      animState.divIdx = (divIdx + ANIM_ORDER.length) % ANIM_ORDER.length;
      animState.distIdx = distIdx;

      const divId = ANIM_ORDER[animState.divIdx];
      const div = DIVISION_BY_ID[divId];
      const isBn = state.lang === 'bn';

      // Update Live Status
      const statusEl = document.getElementById('animLiveStatus');
      if (statusEl) {
        if (distIdx >= 0 && div.districts[distIdx]) {
          const dObj = div.districts[distIdx];
          statusEl.textContent = isBn
            ? `ধাপ ${fmtNum(animState.divIdx + 1, 'bn')} / ৮ · ${div.shortBn} → ${dObj.nameBn} জেলা`
            : `Step ${animState.divIdx + 1} / 8 · ${div.shortEn} → ${dObj.nameEn} District`;
        } else {
          statusEl.textContent = isBn
            ? `ধাপ ${fmtNum(animState.divIdx + 1, 'bn')} / ৮ · ${div.nameBn}`
            : `Step ${animState.divIdx + 1} / 8 · ${div.nameEn}`;
        }
      }

      renderAnimStepper();
      renderAnimStoryCards();

      if (!animState.initialized || typeof d3 === 'undefined') return;

      const activeDistId = (distIdx >= 0 && div.districts[distIdx]) ? div.districts[distIdx].id : null;

      // Color polygons: active division in Forest Green, active district in Crimson, visited divisions in soft sage
      const visitedSet = new Set(ANIM_ORDER.slice(0, animState.divIdx));
      animState.mapLayerG.selectAll('path')
        .attr('fill', d => {
          if (activeDistId && d.distId === activeDistId) return '#B83B2A';
          if (d.divId === divId) return '#0F7A53';
          if (visitedSet.has(d.divId)) return '#9ACBB6';
          return '#DCE5DF';
        })
        .attr('fill-opacity', d => {
          if (activeDistId && d.distId === activeDistId) return 1;
          if (d.divId === divId) return activeDistId ? 0.65 : 0.95;
          if (visitedSet.has(d.divId)) return 0.72;
          return 0.55;
        })
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', d => (activeDistId && d.distId === activeDistId) ? 1.8 : 0.85);

      // Draw completed route history up to previous division
      animState.routeLayerG.selectAll('*').remove();
      animState.markerLayerG.selectAll('*').remove();

      for (let i = 0; i < animState.divIdx - (drawIncomingRoute ? 1 : 0); i++) {
        const pA = DIVISION_CENTROIDS[ANIM_ORDER[i]];
        const pB = DIVISION_CENTROIDS[ANIM_ORDER[i + 1]];
        if (pA && pB) {
          animState.routeLayerG.append('path')
            .attr('class', 'anim-route-done')
            .attr('d', makeCurvePath(pA, pB));
        }
      }

      // Draw visited division dots
      ANIM_ORDER.slice(0, animState.divIdx).forEach(vId => {
        const c = DIVISION_CENTROIDS[vId];
        if (!c) return;
        animState.markerLayerG.append('circle').attr('cx', c[0]).attr('cy', c[1]).attr('r', 4.5).attr('fill', '#0F7A53').attr('stroke', '#FFFFFF').attr('stroke-width', 1.5);
      });

      const currCenter = DIVISION_CENTROIDS[divId];

      // Butter-smooth parabolic camera glide + curved dotted arrow + oriented pointer
      if (drawIncomingRoute && distIdx === -1 && prevDivId && prevDivId !== divId) {
        const fromCenter = DIVISION_CENTROIDS[prevDivId];
        if (fromCenter && currCenter) {
          // Single continuous cinematic parabolic camera glide from previous division to target division!
          animZoomToDivision(divId, 1450);

          const curveD = makeCurvePath(fromCenter, currCenter);
          const ribbonPath = animState.routeLayerG.append('path')
            .attr('class', 'anim-route-ribbon')
            .attr('d', curveD);

          const routePath = animState.routeLayerG.append('path')
            .attr('class', 'anim-route-active')
            .attr('d', curveD)
            .attr('marker-end', 'url(#animArrowHead)');

          const totalLen = routePath.node().getTotalLength();
          const flightMs = Math.round(1200 / animState.speed);

          ribbonPath
            .attr('stroke-dasharray', `${totalLen} ${totalLen}`)
            .attr('stroke-dashoffset', totalLen)
            .transition()
            .duration(flightMs)
            .ease(d3.easePolyInOut.exponent(2.2))
            .attr('stroke-dashoffset', 0);

          routePath
            .attr('stroke-dasharray', `${totalLen} ${totalLen}`)
            .attr('stroke-dashoffset', totalLen)
            .transition()
            .duration(flightMs)
            .ease(d3.easePolyInOut.exponent(2.2))
            .attr('stroke-dashoffset', 0)
            .on('end', () => {
              routePath.attr('stroke-dasharray', '7 6').classed('flowing', true);
              drawArrivalMarker(currCenter, div, null);
            });

          // Oriented chevron traveler gliding smoothly along tangent of curve
          const traveler = animState.markerLayerG.append('g');
          traveler.append('circle').attr('r', 8).attr('fill', '#121714').attr('stroke', '#FFFFFF').attr('stroke-width', 2);
          traveler.append('path').attr('d', 'M -2.5 -3 L 3.5 0 L -2.5 3 Z').attr('fill', '#FFFFFF');

          traveler.transition()
            .duration(flightMs)
            .ease(d3.easePolyInOut.exponent(2.2))
            .attrTween('transform', () => t => {
              const p = routePath.node().getPointAtLength(t * totalLen);
              const pNext = routePath.node().getPointAtLength(Math.min(totalLen, t * totalLen + 2));
              const angle = Math.atan2(pNext.y - p.y, pNext.x - p.x) * (180 / Math.PI);
              return `translate(${p.x},${p.y}) rotate(${angle})`;
            })
            .on('end', () => traveler.remove());

          // Float up the on-map info card right as the arrow arrives!
          showAnimFloatCard(div, null, Math.round(flightMs * 0.72));
        }
      } else if (activeDistId) {
        const distObj = DISTRICT_BY_ID[activeDistId];
        const feat = MAP_FEATURES.find(f => f.distId === activeDistId);
        if (currCenter && feat) {
          const distCenter = feat.c;
          const link = animState.routeLayerG.append('path')
            .attr('class', 'anim-dist-link')
            .attr('d', makeCurvePath(currCenter, distCenter))
            .attr('marker-end', 'url(#animDistArrow)');
          const len = link.node().getTotalLength();
          const linkMs = Math.round(620 / animState.speed);
          link
            .attr('stroke-dasharray', `${len} ${len}`)
            .attr('stroke-dashoffset', len)
            .transition()
            .duration(linkMs)
            .ease(d3.easeCubicOut)
            .attr('stroke-dashoffset', 0)
            .on('end', () => link.attr('stroke-dasharray', '4 5').classed('flowing', true));

          drawArrivalMarker(distCenter, div, distObj);
        }
        animZoomToDistrict(activeDistId, 950);
        showAnimFloatCard(div, distObj, Math.round(280 / animState.speed));
      } else {
        if (currCenter) drawArrivalMarker(currCenter, div, null);
        animZoomToDivision(divId, 1050);
        showAnimFloatCard(div, null, 180);
      }

      scheduleNextAnimStep();
    }

    function drawArrivalMarker(center, div, distObj) {
      if (!animState.markerLayerG || !center) return;
      const isBn = state.lang === 'bn';
      const isDist = Boolean(distObj);

      // Double staggered concentric flat ripple rings
      animState.markerLayerG.append('circle')
        .attr('cx', center[0]).attr('cy', center[1]).attr('r', 6)
        .attr('class', isDist ? 'anim-pulse-ring-dist' : 'anim-pulse-ring');
      animState.markerLayerG.append('circle')
        .attr('cx', center[0]).attr('cy', center[1]).attr('r', 6)
        .attr('class', isDist ? 'anim-pulse-ring-dist' : 'anim-pulse-ring')
        .style('animation-delay', '0.6s');

      // Core pin dot
      animState.markerLayerG.append('circle')
        .attr('cx', center[0]).attr('cy', center[1]).attr('r', isDist ? 5.5 : 6.5)
        .attr('fill', isDist ? '#B83B2A' : '#121714')
        .attr('stroke', '#FFFFFF').attr('stroke-width', 2);

      // Floating pill label
      const labelText = isDist
        ? (isBn ? distObj.nameBn + ' জেলা' : distObj.nameEn)
        : (isBn ? div.nameBn : div.nameEn);
      const pillW = Math.max(82, labelText.length * 8.6 + 22);
      const outerG = animState.markerLayerG.append('g')
        .attr('transform', `translate(${center[0]},${center[1] - 26})`);
      const g = outerG.append('g').attr('class', 'anim-pin-bob');

      g.append('rect')
        .attr('x', -pillW / 2).attr('y', -13)
        .attr('width', pillW).attr('height', 26).attr('rx', 13)
        .attr('fill', isDist ? '#B83B2A' : '#121714');

      g.append('text')
        .attr('text-anchor', 'middle').attr('y', 4)
        .style('font-family', "'HindSiliguri', 'NotoSansBengali', sans-serif")
        .style('font-size', '12px').style('font-weight', '700').style('fill', '#FFFFFF')
        .text(labelText);
    }

    function renderAnimStoryCards() {
      const divId = ANIM_ORDER[animState.divIdx];
      const div = DIVISION_BY_ID[divId];
      const deep = DIVISION_DEEP[divId];
      const isBn = state.lang === 'bn';

      const divCard = document.getElementById('animDivisionCard');
      if (divCard) {
        divCard.innerHTML = `
          <div class="story-enter space-y-3">
            <div class="flex items-center justify-between gap-2 stagger-1">
              <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? `ধাপ ${fmtNum(animState.divIdx + 1, 'bn')} / ৮` : `Stop ${animState.divIdx + 1} / 8`} · ${div.iso}</span>
              <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#121714] text-white">${isBn ? `প্রতিষ্ঠা ${div.estBn}` : `Est. ${div.est}`}</span>
            </div>
            <div class="stagger-2">
              <h2 class="font-heading text-2xl font-bold text-[#16211C]">${isBn ? div.nameBn : div.nameEn}</h2>
              <div class="text-xs font-semibold text-[#0F6B4F] mt-0.5">${isBn ? deep.janapadaBn : deep.janapadaEn}</div>
            </div>
            <p class="text-sm text-[#2B352F] leading-[1.8] stagger-3">${isBn ? div.introBn : div.introEn}</p>
            <div class="flex flex-wrap gap-1.5 pt-1 stagger-4">
              <span class="micro-pill">${fmtNum(div.districts.length, state.lang)} ${isBn ? 'জেলা' : 'Districts'}</span>
              <span class="micro-pill">${fmtNum(div.upazilas, state.lang)} ${isBn ? 'উপজেলা' : 'Upazilas'}</span>
              <span class="micro-pill">${fmtNum(div.area, state.lang)} ${isBn ? 'ব.কি.মি.' : 'km²'}</span>
            </div>
          </div>
        `;
      }

      const distCard = document.getElementById('animDistrictCard');
      if (distCard) {
        const activeDist = (animState.distIdx >= 0 && div.districts[animState.distIdx])
          ? DISTRICT_BY_ID[div.districts[animState.distIdx].id]
          : null;

        distCard.innerHTML = `
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-heading text-base font-bold text-[#16211C]">
                ${isBn ? `${div.shortBn} বিভাগের জেলাসমূহ (${fmtNum(div.districts.length, 'bn')}টি)` : `Districts in ${div.shortEn} (${div.districts.length})`}
              </h3>
              <span class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'যেকোনো জেলায় ক্লিক করুন' : 'Tap any district'}</span>
            </div>

            <div class="flex flex-wrap gap-1.5">
              ${div.districts.map((d, idx) => {
                const isCur = idx === animState.distIdx;
                return `
                  <button type="button" data-anim-dist-idx="${idx}"
                    class="px-3 py-1 rounded-full text-xs font-bold border transition ${
                      isCur ? 'bg-[#B83B2A] text-white border-[#B83B2A]' : 'bg-[#F5F7F6] text-[#16211C] border-[#E4E8E6] hover:border-[#0F6B4F]'
                    }">
                    ${isBn ? d.nameBn : d.nameEn}
                  </button>
                `;
              }).join('')}
            </div>

            ${activeDist ? `
              <div class="story-enter rounded-[20px] bg-[#FDF6F5] border border-[#ECCFC9] p-4 space-y-2">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-heading text-lg font-bold text-[#16211C]">${isBn ? activeDist.nameBn + ' জেলা' : activeDist.nameEn + ' District'}</span>
                  <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#B83B2A] text-white">${fmtYear(activeDist.est, state.lang)}</span>
                </div>
                <div class="text-xs font-bold text-[#B83B2A]">${isBn ? activeDist.eraBn : activeDist.eraEn}</div>
                <div class="rounded-xl bg-white border border-[#ECCFC9] px-3 py-2 text-xs sm:text-[13px] text-[#16211C] leading-[1.65]">
                  <strong class="text-[#B83B2A]">${isBn ? 'কিসের জন্য বিখ্যাত:' : 'Famous for:'}</strong> ${isBn ? activeDist.famousBn : activeDist.famousEn}
                </div>
                <p class="text-sm text-[#2B352F] leading-[1.8]">${isBn ? activeDist.storyBn : activeDist.storyEn}</p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span class="micro-pill bg-white">${fmtNum(activeDist.area, state.lang)} ${isBn ? 'ব.কি.মি.' : 'km²'}</span>
                  <span class="micro-pill bg-white">${isBn ? 'জনসংখ্যা ' : 'Pop '}${fmtNum(activeDist.pop, state.lang)}</span>
                  <span class="micro-pill bg-white">${fmtNum(activeDist.upazilas, state.lang)} ${isBn ? 'উপজেলা' : 'Upazilas'}</span>
                </div>
              </div>
            ` : `
              <div class="rounded-[20px] bg-[#F3F5F0] p-4 text-xs text-[#5D6762] leading-relaxed">
                ${isBn
                  ? 'বিভাগের পরিচিতি শেষ হলেই অ্যানিমেশন স্বয়ংক্রিয়ভাবে একে একে এই বিভাগের জেলাগুলোতে যাবে—অথবা ওপরের যেকোনো জেলায় ক্লিক করে সরাসরি দেখতে পারেন।'
                  : 'After the division overview, the animation automatically steps through its districts—or tap any district pill above to inspect it immediately.'}
              </div>
            `}
          </div>
        `;

        distCard.querySelectorAll('button[data-anim-dist-idx]').forEach(btn => {
          btn.addEventListener('click', () => {
            goToAnimStop(animState.divIdx, Number(btn.dataset.animDistIdx), false);
          });
        });
      }
    }

    function stepAnimForward() {
      const div = DIVISION_BY_ID[ANIM_ORDER[animState.divIdx]];
      // In deep mode, showcase up to 3 representative districts (or all if <= 4) smoothly before flying to the next division
      const maxShowcase = animState.mode === 'deep' ? div.districts.length : 0;
      if (animState.distIdx + 1 < maxShowcase) {
        goToAnimStop(animState.divIdx, animState.distIdx + 1, false);
      } else {
        goToAnimStop((animState.divIdx + 1) % ANIM_ORDER.length, -1, true);
      }
    }

    function stepAnimBackward() {
      if (animState.distIdx > 0) {
        goToAnimStop(animState.divIdx, animState.distIdx - 1, false);
      } else if (animState.distIdx === 0) {
        goToAnimStop(animState.divIdx, -1, false);
      } else {
        goToAnimStop((animState.divIdx - 1 + ANIM_ORDER.length) % ANIM_ORDER.length, -1, true);
      }
    }

    function scheduleNextAnimStep() {
      clearTimeout(animState.timer);
      if (!animState.playing) return;
      const baseDelay = animState.distIdx === -1 ? 4900 : 3900;
      animState.timer = setTimeout(() => {
        if (animState.playing && state.currentPage === 'animation') stepAnimForward();
      }, Math.round(baseDelay / animState.speed));
    }

    function startAnimTour() {
      animState.playing = true;
      updateAnimPlayButton();
      scheduleNextAnimStep();
    }

    function pauseAnimTour() {
      animState.playing = false;
      clearTimeout(animState.timer);
      clearTimeout(animState.floatTimer);
      stopAnimVoice();
      updateAnimPlayButton();
    }

