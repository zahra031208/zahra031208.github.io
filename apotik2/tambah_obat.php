<?php
include('koneksi.php'); // koneksi ke database
?>
<!DOCTYPE html>
<html>
<head>
    <title>Tambah Obat</title>
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
        }
        label {
            margin-top: 10px;
            float: left;
            text-align: left;
            width: 100%;
        }
        input {
            padding: 6px;
            width: 100%;
            box-sizing: border-box;
            background: #f8f8f8;
            border: 2px solid #ccc;
            outline-color: salmon;
        }
        div {
            width: 100%;
            height: auto;
        }
        .base {
            width: 400px;
            height: auto;
            padding: 20px;
            margin-left: auto;
            margin-right: auto;
            background: #ededed;
        }
    </style>
</head>
<body>
    <center>
        <h1>Tambah Data Obat</h1>
    </center>
    <form method="POST" action="proses_tambah.php" enctype="multipart/form-data">
        <section class="base">
            <div>
                <label>Nama Obat</label>
                <input type="text" name="nama_obat" required />
            </div>
            <div>
                <label>Harga Obat</label>
                <input type="number" name="harga_obat" required />
            </div>
            <div>
                <label>Tanggal Obat</label>
                <input type="date" name="tanggal_obat" required />
            </div>
            <div>
                <label>Expired</label>
                <input type="date" name="expired" required />
            </div>
            <div>
                <label>Stok</label>
                <input type="number" name="stok" required />
            </div>
            <div>
                <label>Gambar Obat</label>
                <input type="file" name="gambar_obat" />
            </div>
            <div>
                <button type="submit">Simpan Obat</button>
            </div>
        </section>
    </form>
</body>
</html>
