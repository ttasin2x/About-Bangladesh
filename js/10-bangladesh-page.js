    // =========================================================================
    // PAGE 6: BANGLADESH NATIONAL PROFILE (LAND, WATER, BORDERS, MARITIME EEZ)
    // =========================================================================
    function renderBangladeshPage() {
      const isBn = state.lang === 'bn';
      const setT = (id, bn, en) => { const el = document.getElementById(id); if (el) el.textContent = isBn ? bn : en; };

      setT('bdHeroTag', 'পৃষ্ঠা ৬ · গণপ্রজাতন্ত্রী বাংলাদেশ', 'PAGE 6 · PEOPLE’S REPUBLIC OF BANGLADESH');
      setT('bdHeroTitle', 'বাংলাদেশের ভূমি, জলভাগ, আন্তর্জাতিক সীমান্ত ও সমুদ্রসীমা', 'Bangladesh: Land, Water, Borders & Legal Sea Resources');
      setT('bdHeroDesc', 'মোট আয়তন, স্থলভাগ ও জলভাগের অনুপাত, আয়তনে বিশ্বে অবস্থান, ভারত ও মিয়ানমারের সাথে দিকভিত্তিক সীমান্তের নাম এবং বঙ্গোপসাগরে তেল-গ্যাস ও সমুদ্রসম্পদের আইনি সীমা।',
        'Verified total land and inland water area, world ranking, directional borders with Indian & Myanmar states, and UNCLOS nautical-mile legal rights for offshore oil & gas.');

      setT('bdAreaEyebrow', 'আয়তন ও বৈশ্বিক অবস্থান', 'AREA & WORLD RANKING');
      setT('bdAreaTitle', 'স্থলভাগ, অভ্যন্তরীণ জলভাগ ও বিশ্বে বাংলাদেশের অবস্থান', 'Land Area, Water Area & Global Ranking');
      setT('bdBorderEyebrow', 'আন্তর্জাতিক সীমান্ত · ৫,১৩৮ কি.মি. (বিশ্বে ৪২তম)', 'INTERNATIONAL BORDERS · 5,138 KM (42ND IN WORLD)');
      setT('bdBorderTitle', 'কোন দিকে কোন দেশ ও কোন রাজ্যের সাথে বাংলাদেশের সীমান্ত', 'Borders by Direction & Exact Neighboring Regions');
      setT('bdSeaEyebrow', 'সমুদ্রসীমা ও আইনি অধিকার (UNCLOS · ITLOS · PCA)', 'MARITIME ZONES & LEGAL RIGHTS (UNCLOS)');
      setT('bdSeaTitle', 'বঙ্গোপসাগরে বাংলাদেশের সমুদ্র আয়তন ও তেল-গ্যাস উত্তোলনের আইনি সীমা', 'Sea Area & Legal Nautical Miles for Oil, Gas & Resources');

      // Hero KPI Tiles
      const kpis = [
        { lblBn: 'মোট আয়তন', lblEn: 'Total Area', valBn: '১,৪৮,৪৬০ ব.কি.মি.', valEn: '148,460 km²', subBn: 'সরকারি দলিলে ১,৪৭,৫৭০ ব.কি.মি.', subEn: 'BBS survey: 147,570 km²', accent: '#0F7A53' },
        { lblBn: 'বৈশ্বিক র্যাংকিং', lblEn: 'World Rankings', valBn: '৯৩–৯৪তম', valEn: '93rd–94th', subBn: 'সীমান্তে ৪২তম · জলসীমায় ৩৯তম', subEn: 'Border 42nd · Water 39th', accent: '#111613' },
        { lblBn: 'মোট আন্তর্জাতিক সীমানা', lblEn: 'Total Boundary', valBn: '৫,১৩৮ কি.মি.', valEn: '5,138 km', subBn: 'ভারত ৪,১৫৬ · মিয়ানমার ২৭১ · উপকূল ৭১১ কি.মি.', subEn: 'India 4,156 · Myanmar 271 · Coast 711 km', accent: '#0F7A53' },
        { lblBn: 'নিশ্চিত সমুদ্রসীমা', lblEn: 'Maritime Area', valBn: '১,১৮,৮১৩ ব.কি.মি.', valEn: '118,813 km²', subBn: 'EEZ ২০০ ও মহীসোপান ৩৫৪ নটিক্যাল মাইল', subEn: '200 NM EEZ · 354 NM Shelf', accent: '#1F6A78' }
      ];
      document.getElementById('bdHeroKpis').innerHTML = kpis.map(k => `
        <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4">
          <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? k.lblBn : k.lblEn}</div>
          <div class="font-heading text-lg sm:text-xl font-extrabold mt-1" style="color:${k.accent}">${isBn ? k.valBn : k.valEn}</div>
          <div class="text-[11px] text-[#5D6762] mt-1">${isBn ? k.subBn : k.subEn}</div>
        </div>
      `).join('');

      // Section 1: Land vs Water Breakdown + Visual Bar
      document.getElementById('bdAreaBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? 'স্থলভাগ (Land Area)' : 'Land Area'}</span>
              <span class="font-heading text-lg font-extrabold text-[#0F6B4F]">${isBn ? '৮৭.৭%' : '87.7%'}</span>
            </div>
            <div class="font-heading text-2xl font-extrabold text-[#16211C]">${isBn ? '১,৩০,১৭০ বর্গ কি.মি.' : '130,170 km²'}</div>
            <p class="text-xs text-[#2B352F] mt-2 leading-relaxed">${isBn ? 'নদীমাতৃক উর্বর পলিমাটির সমভূমি, বরেন্দ্র ও মধুপুর গড় এবং দক্ষিণ-পূর্বাঞ্চলের পাহাড়ি অঞ্চল নিয়ে গঠিত।' : 'Composed of fertile alluvial delta plains, Barind & Madhupur terraces, and southeastern hills.'}</p>
          </div>
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="micro-pill bg-[#DDF0F3] text-[#1F6A78]">${isBn ? 'জলভাগ (Water Area)' : 'Inland Water Area'}</span>
              <span class="font-heading text-lg font-extrabold text-[#1F6A78]">${isBn ? '১২.৩%' : '12.3%'}</span>
            </div>
            <div class="font-heading text-2xl font-extrabold text-[#16211C]">${isBn ? '১৮,২৯০ বর্গ কি.মি.' : '18,290 km²'}</div>
            <p class="text-xs text-[#2B352F] mt-2 leading-relaxed">${isBn ? 'পদ্মা, মেঘনা, যমুনা, ব্রহ্মপুত্রসহ শত শত নদ-নদী, হাওর, বাঁওড়, বিল ও কাপ্তাই হ্রদ এই অভ্যন্তরীণ জলভাগের অন্তর্ভুক্ত।' : 'Encompasses the Padma, Jamuna, Meghna river systems, vast haors, beels, and Kaptai Lake.'}</p>
          </div>
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="micro-pill bg-[#121714] text-white">${isBn ? 'বিশ্বে অবস্থান' : 'Global Rank'}</span>
              <span class="font-heading text-lg font-extrabold text-[#16211C]">${isBn ? '৯৩তম' : '#93'}</span>
            </div>
            <div class="font-heading text-2xl font-extrabold text-[#16211C]">${isBn ? 'বিশ্বের ৯৩তম বৃহৎ দেশ' : '93rd Largest Country'}</div>
            <p class="text-xs text-[#2B352F] mt-2 leading-relaxed">${isBn ? 'আয়তনে বিশ্বে ৯৩তম (কিছু পুরনো তালিকায় ৯৪তম), স্থলভাগের হিসাবে ৯২–৯৪তম এবং জনসংখ্যার দিক থেকে বিশ্বে ৮ম বৃহত্তম দেশ।' : 'Ranked 93rd globally by total area (94th in older 147,570 km² tables) and 8th most populous nation worldwide.'}</p>
          </div>
        </div>

        <!-- Visual Land vs Water Ratio Bar -->
        <div class="rounded-[20px] bg-[#F3F5F0] border border-[#E4E8E6] p-4 space-y-2">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
            <span class="text-[#0F6B4F]">${isBn ? 'স্থলভাগ: ১,৩০,১৭০ ব.কি.মি. (৮৭.৭%)' : 'Land: 130,170 km² (87.7%)'}</span>
            <span class="text-[#1F6A78]">${isBn ? 'অভ্যন্তরীণ জলভাগ: ১৮,২৯০ ব.কি.মি. (১২.৩%)' : 'Water: 18,290 km² (12.3%)'}</span>
          </div>
          <div class="w-full h-6 rounded-full overflow-hidden flex bg-white border border-[#E4E8E6] p-0.5 gap-0.5">
            <div class="h-full rounded-l-full chart-anim-bar chart-seg-interactive" style="background:#0F7A53;--bar-idx:0" data-anim-width="87.7%" data-tip-html="<div class='font-bold text-[#0F6B4F]'>${isBn ? 'স্থলভাগ (Land)' : 'Land Area'}</div><div class='font-extrabold text-[#16211C]'>${isBn ? '১,৩০,১৭০ ব.কি.মি. (৮৭.৭%)' : '130,170 km² (87.7%)'}</div>"></div>
            <div class="h-full rounded-r-full chart-anim-bar chart-seg-interactive" style="background:#1F6A78;--bar-idx:1" data-anim-width="12.3%" data-tip-html="<div class='font-bold text-[#1F6A78]'>${isBn ? 'অভ্যন্তরীণ জলভাগ (Water)' : 'Inland Water'}</div><div class='font-extrabold text-[#16211C]'>${isBn ? '১৮,২৯০ ব.কি.মি. (১২.৩%)' : '18,290 km² (12.3%)'}</div>"></div>
          </div>
        </div>
      `;

      // Section 2: Directional Borders + Neighboring States/Places
      const borders = [
        {
          dirBn: 'পশ্চিম দিক (West)', dirEn: 'West Side',
          countryBn: 'ভারত', countryEn: 'India',
          placesBn: 'পশ্চিমবঙ্গ রাজ্য (West Bengal)', placesEn: 'West Bengal State',
          lenBn: 'প্রায় ২,২১৭ কি.মি. (দীর্ঘতম অংশ)', lenEn: '~2,217 km (Longest segment)',
          descBn: 'সাতক্ষীরা, যশোর, চুয়াডাঙ্গা, মেহেরপুর, কুষ্টিয়া, রাজশাহী, চাঁপাইনবাবগঞ্জ, নওগাঁ, জয়পুরহাট, দিনাজপুর, ঠাকুরগাঁও ও পঞ্চগড় জেলার পশ্চিম সীমান্তজুড়ে ভারতের পশ্চিমবঙ্গ রাজ্য অবস্থিত।',
          descEn: 'Runs along western districts from Satkhira, Jashore, and Rajshahi up to Dinajpur, Thakurgaon, and Panchagarh.',
          color: '#0F7A53'
        },
        {
          dirBn: 'উত্তর দিক (North)', dirEn: 'North Side',
          countryBn: 'ভারত', countryEn: 'India',
          placesBn: 'পশ্চিমবঙ্গ (উত্তরবঙ্গ), আসাম ও মেঘালয় রাজ্য', placesEn: 'West Bengal (North), Assam & Meghalaya',
          lenBn: 'উত্তরাঞ্চলীয় সীমান্ত', lenEn: 'Northern border belt',
          descBn: 'পঞ্চগড়, নীলফামারী, লালমনিরহাট ও কুড়িগ্রামের উত্তরে ভারতের পশ্চিমবঙ্গ ও আসাম; আর জামালপুর, শেরপুর, ময়মনসিংহ, নেত্রকোণা, সুনামগঞ্জ ও সিলেটের উত্তরে মেঘালয়ের গারো-খাসি-জয়ন্তিয়া পাহাড়।',
          descEn: 'Borders northern West Bengal & Assam above Rangpur Division, and Meghalaya’s Garo-Khasi-Jaintia hills above Mymensingh & Sylhet.',
          color: '#0F7A53'
        },
        {
          dirBn: 'পূর্ব দিক (East)', dirEn: 'East Side',
          countryBn: 'ভারত', countryEn: 'India',
          placesBn: 'আসাম (বরাক উপত্যকা), ত্রিপুরা ও মিজোরাম রাজ্য', placesEn: 'Assam (Barak Valley), Tripura & Mizoram',
          lenBn: 'পূর্বাঞ্চলীয় সীমান্ত', lenEn: 'Eastern border belt',
          descBn: 'সিলেট ও মৌলভীবাজারের পূর্বে আসাম; হবিগঞ্জ, ব্রাহ্মণবাড়িয়া, কুমিল্লা, ফেনী, চট্টগ্রাম ও খাগড়াছড়ির পূর্বে ত্রিপুরা; এবং রাঙামাটির পূর্বে ভারতের মিজোরাম রাজ্য অবস্থিত।',
          descEn: 'Borders Assam east of Sylhet, Tripura east of Cumilla-Brahmanbaria-Feni-Khagrachhari, and Mizoram east of Rangamati.',
          color: '#0F7A53'
        },
        {
          dirBn: 'দক্ষিণ-পূর্ব দিক (Southeast)', dirEn: 'Southeast Side',
          countryBn: 'মিয়ানমার', countryEn: 'Myanmar',
          placesBn: 'রাখাইন রাজ্য (Rakhine) ও চিন রাজ্য (Chin State)', placesEn: 'Rakhine State & Chin State',
          lenBn: '২৭১ কি.মি.', lenEn: '271 km',
          descBn: 'বান্দরবান (নাইক্ষ্যংছড়ি-থানচি) ও কক্সবাজার (উখিয়া-টেকনাফ ও নাফ নদী) সীমান্তজুড়ে মিয়ানমারের চিন ও রাখাইন রাজ্য অবস্থিত।',
          descEn: 'Stretches 271 km across hilly Bandarban and the Naf River in Cox’s Bazar bordering Myanmar’s Chin and Rakhine states.',
          color: '#B83B2A'
        },
        {
          dirBn: 'দক্ষিণ দিক (South)', dirEn: 'South Side',
          countryBn: 'বঙ্গোপসাগর', countryEn: 'Bay of Bengal',
          placesBn: 'উন্মুক্ত সমুদ্র উপকূলরেখা (সুন্দরবন থেকে সেন্ট মার্টিন)', placesEn: 'Open Coastline (Sundarbans to St. Martin’s)',
          lenBn: '৫৮০ কি.মি. উপকূলরেখা', lenEn: '580 km coastline',
          descBn: 'দক্ষিণে কোনো স্থলসীমান্ত নেই—পুরো দক্ষিণাংশজুড়ে রয়েছে বঙ্গোপসাগরের ৫৮০ কি.মি. উপকূল ও বিশাল সমুদ্রসম্পদ।',
          descEn: 'No land border in the south—opens directly onto the Bay of Bengal across a 580 km coastline.',
          color: '#1F6A78'
        }
      ];

      const BORDER_ZONES = [
        {
          id: 'all', labelBn: 'সব সীমান্ত', labelEn: 'All Borders', color: '#121714',
          sideBn: 'চারপাশের সম্পূর্ণ সীমানা', sideEn: 'Complete Surroundings',
          infoBn: 'উত্তর, পশ্চিম ও পূর্বে ভারতের ৫টি রাজ্য (৪,১৫৬ কি.মি.), দক্ষিণ-পূর্বে মিয়ানমার (২৭১ কি.মি.) এবং দক্ষিণে বঙ্গোপসাগর (৭১১ কি.মি. উপকূলরেখা)। যেকোনো রাজ্যে ক্লিক করলে সংশ্লিষ্ট বাংলাদেশি সীমান্ত জেলাগুলো চিহ্নিত হবে।',
          infoEn: 'India’s 5 states on West, North & East (4,156 km), Myanmar on the Southeast (271 km), and Bay of Bengal on the South (711 km coastline). Click any region to highlight touching districts.',
          dists: []
        },
        {
          id: 'wb', labelBn: 'পশ্চিমবঙ্গ (ভারত)', labelEn: 'West Bengal (India)', color: '#0F7A53',
          sideBn: 'পশ্চিম ও উত্তর-পশ্চিম · ~২,২১৭ কি.মি.', sideEn: 'West & NW · ~2,217 km',
          infoBn: 'বাংলাদেশের দীর্ঘতম সীমান্ত অংশ—সাতক্ষীরা, যশোর, চুয়াডাঙ্গা, মেহেরপুর, কুষ্টিয়া, রাজশাহী, চাঁপাইনবাবগঞ্জ, নওগাঁ, জয়পুরহাট, দিনাজপুর, ঠাকুরগাঁও, পঞ্চগড়, নীলফামারী ও লালমনিরহাট জেলার সাথে সংযুক্ত।',
          infoEn: 'Longest border segment touching Satkhira, Jashore, Chuadanga, Meherpur, Kushtia, Rajshahi, Chapai Nawabganj, Naogaon, Joypurhat, Dinajpur, Thakurgaon, Panchagarh, Nilphamari & Lalmonirhat.',
          dists: ['satkhira','jashore','chuadanga','meherpur','kushtia','rajshahi','chapai_nawabganj','naogaon','joypurhat','dinajpur','thakurgaon','panchagarh','nilphamari','lalmonirhat','jhenaidah'],
          badgePos: [-45, 360], arrowTo: [130, 390]
        },
        {
          id: 'meghalaya', labelBn: 'মেঘালয় (ভারত)', labelEn: 'Meghalaya (India)', color: '#1E824C',
          sideBn: 'উত্তর দিক (গারো-খাসি পাহাড়)', sideEn: 'North (Garo-Khasi Hills)',
          infoBn: 'জামালপুর, শেরপুর, ময়মনসিংহ, নেত্রকোণা, সুনামগঞ্জ ও সিলেট জেলার উত্তর সীমান্তে ভারতের মেঘালয় রাজ্য অবস্থিত।',
          infoEn: 'Borders the northern frontier of Jamalpur, Sherpur, Mymensingh, Netrokona, Sunamganj & Sylhet.',
          dists: ['jamalpur','sherpur','mymensingh','netrokona','sunamganj','sylhet'],
          badgePos: [380, 145], arrowTo: [370, 265]
        },
        {
          id: 'assam', labelBn: 'আসাম (ভারত)', labelEn: 'Assam (India)', color: '#2D8A68',
          sideBn: 'উত্তর-পশ্চিম ও উত্তর-পূর্ব দিক', sideEn: 'North & Northeast',
          infoBn: 'কুড়িগ্রামের উত্তরে আসামের ধুবড়ি-দক্ষিণ শালমারা এবং সিলেট-মৌলভীবাজারের পূর্বে আসামের বরাক উপত্যকা (করিমগঞ্জ-কাছাড়) সংযুক্ত।',
          infoEn: 'Touches Kurigram in the north and Sylhet & Moulvibazar along Assam’s Barak Valley in the northeast.',
          dists: ['kurigram','sylhet','moulvibazar'],
          badgePos: [610, 230], arrowTo: [500, 315]
        },
        {
          id: 'tripura', labelBn: 'ত্রিপুরা (ভারত)', labelEn: 'Tripura (India)', color: '#C96A2B',
          sideBn: 'পূর্ব দিক', sideEn: 'East Side',
          infoBn: 'মৌলভীবাজার, হবিগঞ্জ, ব্রাহ্মণবাড়িয়া, কুমিল্লা, ফেনী, চট্টগ্রাম ও খাগড়াছড়ির পূর্ব সীমান্তজুড়ে ভারতের ত্রিপুরা রাজ্য অবস্থিত।',
          infoEn: 'Runs along the eastern edge of Moulvibazar, Habiganj, Brahmanbaria, Cumilla, Feni, Chattogram & Khagrachhari.',
          dists: ['moulvibazar','habiganj','brahmanbaria','cumilla','feni','chattogram','khagrachhari'],
          badgePos: [625, 485], arrowTo: [475, 505]
        },
        {
          id: 'mizoram', labelBn: 'মিজোরাম (ভারত)', labelEn: 'Mizoram (India)', color: '#8A631D',
          sideBn: 'পূর্ব / দক্ষিণ-পূর্ব দিক', sideEn: 'East-Southeast',
          infoBn: 'রাঙামাটি পার্বত্য জেলার পূর্ব সীমান্তে ভারতের মিজোরাম রাজ্য অবস্থিত (বাংলাদেশ-ভারত-মিয়ানমার ত্রি-সীমান্ত)।',
          infoEn: 'Borders eastern Rangamati Hill District down to the Bangladesh-India-Myanmar tri-junction.',
          dists: ['rangamati'],
          badgePos: [665, 635], arrowTo: [545, 650]
        },
        {
          id: 'myanmar', labelBn: 'মিয়ানমার (রাখাইন ও চিন)', labelEn: 'Myanmar (Rakhine & Chin)', color: '#B83B2A',
          sideBn: 'দক্ষিণ-পূর্ব · ২৭১ কি.মি.', sideEn: 'Southeast · 271 km',
          infoBn: 'বান্দরবান ও কক্সবাজার (নাফ নদী-টেকনাফ) জেলার দক্ষিণ-পূর্ব সীমান্তে মিয়ানমারের চিন ও রাখাইন রাজ্য অবস্থিত।',
          infoEn: '271 km border along Bandarban and Cox’s Bazar (Naf River) adjacent to Myanmar’s Chin and Rakhine states.',
          dists: ['bandarban','coxs_bazar'],
          badgePos: [645, 790], arrowTo: [535, 765]
        },
        {
          id: 'bay', labelBn: 'বঙ্গোপসাগর', labelEn: 'Bay of Bengal', color: '#1F6A78',
          sideBn: 'দক্ষিণ দিক · ৭১১ কি.মি. উপকূলরেখা', sideEn: 'South · 711 km Coastline',
          infoBn: 'দক্ষিণে কোনো স্থলসীমান্ত নেই—সাতক্ষীরা, খুলনা, বাগেরহাট, বরগুনা, পটুয়াখালী, ভোলা, নোয়াখালী, চট্টগ্রাম ও কক্সবাজার উপকূল সরাসরি বঙ্গোপসাগরের সাথে যুক্ত।',
          infoEn: 'Open southern maritime boundary stretching across Satkhira, Khulna, Bagerhat, Barguna, Patuakhali, Bhola, Noakhali, Chattogram & Cox’s Bazar.',
          dists: ['satkhira','khulna','bagerhat','barguna','patuakhali','bhola','noakhali','chattogram','coxs_bazar'],
          badgePos: [275, 865], arrowTo: [275, 745]
        }
      ];

      document.getElementById('bdBorderBody').innerHTML = `
        <!-- Interactive Border Map with All Neighboring States & Myanmar Marked -->
        <div class="rounded-[24px] bg-[#EDF4EF] border border-[#D8E5DC] p-4 sm:p-5 space-y-3.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div class="text-xs font-bold text-[#0F6B4F]">${isBn ? 'ইন্টারেক্টিভ সীমান্ত মানচিত্র' : 'INTERACTIVE BORDER MAP'}</div>
              <div class="text-xs text-[#5D6762]">${isBn ? 'যেকোনো প্রতিবেশী রাজ্য বা মিয়ানমারে ক্লিক করলে বাংলাদেশের কোন জেলাগুলোর সাথে সীমান্ত লেগেছে তা চিহ্নিত হবে' : 'Click any neighboring state or Myanmar to highlight the exact Bangladeshi border districts'}</div>
            </div>
          </div>

          <div id="bdBorderFilterPills" class="flex flex-wrap gap-1.5">
            ${BORDER_ZONES.map(z => `
              <button type="button" data-bzone="${z.id}"
                class="px-3 py-1.5 rounded-full text-xs font-bold border transition ${state.activeBorderZone === z.id ? 'text-white border-transparent' : 'bg-white text-[#16211C] border-[#D8E5DC] hover:border-[#0F6B4F]'}"
                style="${state.activeBorderZone === z.id ? `background:${z.color}` : ''}">
                ${isBn ? z.labelBn : z.labelEn}
              </button>
            `).join('')}
          </div>

          <div class="w-full bg-[#F7FAF8] rounded-[20px] border border-[#D8E5DC] p-2 sm:p-3 overflow-hidden">
            <svg id="bdBorderMapSvg" class="w-full h-[420px] sm:h-[520px] select-none" viewBox="-155 -20 935 950" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Bangladesh International Border Map with Neighboring States"></svg>
          </div>

          <div id="bdBorderActiveCaption" class="rounded-2xl bg-white border border-[#DCE6DF] px-4 py-3 text-xs sm:text-sm text-[#16211C] leading-relaxed"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${borders.map(b => `
            <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 modern-lift space-y-2.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xs font-extrabold px-3 py-1 rounded-full text-white" style="background:${b.color}">${isBn ? b.dirBn : b.dirEn}</span>
                <span class="micro-pill">${isBn ? b.lenBn : b.lenEn}</span>
              </div>
              <div>
                <div class="text-xs font-bold text-[#5D6762]">${isBn ? 'সীমান্তবর্তী দেশ:' : 'Bordering:'} <strong class="text-[#16211C]">${isBn ? b.countryBn : b.countryEn}</strong></div>
                <h3 class="font-heading text-lg font-bold text-[#16211C] mt-0.5">${isBn ? b.placesBn : b.placesEn}</h3>
              </div>
              <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">${isBn ? b.descBn : b.descEn}</p>
            </div>
          `).join('')}
        </div>
      `;

      // Section 3: Sea Area & Legal Nautical Miles for Oil, Gas & Resources

      function drawBorderMap() {
        const activeZ = BORDER_ZONES.find(z => z.id === state.activeBorderZone) || BORDER_ZONES[0];
        const cap = document.getElementById('bdBorderActiveCaption');
        if (cap) {
          cap.innerHTML = `<strong style="color:${activeZ.color}">${isBn ? activeZ.labelBn : activeZ.labelEn} (${isBn ? activeZ.sideBn : activeZ.sideEn}):</strong> ${isBn ? activeZ.infoBn : activeZ.infoEn}`;
        }
        if (typeof d3 === 'undefined') return;
        const svg = d3.select('#bdBorderMapSvg');
        svg.selectAll('*').remove();

        // Bay of Bengal subtle wave water backdrop at bottom
        svg.append('rect').attr('x', -155).attr('y', 715).attr('width', 935).attr('height', 215)
          .attr('fill', state.activeBorderZone === 'bay' ? 'rgba(31, 106, 120, 0.16)' : 'rgba(31, 106, 120, 0.08)');

        // Compass N/S/E/W subtle markers
        const compass = [
          { x: 300, y: 12, t: isBn ? 'উত্তর (N)' : 'NORTH' },
          { x: 300, y: 912, t: isBn ? 'দক্ষিণ (S)' : 'SOUTH' },
          { x: -115, y: 460, t: isBn ? 'পশ্চিম (W)' : 'WEST' },
          { x: 735, y: 460, t: isBn ? 'পূর্ব (E)' : 'EAST' }
        ];
        compass.forEach(c => {
          svg.append('text').attr('x', c.x).attr('y', c.y).attr('text-anchor', 'middle')
            .style('font-size', '12px').style('font-weight', '800').style('fill', '#7D8B82').style('letter-spacing', '0.06em')
            .text(c.t);
        });

        // Build district-to-border-color map for 'all' view
        const allDistColor = {};
        ['wb','meghalaya','assam','tripura','mizoram','myanmar','bay'].forEach(zid => {
          const z = BORDER_ZONES.find(item => item.id === zid);
          if (z) z.dists.forEach(did => { if (!allDistColor[did]) allDistColor[did] = z.color; });
        });

        // Draw all 64 districts
        svg.append('g').selectAll('path')
          .data(MAP_FEATURES)
          .enter()
          .append('path')
          .attr('d', d => d.d)
          .attr('fill', d => {
            if (state.activeBorderZone === 'all') {
              return allDistColor[d.distId] ? allDistColor[d.distId] : '#DCE6DF';
            }
            return activeZ.dists.includes(d.distId) ? activeZ.color : '#E1E9E3';
          })
          .attr('fill-opacity', d => {
            if (state.activeBorderZone === 'all') return allDistColor[d.distId] ? 0.78 : 0.65;
            return activeZ.dists.includes(d.distId) ? 0.95 : 0.48;
          })
          .attr('stroke', '#FFFFFF')
          .attr('stroke-width', d => (state.activeBorderZone !== 'all' && activeZ.dists.includes(d.distId)) ? 1.5 : 0.8);

        // Draw directional dotted pointer arrows + clickable state badges around Bangladesh
        const neighborZones = BORDER_ZONES.filter(z => z.badgePos);
        neighborZones.forEach(z => {
          const isFocus = state.activeBorderZone === 'all' || state.activeBorderZone === z.id;
          const [bx, by] = z.badgePos;
          const [tx, ty] = z.arrowTo;

          // Dotted connector line
          svg.append('line')
            .attr('x1', bx).attr('y1', by).attr('x2', tx).attr('y2', ty)
            .attr('stroke', z.color)
            .attr('stroke-width', isFocus ? 2.4 : 1.2)
            .attr('stroke-dasharray', '5 5')
            .attr('opacity', isFocus ? 0.9 : 0.25);

          svg.append('circle')
            .attr('cx', tx).attr('cy', ty).attr('r', isFocus ? 5 : 3)
            .attr('fill', z.color).attr('stroke', '#FFFFFF').attr('stroke-width', 1.5)
            .attr('opacity', isFocus ? 1 : 0.3);

          // Clickable State Pill Badge
          const txt = isBn ? z.labelBn : z.labelEn;
          const pw = Math.max(122, txt.length * 8.2 + 24);
          const ph = 32;
          const bg = svg.append('g')
            .attr('transform', `translate(${bx},${by})`)
            .style('cursor', 'pointer')
            .attr('opacity', isFocus ? 1 : 0.42)
            .on('click', () => {
              state.activeBorderZone = state.activeBorderZone === z.id ? 'all' : z.id;
              renderBangladeshPage();
            });

          bg.append('rect')
            .attr('x', -pw / 2).attr('y', -ph / 2)
            .attr('width', pw).attr('height', ph).attr('rx', 16)
            .attr('fill', state.activeBorderZone === z.id ? z.color : '#FFFFFF')
            .attr('stroke', z.color)
            .attr('stroke-width', state.activeBorderZone === z.id ? 2 : 1.5);

          bg.append('text')
            .attr('text-anchor', 'middle').attr('y', 5)
            .style('font-family', "'HindSiliguri', 'NotoSansBengali', sans-serif")
            .style('font-size', '13px').style('font-weight', '700')
            .style('fill', state.activeBorderZone === z.id ? '#FFFFFF' : '#111613')
            .text(txt);
        });
      }

      drawBorderMap();
      document.querySelectorAll('#bdBorderFilterPills button[data-bzone]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.activeBorderZone = btn.dataset.bzone;
          renderBangladeshPage();
        });
      });

      const seaZones = [
        {
          nmBn: '১২ নটিক্যাল মাইল', nmEn: '12 Nautical Miles',
          kmBn: '(~২২.২ কি.মি.)', kmEn: '(~22.2 km)',
          titleBn: 'রাষ্ট্রীয় সমুদ্রসীমা (Territorial Sea)', titleEn: 'Territorial Sea',
          rightsBn: 'পানি, সমুদ্রতল, খনিজ ও আকাশসীমার ওপর বাংলাদেশের পূর্ণ সার্বভৌমত্ব। বিদেশি জাহাজ কেবল শান্তিপূর্ণ চলাচলের (Innocent Passage) অনুমতি পায়।',
          rightsEn: 'Full national sovereignty over water, seabed, subsoil, and airspace.',
          color: '#0F7A53', pct: 18
        },
        {
          nmBn: '১৮–২৪ নটিক্যাল মাইল', nmEn: '18–24 Nautical Miles',
          kmBn: '(~৩৩–৪৪ কি.মি.)', kmEn: '(~33–44 km)',
          titleBn: 'সংলগ্ন অঞ্চল (Contiguous Zone)', titleEn: 'Contiguous Zone',
          rightsBn: 'শুল্ক, রাজস্ব, অভিবাসন, চোরাচালান প্রতিরোধ ও সমুদ্র নিরাপত্তা আইন প্রয়োগের বিশেষ ক্ষমতা।',
          rightsEn: 'Customs, fiscal, immigration, and maritime security enforcement rights.',
          color: '#2C7A8C', pct: 32
        },
        {
          nmBn: '২০০ নটিক্যাল মাইল', nmEn: '200 Nautical Miles',
          kmBn: '(~৩৭০.৪ কি.মি.)', kmEn: '(~370.4 km)',
          titleBn: 'একচ্ছত্র অর্থনৈতিক অঞ্চল (EEZ) — তেল, গ্যাস ও মৎস্য', titleEn: 'Exclusive Economic Zone (EEZ) — Oil, Gas & Fish',
          rightsBn: 'আন্তর্জাতিক সমুদ্র আইন (UNCLOS) অনুযায়ী উপকূল থেকে ২০০ নটিক্যাল মাইল পর্যন্ত সমুদ্রের পানি ও তলদেশের সব তেল, প্রাকৃতিক গ্যাস, খনিজ ও মৎস্য সম্পদ অনুসন্ধান ও উত্তোলনের একচ্ছত্র আইনি অধিকার বাংলাদেশের।',
          rightsEn: 'Full legal sovereign rights under UNCLOS to explore and extract oil, natural gas, minerals, and fisheries up to 200 NM (~370 km) from the baseline.',
          color: '#121714', pct: 72
        },
        {
          nmBn: '৩৫০–৩৫৪ নটিক্যাল মাইল পর্যন্ত', nmEn: 'Up to 350–354 Nautical Miles',
          kmBn: '(~৬৫০–৬৬৭ কি.মি.)', kmEn: '(~650–667 km)',
          titleBn: 'বর্ধিত মহীসোপান (Extended Continental Shelf) — সমুদ্রতলের তেল ও গ্যাস', titleEn: 'Extended Continental Shelf — Seabed Oil & Gas',
          rightsBn: '২০১২ (মিয়ানমার, ITLOS) ও ২০১৪ (ভারত, PCA) সালের আন্তর্জাতিক রায়ে ২০০ নটিক্যাল মাইলের বাইরেও প্রায় ৩৫৪ নটিক্যাল মাইল পর্যন্ত সমুদ্রতলের (Seabed) তেল, গ্যাস ও খনিজ সম্পদে বাংলাদেশের সার্বভৌম অধিকার স্বীকৃত।',
          rightsEn: 'Following the 2012 ITLOS (Myanmar) and 2014 PCA (India) rulings, Bangladesh holds legal sovereign rights over seabed oil, gas, and minerals extending beyond 200 NM up to ~354 NM.',
          color: '#B83B2A', pct: 100
        }
      ];


      // Section 0: Country Profile & National Symbols
      setT('bdSymEyebrow', 'এক নজরে বাংলাদেশ', 'BANGLADESH AT A GLANCE');
      setT('bdSymTitle', 'মৌলিক পরিচয় ও জাতীয় প্রতীকসমূহ', 'Official Country Profile & National Symbols');
      const profileBasics = [
        { kBn: 'সরকারি নাম', kEn: 'Official Name', vBn: 'গণপ্রজাতন্ত্রী বাংলাদেশ', vEn: 'People’s Republic of Bangladesh' },
        { kBn: 'অবস্থান ও রাজধানী', kEn: 'Location & Capital', vBn: 'দক্ষিণ এশিয়া · ঢাকা', vEn: 'South Asia · Dhaka' },
        { kBn: 'রাষ্ট্রভাষা ও মুদ্রা', kEn: 'Language & Currency', vBn: 'বাংলা · টাকা (BDT)', vEn: 'Bangla · Taka (BDT)' },
        { kBn: 'স্বাধীনতা দিবস', kEn: 'Independence Day', vBn: '২৬ মার্চ, ১৯৭১', vEn: 'March 26, 1971' }
      ];
      const nationalSymbols = [
        { kBn: 'জাতীয় সংগীত', kEn: 'National Anthem', vBn: 'আমার সোনার বাংলা', vEn: 'Amar Shonar Bangla' },
        { kBn: 'জাতীয় পশু', kEn: 'National Animal', vBn: 'রয়েল বেঙ্গল টাইগার', vEn: 'Royal Bengal Tiger' },
        { kBn: 'জাতীয় পাখি', kEn: 'National Bird', vBn: 'দোয়েল (Oriental Magpie Robin)', vEn: 'Oriental Magpie Robin (Doel)' },
        { kBn: 'জাতীয় মাছ', kEn: 'National Fish', vBn: 'ইলিশ (Hilsa)', vEn: 'Hilsa (Ilish)' },
        { kBn: 'জাতীয় ফুল', kEn: 'National Flower', vBn: 'সাদা শাপলা (White Water Lily)', vEn: 'White Water Lily (Shapla)' },
        { kBn: 'জাতীয় ফল', kEn: 'National Fruit', vBn: 'কাঁঠাল (Jackfruit)', vEn: 'Jackfruit' },
        { kBn: 'জাতীয় গাছ', kEn: 'National Tree', vBn: 'আম গাছ (Mango Tree)', vEn: 'Mango Tree' },
        { kBn: 'জাতীয় খেলা', kEn: 'National Sport', vBn: 'কাবাডি (Kabaddi)', vEn: 'Kabaddi' },
        { kBn: 'জাতীয় কবি', kEn: 'National Poet', vBn: 'কাজী নজরুল ইসলাম', vEn: 'Kazi Nazrul Islam' },
        { kBn: 'বিজয় দিবস ও UN', kEn: 'Victory Day & UN', vBn: '১৬ ডিসেম্বর · UN ১৭ সেপ্ট. ১৯৭৪', vEn: '16 Dec · UN 17 Sep 1974' },
        { kBn: 'কোড, সময় ও ডোমেইন', kEn: 'Code, Time & Domain', vBn: '+880 · UTC+6 · .bd', vEn: '+880 · UTC+6 · .bd' },
        { kBn: 'ভৌগোলিক স্থানাঙ্ক', kEn: 'Coordinates', vBn: '২০°৩৪′–২৬°৩৮′ উ. · ৮৮°০১′–৯২°৪১′ পূ.', vEn: '20°34′–26°38′ N · 88°01′–92°41′ E' }
      ];
      document.getElementById('bdSymBody').innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${profileBasics.map(b => `
            <div class="rounded-[18px] bg-[#F3F5F0] border border-[#E4E8E6] p-3.5">
              <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? b.kBn : b.kEn}</div>
              <div class="font-heading text-sm sm:text-base font-bold text-[#16211C] mt-0.5">${isBn ? b.vBn : b.vEn}</div>
            </div>
          `).join('')}
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          ${nationalSymbols.map(s => `
            <div class="rounded-[18px] bg-white border border-[#E4E8E6] p-3.5 modern-lift">
              <div class="text-[11px] font-bold text-[#0F6B4F]">${isBn ? s.kBn : s.kEn}</div>
              <div class="text-sm font-bold text-[#16211C] mt-0.5">${isBn ? s.vBn : s.vEn}</div>
            </div>
          `).join('')}
        </div>
      `;

      // Section 4: Topography & Rivers
      setT('bdTopoEyebrow', 'ভূপ্রকৃতি ও নদ-নদী (জলসীমায় ৩৯তম)', 'TOPOGRAPHY & RIVERS (39TH BY WATER)');
      setT('bdTopoTitle', 'বাংলাদেশের ৩ ধরনের ভূপ্রকৃতি ও ৫টি প্রধান নদী-ব্যবস্থা', '3 Topographic Regions & 5 Major River Systems');
      const topoList = [
        { tBn: '১. বিস্তীর্ণ ব-দ্বীপ সমভূমি (Deltaic Plain)', tEn: '1. Broad Deltaic Plain', dBn: 'দেশের অধিকাংশ এলাকা নদীর পলিমাটি দিয়ে গঠিত নিচু সমতল ভূমি, যা বর্ষায় প্রায়ই প্লাবিত হয়।', dEn: 'Low-lying alluvial floodplains covering most of Bangladesh, built by river silt and subject to seasonal flooding.' },
        { tBn: '২. তুলনামূলক পুরনো উঁচু সমভূমি (Older Terraces)', tEn: '2. Slightly Elevated Older Plain', dBn: 'উত্তরবঙ্গের বরেন্দ্র ভূমি এবং মধ্যাঞ্চলের মধুপুর ও ভাওয়াল গড় অঞ্চল এই প্রাচীন সোপানভূমির অংশ।', dEn: 'Pleistocene terraces including the Barind Tract in the northwest and Madhupur & Bhawal Garh in central Bangladesh.' },
        { tBn: '৩. পাহাড়ি অঞ্চল (Hill Regions)', tEn: '3. Hill Regions', dBn: 'দক্ষিণ-পূর্বে পার্বত্য চট্টগ্রাম (রাঙামাটি, বান্দরবান, খাগড়াছড়ি) এবং উত্তর-পূর্বে সিলেট অঞ্চলের নিচু পাহাড় ও টিলা।', dEn: 'Southeastern Chittagong Hill Tracts and low hillocks/tilas in northeastern Sylhet.' }
      ];
      const riverSystems = [
        { bn: 'ব্রহ্মপুত্র–যমুনা নদী ব্যবস্থা', en: 'Brahmaputra–Jamuna River System' },
        { bn: 'গঙ্গা–পদ্মা নদী ব্যবস্থা', en: 'Ganges–Padma River System' },
        { bn: 'সুরমা–মেঘনা নদী ব্যবস্থা', en: 'Surma–Meghna River System' },
        { bn: 'তিস্তা নদী ব্যবস্থা', en: 'Teesta River System' },
        { bn: 'কর্ণফুলী নদী ব্যবস্থা', en: 'Karnaphuli River System' }
      ];
      document.getElementById('bdTopoBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${topoList.map(t => `
            <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4 modern-lift">
              <h3 class="font-heading text-base font-bold text-[#16211C]">${isBn ? t.tBn : t.tEn}</h3>
              <p class="text-xs sm:text-sm text-[#2B352F] mt-1.5 leading-relaxed">${isBn ? t.dBn : t.dEn}</p>
            </div>
          `).join('')}
        </div>
        <div class="rounded-[22px] bg-[#F3F5F0] border border-[#E4E8E6] p-4 sm:p-5 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? 'বাংলাদেশের নদ-নদী ও ৫টি প্রধান নদী-ব্যবস্থা' : 'Rivers of Bangladesh & 5 Major Networks'}</h3>
            <div class="flex flex-wrap gap-1.5">
              <span class="micro-pill bg-white">${isBn ? 'প্রায় ৭০০–৯০৭টি নদী (পাউবো)' : '~700–907 Rivers (BWDB)'}</span>
              <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? '৫৭টি আন্তর্জাতিক (৫৪ ভারত + ৩ মিয়ানমার)' : '57 Transboundary (54 India + 3 Myanmar)'}</span>
              <span class="micro-pill bg-[#121714] text-white">${isBn ? 'জলসীমায় বিশ্বে ৩৯তম' : '39th by Water Area'}</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            ${riverSystems.map((r, i) => `
              <span class="px-3.5 py-1.5 rounded-full bg-white border border-[#E4E8E6] text-xs sm:text-sm font-bold text-[#16211C]">${fmtNum(i + 1, state.lang)}. ${isBn ? r.bn : r.en}</span>
            `).join('')}
          </div>
        </div>
      `;

      // Section 5: Natural & Mineral Resources (Verified Petrobangla 29 Gas Fields & 5 Coalfields)
      setT('bdResEyebrow', 'প্রাকৃতিক ও খনিজ সম্পদ (যাচাইকৃত আপডেট)', 'NATURAL & MINERAL RESOURCES (VERIFIED)');
      setT('bdResTitle', '২৯টি গ্যাসক্ষেত্র, ৫টি কয়লাখনি ও অন্যান্য খনিজ সম্পদ', '29 Discovered Gas Fields, 5 Coalfields & Minerals');
      const coalfields = [
        { bn: 'জামালগঞ্জ (১৯৬২ · বৃহত্তম মজুত)', en: 'Jamalganj (1962 · Largest reserve)' },
        { bn: 'বড়পুকুরিয়া (১৯৮৫ · দিনাজপুর, উৎপাদনশীল)', en: 'Barapukuria (1985 · Dinajpur, active)' },
        { bn: 'খালাশপীর (১৯৮৯ · রংপুর)', en: 'Khalashpir (1989 · Rangpur)' },
        { bn: 'দীঘিপাড়া (১৯৯৫ · দিনাজপুর)', en: 'Dighipara (1995 · Dinajpur)' },
        { bn: 'ফুলবাড়ী (১৯৯৭/৯৮ · দিনাজপুর)', en: 'Phulbari (1997/98 · Dinajpur)' }
      ];
      document.getElementById('bdResBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
            <div class="flex items-center justify-between gap-2">
              <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? 'প্রাকৃতিক গ্যাস (পেট্রোবাংলা আপডেট)' : 'Natural Gas (Petrobangla)'}</span>
              <span class="font-heading text-xl font-extrabold text-[#0F6B4F]">${isBn ? '২৯টি ক্ষেত্র' : '29 Fields'}</span>
            </div>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? 'পেট্রোবাংলার সর্বশেষ তথ্য অনুযায়ী দেশে আবিষ্কৃত গ্যাসক্ষেত্র <strong>২৯টি</strong> (পুরনো পাঠ্যবইয়ে ২৮টি উল্লেখ থাকে)। প্রথম গ্যাসক্ষেত্র আবিষ্কৃত হয় <strong>১৯৫৫ সালে সিলেটের হরিপুরে</strong>, ২৮তম ২০২১ সালে জকিগঞ্জে এবং <strong>২৯তম ২০২৩ সালের মে মাসে ভোলার ইলিশায়</strong>। দেশের বৃহত্তম গ্যাসক্ষেত্র ব্রাহ্মণবাড়িয়ার তিতাস (১৯৬২)।'
                : 'Per Petrobangla’s updated count, Bangladesh has <strong>29 discovered gas fields</strong> (older texts cite 28). First discovered at <strong>Haripur, Sylhet (1955)</strong>; 28th at Zakiganj (2021); and <strong>29th at Ilisha, Bhola (May 2023)</strong>. Titas (Brahmanbaria, 1962) is the largest.'}
            </p>
          </div>
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
            <div class="flex items-center justify-between gap-2">
              <span class="micro-pill bg-[#121714] text-white">${isBn ? 'কয়লাখনি ও অন্যান্য খনিজ' : 'Coalfields & Minerals'}</span>
              <span class="font-heading text-xl font-extrabold text-[#16211C]">${isBn ? '৫টি কয়লাখনি' : '5 Coalfields'}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${coalfields.map(c => `<span class="micro-pill">${isBn ? c.bn : c.en}</span>`).join('')}
            </div>
            <p class="text-xs text-[#2B352F] leading-relaxed pt-1">
              ${isBn
                ? '<strong>অন্যান্য খনিজ ও নবায়নযোগ্য সম্পদ:</strong> চুনাপাথর, চীনামাটি, কঠিন শিলা (মধ্যপাড়া), নির্মাণ বালু ও কাঁচবালু; আর নবায়নযোগ্য সম্পদের মধ্যে বন, মৎস্য ও পানি প্রধান।'
                : '<strong>Other Resources:</strong> Limestone, white/pottery clay, hard rock (Maddhyapara), construction sand, and glass sand; renewable resources include forests, fisheries, and water.'}
            </p>
          </div>
        </div>
      `;

      // Section 6: Climate, Seasons & Natural Disasters
      setT('bdClimEyebrow', 'জলবায়ু, ঋতু ও প্রাকৃতিক দুর্যোগ', 'CLIMATE, SEASONS & DISASTERS');
      setT('bdClimTitle', 'ক্রান্তীয় মৌসুমি জলবায়ু, তাপমাত্রা ও দুর্যোগপ্রবণ সময়কাল', 'Sub-Tropical Monsoon Climate, Temperature & Disasters');
      document.getElementById('bdClimBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-3 modern-lift">
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? 'জলবায়ু ও ঋতুবৈচিত্র্য' : 'Climate & Seasons'}</h3>
            <div class="flex flex-wrap gap-1.5">
              <span class="micro-pill bg-[#FDF0EE] text-[#B83B2A]">${isBn ? 'উষ্ণতম: এপ্রিল (৩০°–৪০°C)' : 'Warmest: April (30°–40°C)'}</span>
              <span class="micro-pill bg-[#DDF0F3] text-[#1F6A78]">${isBn ? 'শীতলতম: জানুয়ারি (~১০°C)' : 'Coldest: Jan (~10°C)'}</span>
              <span class="micro-pill">${isBn ? '৬ ঋতু · ব্যবহারিক ৩ ঋতু' : '6 Seasons · 3 Distinct'}</span>
            </div>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? 'বাংলাদেশ উপ-ক্রান্তীয় মৌসুমি (Sub-tropical monsoon) জলবায়ুর দেশ। ৩টি প্রধান আবহাওয়া কাল: <strong>মৃদু শীত</strong> (অক্টোবর–মার্চ), <strong>গরম ও আর্দ্র গ্রীষ্ম</strong> (মার্চ–জুন) এবং <strong>বর্ষা/মনসুন</strong> (জুন–অক্টোবর)।'
                : 'Sub-tropical monsoon climate with three distinct weather phases: <strong>mild winter</strong> (Oct–Mar), <strong>hot humid summer</strong> (Mar–Jun), and <strong>rainy monsoon</strong> (Jun–Oct).'}
            </p>
          </div>
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-3 modern-lift">
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? 'প্রাকৃতিক দুর্যোগ ও ঘূর্ণিঝড়ের সময়' : 'Natural Disasters & Cyclone Windows'}</h3>
            <div class="flex flex-wrap gap-1.5">
              <span class="micro-pill bg-[#FDF0EE] text-[#B83B2A]">${isBn ? 'ঘূর্ণিঝড় মৌসুম ১: এপ্রিল–মে' : 'Cyclone Peak 1: Apr–May'}</span>
              <span class="micro-pill bg-[#FDF0EE] text-[#B83B2A]">${isBn ? 'ঘূর্ণিঝড় মৌসুম ২: সেপ্টেম্বর–নভেম্বর' : 'Cyclone Peak 2: Sep–Nov'}</span>
            </div>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? 'বঙ্গোপসাগরের উপকূলীয় ও নিচু ব-দ্বীপ অবস্থানের কারণে বাংলাদেশ বন্যা, ঘূর্ণিঝড় ও নদীভাঙনের জন্য অত্যন্ত ঝুঁকিপূর্ণ। এছাড়াও পাহাড়ধস, টর্নেডো, খরা, ভূমিকম্প ও বজ্রপাত ঘটে থাকে।'
                : 'Due to its low-lying deltaic geography on the Bay of Bengal, Bangladesh faces high vulnerability to floods, cyclones (Apr–May & Sep–Nov), river erosion, landslides, tornadoes, droughts, and lightning.'}
            </p>
          </div>
        </div>
      `;


      // Section 7: Verified Demographics, Literacy, Density, Growth & Demographic Dividend
      setT('bdDemoEyebrow', 'জনমিতি ও ডেমোগ্রাফিক ডিভিডেন্ড (বিবিএস আপডেট)', 'DEMOGRAPHICS & DIVIDEND (BBS VERIFIED)');
      setT('bdDemoTitle', 'জনসংখ্যার ঘনত্ব, সাক্ষরতার হার, বৃদ্ধি ও জনমিতিক লভ্যাংশ', 'Density, Updated Literacy Rate, Growth & Demographic Dividend');
      document.getElementById('bdDemoBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2 modern-lift">
            <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? 'জনসংখ্যার ঘনত্ব (সর্বোচ্চ ও সর্বনিম্ন)' : 'Population Density'}</span>
            <div class="font-heading text-xl font-extrabold text-[#16211C]">${isBn ? 'গড় ~১,৩৩৩ জন/ব.কি.মি.' : 'Avg ~1,333 / km²'}</div>
            <p class="text-xs text-[#2B352F] leading-relaxed">
              ${isBn
                ? '<strong>সর্বোচ্চ ঢাকা জেলা:</strong> প্রতি বর্গ কি.মি.-এ প্রায় ১০,০৮৪ জন (২০১১ শুমারিতে ছিল ৮,২২৯ জন)। <strong>সর্বনিম্ন বান্দরবান:</strong> প্রতি বর্গ কি.মি.-এ প্রায় ১০৭ জন (২০১১-এ ছিল ৮৬ জন)।'
                : '<strong>Highest — Dhaka District:</strong> ~10,084/km² in 2022 (8,229/km² in 2011). <strong>Lowest — Bandarban:</strong> ~107/km² in 2022 (86/km² in 2011).'}
            </p>
          </div>
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2 modern-lift">
            <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? 'সাক্ষরতার হার (আপডেটেড)' : 'Literacy Rate (Updated)'}</span>
            <div class="font-heading text-xl font-extrabold text-[#0F6B4F]">${isBn ? '৭৪.৬৬% – ৭৭.৯%' : '74.66% – 77.9%'}</div>
            <p class="text-xs text-[#2B352F] leading-relaxed">
              ${isBn
                ? 'বিবিএস ২০২২ শুমারিতে সাক্ষরতার হার <strong>৭৪.৬৬%</strong> (পুরুষ ৭৬.৫৬%, নারী ৭২.৮২%) এবং SVRS ২০২৩-এ তা বেড়ে <strong>৭৭.৯%</strong> হয়েছে (পুরনো পাঠ্যবইয়ে ৫৭.৭% উল্লেখ থাকে)।'
                : 'Rose to <strong>74.66%</strong> in the 2022 Census (male 76.56%, female 72.82%) and <strong>77.9%</strong> in BBS SVRS 2023 (up from 57.7% in older textbooks).'}
            </p>
          </div>
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2 modern-lift">
            <span class="micro-pill bg-[#121714] text-white">${isBn ? 'জনসংখ্যা বৃদ্ধি ও প্রবীণ হার' : 'Growth & Ageing'}</span>
            <div class="font-heading text-xl font-extrabold text-[#16211C]">${isBn ? 'বার্ষিক বৃদ্ধি ১.১২%' : '1.12% Annual Growth'}</div>
            <p class="text-xs text-[#2B352F] leading-relaxed">
              ${isBn
                ? '১৬০০ সালে জনসংখ্যা ছিল ৯০ লক্ষ, ১৯৯১-এ ১১.১৪ কোটি, ২০২২-এ ১৬.৯৮ কোটি এবং ২০২৪-এ ১৭.১৬ কোটি। ৬৫+ বয়সী প্রবীণ জনসংখ্যা ২০২৩-এ বেড়ে <strong>৬.১৪%</strong> হয়েছে (পুরনো ২% থেকে), যা ২০৫১-এ ১৪%-এ পৌঁছাতে পারে।'
                : 'Grew from 9M (1600) to 111.4M (1991), 169.8M (2022), and 171.6M (2024). The 65+ share rose to <strong>6.14%</strong> in 2023 (up from 2% in older data) and is projected to reach 14% by 2051.'}
            </p>
          </div>
        </div>

        <div class="rounded-[22px] bg-[#F3F5F0] border border-[#E4E8E6] p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <h3 class="font-heading text-base font-bold text-[#0F6B4F]">${isBn ? 'ডেমোগ্রাফিক ডিভিডেন্ড (জনমিতিক লভ্যাংশ)' : 'Demographic Dividend'}</h3>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? 'নির্ভরশীল জনসংখ্যার (শিশু ও প্রবীণ) তুলনায় কর্মক্ষম বয়সী মানুষের সংখ্যা বেশি হলে উৎপাদন, সঞ্চয় ও অর্থনৈতিক প্রবৃদ্ধির যে ঐতিহাসিক সুযোগ তৈরি হয়, তাকেই ডেমোগ্রাফিক ডিভিডেন্ড বলে। বিশ্বব্যাংকের মতে, দ্রুত বয়স্ক জনসংখ্যা বাড়ার আগেই দক্ষতা ও কর্মসংস্থান নিশ্চিত করা জরুরি।'
                : 'The economic boost created when the working-age population outnumbers dependents—driving production, savings, and growth. World Bank & UNFPA note Bangladesh must invest urgently in skills and jobs before rapid ageing narrows this window.'}
            </p>
          </div>
          <div class="space-y-1.5">
            <h3 class="font-heading text-base font-bold text-[#B83B2A]">${isBn ? 'জনসংখ্যার প্রধান চ্যালেঞ্জসমূহ' : 'Key Population Challenges'}</h3>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? 'বিপুল তরুণ জনগোষ্ঠী প্রজনন বয়সে প্রবেশ করায় বৃদ্ধির হার কমলেও মোট জনসংখ্যা বাড়ছে (Population Momentum)। ফলে শিক্ষা, স্বাস্থ্যসেবা, আবাসন, খাদ্য নিরাপত্তা, দারিদ্র্য বিমোচন ও মানসম্মত কর্মসংস্থান সৃষ্টি বড় চ্যালেঞ্জ হয়ে দাঁড়িয়েছে।'
                : 'Despite lower growth rates, population momentum keeps total numbers rising—placing pressure on education, healthcare, housing, food security, poverty reduction, and decent youth employment.'}
            </p>
          </div>
        </div>
      `;


      // Section 8: Constitution, Government & Historical Milestones
      setT('bdGovEyebrow', 'রাষ্ট্রব্যবস্থা, সংবিধান ও ইতিহাস', 'CONSTITUTION, STATE & HISTORY');
      setT('bdGovTitle', 'সংবিধান, জাতীয় সংসদ এবং ১৯৫২–১৯৭৪ ঐতিহাসিক মাইলফলক', 'Constitution, Jatiya Sangsad & 1952–1974 Milestones');

      const milestones = [
        { yBn: '১৯৫২', yEn: '1952', tBn: 'ভাষা আন্দোলন (২১ ফেব্রুয়ারি)', tEn: 'Language Movement (21 Feb)', dBn: 'বাংলাকে রাষ্ট্রভাষার দাবিতে সালাম-বরকত-রফিক-জব্বারের আত্মত্যাগ; ১৯৯৯ সালে UNESCO ২১ ফেব্রুয়ারিকে আন্তর্জাতিক মাতৃভাষা দিবস ঘোষণা করে।', dEn: 'Students sacrificed their lives for Bangla; UNESCO proclaimed 21 February International Mother Language Day in 1999.' },
        { yBn: '১৯৬৬–৬৯', yEn: '1966–69', tBn: 'ছয় দফা ও গণঅভ্যুত্থান', tEn: 'Six-Point & Mass Uprising', dBn: '১৯৬৬-এর ছয় দফা আন্দোলন ও ১৯৬৯-এর গণঅভ্যুত্থান বাঙালির স্বাধিকার সংগ্রামকে চূড়ান্ত পর্বে নিয়ে যায়।', dEn: 'The 1966 Six-Point autonomy charter and 1969 Mass Uprising paved the road to self-determination.' },
        { yBn: '১৯৭১', yEn: '1971', tBn: '৭ মার্চ ভাষণ, ২৬ মার্চ ও ১৬ ডিসেম্বর', tEn: '7 Mar, 26 Mar & 16 Dec Victory', dBn: '৭ মার্চের ঐতিহাসিক ভাষণ (UNESCO Memory of the World), ২৬ মার্চ স্বাধীনতা ঘোষণা এবং ৯ মাসের মুক্তিযুদ্ধ শেষে ১৬ ডিসেম্বর চূড়ান্ত বিজয় অর্জন।', dEn: 'Historic 7 March speech (UNESCO Memory of the World), 26 March Independence, and 16 December Victory after 9 months of Liberation War.' },
        { yBn: '১৯৭২–৭৪', yEn: '1972–74', tBn: 'সংবিধান ও জাতিসংঘ সদস্যপদ', tEn: 'Constitution & UN Membership', dBn: '৪ নভেম্বর ১৯৭২ সংবিধান গৃহীত ও ১৬ ডিসেম্বর কার্যকর হয়; ১৭ সেপ্টেম্বর ১৯৭৪ বাংলাদেশ জাতিসংঘের সদস্যপদ লাভ করে।', dEn: 'Constitution adopted 4 Nov 1972 (effective 16 Dec 1972); Bangladesh joined the United Nations on 17 September 1974.' }
      ];

      document.getElementById('bdGovBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4 space-y-1.5">
            <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? 'সংবিধান ও শাসনব্যবস্থা' : 'Constitution & Republic'}</span>
            <div class="font-heading text-base font-bold text-[#16211C]">${isBn ? 'সংসদীয় গণপ্রজাতন্ত্র' : 'Parliamentary Republic'}</div>
            <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? 'সংবিধান গৃহীত ৪ নভেম্বর ১৯৭২, কার্যকর ১৬ ডিসেম্বর ১৯৭২। রাষ্ট্রের ৩ অঙ্গ: নির্বাহী বিভাগ, আইনসভা ও বিচার বিভাগ (সুপ্রিম কোর্ট)।' : 'Constitution effective 16 Dec 1972; governed through three pillars: Executive, Legislature, and Judiciary (Supreme Court).'}</p>
          </div>
          <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4 space-y-1.5">
            <span class="micro-pill bg-[#121714] text-white">${isBn ? 'জাতীয় সংসদ' : 'Jatiya Sangsad'}</span>
            <div class="font-heading text-base font-bold text-[#16211C]">${isBn ? '৩৫০ সাংবিধানিক আসন' : '350 Constitutional Seats'}</div>
            <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? '৩০০টি সাধারণ নির্বাচনী আসন ও ৫০টি সংরক্ষিত নারী আসন। শেরেবাংলা নগরে অবস্থিত সংসদ ভবনের স্থপতি বিশ্বখ্যাত লুই আই. কান।' : '300 directly elected seats + 50 reserved women’s seats. Iconic parliament building in Dhaka designed by architect Louis I. Kahn.'}</p>
          </div>
          <div class="rounded-[20px] bg-white border border-[#E4E8E6] p-4 space-y-1.5">
            <span class="micro-pill bg-[#F3F5F0]">${isBn ? 'প্রশাসনিক কাঠামো' : 'Administrative Tiers'}</span>
            <div class="font-heading text-base font-bold text-[#16211C]">${isBn ? '৮ বিভাগ · ৬৪ জেলা · ৪৯৫ উপজেলা' : '8 Div · 64 Dist · 495 Upazilas'}</div>
            <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? 'দেশজুড়ে ৪,৫০০-এর বেশি ইউনিয়ন, সিটি করপোরেশন ও পৌরসভার মাধ্যমে স্থানীয় সরকার ও সেবা পরিচালিত হয়।' : 'Over 4,500 union parishads alongside city corporations and municipalities deliver local governance nationwide.'}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          ${milestones.map(m => `
            <div class="rounded-[20px] bg-[#F3F5F0] border border-[#E4E8E6] p-4 space-y-1.5 modern-lift">
              <span class="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0B4D36] text-white">${isBn ? m.yBn : m.yEn}</span>
              <h3 class="font-heading text-sm sm:text-base font-bold text-[#16211C]">${isBn ? m.tBn : m.tEn}</h3>
              <p class="text-xs text-[#2B352F] leading-relaxed">${isBn ? m.dBn : m.dEn}</p>
            </div>
          `).join('')}
        </div>
      `;

      // Section 9: Culture, UNESCO Heritage, Sports, Science & Diplomacy
      setT('bdCultEyebrow', 'সংস্কৃতি, ঐতিহ্য, ক্রীড়া ও আন্তর্জাতিক অঙ্গন', 'CULTURE, HERITAGE, SPORTS & DIPLOMACY');
      setT('bdCultTitle', 'UNESCO স্বীকৃতি, খেলাধুলা, বিজ্ঞান-প্রযুক্তি ও বৈশ্বিক সদস্যপদ', 'UNESCO Sites, Sports Achievements, Tech & Global Organizations');

      document.getElementById('bdCultBody').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
            <span class="micro-pill bg-[#DCEFE5] text-[#0F6B4F]">${isBn ? 'UNESCO বিশ্ব ঐতিহ্য ও সংস্কৃতি' : 'UNESCO Heritage & Culture'}</span>
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? '৩টি বিশ্ব ঐতিহ্য ও লোকজ সংস্কৃতি' : '3 World Heritage Sites & Intangible Culture'}</h3>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? '<strong>UNESCO বিশ্ব ঐতিহ্য:</strong> সুন্দরবন, বাগেরহাটের ঐতিহাসিক মসজিদ নগরী (ষাটগম্বুজ) ও নওগাঁর পাহাড়পুর বৌদ্ধ বিহার। <strong>অধরা সাংস্কৃতিক ঐতিহ্য:</strong> বাউল গান, জামদানি বয়নশিল্প, মঙ্গল শোভাযাত্রা ও শীতলপাটি। প্রধান উৎসব: পহেলা বৈশাখ, ঈদুল ফিতর ও আজহা, দুর্গাপূজা, বুদ্ধ পূর্ণিমা ও বড়দিন।'
                : '<strong>UNESCO World Heritage Sites:</strong> The Sundarbans, Historic Mosque City of Bagerhat, and Paharpur Buddhist Vihara. <strong>Intangible Heritage:</strong> Baul songs, Jamdani weaving, Mangal Shobhajatra, and Shitalpati mats.'}
            </p>
          </div>

          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
            <span class="micro-pill bg-[#FDF0EE] text-[#B83B2A]">${isBn ? 'খেলাধুলা ও ক্রীড়া সাফল্য' : 'Sports & Cricket Milestones'}</span>
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? 'ক্রিকেট, ফুটবল ও জাতীয় খেলা কাবাডি' : 'Cricket, Football & National Sport Kabaddi'}</h3>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? '১৯৯৭ ICC ট্রফি জয়, ১৯৯৯ প্রথম বিশ্বকাপ ও ২০০০ সালে টেস্ট মর্যাদা লাভ। উল্লেখযোগ্য সাফল্য: <strong>২০২০ অনূর্ধ্ব-১৯ ক্রিকেট বিশ্বকাপ জয়</strong>, ২০১৫ বিশ্বকাপ কোয়ার্টার ফাইনাল, ২০১৭ চ্যাম্পিয়নস ট্রফি সেমিফাইনাল এবং ফুটবলে <strong>২০০৩ SAFF চ্যাম্পিয়নশিপ জয়</strong>।'
                : '1997 ICC Trophy winners, 1999 World Cup debut, Test status in 2000; highlights include winning the <strong>2020 U-19 Cricket World Cup</strong>, 2015 WC quarter-finals, 2017 Champions Trophy semi-finals, and the <strong>2003 SAFF Football Championship</strong>.'}
            </p>
          </div>

          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
            <span class="micro-pill bg-[#DDF0F3] text-[#1F6A78]">${isBn ? 'বিজ্ঞান, প্রযুক্তি ও জ্বালানি' : 'Science, Tech & Energy'}</span>
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? 'বঙ্গবন্ধু স্যাটেলাইট-১ ও রূপপুর বিদ্যুৎকেন্দ্র' : 'Satellite-1, FinTech & Rooppur Nuclear'}</h3>
            <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
              ${isBn
                ? '<strong>১১ মে ২০১৮</strong> বাংলাদেশের প্রথম ভূস্থির উপগ্রহ <strong>বঙ্গবন্ধু স্যাটেলাইট-১</strong> উৎক্ষেপণ। পাবনার ঈশ্বরদীতে রাশিয়ার সহযোগিতায় ২,৪০০ মেগাওয়াট ক্ষমতাসম্পন্ন <strong>রূপপুর পারমাণবিক বিদ্যুৎকেন্দ্র</strong>, এবং বিকাশ-নগদ-রকেটের মাধ্যমে মোবাইল আর্থিক সেবার বিপ্লব।'
                : 'Launched Bangladesh’s first geostationary satellite (<strong>Bangabandhu-1</strong>) on 11 May 2018; building the 2,400 MW <strong>Rooppur Nuclear Power Plant</strong> in Pabna; nationwide digital finance via bKash, Nagad & Rocket.'}
            </p>
          </div>

          <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
            <span class="micro-pill bg-[#121714] text-white">${isBn ? 'আন্তর্জাতিক সম্পর্ক ও সদস্যপদ' : 'Foreign Relations & Memberships'}</span>
            <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? 'বহুপাক্ষিক কূটনীতি ও বিশ্ব সংস্থা' : 'Multilateral Diplomacy & Global Bodies'}</h3>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              ${['UN (1974)', 'Commonwealth (1972)', 'SAARC', 'OIC', 'WTO', 'BIMSTEC', 'D-8', 'IMF', 'World Bank', 'ADB'].map(org => `<span class="micro-pill bg-[#F3F5F0]">${org}</span>`).join('')}
            </div>
            <p class="text-xs text-[#2B352F] leading-relaxed pt-1">
              ${isBn
                ? 'প্রধান অগ্রাধিকার: সার্বভৌমত্ব, আঞ্চলিক বাণিজ্য, জাতিসংঘ শান্তিরক্ষা, জলবায়ু কূটনীতি, রোহিঙ্গা সংকট সমাধান এবং সমুদ্রসম্পদ ও প্রবাসী শ্রমবাজার (সৌদি আরব, আমিরাত, মালয়েশিয়া, সিঙ্গাপুর, কোরিয়া, ইউরোপ)।'
                : 'Key priorities: sovereignty, regional trade, UN peacekeeping, climate diplomacy, Rohingya crisis resolution, blue economy, and overseas labor markets across the Gulf, Asia & Europe.'}
            </p>
          </div>
        </div>
      `;

      document.getElementById('bdSeaBody').innerHTML = `
        <div class="rounded-[22px] bg-[#E3F2EA] border border-[#CBE4D7] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div class="max-w-2xl">
            <div class="text-xs font-bold text-[#0F6B4F] uppercase tracking-wider">${isBn ? 'তেল-গ্যাস ও সমুদ্রসম্পদের মূল তথ্য' : 'KEY LEGAL RESOURCE FACT'}</div>
            <p class="text-sm sm:text-[15px] text-[#16211C] leading-relaxed mt-1">
              ${isBn
                ? 'মিয়ানমার (২০১২) ও ভারতের (২০১৪) সাথে আন্তর্জাতিক আদালতে সমুদ্রসীমা জয়ের পর বাংলাদেশের নিশ্চিত সমুদ্রসীমা <strong>১,১৮,৮১৩ বর্গ কি.মি.</strong>। আইনত <strong>২০০ নটিক্যাল মাইল</strong> পর্যন্ত একচ্ছত্র অর্থনৈতিক অঞ্চলে (EEZ) পানি ও তলদেশের সব সম্পদ এবং <strong>৩৫৪ নটিক্যাল মাইল</strong> পর্যন্ত মহীসোপানের (Continental Shelf) তলদেশে থাকা <strong>তেল ও প্রাকৃতিক গ্যাস</strong> উত্তোলনের পূর্ণ অধিকার বাংলাদেশের।'
                : 'Following international rulings with Myanmar (2012 ITLOS) and India (2014 PCA), Bangladesh secured <strong>118,813 km²</strong> of maritime territory, with full legal rights to extract offshore <strong>oil, natural gas & marine resources up to 200 NM (EEZ)</strong> and seabed oil/gas on the extended continental shelf up to <strong>354 NM</strong>.'}
            </p>
          </div>
          <div class="bg-white rounded-2xl px-5 py-3.5 border border-[#CBE4D7] text-center shrink-0">
            <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'নিশ্চিত সমুদ্র এলাকা' : 'Confirmed Sea Area'}</div>
            <div class="font-heading text-2xl font-extrabold text-[#0F6B4F]">${isBn ? '১,১৮,৮১৩ ব.কি.মি.' : '118,813 km²'}</div>
          </div>
        </div>

        <!-- Visual Nautical Mile Scale Cards -->
        <div class="space-y-3.5">
          ${seaZones.map(z => `
            <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-4 sm:p-5 space-y-2.5 modern-lift">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold px-3 py-1 rounded-full text-white" style="background:${z.color}">${isBn ? z.nmBn : z.nmEn}</span>
                  <span class="text-xs font-semibold text-[#5D6762]">${isBn ? z.kmBn : z.kmEn}</span>
                </div>
                <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C]">${isBn ? z.titleBn : z.titleEn}</h3>
              </div>
              <div class="w-full h-3.5 bg-[#E6EFEA] rounded-full overflow-hidden p-0.5 cursor-pointer" data-tip-html="<div class='font-bold text-[#16211C]'>${isBn ? z.titleBn : z.titleEn}</div><div class='font-extrabold' style='color:${z.color}'>${isBn ? z.nmBn : z.nmEn} · ${isBn ? z.kmBn : z.kmEn}</div>">
                <div class="h-full rounded-full chart-anim-bar" style="background:${z.color}" data-anim-width="${z.pct}%"></div>
              </div>
              <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">${isBn ? z.rightsBn : z.rightsEn}</p>
            </div>
          `).join('')}
        </div>
      `;
      const bdPage = document.getElementById('page-bangladesh');
      animateBarsIn(bdPage, false);
      bindTooltipElements(bdPage);
    }


