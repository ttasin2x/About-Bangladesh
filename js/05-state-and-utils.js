
    const ALL_DISTRICTS = [];
    const DISTRICT_BY_ID = {};
    DIVISIONS.forEach(div => {
      div.districts.forEach(dist => {
        const story = DISTRICT_STORIES[dist.id] || { eraBn: '', eraEn: '', storyBn: dist.originBn, storyEn: dist.originEn };
        const fam = DISTRICT_FAMOUS[dist.id] || { famousBn: dist.originBn, famousEn: dist.originEn };
        const enriched = {
          ...dist,
          ...story,
          ...fam,
          divisionId: div.id,
          divisionNameBn: div.nameBn,
          divisionNameEn: div.nameEn,
          divisionColor: div.color
        };
        ALL_DISTRICTS.push(enriched);
        DISTRICT_BY_ID[dist.id] = enriched;
      });
    });

    function normName(str) {
      return (str || '').toLowerCase().replace(/division|district|zila|zilla|bibhag/g, '').replace(/['’`.\-\s_]/g, '').trim();
    }

    const DIVISION_ALIASES = {
      dhaka: 'dhaka', dacca: 'dhaka', chattogram: 'chattogram', chittagong: 'chattogram', chattagram: 'chattogram',
      rajshahi: 'rajshahi', khulna: 'khulna', barishal: 'barishal', barisal: 'barishal',
      sylhet: 'sylhet', rangpur: 'rangpur', mymensingh: 'mymensingh'
    };

    const DISTRICT_ALIASES = {
      dhaka: 'dhaka', dacca: 'dhaka', faridpur: 'faridpur', tangail: 'tangail', gazipur: 'gazipur',
      narayanganj: 'narayanganj', narayangonj: 'narayanganj', kishoreganj: 'kishoreganj', kishorganj: 'kishoreganj',
      narsingdi: 'narsingdi', munshiganj: 'munshiganj', manikganj: 'manikganj', gopalganj: 'gopalganj',
      shariatpur: 'shariatpur', madaripur: 'madaripur', rajbari: 'rajbari', chattogram: 'chattogram',
      chittagong: 'chattogram', cumilla: 'cumilla', comilla: 'cumilla', noakhali: 'noakhali',
      rangamati: 'rangamati', bandarban: 'bandarban', khagrachhari: 'khagrachhari', khagrachari: 'khagrachhari',
      brahmanbaria: 'brahmanbaria', coxsbazar: 'coxs_bazar', chandpur: 'chandpur', lakshmipur: 'lakshmipur',
      laxmipur: 'lakshmipur', feni: 'feni', rajshahi: 'rajshahi', bogura: 'bogura', bogra: 'bogura',
      pabna: 'pabna', joypurhat: 'joypurhat', sirajganj: 'sirajganj', naogaon: 'naogaon', natore: 'natore',
      chapainawabganj: 'chapai_nawabganj', nawabganj: 'chapai_nawabganj', jashore: 'jashore', jessore: 'jashore',
      khulna: 'khulna', kushtia: 'kushtia', satkhira: 'satkhira', jhenaidah: 'jhenaidah', bagerhat: 'bagerhat',
      chuadanga: 'chuadanga', magura: 'magura', narail: 'narail', meherpur: 'meherpur', barishal: 'barishal',
      barisal: 'barishal', patuakhali: 'patuakhali', bhola: 'bhola', pirojpur: 'pirojpur', barguna: 'barguna',
      jhalokati: 'jhalokati', jhalokathi: 'jhalokati', sylhet: 'sylhet', sunamganj: 'sunamganj',
      habiganj: 'habiganj', moulvibazar: 'moulvibazar', rangpur: 'rangpur', dinajpur: 'dinajpur',
      panchagarh: 'panchagarh', nilphamari: 'nilphamari', gaibandha: 'gaibandha', kurigram: 'kurigram',
      thakurgaon: 'thakurgaon', lalmonirhat: 'lalmonirhat', mymensingh: 'mymensingh', jamalpur: 'jamalpur',
      netrokona: 'netrokona', sherpur: 'sherpur'
    };

    const MAP_FEATURES = MAP_DATA.f.map(f => {
      const distId = DISTRICT_ALIASES[normName(f.n)] || null;
      const divId = DIVISION_ALIASES[normName(f.dv)] || (distId ? DISTRICT_BY_ID[distId]?.divisionId : null);
      return { ...f, distId, divId };
    });

    const DIVISION_CENTROIDS = {};
    DIVISIONS.forEach(div => {
      const feats = MAP_FEATURES.filter(f => f.divId === div.id);
      if (feats.length) {
        const cx = feats.reduce((s, f) => s + f.c[0], 0) / feats.length;
        const cy = feats.reduce((s, f) => s + f.c[1], 0) / feats.length;
        DIVISION_CENTROIDS[div.id] = [cx, cy];
      }
    });

    const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    function toBnDigits(input) { return String(input).replace(/\d/g, d => BN_DIGITS[Number(d)]); }
    function fmtNum(n, lang) {
      const formatted = Number(n).toLocaleString('en-US');
      return lang === 'bn' ? toBnDigits(formatted) : formatted;
    }
    function fmtYear(y, lang) { return lang === 'bn' ? toBnDigits(y) : String(y); }

    const state = {
      currentPage: 'districts',
      lang: 'bn',
      mapLayer: 'divisions',
      showDistLabels: false,
      selectedDivisionId: 'dhaka',
      selectedDistrictId: null,
      activeTab: 'overview',
      originTab: 'ancestry',
      districtEraFilter: 'all',
      districtFilterText: '',
      activeTimelineId: null,
      selectedReligionId: 'islam',
      religionChartMode: 'minority',
      compareCountryId: 'us',
      worldLineMetric: 'life',
      worldBarCat: 'mil',
      activeBorderZone: 'all'
    };

    let mapSvg, mapG, mapZoom;

    function switchPage(pageId, scrollTop = true) {
      hideChartTooltip();
      state.currentPage = pageId;
      ['districts', 'origin', 'ethnic', 'religion', 'animation', 'bangladesh', 'world', 'about', 'compare'].forEach(p => {
        const el = document.getElementById(`page-${p}`);
        if (el) el.classList.toggle('active-page', p === pageId);
      });

      const isFirstPage = pageId === 'districts';
      const heroEl = document.getElementById('ubHero');
      const trustEl = document.getElementById('ubTrustBar');
      const heroVid = document.getElementById('heroBgVideo');
      if (heroEl) heroEl.style.display = isFirstPage ? 'flex' : 'none';
      if (trustEl) trustEl.style.display = isFirstPage ? 'block' : 'none';
      if (heroVid) {
        heroVid.muted = true;
        if (isFirstPage) {
          heroVid.play().catch(() => {});
        } else {
          heroVid.pause();
        }
      }
      document.body.classList.toggle('subpage-active', !isFirstPage);

      const divStrip = document.getElementById('divisionPillsWrap');
      if (divStrip) divStrip.style.display = isFirstPage ? 'flex' : 'none';

      document.querySelectorAll('[data-page-target]').forEach(btn => {
        if (!btn.classList.contains('top-page-btn') && !btn.classList.contains('dock-item')) return;
        btn.classList.toggle('active-nav', btn.dataset.pageTarget === pageId);
      });
      updateDockBubble(scrollTop);

      if (pageId === 'religion') renderReligionPage();
      if (pageId === 'bangladesh') renderBangladeshPage();
      if (pageId === 'world') renderWorldPage();
      if (pageId === 'about') renderAboutPage();
      if (pageId === 'compare') renderComparePage();
      if (pageId === 'animation') {
        initAnimMapIfNeeded();
        startAnimTour();
      } else {
        pauseAnimTour();
      }
      if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    function updateDockBubble(animatePop = false) {
      const dock = document.getElementById('bottomDockNav');
      const bubble = document.getElementById('dockBubble');
      if (!dock || !bubble) return;
      const activeBtn = dock.querySelector(`.dock-item[data-page-target="${state.currentPage}"]`);
      if (!activeBtn) return;
      const x = activeBtn.offsetLeft;
      const w = activeBtn.offsetWidth;
      bubble.style.setProperty('--bx', `${x}px`);
      bubble.style.width = `${w}px`;
      bubble.style.transform = `translateX(${x}px)`;
      if (animatePop) {
        bubble.classList.remove('bubble-pop');
        void bubble.offsetWidth;
        bubble.classList.add('bubble-pop');
      }
    }
    window.addEventListener('resize', () => updateDockBubble(false));

