import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

/* ================= DATA ================= */

const PLATFORMS = ["instagram", "youtube", "tiktok"];

const SUB_CATEGORIES = {
  instagram: [
    "Trending Viral",
    "Reels Growth",
    "AI Reels",
    "Business Content",
    "Faceless Reels",
  ],
  youtube: [
    "YouTube Shorts",
    "Long Form",
    "Educational",
    "Automation",
    "Cash Cow",
  ],
  tiktok: [
    "TikTok Viral",
    "For You Page",
    "Trending Sounds",
    "Creators Growth",
  ],
};

const TAGS = [
  "viral",
  "trending",
  "ai",
  "growth",
  "marketing",
  "reels",
  "shorts",
  "automation",
  "faceless",
];

export default function Dashboard() {
  const [form, setForm] = useState({
    platform: "",
    subCategory: "",
    title: "",
    promptTitle: "",
    promptText: "",
    tags: [],
    views: "",
    video: null,
  });

  /* ================= HANDLERS ================= */

  const selectPlatform = platform => {
    setForm({
      ...form,
      platform,
      subCategory: "",
    });
  };

  const [customTag, setCustomTag] = useState("");


  const addCustomTag = () => {
    const tag = customTag.trim().toLowerCase();

    if (!tag) return;
    if (form.tags.includes(tag)) return;

    setForm(prev => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setCustomTag("");
  };


  const toggleTag = tag => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const change = e => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const upload = async () => {
    try {
      const token = localStorage.getItem("token");

      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "tags") {
          value.forEach(t => fd.append("tags[]", t));
        } else {
          fd.append(key, value);
        }
      });

      await api.post("/videos/dashboard-upload", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ SUCCESS FEEDBACK
      alert("✅ Uploaded Successfully");

      // ✅ RESET FORM STATE
      setForm({
        platform: "",
        subCategory: "",
        title: "",
        promptTitle: "",
        promptText: "",
        tags: [],
        views: "",
        video: null,
      });

      // ✅ FULL PAGE REFRESH (CLEAN RESET)
      window.location.reload();

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("❌ Upload Failed");
    }
  };


  /* ================= UI ================= */

  return (
    <Layout>
      <div className="dash-box">
        <h2>Upload AI Video Prompt</h2>

        {/* PLATFORM SELECT */}
        <div className="platforms">
          {PLATFORMS.map(p => (
            <button
              key={p}
              className={form.platform === p ? "active" : ""}
              onClick={() => selectPlatform(p)}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SUB CATEGORIES */}
        {form.platform && (
          <div className="subcats">
            {SUB_CATEGORIES[form.platform].map(sub => (
              <div
                key={sub}
                className={`subcat ${form.subCategory === sub ? "active" : ""
                  }`}
                onClick={() =>
                  setForm({ ...form, subCategory: sub })
                }
              >
                {sub}
              </div>
            ))}
          </div>
        )}

        {/* FORM */}
        {form.subCategory && (
          <>
            <input
              name="title"
              placeholder="Video Title"
              onChange={change}
            />

            <input
              name="promptTitle"
              placeholder="Prompt Title"
              onChange={change}
            />

            <textarea
              name="promptText"
              placeholder="Full AI Prompt"
              onChange={change}
            />

            {/* TAGS */}
            {/* TAGS */}
            <div className="tags">

              {/* DEFAULT TAGS */}
              {TAGS.map(tag => (
                <span
                  key={tag}
                  className={`tag ${form.tags.includes(tag) ? "active" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </span>
              ))}

              {/* SELECTED CUSTOM TAGS */}
              {form.tags
                .filter(tag => !TAGS.includes(tag))
                .map(tag => (
                  <span
                    key={tag}
                    className="tag active"
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            {/* ADD CUSTOM TAG */}
            <div className="custom-tag">
              <input
                type="text"
                placeholder="Add custom tag"
                value={customTag}
                onChange={e => setCustomTag(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addCustomTag()}
              />
              <button onClick={addCustomTag}>Add</button>
            </div>


            <input
              type="number"
              name="views"
              placeholder="Views"
              onChange={change}
            />

            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={change}
            />


            <button className="upload-btn" onClick={upload}>
              UPLOAD
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
