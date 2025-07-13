function prosesAbsen(scannedId) {
  const siswa = dataSiswa.find(s => s.id === scannedId); // dataSiswa dari data-siswa.js

  if (!siswa) {
    statusElement.textContent = 'ID tidak ditemukan';
    statusElement.style.color = 'red';
    return;
  }

  const now = new Date();
  const jam = now.getHours();
  const waktu = jam < 12 ? 'pagi' : 'pulang';

  let row = document.getElementById(`row-${siswa.id}`);
  const waktuStr = now.toLocaleTimeString();

  if (!row) {
    // Tambahkan baris baru jika belum ada
    row = document.createElement('tr');
    row.id = `row-${siswa.id}`;
    row.innerHTML = `
      <td>${document.querySelectorAll('#tabel-hasil tbody tr').length + 1}</td>
      <td>${siswa.id}</td>
      <td>${siswa.nama}</td>
      <td id="pagi-${siswa.id}">-</td>
      <td id="pulang-${siswa.id}">-</td>
    `;
    document.querySelector('#tabel-hasil tbody').appendChild(row);
  }

  // Pilih sel waktu absensi
  const waktuCell = document.getElementById(`${waktu}-${siswa.id}`);

  if (!waktuCell) {
    statusElement.textContent = 'Kesalahan sistem';
    statusElement.style.color = 'red';
    return;
  }

  if (waktuCell.textContent !== '-') {
    statusElement.textContent = `Sudah absen ${waktu}`;
    statusElement.style.color = 'orange';
    return;
  }

  waktuCell.textContent = waktuStr;
  statusElement.textContent = `Absensi ${waktu} berhasil!`;
  statusElement.style.color = 'green';
}
