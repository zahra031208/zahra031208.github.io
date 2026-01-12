<?php
  include('koneksi.php'); // koneksi ke database
?>
<!DOCTYPE html>
<html>
  <head>
    <title>CRUD Obat dengan Gambar</title>
    <style type="text/css">
      * {
        font-family: "Trebuchet MS";
      }
      h1 {
        text-transform: uppercase;
        color: salmon;
      }
      table {
        border: solid 1px #DDEEEE;
        border-collapse: collapse;
        border-spacing: 0;
        width: 80%;
        margin: 10px auto 10px auto;
      }
      table thead th {
        background-color: #DDEFEF;
        border: solid 1px #DDEEEE;
        color: #336B6B;
        padding: 10px;
        text-align: left;
      }
      table tbody td {
        border: solid 1px #DDEEEE;
        color: #333;
        padding: 10px;
      }
      a {
        background-color: salmon;
        color: #fff;
        padding: 10px;
        text-decoration: none;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <center><h1>Data Obat</h1><center>
    <center><a href="tambah_obat.php">+ &nbsp; Tambah Obat</a><center>
    <br/>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Obat</th>
          <th>Harga</th>
          <th>Tanggal Masuk</th>
          <th>Expired</th>
          <th>Stok</th>
          <th>Gambar</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php
        // ambil data dari tabel obat
        $query = "SELECT * FROM obat ORDER BY id_obat ASC";
        $result = mysqli_query($koneksi, $query);

        if(!$result){
          die ("Query Error: ".mysqli_errno($koneksi).
             " - ".mysqli_error($koneksi));
        }

        $no = 1; 
        while($row = mysqli_fetch_assoc($result))
        {
        ?>
        <tr>
          <td><?php echo $no; ?></td>
          <td><?php echo $row['nama_obat']; ?></td>
          <td>Rp <?php echo number_format($row['harga_obat'],0,',','.'); ?></td>
          <td><?php echo $row['tanggal_obat']; ?></td>
          <td><?php echo $row['expired']; ?></td>
          <td><?php echo $row['stok']; ?></td>
          <td style="text-align: center;">
            <img src="gambar/<?php echo $row['gambar_obat']; ?>" style="width: 120px;">
          </td>
          <td>
            <a href="edit_obat.php?id=<?php echo $row['id_obat']; ?>">Edit</a> |
            <a href="proses_hapus.php?id=<?php echo $row['id_obat']; ?>" onclick="return confirm('Anda yakin akan menghapus data ini?')">Hapus</a>
          </td>
        </tr>
        <?php
          $no++;
        }
        ?>
      </tbody>
    </table>
  </body>
</html>
