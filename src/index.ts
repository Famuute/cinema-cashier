// ===================================================
// CinemaCashier - Progress 2: kerangka menu utama
// Aplikasi kasir tiket bioskop berbasis console (TypeScript)
// ===================================================

// library buat baca input dari keyboard (sinkron, jadi gampang dipakai di loop)
import * as readlineSync from "readline-sync";

// ---------- STRUKTUR DATA ----------

// bentuk data satu tiket (ini entitas utama program kita)
interface Tiket {
  id: string;            // kode unik tiket, contoh: TKT-001
  judulFilm: string;     // film yang ditonton
  jenisStudio: string;   // Reguler / Sweetbox / VIP
  jumlahTiket: number;   // banyak tiket yang dibeli
  totalHarga: number;    // dihitung otomatis lewat hitungTotal()
  sudahBayar: boolean;   // true kalau sudah lunas
}

// ---------- FUNGSI ----------

// Fungsi 1: hitung total harga tiket, hasilnya berupa number
function hitungTotal(jenisStudio: string, jumlah: number): number {
  // kalau jumlah nggak masuk akal, langsung balikin 0
  if (jumlah <= 0 || Number.isNaN(jumlah)) {
    return 0;
  }

  // harga per tiket ditentukan dari jenis studio
  let hargaSatuan: number;
  switch (jenisStudio) {
    case "Reguler":
      hargaSatuan = 35000;
      break;
    case "Sweetbox":
      hargaSatuan = 50000;
      break;
    case "VIP":
      hargaSatuan = 100000;
      break;
    default:
      // studio tidak dikenal
      return 0;
  }

  // total = harga satuan x jumlah tiket
  let total: number = hargaSatuan * jumlah;

  // beli 5 tiket atau lebih dapat diskon 10%
  if (jumlah >= 5) {
    total -= total * 0.1;
  }

  return total;
}

// Fungsi 2: ubah angka jadi tulisan rupiah, contoh 35000 jadi "Rp35.000"
function formatRupiah(angka: number): string {
  return "Rp" + angka.toLocaleString("id-ID");
}

// Fungsi 3: cetak tampilan menu utama (nggak ngembaliin apa-apa, jadi void)
function tampilkanMenu(): void {
  console.log("=================================");
  console.log("        CINEMA CASHIER");
  console.log("=================================");
  console.log("1. Tambah tiket");
  console.log("2. Lihat semua tiket");
  console.log("3. Ubah tiket");
  console.log("4. Hapus tiket");
  console.log("5. Cari tiket");
  console.log("0. Keluar");
  console.log("---------------------------------");
}

// Fungsi 4: cek apakah input menu valid (angka bulat 0 sampai 5), hasilnya true/false
function validasiPilihanMenu(input: string): boolean {
  // buang spasi di depan dan belakang
  const teks: string = input.trim();

  // input kosong dianggap salah
  if (teks === "") {
    return false;
  }

  // kalau bukan angka (misal huruf), dianggap salah
  const angka: number = Number(teks);
  if (Number.isNaN(angka)) {
    return false;
  }

  // harus bulat dan ada di rentang menu
  return Number.isInteger(angka) && angka >= 0 && angka <= 5;
}

// Fungsi 5: tampilkan semua tiket pakai perulangan
function tampilkanDaftarTiket(daftar: Tiket[]): void {
  // kalau datanya kosong, kasih pesan saja
  if (daftar.length === 0) {
    console.log("Belum ada data tiket.\n");
    return;
  }

  let totalPendapatan: number = 0; // dijumlahkan sambil looping

  for (const tiket of daftar) {
    const status: string = tiket.sudahBayar ? "Lunas" : "Belum bayar";
    let catatan: string = "";

    // Cek apakah tiket belum dibayar
    if (!tiket.sudahBayar) {
      // Cek apakah tagihannya besar
      if (tiket.totalHarga > 100000) {
        catatan = " (Tagihan besar!)";
      }
    }

    console.log(
      `${tiket.id} | ${tiket.judulFilm} | ${tiket.jenisStudio} | ` +
        `${tiket.jumlahTiket} tiket | ${formatRupiah(tiket.totalHarga)} | ${status}${catatan}`
    );
    totalPendapatan += tiket.totalHarga; // tambahkan ke total
  }

  console.log(`\nTotal pendapatan: ${formatRupiah(totalPendapatan)}\n`);
}

// ---------- DATA AWAL (SEED) ----------

// 5 data contoh supaya menu "lihat" ada isinya
const daftarTiket: Tiket[] = [
  { id: "TKT-001", judulFilm: "Laskar Pelangi", jenisStudio: "Reguler", jumlahTiket: 2, totalHarga: hitungTotal("Reguler", 2), sudahBayar: true },
  { id: "TKT-002", judulFilm: "Pengabdi Setan", jenisStudio: "VIP", jumlahTiket: 1, totalHarga: hitungTotal("VIP", 1), sudahBayar: true },
  { id: "TKT-003", judulFilm: "Dilan 1990", jenisStudio: "Sweetbox", jumlahTiket: 2, totalHarga: hitungTotal("Sweetbox", 2), sudahBayar: false },
  { id: "TKT-004", judulFilm: "Kuntilanak", jenisStudio: "Reguler", jumlahTiket: 5, totalHarga: hitungTotal("Reguler", 5), sudahBayar: true },
  { id: "TKT-005", judulFilm: "Warkop DKI", jenisStudio: "VIP", jumlahTiket: 3, totalHarga: hitungTotal("VIP", 3), sudahBayar: false },
];

// ---------- PROGRAM UTAMA ----------

function main(): void {
  let jalan: boolean = true; // selama true, menu terus muncul

  // loop menu: berhenti kalau user pilih 0
  while (jalan) {
    tampilkanMenu();
    const input: string = readlineSync.question("Pilih menu (0-5): ");

    // kalau input salah, kasih pesan lalu ulang menu (nggak crash)
    if (!validasiPilihanMenu(input)) {
      console.log("Input tidak valid! Masukkan angka 0 sampai 5.\n");
      continue;
    }

    const pilihan: number = Number(input.trim());

    // jalankan sesuai menu yang dipilih
    switch (pilihan) {
      default:
      // menu belum diimplementasikan, kasih pesan saja
        console.log("Menu belum tersedia.\n");
        break;
      case 1:
        console.log("Fitur tambah tiket belum tersedia (Progress 3).\n");
        break;
      case 2:
        tampilkanDaftarTiket(daftarTiket);
        break;
      case 3:
        console.log("Fitur ubah tiket belum tersedia (Progress 5).\n");
        break;
      case 4:
        console.log("Fitur hapus tiket belum tersedia (Progress 5).\n");
        break;
      case 5:
        console.log("Fitur cari tiket belum tersedia (Progress 6).\n");
        break;
      case 0:
        console.log("Terima kasih, sampai jumpa!");
        jalan = false; // loop berhenti
        break;
    }
  }
}

// jalankan program
main();