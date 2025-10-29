import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadAvatar({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Chọn ảnh trước!");
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Upload thành công!");
      if (res.data.avatar && onUploadSuccess) {
        onUploadSuccess(res.data.avatar);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Upload thất bại");
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ textAlign: "center", marginTop: "10px" }}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        type="submit"
        style={{ marginLeft: "10px", padding: "6px 12px" }}
      >
        Upload
      </button>
    </form>
  );
}
