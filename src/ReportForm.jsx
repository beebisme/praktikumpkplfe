// Create a new file ReportForm.jsx

import React, { useState } from "react";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    alamat: "",
    nomor: "",
    jenisPohon: "",
    jumlah: "",
    diameter: "",
    lokasi: "",
    foto: "",
    alasan: [],
  });

  const [errors, setErrors] = useState({});

  const [onLoading, setOnLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          alasan: [...prevData.alasan, value],
        };
      } else {
        return {
          ...prevData,
          alasan: prevData.alasan.filter((alasan) => alasan !== value),
        };
      }
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.nama) formErrors.nama = "Nama Tidak Boleh Kosong";
    if (!formData.alamat) formErrors.alamat = "Alamat Tidak Boleh Kosong";
    if (!formData.nomor) formErrors.nomor = "Nomor Telepon Tidak Boleh Kosong";
    if (!formData.jenisPohon)
      formErrors.jenisPohon = "Jenis Pohon Tidak Boleh Kosong";
    if (!formData.jumlah) formErrors.jumlah = "Jumlah Pohon Tidak Boleh Kosong";
    if (!formData.diameter)
      formErrors.diameter = "Diameter Pohon Tidak Boleh Kosong";
    if (!formData.lokasi) formErrors.lokasi = "Lokasi Tidak Boleh Kosong";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setOnLoading(true);
      fetch("https://praktikumpkpl.vercel.app/api/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setOnLoading(false);
          if (data.status === "success") {
            alert("Berhasil Membuat Laporan");
            // Reset form
            setFormData({
              nama: "",
              email: "",
              alamat: "",
              nomor: "",
              jenisPohon: "",
              jumlah: "",
              diameter: "",
              lokasi: "",
              foto: "",
              alasan: [],
            });
            setErrors({});
          } else {
            alert("Gagal Membuat Laporan: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          alert("Error sending data: " + error.message);
        });
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Buat Laporan
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nama" className="block font-bold mb-1">
              Nama:
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama Anda"
              className="w-full p-2 border rounded"
            />
            {errors.nama && <span className="text-red-500">{errors.nama}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="alamat" className="block font-bold mb-1">
              Alamat:
            </label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat Anda"
              className="w-full p-2 border rounded"
            />
            {errors.alamat && (
              <span className="text-red-500">{errors.alamat}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="nomor" className="block font-bold mb-1">
              Nomor Telepon:
            </label>
            <input
              type="text"
              id="nomor"
              name="nomor"
              value={formData.nomor}
              onChange={handleChange}
              placeholder="Masukkan nomor telepon Anda"
              className="w-full p-2 border rounded"
            />
            {errors.nomor && (
              <span className="text-red-500">{errors.nomor}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="jenisPohon" className="block font-bold mb-1">
              Jenis Pohon:
            </label>
            <input
              type="text"
              id="jenisPohon"
              name="jenisPohon"
              value={formData.jenisPohon}
              onChange={handleChange}
              placeholder="Masukkan jenis pohon yang dilaporkan"
              className="w-full p-2 border rounded"
            />
            {errors.jenisPohon && (
              <span className="text-red-500">{errors.jenisPohon}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="jumlah" className="block font-bold mb-1">
              Jumlah Pohon:
            </label>
            <input
              type="text"
              id="jumlah"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              placeholder="Masukkan jumlah pohon yang dilaporkan"
              className="w-full p-2 border rounded"
            />
            {errors.jumlah && (
              <span className="text-red-500">{errors.jumlah}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="diameter" className="block font-bold mb-1">
              Diameter Pohon (cm):
            </label>
            <input
              type="text"
              id="diameter"
              name="diameter"
              value={formData.diameter}
              onChange={handleChange}
              placeholder="Masukkan diameter pohon yang dilaporkan"
              className="w-full p-2 border rounded"
            />
            {errors.diameter && (
              <span className="text-red-500">{errors.diameter}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lokasi" className="block font-bold mb-1">
              Lokasi:
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              placeholder="Masukkan lokasi pohon yang dilaporkan"
              className="w-full p-2 border rounded"
            />
            {errors.lokasi && (
              <span className="text-red-500">{errors.lokasi}</span>
            )}
          </div>

          <fieldset className="mb-6 p-4 border rounded">
            <legend className="font-bold mb-2">Alasan Pemotongan</legend>
            <div className="mb-2 flex items-center">
              <input
                type="checkbox"
                id="alasan1"
                value="Pada musim hujan, angin membahayakan bagi kendaraan dan pengguna jalan lainnya"
                onChange={handleCheckboxChange}
                checked={formData.alasan.includes(
                  "Pada musim hujan, angin membahayakan bagi kendaraan dan pengguna jalan lainnya"
                )}
                className="mr-2"
              />
              <label htmlFor="alasan1" className="ml-2">
                Pada musim hujan, angin membahayakan bagi kendaraan dan pengguna
                jalan lainnya
              </label>
            </div>
            <div className="mb-2 flex items-center">
              <input
                type="checkbox"
                id="alasan2"
                value="Menghalangi / menutupi pintu masuk rumah, kantor, dan ruko"
                onChange={handleCheckboxChange}
                checked={formData.alasan.includes(
                  "Menghalangi / menutupi pintu masuk rumah, kantor, dan ruko"
                )}
                className="mr-2"
              />
              <label htmlFor="alasan2" className="ml-2">
                Menghalangi / menutupi pintu masuk rumah, kantor, dan ruko
              </label>
            </div>
            <div className="mb-2 flex items-center">
              <input
                type="checkbox"
                id="alasan3"
                value="Mengganggu arus lalu lintas"
                onChange={handleCheckboxChange}
                checked={formData.alasan.includes(
                  "Mengganggu arus lalu lintas"
                )}
                className="mr-2"
              />
              <label htmlFor="alasan3" className="ml-2">
                Mengganggu arus lalu lintas
              </label>
            </div>
            <div className="mb-2 flex items-center">
              <input
                type="checkbox"
                id="alasan4"
                value="Pohon menjulang ke rumah"
                onChange={handleCheckboxChange}
                checked={formData.alasan.includes("Pohon menjulang ke rumah")}
                className="mr-2"
              />
              <label htmlFor="alasan4" className="ml-2">
                Pohon menjulang ke rumah
              </label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="alasan5"
                name="alasan"
                value={formData.alasan5}
                onChange={handleChange}
                placeholder="Masukkan alasan lain"
                className="w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          <div className="mb-4">
            <label htmlFor="foto" className="block font-bold mb-1">
              Link Google Drive Foto Ktp dan 4 Foto Pohon:
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              placeholder="Pastikan akses foldernya tidak private"
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {onLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
