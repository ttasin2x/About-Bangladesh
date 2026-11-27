    // =========================================================================


    // =========================================================================
    // PAGE 8: READ THIS — MOTIVE, CLASSROOM INSPIRATION & VERIFIED SOURCES
    // =========================================================================
    function renderAboutPage() {
      const container = document.getElementById('page-about');
      if (!container) return;
      const isBn = state.lang === 'bn';

      const motives = [
        {
          num: '০১', numEn: '01',
          titleBn: 'বাংলাদেশের মানুষের জন্য নিজের দেশকে গভীরভাবে জানা',
          titleEn: 'Helping People of Bangladesh Know Their Homeland Deeply',
          descBn: 'আমরা অনেকেই নিজের বিভাগ বা জেলার বাইরের ইতিহাস, প্রাচীন জনপদ, ৫০টি ক্ষুদ্র নৃগোষ্ঠী কিংবা সমুদ্রসীমা ও নদী-ব্যবস্থার সঠিক তথ্য এক জায়গায় পাই না। এই পোর্টালের লক্ষ্য হলো—প্রতিটি বাংলাদেশি যেন নিজের দেশকে কেবল পাঠ্যবইয়ের মুখস্থ তথ্য হিসেবে নয়, বরং মানচিত্র ও ভিজ্যুয়াল গল্পের মাধ্যমে ভালোবাসা ও গর্বের সঙ্গে জানতে পারে।',
          descEn: 'Many of us rarely find verified history, ancient janapadas, 50 indigenous communities, river systems, and maritime boundaries of all 64 districts in one place. This portal helps Bangladeshis explore their own country visually and proudly beyond scattered textbooks.'
        },
        {
          num: '০২', numEn: '02',
          titleBn: 'বিশ্বের মানুষের সামনে বাংলাদেশের সত্যিকারের পরিচয় তুলে ধরা',
          titleEn: 'Presenting the True Story of Bangladesh to the World',
          descBn: 'দেশের বাইরের মানুষের কাছে বাংলাদেশকে শুধু একটি ছোট জনবহুল দেশ হিসেবে নয়—বরং হাজার বছরের সমৃদ্ধ ইতিহাস, বৈচিত্র্যময় সংস্কৃতি, তৈরি পোশাকে বিশ্বে ২য়, ইলিশ ও পাটে ১ম, জাতিসংঘ শান্তিরক্ষায় শীর্ষ অবদানকারী এবং দ্রুত অগ্রসরমান অর্থনীতির দেশ হিসেবে তুলে ধরাই এই ওয়েবসাইটের অন্যতম বড় উদ্দেশ্য।',
          descEn: 'For international visitors, this portal showcases Bangladesh beyond stereotypes—highlighting its millennia-old heritage, cultural diversity, #2 global apparel exports, #1 Hilsa & raw jute leadership, top UN peacekeeping contribution, and steady human development.'
        },
        {
          num: '০৩', numEn: '03',
          titleBn: 'পড়াশোনা ও গবেষণাকে ইন্টারঅ্যাক্টিভ ও সহজলভ্য করা',
          titleEn: 'Turning Static Facts into Interactive Visual Learning',
          descBn: 'একঘেয়ে টেক্সট বা ছড়িয়ে-ছিটিয়ে থাকা পরিসংখ্যানের বদলে ৬৪ জেলার ক্লিকেবল মানচিত্র, ৬০fps অ্যানিমেটেড ম্যাপ ট্যুর, ভয়েস গাইড এবং ইন্টারঅ্যাক্টিভ চার্টের মাধ্যমে শিক্ষার্থী, শিক্ষক ও কৌতূহলী পাঠকদের জন্য শেখার অভিজ্ঞতাকে আরও প্রাণবন্ত ও নির্ভুল করে তোলা।',
          descEn: 'Instead of dry, fragmented tables, clickable 64-district vector maps, a 60fps animated map tour with voice guidance, and interactive charts make learning engaging and reliable for students, educators, and curious readers everywhere.'
        }
      ];

      const sources = [
        {
          tagBn: 'একাডেমিক ভিত্তি', tagEn: 'Academic Foundation',
          titleBn: 'বিশ্ববিদ্যালয়ের ক্লাস লেকচার ও নোট (শামীমা ম্যাম)',
          titleEn: 'University Classroom Lectures & Notes (Shamima Ma’am)',
          descBn: 'বাংলাদেশের উৎপত্তি, প্রাচীন জনপদ, ভূপ্রকৃতি, নৃতাত্ত্বিক ধারা, সীমান্ত, নদী-ব্যবস্থা ও জাতীয় পরিচিতির মূল কাঠামো ও অনুপ্রেরণা।',
          descEn: 'Core academic structure and inspiration covering Bangladesh’s origins, ancient janapadas, topography, ethnic heritage, borders, and national profile.'
        },
        {
          tagBn: 'সরকারি শুমারি', tagEn: 'Official Census',
          titleBn: 'বাংলাদেশ পরিসংখ্যান ব্যুরো (BBS Census 2022 ও SVRS 2023)',
          titleEn: 'Bangladesh Bureau of Statistics (BBS Census 2022 & SVRS 2023)',
          descBn: '৮ বিভাগ ও ৬৪ জেলার জনসংখ্যা, আয়তন, ধর্মভিত্তিক পরিসংখ্যান, ৫০টি গেজেটভুক্ত ক্ষুদ্র নৃগোষ্ঠীর তথ্য ও হালনাগাদ সাক্ষরতার হার।',
          descEn: 'Verified population & area for all 8 divisions and 64 districts, religious demographics, 50 gazetted indigenous communities, and updated literacy figures.'
        },
        {
          tagBn: 'ইতিহাস ও ঐতিহ্য', tagEn: 'History & Heritage',
          titleBn: 'বাংলাপিডিয়া (এশিয়াটিক সোসাইটি) ও জাতীয় তথ্য বাতায়ন',
          titleEn: 'Banglapedia (Asiatic Society) & Bangladesh National Portal',
          descBn: '৬৪ জেলার প্রতিষ্ঠা সাল, জেলা গঠনের ঐতিহাসিক ক্রমবিকাশ, প্রাচীন জনপদের বিবরণ ও ১৯৪৭ সালের র‍্যাডক্লিফ বিভাজনের ঐতিহাসিক প্রেক্ষাপট।',
          descEn: 'District founding years, administrative evolution, ancient janapada geography, and historical records of the 1947 Radcliffe Partition.'
        },
        {
          tagBn: 'মানব উন্নয়ন ও পরিবেশ', tagEn: 'Human Dev & Environment',
          titleBn: 'UNDP (HDR 2025) ও World Bank Open Data',
          titleEn: 'UNDP (Human Development Report 2025) & World Bank',
          descBn: 'গড় আয়ু (৭৪.৭ বছর), মানব উন্নয়ন সূচক (HDI ০.৬৮৫), বিদ্যুৎ সংযোগ, ইন্টারনেট ব্যবহার, বনভূমি, রেমিট্যান্স ও CO₂ নিঃসরণের বৈশ্বিক তুলনা।',
          descEn: 'Life expectancy (74.7 yrs), HDI score (0.685), electricity & internet access, forest cover, remittances, and per-capita CO₂ comparisons.'
        },
        {
          tagBn: 'অর্থনীতি ও বাণিজ্য', tagEn: 'Economy & Trade',
          titleBn: 'IMF (World Economic Outlook 2026) ও UNCTAD',
          titleEn: 'IMF (World Economic Outlook 2026) & UNCTAD',
          descBn: 'নামমাত্র জিডিপি ($৫০৬ বিলিয়ন), PPP জিডিপি ($১.৯ ট্রিলিয়ন), মাথাপিছু আয় ও বিশ্ব তৈরি পোশাক (RMG) রপ্তানির তুলনামূলক পরিসংখ্যান।',
          descEn: 'Nominal GDP ($506B), PPP GDP ($1.9T), per-capita GDP trajectory, and global Ready-Made Garment (RMG) export benchmarks.'
        },
        {
          tagBn: 'সামরিক, সমুদ্র ও কৃষি', tagEn: 'Defense, Maritime & Agri',
          titleBn: 'Global Firepower (2026), UNCLOS, পেট্রোবাংলা ও FAO',
          titleEn: 'Global Firepower (2026), UNCLOS, Petrobangla & FAO',
          descBn: 'বৈশ্বিক সামরিক র‍্যাংক (#৩৭), জাতিসংঘ শান্তিরক্ষা অবদান, ১২/২০০/৩৫৪ নটিক্যাল মাইল সমুদ্রসীমা, ২৯টি গ্যাসক্ষেত্র এবং ইলিশ-পাট-ধান উৎপাদনের তথ্য।',
          descEn: 'Global military index (#37), UN peacekeeping leadership, UNCLOS maritime zones (12/200/354 nm), 29 gas fields, and global Hilsa/jute/rice rankings.'
        }
      ];

      const creatorAvatar = 'data:image/webp;base64,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';
      container.innerHTML = `
        <!-- Creator About Me! Card (Exact Screenshot Layout) -->
        <section class="lux-card p-6 sm:p-10 md:p-12 overflow-hidden">
          <!-- Top Bar -->
          <div class="flex items-center justify-between gap-3 mb-6">
            <span class="text-base sm:text-lg font-semibold italic text-[#737B77] tracking-tight">About Me!</span>
            <button type="button" onclick="ubJumpPage('districts')" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4FAF6] hover:bg-[#E6F2EB] text-[#16211C] text-xs font-bold border border-[#D8E7DF] transition cursor-pointer">
              <span>←</span>
              <span>${isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
            </button>
          </div>

          <!-- Top Row: Name + Intro (Left) & Circular Avatar + Contact Links (Right) -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            <div class="md:col-span-7 space-y-4">
              <div class="relative inline-block">
                <h1 class="font-heading text-4xl sm:text-5xl font-black tracking-tight leading-[0.95] text-[#252256] uppercase">
                  TANVIR<br/>TASIN
                </h1>
                <!-- Playful hand-drawn pink burst marks -->
                <svg class="absolute -top-2 -right-8 w-7 h-7 pointer-events-none" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M6 12L15 5" stroke="#E83E8C" stroke-width="2.4" stroke-linecap="round"/>
                  <path d="M12 18L22 15" stroke="#E83E8C" stroke-width="2.4" stroke-linecap="round"/>
                  <path d="M10 24L18 25" stroke="#E83E8C" stroke-width="2.2" stroke-linecap="round"/>
                </svg>
                <!-- Hand-drawn curved arrow pointing right toward portrait -->
                <svg class="hidden md:block absolute -top-6 -right-36 w-28 h-14 pointer-events-none text-[#16211C]" viewBox="0 0 120 56" fill="none" aria-hidden="true">
                  <path d="M6 16 C 36 2, 76 6, 108 38" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                  <path d="M98 18 L110 40 L88 37" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              <p class="text-sm sm:text-[15px] text-[#222B26] leading-[1.78] max-w-lg">
                <span class="font-heading text-xl sm:text-2xl font-black italic text-[#16211C] mr-1">Hi!</span>
                ${isBn
                  ? 'আমি একজন গ্রাফিক ডিজাইনার, ওয়েব ডিজাইনার এবং বাংলাদেশ স্কাউটসের একজন স্কাউটার। ডিজিটাল সৃজনশীলতা, ইন্টারঅ্যাক্টিভ ওয়েব ডিজাইন এবং ভিজ্যুয়াল স্টোরিটেলিং নিয়ে কাজ করতে ভালোবাসি। বাংলাদেশকে সবার কাছে আধুনিক ও প্রাণবন্তভাবে তুলে ধরতেই আমার এই পোর্টাল।'
                  : 'I’m a Graphic Designer, Web Designer, and Scouter with Bangladesh Scouts with a love for digital creativity and clean storytelling. My work moves between visual design, interactive web experiences, and creative layouts—always eager to learn, grow, and bring new ideas to life.'}
              </p>
            </div>

            <div class="md:col-span-5 flex flex-col items-center md:items-start">
              <div class="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-[#F4FAF6] border-4 border-[#EEF5F0] shadow-sm mx-auto md:mx-0">
                <img src="${creatorAvatar}" alt="Tanvir Tasin" class="w-full h-full object-cover object-top" />
              </div>
              <div class="mt-5 space-y-2 text-xs sm:text-sm font-semibold text-[#16211C]">
                <a href="https://tanvir-tasin.pages.dev/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 hover:text-[#0F6B4F] transition">
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  <span>tanvir-tasin.pages.dev</span>
                </a>
                <a href="https://github.com/ttasin2x-droid" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2.5 hover:text-[#0F6B4F] transition">
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  <span>ttasin2x-droid</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Education & Skills (Left) & Softwares Icons + Progress Bars (Right) -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mt-10 pt-8 border-t border-[#EDF2EF]">
            <div class="md:col-span-5 space-y-7">
              <!-- Education -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <svg class="w-6 h-6 -ml-1 text-[#E83E8C] shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M12 24 C 5 21, 3 12, 9 7 C 14 3, 21 6, 19 11 C 17 15, 12 13, 13 9 C 14 6, 20 4, 24 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                  <h2 class="font-heading text-2xl sm:text-[26px] font-bold text-[#16211C]">Education</h2>
                </div>
                <p class="text-sm text-[#2B352F] leading-relaxed pl-1">
                  ${isBn
                    ? 'বর্তমানে সাউথইস্ট ইউনিভার্সিটিতে (Southeast University, Dhaka) বিবিএ (BBA) বিষয়ে অধ্যয়নরত।'
                    : 'Currently studying BBA at Southeast University (SEU), Dhaka, Bangladesh.'}
                </p>
              </div>

              <!-- Skills -->
              <div>
                <div class="flex items-center gap-2 mb-2.5">
                  <h2 class="font-heading text-2xl sm:text-[26px] font-bold text-[#16211C]">Skills</h2>
                  <svg class="w-6 h-6 text-[#E83E8C] shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M22 6 C 17 11, 13 15, 8 21" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
                    <path d="M7 13 L7 22 L16 21" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <ul class="space-y-1.5 text-sm text-[#222B26] list-disc pl-5">
                  <li>${isBn ? 'গ্রাফিক ডিজাইন ও ব্র্যান্ড ভিজ্যুয়াল' : 'Graphic Design & Visual Branding'}</li>
                  <li>${isBn ? 'ওয়েব ডিজাইন ও ইন্টারঅ্যাক্টিভ UI' : 'Web Design & Interactive UI'}</li>
                  <li>${isBn ? 'ম্যাগাজিন ও ডিজিটাল লেআউট' : 'Editorial & Digital Layout'}</li>
                  <li>${isBn ? 'ডেটা ভিজ্যুয়ালাইজেশন ও ম্যাপ ডিজাইন' : 'Data Visualization & Map Design'}</li>
                  <li>${isBn ? 'স্কাউটিং ও নেতৃত্ব (বাংলাদেশ স্কাউটস)' : 'Scouting & Leadership (Bangladesh Scouts)'}</li>
                </ul>
              </div>
            </div>

            <!-- Softwares -->
            <div class="md:col-span-7">
              <h2 class="font-heading text-2xl sm:text-[26px] font-bold text-[#16211C] mb-5">Softwares</h2>
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <!-- 2x2 Crisp App Icon Tiles: AI, Canva, UI/UX Design, GitHub -->
                <div class="sm:col-span-6 grid grid-cols-2 gap-3 max-w-[220px]">
                  <div class="aspect-square rounded-[18px] bg-[#330000] text-[#FF9A00] flex items-center justify-center font-heading text-3xl font-extrabold tracking-tight select-none" title="AI / Illustrator">Ai</div>
                  <div class="aspect-square rounded-[18px] text-white flex items-center justify-center font-heading text-xl font-black italic tracking-tight select-none" style="background:linear-gradient(135deg,#00C4CC 0%,#7D2AE8 100%)" title="Canva">Canva</div>
                  <div class="aspect-square rounded-[18px] bg-[#16211C] text-[#7ED9A4] flex items-center justify-center font-heading text-lg font-extrabold tracking-tight select-none" title="UI/UX Design">UI/UX</div>
                  <a href="https://github.com/ttasin2x-droid" target="_blank" rel="noopener noreferrer" class="aspect-square rounded-[18px] bg-[#181717] text-white flex items-center justify-center hover:bg-[#24292F] transition select-none" title="GitHub">
                    <svg class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.57 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z"/></svg>
                  </a>
                </div>

                <!-- Slim Horizontal Progress Bars -->
                <div class="sm:col-span-6 space-y-3.5">
                  <div>
                    <div class="text-xs font-semibold text-[#16211C] mb-1">AI</div>
                    <div class="w-full h-2 bg-[#E2ECE6] rounded-full overflow-hidden"><div class="h-full rounded-full bg-[#F59E0B]" style="width:92%"></div></div>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-[#16211C] mb-1">Canva</div>
                    <div class="w-full h-2 bg-[#E2ECE6] rounded-full overflow-hidden"><div class="h-full rounded-full bg-[#00B4D8]" style="width:95%"></div></div>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-[#16211C] mb-1">UI/UX Design</div>
                    <div class="w-full h-2 bg-[#E2ECE6] rounded-full overflow-hidden"><div class="h-full rounded-full bg-[#0F6B4F]" style="width:90%"></div></div>
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-[#16211C] mb-1">GitHub</div>
                    <div class="w-full h-2 bg-[#E2ECE6] rounded-full overflow-hidden"><div class="h-full rounded-full bg-[#24292F]" style="width:88%"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="lux-card p-3.5 sm:p-4">
          <div class="rounded-[22px] hero-topo text-white p-6 sm:p-8 relative overflow-hidden">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-[#16211C] text-xs font-bold mb-3">
              ${isBn ? 'Read This · ওয়েবসাইটের পেছনের গল্প, উদ্দেশ্য ও তথ্যসূত্র' : 'Read This · The Story, Motive & Verified Sources'}
            </div>
            <h2 class="font-heading text-2xl sm:text-3xl font-bold leading-tight max-w-3xl text-white" style="color:#FFFFFF !important;">
              ${isBn ? 'কেন তৈরি করা হলো “আমার বাংলাদেশ সম্পর্কে”' : 'Why I Built “About My Bangladesh”'}
            </h2>
            <p class="text-sm sm:text-base text-white/90 leading-relaxed mt-2.5 max-w-3xl">
              ${isBn
                ? 'বাংলাদেশের মানুষ এবং পৃথিবীর যেকোনো প্রান্তের মানুষ যেন বাংলাদেশকে আরও গভীরভাবে, নির্ভুল তথ্য ও ভিজ্যুয়াল অভিজ্ঞতার মাধ্যমে চিনতে পারে—এই ভালোবাসা ও দায়বদ্ধতা থেকেই এই ওয়েবসাইটটির জন্ম।'
                : 'Built with one clear mission: so people inside Bangladesh and readers around the world can discover Bangladesh’s true history, geography, diversity, and global standing through verified data and interactive visuals.'}
            </p>
          </div>
        </section>

        <!-- Section 1: Classroom Inspiration Story -->
        <section class="lux-card p-5 sm:p-7">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-8 space-y-3.5">
              <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">
                ${isBn ? 'আইডিয়ার সূচনা · ইউনিভার্সিটি ক্লাসরুম' : 'WHERE THE IDEA STARTED · UNIVERSITY CLASSROOM'}
              </span>
              <h2 class="font-heading text-xl sm:text-2xl font-bold text-[#16211C]">
                ${isBn ? 'ক্লাসরুমের একটি লেকচার থেকে একটি পূর্ণাঙ্গ ডিজিটাল আর্কাইভ' : 'From a University Classroom Lecture to a Complete Digital Archive'}
              </h2>
              <p class="text-sm sm:text-[15px] text-[#2B352F] leading-[1.85]">
                ${isBn
                  ? 'এই ওয়েবসাইটটি বানানোর প্রথম আইডিয়াটা এসেছিল আমার ইউনিভার্সিটির ক্লাসরুমে বসে। একদিন ক্লাসে <strong>শামীমা ম্যাম (Shamima Ma’am)</strong> যখন বাংলাদেশের ইতিহাস, ভূগোল, নৃগোষ্ঠী ও জাতীয় বিষয়গুলো পড়াচ্ছিলেন, তখন মনোযোগ দিয়ে শুনতে শুনতে হঠাৎ মনে হলো—বাংলাদেশ সম্পর্কে এত সমৃদ্ধ, চমৎকার ও গুরুত্বপূর্ণ তথ্যগুলো শুধু ক্লাসের খাতায় বা পরীক্ষার নোটে সীমাবদ্ধ থাকলে চলবে না।'
                  : 'The spark for this website came right inside my university classroom. While <strong>Shamima Ma’am</strong> was teaching us about Bangladesh’s history, geography, heritage, and national profile, I realized that such rich, eye-opening knowledge shouldn’t stay locked inside class notebooks alone.'}
              </p>
              <p class="text-sm sm:text-[15px] text-[#2B352F] leading-[1.85]">
                ${isBn
                  ? 'সেই মুহূর্তেই ভাবলাম, এমন একটি আধুনিক ও ইন্টারঅ্যাক্টিভ ওয়েবসাইট বানাব যেখানে বাংলাদেশের মানুষ নিজের দেশের প্রতিটি জেলা, জনপদ, ক্ষুদ্র নৃগোষ্ঠী ও অর্জন সম্পর্কে সহজে জানতে পারবে—আর বিদেশের মানুষও এক ক্লিকেই বুঝতে পারবে বাংলাদেশ কতটা সমৃদ্ধ ও সম্ভাবনাময় একটি দেশ। ক্লাসরুমের সেই ছোট্ট ভাবনাই আজ রূপ নিয়েছে ৭টি মূল পেজ, ৬৪ জেলার মানচিত্র, অ্যানিমেটেড ট্যুর এবং বিশ্ব তুলনার এই ডিজিটাল পোর্টালে।'
                  : 'Right then, I decided to turn those lessons into an interactive web portal where people in Bangladesh can explore every district, ancient janapada, and indigenous community—and people abroad can see Bangladesh’s true richness and global progress at a glance. That single classroom spark grew into this 7-page interactive archive.'}
              </p>
            </div>
            <div class="lg:col-span-4">
              <div class="rounded-[22px] bg-[#EFF5F2] border border-[#D4E3DC] p-5 space-y-3">
                <div class="text-xs font-bold uppercase tracking-wider text-[#0C6B58]">
                  ${isBn ? 'বিশেষ কৃতজ্ঞতা' : 'SPECIAL GRATITUDE'}
                </div>
                <div class="font-heading text-lg font-extrabold text-[#16211C]">
                  ${isBn ? 'শামীমা ম্যাম (Shamima Ma’am)' : 'Shamima Ma’am'}
                </div>
                <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">
                  ${isBn
                    ? 'বিশ্ববিদ্যালয়ের ক্লাসরুমে তাঁর অনুপ্রেরণাদায়ী পাঠদানই আমাকে বাংলাদেশকে নতুনভাবে জানতে এবং এই ওয়েবসাইটটি তৈরি করতে উৎসাহিত করেছে।'
                    : 'Her inspiring teaching in the university classroom sparked the curiosity and motivation to build this digital portal about Bangladesh.'}
                </p>
                <div class="pt-2 border-t border-[#D4E3DC] flex items-center justify-between text-xs font-bold text-[#0F6B4F]">
                  <span>${isBn ? 'পরিকল্পনা ও নির্মাণ' : 'Created & Built by'}</span>
                  <span class="text-[#16211C]">Tanvir Tasin</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2: Core Motive Cards -->
        <section class="lux-card p-5 sm:p-6">
          <div class="pb-4 border-b border-[#E5E8E0]">
            <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">
              ${isBn ? 'মূল লক্ষ্য ও উদ্দেশ্য' : 'CORE MOTIVE & VISION'}
            </span>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-[#16211C] mt-2">
              ${isBn ? 'এই ওয়েবসাইটটি যে ৩টি লক্ষ্য নিয়ে তৈরি' : 'The 3 Core Goals Behind This Portal'}
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            ${motives.map(m => `
              <div class="rounded-[22px] bg-white border border-[#E4E8E6] p-5 space-y-2.5 modern-lift">
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#084B3E] text-white font-heading text-sm font-extrabold">${isBn ? m.num : m.numEn}</span>
                <h3 class="font-heading text-base sm:text-lg font-bold text-[#16211C] leading-snug">${isBn ? m.titleBn : m.titleEn}</h3>
                <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">${isBn ? m.descBn : m.descEn}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Section 3: Verified Information Sources -->
        <section class="lux-card p-5 sm:p-6">
          <div class="pb-4 border-b border-[#E5E8E0]">
            <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">
              ${isBn ? 'তথ্যসূত্র ও যাচাইকরণ' : 'VERIFIED DATA SOURCES'}
            </span>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-[#16211C] mt-2">
              ${isBn ? 'এই ওয়েবসাইটের তথ্যগুলো যেসব উৎস থেকে সংগ্রহ করা হয়েছে' : 'Where All Information & Statistics Were Collected From'}
            </h2>
            <p class="text-xs sm:text-sm text-[#5D6762] mt-1">
              ${isBn
                ? 'তথ্যের নির্ভুলতা নিশ্চিত করতে ক্লাসরুমের নোটের পাশাপাশি সরকারি শুমারি, বিশ্বকোষ এবং আন্তর্জাতিক সংস্থার সাম্প্রতিক প্রতিবেদন যাচাই করে যুক্ত করা হয়েছে।'
                : 'To ensure accuracy, classroom notes were cross-checked and enriched with official national censuses, encyclopedias, and recent international datasets.'}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            ${sources.map(s => `
              <div class="rounded-[20px] bg-[#F7FAF8] border border-[#DDE7E2] p-4 sm:p-5 space-y-1.5">
                <span class="inline-block text-[11px] font-bold text-[#0F6B4F] bg-[#DCEFE5] px-2.5 py-0.5 rounded-full">${isBn ? s.tagBn : s.tagEn}</span>
                <h3 class="font-heading text-base font-bold text-[#16211C]">${isBn ? s.titleBn : s.titleEn}</h3>
                <p class="text-xs sm:text-sm text-[#2B352F] leading-relaxed">${isBn ? s.descBn : s.descEn}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Section 4: Disclaimer, Scope & Quick Explore -->
        <section class="lux-card p-5 sm:p-6">
          <div class="rounded-[22px] bg-[#121714] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="text-xs font-bold text-[#6CE0B1] uppercase tracking-wider">
                ${isBn ? 'পাঠকদের প্রতি নোট' : 'A NOTE TO READERS'}
              </div>
              <p class="text-sm text-white/90 leading-relaxed">
                ${isBn
                  ? 'এই পোর্টালটি শিক্ষামূলক ও তথ্যভিত্তিক উদ্দেশ্যে তৈরি। বাংলা ও ইংরেজি—উভয় ভাষায় সহজলভ্য করে তোলা হয়েছে যাতে দেশ-বিদেশের যেকোনো পাঠক নির্বিঘ্নে বাংলাদেশকে জানতে পারেন। উপরের ভাষা বাটন থেকে যেকোনো সময় বাংলা বা English বেছে নিতে পারবেন।'
                  : 'This portal is built for educational and informational purposes in both Bangla and English so readers anywhere in the world can explore Bangladesh effortlessly. Use the language toggle at the top anytime to switch between Bangla and English.'}
              </p>
            </div>
            <div class="flex flex-wrap gap-2 shrink-0">
              <button type="button" onclick="ubJumpPage('districts')" class="px-4 py-2 rounded-full bg-[#0C6B58] hover:bg-[#11856E] text-white text-xs font-bold transition cursor-pointer">
                ${isBn ? '৬৪ জেলার মানচিত্র দেখুন' : 'Explore 64-District Map'}
              </button>
              <button type="button" onclick="ubJumpPage('world')" class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition cursor-pointer">
                ${isBn ? 'বাংলাদেশ বনাম বিশ্ব' : 'Bangladesh vs World'}
              </button>
            </div>
          </div>
        </section>
      `;
    }


    // =========================================================================
    // PAGE 9: BANGLADESH VS DEVELOPED COUNTRIES (HEAD-TO-HEAD INTERACTIVE)
    // =========================================================================
    const BD_BASELINE = {
      id: 'bd', iso: 'BD', nameBn: 'বাংলাদেশ', nameEn: 'Bangladesh',
      areaKm2: 148460, popM: 171.6, density: 1333,
      gdpNomBn: '$৫০৬ বিলিয়ন (#৩৬)', gdpNomEn: '$506B (#36)', gdpNomVal: 506,
      gdpPppBn: '$১.৯ ট্রিলিয়ন (#২৬)', gdpPppEn: '$1.9T (#26)',
      gdpCap: 2890, life: 74.7, hdi: 0.685, hdiRankBn: '#১৩০', hdiRankEn: '#130',
      literacy: 77.9, internet: 53, electricity: 99.5, urban: 41, co2: 0.7,
      milRank: 37,
      radar: [96, 48, 53, 68, 75, 75]
    };

    const DEVELOPED_COUNTRIES = [
      {
        id: 'us', iso: 'US', nameBn: 'যুক্তরাষ্ট্র', nameEn: 'United States',
        regionBn: 'উত্তর আমেরিকা · G7', regionEn: 'North America · G7',
        areaKm2: 9833517, popM: 340.0, density: 37,
        gdpNomBn: '$৩০.৩ ট্রিলিয়ন (#১)', gdpNomEn: '$30.3T (#1)', gdpNomVal: 30300,
        gdpPppBn: '$৩০.৩ ট্রিলিয়ন (#২)', gdpPppEn: '$30.3T (#2)',
        gdpCap: 89100, life: 79.3, hdi: 0.938, hdiRankBn: '#১৭', hdiRankEn: '#17',
        literacy: 99.0, internet: 93, electricity: 100, urban: 83, co2: 14.3, milRank: 1,
        radar: [98, 100, 96, 94, 80, 100],
        bdEdgeBn: 'বাংলাদেশের মাথাপিছু CO₂ নিঃসরণ যুক্তরাষ্ট্রের তুলনায় প্রায় ২০ গুণ কম (০.৭ বনাম ১৪.৩ টন), আর যুক্তরাষ্ট্র বাংলাদেশের তৈরি পোশাকের একক বৃহত্তম রপ্তানি বাজার।',
        bdEdgeEn: 'Bangladesh’s per-capita CO₂ is ~20× lower than the US (0.7 vs 14.3t), and the US is Bangladesh’s single largest apparel export destination.',
        learnBn: 'উচ্চশিক্ষা ও গবেষণা (R&D), স্টার্টআপ ইকোসিস্টেম, প্রযুক্তি উদ্ভাবন এবং উচ্চ-মূল্যের সেবা খাত গড়ে তোলা।',
        learnEn: 'Research & development (R&D), startup ecosystem, deep-tech innovation, and high-value service exports.'
      },
      {
        id: 'cn', iso: 'CN', nameBn: 'চীন', nameEn: 'China',
        regionBn: 'পূর্ব এশিয়া · বিশ্ব ২য় অর্থনীতি', regionEn: 'East Asia · #2 Economy',
        areaKm2: 9596961, popM: 1409.0, density: 150,
        gdpNomBn: '$১৯.৫ ট্রিলিয়ন (#২)', gdpNomEn: '$19.5T (#2)', gdpNomVal: 19500,
        gdpPppBn: '$৩৮.২ ট্রিলিয়ন (#১)', gdpPppEn: '$38.2T (#1)',
        gdpCap: 13800, life: 78.6, hdi: 0.797, hdiRankBn: '#৭৫', hdiRankEn: '#75',
        literacy: 97.2, internet: 78, electricity: 100, urban: 66, co2: 8.4, milRank: 3,
        radar: [100, 96, 86, 80, 79, 98],
        bdEdgeBn: 'বিশ্ব তৈরি পোশাক রপ্তানিতে চীনের ঠিক পরেই বাংলাদেশের অবস্থান (#২); বাংলাদেশের তরুণ কর্মশক্তি ও কম কার্বন নিঃসরণ বড় সুবিধা।',
        bdEdgeEn: 'Bangladesh ranks #2 globally in apparel exports right behind China, backed by a young workforce and 12× lower per-capita emissions.',
        learnBn: 'রপ্তানি বৈচিত্র্যকরণ (ইলেকট্রনিক্স, ইভি, সেমিকন্ডাক্টর), দ্রুতগতির অবকাঠামো ও বিশেষ অর্থনৈতিক অঞ্চলের দক্ষ ব্যবহার।',
        learnEn: 'Export diversification (electronics, EVs, machinery), high-speed logistics, and industrial park productivity.'
      },
      {
        id: 'uk', iso: 'UK', nameBn: 'যুক্তরাজ্য', nameEn: 'United Kingdom',
        regionBn: 'ইউরোপ · G7', regionEn: 'Europe · G7',
        areaKm2: 243610, popM: 69.0, density: 283,
        gdpNomBn: '$৩.৭ ট্রিলিয়ন (#৬)', gdpNomEn: '$3.7T (#6)', gdpNomVal: 3700,
        gdpPppBn: '$৪.৩ ট্রিলিয়ন (#১০)', gdpPppEn: '$4.3T (#10)',
        gdpCap: 54200, life: 81.3, hdi: 0.946, hdiRankBn: '#১৩', hdiRankEn: '#13',
        literacy: 99.0, internet: 96, electricity: 100, urban: 85, co2: 4.6, milRank: 6,
        radar: [72, 86, 95, 95, 83, 93],
        bdEdgeBn: 'যুক্তরাজ্যে বিশাল প্রবাসী বাংলাদেশি কমিউনিটি রয়েছে; বাংলাদেশের জনসংখ্যা যুক্তরাজ্যের ২.৫ গুণ এবং কৃষি-মৎস্য উৎপাদনে বাংলাদেশ অনেক এগিয়ে।',
        bdEdgeEn: 'Bangladesh has 2.5× the UK’s population, strong agricultural output, and a vibrant diaspora bridge with the UK.',
        learnBn: 'বিশ্বমানের বিশ্ববিদ্যালয়, আর্থিক ও আইনি সেবা খাত, শক্তিশালী প্রতিষ্ঠান ও স্বচ্ছ শাসনব্যবস্থা।',
        learnEn: 'World-class universities, financial & legal services, institutional strength, and green energy transition.'
      },
      {
        id: 'jp', iso: 'JP', nameBn: 'জাপান', nameEn: 'Japan',
        regionBn: 'পূর্ব এশিয়া · G7', regionEn: 'East Asia · G7',
        areaKm2: 377975, popM: 123.5, density: 338,
        gdpNomBn: '$৪.২ ট্রিলিয়ন (#৪)', gdpNomEn: '$4.2T (#4)', gdpNomVal: 4200,
        gdpPppBn: '$৬.৮ ট্রিলিয়ন (#৫)', gdpPppEn: '$6.8T (#5)',
        gdpCap: 34000, life: 84.7, hdi: 0.925, hdiRankBn: '#২৩', hdiRankEn: '#23',
        literacy: 99.0, internet: 87, electricity: 100, urban: 92, co2: 8.5, milRank: 8,
        radar: [84, 88, 92, 93, 99, 90],
        bdEdgeBn: 'জাপান বয়স্ক জনসংখ্যার চ্যালেঞ্জে আছে, কিন্তু বাংলাদেশের রয়েছে বিশাল তরুণ কর্মশক্তি (ডেমোগ্রাফিক ডিভিডেন্ড) ও জাপানের সঙ্গে গভীর উন্নয়ন অংশীদারিত্ব।',
        bdEdgeEn: 'While Japan faces rapid aging, Bangladesh enjoys a strong youth demographic dividend and deep infrastructure partnership with Japan.',
        learnBn: 'নির্ভুল প্রকৌশল (Precision manufacturing), দুর্যোগ মোকাবিলায় আধুনিক প্রযুক্তি, সময়ানুবর্তিতা ও নিরাপদ গণপরিবহন।',
        learnEn: 'Precision engineering, disaster-resilient urban planning, punctuality, and world-class public transit.'
      },
      {
        id: 'kr', iso: 'KR', nameBn: 'দক্ষিণ কোরিয়া', nameEn: 'South Korea',
        regionBn: 'পূর্ব এশিয়া · উন্নত প্রযুক্তি', regionEn: 'East Asia · Tech Power',
        areaKm2: 100210, popM: 51.7, density: 531,
        gdpNomBn: '$১.৯৫ ট্রিলিয়ন (#১২)', gdpNomEn: '$1.95T (#12)', gdpNomVal: 1950,
        gdpPppBn: '$৩.৩ ট্রিলিয়ন (#১৪)', gdpPppEn: '$3.3T (#14)',
        gdpCap: 37700, life: 84.3, hdi: 0.937, hdiRankBn: '#২০', hdiRankEn: '#20',
        literacy: 98.8, internet: 97, electricity: 100, urban: 81, co2: 11.6, milRank: 5,
        radar: [66, 82, 98, 94, 98, 95],
        bdEdgeBn: 'আয়তনে বাংলাদেশ দক্ষিণ কোরিয়ার চেয়ে প্রায় ১.৫ গুণ বড় এবং জনসংখ্যা ৩ গুণের বেশি; ১৯৬০-এর দশকে কোরিয়াও ছিল কৃষি-নির্ভর—যা বাংলাদেশের জন্য বড় অনুপ্রেরণা।',
        bdEdgeEn: 'Bangladesh is ~1.5× larger in area with 3× the population; Korea’s transformation from a 1960s agrarian economy is a direct blueprint for Bangladesh.',
        learnBn: 'সেমিকন্ডাক্টর, জাহাজ নির্মাণ, কারিগরি শিক্ষা (TVET) এবং রপ্তানিমুখী শিল্পে ব্যাপক বিনিয়োগ।',
        learnEn: 'Semiconductors, shipbuilding, vocational tech education (TVET), and export-oriented R&D.'
      },
      {
        id: 'de', iso: 'DE', nameBn: 'জার্মানি', nameEn: 'Germany',
        regionBn: 'ইউরোপ · G7 · ইইউ শীর্ষ অর্থনীতি', regionEn: 'Europe · G7 · EU Leader',
        areaKm2: 357592, popM: 84.5, density: 240,
        gdpNomBn: '$৪.৯ ট্রিলিয়ন (#৩)', gdpNomEn: '$4.9T (#3)', gdpNomVal: 4900,
        gdpPppBn: '$৬.২ ট্রিলিয়ন (#৬)', gdpPppEn: '$6.2T (#6)',
        gdpCap: 58000, life: 81.4, hdi: 0.959, hdiRankBn: '#৫', hdiRankEn: '#5',
        literacy: 99.0, internet: 93, electricity: 100, urban: 78, co2: 7.1, milRank: 14,
        radar: [78, 90, 93, 96, 84, 84],
        bdEdgeBn: 'ইউরোপে বাংলাদেশের পোশাকের অন্যতম শীর্ষ ক্রেতা জার্মানি; বাংলাদেশের মাথাপিছু কার্বন নিঃসরণ জার্মানির ১০ ভাগের ১ ভাগ।',
        bdEdgeEn: 'Germany is a top European buyer of Bangladeshi apparel, while Bangladesh’s per-capita CO₂ is one-tenth of Germany’s.',
        learnBn: 'দ্বৈত কারিগরি প্রশিক্ষণ (Dual Vocational Training), নবায়নযোগ্য জ্বালানি ও ক্ষুদ্র-মাঝারি শিল্প (Mittelstand) মডেল।',
        learnEn: 'Dual vocational apprenticeship system, renewable energy engineering, and specialized SMEs (Mittelstand).'
      },
      {
        id: 'sg', iso: 'SG', nameBn: 'সিঙ্গাপুর', nameEn: 'Singapore',
        regionBn: 'দক্ষিণ-পূর্ব এশিয়া · বাণিজ্য হাব', regionEn: 'Southeast Asia · Global Hub',
        areaKm2: 734, popM: 6.0, density: 8250,
        gdpNomBn: '$৫৬৫ বিলিয়ন (#২৮)', gdpNomEn: '$565B (#28)', gdpNomVal: 565,
        gdpPppBn: '$৯১০ বিলিয়ন', gdpPppEn: '$910B',
        gdpCap: 93900, life: 83.7, hdi: 0.946, hdiRankBn: '#১৩', hdiRankEn: '#13',
        literacy: 97.6, internet: 96, electricity: 100, urban: 100, co2: 8.9, milRank: 29,
        radar: [28, 74, 98, 95, 96, 78],
        bdEdgeBn: 'সিঙ্গাপুরের চেয়ে বাংলাদেশের আয়তন ২০০ গুণের বেশি এবং মোট জিডিপি প্রায় কাছাকাছি ($৫০৬B বনাম $৫৬৫B), সাথে রয়েছে বিশাল কৃষি ও সমুদ্রসম্পদ।',
        bdEdgeEn: 'Bangladesh has 200× Singapore’s land area, rich agriculture & maritime resources, and a comparable total nominal GDP ($506B vs $565B).',
        learnBn: 'বন্দর ও লজিস্টিকস দক্ষতা, দুর্নীতিমুক্ত ডিজিটাল প্রশাসন, স্মার্ট নগর পরিকল্পনা ও মানবসম্পদ উন্নয়ন।',
        learnEn: 'Port & maritime logistics efficiency, digital governance, smart urban planning, and merit-based human capital.'
      },
      {
        id: 'au', iso: 'AU', nameBn: 'অস্ট্রেলিয়া', nameEn: 'Australia',
        regionBn: 'ওশেনিয়া · উন্নত অর্থনীতি', regionEn: 'Oceania · Advanced Economy',
        areaKm2: 7692024, popM: 27.2, density: 4,
        gdpNomBn: '$১.৮৮ ট্রিলিয়ন (#১৩)', gdpNomEn: '$1.88T (#13)', gdpNomVal: 1880,
        gdpPppBn: '$১.৯৫ ট্রিলিয়ন', gdpPppEn: '$1.95T',
        gdpCap: 69100, life: 83.9, hdi: 0.958, hdiRankBn: '#৭', hdiRankEn: '#7',
        literacy: 99.0, internet: 95, electricity: 100, urban: 87, co2: 14.5, milRank: 18,
        radar: [48, 80, 94, 96, 97, 82],
        bdEdgeBn: 'অস্ট্রেলিয়ার চেয়ে বাংলাদেশের জনসংখ্যা ৬ গুণের বেশি এবং PPP জিডিপি প্রায় সমান ($১.৯T বনাম $১.৯৫T), অথচ বাংলাদেশের CO₂ নিঃসরণ ২০ গুণ কম।',
        bdEdgeEn: 'Bangladesh matches Australia’s PPP GDP (~$1.9T) with 6× the population and 20× lower per-capita CO₂ emissions.',
        learnBn: 'আধুনিক কৃষি-বাণিজ্য, খনিজ ও নীল অর্থনীতি ব্যবস্থাপনা এবং আন্তর্জাতিক মানের উচ্চশিক্ষা খাত।',
        learnEn: 'Modern agribusiness, sustainable maritime resource management, and export-oriented higher education.'
      },
      {
        id: 'ca', iso: 'CA', nameBn: 'কানাডা', nameEn: 'Canada',
        regionBn: 'উত্তর আমেরিকা · G7', regionEn: 'North America · G7',
        areaKm2: 9984670, popM: 41.3, density: 5,
        gdpNomBn: '$২.৩৩ ট্রিলিয়ন (#৯)', gdpNomEn: '$2.33T (#9)', gdpNomVal: 2330,
        gdpPppBn: '$২.৬৮ ট্রিলিয়ন', gdpPppEn: '$2.68T',
        gdpCap: 56400, life: 82.6, hdi: 0.939, hdiRankBn: '#১৬', hdiRankEn: '#16',
        literacy: 99.0, internet: 94, electricity: 100, urban: 82, co2: 14.2, milRank: 28,
        radar: [56, 84, 94, 94, 92, 78],
        bdEdgeBn: 'কানাডার তুলনায় বাংলাদেশের জমি ৬৭ গুণ ছোট হলেও জনসংখ্যা ৪ গুণের বেশি; বাংলাদেশের তৈরি পোশাক ও দক্ষ পেশাজীবী কানাডায় সুপরিচিত।',
        bdEdgeEn: 'With 67× less land, Bangladesh supports 4× Canada’s population and supplies major apparel & skilled talent to Canada.',
        learnBn: 'সর্বজনীন স্বাস্থ্যসেবা, এআই ও ক্লিন-টেক গবেষণা এবং প্রাকৃতিক পরিবেশ সংরক্ষণ।',
        learnEn: 'Universal healthcare systems, AI & clean-tech research hubs, and forest conservation.'
      },
      {
        id: 'fr', iso: 'FR', nameBn: 'ফ্রান্স', nameEn: 'France',
        regionBn: 'ইউরোপ · G7', regionEn: 'Europe · G7',
        areaKm2: 551695, popM: 68.4, density: 124,
        gdpNomBn: '$৩.২৮ ট্রিলিয়ন (#৭)', gdpNomEn: '$3.28T (#7)', gdpNomVal: 3280,
        gdpPppBn: '$৪.৪৫ ট্রিলিয়ন', gdpPppEn: '$4.45T',
        gdpCap: 48000, life: 83.3, hdi: 0.920, hdiRankBn: '#২৬', hdiRankEn: '#26',
        literacy: 99.0, internet: 87, electricity: 100, urban: 82, co2: 4.3, milRank: 7,
        radar: [71, 86, 90, 92, 95, 92],
        bdEdgeBn: 'ফ্রান্স ইউরোপীয় ইউনিয়নে বাংলাদেশের তৈরি পোশাকের শীর্ষ বাজারগুলোর একটি; বাংলাদেশের রয়েছে বড় তরুণ শ্রমশক্তি ও দ্রুত বর্ধনশীল অভ্যন্তরীণ বাজার।',
        bdEdgeEn: 'France is one of Bangladesh’s top EU apparel partners, while Bangladesh brings a much younger demographic and fast-growing domestic market.',
        learnBn: 'নিরাপদ পারমাণবিক ও পরিচ্ছন্ন জ্বালানি, পর্যটন ব্র্যান্ডিং, মহাকাশ প্রযুক্তি ও উচ্চমানের ফ্যাশন ডিজাইন।',
        learnEn: 'Clean low-carbon power, heritage tourism branding, aerospace engineering, and high-margin fashion design.'
      },
      {
        id: 'ch', iso: 'CH', nameBn: 'সুইজারল্যান্ড', nameEn: 'Switzerland',
        regionBn: 'ইউরোপ · বিশ্ব ২য় HDI', regionEn: 'Europe · #2 Global HDI',
        areaKm2: 41285, popM: 9.0, density: 225,
        gdpNomBn: '$৯৭৫ বিলিয়ন (#২০)', gdpNomEn: '$975B (#20)', gdpNomVal: 975,
        gdpPppBn: '$৮৫০ বিলিয়ন', gdpPppEn: '$850B',
        gdpCap: 108300, life: 84.0, hdi: 0.970, hdiRankBn: '#২', hdiRankEn: '#2',
        literacy: 99.0, internet: 97, electricity: 100, urban: 74, co2: 3.8, milRank: 44,
        radar: [32, 78, 97, 99, 97, 70],
        bdEdgeBn: 'সামরিক র‍্যাংক (#৩৭ বনাম #৪৪), মোট PPP জিডিপি ($১.৯T বনাম $৮৫০B) এবং আয়তন-জনসংখ্যায় বাংলাদেশ সুইজারল্যান্ডের চেয়ে এগিয়ে।',
        bdEdgeEn: 'Bangladesh outranks Switzerland in total PPP GDP ($1.9T vs $850B), GFP military rank (#37 vs #44), and land & population scale.',
        learnBn: 'ফার্মাসিউটিক্যালস, প্রিসিশন ইন্ডাস্ট্রি, উদ্ভাবন সূচকে শীর্ষস্থান এবং উচ্চমানের নাগরিক সেবা।',
        learnEn: 'Pharmaceutical R&D, precision manufacturing, #1 global innovation index practices, and civic quality.'
      },
      {
        id: 'ae', iso: 'AE', nameBn: 'সংযুক্ত আরব আমিরাত', nameEn: 'United Arab Emirates',
        regionBn: 'মধ্যপ্রাচ্য · বৈশ্বিক বাণিজ্য হাব', regionEn: 'Middle East · Global Trade Hub',
        areaKm2: 83600, popM: 10.7, density: 128,
        gdpNomBn: '$৫৭০ বিলিয়ন (#২৭)', gdpNomEn: '$570B (#27)', gdpNomVal: 570,
        gdpPppBn: '$৯৬০ বিলিয়ন', gdpPppEn: '$960B',
        gdpCap: 53200, life: 82.9, hdi: 0.940, hdiRankBn: '#১৫', hdiRankEn: '#15',
        literacy: 98.1, internet: 99, electricity: 100, urban: 88, co2: 21.8, milRank: 54,
        radar: [36, 74, 99, 94, 93, 66],
        bdEdgeBn: 'বাংলাদেশের PPP জিডিপি আমিরাতের প্রায় দ্বিগুণ ($১.৯T বনাম $৯৬০B), সামরিক র‍্যাংকেও এগিয়ে (#৩৭ বনাম #৫৪), আর CO₂ নিঃসরণ ৩১ গুণ কম!',
        bdEdgeEn: 'Bangladesh’s PPP GDP is nearly double the UAE’s ($1.9T vs $960B), ranks higher militarily (#37 vs #54), and emits 31× less CO₂ per capita.',
        learnBn: 'আধুনিক এভিয়েশন ও বন্দর অবকাঠামো, পর্যটন আকর্ষণ, ডিজিটাল সরকারি সেবা ও বৈশ্বিক বিনিয়োগবান্ধব নীতি।',
        learnEn: 'Global aviation & port hubs, tourism magnetism, 100% digital government services, and foreign investment openness.'
      }
    ];

    function renderComparePage() {
      const container = document.getElementById('page-compare');
      if (!container) return;
      const isBn = state.lang === 'bn';
      const c = DEVELOPED_COUNTRIES.find(x => x.id === state.compareCountryId) || DEVELOPED_COUNTRIES[0];
      const bd = BD_BASELINE;
      const cName = isBn ? c.nameBn : c.nameEn;
      const bdName = isBn ? bd.nameBn : bd.nameEn;

      const barMetrics = [
        { lblBn: 'গড় আয়ু (বছর)', lblEn: 'Life Expectancy (yrs)', bdVal: bd.life, cVal: c.life, max: 90, fmt: v => isBn ? `${fmtNum(v, 'bn')} বছর` : `${v} yrs` },
        { lblBn: 'মানব উন্নয়ন সূচক (HDI)', lblEn: 'Human Development Index (HDI)', bdVal: bd.hdi * 100, cVal: c.hdi * 100, max: 100, fmt: v => isBn ? fmtNum((v / 100).toFixed(3), 'bn') : (v / 100).toFixed(3) },
        { lblBn: 'সাক্ষরতার হার (%)', lblEn: 'Literacy Rate (%)', bdVal: bd.literacy, cVal: c.literacy, max: 100, fmt: v => `${fmtNum(v, state.lang)}%` },
        { lblBn: 'ইন্টারনেট ব্যবহারকারী (%)', lblEn: 'Internet Users (%)', bdVal: bd.internet, cVal: c.internet, max: 100, fmt: v => `${fmtNum(v, state.lang)}%` },
        { lblBn: 'বিদ্যুৎ সংযোগ (%)', lblEn: 'Electricity Access (%)', bdVal: bd.electricity, cVal: c.electricity, max: 100, fmt: v => `${fmtNum(v, state.lang)}%` },
        { lblBn: 'নগরায়ণের হার (%)', lblEn: 'Urbanization Rate (%)', bdVal: bd.urban, cVal: c.urban, max: 100, fmt: v => `${fmtNum(v, state.lang)}%` }
      ];

      const tableRows = [
        { kBn: 'মোট আয়তন', kEn: 'Total Area', bdV: isBn ? `${fmtNum(bd.areaKm2, 'bn')} ব.কি.মি.` : `${bd.areaKm2.toLocaleString()} km²`, cV: isBn ? `${fmtNum(c.areaKm2, 'bn')} ব.কি.মি.` : `${c.areaKm2.toLocaleString()} km²` },
        { kBn: 'জনসংখ্যা', kEn: 'Population', bdV: isBn ? `${fmtNum(bd.popM, 'bn')} মিলিয়ন (১৭.১৬ কোটি)` : `${bd.popM}M`, cV: isBn ? `${fmtNum(c.popM, 'bn')} মিলিয়ন` : `${c.popM}M` },
        { kBn: 'জনসংখ্যার ঘনত্ব', kEn: 'Population Density', bdV: isBn ? `${fmtNum(bd.density, 'bn')} জন/ব.কি.মি.` : `${bd.density.toLocaleString()} /km²`, cV: isBn ? `${fmtNum(c.density, 'bn')} জন/ব.কি.মি.` : `${c.density.toLocaleString()} /km²` },
        { kBn: 'নামমাত্র জিডিপি (IMF ২০২৬)', kEn: 'Nominal GDP (IMF 2026)', bdV: isBn ? bd.gdpNomBn : bd.gdpNomEn, cV: isBn ? c.gdpNomBn : c.gdpNomEn },
        { kBn: 'PPP জিডিপি (ক্রয়ক্ষমতা)', kEn: 'PPP GDP', bdV: isBn ? bd.gdpPppBn : bd.gdpPppEn, cV: isBn ? c.gdpPppBn : c.gdpPppEn },
        { kBn: 'মাথাপিছু জিডিপি (নমিনাল)', kEn: 'GDP per Capita (Nominal)', bdV: isBn ? `$${fmtNum(bd.gdpCap, 'bn')}` : `$${bd.gdpCap.toLocaleString()}`, cV: isBn ? `$${fmtNum(c.gdpCap, 'bn')}` : `$${c.gdpCap.toLocaleString()}` },
        { kBn: 'গড় আয়ু (UNDP ২০২৫)', kEn: 'Life Expectancy (UNDP 2025)', bdV: isBn ? `${fmtNum(bd.life, 'bn')} বছর` : `${bd.life} yrs`, cV: isBn ? `${fmtNum(c.life, 'bn')} বছর` : `${c.life} yrs` },
        { kBn: 'মানব উন্নয়ন সূচক (HDI)', kEn: 'HDI Score & Rank', bdV: isBn ? `${fmtNum(bd.hdi, 'bn')} (${bd.hdiRankBn})` : `${bd.hdi} (${bd.hdiRankEn})`, cV: isBn ? `${fmtNum(c.hdi, 'bn')} (${c.hdiRankBn})` : `${c.hdi} (${c.hdiRankEn})` },
        { kBn: 'সামরিক র‍্যাংক (GFP ২০২৬)', kEn: 'Military Rank (GFP 2026)', bdV: isBn ? `#${fmtNum(bd.milRank, 'bn')} / ১৪৫ দেশ` : `#${bd.milRank} of 145`, cV: isBn ? `#${fmtNum(c.milRank, 'bn')} / ১৪৫ দেশ` : `#${c.milRank} of 145` },
        { kBn: 'মাথাপিছু CO₂ নিঃসরণ', kEn: 'CO₂ per Capita', bdV: isBn ? `${fmtNum(bd.co2, 'bn')} টন` : `${bd.co2} tonnes`, cV: isBn ? `${fmtNum(c.co2, 'bn')} টন` : `${c.co2} tonnes` }
      ];

      container.innerHTML = `
        <!-- Hero Banner -->
        <section class="lux-card p-3.5 sm:p-4">
          <div class="rounded-[22px] hero-topo text-white p-6 sm:p-8 relative overflow-hidden">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-[#16211C] text-xs font-bold">
                ${isBn ? 'সরাসরি তুলনা · বাংলাদেশ বনাম উন্নত দেশ' : 'HEAD-TO-HEAD · BANGLADESH VS DEVELOPED COUNTRIES'}
              </div>
              <button type="button" onclick="ubJumpPage('world')" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/25 transition cursor-pointer">
                <span>←</span>
                <span>${isBn ? 'বনাম বিশ্ব পাতায় ফিরুন' : 'Back to Bangladesh vs World'}</span>
              </button>
            </div>
            <h1 class="font-heading text-2xl sm:text-4xl font-bold leading-tight max-w-3xl">
              ${isBn ? `বাংলাদেশ বনাম ${c.nameBn}` : `Bangladesh vs ${c.nameEn}`}
            </h1>
            <p class="text-sm sm:text-base text-white/90 leading-relaxed mt-2 max-w-3xl">
              ${isBn
                ? 'নিচ থেকে যেকোনো উন্নত দেশ নির্বাচন করুন—অর্থনীতি, মাথাপিছু আয়, গড় আয়ু, মানব উন্নয়ন (HDI), সামরিক শক্তি ও পরিবেশের সরাসরি তুলনা দেখুন অ্যানিমেটেড চার্টে।'
                : 'Select any developed economy below to compare GDP, per-capita income, life expectancy, HDI, military rank, and sustainability head-to-head against Bangladesh.'}
            </p>
          </div>

          <!-- Country Selector Strip -->
          <div class="pt-4 px-1 space-y-2.5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold text-[#5D6762]">${isBn ? 'তুলনা করার জন্য একটি দেশ বেছে নিন (১২টি উন্নত ও বৃহৎ দেশ):' : 'Choose a country to compare against Bangladesh (12 major economies):'}</span>
              <span class="text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-2.5 py-0.5 rounded-full">${isBn ? c.regionBn : c.regionEn}</span>
            </div>
            <div class="flex flex-wrap gap-2" id="cmpCountryPills">
              ${DEVELOPED_COUNTRIES.map(item => `
                <button type="button" data-cmp-id="${item.id}" class="cmp-country-pill ${item.id === c.id ? 'active' : ''}">
                  <span class="cmp-iso-badge">${item.iso}</span>
                  <span>${isBn ? item.nameBn : item.nameEn}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Head-to-Head KPI Strip -->
        <section class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div class="lux-card p-4 space-y-1.5">
            <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'মাথাপিছু জিডিপি' : 'GDP per Capita'}</div>
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-heading text-lg font-extrabold text-[#0F6B4F]">$${fmtNum(bd.gdpCap, state.lang)}</span>
              <span class="text-[11px] font-bold text-[#5D6762]">vs</span>
              <span class="font-heading text-lg font-extrabold text-[#1F5A7A]">$${fmtNum(c.gdpCap, state.lang)}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-semibold text-[#5D6762]"><span>${bdName}</span><span>${cName}</span></div>
          </div>

          <div class="lux-card p-4 space-y-1.5">
            <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'গড় আয়ু (বছর)' : 'Life Expectancy'}</div>
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-heading text-lg font-extrabold text-[#0F6B4F]">${fmtNum(bd.life, state.lang)}</span>
              <span class="text-[11px] font-bold text-[#5D6762]">vs</span>
              <span class="font-heading text-lg font-extrabold text-[#1F5A7A]">${fmtNum(c.life, state.lang)}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-semibold text-[#5D6762]"><span>${bdName}</span><span>${cName}</span></div>
          </div>

          <div class="lux-card p-4 space-y-1.5">
            <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'মানব উন্নয়ন (HDI)' : 'HDI Score'}</div>
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-heading text-lg font-extrabold text-[#0F6B4F]">${fmtNum(bd.hdi, state.lang)}</span>
              <span class="text-[11px] font-bold text-[#5D6762]">vs</span>
              <span class="font-heading text-lg font-extrabold text-[#1F5A7A]">${fmtNum(c.hdi, state.lang)}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-semibold text-[#5D6762]"><span>${isBn ? bd.hdiRankBn : bd.hdiRankEn}</span><span>${isBn ? c.hdiRankBn : c.hdiRankEn}</span></div>
          </div>

          <div class="lux-card p-4 space-y-1.5">
            <div class="text-[11px] font-bold text-[#5D6762]">${isBn ? 'সামরিক র‍্যাংক (GFP)' : 'Military Rank (GFP)'}</div>
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-heading text-lg font-extrabold text-[#0F6B4F]">#${fmtNum(bd.milRank, state.lang)}</span>
              <span class="text-[11px] font-bold text-[#5D6762]">vs</span>
              <span class="font-heading text-lg font-extrabold text-[#1F5A7A]">#${fmtNum(c.milRank, state.lang)}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-semibold text-[#5D6762]"><span>${bdName}</span><span>${cName}</span></div>
          </div>
        </section>

        <!-- Animated Dual Bar Chart + 6-Axis Overlay Radar Chart -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div class="lg:col-span-7 lux-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5E8E0]">
                <div>
                  <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">${isBn ? 'অ্যানিমেটেড তুলনামূলক বার চার্ট' : 'ANIMATED HEAD-TO-HEAD BARS'}</span>
                  <h2 class="font-heading text-lg sm:text-xl font-bold text-[#16211C] mt-1.5">${isBn ? `৬টি সামাজিক ও ডিজিটাল সূচকে ${bdName} বনাম ${cName}` : `6 Development Indicators: ${bdName} vs ${cName}`}</h2>
                </div>
                <div class="flex items-center gap-3 text-xs font-bold">
                  <span class="inline-flex items-center gap-1.5 text-[#0F6B4F]"><span class="w-3 h-3 rounded-full bg-[#0F7A53]"></span>${bdName}</span>
                  <span class="inline-flex items-center gap-1.5 text-[#1F5A7A]"><span class="w-3 h-3 rounded-full bg-[#1F5A7A]"></span>${cName}</span>
                </div>
              </div>
            </div>

            <div class="space-y-3 my-4 chart-rows-dimming" id="cmpBarsWrap">
              ${barMetrics.map((m, idx) => {
                const bdW = Math.min(100, (m.bdVal / m.max) * 100).toFixed(1);
                const cW = Math.min(100, (m.cVal / m.max) * 100).toFixed(1);
                const tip = `<div class='font-bold text-[#16211C] mb-1'>${isBn ? m.lblBn : m.lblEn}</div>` +
                  `<div class='font-extrabold text-[#0F6B4F]'>${bdName}: ${m.fmt(m.bdVal)}</div>` +
                  `<div class='font-extrabold text-[#1F5A7A]'>${cName}: ${m.fmt(m.cVal)}</div>`;
                return `
                  <div class="chart-row-interactive space-y-1.5" data-tip-html="${tip.replace(/"/g, '&quot;')}">
                    <div class="flex items-center justify-between text-xs font-bold">
                      <span class="text-[#16211C]">${isBn ? m.lblBn : m.lblEn}</span>
                      <span><span class="text-[#0F6B4F]">${m.fmt(m.bdVal)}</span> <span class="text-[#5D6762] font-normal">·</span> <span class="text-[#1F5A7A]">${m.fmt(m.cVal)}</span></span>
                    </div>
                    <div class="space-y-1">
                      <div class="w-full h-3 bg-[#E6EFEA] rounded-full overflow-hidden"><div class="h-full rounded-full chart-anim-bar" style="background:#0F7A53;--bar-idx:${idx}" data-anim-width="${bdW}%"></div></div>
                      <div class="w-full h-2.5 bg-[#E6EEF2] rounded-full overflow-hidden"><div class="h-full rounded-full chart-anim-bar" style="background:#1F5A7A;--bar-idx:${idx + 1}" data-anim-width="${cW}%"></div></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="lg:col-span-5 lux-card p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">${isBn ? 'ওভারলে রাডার চার্ট' : 'OVERLAY RADAR CHART'}</span>
              <h2 class="font-heading text-lg sm:text-xl font-bold text-[#16211C] mt-1.5">${isBn ? `৬টি শক্তিমাত্রায় ${bdName} বনাম ${cName}` : `6-Axis Strength Profile`}</h2>
              <p class="text-xs text-[#5D6762] mt-0.5">${isBn ? 'যেকোনো পয়েন্টে হোভার করে স্কোর দেখুন' : 'Hover any vertex to inspect normalized scores'}</p>
            </div>
            <div class="flex items-center justify-center my-2">
              <svg id="compareRadarSvg" class="w-full max-w-[320px] h-[265px]" viewBox="0 0 320 270" role="img" aria-label="Bangladesh vs Country Radar"></svg>
            </div>
            <div class="flex items-center justify-center gap-4 text-xs font-bold">
              <span class="inline-flex items-center gap-1.5 text-[#0F6B4F]"><span class="w-3 h-3 rounded-full bg-[#0F7A53]"></span>${bdName}</span>
              <span class="inline-flex items-center gap-1.5 text-[#1F5A7A]"><span class="w-3 h-3 rounded-full bg-[#1F5A7A]"></span>${cName}</span>
            </div>
          </div>
        </section>

        <!-- Key Takeaways: Bangladesh Edge vs What to Learn -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="lux-card p-5 sm:p-6 space-y-2 border-l-4 border-l-[#0F7A53]">
            <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">${isBn ? 'বাংলাদেশের বিশেষত্ব ও শক্তি' : 'WHERE BANGLADESH STANDS OUT'}</span>
            <h3 class="font-heading text-lg font-bold text-[#16211C]">${isBn ? `${cName}-এর তুলনায় বাংলাদেশের উল্লেখযোগ্য দিক` : `Bangladesh’s Unique Edge vs ${cName}`}</h3>
            <p class="text-sm text-[#2B352F] leading-relaxed">${isBn ? c.bdEdgeBn : c.bdEdgeEn}</p>
          </div>
          <div class="lux-card p-5 sm:p-6 space-y-2 border-l-4 border-l-[#1F5A7A]">
            <span class="inline-block text-xs font-bold text-[#1F5A7A] bg-[#E3EFF5] px-3 py-1 rounded-full">${isBn ? 'উন্নত দেশটির থেকে শিক্ষণীয়' : 'KEY LESSONS FOR BANGLADESH'}</span>
            <h3 class="font-heading text-lg font-bold text-[#16211C]">${isBn ? `${cName}-এর থেকে বাংলাদেশের কী শেখার আছে` : `What Bangladesh Can Learn from ${cName}`}</h3>
            <p class="text-sm text-[#2B352F] leading-relaxed">${isBn ? c.learnBn : c.learnEn}</p>
          </div>
        </section>

        <!-- Full Head-to-Head Comparison Table -->
        <section class="lux-card p-5 sm:p-6">
          <div class="pb-4 border-b border-[#E5E8E0]">
            <span class="inline-block text-xs font-bold text-[#0F6B4F] bg-[#DCEFE5] px-3 py-1 rounded-full">${isBn ? 'সম্পূর্ণ তুলনামূলক ছক' : 'COMPLETE HEAD-TO-HEAD TABLE'}</span>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-[#16211C] mt-1.5">${isBn ? `${bdName} বনাম ${cName} (সব সূচক এক নজরে)` : `${bdName} vs ${cName} (All Indicators)`}</h2>
          </div>
          <div class="mt-4 overflow-x-auto border border-[#E4E8E6] rounded-[18px]">
            <table class="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr class="bg-[#F1F4EE] text-[#16211C] border-b border-[#E4E8E6]">
                  <th class="py-3 px-4 font-heading font-bold">${isBn ? 'সূচক' : 'Indicator'}</th>
                  <th class="py-3 px-4 font-heading font-bold text-[#0F6B4F]">${bdName}</th>
                  <th class="py-3 px-4 font-heading font-bold text-[#1F5A7A]">${cName}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#EAECE6] bg-white">
                ${tableRows.map(r => `
                  <tr class="hover:bg-[#F7FAF8] transition-colors">
                    <td class="py-3 px-4 font-bold text-[#16211C]">${isBn ? r.kBn : r.kEn}</td>
                    <td class="py-3 px-4 font-bold text-[#0F6B4F]">${r.bdV}</td>
                    <td class="py-3 px-4 font-bold text-[#1F5A7A]">${r.cV}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      `;

      // Bind country selector pills
      container.querySelectorAll('[data-cmp-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.compareCountryId = btn.dataset.cmpId;
          renderComparePage();
        });
      });

      // Animate dual bars + bind tooltips
      const barsWrap = document.getElementById('cmpBarsWrap');
      animateBarsIn(barsWrap, true);
      bindTooltipElements(barsWrap);

      // Render animated D3 Overlay Radar Chart
      if (typeof d3 !== 'undefined') {
        const svg = d3.select('#compareRadarSvg');
        svg.selectAll('*').remove();
        const axes = [
          { bn: 'জনসংখ্যা', en: 'Population' },
          { bn: 'অর্থনীতি', en: 'Economy' },
          { bn: 'ডিজিটাল', en: 'Digital' },
          { bn: 'মানব উন্নয়ন', en: 'HDI' },
          { bn: 'গড় আয়ু', en: 'Life Exp' },
          { bn: 'সামরিক', en: 'Military' }
        ];
        const cx = 160, cy = 138, maxR = 88, n = axes.length;
        const g = svg.append('g');
        const pt = (i, sc) => {
          const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
          const r = (sc / 100) * maxR;
          return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
        };

        [25, 50, 75, 100].forEach(lvl => {
          g.append('polygon').attr('points', axes.map((_, i) => pt(i, lvl).join(',')).join(' '))
            .attr('fill', 'none').attr('stroke', lvl === 50 ? '#B7C4BD' : '#E2E9E5')
            .attr('stroke-dasharray', lvl === 50 ? '4 3' : 'none');
        });

        axes.forEach((ax, i) => {
          const [x2, y2] = pt(i, 100);
          g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', x2).attr('y2', y2).attr('stroke', '#E2E9E5');
          const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
          g.append('text').attr('x', cx + (maxR + 22) * Math.cos(ang)).attr('y', cy + (maxR + 18) * Math.sin(ang) + 3)
            .attr('text-anchor', 'middle').style('font-size', '10.5px').style('font-weight', '700').style('fill', '#16211C')
            .text(isBn ? ax.bn : ax.en);
        });

        const zeroPts = axes.map(() => `${cx},${cy}`).join(' ');
        const cPts = c.radar.map((sc, i) => pt(i, sc).join(',')).join(' ');
        const bdPts = bd.radar.map((sc, i) => pt(i, sc).join(',')).join(' ');

        g.append('polygon').attr('points', zeroPts).attr('fill', 'rgba(31, 90, 122, 0.16)')
          .attr('stroke', '#1F5A7A').attr('stroke-width', 2.2)
          .transition().duration(780).ease(d3.easeCubicOut).attr('points', cPts);

        g.append('polygon').attr('points', zeroPts).attr('fill', 'rgba(15, 122, 83, 0.22)')
          .attr('stroke', '#0F7A53').attr('stroke-width', 2.5)
          .transition().duration(840).ease(d3.easeCubicOut).attr('points', bdPts);

        axes.forEach((ax, i) => {
          const [bx, by] = pt(i, bd.radar[i]);
          const [cx2, cy2] = pt(i, c.radar[i]);
          const tip = `<div class="font-bold text-[#16211C] mb-1">${isBn ? ax.bn : ax.en}</div>` +
            `<div class="font-extrabold text-[#0F6B4F]">${bdName}: ${fmtNum(bd.radar[i], state.lang)}/100</div>` +
            `<div class="font-extrabold text-[#1F5A7A]">${cName}: ${fmtNum(c.radar[i], state.lang)}/100</div>`;

          g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 0).attr('fill', '#1F5A7A').attr('stroke', '#FFFFFF').attr('stroke-width', 1.5)
            .style('cursor', 'pointer')
            .on('mouseenter', (ev) => showChartTooltip(ev, tip))
            .on('mousemove', (ev) => positionChartTooltip(ev))
            .on('mouseleave', hideChartTooltip)
            .transition().duration(780).ease(d3.easeCubicOut).attr('cx', cx2).attr('cy', cy2).attr('r', 4.2);

          g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', 0).attr('fill', '#0F7A53').attr('stroke', '#FFFFFF').attr('stroke-width', 1.6)
            .style('cursor', 'pointer')
            .on('mouseenter', (ev) => showChartTooltip(ev, tip))
            .on('mousemove', (ev) => positionChartTooltip(ev))
            .on('mouseleave', hideChartTooltip)
            .transition().duration(840).ease(d3.easeCubicOut).attr('cx', bx).attr('cy', by).attr('r', 4.6);
        });
      }
    }

