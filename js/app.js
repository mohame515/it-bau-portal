/* ==========================================================================
   IT-BAU Student Portal - Main Application Logic
   Interactive UI, Modals, Search, Favorites & Academic Calendar
   Source Team Light Theme Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    favorites: JSON.parse(localStorage.getItem('it_bau_favorites')) || [],
    currentCalendarTab: 'firstSemester',
    gpaSubjects: [
      { name: 'هندسة البرمجيات (1)', hours: 3, grade: 4.0 },
      { name: 'الخوارزميات وهياكل البيانات', hours: 3, grade: 3.5 },
      { name: 'أساسيات الأمن السيبراني', hours: 3, grade: 3.75 },
      { name: 'تطوير تطبيقات الويب', hours: 3, grade: 4.0 }
    ]
  };

  // DOM Elements
  const favToggleBtn = document.getElementById('favToggleBtn');
  const favBadge = document.getElementById('favBadge');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const favoritesList = document.getElementById('favoritesList');
  const searchInput = document.getElementById('searchInput');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Initialize App
  initFavorites();
  initCalendarTabs();
  initSearch();
  initEventListeners();

  // --------------------------------------------------------------------------
  // FAVORITES DRAWER MANAGEMENT
  // --------------------------------------------------------------------------
  function initFavorites() {
    updateFavBadge();
    renderFavoritesList();
  }

  function updateFavBadge() {
    if (favBadge) {
      favBadge.textContent = state.favorites.length;
    }
  }

  function toggleFavorite(item) {
    const index = state.favorites.findIndex(f => f.id === item.id && f.type === item.type);
    if (index > -1) {
      state.favorites.splice(index, 1);
    } else {
      state.favorites.push(item);
    }
    localStorage.setItem('it_bau_favorites', JSON.stringify(state.favorites));
    updateFavBadge();
    renderFavoritesList();
    updateFavoriteBtnStates();
  }

  function renderFavoritesList() {
    if (!favoritesList) return;

    if (state.favorites.length === 0) {
      favoritesList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 3rem 1rem;">
          <i class="fa-solid fa-star" style="font-size: 2.5rem; margin-bottom: 1rem; color: rgba(200,90,23,0.3);"></i>
          <p style="font-weight: 700;">قائمة المفضلة فارغة حالياً.</p>
          <span style="font-size: 0.85rem; display: block; margin-top: 0.5rem; color: var(--text-muted);">اضغط على أيقونة الإضافة (+) في أي بطاقة لحفظها هنا!</span>
        </div>
      `;
      return;
    }

    favoritesList.innerHTML = state.favorites.map(item => `
      <div class="fav-item" data-fav-id="${item.id}" data-fav-type="${item.type}" style="background: var(--bg-tertiary); padding: 0.9rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: var(--transition-fast);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <i class="${item.icon || 'fa-solid fa-bookmark'}" style="color: var(--accent-orange); font-size: 1.1rem;"></i>
          <div>
            <h5 style="font-size: 0.95rem; font-weight: 800; color: var(--text-main);">${item.title}</h5>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${item.subtitle || 'عنصر مفضل'}</span>
          </div>
        </div>
        <button class="btn-remove-fav" data-id="${item.id}" data-type="${item.type}" style="background: none; border: none; color: var(--accent-orange); cursor: pointer; padding: 4px; font-size: 1rem; transition: var(--transition-fast);">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');

    favoritesList.querySelectorAll('.btn-remove-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const type = btn.getAttribute('data-type');
        toggleFavorite({ id, type });
      });
    });

    favoritesList.querySelectorAll('.fav-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const id = itemEl.getAttribute('data-fav-id');
        drawerOverlay.classList.remove('active');
        const icon = favToggleBtn ? favToggleBtn.querySelector('.icon-toggle i') : null;
        if (icon) icon.className = 'fa-solid fa-plus';

        if (id === 'card-majors') openMajorsModal();
        else if (id === 'card-courses' || id === 'card-lectures') openCoursesModal();
        else if (id === 'card-map') openMapModal();
        else if (id === 'card-doctors') openDoctorsModal();
        else if (id === 'card-gpa') openGPAModal();
        else if (id === 'card-source-team') openSourceTeamModal();
        else if (id && id.startsWith('doc_')) openDoctorsModal(id);
        else openMajorsModal(id);
      });
    });
  }

  function updateFavoriteBtnStates() {
    document.querySelectorAll('.card-favorite-btn').forEach(btn => {
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type');
      const isFav = state.favorites.some(f => f.id == id && f.type == type);
      
      if (isFav) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-xmark" style="color: var(--accent-orange);"></i>';
        btn.title = "إزالة من المفضلة";
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        btn.title = "إضافة للمفضلة";
      }
    });
  }

  if (favToggleBtn) {
    favToggleBtn.addEventListener('click', () => {
      drawerOverlay.classList.toggle('active');
      const icon = favToggleBtn.querySelector('.icon-toggle i');
      if (drawerOverlay.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-plus';
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      drawerOverlay.classList.remove('active');
      const icon = favToggleBtn.querySelector('.icon-toggle i');
      if (icon) icon.className = 'fa-solid fa-plus';
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        drawerOverlay.classList.remove('active');
        const icon = favToggleBtn.querySelector('.icon-toggle i');
        if (icon) icon.className = 'fa-solid fa-plus';
      }
    });
  }

  // --------------------------------------------------------------------------
  // SEARCH FUNCTIONALITY
  // --------------------------------------------------------------------------
  function initSearch() {
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        hideSearchResults();
        return;
      }
      performSearch(query);
    });
  }

  function performSearch(query) {
    const results = [];

    // Search Source Team
    if (query.includes('source') || query.includes('سورس') || query.includes('فريق') || query.includes('تيم') || query.includes('لجنة')) {
      results.push({ type: 'فريق الكلية', title: 'فريق Source Team الأكاديمي', subtitle: 'التعريف بالفريق، اللجان، وروابط درايف وتليجرام', action: () => openSourceTeamModal() });
    }

    // Search Majors
    IT_DATA.majors.forEach(m => {
      if (m.title.toLowerCase().includes(query) || m.titleEn.toLowerCase().includes(query)) {
        results.push({ type: 'تخصص', title: m.title, subtitle: m.titleEn, action: () => openMajorsModal(m.id) });
      }
    });

    // Search Map Colleges & Buildings
    const mapData = IT_DATA.campusMapData;
    const allMapItems = [
      ...(mapData.colleges || []),
      ...(mapData.hallsAndLabs || []),
      ...(mapData.adminAndServices || []),
      ...(mapData.gatesAndServices || [])
    ];

    allMapItems.forEach(item => {
      if (item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query))) {
        results.push({ type: item.category, title: item.num ? `#${item.num} - ${item.name}` : item.name, subtitle: item.desc, action: () => openMapModal(item.category) });
      }
    });

    // Search Doctors
    IT_DATA.doctors.forEach(d => {
      if (d.name.toLowerCase().includes(query) || (d.dept && d.dept.toLowerCase().includes(query)) || (d.rank && d.rank.toLowerCase().includes(query))) {
        results.push({ type: 'مدرس', title: d.name, subtitle: `${d.dept} - ${d.rank}`, action: () => openDoctorsModal(d.id) });
      }
    });

    // Search Courses (دليل المواد الدراسية - كلا الخطتين: 2007+ و 2006-)
    if (IT_DATA.courseCatalog2007 || IT_DATA.courseCatalog2006) {
      if (query.includes('ماد') || query.includes('مواد') || query.includes('دليل') || query.includes('درايف') || query.includes('خط')) {
        results.push({
          type: 'دليل المواد',
          title: 'دليل المواد الدراسية (خطتي 2007+ و 2006-)',
          subtitle: 'تصفح جميع مواد الكلية وروابط التحميل برعاية Source Team',
          action: () => openCoursesModal()
        });
      }
      (IT_DATA.courseCatalog2007 || []).forEach(cat => {
        cat.courses.forEach(c => {
          if (c.name.toLowerCase().includes(query) || (c.lab && c.lab.toLowerCase().includes(query))) {
            const mat = IT_DATA.getMaterialForCourse ? IT_DATA.getMaterialForCourse(c.name, '2007') : null;
            results.push({
              type: mat ? `مادة [مفرغة: ${mat.totalFiles} ملف]` : 'مادة [خطة 2007+]',
              title: c.name,
              subtitle: `${cat.category.split('(')[0].trim()} • ${c.level} ${mat ? '• 🟢 مفرغة على الموقع' : ''}`,
              action: () => {
                const targetMat = mat || (IT_DATA.getMaterialForCourse ? IT_DATA.getMaterialForCourse(c.name, '2007') : null);
                openCourseInsideView(targetMat ? targetMat.id : ('course-' + encodeURIComponent(c.name)), c.name, '2007');
              }
            });
          }
        });
      });
      (IT_DATA.courseCatalog2006 || []).forEach(cat => {
        cat.courses.forEach(c => {
          if (c.name.toLowerCase().includes(query) || (c.lab && c.lab.toLowerCase().includes(query))) {
            const mat = IT_DATA.getMaterialForCourse ? IT_DATA.getMaterialForCourse(c.name, '2006') : null;
            results.push({
              type: mat ? `مادة [مفرغة: ${mat.totalFiles} ملف]` : 'مادة [خطة 2006-]',
              title: c.name,
              subtitle: `${cat.category.split('(')[0].trim()} • ${c.level} ${mat ? '• 🟢 مفرغة على الموقع' : ''}`,
              action: () => {
                const targetMat = mat || (IT_DATA.getMaterialForCourse ? IT_DATA.getMaterialForCourse(c.name, '2006') : null);
                openCourseInsideView(targetMat ? targetMat.id : ('course-' + encodeURIComponent(c.name)), c.name, '2006');
              }
            });
          }
        });
      });
    }

    renderSearchResults(results);
  }

  function renderSearchResults(results) {
    let searchDropdown = document.getElementById('searchDropdown');
    if (!searchDropdown) {
      searchDropdown = document.createElement('div');
      searchDropdown.id = 'searchDropdown';
      searchDropdown.style.cssText = `
        position: absolute;
        top: 110%;
        right: 0;
        left: 0;
        background: #ffffff;
        border: 2px solid var(--primary-green);
        border-radius: var(--radius-md);
        box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        z-index: 1050;
        max-height: 350px;
        overflow-y: auto;
        padding: 0.5rem;
      `;
      searchInput.parentElement.appendChild(searchDropdown);
    }

    if (results.length === 0) {
      searchDropdown.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-weight:600;">لا توجد نتائج مطابقة لمصطلح البحث</div>`;
    } else {
      searchDropdown.innerHTML = results.map((res, index) => `
        <div class="search-res-item" data-index="${index}" style="padding: 0.75rem 1rem; border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); transition: var(--transition-fast);">
          <div>
            <div style="font-weight: 800; color: var(--text-main); font-size: 0.95rem;">${res.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${res.subtitle}</div>
          </div>
          <span style="font-size: 0.75rem; background: rgba(33,90,54,0.08); color: var(--primary-green); padding: 2px 8px; border-radius: 99px; font-weight: 800;">${res.type}</span>
        </div>
      `).join('');

      searchDropdown.querySelectorAll('.search-res-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.background = 'var(--bg-tertiary)');
        item.addEventListener('mouseleave', () => item.style.background = 'transparent');
        item.addEventListener('click', () => {
          const idx = item.getAttribute('data-index');
          results[idx].action();
          hideSearchResults();
          searchInput.value = '';
        });
      });
    }

    searchDropdown.style.display = 'block';
  }

  function hideSearchResults() {
    const dropdown = document.getElementById('searchDropdown');
    if (dropdown) dropdown.style.display = 'none';
  }

  document.addEventListener('click', (e) => {
    if (searchInput && !searchInput.contains(e.target)) {
      hideSearchResults();
    }
  });

  // --------------------------------------------------------------------------
  // ACADEMIC CALENDAR TABS & DOWNLOAD
  // --------------------------------------------------------------------------
  function initCalendarTabs() {
    const tabBtns = document.querySelectorAll('.calendar-tabs .tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabKey = btn.getAttribute('data-tab');
        state.currentCalendarTab = tabKey;
        renderCalendarTab(tabKey);
      });
    });

    renderCalendarTab('firstSemester');
  }

  function renderCalendarTab(tabKey) {
    const calendarData = IT_DATA.academicCalendar[tabKey];
    const container = document.getElementById('calendarTabContent');
    if (!container || !calendarData) return;

    container.innerHTML = `
      <div class="calendar-doc-header">
        <!-- Brand & University Titles (Matching Logo & Header Elements) -->
        <div style="display: flex; align-items: center; gap: 1.15rem; flex-wrap: wrap;">
          <div style="width: 72px; height: 72px; border-radius: 50%; border: 2.5px solid var(--primary-green); background: #ffffff; box-shadow: 0 4px 15px rgba(33,90,54,0.18); display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 2px;">
            <img src="img/source_team_logo.png?v=2" alt="Source Team Logo" style="width: 100%; height: 100%; border-radius: 50%; object-fit: contain;" />
          </div>
          <div class="doc-info" style="display: flex; flex-direction: column; gap: 2px;">
            <h2 class="calendar-univ-title">جامعة البلقاء التطبيقية</h2>
            <h3 class="calendar-sem-title">${calendarData.title}</h3>
          </div>
        </div>

        <!-- Source Team Tag (Matching Exact Brand Elements) -->
        <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: right; background: rgba(33,90,54,0.05); border: 1.5px solid rgba(33,90,54,0.18); padding: 0.65rem 1.15rem; border-radius: var(--radius-md); box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
          <div style="font-size: 1.25rem; font-weight: 900; line-height: 1.2; display: flex; align-items: center; gap: 0.35rem;">
            <span style="color: var(--primary-green);">Source</span>
            <span style="color: var(--accent-orange);">Team</span>
          </div>
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); margin-top: 1px;">
            IT College - BAU
          </div>
          <div style="display: inline-flex; align-items: center; gap: 0.35rem; color: var(--primary-green); font-size: 0.76rem; font-weight: 800; margin-top: 4px; background: rgba(33,90,54,0.1); padding: 2px 8px; border-radius: 99px;">
            <i class="fa-solid fa-circle-check" style="color: var(--primary-green);"></i>
            <span>التقويم الرسمي المعتمد 2027/2026</span>
          </div>
        </div>
      </div>

      ${calendarData.note ? `
        <div style="background: rgba(33,90,54,0.06); border-right: 4px solid var(--accent-orange); padding: 0.75rem 1.15rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-weight: 800; color: var(--primary-green); font-size: 0.9rem; display: flex; align-items: center; gap: 0.6rem;">
          <i class="fa-solid fa-circle-info" style="color: var(--accent-orange); font-size: 1.1rem;"></i>
          <span>${calendarData.note}</span>
        </div>
      ` : ''}

      <div style="overflow-x: auto;">
        <table class="calendar-table">
          <thead>
            <tr>
              <th style="width: 140px; text-align: center;">اليوم</th>
              <th style="width: 220px; text-align: center;">التاريخ</th>
              <th>الحدث والبيان الرسمي</th>
              <th style="width: 130px; text-align: center;">نوع الفعالية</th>
            </tr>
          </thead>
          <tbody>
            ${calendarData.events.map(ev => `
              <tr>
                <td style="font-weight: 700; color: var(--text-muted); text-align: center; white-space: nowrap;">${ev.day || '-'}</td>
                <td style="font-weight: 800; color: var(--primary-green); text-align: center; direction: ltr; font-family: monospace, inherit; font-size: 0.95rem;">${ev.date}</td>
                <td style="font-weight: 600; line-height: 1.6;">${ev.event}</td>
                <td style="text-align: center; white-space: nowrap;">
                  <span class="event-highlight ${getEventBadgeClass(ev.category)}">
                    ${getEventCategoryLabel(ev.category)}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="calendar-download-bar">
        <button id="downloadCalendarBtn" class="btn-download-calendar">
          <i class="fa-solid fa-print"></i>
          طباعة / تصدير مستند التقويم الرسمي (PDF)
        </button>
      </div>
    `;

    document.getElementById('downloadCalendarBtn').addEventListener('click', () => {
      downloadCalendarDocument(calendarData);
    });
  }

  function getEventBadgeClass(category) {
    switch (category) {
      case 'exam': return 'event-exam';
      case 'holiday': return 'event-holiday';
      case 'reg': return 'event-reg';
      default: return 'event-reg';
    }
  }

  function getEventCategoryLabel(category) {
    switch (category) {
      case 'exam': return 'امتحانات';
      case 'holiday': return 'عطلة رسمية';
      case 'reg': return 'تسجيل وقبول';
      default: return 'دوام رسمي';
    }
  }

  function downloadCalendarDocument(data) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html dir="rtl" lang="ar">
      <head>
        <base href="${window.location.href}">
        <title>${data.title} - جامعة البلقاء التطبيقية</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 30px; color: #111; line-height: 1.5; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #c85a17; padding-bottom: 18px; margin-bottom: 25px; }
          .header-brand { display: flex; align-items: center; gap: 16px; }
          .logo-img { width: 80px; height: 80px; border-radius: 50%; object-fit: contain; border: 2.5px solid #215a36; background: #fff; }
          h1 { color: #215a36; margin: 0 0 4px 0; font-size: 23px; font-weight: 900; }
          h2 { color: #526357; margin: 0 0 5px 0; font-size: 16px; font-weight: 700; }
          h3 { color: #c85a17; margin: 0; font-size: 19px; font-weight: 900; }
          .team-tag { text-align: left; display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
          .team-title { font-weight: 900; color: #215a36; font-size: 18px; }
          .team-title span { color: #c85a17; }
          .team-badge { background: #fdf6ec; color: #c85a17; border: 1px solid #faecd8; padding: 2px 10px; border-radius: 99px; font-size: 11px; font-weight: bold; margin-top: 4px; }
          .note { background: #fdf6ec; border-right: 4px solid #c85a17; padding: 10px 15px; border-radius: 4px; margin-bottom: 20px; font-weight: bold; color: #215a36; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #ddd; padding: 10px 12px; text-align: right; font-size: 13.5px; }
          th { background-color: #215a36; color: #fff; font-weight: bold; text-align: center; }
          tr:nth-child(even) { background-color: #f9fbf9; }
          .footer { display: flex; align-items: center; justify-content: space-between; margin-top: 35px; font-size: 12.5px; color: #555; border-top: 1.5px solid #ddd; padding-top: 14px; flex-wrap: wrap; gap: 10px; }
          .footer-logo { display: flex; align-items: center; gap: 8px; }
          .footer-logo img { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid #215a36; }
          @media print {
            body { padding: 15px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="header-brand">
            <img class="logo-img" src="img/source_team_logo.png" alt="Source Team Logo" />
            <div style="text-align: right;">
              <h1>جامعة البلقاء التطبيقية</h1>
              <h3>${data.title} (${data.year})</h3>
            </div>
          </div>
          <div class="team-tag">
            <div class="team-title">Source <span>Team</span></div>
            <div style="font-size: 12px; color: #526357;">IT College - BAU</div>
            <span class="team-badge">وثيقة معتمدة ومطابقة</span>
          </div>
        </div>

        ${data.note ? `<div class="note">${data.note}</div>` : ''}

        <table>
          <thead>
            <tr>
              <th style="width: 130px;">اليوم</th>
              <th style="width: 200px;">التاريخ</th>
              <th>الحدث والبيان الرسمي</th>
            </tr>
          </thead>
          <tbody>
            ${data.events.map(e => `
              <tr>
                <td style="text-align: center; font-weight: bold; color: #444;">${e.day || '-'}</td>
                <td style="text-align: center; direction: ltr; font-family: monospace; font-weight: bold; color: #215a36;">${e.date}</td>
                <td style="font-weight: 500;">${e.event}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <div class="footer-logo">
            <img src="img/source_team_logo.png" alt="Source Team Logo" />
            <span>بوابة كلية تكنولوجيا المعلومات | IT-BAU Student Portal</span>
          </div>
          <div>
            <span>برعاية فريق: <strong>Source Team</strong> | إعداد وبرمجة: <strong>Mohamed Al-zoubi</strong></span>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  // --------------------------------------------------------------------------
  // MODAL ROUTER & RENDERING
  // --------------------------------------------------------------------------
  function openModal(title, iconClass, bodyHTML) {
    if (!modalOverlay || !modalTitle || !modalBody) return;
    modalTitle.innerHTML = `<i class="${iconClass}"></i> ${title}`;
    modalBody.innerHTML = bodyHTML;
    modalOverlay.classList.add('active');

    updateFavoriteBtnStates();
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 1. Majors & Study Plans Modal (يدعم خطتي جيل 2007+ وجيل 2006-)
  window.openMajorsModal = function(selectedMajorId = null, initialCohort = '2007') {
    let currentCohort = initialCohort;

    function getMajorsHTML(cohort) {
      const is2007 = cohort === '2007';
      const cohortBadge = is2007 ? 'خطة جيل 2007 وما بعد (الجديدة)' : 'خطة جيل 2006 فما قبل (السابقة)';
      
      return `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Cohort Switcher Header Bar -->
        <div style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-sitemap" style="color: var(--primary-green);"></i> اختر الخطة الشجرية المعروضة:
            </h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">يمكنك التبديل بين الخطة الجديدة لجيل 2007 وما بعد والخطة السابقة لجيل 2006 فما قبل لكافة التخصصات.</p>
          </div>

          <div style="display: inline-flex; background: var(--bg-tertiary); padding: 4px; border-radius: 99px; border: 1.5px solid var(--border-color); gap: 4px;">
            <button id="majorToggle2007" class="majors-cohort-toggle-btn ${is2007 ? 'active' : ''}" style="background: ${is2007 ? 'var(--primary-green)' : 'transparent'}; color: ${is2007 ? '#ffffff' : 'var(--text-main)'}; border: none; padding: 0.5rem 1.1rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; transition: var(--transition-fast); font-family: inherit; ${is2007 ? 'box-shadow: var(--shadow-green-glow);' : ''}">
              <i class="fa-solid fa-graduation-cap"></i>
              <span>جيل 2007 وما بعد (الجديدة)</span>
            </button>
            <button id="majorToggle2006" class="majors-cohort-toggle-btn ${!is2007 ? 'active' : ''}" style="background: ${!is2007 ? 'var(--accent-orange)' : 'transparent'}; color: ${!is2007 ? '#ffffff' : 'var(--text-main)'}; border: none; padding: 0.5rem 1.1rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; transition: var(--transition-fast); font-family: inherit; ${!is2007 ? 'box-shadow: var(--shadow-glow);' : ''}">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span>جيل 2006 فما قبل (السابقة)</span>
            </button>
          </div>
        </div>
        
        <!-- Major Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
          ${IT_DATA.majors.map(m => {
            const planImg = is2007 ? (m.planImg2025 || m.planImg) : (m.planImg2006 || m.planImg);
            const planTag = is2007 ? 'خطة 2007+ (الجديدة)' : 'خطة 2006- (السابقة)';
            const downloadFilename = `الخطة_الشجرية_${m.title}_${is2007 ? '2027_الجديدة' : '2006_السابقة'}.jpg`;
            
            return `
            <div style="background: #ffffff; border: 1.5px solid ${selectedMajorId === m.id ? 'var(--accent-orange)' : 'var(--border-color)'}; padding: 1.5rem; border-radius: var(--radius-lg); position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <div style="width: 46px; height: 46px; border-radius: var(--radius-md); background: rgba(33,90,54,0.08); color: var(--primary-green); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                  <i class="${m.icon}"></i>
                </div>
                <div style="display: flex; gap: 0.4rem; align-items: center;">
                  <span style="font-size: 0.78rem; background: ${is2007 ? 'rgba(33,90,54,0.1)' : 'rgba(200,90,23,0.1)'}; color: ${is2007 ? 'var(--primary-green)' : 'var(--accent-orange)'}; font-weight: 800; padding: 3px 8px; border-radius: 99px;">
                    ${planTag}
                  </span>
                  <span style="font-size: 0.78rem; background: rgba(0,0,0,0.05); color: var(--text-muted); font-weight: 800; padding: 3px 8px; border-radius: 99px;">${m.credits} س</span>
                </div>
              </div>
              <h4 style="font-size: 1.15rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.3rem;">${m.title}</h4>
              <h6 style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">${m.titleEn}</h6>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem; flex: 1;">${m.desc}</p>
              
              <div style="border-top: 1px dashed var(--border-color); padding-top: 0.85rem; margin-bottom: 1rem;">
                <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-green); display: block; margin-bottom: 0.5rem;">أبرز المواد الدراسية:</span>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${m.popularCourses.slice(0, 3).map(c => `<span style="font-size: 0.75rem; background: var(--bg-tertiary); padding: 2px 8px; border-radius: 4px; color: var(--text-main); font-weight:600;">${c}</span>`).join('')}
                </div>
              </div>

              <!-- Study Plan Preview & Download -->
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: auto;">
                <div style="display: flex; gap: 0.5rem;">
                  <a href="${planImg}" target="_blank" style="flex: 1; text-align: center; background: ${is2007 ? 'var(--accent-orange)' : 'var(--primary-green)'}; color: #ffffff; text-decoration: none; padding: 0.6rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.83rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; box-shadow: var(--shadow-glow);">
                    <i class="fa-solid fa-eye"></i> معاينة ${is2007 ? 'خطة 2007+' : 'خطة 2006-'}
                  </a>
                  <a href="${planImg}" download="${downloadFilename}" style="flex: 1; text-align: center; background: #163e24; color: #ffffff; text-decoration: none; padding: 0.6rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.83rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem;">
                    <i class="fa-solid fa-download"></i> تحميل الخطة
                  </a>
                </div>
                
                <div style="display: flex; gap: 0.5rem;">
                  <a href="${m.driveUrl}" target="_blank" style="flex: 1; text-align: center; background: var(--bg-tertiary); color: var(--primary-green); border: 1.5px solid var(--primary-green); text-decoration: none; padding: 0.55rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;">
                    <i class="fa-solid fa-folder-open"></i> درايف المواد
                  </a>
                  <button class="card-favorite-btn" data-id="${m.id}" data-type="major" title="إضافة التخصص للمفضلة" style="border: 1px solid var(--border-color); padding: 0 12px; border-radius: var(--radius-sm); background: #ffffff;">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>

        <!-- Direct Link Banner to Courses Catalog -->
        <div style="background: linear-gradient(135deg, rgba(33,90,54,0.06), rgba(200,90,23,0.08)); border: 1.5px solid var(--primary-green); border-radius: var(--radius-md); padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h4 style="font-weight: 900; font-size: 1.05rem; color: var(--primary-green); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <i class="fa-solid fa-book-open"></i> هل تبحث عن تفاصيل ودرايف المواد الدراسية؟
            </h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">انتقل إلى الدليل الكامل لمواد الكلية وتوزيعها لكلا الخطتين (2007+ و 2006-) مع روابط التحميل.</p>
          </div>
          <button onclick="openCoursesModal('', '${currentCohort}')" style="background: var(--primary-green); color: #ffffff; border: none; padding: 0.65rem 1.4rem; border-radius: 99px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: var(--shadow-green-glow); font-family: inherit;">
            <span>فتح دليل المواد</span>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>

      </div>
      `;
    }

    function renderMajorsView(cohort) {
      currentCohort = cohort;
      openModal(`التخصصات والخطط الدراسية (${cohort === '2007' ? 'خطة 2007 وما بعد' : 'خطة 2006 فما قبل'})`, "fa-solid fa-graduation-cap", getMajorsHTML(cohort));
      
      const btn2007 = document.getElementById('majorToggle2007');
      const btn2006 = document.getElementById('majorToggle2006');
      if (btn2007) {
        btn2007.addEventListener('click', () => renderMajorsView('2007'));
      }
      if (btn2006) {
        btn2006.addEventListener('click', () => renderMajorsView('2006'));
      }
      
      // Wire favorite buttons in modal
      document.querySelectorAll('#modalContainer .card-favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          const type = btn.getAttribute('data-type');
          const m = IT_DATA.majors.find(x => x.id === id);
          if (m) {
            toggleFavorite({ id: m.id, type: 'major', title: m.title, icon: m.icon });
          }
        });
      });
    }

    renderMajorsView(initialCohort);
  };

  // 2. Courses Modal (دليل المواد الدراسية - Source Team - يدعم خطتي 2007+ و 2006-)
  window.openCoursesModal = function(initialSearch = '', initialCohort = '2006') {
    let currentCohort = initialCohort;

    function renderModalFramework(cohort, searchVal = initialSearch) {
      currentCohort = cohort;
      const is2007 = cohort === '2007';
      const catalog = is2007 ? (IT_DATA.courseCatalog2007 || []) : (IT_DATA.courseCatalog2006 || []);
      const totalCourses = catalog.reduce((sum, cat) => sum + cat.courses.length, 0);

      const count2007 = (IT_DATA.courseCatalog2007 || []).reduce((sum, cat) => sum + cat.courses.length, 0);
      const count2006 = (IT_DATA.courseCatalog2006 || []).reduce((sum, cat) => sum + cat.courses.length, 0);

      const coursesHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Banner Header -->
          <div style="background: linear-gradient(135deg, var(--primary-green) 0%, #153b23 100%); color: #ffffff; padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">
                <i class="fa-solid fa-book-open"></i>
              </div>
              <div>
                <h3 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 2px;">دليل المواد الدراسية وملفات الدرايف</h3>
                <p style="font-size: 0.85rem; opacity: 0.9; margin: 0;">
                  ${is2007 
                    ? `فهرس شامل لمواد كلية تكنولوجيا المعلومات (الخطة الجديدة لجيل 2007 وما بعد - ${totalCourses} مادة) برعاية Source Team` 
                    : `فهرس شامل لمواد كلية تكنولوجيا المعلومات (الخطة السابقة لجيل 2006 فما قبل - ${totalCourses} مادة) برعاية Source Team`}
                </p>
              </div>
            </div>
            <a href="https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link" target="_blank" rel="noopener noreferrer" style="background: var(--accent-orange); color: #ffffff; text-decoration: none; padding: 0.6rem 1.25rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: var(--shadow-glow);">
              <i class="fa-brands fa-google-drive"></i> فتح درايف الكلية الشامل
            </a>
          </div>

          <!-- Cohort / Plan Switcher Tabs -->
          <div style="background: var(--bg-tertiary); border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 0.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button id="courseCohort2007Btn" style="flex: 1; min-width: 210px; background: ${is2007 ? 'var(--primary-green)' : '#ffffff'}; color: ${is2007 ? '#ffffff' : 'var(--text-main)'}; border: 1.5px solid ${is2007 ? 'var(--primary-green)' : 'var(--border-color)'}; padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: var(--transition-fast); font-family: inherit; ${is2007 ? 'box-shadow: var(--shadow-green-glow);' : ''}">
              <i class="fa-solid fa-graduation-cap"></i>
              <span>خطة جيل 2007 وما بعد (الجديدة)</span>
              <span style="font-size: 0.75rem; background: ${is2007 ? 'rgba(255,255,255,0.22)' : 'var(--bg-tertiary)'}; color: ${is2007 ? '#ffffff' : 'var(--primary-green)'}; padding: 2px 8px; border-radius: 99px; font-weight: 800;">${count2007} مادة</span>
            </button>
            <button id="courseCohort2006Btn" style="flex: 1; min-width: 210px; background: ${!is2007 ? 'var(--accent-orange)' : '#ffffff'}; color: ${!is2007 ? '#ffffff' : 'var(--text-main)'}; border: 1.5px solid ${!is2007 ? 'var(--accent-orange)' : 'var(--border-color)'}; padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; transition: var(--transition-fast); font-family: inherit; ${!is2007 ? 'box-shadow: var(--shadow-glow);' : ''}">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span>خطة جيل 2006 فما قبل (السابقة)</span>
              <span style="font-size: 0.75rem; background: ${!is2007 ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)'}; color: ${!is2007 ? '#ffffff' : 'var(--accent-orange)'}; padding: 2px 8px; border-radius: 99px; font-weight: 800;">${count2006} مادة</span>
            </button>
          </div>

          <!-- Search & Filter Controls -->
          <div style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 0.85rem;">
            <div style="position: relative;">
              <input type="text" id="courseModalSearchInput" placeholder="ابحث عن مادة في ${is2007 ? 'خطة 2007+' : 'خطة 2006-'} (مثال: الذكاء الاصطناعي، معمارية، شبكات، مدمجة...)" value="${searchVal}" style="width: 100%; padding: 0.75rem 2.75rem 0.75rem 1rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.92rem; background: var(--bg-tertiary); color: var(--text-main); outline: none; transition: var(--transition-fast);" />
              <i class="fa-solid fa-magnifying-glass" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.95rem;"></i>
            </div>

            <!-- Category Filter Pills -->
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="courseCategoryPills">
              <button class="course-pill-btn active" data-cat="all" style="background: ${is2007 ? 'var(--primary-green)' : 'var(--accent-orange)'}; color: #ffffff; border: none; padding: 0.4rem 1rem; border-radius: 99px; font-weight: 800; font-size: 0.82rem; cursor: pointer; font-family: inherit; transition: var(--transition-fast);">
                الكل (${totalCourses})
              </button>
              ${catalog.map(cat => `
                <button class="course-pill-btn" data-cat="${cat.id}" style="background: var(--bg-tertiary); color: var(--text-main); border: 1px solid var(--border-color); padding: 0.4rem 0.9rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem; cursor: pointer; font-family: inherit; transition: var(--transition-fast);">
                  <i class="${cat.icon}" style="color: ${cat.color};"></i> ${cat.category.split('(')[0].trim()} (${cat.courses.length})
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Courses Container -->
          <div id="courseModalCatalogContainer" style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      `;

      openModal("دليل المواد الدراسية (Source Team)", "fa-solid fa-book-open", coursesHTML);

      // Event listeners for Cohort Switch buttons
      const btn2007 = document.getElementById('courseCohort2007Btn');
      const btn2006 = document.getElementById('courseCohort2006Btn');
      if (btn2007) {
        btn2007.addEventListener('click', () => {
          const currentSearch = document.getElementById('courseModalSearchInput')?.value || '';
          renderModalFramework('2007', currentSearch);
        });
      }
      if (btn2006) {
        btn2006.addEventListener('click', () => {
          const currentSearch = document.getElementById('courseModalSearchInput')?.value || '';
          renderModalFramework('2006', currentSearch);
        });
      }

      setupCourseModalFilters(searchVal, cohort);
    }

    renderModalFramework(initialCohort, initialSearch);
  };

  // Helper for Course Modal Live Filtering with Cross-Cohort Suggestion and Materials Package
  function setupCourseModalFilters(initialSearch = '', cohort = '2007') {
    const searchInput = document.getElementById('courseModalSearchInput');
    const pills = document.querySelectorAll('#courseCategoryPills .course-pill-btn');
    const container = document.getElementById('courseModalCatalogContainer');
    if (!container) return;

    let selectedCat = 'all';
    let searchQuery = (initialSearch || '').trim().toLowerCase();
    const is2007 = cohort === '2007';
    const activeCatalog = is2007 ? (IT_DATA.courseCatalog2007 || []) : (IT_DATA.courseCatalog2006 || []);
    const otherCatalog = is2007 ? (IT_DATA.courseCatalog2006 || []) : (IT_DATA.courseCatalog2007 || []);
    const otherCohortName = is2007 ? 'خطة جيل 2006 فما قبل' : 'خطة جيل 2007 وما بعد';
    const otherCohortKey = is2007 ? '2006' : '2007';

    function renderFilteredCourses() {
      let filteredCategories = [];

      activeCatalog.forEach(cat => {
        if (selectedCat !== 'all' && cat.id !== selectedCat) return;

        const matchingCourses = cat.courses.filter(c => {
          const mat = IT_DATA.getMaterialForCourse ? IT_DATA.getMaterialForCourse(c.name, cohort) : null;

          if (!searchQuery) return true;
          return c.name.toLowerCase().includes(searchQuery) ||
                 (c.lab && c.lab.toLowerCase().includes(searchQuery)) ||
                 (c.level && c.level.toLowerCase().includes(searchQuery)) ||
                 (mat && Array.isArray(mat.resourceTags) && mat.resourceTags.some(t => t.toLowerCase().includes(searchQuery)));
        });

        if (matchingCourses.length > 0) {
          filteredCategories.push({
            ...cat,
            courses: matchingCourses
          });
        }
      });

      if (filteredCategories.length === 0) {
        // Check if other catalog has matches for user suggestion
        let otherMatchesCount = 0;
        if (searchQuery) {
          otherCatalog.forEach(cat => {
            cat.courses.forEach(c => {
              if (c.name.toLowerCase().includes(searchQuery) || (c.lab && c.lab.toLowerCase().includes(searchQuery))) {
                otherMatchesCount++;
              }
            });
          });
        }

        container.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 1.5px dashed var(--border-color); color: var(--text-muted);">
            <i class="fa-solid fa-circle-question" style="font-size: 2.5rem; color: var(--accent-orange); margin-bottom: 0.75rem;"></i>
            <h4 style="font-weight: 800; color: var(--text-main); margin-bottom: 0.3rem;">لم يتم العثور على مواد مطابقة في ${is2007 ? 'خطة 2007+' : 'خطة 2006-'}</h4>
            <p style="font-size: 0.88rem; margin: 0 0 1rem 0;">جرب البحث بكلمات أخرى أو اختر قسماً آخر.</p>
            ${otherMatchesCount > 0 ? `
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(33,90,54,0.06); border: 1.5px solid var(--primary-green); border-radius: var(--radius-sm); display: inline-flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
                <span style="font-weight: 700; color: var(--primary-green); font-size: 0.88rem;">
                  <i class="fa-solid fa-lightbulb"></i> وجدنا (${otherMatchesCount}) نتيجة مطابقة في <strong>${otherCohortName}</strong>!
                </span>
                <button onclick="openCoursesModal('${searchQuery}', '${otherCohortKey}')" style="background: var(--primary-green); color: #ffffff; border: none; padding: 0.4rem 1rem; border-radius: 99px; font-weight: 800; font-size: 0.8rem; cursor: pointer; font-family: inherit;">
                  الانتقال لـ ${otherCohortName}
                </button>
              </div>
            ` : ''}
          </div>
        `;
        return;
      }

      container.innerHTML = filteredCategories.map(cat => `
        <div style="background: #ffffff; border: 1.5px solid ${cat.color}40; border-radius: var(--radius-md); padding: 1.15rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.85rem; padding-bottom: 0.6rem; border-bottom: 1px solid rgba(0,0,0,0.06);">
            <h4 style="font-size: 1.05rem; font-weight: 900; color: ${cat.color}; display: flex; align-items: center; gap: 0.5rem; margin: 0;">
              <i class="${cat.icon}"></i> ${cat.category}
            </h4>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 0.8rem; background: ${cat.color}15; color: ${cat.color}; font-weight: 800; padding: 3px 12px; border-radius: 99px;">
                ${cat.courses.length} مواد
              </span>
              <a href="${cat.driveUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: #ffffff; background: ${cat.color}; text-decoration: none; padding: 3px 10px; border-radius: 6px; font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">
                <i class="fa-brands fa-google-drive"></i> درايف القسم
              </a>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.85rem;">
            ${cat.courses.map(course => {
              const isElective = course.type === 'elective';
              const badgeBg = isElective ? 'rgba(200,90,23,0.1)' : `${cat.color}15`;
              const badgeColor = isElective ? 'var(--accent-orange)' : cat.color;
              const mat = (IT_DATA.getMaterialForCourse ? IT_DATA.getMaterialForCourse(course.name, cohort) : null) || {
                id: 'course-' + encodeURIComponent(course.name),
                totalFiles: 0,
                categoryCounts: { books: 0, slides: 0, exams: 0, summaries: 0, labs: 0 }
              };
              const safeCourseName = course.name.replace(/'/g, "\\'");
              const hasFiles = mat.totalFiles > 0;

              return `
              <div onclick="openCourseInsideView('${mat.id}', '${safeCourseName}', '${cohort}')" role="button" tabindex="0" style="background: #ffffff; border: 1.5px solid ${hasFiles ? 'rgba(33,90,54,0.35)' : 'rgba(0,0,0,0.08)'}; border-radius: var(--radius-md); padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.85rem; transition: all 0.25s ease; position: relative; box-shadow: ${hasFiles ? '0 4px 16px rgba(33,90,54,0.06)' : '0 2px 8px rgba(0,0,0,0.02)'}; cursor: pointer;" class="course-card-interactive" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 24px rgba(33,90,54,0.12)'; this.style.borderColor='var(--primary-green)';" onmouseout="this.style.transform='none'; this.style.boxShadow='${hasFiles ? '0 4px 16px rgba(33,90,54,0.06)' : '0 2px 8px rgba(0,0,0,0.02)'}'; this.style.borderColor='${hasFiles ? 'rgba(33,90,54,0.35)' : 'rgba(0,0,0,0.08)'}';">
                
                <div>
                  <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; margin-bottom: 8px;">
                    <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); word-break: break-word; line-height: 1.4;">
                      ${course.name}
                    </div>
                    ${hasFiles ? `
                      <span style="font-size: 0.72rem; background: rgba(33,90,54,0.12); color: var(--primary-green); padding: 3px 10px; border-radius: 99px; font-weight: 800; flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(33,90,54,0.25);">
                        <i class="fa-solid fa-circle-check"></i> مفرغة على الموقع (${mat.totalFiles} ملف)
                      </span>
                    ` : `
                      <span style="font-size: 0.72rem; background: rgba(200,90,23,0.1); color: var(--accent-orange); padding: 3px 9px; border-radius: 99px; font-weight: 800; flex-shrink: 0; display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(200,90,23,0.2);">
                        <i class="fa-solid fa-layer-group"></i> 5 أقسام رئيسية
                      </span>
                    `}
                  </div>

                  <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 10px;">
                    <span><i class="fa-solid fa-clock" style="color: var(--primary-green);"></i> ${course.level}</span>
                    <span>•</span>
                    <span style="background: ${badgeBg}; color: ${badgeColor}; padding: 2px 8px; border-radius: 4px; font-weight: 800;">
                      ${course.lab}
                    </span>
                  </div>

                  <!-- 5 Categories Quick Indicator (Always Present) -->
                  <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">
                    <span style="font-size: 0.7rem; background: rgba(37,99,235,0.08); color: #2563eb; padding: 2px 7px; border-radius: 5px; font-weight: 700; display: inline-flex; align-items: center; gap: 3px;">
                      <i class="fa-solid fa-book"></i> الكتب: ${mat.categoryCounts.books}
                    </span>
                    <span style="font-size: 0.7rem; background: rgba(234,88,12,0.08); color: #ea580c; padding: 2px 7px; border-radius: 5px; font-weight: 700; display: inline-flex; align-items: center; gap: 3px;">
                      <i class="fa-solid fa-file-powerpoint"></i> السلايدات: ${mat.categoryCounts.slides}
                    </span>
                    <span style="font-size: 0.7rem; background: rgba(220,38,38,0.08); color: #dc2626; padding: 2px 7px; border-radius: 5px; font-weight: 700; display: inline-flex; align-items: center; gap: 3px;">
                      <i class="fa-solid fa-file-pen"></i> السنوات: ${mat.categoryCounts.exams}
                    </span>
                    <span style="font-size: 0.7rem; background: rgba(139,92,246,0.08); color: #7c3aed; padding: 2px 7px; border-radius: 5px; font-weight: 700; display: inline-flex; align-items: center; gap: 3px;">
                      <i class="fa-solid fa-book-open"></i> ملخصات: ${mat.categoryCounts.summaries}
                    </span>
                    <span style="font-size: 0.7rem; background: rgba(8,145,178,0.08); color: #0891b2; padding: 2px 7px; border-radius: 5px; font-weight: 700; display: inline-flex; align-items: center; gap: 3px;">
                      <i class="fa-solid fa-laptop-code"></i> لابات: ${mat.categoryCounts.labs}
                    </span>
                  </div>

                  <button onclick="event.stopPropagation(); openCourseInsideView('${mat.id}', '${safeCourseName}', '${cohort}')" style="background: linear-gradient(135deg, var(--primary-green) 0%, #163e24 100%); color: #ffffff; border: none; padding: 0.65rem 1rem; border-radius: 8px; font-size: 0.84rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; font-family: inherit; transition: var(--transition-fast); box-shadow: 0 4px 12px rgba(33,90,54,0.18); margin-top: 0.85rem;">
                    <i class="fa-solid fa-folder-open"></i>
                    <span>دخول المادة (${hasFiles ? `${mat.totalFiles} ملف مفرغ` : '5 أقسام جاهزة'})</span>
                    <i class="fa-solid fa-arrow-left"></i>
                  </button>
                </div>

              </div>
              `;
            }).join('')}
          </div>
        </div>
      `).join('');
    }

    renderFilteredCourses();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderFilteredCourses();
      });
    }

    const activeColor = is2007 ? 'var(--primary-green)' : 'var(--accent-orange)';
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => {
          p.classList.remove('active');
          p.style.background = 'var(--bg-tertiary)';
          p.style.color = 'var(--text-main)';
          p.style.border = '1px solid var(--border-color)';
        });
        pill.classList.add('active');
        pill.style.background = activeColor;
        pill.style.color = '#ffffff';
        pill.style.border = 'none';

        selectedCat = pill.getAttribute('data-cat');
        renderFilteredCourses();
      });
    });
  }

  // 2.1 Course Inside View: تصفح وتنزيل ملفات المادة المصنفة محلياً على الموقع مباشرة (بدون درايف)
  window.openCourseInsideView = function(materialId, courseName, cohort = '2006') {
    const db = (typeof MATERIALS_DATABASE !== 'undefined') ? MATERIALS_DATABASE : (typeof window !== 'undefined' ? window.MATERIALS_DATABASE : null);
    
    // Resolve material via helper or direct lookup
    let mat = null;
    if (typeof window.getCourseMaterialPackage === 'function') {
      mat = window.getCourseMaterialPackage(courseName, cohort);
    } else if (db && db[materialId]) {
      mat = db[materialId];
    } else if (IT_DATA.getMaterialForCourse) {
      mat = IT_DATA.getMaterialForCourse(courseName, cohort);
    }

    // Ultimate fallback if still null
    if (!mat) {
      const driveUrl = (typeof window.getDriveFolderForCourse === 'function') 
        ? window.getDriveFolderForCourse(courseName)
        : "https://drive.google.com/drive/folders/1aEPGZ_NeJDN96k4LgvCdlOILQdIsRGD8?usp=drive_link";

      mat = {
        id: materialId || ('gen-' + encodeURIComponent(courseName)),
        rawName: courseName,
        title: courseName,
        titleEn: 'Course Materials & Syllabus',
        category: 'compulsory',
        totalFiles: 0,
        totalSizeBytes: 0,
        totalSizeFormatted: '0 MB',
        categoryCounts: { books: 0, slides: 0, exams: 0, summaries: 0, labs: 0, videos: 0, other: 0 },
        directBooks: [],
        files: [],
        driveUrl: driveUrl
      };
    }

    let activeCategory = 'all';
    let searchQuery = '';

    const categoryThemes = {
      'books': { title: 'كتاب المادة والمراجع', color: '#2563eb', icon: 'fa-solid fa-book-bookmark', unit: 'كتب مفرغة' },
      'slides': { title: 'السلايدات والشروحات', color: '#16a34a', icon: 'fa-solid fa-file-powerpoint', unit: 'ملف محاضرة' },
      'exams': { title: 'أسئلة السنوات والامتحانات', color: '#dc2626', icon: 'fa-solid fa-file-pen', unit: 'نموذج وسنوات' },
      'summaries': { title: 'الملخصات والدوسيات', color: '#7c3aed', icon: 'fa-solid fa-book-open-reader', unit: 'ملخص وشرح' },
      'labs': { title: 'المشاريع واللابات', color: '#0891b2', icon: 'fa-solid fa-laptop-code', unit: 'واجب ولاب' },
      'videos': { title: 'الفيديوهات والشروحات', color: '#10b981', icon: 'fa-solid fa-circle-play', unit: 'فيديو' },
      'other': { title: 'ملفات أخرى', color: '#64748b', icon: 'fa-solid fa-folder', unit: 'ملف' },
      'all': { title: 'جميع ملفات المادة', color: 'var(--primary-green)', icon: 'fa-solid fa-layer-group', unit: 'ملف' }
    };

    const insideHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Top Navigation & Action Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap;">
          <button id="btnBackToCourses" style="background: var(--bg-tertiary); border: 1.5px solid var(--border-color); color: var(--text-main); padding: 0.55rem 1.25rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem; font-family: inherit; transition: var(--transition-fast);">
            <i class="fa-solid fa-arrow-right"></i>
            <span>العودة لدليل المواد (${cohort === '2006' ? 'خطة 2006 فما قبل' : 'خطة 2007 وما بعد'})</span>
          </button>

          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <button id="btnAddFileToCourse" style="background: var(--accent-orange); color: #ffffff; border: none; padding: 0.55rem 1.2rem; border-radius: 99px; font-weight: 800; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: var(--shadow-glow); font-family: inherit; transition: var(--transition-fast);">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>إضافة ملفات جديدة للمادة</span>
            </button>

            ${mat.driveUrl ? `
              <a href="${mat.driveUrl}" target="_blank" rel="noopener noreferrer" style="background: #ffffff; border: 1.5px solid var(--border-color); color: var(--text-main); text-decoration: none; padding: 0.55rem 1.15rem; border-radius: 99px; font-weight: 800; font-size: 0.84rem; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: var(--transition-fast);">
                <i class="fa-brands fa-google-drive" style="color: #0F9D58; font-size: 1.05rem;"></i>
                <span>تصفح على Google Drive</span>
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Course Header Hero Banner (Stunning Polished Gradient) -->
        <div style="background: linear-gradient(135deg, #163e24 0%, #215a36 60%, #2d7a4a 100%); color: #ffffff; padding: 1.5rem 1.75rem; border-radius: var(--radius-lg); box-shadow: 0 8px 25px rgba(22,62,36,0.22); position: relative; overflow: hidden;">
          <!-- Subtle dot background pattern -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.08; background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 16px 16px; pointer-events: none;"></div>

          <div style="position: relative; z-index: 1; display: flex; align-items: flex-start; justify-content: space-between; gap: 1.25rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 260px;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; flex-wrap: wrap;">
                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.18); color: #ffffff; padding: 3px 12px; border-radius: 99px; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
                  <i class="fa-solid fa-graduation-cap"></i> ${cohort === '2006' ? 'خطة جيل 2006 فما قبل' : 'خطة جيل 2007 وما بعد'}
                </span>
                <span style="font-size: 0.75rem; background: var(--accent-orange); color: #ffffff; padding: 3px 12px; border-radius: 99px; font-weight: 800;">
                  ${mat.category === 'compulsory' ? 'متطلب تخصص إجباري' : 'متطلب اختياري'}
                </span>
                <span style="font-size: 0.75rem; background: rgba(0,0,0,0.25); color: #f2e6dc; padding: 3px 10px; border-radius: 99px; font-weight: 700;">
                  <i class="fa-solid fa-shield-halved"></i> Source Team Verified
                </span>
              </div>
              <h2 style="font-size: 1.6rem; font-weight: 900; margin: 0 0 6px 0; color: #ffffff; line-height: 1.3;">
                ${courseName || mat.title}
              </h2>
              <p style="font-size: 0.9rem; opacity: 0.9; margin: 0; font-family: monospace, inherit;">${mat.titleEn || 'Comprehensive Academic Course Repository'}</p>
            </div>

            <!-- Stats Badge Boxes -->
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <div style="background: rgba(255,255,255,0.14); backdrop-filter: blur(8px); padding: 0.75rem 1.25rem; border-radius: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.25); min-width: 95px;">
                <div style="font-size: 1.5rem; font-weight: 900; line-height: 1;">${mat.totalFiles}</div>
                <div style="font-size: 0.72rem; opacity: 0.85; margin-top: 4px;">ملف متوفر</div>
              </div>
              <div style="background: rgba(255,255,255,0.14); backdrop-filter: blur(8px); padding: 0.75rem 1.25rem; border-radius: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.25); min-width: 95px;">
                <div style="font-size: 1.5rem; font-weight: 900; line-height: 1;">${mat.totalSizeFormatted}</div>
                <div style="font-size: 0.72rem; opacity: 0.85; margin-top: 4px;">الحجم الإجمالي</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 Grand Primary Options Cards (الكتاب، السلايدات، أسئلة السنوات، الملخصات، المشاريع واللابات) -->
        <div style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; flex-direction: column; gap: 1.15rem; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
          
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
            <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); display: flex; align-items: center; gap: 0.55rem;">
              <i class="fa-solid fa-layer-group" style="color: var(--accent-orange); font-size: 1.2rem;"></i>
              <span>محتويات وأقسام المادة الرئيسية (اختر أي خيار للتصفح والفتح المباشر):</span>
            </div>
            <button class="inside-category-card" data-category="all" style="background: var(--primary-green); color: #ffffff; border: none; padding: 0.5rem 1.25rem; border-radius: 99px; font-size: 0.84rem; font-weight: 800; cursor: pointer; font-family: inherit; transition: var(--transition-fast); display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 2px 8px rgba(33,90,54,0.2);">
              <i class="fa-solid fa-list-check"></i>
              <span>عرض جميع ملفات المادة (${mat.totalFiles})</span>
            </button>
          </div>

          <!-- The 5 Grand Cards Grid (ALL 5 ALWAYS PRESENT SIDE BY SIDE) -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.85rem;" id="insidePrimaryCardsGrid">
            
            <!-- 1. كتاب المادة والمراجع -->
            <div class="inside-category-card inside-grand-card" data-category="books" role="button" tabindex="0" style="background: #ffffff; border: 2px solid rgba(37,99,235,0.25); border-radius: var(--radius-md); padding: 1.15rem 1rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; position: relative; box-shadow: 0 4px 14px rgba(37,99,235,0.04); text-align: right;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(37,99,235,0.12); color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1.55rem; box-shadow: 0 3px 10px rgba(37,99,235,0.12);">
                  <i class="fa-solid fa-book-bookmark"></i>
                </div>
                <span class="card-count-badge" style="font-size: 0.78rem; font-weight: 800; padding: 4px 11px; border-radius: 99px; background: ${mat.categoryCounts.books > 0 ? 'rgba(37,99,235,0.12)' : 'rgba(0,0,0,0.06)'}; color: ${mat.categoryCounts.books > 0 ? '#2563eb' : 'var(--text-muted)'};">
                  ${mat.categoryCounts.books > 0 ? `${mat.categoryCounts.books} كتب مفرغة` : 'قيد التزويد'}
                </span>
              </div>
              <div>
                <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); margin-bottom: 3px;">كتاب المادة والمراجع</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4;">الكتب المقررة الرسمية والمراجع المعتمدة</div>
              </div>
              <div class="card-action-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 800; color: #2563eb; margin-top: auto; padding-top: 0.5rem; border-top: 1px dashed rgba(37,99,235,0.2);">
                <span class="action-label">فتح وتصفح كتب المادة</span>
                <i class="fa-solid fa-arrow-left"></i>
              </div>
            </div>

            <!-- 2. السلايدات والشروحات -->
            <div class="inside-category-card inside-grand-card" data-category="slides" role="button" tabindex="0" style="background: #ffffff; border: 2px solid rgba(22,163,74,0.25); border-radius: var(--radius-md); padding: 1.15rem 1rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; position: relative; box-shadow: 0 4px 14px rgba(22,163,74,0.04); text-align: right;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(22,163,74,0.12); color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 1.55rem; box-shadow: 0 3px 10px rgba(22,163,74,0.12);">
                  <i class="fa-solid fa-file-powerpoint"></i>
                </div>
                <span class="card-count-badge" style="font-size: 0.78rem; font-weight: 800; padding: 4px 11px; border-radius: 99px; background: ${mat.categoryCounts.slides > 0 ? 'rgba(22,163,74,0.12)' : 'rgba(0,0,0,0.06)'}; color: ${mat.categoryCounts.slides > 0 ? '#16a34a' : 'var(--text-muted)'};">
                  ${mat.categoryCounts.slides > 0 ? `${mat.categoryCounts.slides} ملف محاضرة` : 'قيد التزويد'}
                </span>
              </div>
              <div>
                <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); margin-bottom: 3px;">السلايدات والشروحات</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4;">عروض المحاضرات وسلايدات الفصول كاملة</div>
              </div>
              <div class="card-action-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 800; color: #16a34a; margin-top: auto; padding-top: 0.5rem; border-top: 1px dashed rgba(22,163,74,0.2);">
                <span class="action-label">فتح وتصفح السلايدات</span>
                <i class="fa-solid fa-arrow-left"></i>
              </div>
            </div>

            <!-- 3. أسئلة السنوات والامتحانات -->
            <div class="inside-category-card inside-grand-card" data-category="exams" role="button" tabindex="0" style="background: #ffffff; border: 2px solid rgba(220,38,38,0.25); border-radius: var(--radius-md); padding: 1.15rem 1rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; position: relative; box-shadow: 0 4px 14px rgba(220,38,38,0.04); text-align: right;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(220,38,38,0.12); color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 1.55rem; box-shadow: 0 3px 10px rgba(220,38,38,0.12);">
                  <i class="fa-solid fa-file-pen"></i>
                </div>
                <span class="card-count-badge" style="font-size: 0.78rem; font-weight: 800; padding: 4px 11px; border-radius: 99px; background: ${mat.categoryCounts.exams > 0 ? 'rgba(220,38,38,0.12)' : 'rgba(0,0,0,0.06)'}; color: ${mat.categoryCounts.exams > 0 ? '#dc2626' : 'var(--text-muted)'};">
                  ${mat.categoryCounts.exams > 0 ? `${mat.categoryCounts.exams} نموذج وسنوات` : 'قيد التزويد'}
                </span>
              </div>
              <div>
                <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); margin-bottom: 3px;">أسئلة السنوات والامتحانات</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4;">امتحانات ميد وفاينل ونماذج سنوات سابقة</div>
              </div>
              <div class="card-action-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 800; color: #dc2626; margin-top: auto; padding-top: 0.5rem; border-top: 1px dashed rgba(220,38,38,0.2);">
                <span class="action-label">فتح أسئلة السنوات</span>
                <i class="fa-solid fa-arrow-left"></i>
              </div>
            </div>

            <!-- 4. الملخصات والدوسيات -->
            <div class="inside-category-card inside-grand-card" data-category="summaries" role="button" tabindex="0" style="background: #ffffff; border: 2px solid rgba(124,58,237,0.25); border-radius: var(--radius-md); padding: 1.15rem 1rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; position: relative; box-shadow: 0 4px 14px rgba(124,58,237,0.04); text-align: right;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(124,58,237,0.12); color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 1.55rem; box-shadow: 0 3px 10px rgba(124,58,237,0.12);">
                  <i class="fa-solid fa-book-open-reader"></i>
                </div>
                <span class="card-count-badge" style="font-size: 0.78rem; font-weight: 800; padding: 4px 11px; border-radius: 99px; background: ${mat.categoryCounts.summaries > 0 ? 'rgba(124,58,237,0.12)' : 'rgba(0,0,0,0.06)'}; color: ${mat.categoryCounts.summaries > 0 ? '#7c3aed' : 'var(--text-muted)'};">
                  ${mat.categoryCounts.summaries > 0 ? `${mat.categoryCounts.summaries} ملخص وشرح` : 'قيد التزويد'}
                </span>
              </div>
              <div>
                <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); margin-bottom: 3px;">الملخصات والدوسيات</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4;">تلخيصات شاملة وشروحات الطلاب والدفاتر</div>
              </div>
              <div class="card-action-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 800; color: #7c3aed; margin-top: auto; padding-top: 0.5rem; border-top: 1px dashed rgba(124,58,237,0.2);">
                <span class="action-label">فتح وتصفح الملخصات</span>
                <i class="fa-solid fa-arrow-left"></i>
              </div>
            </div>

            <!-- 5. المشاريع واللابات -->
            <div class="inside-category-card inside-grand-card" data-category="labs" role="button" tabindex="0" style="background: #ffffff; border: 2px solid rgba(8,145,178,0.25); border-radius: var(--radius-md); padding: 1.15rem 1rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; position: relative; box-shadow: 0 4px 14px rgba(8,145,178,0.04); text-align: right;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(8,145,178,0.12); color: #0891b2; display: flex; align-items: center; justify-content: center; font-size: 1.55rem; box-shadow: 0 3px 10px rgba(8,145,178,0.12);">
                  <i class="fa-solid fa-laptop-code"></i>
                </div>
                <span class="card-count-badge" style="font-size: 0.78rem; font-weight: 800; padding: 4px 11px; border-radius: 99px; background: ${mat.categoryCounts.labs > 0 ? 'rgba(8,145,178,0.12)' : 'rgba(0,0,0,0.06)'}; color: ${mat.categoryCounts.labs > 0 ? '#0891b2' : 'var(--text-muted)'};">
                  ${mat.categoryCounts.labs > 0 ? `${mat.categoryCounts.labs} واجب ولاب` : 'قيد التزويد'}
                </span>
              </div>
              <div>
                <div style="font-weight: 900; font-size: 1.02rem; color: var(--text-main); margin-bottom: 3px;">المشاريع واللابات</div>
                <div style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4;">أكواد ومشاريع وتطبيقات عملية للمادة</div>
              </div>
              <div class="card-action-bar" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 800; color: #0891b2; margin-top: auto; padding-top: 0.5rem; border-top: 1px dashed rgba(8,145,178,0.2);">
                <span class="action-label">فتح ملفات اللابات</span>
                <i class="fa-solid fa-arrow-left"></i>
              </div>
            </div>

          </div>

          <!-- Quick Textbooks Direct Showcase Banner (الكتب الرسمية جاهزة للقراءة والتحميل الفوري) -->
          ${(mat.directBooks && mat.directBooks.length > 0) ? `
            <div id="booksDirectShowcase" style="background: linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.02) 100%); border: 1.5px solid rgba(37,99,235,0.3); border-radius: var(--radius-sm); padding: 1rem 1.15rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.4rem;">
                <span style="font-weight: 900; font-size: 0.94rem; color: #2563eb; display: inline-flex; align-items: center; gap: 0.45rem;">
                  <i class="fa-solid fa-book-bookmark"></i>
                  <span>الكتب الرسمية المقررة لمادة ${courseName || mat.title} (فتح مباشر وقراءة أونلاين):</span>
                </span>
                <span style="font-size: 0.75rem; background: #2563eb18; color: #2563eb; font-weight: 800; padding: 3px 10px; border-radius: 99px;">
                  ${mat.directBooks.length} كتب معتمدة
                </span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.65rem;">
                ${mat.directBooks.map(bk => {
                  const targetPath = bk.path || bk.url || '#';
                  const isExternal = targetPath.startsWith('http');
                  return `
                  <div style="background: #ffffff; border: 1.5px solid rgba(37,99,235,0.2); border-radius: 8px; padding: 0.75rem 0.95rem; display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 0.65rem; min-width: 0; flex: 1;">
                      <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(239,68,68,0.1); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
                        <i class="fa-solid fa-file-pdf"></i>
                      </div>
                      <div style="min-width: 0; flex: 1;">
                        <div style="font-weight: 900; font-size: 0.86rem; color: var(--text-main); word-break: break-word; line-height: 1.3;" title="${bk.name}">
                          ${bk.name}
                        </div>
                        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">كتاب رسمي معتمد • ${bk.sizeFormatted || 'PDF'}</div>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
                      <a href="${isExternal ? targetPath : encodeURI(targetPath)}" target="_blank" rel="noopener noreferrer" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.76rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 2px 6px rgba(37,99,235,0.25);" title="فتح وقراءة الكتاب أونلاين">
                        <i class="fa-solid fa-book-open"></i> قراءة
                      </a>
                      <a href="${isExternal ? targetPath : encodeURI(targetPath)}" ${!isExternal ? `download="${bk.cleanName || bk.name}"` : 'target="_blank"'} style="background: var(--bg-tertiary); color: var(--text-main); border: 1px solid var(--border-color); text-decoration: none; padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.76rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.3rem;" title="تحميل الكتاب إلى جهازك">
                        <i class="fa-solid fa-download"></i>
                      </a>
                    </div>
                  </div>
                `;}).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Search Input -->
          <div style="position: relative; margin-top: 0.25rem;">
            <input type="text" id="insideFileSearchInput" placeholder="ابحث باسم الملف أو رقم الشابتر أو التلخيص أو الصيغة (pdf, ppt, doc, png)..." style="width: 100%; padding: 0.75rem 2.6rem 0.75rem 0.95rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.9rem; background: var(--bg-tertiary); color: var(--text-main); outline: none; transition: var(--transition-fast);" />
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; right: 0.95rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 0.95rem;"></i>
          </div>

          <!-- Active Filter Header Indicator -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; background: var(--bg-tertiary); padding: 0.6rem 1rem; border-radius: 8px;">
            <span id="insideActiveCategoryLabel" style="font-size: 0.84rem; font-weight: 800; color: var(--text-main); display: inline-flex; align-items: center; gap: 0.45rem;">
              <i class="fa-solid fa-list-check" style="color: var(--primary-green);"></i>
              <span>المعروض: جميع الملفات</span>
            </span>
            <span id="insideFileCounter" style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">
              عرض ${mat.totalFiles} ملف
            </span>
          </div>

        </div>

        <!-- Files List Container -->
        <div id="insideFilesListContainer" style="display: flex; flex-direction: column; gap: 0.65rem; max-height: 540px; overflow-y: auto; padding-right: 2px;">
          <!-- Dynamically populated -->
        </div>

      </div>
    `;

    openModal(`محتويات مادة: ${courseName || mat.title}`, "fa-solid fa-folder-open", insideHTML);

    const btnBack = document.getElementById('btnBackToCourses');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        openCoursesModal('', cohort);
      });
    }

    const btnAdd = document.getElementById('btnAddFileToCourse');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        openAddFileModal(mat.id, courseName || mat.title, activeCategory === 'all' ? 'slides' : activeCategory, cohort);
      });
    }

    const searchInput = document.getElementById('insideFileSearchInput');
    const categoryCards = document.querySelectorAll('.inside-category-card');
    const filesContainer = document.getElementById('insideFilesListContainer');
    const counter = document.getElementById('insideFileCounter');
    const activeLabel = document.getElementById('insideActiveCategoryLabel');

    function updateCategoryUI() {
      categoryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const isSelected = (cat === activeCategory);
        const isGrand = card.classList.contains('inside-grand-card');
        const theme = categoryThemes[cat] || categoryThemes['all'];

        if (cat === 'all') {
          if (isSelected) {
            card.style.background = 'var(--primary-green)';
            card.style.color = '#ffffff';
            card.style.border = 'none';
            card.style.boxShadow = '0 2px 10px rgba(33,90,54,0.28)';
          } else {
            card.style.background = 'var(--bg-tertiary)';
            card.style.color = 'var(--text-main)';
            card.style.border = '1.5px solid var(--border-color)';
            card.style.boxShadow = 'none';
          }
        } else if (isGrand) {
          const actionLabel = card.querySelector('.action-label');
          if (isSelected) {
            card.style.border = `2.5px solid ${theme.color}`;
            card.style.background = `${theme.color}08`;
            card.style.boxShadow = `0 6px 20px ${theme.color}25`;
            if (actionLabel) actionLabel.innerHTML = `<i class="fa-solid fa-circle-check"></i> القسم المعروض حالياً`;
          } else {
            card.style.border = `2px solid ${theme.color}35`;
            card.style.background = '#ffffff';
            card.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)';
            if (actionLabel) {
              if (cat === 'books') actionLabel.textContent = 'فتح وتصفح كتب المادة';
              else if (cat === 'slides') actionLabel.textContent = 'فتح وتصفح السلايدات';
              else if (cat === 'exams') actionLabel.textContent = 'فتح أسئلة السنوات';
              else if (cat === 'summaries') actionLabel.textContent = 'فتح وتصفح الملخصات';
              else if (cat === 'labs') actionLabel.textContent = 'فتح ملفات اللابات';
            }
          }
        }
      });

      if (activeLabel) {
        const theme = categoryThemes[activeCategory] || categoryThemes['all'];
        activeLabel.innerHTML = `<i class="${theme.icon}" style="color: ${theme.color};"></i> <span>القسم المختار: <strong>${theme.title}</strong></span>`;
      }
    }

    function renderInsideFiles() {
      if (!filesContainer) return;

      const filtered = mat.files.filter(f => {
        if (activeCategory !== 'all' && f.category !== activeCategory) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return f.name.toLowerCase().includes(q) ||
               (f.folder && f.folder.toLowerCase().includes(q)) ||
               (f.fileType && f.fileType.toLowerCase().includes(q));
      });

      if (counter) {
        counter.textContent = `عرض ${filtered.length} من ${mat.totalFiles} ملف`;
      }

      if (filtered.length === 0) {
        const catInfo = categoryThemes[activeCategory] || { title: 'هذا القسم' };
        filesContainer.innerHTML = `
          <div style="text-align: center; padding: 2.75rem 1.5rem; background: #ffffff; border-radius: var(--radius-md); border: 2px dashed rgba(200,90,23,0.3); color: var(--text-muted); box-shadow: 0 4px 15px rgba(0,0,0,0.02); display: flex; flex-direction: column; align-items: center; gap: 0.9rem;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(200,90,23,0.1); color: var(--accent-orange); display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; box-shadow: 0 4px 12px rgba(200,90,23,0.12);">
              <i class="fa-solid fa-cloud-arrow-up"></i>
            </div>
            <div>
              <h4 style="font-weight: 900; font-size: 1.15rem; color: var(--text-main); margin: 0 0 0.35rem 0;">قسم قيد التزويد والإضافة [${catInfo.title}]</h4>
              <p style="font-size: 0.88rem; margin: 0; max-width: 520px; line-height: 1.6;">
                هذا القسم لمادة "<strong>${courseName || mat.title}</strong>" مجهز بالكامل وسيتم تزويده بالملفات والملخصات المعتمدة قريباً من قبل فريق <strong>Source Team</strong>.
              </p>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 0.65rem; flex-wrap: wrap; margin-top: 0.5rem;">
              <button onclick="openAddFileModal('${mat.id}', '${(courseName || mat.title).replace(/'/g, "\\'")}', '${activeCategory === 'all' ? 'slides' : activeCategory}', '${cohort}')" style="background: var(--accent-orange); color: #ffffff; border: none; padding: 0.65rem 1.35rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: var(--shadow-glow); font-family: inherit;">
                <i class="fa-solid fa-plus-circle"></i>
                <span>إضافة / رفع ملفات لهذا القسم</span>
              </button>

              ${mat.driveUrl ? `
                <a href="${mat.driveUrl}" target="_blank" rel="noopener noreferrer" style="background: var(--primary-green); color: #ffffff; text-decoration: none; padding: 0.65rem 1.35rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.45rem; box-shadow: var(--shadow-green-glow);">
                  <i class="fa-brands fa-google-drive"></i>
                  <span>تصفح مجلد المادة على Drive</span>
                </a>
              ` : ''}

              <button onclick="document.querySelector('.inside-category-card[data-category=\'all\']')?.click()" style="background: var(--bg-tertiary); color: var(--text-main); border: 1.5px solid var(--border-color); padding: 0.65rem 1.25rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; cursor: pointer; font-family: inherit;">
                📌 عرض كافة الملفات (${mat.totalFiles})
              </button>
            </div>
          </div>
        `;
        return;
      }

      filesContainer.innerHTML = filtered.map(file => {
        const targetPath = file.path || file.url || '#';
        const isExternal = targetPath.startsWith('http');
        const encodedPath = isExternal ? targetPath : encodeURI(targetPath);

        return `
          <div style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.85rem 1.15rem; display: flex; align-items: center; justify-content: space-between; gap: 0.85rem; transition: var(--transition-fast); box-shadow: 0 2px 6px rgba(0,0,0,0.02);" onmouseover="this.style.borderColor='var(--primary-green)';" onmouseout="this.style.borderColor='var(--border-color)';">
            
            <div style="display: flex; align-items: center; gap: 0.85rem; min-width: 0; flex: 1;">
              <div style="width: 44px; height: 44px; border-radius: 10px; background: ${file.color}15; color: ${file.color}; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; flex-shrink: 0; box-shadow: 0 2px 6px ${file.color}15;">
                <i class="${file.icon}"></i>
              </div>
              <div style="min-width: 0; flex: 1;">
                <div style="font-weight: 800; font-size: 0.92rem; color: var(--text-main); word-break: break-word; line-height: 1.4;" title="${file.name}">
                  ${file.name}
                </div>
                <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap; margin-top: 4px; font-size: 0.74rem; color: var(--text-muted);">
                  <span style="background: rgba(33,90,54,0.08); color: var(--primary-green); font-weight: 800; padding: 2px 8px; border-radius: 4px;">
                    ${file.categoryLabel || categoryThemes[file.category]?.title || 'ملف مادة'}
                  </span>
                  <span>•</span>
                  <span><i class="fa-solid fa-folder" style="color: var(--accent-orange);"></i> ${file.folder || 'عام'}</span>
                  <span>•</span>
                  <span><i class="fa-solid fa-hard-drive"></i> ${file.sizeFormatted || 'ملف أونلاين'}</span>
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.45rem; flex-shrink: 0;">
              <a href="${encodedPath}" target="_blank" rel="noopener noreferrer" style="background: var(--bg-tertiary); color: var(--text-main); border: 1.5px solid var(--border-color); padding: 0.45rem 0.85rem; border-radius: 6px; font-size: 0.78rem; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; transition: var(--transition-fast);" title="معاينة الملف في المتصفح">
                <i class="fa-solid fa-eye"></i> معاينة
              </a>
              <a href="${encodedPath}" ${!isExternal ? `download="${file.cleanName || file.name}"` : 'target="_blank"'} style="background: var(--primary-green); color: #ffffff; text-decoration: none; padding: 0.45rem 0.95rem; border-radius: 6px; font-size: 0.78rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.35rem; transition: var(--transition-fast); box-shadow: 0 2px 8px rgba(33,90,54,0.18);" title="تحميل الملف">
                <i class="fa-solid fa-download"></i> تحميل
              </a>
            </div>

          </div>
        `;
      }).join('');
    }

    // Initial render
    updateCategoryUI();
    renderInsideFiles();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderInsideFiles();
      });
    }

    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-category');
        activeCategory = cat;
        updateCategoryUI();
        renderInsideFiles();
      });
    });
  };

  // 2.2 Add / Upload Material Modal (إضافة ملفات جديدة للمادة وحفظها محلياً)
  window.openAddFileModal = function(materialId, courseName, defaultCategory = 'slides', cohort = '2006') {
    const modalHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <div style="background: rgba(33,90,54,0.06); border: 1.5px solid var(--primary-green); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.85rem;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary-green); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
            <i class="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <div>
            <h4 style="font-weight: 900; font-size: 1.05rem; color: var(--primary-green); margin: 0 0 2px 0;">إضافة وتزويد ملفات للمادة</h4>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">
              المادة المحددة: <strong>${courseName}</strong> • سيتم حفظ الملف في المتصفح وعرضه فوراً داخل الأقسام.
            </p>
          </div>
        </div>

        <form id="addCourseFileForm" style="display: flex; flex-direction: column; gap: 1rem;">
          
          <div>
            <label style="display: block; font-weight: 800; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">
              <i class="fa-solid fa-heading" style="color: var(--accent-orange);"></i> اسم أو عنوان الملف:
            </label>
            <input type="text" id="newFileTitle" required placeholder="مثال: سلايدات الشابتر الأول - د. فلان، أو أسئلة امتحان ميد 2024" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.9rem; background: var(--bg-tertiary); color: var(--text-main); outline: none;" />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
              <label style="display: block; font-weight: 800; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">
                <i class="fa-solid fa-layer-group" style="color: var(--primary-green);"></i> القسم / التصنيف:
              </label>
              <select id="newFileCategory" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.88rem; background: var(--bg-tertiary); color: var(--text-main); outline: none;">
                <option value="slides" ${defaultCategory === 'slides' ? 'selected' : ''}>📑 السلايدات والشروحات</option>
                <option value="exams" ${defaultCategory === 'exams' ? 'selected' : ''}>📝 أسئلة السنوات والامتحانات</option>
                <option value="books" ${defaultCategory === 'books' ? 'selected' : ''}>📖 كتاب المادة والمراجع</option>
                <option value="summaries" ${defaultCategory === 'summaries' ? 'selected' : ''}>📚 الملخصات والدوسيات</option>
                <option value="labs" ${defaultCategory === 'labs' ? 'selected' : ''}>💻 المشاريع واللابات</option>
                <option value="other">📂 ملفات أخرى</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-weight: 800; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">
                <i class="fa-solid fa-file" style="color: #2563eb;"></i> نوع وصيغة الملف:
              </label>
              <select id="newFileType" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.88rem; background: var(--bg-tertiary); color: var(--text-main); outline: none;">
                <option value="pdf">ملف PDF (.pdf)</option>
                <option value="ppt">عرض تقديمي (.pptx / .ppt)</option>
                <option value="doc">مستند وورد (.docx / .doc)</option>
                <option value="zip">ملف مضغوط (.zip / .rar)</option>
                <option value="image">صورة (.png / .jpg)</option>
                <option value="code">أكواد ومشاريع (.java / .cpp / .py)</option>
              </select>
            </div>
          </div>

          <div>
            <label style="display: block; font-weight: 800; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">
              <i class="fa-solid fa-link" style="color: var(--accent-orange);"></i> رابط الملف أو Google Drive المباشر:
            </label>
            <input type="url" id="newFileUrl" required placeholder="https://drive.google.com/... أو أي رابط خارجي" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.88rem; background: var(--bg-tertiary); color: var(--text-main); outline: none; direction: ltr; text-align: left;" />
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem; flex-wrap: wrap;">
            <button type="button" id="btnCancelAddFile" style="background: var(--bg-tertiary); border: 1.5px solid var(--border-color); color: var(--text-main); padding: 0.65rem 1.4rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; cursor: pointer; font-family: inherit;">
              إلغاء
            </button>
            <button type="submit" style="background: var(--primary-green); color: #ffffff; border: none; padding: 0.65rem 1.6rem; border-radius: 99px; font-weight: 800; font-size: 0.88rem; cursor: pointer; font-family: inherit; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: var(--shadow-green-glow);">
              <i class="fa-solid fa-check"></i>
              <span>حفظ وإضافة للمادة فوراً</span>
            </button>
          </div>

        </form>

        <div style="background: var(--bg-tertiary); border-radius: var(--radius-sm); padding: 0.85rem 1rem; border: 1px dashed var(--border-color); font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span>💡 هل لديك ملفات ضخمة أو مراجع معتمدة تود اعتمادها رسمياً في الموقع؟</span>
          <a href="https://t.me/it_bau_source" target="_blank" rel="noopener noreferrer" style="color: #0088cc; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-brands fa-telegram"></i> إرسال عبر تيليجرام Source Team
          </a>
        </div>

      </div>
    `;

    openModal(`إضافة ملف جديد لمادة: ${courseName}`, "fa-solid fa-plus-circle", modalHTML);

    const cancelBtn = document.getElementById('btnCancelAddFile');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        openCourseInsideView(materialId, courseName, cohort);
      });
    }

    const form = document.getElementById('addCourseFileForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('newFileTitle')?.value?.trim();
        const category = document.getElementById('newFileCategory')?.value;
        const fileType = document.getElementById('newFileType')?.value;
        const url = document.getElementById('newFileUrl')?.value?.trim();

        if (!title || !url) return;

        const iconMap = {
          'pdf': 'fa-solid fa-file-pdf',
          'ppt': 'fa-solid fa-file-powerpoint',
          'doc': 'fa-solid fa-file-word',
          'zip': 'fa-solid fa-file-zipper',
          'image': 'fa-solid fa-file-image',
          'code': 'fa-solid fa-file-code'
        };

        const colorMap = {
          'pdf': '#ef4444',
          'ppt': '#ea580c',
          'doc': '#2563eb',
          'zip': '#8b5cf6',
          'image': '#10b981',
          'code': '#0891b2'
        };

        const newFileObj = {
          id: 'custom-' + Date.now(),
          name: title,
          cleanName: title,
          path: url,
          url: url,
          folder: 'ملفات مضافة حديثاً',
          category: category,
          categoryLabel: (category === 'books' ? 'كتاب مادة' : category === 'slides' ? 'سلايد وشرح' : category === 'exams' ? 'أسئلة سنوات' : category === 'summaries' ? 'ملخص ودوسية' : 'لاب ومشروع'),
          fileType: fileType,
          icon: iconMap[fileType] || 'fa-solid fa-file',
          color: colorMap[fileType] || '#215a36',
          sizeBytes: 0,
          sizeFormatted: 'رابط مباشر'
        };

        // Save into localStorage
        try {
          const norm = (typeof normalizeArabic === 'function') ? normalizeArabic(courseName) : courseName.trim().toLowerCase();
          const storageKey = 'CUSTOM_COURSE_FILES_' + encodeURIComponent(norm);
          const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
          existing.unshift(newFileObj);
          localStorage.setItem(storageKey, JSON.stringify(existing));
        } catch (err) {
          console.error("Error saving file to localStorage:", err);
        }

        // Return to course inside view with updated files!
        openCourseInsideView(materialId, courseName, cohort);
      });
    }
  };

  window.openMaterialDetailsModal = window.openCourseInsideView;

  // Alias for backward compatibility if ever referenced
  window.openLecturesModal = function() {
    openCoursesModal();
  };

  // 3. Campus Map Modal (Official 30 Buildings & Interactive Image Viewer)
  window.openMapModal = function(defaultCat = 'all') {
    const mapData = IT_DATA.campusMapData;
    
    const mapHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Source Team Branding Badge Banner -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.85rem; background: rgba(33,90,54,0.06); border: 1.5px solid rgba(33,90,54,0.18); padding: 0.75rem 1.25rem; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
          <img src="img/source_team_logo.png?v=2" alt="Source Team Logo" style="height: 42px; width: 42px; object-fit: contain; border-radius: 50%; border: 2px solid var(--primary-green); box-shadow: 0 3px 10px rgba(0,0,0,0.12); background: #ffffff;" />
          <div style="text-align: right;">
            <div style="font-weight: 900; font-size: 0.98rem; color: var(--primary-green); display: flex; align-items: center; gap: 0.4rem;">
              <span>تم إعداد وتصميم هذه الخريطة بواسطة</span>
              <span style="color: var(--accent-orange); background: rgba(200,90,23,0.1); padding: 1px 8px; border-radius: 6px; font-weight: 900;">Source Team</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 1px;">IT College - Al-Balqa Applied University | فريق سورس - كلية IT</div>
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.95rem; font-weight: 500;">خريطة حرم جامعة البلقاء التطبيقية الرسمية والدليل الشامل لكافة الكليات، المباني والمرافق (الأرقام 1 - 30):</p>

        <!-- Map View Switcher & Interactive Viewer -->
        <div style="background: var(--bg-tertiary); border: 2px solid var(--primary-green); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center; box-shadow: var(--shadow-card);">
          <!-- Map Mode Selector Buttons -->
          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <button id="btnMapModern" onclick="switchMapView('modern')" style="background: var(--primary-green); color: #ffffff; border: none; padding: 0.55rem 1.2rem; border-radius: 99px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; transition: var(--transition-fast); box-shadow: var(--shadow-green-glow);">
              <i class="fa-solid fa-wand-magic-sparkles"></i> الخريطة التوضيحية الحديثة (HD Vector)
            </button>
            <button id="btnMapClassic" onclick="switchMapView('classic')" style="background: #ffffff; color: var(--text-main); border: 1.5px solid var(--border-color); padding: 0.55rem 1.2rem; border-radius: 99px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; transition: var(--transition-fast);">
              <i class="fa-solid fa-map"></i> الخريطة الرسمية الأصلية
            </button>
          </div>

          <!-- Image Container -->
          <div style="position: relative; overflow: hidden; border-radius: var(--radius-md); background: #ffffff; border: 1px solid rgba(0,0,0,0.08);">
            <img id="campusMapImg" src="${mapData.modernMapImg}" alt="خريطة جامعة البلقاء التطبيقية الحديثة" style="width: 100%; max-height: 500px; object-fit: contain; border-radius: var(--radius-md); transition: var(--transition-smooth); cursor: pointer;" onclick="window.open(this.src, '_blank')" title="انقر لفتح الخريطة بحجمها الكامل" />
          </div>

          <div style="margin-top: 0.85rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; border-top: 1px solid rgba(33,90,54,0.15); padding-top: 0.75rem;">
            <span id="mapCaptionText" style="font-weight: 800; color: var(--primary-green); font-size: 0.92rem;">
              <i class="fa-solid fa-sparkles"></i> الخريطة التوضيحية الحديثة المصممة لحرم الجامعة (الأرقام 1 - 30)
            </span>
            <a id="mapFullLink" href="${mapData.modernMapImg}" target="_blank" style="background: var(--accent-orange); color: #ffffff; text-decoration: none; padding: 0.5rem 1.2rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: var(--shadow-glow);">
              <i class="fa-solid fa-up-right-and-down-left-from-center"></i> فتح الصورة بالحجم الكامل (HD)
            </a>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="map-category-tabs" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
          <button class="map-cat-btn ${defaultCat === 'all' ? 'active' : ''}" onclick="filterMapCategory('all')">
            <i class="fa-solid fa-border-all"></i> الكل (جميع المباني والمرافق)
          </button>
          <button class="map-cat-btn ${defaultCat === 'الكليات' ? 'active' : ''}" onclick="filterMapCategory('الكليات')">
            <i class="fa-solid fa-building-columns"></i> الكليات (${mapData.colleges.length})
          </button>
          <button class="map-cat-btn ${defaultCat === 'القاعات والمشاغل' ? 'active' : ''}" onclick="filterMapCategory('القاعات والمشاغل')">
            <i class="fa-solid fa-flask-vial"></i> القاعات والمشاغل (${mapData.hallsAndLabs.length})
          </button>
          <button class="map-cat-btn ${defaultCat === 'الإدارة والخدمات' ? 'active' : ''}" onclick="filterMapCategory('الإدارة والخدمات')">
            <i class="fa-solid fa-user-gear"></i> الإدارة والخدمات (${mapData.adminAndServices.length})
          </button>
          <button class="map-cat-btn ${defaultCat === 'البوابات والخدمات' ? 'active' : ''}" onclick="filterMapCategory('البوابات والخدمات')">
            <i class="fa-solid fa-torii-gate"></i> البوابات والخدمات الإضافية (${mapData.gatesAndServices.length})
          </button>
        </div>

        <!-- Grid Container -->
        <div id="mapItemsContainer" class="map-items-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 0.5rem;"></div>
      </div>
    `;
    openModal("خريطة ودليل الجامعة التفاعلي", "fa-solid fa-map-location-dot", mapHTML);

    window.filterMapCategory = function(cat) {
      document.querySelectorAll('.map-cat-btn').forEach(btn => btn.classList.remove('active'));
      if (event && event.target) {
        const btnTarget = event.target.closest('.map-cat-btn');
        if (btnTarget) btnTarget.classList.add('active');
      }

      const container = document.getElementById('mapItemsContainer');
      let itemsToDisplay = [];

      if (cat === 'all') {
        itemsToDisplay = [
          ...mapData.colleges,
          ...mapData.hallsAndLabs,
          ...mapData.adminAndServices,
          ...mapData.gatesAndServices
        ];
      } else if (cat === 'الكليات') {
        itemsToDisplay = mapData.colleges;
      } else if (cat === 'القاعات والمشاغل') {
        itemsToDisplay = mapData.hallsAndLabs;
      } else if (cat === 'الإدارة والخدمات') {
        itemsToDisplay = mapData.adminAndServices;
      } else if (cat === 'البوابات والخدمات') {
        itemsToDisplay = mapData.gatesAndServices;
      }

      container.innerHTML = itemsToDisplay.map(item => `
        <div class="map-item-card" style="background: #ffffff; border: 1.5px solid ${item.color || 'var(--border-color)'}30; border-radius: var(--radius-md); padding: 1.1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: var(--transition-fast);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.6rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: ${item.color || '#215a36'}15; color: ${item.color || 'var(--primary-green)'}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                <i class="${item.icon}"></i>
              </div>
              <div>
                <div style="font-weight: 800; font-size: 0.98rem; color: var(--text-main);">${item.name}</div>
                <span style="font-size: 0.75rem; color: ${item.color || 'var(--accent-orange)'}; font-weight: 800; background: ${item.color || '#215a36'}10; padding: 2px 8px; border-radius: 99px;">${item.category}</span>
              </div>
            </div>
            ${item.num !== undefined ? `
              <div style="background: ${item.color || 'var(--primary-green)'}; color: #ffffff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.85rem; box-shadow: 0 3px 8px ${item.color || '#215a36'}40;" title="رقم المبنى على الخريطة">
                ${item.num}
              </div>
            ` : ''}
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${item.desc}</p>
        </div>
      `).join('');
    };

    window.switchMapView = function(mode) {
      const imgElem = document.getElementById('campusMapImg');
      const captionElem = document.getElementById('mapCaptionText');
      const linkElem = document.getElementById('mapFullLink');
      const btnModern = document.getElementById('btnMapModern');
      const btnClassic = document.getElementById('btnMapClassic');

      if (!imgElem || !mapData) return;

      if (mode === 'modern') {
        imgElem.src = mapData.modernMapImg;
        if (captionElem) captionElem.innerHTML = `<i class="fa-solid fa-sparkles"></i> الخريطة التوضيحية الحديثة المصممة لحرم الجامعة (الأرقام 1 - 30)`;
        if (linkElem) linkElem.href = mapData.modernMapImg;
        
        if (btnModern) {
          btnModern.style.background = 'var(--primary-green)';
          btnModern.style.color = '#ffffff';
        }
        if (btnClassic) {
          btnClassic.style.background = '#ffffff';
          btnClassic.style.color = 'var(--text-main)';
        }
      } else {
        imgElem.src = mapData.officialMapImg;
        if (captionElem) captionElem.innerHTML = `<i class="fa-solid fa-map-marked-alt"></i> الخريطة الرسمية الكلاسيكية لحرم جامعة البلقاء التطبيقية`;
        if (linkElem) linkElem.href = mapData.officialMapImg;

        if (btnClassic) {
          btnClassic.style.background = 'var(--primary-green)';
          btnClassic.style.color = '#ffffff';
        }
        if (btnModern) {
          btnModern.style.background = '#ffffff';
          btnModern.style.color = 'var(--text-main)';
        }
      }
    };

    filterMapCategory(defaultCat);
  };

    // 4. Doctors Directory Modal (Official BAU Faculty Roster)
  window.openDoctorsModal = function(selectedDoctorId = null) {
    const doctorsHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="background: linear-gradient(135deg, var(--primary-green) 0%, #153b23 100%); color: #ffffff; padding: 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div>
            <h3 style="font-weight: 900; font-size: 1.15rem; margin-bottom: 4px; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-graduation-cap"></i> أعضاء الهيئة التدريسية المعتمدين - جامعة البلقاء التطبيقية
            </h3>
            <p style="font-size: 0.85rem; opacity: 0.9;">دليل الشامل لجميع دكاترة ومدرسي كلية الأمير عبد الله بن غازي للاتصالات وتكنولوجيا المعلومات (29 عضو هيئة تدريس)</p>
          </div>
          <span style="background: rgba(255,255,255,0.15); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); padding: 0.4rem 0.9rem; border-radius: 99px; font-weight: 800; font-size: 0.82rem;">
            Source Team BAU
          </span>
        </div>

        <!-- Department Filters & Search -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem; background: #ffffff; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="doctorDeptTabs">
            <button class="doc-tab-btn active" data-dept="all" onclick="filterDoctorsByDept('all')" style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; cursor: pointer; border: 1.5px solid var(--primary-green); background: var(--primary-green); color: #ffffff; transition: var(--transition-fast);">
              الكل (29)
            </button>
            <button class="doc-tab-btn" data-dept="علم الحاسوب" onclick="filterDoctorsByDept('علم الحاسوب')" style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; cursor: pointer; border: 1.5px solid var(--border-color); background: #ffffff; color: var(--text-main); transition: var(--transition-fast);">
              قسم علم الحاسوب (15)
            </button>
            <button class="doc-tab-btn" data-dept="هندسة البرمجيات" onclick="filterDoctorsByDept('هندسة البرمجيات')" style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; cursor: pointer; border: 1.5px solid var(--border-color); background: #ffffff; color: var(--text-main); transition: var(--transition-fast);">
              هندسة البرمجيات (8)
            </button>
            <button class="doc-tab-btn" data-dept="نظم المعلومات" onclick="filterDoctorsByDept('نظم المعلومات')" style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; cursor: pointer; border: 1.5px solid var(--border-color); background: #ffffff; color: var(--text-main); transition: var(--transition-fast);">
              نظم المعلومات (6)
            </button>
          </div>
          <div style="position: relative;">
            <input type="text" id="doctorSearchInput" oninput="searchDoctorList()" placeholder="ابحث باسم الدكتور، التخصص، أو الرتبة..." style="width: 100%; padding: 0.65rem 1rem 0.65rem 2.5rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; font-weight: 600; outline: none;">
            <i class="fa-solid fa-search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
          </div>
        </div>

        <!-- Doctors Grid -->
        <div id="doctorsCardsContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 1.25rem; max-height: 60vh; overflow-y: auto; padding-right: 2px;">
        </div>
      </div>
    `;

    openModal("دليل أعضاء الهيئة التدريسية (رسمي)", "fa-solid fa-user-doctor", doctorsHTML);

    function renderDoctorCards(deptKey = 'all', query = '') {
      const container = document.getElementById('doctorsCardsContainer');
      if (!container) return;

      const q = query.trim().toLowerCase();
      let filtered = IT_DATA.doctors.filter(d => {
        const matchesDept = (deptKey === 'all') || (d.dept && d.dept.includes(deptKey));
        const matchesQuery = !q || 
          d.name.toLowerCase().includes(q) || 
          (d.dept && d.dept.toLowerCase().includes(q)) || 
          (d.rank && d.rank.toLowerCase().includes(q)) || 
          (d.role && d.role.toLowerCase().includes(q)) ||
          (d.specialty && d.specialty.toLowerCase().includes(q));
        return matchesDept && matchesQuery;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
            <i class="fa-solid fa-user-slash" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--accent-orange);"></i>
            <div style="font-weight: 800; font-size: 1.05rem;">لم يتم العثور على عضو هيئة تدريس مطابق</div>
            <p style="font-size: 0.85rem;">جرّب البحث بمصطلح آخر أو اختيار قسم مختلف.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(d => {
        const isSelected = selectedDoctorId && (d.id == selectedDoctorId || d.name.includes(selectedDoctorId));
        return `
          <div style="background: #ffffff; border: 1.5px solid ${isSelected ? 'var(--accent-orange)' : 'var(--border-color)'}; padding: 1.15rem; border-radius: var(--radius-lg); display: flex; flex-direction: column; justify-content: space-between; gap: 0.85rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: var(--transition-fast); position: relative;">
            <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
              <img src="${d.img}" onerror="this.src='img/default_avatar.png'" alt="${d.name}" style="width: 62px; height: 62px; border-radius: 50%; object-fit: cover; border: 2.5px solid var(--primary-green); background: #f8efe8; flex-shrink: 0;" />
              <div style="flex: 1; min-width: 0;">
                <h4 style="font-size: 1.02rem; font-weight: 900; color: var(--text-main); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${d.name}</h4>
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.72rem; background: rgba(33,90,54,0.1); color: var(--primary-green); font-weight: 800; padding: 2px 8px; border-radius: 99px;">${d.rank}</span>
                  ${d.role && d.role !== 'عضو هيئة تدريس' ? `<span style="font-size: 0.72rem; background: rgba(200,90,23,0.12); color: var(--accent-orange); font-weight: 800; padding: 2px 8px; border-radius: 99px;">${d.role}</span>` : ''}
                </div>
                <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
                  <i class="fa-solid fa-building-columns" style="color: var(--primary-green);"></i> ${d.dept}
                </div>
              </div>
            </div>

            <div style="background: var(--bg-tertiary); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.35rem;">
              <div style="display: flex; align-items: center; gap: 0.45rem; font-size: 0.82rem; color: var(--text-main); font-weight: 800;">
                <i class="fa-solid fa-door-open" style="color: var(--accent-orange); font-size: 0.95rem;"></i>
                <span>مكتب الدكتور: <strong style="color: var(--primary-green); font-weight: 900;">${d.office || 'كلية تكنولوجيا المعلومات'}</strong></span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; font-size: 0.74rem; color: var(--text-muted); border-top: 1px dashed rgba(0,0,0,0.07); padding-top: 0.35rem; flex-wrap: wrap;">
                <span><i class="fa-solid fa-graduation-cap" style="color: var(--primary-green);"></i> ${d.specialty}</span>
                <span onclick="navigator.clipboard.writeText('${d.email}'); alert('تم نسخ البريد الجامعي: ${d.email}');" style="cursor: pointer; color: var(--primary-green); font-weight: 700; display: inline-flex; align-items: center; gap: 3px;" title="انقر لنسخ البريد">
                  <i class="fa-regular fa-copy"></i> ${d.email}
                </span>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
              <a href="https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(d.email)}" target="_blank" rel="noopener noreferrer" title="فتح محادثة مباشرة مع الدكتور على Microsoft Teams (${d.email})" style="background: linear-gradient(135deg, #464eb8, #5b5fc7); color: #ffffff; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 800; text-decoration: none; flex: 1; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.45rem; box-shadow: 0 3px 8px rgba(70, 78, 184, 0.25);">
                <i class="fa-solid fa-comments"></i> تواصل عبر Teams
              </a>
              <a href="${d.profile}" target="_blank" rel="noopener noreferrer" style="background: var(--primary-green); color: #ffffff; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 800; text-decoration: none; flex: 1; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.45rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> الملف الأكاديمي
              </a>
            </div>
          </div>
        `;
      }).join('');
    };

    window.filterDoctorsByDept = function(deptKey) {
      document.querySelectorAll('.doc-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-dept') === deptKey) {
          btn.style.background = 'var(--primary-green)';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'var(--primary-green)';
        } else {
          btn.style.background = '#ffffff';
          btn.style.color = 'var(--text-main)';
          btn.style.borderColor = 'var(--border-color)';
        }
      });
      const searchVal = document.getElementById('doctorSearchInput') ? document.getElementById('doctorSearchInput').value : '';
      renderDoctorCards(deptKey, searchVal);
    };

    window.searchDoctorList = function() {
      const activeBtn = document.querySelector('.doc-tab-btn[style*="var(--primary-green)"]');
      const deptKey = activeBtn ? activeBtn.getAttribute('data-dept') : 'all';
      const searchVal = document.getElementById('doctorSearchInput') ? document.getElementById('doctorSearchInput').value : '';
      renderDoctorCards(deptKey, searchVal);
    };

    window.renderDoctorCards = renderDoctorCards;

    renderDoctorCards('all');
  };

  // 5. GPA Calculator Modal
  window.openGPAModal = function() {
    const gpaHTML = `
      <div class="gpa-card-form">
        <p style="color: var(--text-muted); font-size: 0.95rem; font-weight: 500;">حاسبة المعدل الفصلي والتراكمي الإلكترونية لطلاب جامعة البلقاء التطبيقية:</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px; display: block;">المعدل التراكمي السابق (من 4.0):</label>
            <input type="number" id="prevGpaInput" class="form-control" placeholder="مثال: 3.25" step="0.01" min="0" max="4.0" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px; display: block;">الساعات المقطوعة السابقة:</label>
            <input type="number" id="prevHoursInput" class="form-control" placeholder="مثال: 45" min="0" />
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <h4 style="font-size: 1.1rem; font-weight: 900; color: var(--primary-green); margin-bottom: 1rem;">مواد الفصل الحالي:</h4>
          <div id="subjectsContainer"></div>

          <button id="addSubjectBtn" style="background: rgba(33,90,54,0.08); border: 1.5px dashed var(--primary-green); color: var(--primary-green); width: 100%; padding: 0.75rem; border-radius: var(--radius-md); font-weight: 800; cursor: pointer; margin-top: 0.5rem;">
            <i class="fa-solid fa-plus"></i> إضافة مادة جديدة
          </button>
        </div>

        <div class="gpa-result-box">
          <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">المعدل الفصلي المتوقع:</span>
              <div id="semGpaRes" class="gpa-score">0.00</div>
            </div>
            <div>
              <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 600;">المعدل التراكمي الجديد:</span>
              <div id="cumGpaRes" class="gpa-score" style="color: var(--accent-orange);">0.00</div>
            </div>
          </div>
          <div id="gpaRatingBadge" style="margin-top: 1rem; font-weight: 900; font-size: 1.1rem; color: var(--primary-green);">
            أدخل العلامات لحساب النتيجة
          </div>
        </div>
      </div>
    `;
    openModal("حاسبة المعدل الفصلي والتراكمي", "fa-solid fa-calculator", gpaHTML);

    renderGPASubjectRows();
    
    document.getElementById('addSubjectBtn').addEventListener('click', () => {
      state.gpaSubjects.push({ name: '', hours: 3, grade: 4.0 });
      renderGPASubjectRows();
    });

    document.getElementById('prevGpaInput').addEventListener('input', updateGPACalculations);
    document.getElementById('prevHoursInput').addEventListener('input', updateGPACalculations);
  };

  function renderGPASubjectRows() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;

    container.innerHTML = state.gpaSubjects.map((sub, idx) => `
      <div class="subject-row">
        <input type="text" class="form-control subject-name" placeholder="اسم المادة" value="${sub.name}" data-idx="${idx}" />
        <select class="form-control subject-hours" data-idx="${idx}">
          <option value="1" ${sub.hours == 1 ? 'selected' : ''}>1 ساعة</option>
          <option value="2" ${sub.hours == 2 ? 'selected' : ''}>2 ساعات</option>
          <option value="3" ${sub.hours == 3 ? 'selected' : ''}>3 ساعات</option>
          <option value="4" ${sub.hours == 4 ? 'selected' : ''}>4 ساعات</option>
        </select>
        <select class="form-control subject-grade" data-idx="${idx}">
          <option value="4.0" ${sub.grade == 4.0 ? 'selected' : ''}>A (4.0)</option>
          <option value="3.75" ${sub.grade == 3.75 ? 'selected' : ''}>A- (3.75)</option>
          <option value="3.5" ${sub.grade == 3.5 ? 'selected' : ''}>B+ (3.5)</option>
          <option value="3.0" ${sub.grade == 3.0 ? 'selected' : ''}>B (3.0)</option>
          <option value="2.75" ${sub.grade == 2.75 ? 'selected' : ''}>B- (2.75)</option>
          <option value="2.5" ${sub.grade == 2.5 ? 'selected' : ''}>C+ (2.5)</option>
          <option value="2.0" ${sub.grade == 2.0 ? 'selected' : ''}>C (2.0)</option>
          <option value="1.75" ${sub.grade == 1.75 ? 'selected' : ''}>C- (1.75)</option>
          <option value="1.5" ${sub.grade == 1.5 ? 'selected' : ''}>D+ (1.5)</option>
          <option value="1.0" ${sub.grade == 1.0 ? 'selected' : ''}>D (1.0)</option>
          <option value="0.75" ${sub.grade == 0.75 ? 'selected' : ''}>D- (0.75)</option>
          <option value="0.0" ${sub.grade == 0.0 ? 'selected' : ''}>F (0.0)</option>
        </select>
        <button class="btn-del-sub" data-idx="${idx}" style="background: none; border: none; color: #ef4444; font-size: 1.1rem; cursor: pointer;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.subject-name').forEach(inp => {
      inp.addEventListener('input', (e) => {
        state.gpaSubjects[e.target.dataset.idx].name = e.target.value;
      });
    });

    container.querySelectorAll('.subject-hours').forEach(sel => {
      sel.addEventListener('change', (e) => {
        state.gpaSubjects[e.target.dataset.idx].hours = parseFloat(e.target.value);
        updateGPACalculations();
      });
    });

    container.querySelectorAll('.subject-grade').forEach(sel => {
      sel.addEventListener('change', (e) => {
        state.gpaSubjects[e.target.dataset.idx].grade = parseFloat(e.target.value);
        updateGPACalculations();
      });
    });

    container.querySelectorAll('.btn-del-sub').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = btn.closest('button').dataset.idx;
        state.gpaSubjects.splice(idx, 1);
        renderGPASubjectRows();
        updateGPACalculations();
      });
    });

    updateGPACalculations();
  }

  function updateGPACalculations() {
    const semResult = GPACalculator.calculateSemesterGPA(state.gpaSubjects);
    const semGpaRes = document.getElementById('semGpaRes');
    const cumGpaRes = document.getElementById('cumGpaRes');
    const badge = document.getElementById('gpaRatingBadge');

    if (!semGpaRes) return;

    semGpaRes.textContent = semResult.gpa.toFixed(2);

    const prevGpa = document.getElementById('prevGpaInput') ? document.getElementById('prevGpaInput').value : 0;
    const prevHours = document.getElementById('prevHoursInput') ? document.getElementById('prevHoursInput').value : 0;

    const cumGpa = GPACalculator.calculateCumulativeGPA(prevGpa, prevHours, semResult.gpa, semResult.totalHours);
    cumGpaRes.textContent = cumGpa.toFixed(2);

    const rating = GPACalculator.getRating(cumGpa > 0 ? cumGpa : semResult.gpa);
    badge.textContent = rating.text;
  }

  // 6. Exams Modal
  window.openExamsModal = function() {
    const examsHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <p style="color: var(--text-muted); font-size: 0.95rem; font-weight: 500;">جدول مواعيد الامتحانات وأرشيف نماذج السنوات السابقة:</p>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${IT_DATA.exams.map(ex => `
            <div style="background: #ffffff; border: 1.5px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
              <div>
                <h4 style="font-size: 1.1rem; font-weight: 900; color: var(--text-main);">${ex.course}</h4>
                <div style="font-size: 0.85rem; color: var(--accent-orange); font-weight: 800; margin-top: 3px;">${ex.type}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 6px; font-weight: 500;">
                  <span><i class="fa-solid fa-calendar" style="color: var(--primary-green);"></i> ${ex.date}</span> | 
                  <span><i class="fa-solid fa-clock" style="color: var(--primary-green);"></i> ${ex.time}</span> | 
                  <span><i class="fa-solid fa-location-dot" style="color: var(--primary-green);"></i> ${ex.hall}</span>
                </div>
              </div>
              <a href="${ex.archiveLink}" target="_blank" style="background: rgba(33,90,54,0.08); border: 1px solid var(--primary-green); color: var(--primary-green); text-decoration: none; padding: 0.6rem 1.2rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-file-pdf"></i> أرشيف الأسئلة
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    openModal("جدول الامتحانات والأرشيف", "fa-solid fa-file-pen", examsHTML);
  };

  // 7. Source Team About & Introduction Modal
  window.openSourceTeamModal = function() {
    const sourceHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Banner Header -->
        <div style="background: linear-gradient(135deg, var(--primary-green) 0%, #153b23 100%); color: #ffffff; padding: 1.5rem; border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: space-between; gap: 1.25rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <img src="img/source_team_logo.png?v=2" alt="Source Team Logo" style="width: 70px; height: 70px; border-radius: 50%; object-fit: contain; border: 3px solid #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.2); background: #ffffff;" />
            <div>
              <h3 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 4px;">فريق Source Team</h3>
              <p style="font-size: 0.88rem; opacity: 0.95;">كلية الأمير عبد الله بن غازي للاتصالات وتكنولوجيا المعلومات - جامعة البلقاء التطبيقية</p>
            </div>
          </div>
          <span style="background: var(--accent-orange); color: #ffffff; padding: 0.45rem 1.1rem; border-radius: 99px; font-weight: 800; font-size: 0.85rem; box-shadow: var(--shadow-glow);">
            خدمتكم شرفٌ لنا 💡
          </span>
        </div>

        <!-- Vision & About -->
        <div style="background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); border: 1.5px solid var(--border-color);">
          <h4 style="font-size: 1.05rem; font-weight: 900; color: var(--primary-green); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-bullseye" style="color: var(--accent-orange);"></i> رسالتنا ورؤيتنا
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.7; font-weight: 500;">
            نحن في <strong>Source Team</strong> نسعى إلى خلق بيئة طلابية وأكاديمية متكاملة تدعم طلبة كلية IT في جامعة البلقاء التطبيقية منذ اليوم الأول لدخولهم الجامعة وحتى تخرجهم. نعمل كحلقة وصل وتضامن عبر توفير المراجع المعتمدة، بنوك الأسئلة، الخطط التوجيهية، وورشات العمل البرمجية والأنشطة التطويرية.
          </p>
        </div>

        <!-- Team Pillars / Committees -->
        <div>
          <h4 style="font-size: 1.05rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-sitemap" style="color: var(--primary-green);"></i> لجان وأقسام الفريق
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
            
            <div style="background: #ffffff; border: 1.5px solid rgba(33,90,54,0.18); border-radius: var(--radius-md); padding: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(33,90,54,0.1); color: var(--primary-green); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                  <i class="fa-solid fa-book-bookmark"></i>
                </div>
                <h5 style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">اللجنة الأكاديمية</h5>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">مسؤولة عن تجهيز الدوسيات، التلاخيص المعتمدة، بنوك أسئلة الميد والفاينل، ومراجعة الخطط الدراسية وتحديثها دورياً.</p>
            </div>

            <div style="background: #ffffff; border: 1.5px solid rgba(200,90,23,0.2); border-radius: var(--radius-md); padding: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(200,90,23,0.1); color: var(--accent-orange); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                  <i class="fa-solid fa-code"></i>
                </div>
                <h5 style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">اللجنة التقنية</h5>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">تطوير البرمجيات والمنصات التفاعلية للطلبة مثل بوابات المواد، أدوات حساب المعدل، والمشاريع التقنية التطوعية.</p>
            </div>

            <div style="background: #ffffff; border: 1.5px solid rgba(33,90,54,0.18); border-radius: var(--radius-md); padding: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(33,90,54,0.1); color: var(--primary-green); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                  <i class="fa-solid fa-pen-nib"></i>
                </div>
                <h5 style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">لجنة التصميم والإعلام</h5>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">إنتاج الهويات البصرية، تصاميم الإعلانات، المحتوى الرقمي الموجه، وتغطية الأحداث والفعاليات داخل الكلية.</p>
            </div>

            <div style="background: #ffffff; border: 1.5px solid rgba(200,90,23,0.2); border-radius: var(--radius-md); padding: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(200,90,23,0.1); color: var(--accent-orange); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                  <i class="fa-solid fa-handshake-angle"></i>
                </div>
                <h5 style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">لجنة الأنشطة والإرشاد</h5>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">استقبال الطلبة المستجدين، الإرشاد في فترات السحب والإضافة، وتنظيم ورشات العمل واللقاءات الحوارية.</p>
            </div>

          </div>
        </div>

        <!-- Social Channels & Drive -->
        <div style="background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.85rem;">قنوات ومصادر الفريق الرسمية:</h4>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link" target="_blank" rel="noopener noreferrer" style="background: var(--accent-orange); color: #ffffff; text-decoration: none; padding: 0.65rem 1.25rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.5rem;">
              <i class="fa-brands fa-google-drive"></i> درايف الفريق الشامل
            </a>
            <a href="https://t.me/c/1555428522/3149" target="_blank" rel="noopener noreferrer" style="background: #229ed9; color: #ffffff; text-decoration: none; padding: 0.65rem 1.25rem; border-radius: var(--radius-sm); font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.5rem;">
              <i class="fa-brands fa-telegram"></i> مجتمع وقناة التليجرام
            </a>
          </div>
        </div>

        <!-- Developer Credit -->
        <div style="text-align: center; padding: 0.85rem; background: rgba(33,90,54,0.05); border-radius: var(--radius-sm); border: 1px dashed rgba(33,90,54,0.2); font-size: 0.88rem; color: var(--text-muted);">
          <span>💻 تطوير وبرمجة البوابة: <strong>Mohamed Al-zoubi</strong> | Source Team</span>
        </div>
      </div>
    `;
    openModal("تعريف بفريق Source Team", "fa-solid fa-users", sourceHTML);
  };

  // Event Listeners for Nav Cards & Favorite Buttons
  function initEventListeners() {
    document.querySelectorAll('.nav-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-favorite-btn')) return;
        const targetModal = card.getAttribute('data-modal');
        if (targetModal === 'majors') openMajorsModal();
        else if (targetModal === 'courses' || targetModal === 'lectures') openCoursesModal();
        else if (targetModal === 'map') openMapModal();
        else if (targetModal === 'doctors') openDoctorsModal();
        else if (targetModal === 'gpa') openGPAModal();
        else if (targetModal === 'exams') openExamsModal();
        else if (targetModal === 'sourceTeam') openSourceTeamModal();
      });
    });

    document.querySelectorAll('.card-favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const type = btn.getAttribute('data-type');
        const title = btn.getAttribute('data-title') || 'عنصر مفضل';
        const icon = btn.getAttribute('data-icon') || 'fa-solid fa-star';

        toggleFavorite({ id, type, title, icon });
      });
    });

    const sourceBtn = document.getElementById('openSourceTeamModalBtn');
    if (sourceBtn) {
      sourceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof openSourceTeamModal === 'function') {
          openSourceTeamModal();
        }
      });
    }

    updateFavoriteBtnStates();
  }
});
