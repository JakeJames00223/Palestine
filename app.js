document.addEventListener("DOMContentLoaded", () => {
  // --- State Management ---
  const state = {
    lang: "en",
    theme: "light",
    data: {},
  };

  // --- DOM Elements ---
  const langToggleBtn = document.getElementById("lang-toggle");
  const darkModeToggleBtn = document.getElementById("dark-mode-toggle");
  const htmlEl = document.documentElement;

  // --- Translations ---
  const i18n = {
    en: {
      title: "Palestine Humanitarian Situation",
      skipLink: "Skip to main content",
      logo: "Palestine Humanitarian Data",
      navSummary: "Summary",
      navDashboard: "Dashboard",
      navMap: "Map",
      navStories: "Stories",
      navHelp: "How to Help",
      navSources: "Data & Sources",
      summaryTitle: "Humanitarian Summary",
      warningTitle: "Content Warning:",
      warningText:
        "This page contains data and descriptions related to conflict that may be distressing.",
      summaryIntro:
        "This page provides a summary of the latest humanitarian situation in Palestine, based on data from verified sources like the UN Office for the Coordination of Humanitarian Affairs (OCHA), the World Health Organization (WHO), and others. All data is time-stamped and sourced.",
      fatalities: "Fatalities",
      injured: "Injured",
      displaced: "Displaced",
      populationDisplaced: "% Population Displaced",
      hospitalsDamaged: "Hospitals Damaged/Destroyed",
      childrenMalnourished: "Children Acutely Malnourished",
      dashboardTitle: "Live Dashboard",
      casualtiesOverTime: "Casualties Over Time (Cumulative)",
      displacementOverTime: "Displacement Over Time (Cumulative)",
      healthAttacks: "Attacks on Health Facilities",
      downloadCSV: "Download CSV",
      mapTitle: "Interactive Humanitarian Map",
      storiesTitle: "Voices from Palestine",
      helpTitle: "Resources & How to Help",
      helpIntro:
        "The following is a list of reputable, internationally recognized organizations providing critical aid. Always verify the authenticity of donation links.",
      sourcesTitle: "Data & Sources",
      sourcesIntro:
        "This project relies exclusively on public data from humanitarian organizations. All data used on this site is available for review and download. Below is a list of primary sources consulted for the latest reports.",
      modalTitle: "Content Warning",
      modalText:
        "The 'Stories' section contains descriptions of violence and suffering that may be disturbing. Proceed with care.",
      proceed: "Proceed",
      goBack: "Go Back",
      source: "Source",
      date: "Date",
      noStories: "No stories available right now.",
      noNgos: "No organizations available.",
      anonymous: "Anonymous",
      visitSite: "Website",
      donate: "Donate",
      loadMore: "Load more",
      storyImageAlt: "Story image",
    },
    ar: {
      title: "الوضع الإنساني في فلسطين",
      skipLink: "انتقل إلى المحتوى الرئيسي",
      logo: "بيانات فلسطين الإنسانية",
      navSummary: "ملخص",
      navDashboard: "لوحة البيانات",
      navMap: "خريطة",
      navStories: "قصص",
      navHelp: "كيفية المساعدة",
      navSources: "البيانات والمصادر",
      summaryTitle: "ملخص الوضع الإنساني",
      warningTitle: "تحذير:",
      warningText:
        "تحتوي هذه الصفحة على بيانات وأوصاف تتعلق بالنزاع قد تكون مؤلمة.",
      summaryIntro:
        "تقدم هذه الصفحة ملخصًا لآخر مستجدات الوضع الإنساني في فلسطين، بناءً على بيانات من مصادر موثوقة مثل مكتب الأمم المتحدة لتنسيق الشؤون الإنسانية (OCHA) ومنظمة الصحة العالمية (WHO) وغيرها. جميع البيانات مؤرخة وموثقة المصدر.",
      fatalities: "القتلى",
      injured: "الجرحى",
      displaced: "النازحون",
      populationDisplaced: "نسبة السكان النازحين",
      hospitalsDamaged: "المستشفيات المتضررة/المدمرة",
      childrenMalnourished: "الأطفال الذين يعانون من سوء التغذية الحاد",
      dashboardTitle: "لوحة البيانات الحية",
      casualtiesOverTime: "الضحايا مع مرور الوقت (تراكمي)",
      displacementOverTime: "النزوح مع مرور الوقت (تراكمي)",
      healthAttacks: "الهجمات على المرافق الصحية",
      downloadCSV: "تنزيل CSV",
      mapTitle: "خريطة إنسانية تفاعلية",
      storiesTitle: "أصوات من فلسطين",
      helpTitle: "مصادر وكيفية المساعدة",
      helpIntro:
        "فيما يلي قائمة بالمنظمات الموثوقة والمعترف بها دوليًا والتي تقدم مساعدات حيوية. تحقق دائمًا من صحة روابط التبرع.",
      sourcesTitle: "البيانات والمصادر",
      sourcesIntro:
        "يعتمد هذا المشروع حصريًا على البيانات العامة من المنظمات الإنسانية. جميع البيانات المستخدمة في هذا الموقع متاحة للمراجعة والتنزيل. فيما يلي قائمة بالمصادر الأولية التي تمت استشارتها للحصول على أحدث التقارير.",
      modalTitle: "تحذير المحتوى",
      modalText:
        "يحتوي قسم 'القصص' على أوصاف للعنف والمعاناة قد تكون مزعجة. يرجى المتابعة بحذر.",
      proceed: "متابعة",
      goBack: "عودة",
      source: "المصدر",
      date: "التاريخ",
      noStories: "لا توجد قصص متاحة الآن.",
      noNgos: "لا توجد منظمات متاحة.",
      anonymous: "مجهول",
      visitSite: "الموقع",
      donate: "تبرع",
      loadMore: "المزيد",
      storyImageAlt: "صورة القصة",
    },
  };

  // --- Localization ---
  const translatePage = () => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = i18n[state.lang][key];
    });
    htmlEl.lang = state.lang;
    htmlEl.dir = state.lang === "ar" ? "rtl" : "ltr";
    langToggleBtn.textContent = state.lang === "en" ? "العربية" : "English";
  };

  // --- Theme (Dark/Light Mode) ---
  const applyTheme = () => {
    htmlEl.setAttribute("data-theme", state.theme);
    darkModeToggleBtn.textContent = state.theme === "light" ? "🌙" : "☀️";
    localStorage.setItem("theme", state.theme);
  };

  // --- Event Listeners ---
  langToggleBtn.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "ar" : "en";
    translatePage();
    renderAllComponents(); // Re-render components to apply text changes if needed
  });

  darkModeToggleBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
    // Re-render charts for dark mode colors
    renderAllComponents();
  });

  // --- Data Fetching ---
  async function fetchData(file) {
    try {
      const response = await fetch(`./data/${file}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Could not fetch ${file}:`, error);
      return null;
    }
  }

  // Utility: simple text sanitizer (escapes < > & ")
  const escapeHtml = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  // Render Stories section
  const renderStories = (stories = []) => {
    const container = document.getElementById("stories-content");
    if (!container) return;

    container.innerHTML = ""; // clear

    if (!Array.isArray(stories) || stories.length === 0) {
      container.innerHTML = `
        <div class="stories-empty">
          <p>${escapeHtml(
            i18n[state.lang].noStories || "No stories available right now."
          )}</p>
        </div>
      `;
      return;
    }

    // Create story cards
    stories.forEach((s) => {
      // expected structure: { id, author, date, text, image, sourceName, sourceUrl }
      const author = escapeHtml(
        s.author || i18n[state.lang].anonymous || "Anonymous"
      );
      const date = escapeHtml(s.date || "");
      const text = escapeHtml(s.text || "");
      const img = s.image
        ? `<div class="story-image"><img alt="${author} image" loading="lazy" src="${escapeHtml(
            s.image
          )}"></div>`
        : "";
      const source =
        s.sourceName && s.sourceUrl
          ? `<div class="story-source"><a target="_blank" rel="noopener noreferrer" href="${escapeHtml(
              s.sourceUrl
            )}">${escapeHtml(s.sourceName)}</a></div>`
          : "";

      const card = document.createElement("article");
      card.className = "story-card";
      card.innerHTML = `
        ${img}
        <div class="story-body">
          <div class="story-meta">
            <strong class="story-author">${author}</strong>
            ${
              date
                ? `<time class="story-date" datetime="${date}">${date}</time>`
                : ""
            }
          </div>
          <p class="story-text">${text}</p>
          ${source}
        </div>
      `;
      container.appendChild(card);
    });
  };

  // Render NGOs list
  const renderNGOs = (ngos = []) => {
    const list = document.getElementById("ngo-list");
    if (!list) return;

    list.innerHTML = "";

    if (!Array.isArray(ngos) || ngos.length === 0) {
      list.innerHTML = `<li class="ngo-empty">${escapeHtml(
        i18n[state.lang].noNgos || "No organizations available."
      )}</li>`;
      return;
    }

    ngos.forEach((n) => {
      // expected structure: { name, description, website, donate }
      const name = escapeHtml(n.name || "");
      const desc = escapeHtml(n.description || "");
      const website = n.website
        ? `<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(
            n.website
          )}">${escapeHtml(i18n[state.lang].visitSite || "Website")}</a>`
        : "";
      const donate = n.donate
        ? `<a class="ngo-donate" target="_blank" rel="noopener noreferrer" href="${escapeHtml(
            n.donate
          )}">${escapeHtml(i18n[state.lang].donate || "Donate")}</a>`
        : "";

      const li = document.createElement("li");
      li.className = "ngo-item";
      li.innerHTML = `
        <div class="ngo-main">
          <strong class="ngo-name">${name}</strong>
          <p class="ngo-desc">${desc}</p>
        </div>
        <div class="ngo-links">
          ${website} ${donate}
        </div>
      `;
      list.appendChild(li);
    });
  };

  // Example sample content (replace with your real data or state.data)
  const sampleStories = [
    {
      id: 1,
      author: "Amina",
      date: "2025-10-01",
      text: "We lost our home but we keep hope. Aid arrived last week and helped our family.",
      image: "", // optional image url
      sourceName: "Local Volunteer",
      sourceUrl: "",
    },
    {
      id: 2,
      author: "Khaled",
      date: "2025-10-03",
      text: "Medical help is scarce. Hospitals are overwhelmed.",
    },
  ];

  const sampleNgos = [
    {
      name: "Norwegian Refugee Council",
      description:
        "Provides shelter and protection services to displaced families.",
      website: "https://www.nrc.no",
      donate: "https://www.nrc.no/donate",
    },
    {
      name: "UNICEF",
      description:
        "Supports children with health, nutrition and education programs.",
      website: "https://www.unicef.org",
      donate: "https://donate.unicef.org",
    },
    {
      name: "International Committee of the Red Cross (ICRC)",
      description:
        "Supports healthcare and emergency response in conflict zones.",
      website: "https://www.icrc.org",
      donate: "https://www.icrc.org/en/donate",
    },
  ];

  // When your data is ready, call these with the real arrays:
  // renderStories(state.data.stories);
  // renderNGOs(state.data.ngos);

  // For now, using samples (you can remove these lines)
  renderStories(sampleStories);
  renderNGOs(sampleNgos);

  /*
    Integration notes:
    - Call renderStories(...) and renderNGOs(...) after you fetch or set state.data.
    - If you want to include these calls inside an existing "setState" or "onDataLoaded" flow,
      simply pass the arrays you receive from the API.
    - If you want to load remotely trusted lists, fetch them and then call the renderers:
        fetch('/data/stories.json').then(r=>r.json()).then(renderStories);
    - Add CSS for classes: .stories-grid, .story-card, .story-image img, .story-body, .ngo-list, .ngo-item, .ngo-links, etc.
  */

  // --- Component Rendering ---

  // KPI Cards
  const renderKpiCards = () => {
    const container = document.getElementById("kpi-cards-container");
    if (!container || !state.data.summary) return;
    const summary = state.data.summary;
    const population = summary.stats.population || 2200000; // Fallback

    const kpiData = [
      {
        id: "fatalities",
        value: summary.stats.fatalities_total,
        labelKey: "fatalities",
      },
      {
        id: "injured",
        value: summary.stats.injured_total,
        labelKey: "injured",
      },
      {
        id: "displaced",
        value: summary.stats.displaced_total,
        labelKey: "displaced",
      },
      {
        id: "populationDisplaced",
        value:
          ((summary.stats.displaced_total / population) * 100).toFixed(1) + "%",
        labelKey: "populationDisplaced",
      },
      {
        id: "hospitalsDamaged",
        value: summary.stats.hospitals_damaged_destroyed,
        labelKey: "hospitalsDamaged",
      },
      {
        id: "childrenMalnourished",
        value: summary.stats.children_malnourished,
        labelKey: "childrenMalnourished",
      },
    ];

    container.innerHTML = kpiData
      .map(
        (kpi) => `
            <div class="kpi-card">
                <h3>${i18n[state.lang][kpi.labelKey]}</h3>
                <div class="value">${kpi.value.toLocaleString(
                  state.lang === "ar" ? "ar-EG" : "en-US"
                )}</div>
                <div class="source">
                    ${i18n[state.lang].source}: ${summary.source} | ${
          i18n[state.lang].date
        }: ${summary.date_report}
                </div>
            </div>
        `
      )
      .join("");
  };

  // Charts
  const charts = {}; // To hold chart instances
  const renderCharts = () => {
    if (!state.data.timeseries) return;
    const isDarkMode = state.theme === "dark";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const textColor = isDarkMode ? "#f8f9fa" : "#212529";

    const chartData = state.data.timeseries || [];

    // Helper: compute nice suggested min/max so charts don't always start at 0
    const computeSuggestedRange = (values) => {
      const nums = values.filter((n) => typeof n === "number" && !isNaN(n));
      if (!nums.length) return { suggestedMin: 0, suggestedMax: 1 };
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      // padding = 10% of range or 1 if range is 0
      const range = max - min;
      const pad = range > 0 ? range * 0.1 : Math.max(1, Math.abs(max) * 0.1);
      // allow suggestedMin below zero if data warrants it (better visibility),
      // but if min is 0 and max small, still create a small window
      return {
        suggestedMin: min - pad,
        suggestedMax: max + pad,
      };
    };

    // Prepare arrays
    const labels = chartData.map((d) => d.date_report);
    const fatalities = chartData.map((d) => d.stats.fatalities_total);
    const injured = chartData.map((d) => d.stats.injured_total);
    const displaced = chartData.map((d) => d.stats.displaced_total);
    const healthAttacksAll = chartData.map((d) => d.stats.health_attacks);

    // limits for each chart
    const casualtiesRange = computeSuggestedRange(fatalities.concat(injured));
    const displacedRange = computeSuggestedRange(displaced);
    const healthAttacksSlice = healthAttacksAll.slice(-7);
    const healthAttacksLabels = labels.slice(-7);
    const healthRange = computeSuggestedRange(healthAttacksSlice);

    const chartConfigs = {
      casualtiesChart: {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: i18n[state.lang].fatalities,
              data: fatalities,
              backgroundColor: "rgba(220, 53, 69, 0.15)",
              borderColor: "#dc3545",
              fill: false, // don't fill -> clearer overlap
              tension: 0.12,
              pointRadius: 2,
              borderWidth: 2,
            },
            {
              label: i18n[state.lang].injured,
              data: injured,
              backgroundColor: "rgba(255, 193, 7, 0.15)",
              borderColor: "#ffc107",
              fill: false,
              tension: 0.12,
              pointRadius: 2,
              borderWidth: 2,
            },
          ],
        },
        optionsExtras: {
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: casualtiesRange.suggestedMin,
              suggestedMax: casualtiesRange.suggestedMax,
            },
          },
        },
      },

      displacementChart: {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: i18n[state.lang].displaced,
              data: displaced,
              backgroundColor: "rgba(0, 123, 255, 0.15)",
              borderColor: "#007bff",
              fill: true,
              tension: 0.12,
              pointRadius: 2,
              borderWidth: 2,
            },
          ],
        },
        optionsExtras: {
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: displacedRange.suggestedMin,
              suggestedMax: displacedRange.suggestedMax,
            },
          },
        },
      },

      healthAttacksChart: {
        type: "bar",
        data: {
          labels: healthAttacksLabels,
          datasets: [
            {
              label: i18n[state.lang].healthAttacks,
              data: healthAttacksSlice,
              backgroundColor: "#6f42c1",
              borderColor: "#6f42c1",
              borderWidth: 1,
              barPercentage: 0.7,
            },
          ],
        },
        optionsExtras: {
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: healthRange.suggestedMin,
              suggestedMax: healthRange.suggestedMax,
            },
          },
        },
      },
    };

    // Build/Destroy charts
    for (const id in chartConfigs) {
      const canvas = document.getElementById(id);
      if (!canvas) continue;
      if (charts[id]) {
        try {
          charts[id].destroy();
        } catch (e) {
          /* ignore */
        }
      }

      const cfg = chartConfigs[id];
      charts[id] = new Chart(canvas, {
        type: cfg.type,
        data: cfg.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: textColor } },
            tooltip: { mode: "index", intersect: false },
          },
          interaction: { mode: "nearest", intersect: false },
          scales: {
            x: {
              type: "time",
              time: {
                tooltipFormat: "yyyy-MM-dd",
                unit: "day",
                displayFormats: { day: "MMM d" },
              },
              ticks: { color: textColor, maxRotation: 0 },
              grid: { color: gridColor },
            },
            y: {
              ticks: { color: textColor },
              grid: { color: gridColor },
            },
            // merge any custom scale overrides (suggestedMin/Max)
            ...cfg.optionsExtras?.scales,
          },
        },
      });
    }
  };

  // Map
  let map;
  const renderMap = () => {
    if (!state.data.map_points) return;
    if (map) map.remove(); // Remove previous map instance if it exists

    map = L.map("interactive-map").setView([31.5, 34.466667], 9); // Centered on Gaza
    const tileUrl =
      state.theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    const iconColors = {
      destroyed_hospital: "red",
      damaged_neighborhood: "orange",
      displaced_camp: "blue",
    };

    state.data.map_points.forEach((point) => {
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: `<div style='background-color:${
          iconColors[point.type]
        };' class='marker-pin'></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      });

      L.marker([point.lat, point.lon], { icon: L.icon.default() })
        .addTo(map)
        .bindPopup(
          `<b>${point.name}</b><br>${point.description}<br><br><i>${
            i18n[state.lang].source
          }: ${point.source} (${point.date_report})</i>`
        );
    });
  };

  // Stories, Help, and Sources (Static content from JSON)
  const renderStaticContent = () => {
    const storiesContainer = document.getElementById("stories-content");
    if (storiesContainer && state.data.stories) {
      storiesContainer.innerHTML = state.data.stories
        .map(
          (story) => `
                <div class="story-card">
                    <img src="${story.image_url}" alt="${story.image_alt}">
                    <div class="story-card-content">
                        <h3>${story.title[state.lang]}</h3>
                        <p>${story.text[state.lang]}</p>
                        <p class="label">${story.label[state.lang]}</p>
                    </div>
                </div>
            `
        )
        .join("");
    }

    const ngoContainer = document.getElementById("ngo-list");
    if (ngoContainer && state.data.ngos) {
      ngoContainer.innerHTML = state.data.ngos
        .map(
          (ngo) => `
                <li>
                    <h3>${ngo.name}</h3>
                    <p>${ngo.description[state.lang]}</p>
                    <a href="${
                      ngo.url
                    }" target="_blank" rel="noopener noreferrer">${ngo.url}</a>
                </li>
            `
        )
        .join("");
    }

    const sourcesContainer = document.getElementById("sources-list");
    if (sourcesContainer && state.data.sources) {
      sourcesContainer.innerHTML = state.data.sources
        .map(
          (src) => `
                <div class="source-item">
                    <h3>${src.name}</h3>
                    <p>${
                      i18n[state.lang].sourcesIntro.split(".")[0]
                    }: <a href="${src.report_url}" target="_blank">${
            src.report_title
          }</a></p>
                    <p>API/Data Endpoint: <code>${src.api_url}</code></p>
                </div>
            `
        )
        .join("");
    }
  };

  // --- Download CSV ---
  const handleCSVDownloads = () => {
    document.querySelectorAll(".download-csv").forEach((button) => {
      button.addEventListener("click", (e) => {
        const chartId = e.target.getAttribute("data-chart-id");
        const chart = charts[chartId];
        if (!chart) return;

        const data = chart.data;
        const labels = data.labels;
        const datasets = data.datasets;

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Date," + datasets.map((d) => d.label).join(",") + "\n";

        labels.forEach((label, i) => {
          const row = [label].concat(datasets.map((d) => d.data[i]));
          csvContent += row.join(",") + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${chartId}_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  };

  // --- Modal Logic ---
  const setupModal = () => {
    const modal = document.getElementById("stories-modal");
    const proceedBtn = document.getElementById("proceed-btn");
    const goBackBtn = document.getElementById("goback-btn");
    const storiesLink = document.querySelector('a[href="#stories"]');

    if (storiesLink) {
      storiesLink.addEventListener("click", (e) => {
        e.preventDefault();
        modal.hidden = false;
      });
    }

    proceedBtn.addEventListener("click", () => {
      modal.hidden = true;
      document.getElementById("stories").scrollIntoView({ behavior: "smooth" });
    });

    goBackBtn.addEventListener("click", () => {
      modal.hidden = true;
    });
  };

  // --- Initialization ---
  const renderAllComponents = () => {
    renderKpiCards();
    renderCharts();
    renderMap();
    renderStaticContent();
  };

  const init = async () => {
    // Set initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    state.theme = savedTheme || (prefersDark ? "dark" : "light");
    applyTheme();

    // Fetch all data
    const [summary, timeseries, mapPoints, staticContent] = await Promise.all([
      fetchData("summary_latest.json"),
      fetchData("timeseries_data.json"),
      fetchData("map_points.json"),
      fetchData("static_content.json"),
    ]);

    state.data = {
      summary,
      timeseries,
      map_points: mapPoints,
      ...staticContent,
    };

    // Initial render
    translatePage();
    renderAllComponents();
    handleCSVDownloads();
    setupModal();
  };

  init();
});
