const SITE_URL = "https://dikbudkra.github.io/materiPPI/";

const MATERIALS = [
  {
    id: "modul-1",
    category: "modul",
    badge: "Modul 1 • PPI",
    title: "Urgensi dan Kerangka Pendidikan Perubahan Iklim",
    desc: "Memahami latar belakang krisis iklim, urgensi pendidikan perubahan iklim, dan kerangka dasar implementasinya di sekolah.",
    file: "1. PPI_Modul_1_Urgensi_dan_Kerangka_PPI.pdf",
    size: "1.4 MB"
  },
  {
    id: "modul-2",
    category: "modul",
    badge: "Modul 2 • PPI",
    title: "Kepemimpinan dan Kurikulum Satuan Pendidikan (KSP)",
    desc: "Panduan peran kepemimpinan sekolah dalam mengintegrasikan isu perubahan iklim ke dalam Kurikulum Satuan Pendidikan.",
    file: "2. PPI_Modul_2_Kepemimpinan_dan_KSP.pdf",
    size: "907.9 KB"
  },
  {
    id: "modul-3",
    category: "modul",
    badge: "Modul 3 • PPI",
    title: "Aksi Siswa dan Budaya Sekolah",
    desc: "Strategi menumbuhkan aksi nyata peserta didik melalui pembiasaan, projek, dan penguatan budaya sekolah ramah iklim.",
    file: "3. PPI_Modul_3_Aksi_Siswa_dan_Budaya_Sekolah.pdf",
    size: "1.2 MB"
  },
  {
    id: "panduan-stem",
    category: "panduan",
    badge: "Panduan Pendukung",
    title: "Panduan Pembelajaran STEM",
    desc: "Referensi penerapan pendekatan Science, Technology, Engineering, and Mathematics (STEM) dalam pembelajaran kontekstual.",
    file: "Panduan STEM 22_09_2025 FA fix 3.pdf",
    size: "6.8 MB"
  },
  {
    id: "panduan-ksp",
    category: "panduan",
    badge: "Panduan Pendukung",
    title: "Panduan Kurikulum Satuan Pendidikan 2025",
    desc: "Dokumen acuan penyusunan dan pengembangan Kurikulum Satuan Pendidikan (KSP) tahun 2025.",
    file: "Panduan_Kurikulum_Satuan_Pendidikan_2025.pdf",
    size: "10.3 MB"
  },
  {
    id: "blueprint-stem-pejuang-iklim",
    category: "panduan",
    badge: "Panduan Pendukung",
    title: "Blueprint STEM Pejuang Iklim",
    desc: "Rancangan dan panduan pembelajaran STEM Pejuang Iklim untuk mendukung aksi proyek peserta didik.",
    file: "Blueprint_STEM_Pejuang_Iklim.pdf",
    size: "15.7 MB"
  }
];

let activeFilter = "all";
let searchQuery = "";

const materiGrid = document.getElementById("materiGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterTabs = document.querySelectorAll(".filter-tab");
const toastEl = document.getElementById("toast");

function renderMaterials() {
  const query = searchQuery.trim().toLowerCase();
  const filtered = MATERIALS.filter((item) => {
    const matchesCategory = activeFilter === "all" || item.category === activeFilter;
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.file.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (filtered.length === 0) {
    materiGrid.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  materiGrid.innerHTML = filtered
    .map((item) => {
      const fileHref = encodeURI(`materi/${item.file}`);
      const badgeClass = item.category === "modul" ? "badge-modul" : "badge-panduan";

      return `
        <article class="materi-card">
          <div>
            <div class="materi-meta">
              <span class="materi-badge ${badgeClass}">${item.badge}</span>
              <span class="materi-size">PDF • ${item.size}</span>
            </div>
            <h3 class="materi-title">${item.title}</h3>
            <p class="materi-desc">${item.desc}</p>
          </div>
          <div class="materi-actions">
            <a href="${fileHref}" target="_blank" rel="noopener" class="btn-card btn-preview">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Pratinjau</span>
            </a>
            <a href="${fileHref}" download="${item.file}" class="btn-card btn-download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Unduh PDF</span>
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    activeFilter = tab.dataset.filter;
    renderMaterials();
  });
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderMaterials();
});

/* Toast helper */
let toastTimer = null;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2600);
}

/* QR Code generation */
function initQRCodes() {
  if (typeof QRCode === "undefined") return;

  new QRCode(document.getElementById("heroQrContainer"), {
    text: SITE_URL,
    width: 180,
    height: 180,
    colorDark: "#0F2942",
    colorLight: "#FFFFFF",
    correctLevel: QRCode.CorrectLevel.H
  });

  new QRCode(document.getElementById("modalQrContainer"), {
    text: SITE_URL,
    width: 240,
    height: 240,
    colorDark: "#0F2942",
    colorLight: "#FFFFFF",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function downloadQRImage() {
  const sourceCanvas = document.querySelector("#modalQrContainer canvas") || document.querySelector("#heroQrContainer canvas");
  const sourceImg = document.querySelector("#modalQrContainer img") || document.querySelector("#heroQrContainer img");

  const exportCanvas = document.createElement("canvas");
  const size = 480;
  const padding = 48;
  const footerSpace = 68;
  exportCanvas.width = size + padding * 2;
  exportCanvas.height = size + padding * 2 + footerSpace;

  const ctx = exportCanvas.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

  const drawAndSave = (imgSource) => {
    ctx.drawImage(imgSource, padding, padding, size, size);
    ctx.fillStyle = "#0F5132";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("MATERI WORKSHOP PPI - KARANGANYAR", exportCanvas.width / 2, size + padding + 32);

    ctx.fillStyle = "#4B6074";
    ctx.font = "16px sans-serif";
    ctx.fillText(SITE_URL, exportCanvas.width / 2, size + padding + 58);

    const link = document.createElement("a");
    link.download = "QR-Materi-PPI-Karanganyar.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
    showToast("QR Code berhasil diunduh!");
  };

  if (sourceCanvas) {
    drawAndSave(sourceCanvas);
  } else if (sourceImg && sourceImg.src) {
    const img = new Image();
    img.onload = () => drawAndSave(img);
    img.src = sourceImg.src;
  } else {
    showToast("QR Code belum siap, coba beberapa detik lagi.");
  }
}

async function copySiteLink() {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    showToast("Tautan berhasil disalin!");
  } catch {
    showToast(SITE_URL);
  }
}

/* Modal controls */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = false;
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = true;
}

document.getElementById("openLightboxBtn").addEventListener("click", () => openModal("lightboxModal"));
document.getElementById("openQrModalBtn").addEventListener("click", () => openModal("qrModal"));
document.getElementById("downloadQrBtn").addEventListener("click", downloadQRImage);
document.getElementById("modalDownloadQrBtn").addEventListener("click", downloadQRImage);
document.getElementById("copyLinkBtn").addEventListener("click", copySiteLink);
document.getElementById("modalCopyLinkBtn").addEventListener("click", copySiteLink);

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => closeModal(el.dataset.close));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal("lightboxModal");
    closeModal("qrModal");
  }
});

renderMaterials();
initQRCodes();
