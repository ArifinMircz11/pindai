const video = document.getElementById('video');
const resultSpan = document.getElementById('result');
const status = document.getElementById('status');
const tableBody = document.getElementById('tabel-hasil');
const codeReader = new ZXing.BrowserMultiFormatReader();

const scanLog = {}; // { id: { pagi: ..., pulang: ... } }

function tampilkanKeTabel(id, nama, waktu, tipe) {
  let row = document.querySelector(`tr[data-id="${id}"]`);

  if (!row) {
    // Tambah baris baru
    row = document.createElement('tr');
    row.setAttribute('data-id', id);
    row.innerHTML = `
      <td>${tableBody.rows.length + 1}</td>
      <td>${id}</td>
      <td>${nama || '-'}</td>
      <td>${tipe === 'pagi' ? waktu : '-'}</td>
      <td>${tipe === 'pulang' ? waktu : '-'}</td>
    `;
    tableBody.appendChild(row);
  } else {
    // Update data scan
    const cellPagi = row.cells[3];
    const cellPulang = row.cells[4];
    if (tipe === 'pagi' && cellPagi.textContent === '-') {
      cellPagi.textContent = waktu;
    } else if (tipe === 'pulang') {
      cellPulang.textContent = waktu;
    }
  }
}

function kirim(barcode) {
  fetch("taruhi.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `barcode=${encodeURIComponent(barcode)}`
  }).then(() => {
    status.textContent = "✅ Data terkirim: " + barcode;
  }).catch(err => {
    status.textContent = "❌ Gagal kirim: " + err;
  });
}

codeReader.listVideoInputDevices().then(devices => {
  if (devices.length === 0) return alert("Kamera tidak ditemukan!");
  const camId = devices[0].deviceId;

  codeReader.decodeFromVideoDevice(camId, video, (result, err) => {
    if (result) {
      const id = result.text.trim();
      const nama = siswa[id] || "(Tidak dikenal)";
      const waktu = new Date().toLocaleTimeString();

      resultSpan.textContent = id;
      kirim(id);

      if (!scanLog[id]) {
        scanLog[id] = { pagi: waktu, pulang: null };
        tampilkanKeTabel(id, nama, waktu, 'pagi');
      } else {
        scanLog[id].pulang = waktu;
        tampilkanKeTabel(id, nama, waktu, 'pulang');
      }
    }
  });
});
