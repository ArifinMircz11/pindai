const video = document.getElementById('video');
const resultSpan = document.getElementById('result');
const status = document.getElementById('status');
const tableBody = document.querySelector("#absensiTable tbody");
const codeReader = new ZXing.BrowserMultiFormatReader();

let scanCount = 0;
const dataSiswa = siswaData;

mulaiScan();

function mulaiScan() {
  codeReader.listVideoInputDevices().then(devices => {
    if (devices.length === 0) return alert("Kamera tidak ditemukan!");
    const camId = devices[0].deviceId;
    codeReader.decodeFromVideoDevice(camId, video, (result, err) => {
      if (result) {
        const code = result.text;
        resultSpan.textContent = code;
        const nama = dataSiswa[code] || "Tidak Dikenal";
        status.textContent = `✅ ${nama} (${code})`;
        tambahKeTabel(code, nama);
      }
    });
  });
}

function tambahKeTabel(barcode, nama) {
  scanCount++;
  const row = tableBody.insertRow();
  row.insertCell(0).textContent = scanCount;
  row.insertCell(1).textContent = barcode;
  row.insertCell(2).textContent = nama;
  row.insertCell(3).textContent = new Date().toLocaleTimeString();
  row.insertCell(4).textContent = "-";
}
