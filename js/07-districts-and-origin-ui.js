    function renderStaticCopy() {
      const isBn = state.lang === 'bn';
      const activeDiv = DIVISION_BY_ID[state.selectedDivisionId];
      document.documentElement.lang = isBn ? 'bn' : 'en';

      document.getElementById('btnLangBn').className = isBn ? 'px-3 h-8 text-xs font-bold rounded-full bg-[#0B4D36] text-white' : 'px-3 h-8 text-xs font-bold rounded-full text-[#5D6762] hover:text-[#16211C]';
      document.getElementById('btnLangEn').className = !isBn ? 'px-3 h-8 text-xs font-bold rounded-full bg-[#0B4D36] text-white' : 'px-3 h-8 text-xs font-bold rounded-full text-[#5D6762] hover:text-[#16211C]';

      document.getElementById('topLocationLabel').textContent = isBn ? 'নির্বাচিত অঞ্চল' : 'Selected Region';
      document.getElementById('topLocationValue').textContent = isBn ? `${activeDiv.nameBn}, বাংলাদেশ` : `${activeDiv.nameEn}, Bangladesh`;
      document.getElementById('globalSearchInput').placeholder = isBn ? 'বিভাগ বা ৬৪ জেলার যেকোনো নাম খুঁজুন…' : 'Search any division or 64 districts…';
      document.getElementById('btnNextDivLabel').textContent = isBn ? 'পরবর্তী বিভাগ' : 'Next Division';

      const navLabels = {
        districts: isBn ? 'বিভাগ ও জেলা' : 'Divisions & Districts',
        origin: isBn ? 'বাংলাদেশের উৎপত্তি' : 'Origin',
        ethnic: isBn ? 'ক্ষুদ্র নৃগোষ্ঠী' : 'Ethnic Groups',
        religion: isBn ? 'ধর্ম ও পরিসংখ্যান' : 'Religions',
        animation: isBn ? 'অ্যানিমেশন' : 'Animation',
        bangladesh: isBn ? 'বাংলাদেশ' : 'Bangladesh',
        world: isBn ? 'বনাম বিশ্ব' : 'vs World'
      };
      const dockLabels = {
        districts: isBn ? 'বিভাগ' : 'Map',
        origin: isBn ? 'উৎপত্তি' : 'Origin',
        ethnic: isBn ? 'নৃগোষ্ঠী' : 'Ethnic',
        religion: isBn ? 'ধর্ম' : 'Religions',
        animation: isBn ? 'ভ্রমণ' : 'Tour',
        bangladesh: isBn ? 'বাংলাদেশ' : 'BD Info',
        world: isBn ? 'বিশ্ব' : 'World'
      };
      document.querySelectorAll('.top-page-btn').forEach(btn => { btn.textContent = navLabels[btn.dataset.pageTarget]; });
      document.querySelectorAll('[data-dock-lbl]').forEach(sp => { sp.textContent = dockLabels[sp.dataset.dockLbl]; });

      // Page 1 copy
      document.getElementById('page1Title').textContent = isBn ? 'বাংলাদেশের ৮ বিভাগ ও ৬৪ জেলা' : '8 Divisions & 64 Districts of Bangladesh';
      document.getElementById('page1Subtitle').textContent = isBn
        ? 'মানচিত্রে বা যেকোনো জেলায় ক্লিক করে শুরু থেকে তার পূর্ণাঙ্গ ইতিহাস ও গঠনের বিবরণ দেখুন।'
        : 'Click any division or district on the map to explore its complete history from origin to formation.';
      document.getElementById('metaCountLine').textContent = isBn ? '৮ বিভাগ · ৬৪ জেলা' : '8 Divisions · 64 Districts';

      document.getElementById('mapHeading').textContent = isBn ? 'বাংলাদেশের মানচিত্র' : 'Map of Bangladesh';
      document.getElementById('btnLayerDivisions').textContent = isBn ? '৮ বিভাগ' : '8 Divisions';
      document.getElementById('btnLayerDistricts').textContent = isBn ? '৬৪ জেলা' : '64 Districts';
      document.getElementById('btnToggleLabels').textContent = isBn ? 'জেলার নাম' : 'Labels';

      const selDist = state.selectedDistrictId ? DISTRICT_BY_ID[state.selectedDistrictId] : null;
      document.getElementById('mapSelectedBadge').textContent = selDist
        ? (isBn ? `${selDist.nameBn} জেলা · ${fmtYear(selDist.est, 'bn')}` : `${selDist.nameEn} · ${selDist.est}`)
        : (isBn ? `${activeDiv.shortBn} · ${fmtNum(activeDiv.districts.length, 'bn')} জেলা` : `${activeDiv.shortEn} · ${activeDiv.districts.length} Districts`);

      document.getElementById('tabOverview').textContent = isBn ? 'ইতিহাস ও পরিচিতি' : 'History';
      document.getElementById('tabFormation').textContent = isBn ? 'গঠন ও বিবর্তন' : 'Formation';
      document.getElementById('tabDistricts').textContent = isBn
        ? `জেলাসমূহ (${fmtNum(activeDiv.districts.length, 'bn')})`
        : `Districts (${activeDiv.districts.length})`;

      document.getElementById('dirEyebrow').textContent = isBn ? '৬৪ জেলার সূচিপত্র' : '64 DISTRICTS';
      document.getElementById('dirHeading').textContent = isBn ? 'বিভাগ অনুযায়ী ৬৪টি জেলার তালিকা' : 'All 64 Districts by Division';
      document.getElementById('dirSub').textContent = isBn ? 'যেকোনো জেলায় ক্লিক করলে মানচিত্রে জেলাটি চিহ্নিত হবে এবং শুরু থেকে তার পূর্ণাঙ্গ ইতিহাস খুলবে।' : 'Click any district to highlight it on the map and read its complete history.';
      document.getElementById('timelineEyebrow').textContent = isBn ? 'প্রশাসনিক বিবর্তন' : 'TIMELINE';
      document.getElementById('timelineHeading').textContent = isBn ? '১৬৬৬ থেকে বর্তমান: কীভাবে গড়ে উঠল ৮টি বিভাগ ও ৬৪টি জেলা' : '1666 to Present: How 8 Divisions & 64 Districts Formed';
      document.getElementById('timelineSub').textContent = isBn ? 'যেকোনো সময়কালে ক্লিক করলে মানচিত্রে সংশ্লিষ্ট বিভাগগুলো হাইলাইট হবে।' : 'Click any era to highlight relevant divisions on the map.';

      // Page 2 copy
      document.getElementById('originHeroTag').textContent = isBn ? 'পৃষ্ঠা ২ · উৎপত্তি ও নৃতত্ত্ব' : 'PAGE 2 · ORIGINS & ANTHROPOLOGY';
      document.getElementById('originHeroTitle').textContent = isBn ? 'বাংলাদেশের উৎপত্তি, বাঙালির পূর্বপুরুষ ও ১৯৪৭ বিভাজন' : 'Origin of Bangladesh, Bengali Ancestors & 1947 Partition';
      document.getElementById('originHeroDesc').textContent = isBn
        ? 'অস্ট্রো-এশিয়াটিক, দ্রাবিড়, ইন্দো-আর্য ও তিব্বতি-বর্মণ জনগোষ্ঠীর সংমিশ্রণে বাঙালি জাতির বিকাশ, ছয়টি প্রাচীন জনপদ, ১৯৪৭ সালের র‍্যাডক্লিফ রেখা এবং ১৯৭১ সালের স্বাধীন বাংলাদেশের অভ্যুদয়।'
        : 'How Austroasiatic, Dravidian, Indo-Aryan, and Tibeto-Burman streams shaped the Bengali people, six ancient janapadas, the 1947 Radcliffe Line, and 1971 independence.';
      document.getElementById('originTabAncestry').textContent = isBn ? 'বাঙালির পূর্বপুরুষ' : 'Bengali Ancestry';
      document.getElementById('originTabJanapada').textContent = isBn ? 'প্রাচীন জনপদ' : 'Ancient Janapadas';
      document.getElementById('originTab1947').textContent = isBn ? '১৯৪৭ ভারত বিভাজন' : '1947 Partition';
      document.getElementById('originTab4Groups').textContent = isBn ? '৪টি প্রধান নৃগোষ্ঠী' : '4 Main Ethnic Groups';

      // Page 3 copy
      document.getElementById('ethnicHeroTag').textContent = isBn ? 'পৃষ্ঠা ৩ · জনশুমারি ২০২২' : 'PAGE 3 · BBS CENSUS 2022';
      document.getElementById('ethnicHeroTitle').textContent = isBn ? 'বাংলাদেশের ৫০টি ক্ষুদ্র নৃগোষ্ঠী: পরিসংখ্যান ও উৎপত্তি' : '50 Ethnic Communities of Bangladesh: Stats & Origins';
      document.getElementById('ethnicHeroDesc').textContent = isBn
        ? 'বাংলাদেশে গেজেটভুক্ত ৫০টি ক্ষুদ্র নৃগোষ্ঠীর মোট জনসংখ্যা ১৬,৫০,১৫৯ জন (মোট জনসংখ্যার প্রায় ১%), যার ৬০.০৪% চট্টগ্রাম বিভাগে বাস করে।'
        : 'Bangladesh has 50 gazetted ethnic communities totalling 1,650,159 people (~1%), with 60.04% living in Chattogram Division.';
      document.getElementById('ethKpi1').textContent = isBn ? '৫০টি স্বীকৃত নৃগোষ্ঠী' : '50 Communities';
      document.getElementById('ethKpi2').textContent = isBn ? 'মোট ১৬,৫০,১৫৯ জন' : '1,650,159 Total';
      document.getElementById('ethKpi3').textContent = isBn ? 'শীর্ষ: রাঙামাটি (৫৭.৫৮%)' : 'Top: Rangamati (57.58%)';
      document.getElementById('ethKpi4').textContent = isBn ? 'চট্টগ্রাম বিভাগে ৬০.০৪%' : '60.04% in Chattogram';
      document.getElementById('divEthEyebrow').textContent = isBn ? 'বিভাগভিত্তিক বিন্যাস' : 'BY DIVISION';
      document.getElementById('divEthHeading').textContent = isBn ? '৮টি বিভাগে বসবাসরত ক্ষুদ্র নৃগোষ্ঠী ও তাঁদের আগমনের ইতিহাস' : 'Ethnic Communities Across All 8 Divisions';

      // Page 4 copy
      document.getElementById('relHeroTag').textContent = isBn ? 'পৃষ্ঠা ৪ · বাংলাদেশ পরিসংখ্যান ব্যুরো (২০২২ শুমারি)' : 'PAGE 4 · BBS POPULATION CENSUS 2022';
      document.getElementById('relHeroTitle').textContent = isBn ? 'বাংলাদেশের ধর্মসমূহ ও জনসংখ্যার পরিসংখ্যান' : 'Religions of Bangladesh & Census Statistics';
      document.getElementById('relHeroDesc').textContent = isBn
        ? 'বাংলাদেশ পরিসংখ্যান ব্যুরোর (বিবিএস) ২০২২ সালের জনশুমারি ও গৃহগণনা অনুযায়ী দেশের প্রতিটি ধর্মের শতকরা হার, মোট জনসংখ্যা, ঐতিহাসিক ধারা ও আঞ্চলিক পরিচিতি।'
        : 'Official BBS 2022 Population & Housing Census breakdown of religions in Bangladesh—interactive charts, historical trends, and objective community profiles.';
      document.getElementById('relPill1').textContent = isBn ? 'মোট ১৬.৫২ কোটি' : '165.16M Total';
      document.getElementById('relPill2').textContent = isBn ? 'ইসলাম ৯১.০৪%' : 'Islam 91.04%';
      document.getElementById('relPill3').textContent = isBn ? 'হিন্দু ৭.৯৫%' : 'Hindu 7.95%';
      document.getElementById('relPill4').textContent = isBn ? 'বৌদ্ধ ০.৬১%' : 'Buddhist 0.61%';
      document.getElementById('relPill5').textContent = isBn ? 'খ্রিস্টান ০.৩০%' : 'Christian 0.30%';
      document.getElementById('relPill6').textContent = isBn ? 'অন্যান্য ০.১২%' : 'Others 0.12%';
      document.getElementById('relHeroCount').textContent = isBn ? '৫টি শ্রেণি' : '5 Categories';

      document.getElementById('donutEyebrow').textContent = isBn ? 'ডোনাট চার্ট · ২০২২' : 'DONUT CHART · 2022';
      document.getElementById('donutTitle').textContent = isBn ? 'ধর্মভিত্তিক শতকরা হার' : 'Share by Religion (%)';
      document.getElementById('donutHint').textContent = isBn ? 'যেকোনো অংশে ক্লিক বা হোভার করে বিস্তারিত দেখুন' : 'Hover or click any slice or row to inspect';
      document.getElementById('barEyebrow').textContent = isBn ? 'তুলনামূলক চার্ট' : 'COMPARISON CHART';
      document.getElementById('barTitle').textContent = isBn ? 'সংখ্যালঘু জনসংখ্যা ও ঐতিহাসিক ধারা' : 'Minority Counts & Historical Trend';
      document.getElementById('relChartModeMinority').textContent = isBn ? 'সংখ্যালঘু (২০২২)' : 'Minorities (2022)';
      document.getElementById('relChartModeTrend').textContent = isBn ? '১৯৭১–২০২২ ধারা' : '1971–2022 Trend';
      document.getElementById('relChartModeDiv').textContent = isBn ? 'বিভাগভিত্তিক হিন্দু %' : 'Hindu % by Div.';
      document.getElementById('relCardsEyebrow').textContent = isBn ? 'বিস্তারিত পরিচিতি' : 'DETAILED PROFILES';
      document.getElementById('relCardsTitle').textContent = isBn ? 'বাংলাদেশের প্রতিটি ধর্মের ইতিহাস, জনসংখ্যা ও আঞ্চলিক বিন্যাস' : 'History, Population & Regional Presence of Each Religion';

      document.getElementById('footerLeft').textContent = isBn
        ? 'বঙ্গভূমি — বাংলাদেশের মানচিত্র, উৎপত্তি, নৃগোষ্ঠী ও ধর্ম'
        : 'Bongobhumi — Map, Origins, Ethnic Minorities & Religions of Bangladesh';
      document.getElementById('footerRight').textContent = isBn
        ? 'তথ্যসূত্র: বাংলাদেশ পরিসংখ্যান ব্যুরো (২০২২ শুমারি), বাংলাপিডিয়া ও টিবিএস নিউজ'
        : 'Sources: Bangladesh Bureau of Statistics (2022 Census), Banglapedia & TBS News';

      document.getElementById('btnLayerDivisions').className = state.mapLayer === 'divisions'
        ? 'px-3 py-1 text-xs font-bold rounded-full bg-[#0B4D36] text-white'
        : 'px-3 py-1 text-xs font-bold rounded-full text-[#5D6762] hover:text-[#16211C]';
      document.getElementById('btnLayerDistricts').className = state.mapLayer === 'districts'
        ? 'px-3 py-1 text-xs font-bold rounded-full bg-[#0B4D36] text-white'
        : 'px-3 py-1 text-xs font-bold rounded-full text-[#5D6762] hover:text-[#16211C]';
      document.getElementById('btnToggleLabels').className = state.showDistLabels
        ? 'px-3 py-1.5 text-xs font-bold rounded-full border border-[#0F7A53] bg-[#DCEFE5] text-[#0F6B4F]'
        : 'px-3 py-1.5 text-xs font-bold rounded-full border border-[#E4E8E6] bg-[#F5F7F6] text-[#16211C] hover:border-[#0F6B4F]';
    }

    function renderFeaturedBanner() {
      const div = DIVISION_BY_ID[state.selectedDivisionId];
      const deep = DIVISION_DEEP[div.id];
      const isBn = state.lang === 'bn';
      document.getElementById('featuredBannerContent').innerHTML = `
        <!-- Top Rounded Green Visual Frame (exact reference card top-frame geometry) -->
        <div class="rounded-[22px] hero-topo text-white p-5 sm:p-7 relative overflow-hidden">
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="px-3 py-1 rounded-full bg-white/90 text-[#16211C] text-xs font-bold">
              ${isBn ? 'নির্বাচিত বিভাগ' : 'Featured Division'} · ${div.iso}
            </span>
            <button id="btnBannerZoom" type="button" class="w-9 h-9 rounded-full bg-white/90 text-[#16211C] hover:bg-white flex items-center justify-center transition" title="${isBn ? 'মানচিত্রে দেখুন' : 'View on Map'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg>
            </button>
          </div>
          <div class="max-w-3xl">
            <div class="text-xs font-semibold text-white/80 mb-1">${isBn ? deep.janapadaBn : deep.janapadaEn}</div>
            <p class="text-sm sm:text-base text-white/95 leading-relaxed">${isBn ? div.taglineBn : div.taglineEn}</p>
          </div>
        </div>

        <!-- Bottom Info Strip (Title Left + Black Pill CTA Right + Micro-Stat Pills + Bold Metric) -->
        <div class="pt-4 px-1.5 sm:px-2 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="font-heading text-2xl sm:text-3xl font-bold text-[#16211C] leading-tight">
                ${isBn ? div.nameBn : div.nameEn}
              </h2>
              <div class="text-xs text-[#5D6762] mt-0.5">${isBn ? 'সদরদপ্তর:' : 'Headquarters:'} <strong class="text-[#16211C]">${isBn ? div.capitalBn : div.capitalEn}</strong></div>
            </div>
            <div class="flex items-center gap-2">
              <button id="btnBannerOpenDistricts" type="button" class="lux-pill-btn px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>
                <span>${isBn ? 'জেলাসমূহ দেখুন' : 'Explore Districts'}</span>
              </button>
            </div>
          </div>

          <!-- Horizontal Micro-Stat Pills (matching 3 Beds | 2 Baths | 1500 Sqft | +03) -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="micro-pill">${fmtNum(div.districts.length, state.lang)} ${isBn ? 'জেলা' : 'Districts'}</span>
              <span class="micro-pill">${fmtNum(div.upazilas, state.lang)} ${isBn ? 'উপজেলা' : 'Upazilas'}</span>
              <span class="micro-pill">${fmtNum(div.area, state.lang)} ${isBn ? 'ব.কি.মি.' : 'km²'}</span>
              <span class="micro-pill">${isBn ? 'জনসংখ্যা ' : 'Pop '}${fmtNum(div.population, state.lang)}</span>
            </div>
            <div class="font-heading text-xl sm:text-2xl font-extrabold text-[#16211C]">
              ${isBn ? `প্রতিষ্ঠা ${div.estBn}` : `Est. ${div.est}`}
            </div>
          </div>
        </div>
      `;

      document.getElementById('btnBannerZoom')?.addEventListener('click', () => {
        zoomToDivision(div.id);
        document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      document.getElementById('btnBannerOpenDistricts')?.addEventListener('click', () => {
        state.activeTab = 'districts';
        renderDetailTabs();
        renderDetailBody();
        document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    function renderDivisionPills() {
      const container = document.getElementById('divisionPills');
      const isBn = state.lang === 'bn';
      container.innerHTML = DIVISIONS.map(div => {
        const active = div.id === state.selectedDivisionId;
        return `
          <button type="button" data-div-id="${div.id}"
            class="lux-chip shrink-0 h-9 px-4 text-xs sm:text-sm font-bold flex items-center gap-1.5 ${active ? 'active' : 'text-[#16211C]'}">
            <span>${isBn ? div.shortBn : div.shortEn}</span>
            <span class="text-[11px] opacity-75">(${fmtNum(div.districts.length, state.lang)})</span>
          </button>
        `;
      }).join('');
      container.querySelectorAll('button[data-div-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.activeTimelineId = null;
          selectDivision(btn.dataset.divId, { autoZoom: true });
        });
      });
    }

    function renderDistrictSpotlight() {
      const box = document.getElementById('districtSpotlight');
      if (!state.selectedDistrictId || !DISTRICT_BY_ID[state.selectedDistrictId]) {
        box.classList.add('hidden');
        box.innerHTML = '';
        return;
      }
      const dist = DISTRICT_BY_ID[state.selectedDistrictId];
      const isBn = state.lang === 'bn';
      box.classList.remove('hidden');
      box.innerHTML = `
        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-[#B83B2A] bg-white border border-[#E8CEC9] px-3 py-1 rounded-full">
              <span>${isBn ? 'নির্বাচিত জেলার পূর্ণাঙ্গ ইতিহাস' : 'SELECTED DISTRICT FULL HISTORY'}</span>
            </span>
            <button id="btnCloseDistrictSpotlight" type="button" class="lux-pill-btn px-3 py-1 text-xs font-bold">
              ${isBn ? 'বন্ধ করুন ✕' : 'Close ✕'}
            </button>
          </div>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="font-heading text-2xl font-bold text-[#16211C]">
              ${isBn ? dist.nameBn + ' জেলা' : dist.nameEn + ' District'}
              <span class="text-sm font-medium text-[#5D6762] ml-1">${isBn ? dist.nameEn : dist.nameBn}</span>
            </h3>
            <span class="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0B4D36] text-white">${isBn ? 'প্রতিষ্ঠা: ' + fmtYear(dist.est, 'bn') : 'Est. ' + dist.est}</span>
          </div>
          <div class="text-xs font-bold text-[#0F6B4F]">${isBn ? dist.eraBn : dist.eraEn}</div>
          <p class="text-[15px] leading-[1.85] text-[#1D2621] bg-white rounded-2xl p-4 border border-[#DCE5DD]">
            ${isBn ? dist.storyBn : dist.storyEn}
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <span class="micro-pill bg-white border border-[#DCE5DD]">${isBn ? 'আয়তন:' : 'Area:'} ${fmtNum(dist.area, state.lang)} ${isBn ? 'ব.কি.মি.' : 'km²'}</span>
            <span class="micro-pill bg-white border border-[#DCE5DD]">${isBn ? 'জনসংখ্যা:' : 'Pop:'} ${fmtNum(dist.pop, state.lang)}</span>
            <span class="micro-pill bg-white border border-[#DCE5DD]">${isBn ? 'উপজেলা:' : 'Upazilas:'} ${fmtNum(dist.upazilas, state.lang)}</span>
          </div>
        </div>
      `;
      document.getElementById('btnCloseDistrictSpotlight')?.addEventListener('click', () => {
        state.selectedDistrictId = null;
        renderAll();
      });
    }

    function renderDetailHeader() {
      const div = DIVISION_BY_ID[state.selectedDivisionId];
      const deep = DIVISION_DEEP[div.id];
      const isBn = state.lang === 'bn';
      document.getElementById('detailHeader').innerHTML = `
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold text-[#5D6762] mb-1">
              <span class="w-2.5 h-2.5 rounded-full" style="background:${div.color}"></span>
              <span>${div.iso} · ${isBn ? 'সদরদপ্তর:' : 'Capital:'} <strong class="text-[#16211C]">${isBn ? div.capitalBn : div.capitalEn}</strong></span>
            </div>
            <h2 class="font-heading text-2xl font-bold text-[#16211C] leading-tight">${isBn ? div.nameBn : div.nameEn}</h2>
            <p class="text-xs font-semibold text-[#0F6B4F] mt-1">${isBn ? deep.janapadaBn : deep.janapadaEn}</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-[#DCEFE5] text-[#0F6B4F] text-xs font-bold">
            ${isBn ? `প্রতিষ্ঠা: ${div.estBn}` : `Est. ${div.est}`}
          </span>
        </div>
      `;
    }

    function renderDetailTabs() {
      ['overview', 'formation', 'districts'].forEach(tab => {
        const btn = document.getElementById(`tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
        if (btn) btn.classList.toggle('active', state.activeTab === tab);
      });
    }

    function renderDetailBody() {
      const div = DIVISION_BY_ID[state.selectedDivisionId];
      const deep = DIVISION_DEEP[div.id];
      const isBn = state.lang === 'bn';
      const body = document.getElementById('detailBody');

      if (state.activeTab === 'overview') {
        const heritageList = isBn ? div.heritageBn : div.heritageEn;
        body.innerHTML = `
          <div class="space-y-5">
            <div>
              <h3 class="font-heading text-base font-bold text-[#16211C] mb-2">${isBn ? 'ঐতিহাসিক ও ভৌগোলিক পরিচিতি' : 'Historical & Geographic Overview'}</h3>
              <p class="text-[15.5px] leading-[1.85] text-[#2B352F]">${isBn ? div.introBn : div.introEn}</p>
            </div>
            <div class="rounded-[20px] bg-[#F1F4EE] p-4 sm:p-5 border border-[#E4E8E6]">
              <h4 class="text-xs font-bold uppercase tracking-wider text-[#0F6B4F] mb-2.5">${isBn ? 'উল্লেখযোগ্য ঐতিহাসিক বৈশিষ্ট্য' : 'Key Historical Highlights'}</h4>
              <ul class="space-y-2">
                ${heritageList.map(item => `
                  <li class="flex items-start gap-2.5 text-sm text-[#16211C]">
                    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#0B4D36] shrink-0"></span>
                    <span class="leading-relaxed">${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-[#5D6762] mb-2.5">${isBn ? `অন্তর্ভুক্ত জেলাসমূহ (${fmtNum(div.districts.length, 'bn')}টি) — ক্লিক করে ইতিহাস পড়ুন` : `Districts (${div.districts.length}) — Click for full history`}</h4>
              <div class="flex flex-wrap gap-2">
                ${div.districts.map(dist => `
                  <button type="button" data-quick-dist="${dist.id}" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E6EFEA] text-[#16211C] hover:bg-[#121714] hover:text-white transition">
                    ${isBn ? dist.nameBn : dist.nameEn} <span class="opacity-70">(${fmtYear(dist.est, state.lang)})</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        body.querySelectorAll('button[data-quick-dist]').forEach(btn => {
          btn.addEventListener('click', () => focusDistrictFromCard(btn.dataset.quickDist));
        });
      } else if (state.activeTab === 'formation') {
        const steps = isBn ? div.formationStepsBn : div.formationStepsEn;
        body.innerHTML = `
          <div class="space-y-4">
            <div class="rounded-[20px] bg-[#E3F2EA] p-4 sm:p-5 border border-[#CBE4D7]">
              <div class="text-xs font-bold uppercase tracking-wider text-[#0F6B4F] mb-1.5">${isBn ? '১৯৪৭ দেশভাগ ও এই বিভাগের সীমানা' : '1947 Partition & Division Boundary'}</div>
              <p class="text-sm text-[#16211C] leading-relaxed">${isBn ? deep.partition1947Bn : deep.partition1947En}</p>
            </div>
            <div class="space-y-3">
              ${steps.map(step => `
                <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4">
                  <span class="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#121714] text-white mb-2">${step.year}</span>
                  <h4 class="font-heading text-base font-bold text-[#16211C]">${step.title}</h4>
                  <p class="text-sm text-[#2B352F] mt-1 leading-relaxed">${step.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else {
        const filtered = div.districts.filter(dist => {
          const y = Number(dist.est);
          if (state.districtEraFilter === 'pre1971' && y > 1971) return false;
          if (state.districtEraFilter === '1978-1983' && (y < 1978 || y > 1983)) return false;
          if (state.districtEraFilter === '1984' && y !== 1984) return false;
          if (state.districtFilterText.trim()) {
            const q = state.districtFilterText.trim().toLowerCase();
            return dist.nameBn.toLowerCase().includes(q) || dist.nameEn.toLowerCase().includes(q) || dist.est.includes(q);
          }
          return true;
        });
        const eras = [
          { id: 'all', bn: 'সব জেলা', en: 'All' },
          { id: 'pre1971', bn: '১৯৭১-এর আগে', en: 'Pre-1971' },
          { id: '1978-1983', bn: '১৯৭৮–৮৩', en: '1978–83' },
          { id: '1984', bn: '১৯৮৪ পুনর্গঠন', en: '1984 Reform' }
        ];
        body.innerHTML = `
          <div class="space-y-3.5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5">
                ${eras.map(era => `
                  <button type="button" data-era="${era.id}" class="px-3 py-1 rounded-full text-xs font-bold ${state.districtEraFilter === era.id ? 'bg-[#0B4D36] text-white' : 'bg-[#E6EFEA] text-[#16211C] hover:bg-[#DCEFE5]'}">
                    ${isBn ? era.bn : era.en}
                  </button>
                `).join('')}
              </div>
              <input id="districtLocalFilter" type="text" value="${state.districtFilterText.replace(/"/g, '&quot;')}" placeholder="${isBn ? 'জেলা ফিল্টার…' : 'Filter…'}"
                class="w-36 sm:w-44 px-3.5 py-1.5 text-xs font-medium rounded-full bg-[#F5F7F6] border border-[#E4E8E6] text-[#16211C] placeholder-[#7C867F] focus:bg-white focus:outline-none focus:border-[#0F7A53]" />
            </div>
            <div class="space-y-3">
              ${filtered.length === 0 ? `
                <div class="text-center py-8 text-sm text-[#5D6762] bg-[#F3F5F0] rounded-[20px]">${isBn ? 'এই ফিল্টারে কোনো জেলা পাওয়া যায়নি।' : 'No districts match.'}</div>
              ` : filtered.map(dist => {
                const full = DISTRICT_BY_ID[dist.id];
                const isSelected = dist.id === state.selectedDistrictId;
                return `
                  <div id="dist-card-${dist.id}" data-dist-card="${dist.id}" class="cursor-pointer rounded-[22px] p-4 sm:p-5 border transition ${isSelected ? 'bg-[#FDF4F2] border-[#B83B2A]' : 'bg-white border-[#E4E8E6] hover:border-[#0F6B4F]'}">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <h4 class="font-heading text-lg font-bold text-[#16211C] flex flex-wrap items-center gap-2">
                          <span>${isBn ? full.nameBn + ' জেলা' : full.nameEn + ' District'}</span>
                          <span class="text-xs font-medium text-[#5D6762]">${isBn ? full.nameEn : full.nameBn}</span>
                        </h4>
                        <div class="text-xs font-bold text-[#0F6B4F] mt-0.5">${isBn ? full.eraBn : full.eraEn}</div>
                      </div>
                      <span class="shrink-0 text-xs font-mono font-bold px-3 py-1 rounded-full ${Number(full.est) < 1971 ? 'bg-[#121714] text-white' : 'bg-[#E6EFEA] text-[#16211C]'}">
                        ${fmtYear(full.est, state.lang)}
                      </span>
                    </div>
                    <p class="text-sm text-[#2B352F] mt-2.5 leading-[1.8]">${isBn ? full.storyBn : full.storyEn}</p>
                    <div class="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-[#EAECE6]">
                      <span class="micro-pill">${fmtNum(full.area, state.lang)} ${isBn ? 'ব.কি.মি.' : 'km²'}</span>
                      <span class="micro-pill">${isBn ? 'জনসংখ্যা ' : 'Pop '}${fmtNum(full.pop, state.lang)}</span>
                      <span class="micro-pill">${fmtNum(full.upazilas, state.lang)} ${isBn ? 'উপজেলা' : 'Upazilas'}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
        body.querySelectorAll('button[data-era]').forEach(btn => {
          btn.addEventListener('click', () => { state.districtEraFilter = btn.dataset.era; renderDetailBody(); });
        });
        const localInput = document.getElementById('districtLocalFilter');
        localInput?.addEventListener('input', (e) => {
          state.districtFilterText = e.target.value;
          renderDetailBody();
          const reInput = document.getElementById('districtLocalFilter');
          if (reInput) { reInput.focus(); reInput.setSelectionRange(reInput.value.length, reInput.value.length); }
        });
        body.querySelectorAll('[data-dist-card]').forEach(card => {
          card.addEventListener('click', () => focusDistrictFromCard(card.dataset.distCard));
        });
      }
    }

    function renderOriginSection() {
      const isBn = state.lang === 'bn';
      ['ancestry', 'janapada', '1947', 'groups4'].forEach(t => {
        const id = t === '1947' ? 'originTab1947' : (t === 'ancestry' ? 'originTabAncestry' : (t === 'janapada' ? 'originTabJanapada' : 'originTab4Groups'));
        document.getElementById(id)?.classList.toggle('active', state.originTab === t);
      });

      const box = document.getElementById('originBody');
      if (state.originTab === 'ancestry') {
        box.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${BENGALI_ANCESTRY_LAYERS.map((layer, idx) => `
              <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift sm:p-6 space-y-3">
                <div class="flex items-center justify-between gap-2">
                  <span class="micro-pill text-[#0F6B4F] bg-[#DCEFE5]">${isBn ? layer.eraBn : layer.eraEn}</span>
                  <span class="w-8 h-8 rounded-full bg-[#121714] text-white font-mono text-xs font-bold flex items-center justify-center">0${idx + 1}</span>
                </div>
                <h3 class="font-heading text-lg sm:text-xl font-bold text-[#16211C]">${isBn ? layer.titleBn : layer.titleEn}</h3>
                <p class="text-sm sm:text-[15px] text-[#2B352F] leading-[1.8]">${isBn ? layer.descBn : layer.descEn}</p>
              </div>
            `).join('')}
          </div>
        `;
      } else if (state.originTab === 'janapada') {
        box.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${ANCIENT_JANAPADAS.map(j => `
              <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift flex flex-col justify-between gap-3">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <h3 class="font-heading text-lg font-bold text-[#16211C]">${isBn ? j.nameBn : j.nameEn}</h3>
                    <button type="button" data-janapada-div="${j.divId}" class="lux-pill-btn px-3 py-1 text-[11px] font-bold">${isBn ? 'মানচিত্র' : 'Map'}</button>
                  </div>
                  <div class="micro-pill text-[#0F6B4F] bg-[#DCEFE5] mb-2.5">${isBn ? j.modernBn : j.modernEn}</div>
                  <p class="text-sm text-[#2B352F] leading-relaxed">${isBn ? j.descBn : j.descEn}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        box.querySelectorAll('button[data-janapada-div]').forEach(btn => {
          btn.addEventListener('click', () => {
            state.mapLayer = 'divisions';
            state.activeTimelineId = null;
            selectDivision(btn.dataset.janapadaDiv, { autoZoom: true });
            setTimeout(() => document.getElementById('mapWorkspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
          });
        });
      } else if (state.originTab === 'groups4') {
        const fourGroups = [
          {
            num: '01', color: '#0F7A53',
            nameBn: 'দ্রাবিড় (Dravidian)', nameEn: 'Dravidian',
            originBn: 'দক্ষিণ ভারত ও শ্রীলঙ্কা (খ্রি.পূ. ১০০০ অব্দের আগে)', originEn: 'Southern India & Sri Lanka (Before 1000 BCE)',
            commBn: 'মুন্ডা ও ওরাওঁ (প্রধানত সিলেটের চা বাগান ও উত্তরবঙ্গ)', commEn: 'Munda, Oraon (Sylhet tea gardens & northwest)',
            descBn: 'বাংলাদেশের নৃতাত্ত্বিক শ্রেণিবিভাগে এরাই ক্ষুদ্রতম গোষ্ঠী (মাত্র কয়েক হাজার মানুষ)। প্রাচীনকালে দক্ষিণ ভারত ও শ্রীলঙ্কা থেকে এসে বসতি স্থাপন করে।',
            descEn: 'Smallest ethnic stock in Bangladesh (a few thousand people), migrating from southern India and Sri Lanka before 1000 BCE.'
          },
          {
            num: '02', color: '#C96A2B',
            nameBn: 'প্রোটো-অস্ট্রালয়েড (Proto-Australoid)', nameEn: 'Proto-Australoid',
            originBn: 'আফ্রিকা → দক্ষিণ এশিয়া → দক্ষিণ-পূর্ব এশিয়া ও অস্ট্রেলিয়া', originEn: 'Africa → South Asia → SE Asia & Australia',
            commBn: 'সাঁওতাল ও খাসিয়া', commEn: 'Santal & Khasi',
            descBn: 'প্রাচীন শিকারি-সংগ্রাহক এই জনগোষ্ঠীই বাংলায় কৃষিকাজের সূচনা করে। বাংলা ভাষায় প্রচলিত অস্ট্রিক শব্দ—লাঙল, নারিকেল, লাউ, গন্ডা ও কুড়ি—তাঁদের ভাষা থেকেই এসেছে।',
            descEn: 'Ancient hunter-gatherers who introduced agriculture to Bengal and left Austric words in Bangla such as Langal (plough), Narikel (coconut), Lau (pumpkin), Ganda (four), and Kuri (twenty).'
          },
          {
            num: '03', color: '#2C7A8C',
            nameBn: 'মঙ্গোলীয় (Mongolian / Tibeto-Burman)', nameEn: 'Mongolian (Tibeto-Burman)',
            originBn: 'মধ্য ও পূর্ব এশিয়া', originEn: 'Central & East Asia',
            commBn: 'চাকমা (বৃহত্তম), মারমা (২য়), ত্রিপুরা (৩য়), গারো ও মণিপুরী', commEn: 'Chakma (largest), Marma (2nd), Tripura (3rd), Garo & Manipuri',
            descBn: 'প্রধানত পার্বত্য চট্টগ্রাম, সিলেট ও ময়মনসিংহ অঞ্চলে বসবাস করে। প্রায় সব ক্ষুদ্র নৃগোষ্ঠীই দ্বিভাষিক (নিজস্ব মাতৃভাষার পাশাপাশি বাংলাতেও দক্ষ)।',
            descEn: 'Concentrated in the Chittagong Hill Tracts, Sylhet, and Mymensingh; most communities are bilingual in their mother tongue and Bangla.'
          },
          {
            num: '04', color: '#121714',
            nameBn: 'বাঙালি (Bangali — মিশ্র জনগোষ্ঠী)', nameEn: 'Bangali (Heterogeneous Majority)',
            originBn: 'শতাব্দীজুড়ে বিভিন্ন জাতির সংমিশ্রণ (উর্বর কৃষিভূমির আকর্ষণে)', originEn: 'Century-long blending of historical migrants on fertile delta lands',
            commBn: 'মোট জনসংখ্যার প্রায় ৯৮–৯৯% (অ-উপজাতি মূলধারা)', commEn: '~98–99% non-tribal majority population',
            descBn: 'বাঙালিরা কোনো একক উপজাতি নয়—বরং উর্বর পলিমাটি ও সমৃদ্ধ কৃষির আকর্ষণে নানা অঞ্চল থেকে আসা মানুষের দীর্ঘ সংমিশ্রণে গড়ে ওঠা মিশ্র (Heterogeneous) জাতি।',
            descEn: 'Non-tribal and heterogeneous in origin, formed over centuries as diverse peoples settled and blended across Bengal’s fertile alluvial plains.'
          }
        ];
        box.innerHTML = `
          <div class="space-y-4">
            <div class="rounded-[20px] bg-[#E3F2EA] border border-[#CBE4D7] p-4 sm:p-5 text-sm text-[#16211C] leading-[1.8]">
              ${isBn
                ? '<strong>আদি বাসিন্দা ও নৃতাত্ত্বিক ভিত্তি:</strong> হাজার বছর ধরে নানা জাতির মানুষ এই উর্বর ভূমিতে এসে মিশে গেছে। এই অঞ্চলের সবচেয়ে প্রাচীন পরিচিত বাসিন্দা ছিল <strong>নেগ্রিটো (Negrito)</strong> জনগোষ্ঠী। নৃতাত্ত্বিকভাবে বাংলাদেশের বর্তমান মানুষকে ৪টি প্রধান শ্রেণিতে ভাগ করা হয় (২০২২ শুমারি অনুযায়ী দেশে ৫০টি গেজেটভুক্ত ক্ষুদ্র নৃগোষ্ঠী রয়েছে, যা পুরনো পাঠ্যবইয়ে ৩০+ উল্লেখ থাকে)।'
                : '<strong>Earliest Settlers & Anthropological Roots:</strong> The earliest known settlers of Bengal were <strong>Negritos</strong>. Over millennia, diverse peoples blended here into 4 major ethnic stocks (with 50 officially gazetted ethnic minority communities in the 2022 Census, updated from older 30+ textbook counts).'}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${fourGroups.map(g => `
                <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
                  <div class="flex items-center justify-between gap-2">
                    <h3 class="font-heading text-lg font-bold text-[#16211C]">${isBn ? g.nameBn : g.nameEn}</h3>
                    <span class="w-8 h-8 rounded-full text-white font-mono text-xs font-bold flex items-center justify-center shrink-0" style="background:${g.color}">${g.num}</span>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="micro-pill bg-[#F3F5F0]">${isBn ? g.originBn : g.originEn}</span>
                  </div>
                  <div class="text-xs font-bold text-[#0F6B4F]">${isBn ? 'প্রধান সম্প্রদায়:' : 'Communities:'} ${isBn ? g.commBn : g.commEn}</div>
                  <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">${isBn ? g.descBn : g.descEn}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else {
        box.innerHTML = `
          <div class="space-y-4">
            <div class="rounded-[20px] bg-[#E3F2EA] border border-[#CBE4D7] p-5 text-sm sm:text-[15px] text-[#16211C] leading-[1.8]">
              ${isBn
                ? '<strong>১৯০৫ বঙ্গভঙ্গ থেকে ১৯৪৭ র‍্যাডক্লিফ রেখা ও ১৯৭১ স্বাধীনতা:</strong> ১৯০৫ সালে প্রথমবার বাংলা বিভক্ত হলেও ১৯১১ সালে তা রদ হয়। ১৯৪৭ সালের ২০ জুন বঙ্গীয় আইনসভার ভোটে পশ্চিমবঙ্গের সদস্যরা (৫৮–২১ ভোটে) বাংলা ভাগের পক্ষে সিদ্ধান্ত নেন এবং ৬ জুলাই সিলেটে গণভোট হয়। ১৭ আগস্ট ১৯৪৭ স্যার সিরিল র‍্যাডক্লিফ চূড়ান্ত সীমানা ঘোষণা করেন, যার মাধ্যমে পূর্ব বাংলা ভারত থেকে আলাদা হয় এবং ১৯৭১ সালের মুক্তিযুদ্ধের মাধ্যমে স্বাধীন বাংলাদেশ হিসেবে আত্মপ্রকাশ করে।'
                : '<strong>1905 Partition to 1947 Radcliffe Line & 1971 Independence:</strong> First partitioned in 1905 (annulled 1911), Bengal was permanently divided after the 20 June 1947 Assembly vote (58–21 by West Bengal legislators) and the 6 July 1947 Sylhet Referendum. Sir Cyril Radcliffe’s 17 August 1947 boundary award separated East Bengal from India, which won independence as Bangladesh in 1971.'}
            </div>
            <div class="overflow-x-auto border border-[#E4E8E6] rounded-[20px]">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="bg-[#F1F4EE] text-[#16211C] border-b border-[#E4E8E6]">
                    <th class="py-3.5 px-4 font-heading font-bold">${isBn ? 'অঞ্চল / অবিভক্ত জেলা' : 'Undivided Region'}</th>
                    <th class="py-3.5 px-4 font-heading font-bold text-[#0F6B4F]">${isBn ? 'বাংলাদেশে (পূর্ব বাংলা) যা এলো' : 'Awarded to Bangladesh'}</th>
                    <th class="py-3.5 px-4 font-heading font-bold text-[#5D6762]">${isBn ? 'ভারতে (পশ্চিমবঙ্গ / আসাম) যা গেল' : 'Awarded to India'}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#EAECE6] bg-white">
                  ${PARTITION_SPLITS.map(row => `
                    <tr>
                      <td class="py-3 px-4 font-bold text-[#16211C]">${isBn ? row.regionBn : row.regionEn}</td>
                      <td class="py-3 px-4 text-[#2B352F]">${isBn ? row.bdBn : row.bdEn}</td>
                      <td class="py-3 px-4 text-[#5D6762]">${isBn ? row.indiaBn : row.indiaEn}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }
    }

    function renderEthnicStatsSection() {
      const isBn = state.lang === 'bn';
      const box = document.getElementById('ethnicStatsBody');
      box.innerHTML = `
        <div>
          <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C] mb-3">
            ${isBn ? 'সর্বোচ্চ ক্ষুদ্র নৃগোষ্ঠী অধ্যুষিত ৩টি জেলা (২০২২ শুমারি)' : 'Top 3 Districts by Ethnic Minority Share (2022 Census)'}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${TOP_ETHNIC_DISTRICTS.map((d, idx) => `
              <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift flex flex-col justify-between gap-3">
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-heading text-lg font-bold text-[#16211C]">${fmtNum(idx + 1, state.lang)}. ${isBn ? d.nameBn + ' জেলা' : d.nameEn}</span>
                    <button type="button" data-ethnic-dist="${d.id}" class="lux-pill-btn px-3 py-1 text-[11px] font-bold">${isBn ? 'মানচিত্র' : 'Map'}</button>
                  </div>
                  <div class="font-heading text-2xl font-extrabold text-[#0F6B4F] mt-2">${fmtNum(d.pctOfDist, state.lang)}%</div>
                  <div class="w-full h-3 bg-[#E6EFEA] rounded-full overflow-hidden my-2.5 p-0.5 cursor-pointer" data-tip-html="<div class='font-bold text-[#16211C] mb-1'>${isBn ? d.nameBn + ' জেলা' : d.nameEn}</div><div class='text-[#0F6B4F] font-bold'>${isBn ? 'জেলার মোট জনসংখ্যার' : 'Share of District'}: ${fmtNum(d.pctOfDist, state.lang)}%</div><div class='text-[#5D6762]'>${isBn ? 'ক্ষুদ্র নৃগোষ্ঠী' : 'Population'}: ${fmtNum(d.count, state.lang)} (${fmtNum(d.shareOfNat, state.lang)}% ${isBn ? 'জাতীয়' : 'national'})</div>">
                    <div class="h-full rounded-full bg-[#0B4D36] chart-anim-bar" data-anim-width="${d.pctOfDist}%"></div>
                  </div>
                  <div class="flex flex-wrap gap-1.5 mb-2.5">
                    <span class="micro-pill">${isBn ? 'জনসংখ্যা:' : 'Pop:'} ${fmtNum(d.count, state.lang)}</span>
                    <span class="micro-pill">${isBn ? 'জাতীয়:' : 'National:'} ${fmtNum(d.shareOfNat, state.lang)}%</span>
                  </div>
                  <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? d.topGroupsBn : d.topGroupsEn}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C] mb-3">
            ${isBn ? 'বাংলাদেশের প্রধান ক্ষুদ্র নৃগোষ্ঠীসমূহ, জনসংখ্যা ও উৎপত্তি (২০২২ শুমারি)' : 'Major Ethnic Communities, Population & Origins (2022 Census)'}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            ${TOP_ETHNIC_GROUPS_2022.map(g => `
              <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="font-heading text-base font-bold text-[#16211C]">${isBn ? g.nameBn : g.nameEn}</span>
                  <span class="text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-2.5 py-0.5 rounded-full">${fmtNum(g.pct, state.lang)}%</span>
                </div>
                <div class="text-xs font-semibold text-[#5D6762] mb-2">${isBn ? 'জনসংখ্যা:' : 'Pop:'} <strong class="text-[#16211C]">${fmtNum(g.pop, state.lang)}</strong></div>
                <div class="text-xs text-[#2B352F] space-y-1 border-t border-[#EAECE6] pt-2">
                  <div><strong class="text-[#0F6B4F]">${isBn ? 'উৎপত্তি:' : 'Origin:'}</strong> ${isBn ? g.familyBn : g.familyEn}</div>
                  <div><strong class="text-[#16211C]">${isBn ? 'প্রধান জেলা:' : 'Districts:'}</strong> ${isBn ? g.regionBn : g.regionEn}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      const ethnicPage = document.getElementById('page-ethnic');
      animateBarsIn(ethnicPage, false);
      bindTooltipElements(ethnicPage);
      box.querySelectorAll('button[data-ethnic-dist]').forEach(btn => {
        btn.addEventListener('click', () => focusDistrictFromCard(btn.dataset.ethnicDist, true));
      });

      const divEthGrid = document.getElementById('divisionEthnicGrid');
      divEthGrid.innerHTML = DIVISIONS.map(div => {
        const deep = DIVISION_DEEP[div.id];
        return `
          <div class="rounded-[22px] p-5 border border-[#E4E8E6] bg-white">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="font-heading text-lg font-bold text-[#16211C]">${isBn ? div.nameBn : div.nameEn}</span>
              <span class="w-3 h-3 rounded-full" style="background:${div.color}"></span>
            </div>
            <p class="text-xs text-[#2B352F] leading-relaxed mb-3">${isBn ? deep.peopleBn : deep.peopleEn}</p>
            <div class="space-y-2">
              ${deep.ethnicGroups.map(eg => `
                <div class="rounded-2xl bg-[#F5F7F2] border border-[#E5E8E0] p-3">
                  <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span class="text-sm font-bold text-[#0F6B4F]">${isBn ? eg.nameBn : eg.nameEn}</span>
                    <span class="micro-pill bg-white">${isBn ? eg.districtsBn : eg.districtsEn}</span>
                  </div>
                  <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? eg.originBn : eg.originEn}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    }


