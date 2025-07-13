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

  // Cek apakah sudah ada di tabel
  let row = document.getElementById(`row-${siswa.id}`);
  if (!row) {
    // Tambah baris baru
    row = document.createElement('tr');
    row.id = `row-${siswa.id}`;
    row.innerHTML = `
      <td>${document.querySelectorAll('#tabel-hasil tr').length + 1}</td>
      <td>${siswa.id}</td>
      <td>${siswa.nama}</td>
      <td id="pagi-${siswa.id}">-</td>
      <td id="pulang-${siswa.id}">-</td>
    `;
    document.getElementById('tabel-hasil').appendChild(row);
  }

  // Isi kolom absensi
  const waktuCell = document.getElementById(`${waktu}-${siswa.id}`);
  if (waktuCell.textContent !== '-') {
    statusElement.textContent = `Sudah absen ${waktu}`;
    statusElement.style.color = 'orange';
  } else {
    waktuCell.textContent = now.toLocaleTimeString();
    statusElement.textContent = `Absensi ${waktu} berhasil!`;
    statusElement.style.color = 'green';
  }
}