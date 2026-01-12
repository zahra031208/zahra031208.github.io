<?php
include 'koneksi.php';

$nama_obat    = $_POST['nama_obat'];
$harga_obat   = $_POST['harga_obat'];
$tanggal_obat = $_POST['tanggal_obat'];
$expired      = $_POST['expired'];
$stok         = $_POST['stok'];
$gambar_obat  = $_FILES['gambar_obat']['name'];

if($gambar_obat != "") {
    $ekstensi_diperbolehkan = array('png','jpg','jpeg');
    $x = explode('.', $gambar_obat);
    $ekstensi = strtolower(end($x));
    $file_tmp = $_FILES['gambar_obat']['tmp_name'];
    $angka_acak = rand(1,999);
    $nama_gambar_baru = $angka_acak.'-'.$gambar_obat;

    if(in_array($ekstensi, $ekstensi_diperbolehkan) === true) {
        move_uploaded_file($file_tmp, 'gambar/'.$nama_gambar_baru);

        $query = "INSERT INTO obat (nama_obat, harga_obat, tanggal_obat, expired, stok, gambar_obat) 
                  VALUES ('$nama_obat', '$harga_obat', '$tanggal_obat', '$expired', '$stok', '$nama_gambar_baru')";
        $result = mysqli_query($koneksi, $query);

        if(!$result){
            die("Query gagal: ".mysqli_errno($koneksi)." - ".mysqli_error($koneksi));
        } else {
            echo "<script>alert('Data berhasil ditambah.');window.location='index.php';</script>";
        }

    } else {
        echo "<script>alert('Ekstensi gambar hanya jpg/jpeg/png.');window.location='tambah_obat.php';</script>";
    }
} else {
    $query = "INSERT INTO obat (nama_obat, harga_obat, tanggal_obat, expired, stok, gambar_obat) 
              VALUES ('$nama_obat', '$harga_obat', '$tanggal_obat', '$expired', '$stok', NULL)";
    $result = mysqli_query($koneksi, $query);

    if(!$result){
        die("Query gagal: ".mysqli_errno($koneksi)." - ".mysqli_error($koneksi));
    } else {
        echo "<script>alert('Data berhasil ditambah tanpa gambar.');window.location='index.php';</script>";
    }
}
?>
