    // =========================================================================
    // PAGE 7: BANGLADESH VS WORLD (LINE CHART, RADAR CHART, BAR CHART & MATRIX)
    // =========================================================================
    const WORLD_LINE_DATA = {
      life: {
        unitBn: 'বছর', unitEn: 'yrs',
        captionBn: '১৯৭১ থেকে ২০২৫: গড় আয়ুতে বাংলাদেশ যেভাবে বিশ্ব গড়কে ছাড়িয়ে গেছে (UNDP / World Bank)',
        captionEn: '1971–2025: How Bangladesh overtook the World Average in life expectancy (UNDP / World Bank)',
        insightBn: '<strong>বিস্ময়কর অগ্রগতি:</strong> ১৯৭১ সালে বাংলাদেশের গড় আয়ু ছিল মাত্র ৪৬.৫ বছর (বিশ্ব গড় ৫৮.৮ বছর)। স্বাস্থ্যসেবা ও টিকাদান কর্মসূচির সাফল্যে ২০২৫ সালে বাংলাদেশের গড় আয়ু <strong>৭৪.৭ বছরে</strong> পৌঁছেছে—যা বিশ্ব গড় (~৭৩.৩ বছর) ও ভারতের (৭২.০ বছর) চেয়েও বেশি!',
        insightEn: '<strong>Remarkable Shift:</strong> From 46.5 years in 1971 (well below the 58.8-year world average), Bangladesh reached <strong>74.7 years</strong> in UNDP HDR 2025—surpassing both the world average (~73.3 yrs) and India (72.0 yrs).',
        points: [
          { yr: '1971', bd: 46.5, wd: 58.8 },
          { yr: '1980', bd: 53.5, wd: 62.8 },
          { yr: '1990', bd: 58.2, wd: 65.4 },
          { yr: '2000', bd: 65.3, wd: 67.7 },
          { yr: '2010', bd: 70.1, wd: 70.6 },
          { yr: '2020', bd: 72.0, wd: 72.1 },
          { yr: '2025', bd: 74.7, wd: 73.3 }
        ]
      },
      gdp: {
        unitBn: '$', unitEn: '$',
        captionBn: '১৯৮০ থেকে ২০২৬: মাথাপিছু নামমাত্র জিডিপি (মার্কিন ডলার) — বাংলাদেশ বনাম উন্নয়নশীল বিশ্ব গড় (IMF WEO 2026)',
        captionEn: '1980–2026: Nominal GDP per Capita (USD) — Bangladesh vs Emerging & Developing World Avg (IMF WEO 2026)',
        insightBn: '<strong>অর্থনৈতিক উত্থান:</strong> ১৯৮০ সালে মাথাপিছু জিডিপি ছিল মাত্র ~$২২০; ২০২৬ সালে তা প্রায় ১৩ গুণ বেড়ে <strong>$২,৮৪১–$২,৮৯০</strong> (পিপিপি-তে $১০,৮৫০) হয়েছে, এবং মোট জিডিপি <strong>$৫০৬ বিলিয়ন</strong> (বিশ্বে ৩৬তম, দক্ষিণ এশিয়ায় ২য়)।',
        insightEn: '<strong>Economic Surge:</strong> Rising nearly 13× from ~$220 in 1980 to <strong>$2,841–$2,890</strong> in 2026 ($10,850 PPP), Bangladesh’s $506B economy now ranks 36th globally and 2nd in South Asia.',
        points: [
          { yr: '1980', bd: 220, wd: 1120 },
          { yr: '1990', bd: 306, wd: 1450 },
          { yr: '2000', bd: 418, wd: 1890 },
          { yr: '2010', bd: 781, wd: 4250 },
          { yr: '2018', bd: 1963, wd: 5720 },
          { yr: '2022', bd: 2688, wd: 6850 },
          { yr: '2026', bd: 2890, wd: 7750 }
        ]
      },
      hdi: {
        unitBn: '', unitEn: '',
        captionBn: '১৯৯০ থেকে ২০২৫: মানব উন্নয়ন সূচকে (HDI) বাংলাদেশের +৭২% উল্লম্ফন বনাম বিশ্ব গড় (UNDP HDR 2025)',
        captionEn: '1990–2025: Bangladesh’s +72% climb in Human Development Index (HDI) vs World Average (UNDP HDR 2025)',
        insightBn: '<strong>মানব উন্নয়ন সূচক:</strong> ১৯৯০ সালে ০.৩৯৭ থেকে ৩৫ বছরে ৭২% বেড়ে ২০২৫ সালের UNDP রিপোর্টে বাংলাদেশের HDI স্কোর <strong>০.৬৮৫</strong> (১৯৩ দেশের মধ্যে ১৩০তম—ভারতের সমান, এবং নেপাল ১৪৫তম, মিয়ানমার ১৫০তম ও পাকিস্তান ১৬৮তমের চেয়ে এগিয়ে)।',
        insightEn: '<strong>Human Development Leap:</strong> Climbing 72% from 0.397 (1990) to <strong>0.685</strong> in UNDP HDR 2025 (130th of 193, tied with India and ahead of Nepal 145th, Myanmar 150th & Pakistan 168th).',
        points: [
          { yr: '1990', bd: 0.397, wd: 0.601 },
          { yr: '2000', bd: 0.477, wd: 0.645 },
          { yr: '2010', bd: 0.562, wd: 0.697 },
          { yr: '2015', bd: 0.621, wd: 0.722 },
          { yr: '2020', bd: 0.655, wd: 0.735 },
          { yr: '2025', bd: 0.685, wd: 0.752 }
        ]
      }
    };

    function renderWorldPage() {
      const isBn = state.lang === 'bn';
      const setT = (id, bn, en) => { const el = document.getElementById(id); if (el) el.textContent = isBn ? bn : en; };

      setT('wHeroTag', 'পৃষ্ঠা ৭ · বাংলাদেশ বনাম বিশ্ব (২০২৫–২০২৬ যাচাইকৃত বিশ্লেষণ)', 'PAGE 7 · BANGLADESH VS WORLD (VERIFIED 2025–2026)');
      setT('wHeroTitle', 'বাংলাদেশ বনাম বিশ্ব: আয়তন, অর্থনীতি, সামরিক শক্তি ও মানব উন্নয়ন', 'Bangladesh vs World: Area, Economy, Military & Global Standing');
      setT('wHeroDesc', 'বিশ্বের মাত্র ০.১০% ভূমি নিয়েও জনসংখ্যায় ৮ম, অর্থনীতিতে ৩৬তম, সামরিক শক্তিতে ৩৭তম, পোশাক রপ্তানিতে ২য় এবং ইলিশ-পাট রপ্তানিতে ১ম—ইন্টারঅ্যাক্টিভ লাইন চার্ট, রাডার চার্ট ও বার চার্টে পূর্ণাঙ্গ তুলনা।',
        'Holding just 0.10% of global land yet ranking 8th in population, 36th in GDP, 37th in military firepower, 2nd in RMG exports, and 1st in hilsa & raw jute exports.');

      setT('wLineEyebrow', 'লাইন চার্ট · ঐতিহাসিক অগ্রগতি', 'LINE CHART · TRAJECTORY');
      setT('wLineTitle', 'বাংলাদেশ বনাম বিশ্ব গড় (সময়রেখা)', 'Bangladesh vs World Average Over Time');
      setT('btnWLineLife', 'গড় আয়ু', 'Life Expectancy');
      setT('btnWLineGdp', 'মাথাপিছু জিডিপি', 'GDP per Capita');
      setT('btnWLineHdi', 'মানব উন্নয়ন (HDI)', 'HDI Progress');
      setT('wRadarEyebrow', 'রাডার চার্ট · বৈশ্বিক শক্তি সূচক', 'RADAR CHART · GLOBAL STRENGTH');
      setT('wRadarTitle', '৬টি খাতে বাংলাদেশের বৈশ্বিক অবস্থান', 'Bangladesh Global Percentile Across 6 Pillars');
      setT('wRadarHint', 'বিশ্বের গড় (৫০তম পার্সেন্টাইল) বনাম বাংলাদেশের স্কোর', 'Bangladesh global percentile vs 50th-percentile world median');
      setT('wRadarLegBd', 'বাংলাদেশ', 'Bangladesh');
      setT('wRadarLegWorld', 'বিশ্ব গড় (৫০%)', 'World Median (50%)');
      setT('wBarEyebrow', 'ইন্টারঅ্যাক্টিভ বার চার্ট', 'INTERACTIVE BENCHMARK BAR CHART');
      setT('wBarTitle', 'খাতভিত্তিক গভীর তুলনা: সামরিক, অর্থনীতি, কৃষি ও ভূগোল', 'Sector-by-Sector Comparison: Military, Economy, Agri & Geography');
      setT('btnWCatMil', 'সামরিক শক্তি', 'Military');
      setT('btnWCatEco', 'অর্থনীতি ও রপ্তানি', 'Economy');
      setT('btnWCatAgri', 'কৃষি ও মৎস্য', 'Agriculture');
      setT('btnWCatGeo', 'আয়তন ও জলবায়ু', 'Area & Climate');
      setT('wTableEyebrow', 'সম্পূর্ণ তুলনামূলক ছক', 'MASTER COMPARISON MATRIX');
      setT('wTableTitle', 'এক নজরে বাংলাদেশ বনাম বিশ্ব (আয়তন থেকে সামরিক শক্তি)', 'Bangladesh vs World at a Glance (Area to Military Power)');

      const wKpis = [
        { lblBn: 'ভূমি বনাম জনসংখ্যা', lblEn: 'Land vs Population', valBn: '৯৩তম বনাম ৮ম', valEn: '93rd vs 8th', subBn: 'বিশ্বের ০.১০% জমিতে ২.১৫% মানুষ', subEn: '2.15% of humanity on 0.10% land', color: '#0F7A53' },
        { lblBn: 'অর্থনীতি (জিডিপি ২০২৬)', lblEn: 'GDP Economy (2026)', valBn: '$৫০৬ বিলিয়ন', valEn: '$506 Billion', subBn: 'নমিনাল ৩৬তম · পিপিপি ২৬তম', subEn: '36th Nominal · 26th PPP', color: '#111613' },
        { lblBn: 'সামরিক শক্তি (GFP)', lblEn: 'Military Power (GFP)', valBn: '৩৭তম / ১৪৫ দেশ', valEn: '37th / 145 Nations', subBn: 'প্যারামিলিটারি #২ · জাতিসংঘ শীর্ষ ৩', subEn: 'Paramilitary #2 · UN Peacekeeping Top 3', color: '#B83B2A' },
        { lblBn: 'রপ্তানি ও খাদ্য শক্তি', lblEn: 'Global Export & Food', valBn: 'ইলিশ #১ · পোশাক #২', valEn: 'Hilsa #1 · RMG #2', subBn: 'পাট রপ্তানি #১ · চাল ও মাছ #৩', subEn: 'Jute #1 · Rice & Inland Fish #3', color: '#1F6A78' }
      ];
      document.getElementById('wHeroKpis').innerHTML = wKpis.map(k => `
        <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4">
          <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? k.lblBn : k.lblEn}</div>
          <div class="font-heading text-lg sm:text-xl font-extrabold mt-1" style="color:${k.color}">${isBn ? k.valBn : k.valEn}</div>
          <div class="text-[11px] text-[#5D6762] mt-1">${isBn ? k.subBn : k.subEn}</div>
        </div>
      `).join('');

      renderWorldLineChart();
      renderWorldRadarChart();
      renderWorldBarChart();
      renderWorldMasterTable();
      renderWorldExtendedSections();
    }

    function renderWorldExtendedSections() {
      const isBn = state.lang === 'bn';
      const setT = (id, bn, en) => { const el = document.getElementById(id); if (el) el.textContent = isBn ? bn : en; };

      setT('wTradeEyebrow', 'আন্তর্জাতিক বাণিজ্য ও পোশাক রপ্তানি (UNCTAD ২০২৪)', 'TRADE & GLOBAL APPAREL (UNCTAD 2024)');
      setT('wTradeTitle', 'রপ্তানি বনাম আমদানি এবং বিশ্ব পোশাক বাজার', 'Merchandise Trade & Global Apparel Leaders');
      setT('wEnvEyebrow', 'বিদ্যুৎ, ইন্টারনেট, বনভূমি ও CO₂ (World Bank ২০২৪)', 'ENERGY, DIGITAL & ENVIRONMENT (WB 2024)');
      setT('wEnvTitle', 'পরিবেশ, ডিজিটাল অন্তর্ভুক্তি ও অবকাঠামো তুলনা', 'Electricity, Internet, Forest & Emissions vs World');
      setT('wPeerEyebrow', 'আঞ্চলিক ও সমপর্যায়ের দেশগুলোর তুলনা', 'REGIONAL PEER COMPARISON');
      setT('wPeerTitle', 'বাংলাদেশ বনাম ভারত, ভিয়েতনাম ও মালয়েশিয়া', 'Bangladesh vs India, Vietnam & Malaysia');
      setT('wSwEyebrow', 'শক্তি ও দুর্বলতা বিশ্লেষণ', 'STRENGTHS & WEAKNESSES');
      setT('wSwTitle', 'বাংলাদেশের সবচেয়ে বড় ১০টি শক্তি ও ১০টি দুর্বলতা', 'Top 10 Strengths vs Top 10 Weaknesses');
      setT('wFutEyebrow', 'ভবিষ্যৎ সম্ভাবনা · আগামী ১০–২০ বছর', 'FUTURE FRONTIERS · NEXT 10–20 YEARS');
      setT('wFutTitle', 'কোন ৫টি খাতে বাংলাদেশ বিশ্বে শক্তিশালী অবস্থান গড়তে পারে', '5 Growth Frontiers & Strategic Roadmap');

      // 1. Trade & Apparel Export Visual Bars
      const rmgPeers = [
        { nameBn: 'চীন (১ম)', nameEn: 'China (#1)', val: 165.24, pct: 100, color: '#68736C' },
        { nameBn: 'বাংলাদেশ (২য় · ৬.৯০% বিশ্ব বাজার)', nameEn: 'Bangladesh (#2 · 6.90% share)', val: 38.48, pct: 23.3, color: '#0F7A53' },
        { nameBn: 'তুরস্ক (৩য়)', nameEn: 'Türkiye (#3)', val: 17.91, pct: 10.8, color: '#2C7A8C' }
      ];
      document.getElementById('wTradeBody').innerHTML = `
        <div class="grid grid-cols-3 gap-2.5">
          <div class="rounded-2xl bg-[#E3F2EA] border border-[#CBE4D7] p-3 text-center">
            <div class="text-[11px] font-bold text-[#0F6B4F]">${isBn ? 'পণ্য রপ্তানি' : 'Exports'}</div>
            <div class="font-heading text-base sm:text-lg font-extrabold text-[#16211C]">$47.25B</div>
          </div>
          <div class="rounded-2xl bg-[#F3F5F0] border border-[#E4E8E6] p-3 text-center">
            <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'পণ্য আমদানি' : 'Imports'}</div>
            <div class="font-heading text-base sm:text-lg font-extrabold text-[#16211C]">$67.88B</div>
          </div>
          <div class="rounded-2xl bg-[#FDF0EE] border border-[#ECCFC9] p-3 text-center">
            <div class="text-[11px] font-bold text-[#B83B2A]">${isBn ? 'বাণিজ্য ঘাটতি' : 'Balance'}</div>
            <div class="font-heading text-base sm:text-lg font-extrabold text-[#B83B2A]">-$20.64B</div>
          </div>
        </div>

        <div class="space-y-3 pt-1">
          <div class="text-xs font-bold text-[#16211C]">${isBn ? 'বিশ্ব পোশাক রপ্তানিতে শীর্ষ ৩ দেশ (২০২৪ · বিলিয়ন মার্কিন ডলার)' : 'Top 3 Global Apparel Exporters (2024 · USD Billions)'}</div>
          <div class="space-y-1.5 chart-rows-dimming">
          ${rmgPeers.map((p, idx) => `
            <div class="chart-row-interactive space-y-1" data-tip-html="<div class='font-bold text-[#16211C]'>${isBn ? p.nameBn : p.nameEn}</div><div class='font-extrabold' style='color:${p.color}'>$${p.val} ${isBn ? 'বিলিয়ন মার্কিন ডলার (২০২৪)' : 'Billion USD (2024)'}</div>">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-[#16211C]">${isBn ? p.nameBn : p.nameEn}</span>
                <span style="color:${p.color}">$${p.val}B</span>
              </div>
              <div class="w-full h-5 bg-[#E6EFEA] rounded-full overflow-hidden p-0.5">
                <div class="h-full rounded-full chart-anim-bar" style="background:${p.color};--bar-idx:${idx}" data-anim-width="${Math.max(10, p.pct)}%"></div>
              </div>
            </div>
          `).join('')}
          </div>
        </div>

        <div class="rounded-2xl bg-[#F3F5F0] p-3.5 text-xs text-[#2B352F] leading-relaxed">
          ${isBn
            ? '<strong>ম্যাক্রো তুলনা (World Bank ২০২৫):</strong> রেমিট্যান্স জিডিপির <strong>৭.৪%</strong> (বিশ্ব গড় ০.৮%), মূল্যস্ফীতি <strong>৮.৮%</strong> (বিশ্ব গড় ৩.০%), এবং মডেলড বেকারত্ব <strong>৩.৮%</strong> (বিশ্ব গড় ৪.৮%; তবে আন্ডারএমপ্লয়মেন্ট বড় চ্যালেঞ্জ)।'
            : '<strong>Macro Comparison (WB 2025):</strong> Remittances equal <strong>7.4% of GDP</strong> (world avg 0.8%), inflation <strong>8.8%</strong> (world 3.0%), and modeled unemployment <strong>3.8%</strong> (world 4.8%, though underemployment remains key).'}
        </div>
      `;

      // 2. Environment, Electricity, Digital & Mega Infrastructure
      const envBars = [
        { lblBn: 'বিদ্যুৎ সংযোগ (২০২৪)', lblEn: 'Electricity Access (2024)', bd: 99.5, wd: 91.9, unit: '%', color: '#0F7A53' },
        { lblBn: 'ইন্টারনেট ব্যবহারকারী (২০২৪)', lblEn: 'Internet Users (2024)', bd: 53.0, wd: 68.0, unit: '%', color: '#2C7A8C' },
        { lblBn: 'বনভূমির হার (মোট ভূমির %)', lblEn: 'Forest Area (% of land)', bd: 14.4, wd: 31.1, unit: '%', color: '#3F6E33' }
      ];
      document.getElementById('wEnvBody').innerHTML = `
        <div class="space-y-2 chart-rows-dimming">
          ${envBars.map((e, idx) => {
            const diff = (e.bd - e.wd).toFixed(1);
            const diffTxt = Number(diff) >= 0
              ? (isBn ? `বিশ্ব গড়ের চেয়ে +${fmtNum(diff, state.lang)}% বেশি` : `+${diff}% above World Avg`)
              : (isBn ? `বিশ্ব গড়ের চেয়ে ${fmtNum(diff, state.lang)}% কম` : `${diff}% below World Avg`);
            const tip = `<div class='font-bold text-[#16211C] mb-1'>${isBn ? e.lblBn : e.lblEn}</div>` +
              `<div class='font-extrabold' style='color:${e.color}'>${isBn ? 'বাংলাদেশ' : 'Bangladesh'}: ${fmtNum(e.bd, state.lang)}${e.unit}</div>` +
              `<div class='text-[#5D6762] font-semibold'>${isBn ? 'বিশ্ব গড়' : 'World Avg'}: ${fmtNum(e.wd, state.lang)}${e.unit}</div>` +
              `<div class='text-[11px] font-bold mt-0.5 text-[#16211C]'>${diffTxt}</div>`;
            return `
            <div class="chart-row-interactive space-y-1.5" data-tip-html="${tip.replace(/"/g, '&quot;')}">
              <div class="flex items-center justify-between text-xs font-bold">
                <span class="text-[#16211C]">${isBn ? e.lblBn : e.lblEn}</span>
                <span class="text-[#0F6B4F]">${isBn ? 'বাংলাদেশ' : 'BD'}: ${fmtNum(e.bd, state.lang)}${e.unit} <span class="text-[#5D6762] font-medium">· ${isBn ? 'বিশ্ব' : 'World'}: ${fmtNum(e.wd, state.lang)}${e.unit}</span></span>
              </div>
              <div class="space-y-1">
                <div class="w-full h-3 bg-[#E6EFEA] rounded-full overflow-hidden"><div class="h-full rounded-full chart-anim-bar" style="background:${e.color};--bar-idx:${idx}" data-anim-width="${e.bd}%"></div></div>
                <div class="w-full h-2 bg-[#E6EFEA] rounded-full overflow-hidden"><div class="h-full rounded-full bg-[#9CA8A0] chart-anim-bar" style="--bar-idx:${idx + 1}" data-anim-width="${e.wd}%"></div></div>
              </div>
            </div>
          `;
          }).join('')}
        </div>

        <div class="grid grid-cols-2 gap-2.5 pt-1">
          <div class="rounded-2xl bg-[#E3F2EA] border border-[#CBE4D7] p-3">
            <div class="text-[11px] font-bold text-[#0F6B4F]">${isBn ? 'মাথাপিছু CO₂ নির্গমন' : 'CO₂ per Capita'}</div>
            <div class="font-heading text-lg font-extrabold text-[#16211C]">${isBn ? '০.৭ টন' : '0.7 tonnes'}</div>
            <div class="text-[11px] text-[#2B352F]">${isBn ? 'বিশ্ব গড়: ৪.৭ টন (প্রায় ৭ গুণ কম)' : 'World avg: 4.7t (~7× lower)'}</div>
          </div>
          <div class="rounded-2xl bg-[#FDF0EE] border border-[#ECCFC9] p-3">
            <div class="text-[11px] font-bold text-[#B83B2A]">${isBn ? 'দুর্যোগ ও জ্ঞান সূচক' : 'Risk & Knowledge Index'}</div>
            <div class="font-heading text-lg font-extrabold text-[#B83B2A]">${isBn ? 'ঝুঁকি ৯ম · জ্ঞান ১২২তম' : 'Risk #9 · GKI #122'}</div>
            <div class="text-[11px] text-[#2B352F]">${isBn ? 'WorldRisk 2024 (১৯৩ দেশ) · GKI 2025' : 'WorldRisk 2024 (193) · GKI 2025'}</div>
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5 pt-1">
          ${(isBn
            ? ['পদ্মা সেতু', 'ঢাকা মেট্রোরেল', 'কর্ণফুলী টানেল', 'এলিভেটেড এক্সপ্রেসওয়ে', 'রূপপুর পারমাণবিক বিদ্যুৎ', 'মাতারবাড়ী গভীর সমুদ্রবন্দর']
            : ['Padma Bridge', 'Dhaka Metro Rail', 'Karnaphuli Tunnel', 'Elevated Expressway', 'Rooppur Nuclear Plant', 'Matarbari Deep Sea Port']
          ).map(p => `<span class="micro-pill bg-[#F3F5F0]">${p}</span>`).join('')}
        </div>
      `;

      // 3. Regional Peer Comparison Table (Bangladesh vs India, Vietnam, Malaysia)
      const peerRows = [
        { fBn: 'অর্থনীতির ধরন', fEn: 'Economy', bd: isBn ? 'উন্নয়নশীল' : 'Developing', ind: isBn ? 'উদীয়মান বৃহৎ' : 'Emerging Large', vn: isBn ? 'উদীয়মান রপ্তানিমুখী' : 'Emerging Export', my: isBn ? 'উচ্চ-মধ্যম আয়' : 'Upper-Middle' },
        { fBn: 'শিল্প ও উৎপাদন', fEn: 'Manufacturing', bd: isBn ? 'পোশাকশিল্পে শক্তিশালী' : 'Strong Garments', ind: isBn ? 'বহুমুখী শিল্প' : 'Diverse', vn: isBn ? 'শক্তিশালী ইলেকট্রনিক্স ও পোশাক' : 'Strong Tech & RMG', my: isBn ? 'উন্নত সেমিকন্ডাক্টর ও শিল্প' : 'Advanced' },
        { fBn: 'আইটি ও ডিজিটাল', fEn: 'IT & Digital', bd: isBn ? 'বিকাশমান (ফিনটেক ও ফ্রিল্যান্সিং)' : 'Growing (FinTech/Freelance)', ind: isBn ? 'অত্যন্ত শক্তিশালী' : 'Very Strong', vn: isBn ? 'দ্রুত বর্ধনশীল' : 'Fast Growing', my: isBn ? 'শক্তিশালী' : 'Strong' },
        { fBn: 'পর্যটন খাত', fEn: 'Tourism', bd: isBn ? 'উন্নয়নশীল (সম্ভাবনাময়)' : 'Developing', ind: isBn ? 'প্রতিষ্ঠিত' : 'Established', vn: isBn ? 'প্রতিষ্ঠিত' : 'Established', my: isBn ? 'অত্যন্ত প্রতিষ্ঠিত' : 'Established' },
        { fBn: 'অবকাঠামো', fEn: 'Infrastructure', bd: isBn ? 'দ্রুত উন্নয়নশীল' : 'Developing', ind: isBn ? 'বিস্তৃত হচ্ছে' : 'Expanding', vn: isBn ? 'বিস্তৃত হচ্ছে' : 'Expanding', my: isBn ? 'উন্নত' : 'Advanced' },
        { fBn: 'মাথাপিছু আয়', fEn: 'Per Capita Income', bd: isBn ? 'তুলনামূলক কম' : 'Lower', ind: isBn ? 'তুলনামূলক বেশি' : 'Higher', vn: isBn ? 'বেশি' : 'Higher', my: isBn ? 'অনেক বেশি' : 'Much Higher' }
      ];
      document.getElementById('wPeerBody').innerHTML = `
        <div class="overflow-x-auto border border-[#E4E8E6] rounded-[20px]">
          <table class="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr class="bg-[#F1F4EE] text-[#16211C] border-b border-[#E4E8E6]">
                <th class="py-3 px-4 font-heading font-bold">${isBn ? 'বিষয়' : 'Dimension'}</th>
                <th class="py-3 px-4 font-heading font-bold text-[#0F6B4F]">${isBn ? 'বাংলাদেশ' : 'Bangladesh'}</th>
                <th class="py-3 px-4 font-heading font-bold">${isBn ? 'ভারত' : 'India'}</th>
                <th class="py-3 px-4 font-heading font-bold">${isBn ? 'ভিয়েতনাম' : 'Vietnam'}</th>
                <th class="py-3 px-4 font-heading font-bold">${isBn ? 'মালয়েশিয়া' : 'Malaysia'}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#EAECE6] bg-white">
              ${peerRows.map(r => `
                <tr>
                  <td class="py-3 px-4 font-bold text-[#16211C]">${isBn ? r.fBn : r.fEn}</td>
                  <td class="py-3 px-4 font-semibold text-[#0F6B4F]">${r.bd}</td>
                  <td class="py-3 px-4 text-[#2B352F]">${r.ind}</td>
                  <td class="py-3 px-4 text-[#2B352F]">${r.vn}</td>
                  <td class="py-3 px-4 text-[#2B352F]">${r.my}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      // 4. Top 10 Strengths vs Top 10 Weaknesses
      const strengths = isBn ? [
        'বিশাল কর্মক্ষম জনসংখ্যা ও তরুণ শ্রমবাজার',
        'বিশ্বে ২য় বৃহত্তম তৈরি পোশাক (RMG) রপ্তানিকারক',
        'শক্তিশালী প্রবাসী আয় (জিডিপির ৭.৪%)',
        'ধান, মাছ, ইলিশ ও সবজি উৎপাদনে বৈশ্বিক শীর্ষে',
        'গড় আয়ুতে (৭৪.৭ বছর) বিশ্ব ও দক্ষিণ এশিয়ার গড়ের ওপরে',
        'প্রায় সর্বজনীন বিদ্যুৎ সংযোগ (৯৯.৫%)',
        'বিকাশ-নগদ-রকেটের মাধ্যমে দ্রুত ডিজিটাল পেমেন্ট বিস্তার',
        '১,১৮,৮১৩ ব.কি.মি. সমুদ্র ও নদীকেন্দ্রিক ব্লু-ইকোনমি',
        'ঘূর্ণিঝড় ও দুর্যোগ মোকাবিলায় বিশ্বস্বীকৃত অভিজ্ঞতা (CPP)',
        'ওষুধ শিল্পে স্বয়ংসম্পূর্ণতা ও রপ্তানি সক্ষমতা'
      ] : [
        'Large working-age population & dynamic youth labor force',
        'World’s 2nd-largest Ready-Made Garment (RMG) exporter',
        'Strong remittance inflow (7.4% of GDP vs 0.8% world avg)',
        'Global top-tier producer of hilsa (#1), jute, rice & inland fish',
        'Life expectancy (74.7 yrs) outperforming global & regional averages',
        'Near-universal electricity access (99.5% vs 91.9% world avg)',
        'Rapid FinTech & mobile payment adoption (bKash, Nagad, Rocket)',
        '118,813 km² maritime zone & riverine blue-economy potential',
        'Globally recognized disaster & cyclone preparedness (CPP)',
        'Self-reliant pharmaceutical manufacturing & growing exports'
      ];
      const weaknesses = isBn ? [
        'উন্নত বিশ্বের তুলনায় মাথাপিছু আয় এখনো কম',
        'উচ্চ মূল্যস্ফীতি (২০২৫-এ ৮.৮% বনাম বিশ্ব গড় ৩.০%)',
        'মুখস্থনির্ভর শিক্ষা ও শিক্ষার মানে বৈষম্য',
        'গবেষণা ও উদ্ভাবনে (R&D) বিনিয়োগের ঘাটতি (GKI ১২২তম)',
        'ব্যাংকিং ও আর্থিক খাতে কাঠামোগত দুর্বলতা',
        'শিক্ষিত বেকারত্ব ও দক্ষ কর্মসংস্থানের অভাব',
        'বায়ু-পানি দূষণ, কম বনভূমি (১৪.৪%) ও অপরিকল্পিত নগরায়ণ',
        'রপ্তানিতে এককভাবে তৈরি পোশাকের ওপর অতি-নির্ভরতা',
        'উচ্চ প্রযুক্তি, সেমিকন্ডাক্টর ও AI উদ্ভাবনে পিছিয়ে থাকা',
        'জলবায়ু পরিবর্তন ও সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধির চরম ঝুঁকি'
      ] : [
        'Per capita income remains far below advanced economies',
        'Elevated inflation (8.8% in 2025 vs 3.0% global average)',
        'Rote-based education & urban-rural quality gaps',
        'Low R&D investment & innovation rank (122nd in GKI 2025)',
        'Structural vulnerabilities in the banking & financial sector',
        'Youth underemployment & industry-ready skill shortages',
        'Air/water pollution, low forest cover (14.4%) & urban congestion',
        'Heavy export concentration in garments alone',
        'Limited footprint in semiconductors, robotics & deep-tech AI',
        'Severe climate risk (9th highest in WorldRiskReport 2024)'
      ];

      document.getElementById('wSwBody').innerHTML = `
        <div class="rounded-[22px] bg-[#E8F4EE] border border-[#CBE4D7] p-5 space-y-2.5">
          <h3 class="font-heading text-base sm:text-lg font-bold text-[#0F6B4F]">${isBn ? '১০টি সবচেয়ে বড় শক্তি (Strengths)' : 'Top 10 Strengths'}</h3>
          <ul class="space-y-2">
            ${strengths.map(s => `<li class="flex items-start gap-2 text-xs sm:text-sm text-[#16211C]"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0B4D36] shrink-0"></span><span>${s}</span></li>`).join('')}
          </ul>
        </div>
        <div class="rounded-[22px] bg-[#FDF2F0] border border-[#ECCFC9] p-5 space-y-2.5">
          <h3 class="font-heading text-base sm:text-lg font-bold text-[#B83B2A]">${isBn ? '১০টি প্রধান দুর্বলতা (Weaknesses)' : 'Top 10 Weaknesses'}</h3>
          <ul class="space-y-2">
            ${weaknesses.map(w => `<li class="flex items-start gap-2 text-xs sm:text-sm text-[#16211C]"><span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B83B2A] shrink-0"></span><span>${w}</span></li>`).join('')}
          </ul>
        </div>
      `;

      // 5. 5 Future Growth Frontiers + Final Strategic Assessment
      const frontiers = [
        { n: '01', tBn: 'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স', tEn: 'Semiconductor & Electronics', dBn: 'চিপ ডিজাইন, ইলেকট্রনিক্স অ্যাসেম্বলি ও বৈশ্বিক সেমিকন্ডাক্টর সাপ্লাই চেইনে প্রবেশের বিশাল সুযোগ।', dEn: 'Entering chip design, electronics assembly, and global semiconductor supply chains.' },
        { n: '02', tBn: 'আর্টিফিশিয়াল ইন্টেলিজেন্স ও সফটওয়্যার', tEn: 'Artificial Intelligence & Software', dBn: 'AI ডেভেলপমেন্ট, অটোমেশন, ডেটা অ্যানালিটিক্স, সাইবার সিকিউরিটি ও উচ্চমূল্যের সফটওয়্যার রপ্তানি।', dEn: 'Scaling AI engineering, data analytics, cybersecurity, and high-value software exports.' },
        { n: '03', tBn: 'ওষুধ শিল্প (Pharmaceuticals)', tEn: 'Pharmaceuticals & APIs', dBn: 'নিজস্ব কাঁচামাল (API) উৎপাদন ও আন্তর্জাতিক ওষুধের বাজারে রপ্তানি আরও বহুগুণ বাড়ানোর সম্ভাবনা।', dEn: 'Expanding domestic API manufacturing and global pharmaceutical market share.' },
        { n: '04', tBn: 'নবায়নযোগ্য জ্বালানি (Renewable Energy)', tEn: 'Renewable & Clean Energy', dBn: 'সৌরবিদ্যুৎ, ব্যাটারি স্টোরেজ ও ক্লিন এনার্জি প্রযুক্তিতে বিনিয়োগ করে জ্বালানি নিরাপত্তা নিশ্চিত করা।', dEn: 'Investing in solar power, grid storage, and clean energy to cut fossil fuel import reliance.' },
        { n: '05', tBn: 'লজিস্টিকস ও ব্লু ইকোনমি', tEn: 'Logistics & Maritime Economy', dBn: 'মাতারবাড়ী-চট্টগ্রাম-মোংলা বন্দর আধুনিকায়ন, শিপিং ও আঞ্চলিক বাণিজ্যিক হাবে রূপান্তর।', dEn: 'Modernizing Matarbari, Chattogram & Mongla ports into a regional Bay of Bengal trade hub.' }
      ];
      document.getElementById('wFutBody').innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          ${frontiers.map(f => `
            <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4 space-y-2 modern-lift">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#121714] text-white font-mono text-[11px] font-bold">${f.n}</span>
              <h3 class="font-heading text-sm sm:text-base font-bold text-[#16211C] leading-snug">${isBn ? f.tBn : f.tEn}</h3>
              <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? f.dBn : f.dEn}</p>
            </div>
          `).join('')}
        </div>
        <div class="rounded-[22px] bg-[#121714] text-white p-5 sm:p-6">
          <div class="text-xs font-bold text-[#6CE0B1] uppercase tracking-wider mb-1.5">${isBn ? 'সামগ্রিক মূল্যায়ন ও ভবিষ্যৎ লক্ষ্য' : 'STRATEGIC CONCLUSION'}</div>
          <p class="text-sm sm:text-[15px] text-white/90 leading-[1.8]">
            ${isBn
              ? 'সীমিত জমি ও বিপুল জনসংখ্যা নিয়ে অর্থনৈতিক ও সামাজিক অগ্রগতি বাংলাদেশের সবচেয়ে বড় অর্জন। তবে আগামী দশকে উন্নত বিশ্বের কাতারে যেতে হলে মূল লক্ষ্য হতে হবে—<strong>Low-cost manufacturing থেকে High-value, technology-driven ও গবেষণা-নির্ভর অর্থনীতিতে রূপান্তর</strong>।'
              : 'Achieving broad social and economic progress with limited land and a massive population is Bangladesh’s greatest feat. The next decade’s defining mission is transitioning from <strong>low-cost manufacturing to a high-value, technology-driven, research-backed economy</strong>.'}
          </p>
        </div>
      `;
      const tradeEl = document.getElementById('wTradeBody');
      const envEl = document.getElementById('wEnvBody');
      animateBarsIn(tradeEl, false);
      bindTooltipElements(tradeEl);
      animateBarsIn(envEl, false);
      bindTooltipElements(envEl);
    }

    function renderWorldLineChart() {
      syncReplayLabels();
      const isBn = state.lang === 'bn';
      ['life', 'gdp', 'hdi'].forEach(m => {
        const id = m === 'life' ? 'btnWLineLife' : (m === 'gdp' ? 'btnWLineGdp' : 'btnWLineHdi');
        document.getElementById(id)?.classList.toggle('active', state.worldLineMetric === m);
      });

      const cfg = WORLD_LINE_DATA[state.worldLineMetric];
      document.getElementById('wLineCaption').textContent = isBn ? cfg.captionBn : cfg.captionEn;
      document.getElementById('wLineInsight').innerHTML = isBn ? cfg.insightBn : cfg.insightEn;

      if (typeof d3 === 'undefined') return;
      const svg = d3.select('#worldLineSvg');
      svg.selectAll('*').remove();

      const W = 580, H = 270, m = { t: 28, r: 32, b: 36, l: 50 };
      const innerW = W - m.l - m.r, innerH = H - m.t - m.b;
      const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);

      const pts = cfg.points;
      const x = d3.scalePoint().domain(pts.map(p => p.yr)).range([0, innerW]).padding(0.14);
      const maxVal = d3.max(pts, p => Math.max(p.bd, p.wd)) * 1.14;
      const minVal = state.worldLineMetric === 'life' ? 40 : (state.worldLineMetric === 'hdi' ? 0.3 : 0);
      const y = d3.scaleLinear().domain([minVal, maxVal]).range([innerH, 0]);
      const fmtVal = v => state.worldLineMetric === 'gdp' ? `$${Math.round(v).toLocaleString()}` : (state.worldLineMetric === 'hdi' ? v.toFixed(3) : v.toFixed(1));
      const fmtValDisp = v => isBn ? toBnDigits(fmtVal(v)) : fmtVal(v);

      // Horizontal grid lines
      y.ticks(4).forEach(tk => {
        g.append('line').attr('x1', 0).attr('x2', innerW).attr('y1', y(tk)).attr('y2', y(tk))
          .attr('stroke', '#E5EAE6').attr('stroke-dasharray', '3 4');
        g.append('text').attr('x', -8).attr('y', y(tk) + 4).attr('text-anchor', 'end')
          .style('font-size', '10px').style('fill', '#68736C').style('font-weight', '600')
          .text(state.worldLineMetric === 'gdp' ? `$${tk}` : (state.worldLineMetric === 'hdi' ? tk.toFixed(2) : tk));
      });

      // X axis labels
      pts.forEach(p => {
        g.append('text').attr('class', `wl-xlbl-${p.yr}`).attr('x', x(p.yr)).attr('y', innerH + 22).attr('text-anchor', 'middle')
          .style('font-size', '11px').style('fill', '#46534B').style('font-weight', '700')
          .text(isBn ? toBnDigits(p.yr) : p.yr);
      });

      // Series groups (for interactive legend toggle)
      const wdGroup = g.append('g').attr('class', 'wl-series-wd').style('transition', 'opacity 0.25s ease')
        .style('opacity', chartUIState.lineShowWd ? 1 : 0.12);
      const bdGroup = g.append('g').attr('class', 'wl-series-bd').style('transition', 'opacity 0.25s ease')
        .style('opacity', chartUIState.lineShowBd ? 1 : 0.12);

      // World line (animated draw-in)
      const lineWd = d3.line().x(d => x(d.yr)).y(d => y(d.wd)).curve(d3.curveMonotoneX);
      const wdPath = wdGroup.append('path').datum(pts).attr('fill', 'none').attr('stroke', '#8B9790').attr('stroke-width', 2.4)
        .attr('d', lineWd);
      const wdLen = wdPath.node() ? wdPath.node().getTotalLength() : 600;
      wdPath.attr('stroke-dasharray', `${wdLen} ${wdLen}`).attr('stroke-dashoffset', wdLen)
        .transition().duration(850).ease(d3.easeCubicOut).attr('stroke-dashoffset', 0)
        .on('end', function() { d3.select(this).attr('stroke-dasharray', '6 5'); });

      // Bangladesh area fill (smooth fade-in)
      const areaBd = d3.area().x(d => x(d.yr)).y0(innerH).y1(d => y(d.bd)).curve(d3.curveMonotoneX);
      bdGroup.append('path').datum(pts).attr('fill', 'rgba(15, 122, 83, 0.11)').attr('d', areaBd)
        .attr('opacity', 0).transition().delay(260).duration(650).ease(d3.easeCubicOut).attr('opacity', 1);

      // Bangladesh line (animated draw-in)
      const lineBd = d3.line().x(d => x(d.yr)).y(d => y(d.bd)).curve(d3.curveMonotoneX);
      const bdPath = bdGroup.append('path').datum(pts).attr('fill', 'none').attr('stroke', '#0F7A53').attr('stroke-width', 3.2)
        .attr('stroke-linecap', 'round').attr('d', lineBd);
      const bdLen = bdPath.node() ? bdPath.node().getTotalLength() : 600;
      bdPath.attr('stroke-dasharray', `${bdLen} ${bdLen}`).attr('stroke-dashoffset', bdLen)
        .transition().duration(980).ease(d3.easeCubicOut).attr('stroke-dashoffset', 0);

      // Vertical hover crosshair guide
      const guideLine = g.append('line')
        .attr('y1', 0).attr('y2', innerH)
        .attr('stroke', '#0C6B58').attr('stroke-width', 1.4).attr('stroke-dasharray', '4 3')
        .style('opacity', 0).style('pointer-events', 'none');

      // Data dots (staggered pop-in)
      const wdDots = [];
      const bdDots = [];
      pts.forEach((p, idx) => {
        const wdDot = wdGroup.append('circle').attr('cx', x(p.yr)).attr('cy', y(p.wd)).attr('r', 0)
          .attr('fill', '#8B9790').attr('stroke', '#FFFFFF').attr('stroke-width', 1.5);
        wdDot.transition().delay(180 + idx * 90).duration(340).ease(d3.easeBackOut.overshoot(1.6)).attr('r', 3.8);
        wdDots.push(wdDot);

        const bdDot = bdGroup.append('circle').attr('cx', x(p.yr)).attr('cy', y(p.bd)).attr('r', 0)
          .attr('fill', '#0F7A53').attr('stroke', '#FFFFFF').attr('stroke-width', 2);
        bdDot.transition().delay(220 + idx * 95).duration(360).ease(d3.easeBackOut.overshoot(1.8)).attr('r', 4.8);
        bdDots.push(bdDot);

        if (idx === pts.length - 1 || idx === 0) {
          const fmtShort = v => state.worldLineMetric === 'gdp' ? `$${v}` : (state.worldLineMetric === 'hdi' ? v.toFixed(2) : v);
          bdGroup.append('text').attr('x', x(p.yr)).attr('y', y(p.bd) - 11).attr('text-anchor', 'middle')
            .style('font-size', '10.5px').style('font-weight', '800').style('fill', '#0F7A53')
            .attr('opacity', 0).text(isBn ? toBnDigits(fmtShort(p.bd)) : fmtShort(p.bd))
            .transition().delay(520 + idx * 60).duration(360).attr('opacity', 1);
        }
      });

      // Interactive scrubbing overlay
      const xs = pts.map(p => x(p.yr));
      function focusIndex(ev, idx) {
        const p = pts[idx];
        const px = xs[idx];
        guideLine.attr('x1', px).attr('x2', px).style('opacity', 0.85);
        bdDots.forEach((dot, i) => dot.attr('r', i === idx ? 7.5 : 4.8).attr('stroke-width', i === idx ? 2.6 : 2));
        wdDots.forEach((dot, i) => dot.attr('r', i === idx ? 6 : 3.8));
        const diff = p.bd - p.wd;
        const unit = isBn ? cfg.unitBn : cfg.unitEn;
        const unitSuffix = state.worldLineMetric === 'gdp' ? '' : (unit ? ' ' + unit : '');
        const diffSign = diff >= 0 ? '+' : '';
        const diffStr = state.worldLineMetric === 'gdp'
          ? `${diffSign}$${Math.round(diff).toLocaleString()}`
          : (state.worldLineMetric === 'hdi' ? `${diffSign}${diff.toFixed(3)}` : `${diffSign}${diff.toFixed(1)}${unitSuffix}`);
        const diffColor = diff >= 0 ? '#0F6B4F' : '#B83B2A';
        showChartTooltip(ev,
          `<div class="font-heading font-extrabold text-[#16211C] mb-1">${isBn ? toBnDigits(p.yr) + ' সাল' : 'Year ' + p.yr}</div>` +
          `<div class="flex items-center justify-between gap-4"><span class="text-[#0F6B4F] font-bold">${isBn ? 'বাংলাদেশ' : 'Bangladesh'}:</span><span class="font-extrabold text-[#0F6B4F]">${fmtValDisp(p.bd)}${unitSuffix}</span></div>` +
          `<div class="flex items-center justify-between gap-4"><span class="text-[#5D6762] font-semibold">${state.worldLineMetric === 'gdp' ? (isBn ? 'উন্নয়নশীল বিশ্ব' : 'Emerging World') : (isBn ? 'বিশ্ব গড়' : 'World Avg')}:</span><span class="font-bold text-[#5D6762]">${fmtValDisp(p.wd)}${unitSuffix}</span></div>` +
          `<div class="mt-1 pt-1 border-t border-[#E4E8E6] text-[11px] font-bold" style="color:${diffColor}">${isBn ? 'পার্থক্য' : 'Gap'}: ${isBn ? toBnDigits(diffStr) : diffStr}</div>`
        );
      }

      g.append('rect')
        .attr('width', innerW).attr('height', innerH)
        .attr('fill', 'transparent').style('cursor', 'crosshair')
        .on('mousemove touchmove', function(event) {
          const [mx] = d3.pointer(event, this);
          let bestIdx = 0, bestDist = Infinity;
          xs.forEach((xv, i) => {
            const dist = Math.abs(mx - xv);
            if (dist < bestDist) { bestDist = dist; bestIdx = i; }
          });
          focusIndex(event, bestIdx);
        })
        .on('mouseleave touchend', function() {
          guideLine.style('opacity', 0);
          bdDots.forEach(dot => dot.attr('r', 4.8).attr('stroke-width', 2));
          wdDots.forEach(dot => dot.attr('r', 3.8));
          hideChartTooltip();
        });

      // Interactive Clickable Inline Legend Top-Left
      const leg = g.append('g').attr('transform', 'translate(4, -10)');
      const legBd = leg.append('g').attr('class', 'world-legend-btn').style('cursor', 'pointer')
        .style('opacity', chartUIState.lineShowBd ? 1 : 0.38)
        .on('click', () => {
          chartUIState.lineShowBd = !chartUIState.lineShowBd;
          bdGroup.style('opacity', chartUIState.lineShowBd ? 1 : 0.12);
          legBd.style('opacity', chartUIState.lineShowBd ? 1 : 0.38);
        });
      legBd.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 4.5).attr('fill', '#0F7A53');
      legBd.append('text').attr('x', 9).attr('y', 4).style('font-size', '11px').style('font-weight', '700').style('fill', '#111613')
        .text(isBn ? 'বাংলাদেশ' : 'Bangladesh');

      const legWd = leg.append('g').attr('class', 'world-legend-btn').attr('transform', 'translate(92, 0)').style('cursor', 'pointer')
        .style('opacity', chartUIState.lineShowWd ? 1 : 0.38)
        .on('click', () => {
          chartUIState.lineShowWd = !chartUIState.lineShowWd;
          wdGroup.style('opacity', chartUIState.lineShowWd ? 1 : 0.12);
          legWd.style('opacity', chartUIState.lineShowWd ? 1 : 0.38);
        });
      legWd.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 4.5).attr('fill', '#8B9790');
      legWd.append('text').attr('x', 9).attr('y', 4).style('font-size', '11px').style('font-weight', '700').style('fill', '#68736C')
        .text(state.worldLineMetric === 'gdp' ? (isBn ? 'উন্নয়নশীল বিশ্ব গড়' : 'Emerging World Avg') : (isBn ? 'বিশ্ব গড়' : 'World Avg'));
    }

    function renderWorldRadarChart() {
      syncReplayLabels();
      if (typeof d3 === 'undefined') return;
      const isBn = state.lang === 'bn';
      const svg = d3.select('#worldRadarSvg');
      svg.selectAll('*').remove();

      const axes = [
        { lblBn: 'জনসংখ্যা (#৮)', lblEn: 'Pop (#8)', score: 96, noteBn: 'বিশ্বের ৮ম বৃহত্তম (১৭.১৬+ কোটি)', noteEn: '8th largest globally (171.6M+)' },
        { lblBn: 'পোশাক ও কৃষি', lblEn: 'RMG & Agri', score: 95, noteBn: 'পোশাক #২, ইলিশ ও কাঁচা পাট #১', noteEn: 'RMG #2, Hilsa & Raw Jute #1' },
        { lblBn: 'শান্তিরক্ষা', lblEn: 'UN Peace', score: 97, noteBn: 'জাতিসংঘ শান্তিরক্ষায় শীর্ষ ১–৩', noteEn: 'Top 1–3 UN Peacekeeping nation' },
        { lblBn: 'অর্থনীতি (#৩৬)', lblEn: 'GDP (#36)', score: 81, noteBn: '$৫০৬ বিলিয়ন নমিনাল (#৩৬) · PPP #২৬', noteEn: '$506B Nominal (#36) · PPP #26' },
        { lblBn: 'সামরিক (#৩৭)', lblEn: 'Military (#37)', score: 75, noteBn: 'GFP ২০২৬-এ ১৪৫ দেশের মধ্যে ৩৭তম', noteEn: '37th of 145 nations (GFP 2026)' },
        { lblBn: 'গড় আয়ু', lblEn: 'Life Exp', score: 66, noteBn: '৭৪.৭ বছর (বিশ্ব গড় ৭৩.৩ বছরের ওপরে)', noteEn: '74.7 yrs (above 73.3 yr world avg)' }
      ];
      const cx = 160, cy = 138, maxR = 90, n = axes.length;
      const g = svg.append('g');

      const ptAt = (i, pct) => {
        const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
        const r = (pct / 100) * maxR;
        return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
      };

      // Concentric web rings (25%, 50%, 75%, 100%)
      let worldRingPoly = null;
      [25, 50, 75, 100].forEach(lvl => {
        const ptsStr = axes.map((_, i) => ptAt(i, lvl).join(',')).join(' ');
        const poly = g.append('polygon').attr('points', ptsStr)
          .attr('fill', lvl === 50 ? 'rgba(156,168,160,0.14)' : 'none')
          .attr('stroke', lvl === 50 ? '#8B9790' : '#DCE4DE')
          .attr('stroke-width', lvl === 50 ? 1.6 : 1)
          .attr('stroke-dasharray', lvl === 50 ? '4 3' : 'none');
        if (lvl === 50) {
          worldRingPoly = poly.style('transition', 'opacity 0.25s ease')
            .style('opacity', chartUIState.radarShowWd ? 1 : 0.12);
        }
      });

      // Axis spokes & interactive labels
      const spokeLines = [];
      const labelEls = [];
      axes.forEach((ax, i) => {
        const [x2, y2] = ptAt(i, 100);
        const line = g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', x2).attr('y2', y2)
          .attr('stroke', '#DCE4DE').attr('stroke-width', 1.2).style('transition', 'stroke 0.2s ease, stroke-width 0.2s ease');
        spokeLines.push(line);

        const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
        const lx = cx + (maxR + 23) * Math.cos(ang), ly = cy + (maxR + 18) * Math.sin(ang);
        const lbl = g.append('text').attr('class', 'radar-axis-label').attr('x', lx).attr('y', ly + 3).attr('text-anchor', 'middle')
          .style('font-size', '10.5px').style('font-weight', '700').style('fill', '#111613')
          .text(isBn ? ax.lblBn : ax.lblEn)
          .on('mouseenter', (ev) => selectRadarAxis(i, ev))
          .on('mousemove', (ev) => positionChartTooltip(ev))
          .on('mouseleave', hideChartTooltip)
          .on('click', (ev) => selectRadarAxis(i, ev));
        labelEls.push(lbl);
      });

      // Bangladesh animated bloom-out polygon
      const centerPts = axes.map(() => `${cx},${cy}`).join(' ');
      const targetPts = axes.map((ax, i) => ptAt(i, ax.score).join(',')).join(' ');
      const bdPolyGroup = g.append('g').style('transition', 'opacity 0.25s ease')
        .style('opacity', chartUIState.radarShowBd ? 1 : 0.14);

      bdPolyGroup.append('polygon')
        .attr('points', centerPts)
        .attr('fill', 'rgba(15, 122, 83, 0.22)')
        .attr('stroke', '#0F7A53')
        .attr('stroke-width', 2.6)
        .attr('stroke-linejoin', 'round')
        .transition().duration(840).ease(d3.easeCubicOut)
        .attr('points', targetPts);

      // Interactive vertex dots (pop-in)
      const vertexDots = [];
      axes.forEach((ax, i) => {
        const [vx, vy] = ptAt(i, ax.score);
        const dot = bdPolyGroup.append('circle')
          .attr('class', 'radar-vertex')
          .attr('cx', cx).attr('cy', cy).attr('r', 0)
          .attr('fill', '#0F7A53').attr('stroke', '#FFFFFF').attr('stroke-width', 1.8)
          .on('mouseenter', (ev) => selectRadarAxis(i, ev))
          .on('mousemove', (ev) => positionChartTooltip(ev))
          .on('mouseleave', hideChartTooltip)
          .on('click', (ev) => selectRadarAxis(i, ev));

        dot.transition().duration(840).ease(d3.easeCubicOut)
          .attr('cx', vx).attr('cy', vy).attr('r', i === chartUIState.radarActiveIdx ? 6.5 : 4.5);
        vertexDots.push(dot);
      });

      function updateReadout(idx) {
        const ax = axes[idx];
        const box = document.getElementById('wRadarReadout');
        if (!box || !ax) return;
        const gap = ax.score - 50;
        box.innerHTML = `
          <div class="min-w-0">
            <span class="font-heading font-bold text-[#0F6B4F]">${isBn ? ax.lblBn : ax.lblEn}:</span>
            <span class="text-[#2B352F] ml-1">${isBn ? ax.noteBn : ax.noteEn}</span>
          </div>
          <span class="shrink-0 font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-[#DCEFE5] text-[#0F6B4F]">${fmtNum(ax.score, state.lang)}/100 (+${fmtNum(gap, state.lang)})</span>
        `;
      }

      function selectRadarAxis(idx, ev) {
        chartUIState.radarActiveIdx = idx;
        const ax = axes[idx];
        spokeLines.forEach((ln, i) => ln.attr('stroke', i === idx ? '#0C6B58' : '#DCE4DE').attr('stroke-width', i === idx ? 2.2 : 1.2));
        labelEls.forEach((lb, i) => lb.style('fill', i === idx ? '#0C6B58' : '#111613'));
        vertexDots.forEach((dt, i) => dt.attr('r', i === idx ? 7 : 4.5).attr('fill', i === idx ? '#084B3E' : '#0F7A53'));
        updateReadout(idx);
        if (ev) {
          const gap = ax.score - 50;
          showChartTooltip(ev,
            `<div class="font-heading font-bold text-[#16211C] mb-0.5">${isBn ? ax.lblBn : ax.lblEn}</div>` +
            `<div class="font-extrabold text-[#0F6B4F]">${isBn ? 'বাংলাদেশ স্কোর' : 'Bangladesh Score'}: ${fmtNum(ax.score, state.lang)}/100</div>` +
            `<div class="text-[11px] text-[#5D6762]">${isBn ? 'বিশ্ব গড় (৫০%) থেকে' : 'vs World Avg (50%)'}: +${fmtNum(gap, state.lang)}%</div>` +
            `<div class="text-[11px] text-[#2B352F] mt-1">${isBn ? ax.noteBn : ax.noteEn}</div>`
          );
        }
      }

      updateReadout(chartUIState.radarActiveIdx);
      spokeLines[chartUIState.radarActiveIdx]?.attr('stroke', '#0C6B58').attr('stroke-width', 2);

      // Interactive Radar Legend Toggle Buttons
      const btnBd = document.getElementById('btnRadarToggleBd');
      const btnWd = document.getElementById('btnRadarToggleWorld');
      if (btnBd) {
        btnBd.classList.toggle('is-muted', !chartUIState.radarShowBd);
        btnBd.onclick = () => {
          chartUIState.radarShowBd = !chartUIState.radarShowBd;
          btnBd.classList.toggle('is-muted', !chartUIState.radarShowBd);
          bdPolyGroup.style('opacity', chartUIState.radarShowBd ? 1 : 0.14);
        };
      }
      if (btnWd) {
        btnWd.classList.toggle('is-muted', !chartUIState.radarShowWd);
        btnWd.onclick = () => {
          chartUIState.radarShowWd = !chartUIState.radarShowWd;
          btnWd.classList.toggle('is-muted', !chartUIState.radarShowWd);
          if (worldRingPoly) worldRingPoly.style('opacity', chartUIState.radarShowWd ? 1 : 0.12);
        };
      }
    }

    function renderWorldBarChart() {
      const isBn = state.lang === 'bn';
      ['mil', 'eco', 'agri', 'geo'].forEach(c => {
        const id = c === 'mil' ? 'btnWCatMil' : (c === 'eco' ? 'btnWCatEco' : (c === 'agri' ? 'btnWCatAgri' : 'btnWCatGeo'));
        document.getElementById(id)?.classList.toggle('active', state.worldBarCat === c);
      });

      const datasets = {
        mil: [
          { lblBn: 'গ্লোবাল ফায়ারপাওয়ার র্যাংক (GFP ২০২৬)', lblEn: 'Global Firepower Rank (2026)', bdBn: '৩৭তম / ১৪৫ দেশ (শীর্ষ ২৬%)', bdEn: '37th of 145 (Top 26%)', wdBn: 'বিশ্ব মধ্যম: ৭৩তম', wdEn: 'World Median: 73rd', pct: 75, color: '#0F7A53' },
          { lblBn: 'সক্রিয় সামরিক সদস্য (Active Force)', lblEn: 'Active Military Personnel', bdBn: 'প্রায় ১.৬–২.০ লক্ষ (বিশ্বে ৩০তম)', bdEn: '~160K–204K (30th in World)', wdBn: 'বিশ্ব গড়: ~১.১ লক্ষ', wdEn: 'Global Avg: ~110K', pct: 80, color: '#121714' },
          { lblBn: 'প্যারামিলিটারি ও সহায়ক বাহিনী (BGB, আনসার)', lblEn: 'Paramilitary & Auxiliary Depth', bdBn: 'বিশ্বে ২য় বৃহত্তম (ভারতের পরেই)', bdEn: '2nd Largest Globally (after India)', wdBn: 'ব্যাপক অভ্যন্তরীণ ও সীমান্ত সক্ষমতা', wdEn: 'Massive border & civil defense depth', pct: 96, color: '#B83B2A' },
          { lblBn: 'জাতিসংঘ শান্তিরক্ষা মিশন অবদান', lblEn: 'UN Peacekeeping Contribution', bdBn: 'বিশ্বের শীর্ষ ১–৩ দেশের একটি (১৯৮৮ থেকে)', bdEn: 'Top 1–3 Global Contributor (since 1988)', wdBn: 'বিশ্বব্যাপী শান্তিরক্ষায় অনন্য সুনাম', wdEn: 'Leading global peacekeeping partner', pct: 97, color: '#1F6A78' }
        ],
        eco: [
          { lblBn: 'নামমাত্র জিডিপি (IMF ২০২৬)', lblEn: 'Nominal GDP (IMF 2026)', bdBn: '$৫০৬ বিলিয়ন (বিশ্বে ৩৬তম)', bdEn: '$506 Billion (36th Globally)', wdBn: 'দক্ষিণ এশিয়ায় ২য় বৃহত্তম অর্থনীতি', wdEn: '2nd largest economy in South Asia', pct: 82, color: '#0F7A53' },
          { lblBn: 'ক্রয়ক্ষমতা সমতা (PPP GDP ২০২৬)', lblEn: 'PPP GDP (2026)', bdBn: '$১.৯ ট্রিলিয়ন (বিশ্বে ২৬তম)', bdEn: '$1.9 Trillion (26th Globally)', wdBn: 'শীর্ষ ৩০ বৈশ্বিক অর্থনীতির কাতারে', wdEn: 'Top-30 global purchasing power', pct: 87, color: '#121714' },
          { lblBn: 'তৈরি পোশাক (RMG) রপ্তানি', lblEn: 'Ready-Made Garment Exports', bdBn: 'বিশ্বে ২য় (চীনের পরেই)', bdEn: '2nd in World (behind only China)', wdBn: 'বৈশ্বিক ফ্যাশন সাপ্লাই চেইনের মূল স্তম্ভ', wdEn: 'Core pillar of global apparel supply', pct: 96, color: '#B83B2A' },
          { lblBn: 'মাথাপিছু জিডিপি (নমিনাল বনাম বিশ্ব)', lblEn: 'GDP per Capita (vs World Avg)', bdBn: '$২,৮৪১–$২,৮৯০ (১৪০তম)', bdEn: '$2,841–$2,890 (140th)', wdBn: 'উন্নয়নশীল বিশ্ব গড়: $৭,৭৫০', wdEn: 'Emerging World Avg: $7,750', pct: 38, color: '#C96A2B' }
        ],
        agri: [
          { lblBn: 'ইলিশ উৎপাদন (বিশ্বের মোট অংশ)', lblEn: 'Global Hilsa Production Share', bdBn: 'বিশ্বে ১ম (বিশ্বের প্রায় ৮৫% ইলিশ)', bdEn: '1st in World (~85% of global supply)', wdBn: 'একক আধিপত্য', wdEn: 'Global leader', pct: 98, color: '#0F7A53' },
          { lblBn: 'কাঁচা পাট রপ্তানি (সোনালি আঁশ)', lblEn: 'Raw Jute Exports', bdBn: 'বিশ্বে ১ম রপ্তানিকারক (উৎপাদনে ২য়)', bdEn: '1st Exporter (#2 Producer)', wdBn: 'বৈশ্বিক পাট বাণিজ্যে শীর্ষে', wdEn: 'Dominates global jute trade', pct: 96, color: '#1F6A78' },
          { lblBn: 'অভ্যন্তরীণ মুক্ত জলাশয়ে মাছ উৎপাদন', lblEn: 'Inland Capture Fisheries', bdBn: 'বিশ্বে ৩য় (চাষের মাছে ৫ম)', bdEn: '3rd in World (5th in Aquaculture)', wdBn: 'নদী-হাওরের বিশাল মৎস্যভাণ্ডার', wdEn: 'Vast river & haor fishery output', pct: 92, color: '#121714' },
          { lblBn: 'ধান/চাল ও সবজি উৎপাদন', lblEn: 'Rice & Vegetable Production', bdBn: 'চাল ও সবজিতে বিশ্বের শীর্ষ ৩–৪', bdEn: 'Top 3–4 Globally in Rice & Vegetables', wdBn: 'ক্ষুদ্র জমিতে সর্বোচ্চ খাদ্য উৎপাদনশীলতা', wdEn: 'Extraordinary yield per hectare', pct: 90, color: '#C96A2B' }
        ],
        geo: [
          { lblBn: 'জনসংখ্যার ঘনত্ব বনাম বিশ্ব গড়', lblEn: 'Population Density vs World Avg', bdBn: '~১,৩৩৩ জন/ব.কি.মি. (বিশ্ব গড়ের ২১.৫ গুণ)', bdEn: '~1,333/km² (21.5× World Avg)', wdBn: 'বিশ্ব গড়: ~৬২ জন/ব.কি.মি.', wdEn: 'World Average: ~62 / km²', pct: 98, color: '#B83B2A' },
          { lblBn: 'বৈশ্বিক ভূমির অংশ বনাম জনসংখ্যার অংশ', lblEn: 'Share of World Land vs Population', bdBn: 'ভূমি ০.১০% (#৯৩) · জনসংখ্যা ২.১৫% (#৮)', bdEn: '0.10% Land (#93) · 2.15% Pop (#8)', wdBn: 'বিশ্বে বিরল জনমিতিক অনুপাত', wdEn: 'Extreme land-to-people ratio', pct: 88, color: '#0F7A53' },
          { lblBn: 'জলবায়ু ঝুঁকি বনাম কার্বন নিঃসরণ', lblEn: 'Climate Risk vs CO₂ Emissions', bdBn: 'বৈশ্বিক CO₂ মাত্র <০.৩%, তবু ঝুঁকিতে শীর্ষ ৭–৯', bdEn: '<0.3% global CO₂, yet Top 7–9 most vulnerable', wdBn: 'জলবায়ু ন্যায্যতার সবচেয়ে বড় উদাহরণ', wdEn: 'Starkest global climate paradox', pct: 94, color: '#1F6A78' }
        ]
      };

      const rows = datasets[state.worldBarCat] || datasets.mil;
      const box = document.getElementById('wBarContent');
      box.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${rows.map((r, idx) => {
            const tip = `<div class='font-bold text-[#16211C] mb-1'>${isBn ? r.lblBn : r.lblEn}</div>` +
              `<div class='font-extrabold' style='color:${r.color}'>${isBn ? r.bdBn : r.bdEn}</div>` +
              `<div class='text-[11px] text-[#5D6762] mt-0.5'>${isBn ? r.wdBn : r.wdEn}</div>` +
              `<div class='text-[11px] font-bold text-[#0F6B4F] mt-1'>${isBn ? 'বৈশ্বিক সূচক' : 'Global Index'}: ${fmtNum(r.pct, state.lang)}/100</div>`;
            return `
              <div class="rounded-[22px] bg-white border border-[#E4E8E6] hover:border-[#0C6B58] p-4 sm:p-5 space-y-2.5 modern-lift cursor-pointer" data-tip-html="${tip.replace(/"/g, '&quot;')}">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="font-heading text-base font-bold text-[#16211C]">${isBn ? r.lblBn : r.lblEn}</h3>
                  <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full text-white shrink-0" style="background:${r.color}">${isBn ? r.bdBn : r.bdEn}</span>
                </div>
                <div class="relative w-full h-4 bg-[#E6EFEA] rounded-full overflow-hidden p-0.5">
                  <div class="benchmark-tick" style="left:50%" title="50% World Median"></div>
                  <div class="h-full rounded-full chart-anim-bar" style="background:${r.color};--bar-idx:${idx}" data-anim-width="${r.pct}%"></div>
                </div>
                <div class="flex items-center justify-between gap-2 text-xs">
                  <span class="text-[#5D6762] font-medium">${isBn ? r.wdBn : r.wdEn}</span>
                  <span class="font-extrabold text-[#16211C] shrink-0">${fmtNum(r.pct, state.lang)}/100</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
      animateBarsIn(box, true);
      bindTooltipElements(box);
    }

    function renderWorldMasterTable() {
      const isBn = state.lang === 'bn';
      const rows = [
        { catBn: 'মোট আয়তন', catEn: 'Total Area', bdBn: '১,৪৮,৪৬০ ব.কি.মি.', bdEn: '148,460 km²', wdBn: 'বিশ্বের ০.১০% স্থলভাগ', wdEn: '0.10% of world land', rnkBn: '৯৩–৯৪তম', rnkEn: '93rd–94th' },
        { catBn: 'জনসংখ্যা', catEn: 'Population', bdBn: '১৭.১৬+ কোটি (বিবিএস)', bdEn: '171.6M+ (BBS)', wdBn: 'বিশ্বের ~২.১৫% মানুষ', wdEn: '~2.15% of world pop', rnkBn: '৮ম', rnkEn: '8th' },
        { catBn: 'জনঘনত্ব', catEn: 'Density', bdBn: '~১,৩৩৩ জন/ব.কি.মি.', bdEn: '~1,333 / km²', wdBn: 'বিশ্ব গড়: ~৬২ জন/ব.কি.মি.', wdEn: 'World avg: ~62 / km²', rnkBn: 'শীর্ষ ১০ (বৃহৎ দেশে #১)', rnkEn: 'Top 10 (#1 large)' },
        { catBn: 'নমিনাল জিডিপি', catEn: 'Nominal GDP', bdBn: '$৫০৬ বিলিয়ন (২০২৬)', bdEn: '$506B (2026 est.)', wdBn: 'বিশ্ব জিডিপি: ~$১২৮ ট্রিলিয়ন', wdEn: 'World GDP: ~$128T', rnkBn: '৩৬তম (PPP ২৬তম)', rnkEn: '36th (26th PPP)' },
        { catBn: 'সামরিক শক্তি', catEn: 'Military Power', bdBn: 'সক্রিয় ~১.৬–২ লক্ষ + প্যারামিলিটারি #২', bdEn: '~160–204K active + #2 paramilitary', wdBn: '১৪৫ দেশের GFP সূচক', wdEn: 'GFP 145-nation index', rnkBn: '৩৭তম (২০২৬)', rnkEn: '37th (2026)' },
        { catBn: 'জাতিসংঘ শান্তিরক্ষা', catEn: 'UN Peacekeeping', bdBn: 'শীর্ষ সেনা ও পুলিশ প্রেরণকারী', bdEn: 'Top troop & police contributor', wdBn: '১২০+ অংশগ্রহণকারী দেশ', wdEn: '120+ participating nations', rnkBn: 'শীর্ষ ১–৩', rnkEn: 'Top 1–3' },
        { catBn: 'গড় আয়ু', catEn: 'Life Expectancy', bdBn: '৭৪.৭ বছর (UNDP ২০২৫)', bdEn: '74.7 yrs (UNDP 2025)', wdBn: 'বিশ্ব গড়: ~৭৩.৩ বছর', wdEn: 'World avg: ~73.3 yrs', rnkBn: 'বিশ্ব গড়ের ওপরে', rnkEn: 'Above World Avg' },
        { catBn: 'মানব উন্নয়ন (HDI)', catEn: 'HDI Score', bdBn: '০.৬৮৫ (মধ্যম থেকে উচ্চমুখী)', bdEn: '0.685 (Medium-High)', wdBn: 'বিশ্ব গড়: ০.৭৫২', wdEn: 'World avg: 0.752', rnkBn: '১৩০তম / ১৯৩ দেশ', rnkEn: '130th / 193' },
        { catBn: 'পোশাক ও খাদ্য', catEn: 'RMG & Food', bdBn: 'পোশাক #২ · ইলিশ #১ · চাল #৩–৪', bdEn: 'RMG #2 · Hilsa #1 · Rice #3–4', wdBn: 'বৈশ্বিক রপ্তানি ও খাদ্য শক্তি', wdEn: 'Global export & agri force', rnkBn: 'শীর্ষ ১–৪', rnkEn: 'Top 1–4' },
        { catBn: 'কার্বন বনাম জলবায়ু ঝুঁকি', catEn: 'CO₂ vs Climate Risk', bdBn: 'CO₂ নিঃসরণ <০.৩%', bdEn: 'CO₂ share <0.3%', wdBn: 'জলবায়ু ক্ষতিগ্রস্ত শীর্ষ ৭–৯', wdEn: 'Top 7–9 climate vulnerable', rnkBn: 'উচ্চ ঝুঁকি', rnkEn: 'High Risk' }
      ];

      document.getElementById('wMasterTableWrap').innerHTML = `
        <table class="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="bg-[#F1F4EE] text-[#16211C] border-b border-[#E4E8E6]">
              <th class="py-3.5 px-4 font-heading font-bold">${isBn ? 'খাত / সূচক' : 'Dimension'}</th>
              <th class="py-3.5 px-4 font-heading font-bold text-[#0F6B4F]">${isBn ? 'বাংলাদেশ' : 'Bangladesh'}</th>
              <th class="py-3.5 px-4 font-heading font-bold text-[#5D6762]">${isBn ? 'বিশ্বের তুলনা' : 'World Benchmark'}</th>
              <th class="py-3.5 px-4 font-heading font-bold text-[#16211C]">${isBn ? 'বৈশ্বিক অবস্থান' : 'Global Rank'}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#EAECE6] bg-white">
            ${rows.map(r => `
              <tr>
                <td class="py-3 px-4 font-bold text-[#16211C]">${isBn ? r.catBn : r.catEn}</td>
                <td class="py-3 px-4 font-semibold text-[#0F6B4F]">${isBn ? r.bdBn : r.bdEn}</td>
                <td class="py-3 px-4 text-[#2B352F]">${isBn ? r.wdBn : r.wdEn}</td>
                <td class="py-3 px-4"><span class="micro-pill bg-[#E6EFEA] text-[#16211C]">${isBn ? r.rnkBn : r.rnkEn}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
