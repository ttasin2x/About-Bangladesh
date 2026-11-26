    function initMap() {
      if (typeof d3 === 'undefined') return;
      mapSvg = d3.select('#bdMapSvg');
      mapSvg.selectAll('*').remove();

      // Cartographic SVG Defs: soft elevation shadow + selected district gradient
      const defs = mapSvg.append('defs');
      const drop = defs.append('filter')
        .attr('id', 'bdMapShadow')
        .attr('x', '-12%').attr('y', '-8%').attr('width', '124%').attr('height', '118%');
      drop.append('feDropShadow')
        .attr('dx', 0).attr('dy', 7).attr('stdDeviation', 8)
        .attr('flood-color', '#06261B').attr('flood-opacity', 0.16);

      const selGrad = defs.append('linearGradient')
        .attr('id', 'bdSelectedGrad')
        .attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
      selGrad.append('stop').attr('offset', '0%').attr('stop-color', '#D94432');
      selGrad.append('stop').attr('offset', '100%').attr('stop-color', '#A62B1D');

      mapG = mapSvg.append('g').attr('class', 'map-root');

      mapZoom = d3.zoom()
        .scaleExtent([1, 6.5])
        .translateExtent([[-120, -120], [MAP_DATA.w + 120, MAP_DATA.h + 120]])
        .on('zoom', (event) => {
          mapG.attr('transform', event.transform);
          const k = event.transform.k;
          mapG.selectAll('.map-pill-group').attr('transform', d => {
            const [cx, cy] = DIVISION_CENTROIDS[d.id] || [300, 400];
            return `translate(${cx},${cy}) scale(${1 / Math.pow(k, 0.58)})`;
          });
          mapG.selectAll('.dist-label').style('font-size', `${Math.max(7.2, 10.5 / Math.pow(k, 0.45))}px`);
          mapG.selectAll('.map-selected-beacon').attr('transform', d => `translate(${d.c[0]},${d.c[1]}) scale(${1 / Math.pow(k, 0.55)})`);
        });

      mapSvg.call(mapZoom);
      renderMapLayers();
    }

    function renderMapLayers() {
      if (!mapG) return;
      mapG.selectAll('*').remove();

      const timelineDivs = state.activeTimelineId
        ? (NATIONAL_TIMELINE.find(t => t.id === state.activeTimelineId)?.divisions || null)
        : null;

      // Subtle Cartographic Bay of Bengal water label
      mapG.append('text')
        .attr('class', 'map-sea-label')
        .attr('x', 285)
        .attr('y', 832)
        .text(state.lang === 'bn' ? 'বঙ্গোপসাগর' : 'BAY OF BENGAL');

      // Elevated District Polygons Layer
      const polyGroup = mapG.append('g').attr('filter', 'url(#bdMapShadow)');

      const paths = polyGroup.selectAll('.bd-district')
        .data(MAP_FEATURES)
        .enter()
        .append('path')
        .attr('id', d => `map-dist-${d.distId || normName(d.n)}`)
        .attr('d', d => d.d)
        .attr('class', d => {
          let cls = 'bd-district ';
          if (d.distId && d.distId === state.selectedDistrictId) {
            cls += 'selected-district';
          } else if (state.mapLayer === 'divisions') {
            if (timelineDivs) cls += timelineDivs.includes(d.divId) ? 'div-mode-active' : 'div-mode-dimmed';
            else cls += d.divId === state.selectedDivisionId ? 'div-mode-active' : 'div-mode-inactive';
          } else {
            if (d.divId === state.selectedDivisionId) cls += 'dist-mode-in-div';
            else cls += 'dist-mode-other';
          }
          return cls;
        })
        .attr('fill', d => (d.distId && d.distId === state.selectedDistrictId) ? 'url(#bdSelectedGrad)' : (DIVISION_BY_ID[d.divId]?.color || '#0F7A53'))
        .on('mouseenter', function(event, d) {
          d3.select(this).raise();
          const dist = DISTRICT_BY_ID[d.distId];
          const div = DIVISION_BY_ID[d.divId];
          const hud = document.getElementById('mapLiveHud');
          if (state.mapLayer === 'divisions') {
            if (hud && div) {
              hud.textContent = state.lang === 'bn'
                ? `${div.nameBn} · ${toBnDigits(div.districts.length)} জেলা`
                : `${div.nameEn} · ${div.districts.length} districts`;
            }
            if (div) showDivisionTooltip(event, div, dist);
          } else {
            if (hud && dist) {
              hud.textContent = state.lang === 'bn'
                ? `${dist.nameBn} জেলা · ${dist.divisionNameBn}`
                : `${dist.nameEn} District · ${dist.divisionNameEn}`;
            }
            if (dist) showDistrictTooltip(event, dist);
          }
        })
        .on('mousemove', moveTooltip)
        .on('mouseleave', () => {
          hideTooltip();
          const hud = document.getElementById('mapLiveHud');
          if (hud) {
            if (state.mapLayer === 'divisions') {
              const selDiv = DIVISION_BY_ID[state.selectedDivisionId];
              hud.textContent = selDiv
                ? (state.lang === 'bn' ? `বিভাগ মোড: ${selDiv.nameBn}` : `Division mode: ${selDiv.nameEn}`)
                : (state.lang === 'bn' ? 'বিভাগ নির্বাচন করতে ক্লিক করুন' : 'Click to select a division');
            } else {
              const selDist = state.selectedDistrictId ? DISTRICT_BY_ID[state.selectedDistrictId] : null;
              hud.textContent = selDist
                ? (state.lang === 'bn' ? `জেলা মোড: ${selDist.nameBn} জেলা` : `District mode: ${selDist.nameEn}`)
                : (state.lang === 'bn' ? 'যেকোনো জেলায় ক্লিক করুন' : 'Click any district to select');
            }
          }
        })
        .on('click', (event, d) => {
          event.stopPropagation();
          state.activeTimelineId = null;
          if (state.mapLayer === 'divisions') {
            if (d.divId) selectDivision(d.divId, { autoZoom: true });
          } else {
            if (d.distId) focusDistrictFromCard(d.distId, false);
          }
        });

      // Sync live HUD text with active mode (Division vs District)
      const hudInit = document.getElementById('mapLiveHud');
      if (hudInit) {
        if (state.mapLayer === 'divisions') {
          const selDiv = DIVISION_BY_ID[state.selectedDivisionId];
          hudInit.textContent = selDiv
            ? (state.lang === 'bn' ? `বিভাগ মোড: ${selDiv.nameBn}` : `Division mode: ${selDiv.nameEn}`)
            : (state.lang === 'bn' ? 'বিভাগ নির্বাচন করতে ক্লিক করুন' : 'Click to select a division');
        } else {
          const selDist = state.selectedDistrictId ? DISTRICT_BY_ID[state.selectedDistrictId] : null;
          hudInit.textContent = selDist
            ? (state.lang === 'bn' ? `জেলা মোড: ${selDist.nameBn} জেলা` : `District mode: ${selDist.nameEn}`)
            : (state.lang === 'bn' ? 'জেলা মোড: যেকোনো জেলায় ক্লিক করুন' : 'District mode: Click any district');
        }
      }

      // Raise selected district so its crisp border is never obscured
      paths.filter(d => d.distId && d.distId === state.selectedDistrictId).raise();

      // District Labels
      if (state.showDistLabels || state.mapLayer === 'districts') {
        mapG.selectAll('.dist-label')
          .data(MAP_FEATURES)
          .enter()
          .append('text')
          .attr('class', d => 'dist-label' + (d.distId === state.selectedDistrictId ? ' active-dist-label' : ''))
          .attr('x', d => d.c[0])
          .attr('y', d => d.c[1])
          .style('font-size', d => d.distId === state.selectedDistrictId ? '11.5px' : '9.8px')
          .style('opacity', d => {
            if (d.distId === state.selectedDistrictId) return 1;
            return state.showDistLabels ? 0.94 : (d.divId === state.selectedDivisionId ? 0.96 : 0.36);
          })
          .text(d => {
            const dist = DISTRICT_BY_ID[d.distId];
            return dist ? (state.lang === 'bn' ? dist.nameBn : dist.nameEn) : d.n;
          });
      }

      // Animated Pulsing Beacon Ring on Selected District
      if (state.selectedDistrictId) {
        const selFeat = MAP_FEATURES.find(f => f.distId === state.selectedDistrictId);
        if (selFeat && selFeat.c) {
          const beacon = mapG.selectAll('.map-selected-beacon')
            .data([selFeat])
            .enter()
            .append('g')
            .attr('class', 'map-selected-beacon')
            .attr('transform', d => `translate(${d.c[0]},${d.c[1]})`);
          beacon.append('circle').attr('class', 'beacon-ring').attr('r', 12);
          beacon.append('circle').attr('class', 'beacon-core').attr('r', 4.5);
        }
      }

      // Clickable Floating Division Pills (in Divisions mode)
      if (state.mapLayer === 'divisions' && !state.showDistLabels) {
        const groups = mapG.selectAll('.map-pill-group')
          .data(DIVISIONS)
          .enter()
          .append('g')
          .attr('class', 'map-pill-group')
          .attr('transform', d => {
            const [cx, cy] = DIVISION_CENTROIDS[d.id] || [300, 400];
            return `translate(${cx},${cy})`;
          })
          .style('cursor', 'pointer')
          .on('click', (event, d) => {
            event.stopPropagation();
            state.activeTimelineId = null;
            selectDivision(d.id, { autoZoom: true });
          });

        groups.each(function(d) {
          const g = d3.select(this);
          const isActive = d.id === state.selectedDivisionId;
          const label = state.lang === 'bn' ? d.shortBn : d.shortEn;
          const pillW = Math.max(72, label.length * 11 + 24);
          const pillH = 28;

          g.append('rect')
            .attr('class', `map-pill-bg${isActive ? ' active-pill' : ''}`)
            .attr('x', -pillW / 2).attr('y', -pillH / 2)
            .attr('width', pillW).attr('height', pillH).attr('rx', 14);

          g.append('text')
            .attr('class', `map-pill-text${isActive ? ' active-pill' : ''}`)
            .attr('x', 0).attr('y', 1).style('font-size', '13.5px').text(label);
        });
      }
    }
    function zoomToDivision(divId) {
      if (!mapSvg || !mapZoom) return;
      const nodes = mapG.selectAll('.bd-district').filter(d => d.divId === divId).nodes();
      if (!nodes.length) return;
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodes.forEach(n => {
        const b = n.getBBox();
        if (b.x < minX) minX = b.x;
        if (b.y < minY) minY = b.y;
        if (b.x + b.width > maxX) maxX = b.x + b.width;
        if (b.y + b.height > maxY) maxY = b.y + b.height;
      });
      zoomToBBox(minX, minY, maxX - minX, maxY - minY, 2.2);
    }

    function zoomToDistrict(distId) {
      if (!mapSvg || !mapZoom) return;
      const node = document.getElementById(`map-dist-${distId}`);
      if (!node) return;
      const b = node.getBBox();
      zoomToBBox(b.x, b.y, b.width, b.height, 3.5);
    }

    function zoomToBBox(x, y, w, h, maxScale) {
      const cx = x + w / 2, cy = y + h / 2;
      const scale = Math.max(1, Math.min(maxScale, 0.70 / Math.max(w / MAP_DATA.w, h / MAP_DATA.h)));
      const tx = MAP_DATA.w / 2 - scale * cx, ty = MAP_DATA.h / 2 - scale * cy;
      mapSvg.transition().duration(460).call(mapZoom.transform, d3.zoomIdentity.translate(tx, ty).scale(scale));
    }

    function resetMapZoom() {
      if (!mapSvg || !mapZoom) return;
      mapSvg.transition().duration(400).call(mapZoom.transform, d3.zoomIdentity);
    }

    function showDivisionTooltip(event, div, hoverDist) {
      const tip = document.getElementById('mapTooltip');
      const isBn = state.lang === 'bn';
      tip.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-1">
          <span class="font-heading font-bold text-sm text-white">${isBn ? div.nameBn : div.nameEn}</span>
          <span class="text-xs font-mono px-1.5 py-0.5 rounded-full bg-white/15 text-white">${fmtYear(div.est, state.lang)}</span>
        </div>
        ${hoverDist ? `<div class="text-xs text-[#9be0c5] font-semibold mb-1">${isBn ? hoverDist.nameBn + ' জেলা' : hoverDist.nameEn + ' District'} (${fmtYear(hoverDist.est, state.lang)})</div>` : ''}
        <div class="text-xs text-[#dce5e1] space-y-0.5">
          <div>${isBn ? 'জেলা' : 'Districts'}: <strong class="text-white">${fmtNum(div.districts.length, state.lang)}</strong> · ${isBn ? 'উপজেলা' : 'Upazilas'}: <strong class="text-white">${fmtNum(div.upazilas, state.lang)}</strong></div>
          <div>${isBn ? 'আয়তন' : 'Area'}: <strong class="text-white">${fmtNum(div.area, state.lang)} ${isBn ? 'বর্গ কি.মি.' : 'km²'}</strong></div>
        </div>
      `;
      tip.classList.add('visible');
      moveTooltip(event);
    }

    function showDistrictTooltip(event, dist) {
      const tip = document.getElementById('mapTooltip');
      const isBn = state.lang === 'bn';
      tip.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-1">
          <span class="font-heading font-bold text-sm text-white">${isBn ? dist.nameBn + ' জেলা' : dist.nameEn + ' District'}</span>
          <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-[#B83B2A] text-white">${fmtYear(dist.est, state.lang)}</span>
        </div>
        <div class="text-xs text-[#9be0c5] font-semibold mb-1">${isBn ? dist.eraBn : dist.eraEn}</div>
        <div class="text-xs text-[#dce5e1] leading-snug">${isBn ? dist.originBn : dist.originEn}</div>
      `;
      tip.classList.add('visible');
      moveTooltip(event);
    }

    function moveTooltip(event) {
      const container = document.getElementById('mapContainer');
      const tip = document.getElementById('mapTooltip');
      const rect = container.getBoundingClientRect();
      let x = event.clientX - rect.left + 14;
      let y = event.clientY - rect.top - 12;
      if (x + 265 > rect.width) x = event.clientX - rect.left - 270;
      if (y + 135 > rect.height) y = rect.height - 145;
      if (y < 8) y = 8;
      tip.style.left = `${Math.max(8, x)}px`;
      tip.style.top = `${y}px`;
    }

    function hideTooltip() { document.getElementById('mapTooltip').classList.remove('visible'); }

    function selectDivision(divId, opts = {}) {
      if (state.currentPage !== 'districts') switchPage('districts', false);
    requestAnimationFrame(() => updateDockBubble(false));
    setTimeout(() => updateDockBubble(false), 180);
      state.selectedDivisionId = divId;
      if (!opts.keepDistrict) state.selectedDistrictId = null;
      state.districtFilterText = '';
      renderAll();
      if (opts.autoZoom) setTimeout(() => zoomToDivision(divId), 40);
    }

    function focusDistrictFromCard(distId, scrollToWorkspace = false) {
      const dist = DISTRICT_BY_ID[distId];
      if (!dist) return;
      if (state.currentPage !== 'districts') switchPage('districts', false);
    requestAnimationFrame(() => updateDockBubble(false));
    setTimeout(() => updateDockBubble(false), 180);
      state.selectedDivisionId = dist.divisionId;
      state.selectedDistrictId = dist.id;
      state.activeTab = 'districts';
      state.mapLayer = 'districts';
      state.activeTimelineId = null;
      renderAll();
      setTimeout(() => {
        zoomToDistrict(dist.id);
        if (scrollToWorkspace) {
          document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 40);
    }

