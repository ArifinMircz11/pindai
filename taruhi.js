// Asumsikan file data-siswa.js sudah dimuat sebelum file ini
// <script src="data-siswa.js"></script> harus di atas <script src="taruhi.js"></script>

const video = document.getElementById('video');
const resultSpan = document.getElementById('result');
const status = document.getElementById('status');
const tableBody = document.getElementById('tabel-hasil'); // tbody element
const codeReader = new ZXing.BrowserMultiFormatReader();
const sudahScan = new Set(); // mencegah duplikat

function tampilkanKeTabel(barcode, nama) {
  const baris = document.createElement('tr');
  const no = tableBody.rows.length + 1;

  baris.innerHTML = `
    <td>${no}</td>
    <td>${barcode}</td>
    <td>${nama || '-'}</td>
    <td>${new Date().toLocaleTimeString()}</td>
    <td>-</td>
  `;

  tableBody.appendChild(baris);
}

function kirim(barcode) {
  fetch("taruhi.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `barcode=${encodeURIComponent(barcode)}`
  }).then(() => {
    status.textContent = "✅ Terkirim: " + barcode;
  }).catch(err => {
    status.textContent = "❌ Gagal kirim: " + err;
  });
}

codeReader.listVideoInputDevices().then(devices => {
  if (devices.length === 0) return alert("Kamera tidak ditemukan!");
  const camId = devices[0].deviceId;
  codeReader.decodeFromVideoDevice(camId, video, (result, err) => {
    if (result) {
      const code = result.text;
      if (sudahScan.has(code)) return;

      sudahScan.add(code);
      const nama = siswa[code]; // siswa dari data-siswa.js
      resultSpan.textContent = code;

      tampilkanKeTabel(code, nama);
      kirim(code);
    }
  });
});
