// script.js

// === Simulasi penyimpanan progres pengguna (tanpa backend) ===
// Menggunakan localStorage untuk menyimpan status modul dan kuis

document.addEventListener("DOMContentLoaded", () => {
  updateProgressDisplay();
});

function updateProgressDisplay() {
  const progressTable = document.querySelector(".progress-table tbody");
  if (!progressTable) return;

  const modules = [
    "Pengenalan Internet",
    "Penggunaan Peramban Web",
    "Keamanan Siber Dasar",
    "Informasi dan Berita Online",
    "Komunikasi Online Dasar"
  ];

  progressTable.innerHTML = "";
  modules.forEach((modul, index) => {
    const status = localStorage.getItem(`modul_status_${index}`) || "Belum Dimulai";
    const score = localStorage.getItem(`modul_score_${index}`) || "-";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${modul}</td>
      <td><span class="status ${getStatusClass(status)}">${status}</span></td>
      <td>${score}</td>
    `;
    progressTable.appendChild(row);
  });
}

function getStatusClass(status) {
  if (status === "Selesai") return "completed";
  if (status === "Dalam Proses") return "in-progress";
  return "not-started";
}

// === Fungsi kuis (kuis.html) ===
const quizForm = document.getElementById("quiz-form");
if (quizForm) {
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const answers = {
      q1: "b",
      q2: "b",
      q3: "b"
    };
    let score = 0;
    let total = Object.keys(answers).length;

    for (let q in answers) {
      const selected = document.querySelector(`input[name="${q}"]:checked`);
      if (selected && selected.value === answers[q]) score++;
    }

    const resultDiv = document.getElementById("quiz-result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<h2>Hasil Kuis:</h2><p>Skor Anda: ${score} dari ${total}</p>`;

    // Simpan skor dan status progres
    localStorage.setItem("modul_score_0", `${score}/${total}`);
    localStorage.setItem("modul_status_0", "Selesai");
  });
}

// === Modul Page: Simulasi interaksi (modul.html) ===
const completeBtns = document.querySelectorAll(".complete-btn");
completeBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    localStorage.setItem(`modul_status_${index}`, "Selesai");
    alert("Modul ditandai selesai!");
  });
});
