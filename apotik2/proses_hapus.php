<?php
include 'koneksi.php';

$id = $_GET["id"]; // ambil id dari URL

// jalankan query DELETE sesuai tabel obat
$query = "DELETE FROM obat WHERE id_obat='$id'";
$hasil_query = mysqli_query($koneksi, $query);

// periksa query
if(!$hasil_query) {
  die ("Gagal menghapus data: ".mysqli_errno($koneksi)." - ".mysqli_error($koneksi));
} else {
  echo "<script>alert('Data berhasil dihapus.');window.location='index.php';</script>";
}
?>
