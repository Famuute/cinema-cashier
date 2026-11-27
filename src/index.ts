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
  namaPelanggan: string; // nama pembeli
  judulFilm: string;     // film yang ditonton
  jenisStudio: string;   // Reguler / Sweetbox / VIP
  jumlahTiket: number;   // banyak tiket yang dibeli
  totalHarga: number;    // dihitung otomatis lewat hitungTotal()
  sudahBayar: boolean;   // true kalau sudah lunas
}

// tempat menyimpan semua tiket
const daftarTiket: Tiket[] = [];

// ------ FUNGSI ------

// Fungsi 1: tampilan menu utama
function tampilkanMenu(): void{
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

  // harus bulat dan ada di rentang menu 0 sampai 5
  return Number.isInteger(angka) && angka >= 0 && angka <= 5;
}


function main(): void {
  let jalan: boolean = true;    // selama true, menu terus muncul
  let jumlahSalah: number = 0;  // hitung berapa kali user salah input

  // loop menu: berhenti kalau user pilih 0
  while (jalan) {
    tampilkanMenu();
    const input: string = readlineSync.question("Pilih menu (0-5): ");

    // kalau input salah, kasih pesan lalu ulang menu
    if (!validasiPilihanMenu(input)) {
      jumlahSalah += 1; // tambah hitungan salah
      console.log(`Input tidak valid! Masukkan angka 0 sampai 5. (salah ke-${jumlahSalah})\n`);
      continue;
    }

    const pilihan: number = Number(input.trim());

    // jalankan sesuai menu yang dipilih
    switch (pilihan) {
      case 1:
        console.log("Fitur tambah tiket belum tersedia.\n");
        break;
      case 2:
        console.log(`Fitur lihat tiket belum tersedia. Data saat ini: ${daftarTiket.length} tiket.\n`);
        break;
      case 3:
        console.log("Fitur ubah tiket belum tersedia.\n");
        break;
      case 4:
        console.log("Fitur hapus tiket belum tersedia.\n");
        break;
      case 5:
        console.log("Fitur cari tiket belum tersedia.\n");
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