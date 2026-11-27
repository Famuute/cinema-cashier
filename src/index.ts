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
  movieTitle: string;     // film yang ditonton
  studioType: string;   // Reguler / Sweetbox / VIP
  quantity: number;   // banyak tiket yang dibeli
  totalPrice: number;    // dihitung otomatis lewat calculateTotal()
  isPaid: boolean;   // true kalau sudah lunas
}

// ---------- FUNGSI ----------

// Fungsi 1: hitung total harga tiket, hasilnya berupa number
function calculateTotal(studioType: string, tickets: number): number {
  // kalau jumlah nggak masuk akal, langsung balikin 0
  if (tickets <= 0 || Number.isNaN(tickets)) {
    return 0;
  }

  // harga per tiket ditentukan dari jenis studio
  let ticketPrice: number;
  switch (studioType) {
    case "Reguler":
      ticketPrice = 35000;
      break;
    case "Sweetbox":
      ticketPrice = 50000;
      break;
    case "VIP":
      ticketPrice = 100000;
      break;
    default:
      // studio tidak dikenal
      return 0;
  }

  // total = harga satuan x jumlah tiket
  let total: number = ticketPrice * tickets;

  // beli 5 tiket atau lebih dapat diskon 10%
  if (tickets >= 5) {
    total -= total * 0.1;
  }

  return total;
}

// Fungsi 2: ubah angka jadi tulisan rupiah, contoh 35000 jadi "Rp35.000"
function formatRupiah(angka: number): string {
  return "Rp" + angka.toLocaleString("id-ID");
}

// Fungsi 3: cetak tampilan menu utama (nggak ngembaliin apa-apa, jadi void)
function showMenu(): void {
  console.log("=================================");
  console.log("        CINEMA CASHIER");
  console.log("=================================");
  console.log("1. Add ticket");
  console.log("2. All tickets");
  console.log("3. Edit ticket");
  console.log("4. Delete ticket");
  console.log("5. Search ticket");
  console.log("0. Exit");
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
    console.log("No ticket data yet.\n");
    return;
  }

  let totalPendapatan: number = 0; // dijumlahkan sambil looping

  for (const tiket of daftar) {
    const status: string = tiket.isPaid ? "Paid" : "Not Paid";
    let catatan: string = "";

    // Cek apakah tiket belum dibayar
    if (!tiket.isPaid) {
      // Cek apakah tagihannya besar
      if (tiket.totalPrice > 100000) {
        catatan = " (Big bill!)";
      }
    }

    console.log(
      `${tiket.id} | ${tiket.movieTitle} | ${tiket.studioType} | ` +
        `${tiket.quantity} tiket | ${formatRupiah(tiket.totalPrice)} | ${status}${catatan}`
    );
    totalPendapatan += tiket.totalPrice; // tambahkan ke total
  }

  console.log(`\nTotal Income: ${formatRupiah(totalPendapatan)}\n`);
}

// ---------- DATA AWAL (SEED) ----------

// 5 data contoh supaya menu "lihat" ada isinya
const daftarTiket: Tiket[] = [
  { id: "TKT-001", movieTitle: "Laskar Pelangi", studioType: "Reguler", quantity: 2, totalPrice: calculateTotal("Reguler", 2), isPaid: true },
  { id: "TKT-002", movieTitle: "Pengabdi Setan", studioType: "VIP", quantity: 1, totalPrice: calculateTotal("VIP", 1), isPaid: true },
  { id: "TKT-003", movieTitle: "Dilan 1990", studioType: "Sweetbox", quantity: 2, totalPrice: calculateTotal("Sweetbox", 2), isPaid: false },
  { id: "TKT-004", movieTitle: "Kuntilanak", studioType: "Reguler", quantity: 5, totalPrice: calculateTotal("Reguler", 5), isPaid: true },
  { id: "TKT-005", movieTitle: "Warkop DKI", studioType: "VIP", quantity: 3, totalPrice: calculateTotal("VIP", 3), isPaid: false },
];

// ---------- PROGRAM UTAMA ----------

function main(): void {
  let jalan: boolean = true; // selama true, menu terus muncul

  // loop menu: berhenti kalau user pilih 0
  while (jalan) {
    showMenu();
    const input: string = readlineSync.question("Choose menu (0-5): ");

    // kalau input salah, kasih pesan lalu ulang menu (nggak crash)
    if (!validasiPilihanMenu(input)) {
      console.log("Invalid input! Enter a number between 0 and 5.\n");
      continue;
    }

    const pilihan: number = Number(input.trim());

    // jalankan sesuai menu yang dipilih
    switch (pilihan) {
      default:
      // menu belum diimplementasikan, kasih pesan saja
        console.log("The menu is not yet available.\n");
        break;
      case 1:
        console.log("The add ticket feature is not yet available (Progress 3).\n");
        break;
      case 2:
        tampilkanDaftarTiket(daftarTiket);
        break;
      case 3:
        console.log("The ticket modification feature is not yet available (Progress 5).\n");
        break;
      case 4:
        console.log("The delete ticket feature is not yet available (Progress 5).\n");
        break;
      case 5:
        console.log("The ticket search feature is not yet available (Progress 6).\n");
        break;
      case 0:
        console.log("Thank you, see you later!");
        jalan = false; // loop berhenti
        break;
    }
  }
}

// jalankan program
main();