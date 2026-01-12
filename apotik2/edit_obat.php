<?php
include 'koneksi.php';

if (isset($_GET['id'])) {
    $id = ($_GET["id"]);
    $query = "SELECT * FROM obat WHERE id_obat='$id'";
    $result = mysqli_query($koneksi, $query);
    if(!$result){
        die ("Query Error: ".mysqli_errno($koneksi)." - ".mysqli_error($koneksi));
    }
    $data = mysqli_fetch_assoc($result);
    if (!$data) {
        echo "<script>alert('Data tidak ditemukan');window.location='index.php';</script>";
    }
} else {
    echo "<script>alert('Masukkan id');window.location='index.php';</script>";
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Edit Data Obat</title>
  <style type="text/css">
    * {
      font-family: "Trebuchet MS";
    }
    h1 {
      text-transform: uppercase;
      color: salmon;
    }
    button {
      background-color: salmon;
      color: #fff;
      padding: 10px;
      text-decoration: none;
      font-size: 12px;
      border: 0px;
      margin-top: 20px;
      cursor: pointer;
      border-radius: 5px;
    }
    label {
      margin-top: 10px;
      float: left;
      text-align: left;
      width: 100%;
      font-weight: bold;
    }
    input {
      padding: 6px;
      width: 100%;
      box-sizing: border-box;
      background: #f8f8f8;
      border: 2px solid #ccc;
      outline-color: salmon;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    img {
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 3px;
    }
    .base {
      width: 400px;
      height: auto;
      padding: 20px;
      margin-left: auto;
      margin-right: auto;
      background: #ededed;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    i {
      font-size: 11px;
      color: red;
    }
  </style>
</head>
<body>
  <center><h1>Edit Obat: <?php echo $data['nama_obat']; ?></h1></center>
  <form method="POST" action="proses_edit.php" enctype="multipart/form-data">
    <section class="base">
      <input type="hidden" name="id_obat" value="<?php echo $data['id_obat']; ?>">

      <label>Nama Obat</label>
      <input type="text" name="nama_obat" value="<?php echo $data['nama_obat']; ?>" required>

      <label>Harga Obat</label>
      <input type="text" name="harga_obat" value="<?php echo $data['harga_obat']; ?>" required>

      <label>Tanggal Masuk</label>
      <input type="date" name="tanggal_obat" value="<?php echo $data['tanggal_obat']; ?>" required>

      <label>Expired</label>
      <input type="date" name="expired" value="<?php echo $data['expired']; ?>" required>

      <label>Stok</label>
      <input type="number" name="stok" value="<?php echo $data['stok']; ?>" required>

      <label>Gambar Obat</label>
      <img src="gambar/<?php echo $data['gambar_obat']; ?>" width="120"><br>
      <input type="file" name="gambar_obat">
      <i>Abaikan jika tidak mengubah gambar</i>

      <button type="submit">Simpan Perubahan</button>
    </section>
  </form>
</body>
</html>
