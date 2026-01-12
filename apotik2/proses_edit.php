<?php
include 'koneksi.php';

$id_obat      = $_POST['id_obat'];
$nama_obat    = $_POST['nama_obat'];
$harga_obat   = $_POST['harga_obat'];
$tanggal_obat = $_POST['tanggal_obat'];
$expired      = $_POST['expired'];
$stok         = $_POST['stok'];
$gambar_obat  = $_FILES['gambar_obat']['name'];

if($gambar_obat != "") {
    $ekstensi_diperbolehkan = array('png','jpg');
    $x = explode('.', $gambar_obat);
    $ekstensi = strtolower(end($x));
    $file_tmp = $_FILES['gambar_obat']['tmp_name'];   
    $angka_acak = rand(1,999);
    $nama_gambar_baru = $angka_acak.'-'.$gambar_obat;

    if(in_array($ekstensi, $ekstensi_diperbolehkan) === true) {
        move_uploaded_file($file_tmp, 'gambar/'.$nama_gambar_baru);
        $query = "UPDATE obat SET 
                    nama_obat='$nama_obat',
                    harga_obat='$harga_obat',
                    tanggal_obat='$tanggal_obat',
                    expired='$expired',
                    stok='$stok',
                    gambar_obat='$nama_gambar_baru'
                  WHERE id_obat='$id_obat'";
    } else {
        echo "<script>alert('Ekstensi gambar hanya jpg atau png.');window.location='edit_obat.php?id=$id_obat';</script>";
        exit;
    }
} else {
    $query = "UPDATE obat SET 
                nama_obat='$nama_obat',
                harga_obat='$harga_obat',
                tanggal_obat='$tanggal_obat',
                expired='$expired',
                stok='$stok'
              WHERE id_obat='$id_obat'";
}

$result = mysqli_query($koneksi, $query);

if(!$result){
    die ("Query gagal dijalankan: ".mysqli_errno($koneksi)." - ".mysqli_error($koneksi));
} else {
    echo "<script>alert('Data berhasil diubah.');window.location='index.php';</script>";
}
