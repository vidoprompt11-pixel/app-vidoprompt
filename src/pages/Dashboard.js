import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

/* ================= DATA ================= */

const PLATFORMS = ["instagram", "youtube", "tiktok"];

const SUB_CATEGORIES = {
  instagram: [
    "Trending Reels",
    "Entertainment Reels",
    "Educational Reels",
    "Promotional Reels",
    "AI Reels",
  ],
  youtube: [
    "Skill Builder",
    "Smart Systems",
    "Long Play",
    "Youtube Short",
    "AI Tips",
  ],
  tiktok: [
    "Vibes",
    "Trends",
    "Sound Picks",
    "Growth",
    "Explore",
  ],
};

const PLATFORM_TAGS = {
  instagram: [
    "trendingreels",
    "trendingreels",
    "reelsinstagram",
    "viralreels",
    "explorepage",
    "instareels",
    "reelitfeelit",
    "trendingsound",
    "trendingnow",
    "reelsindia",
    "reelsdaily",
    "explore#trendingreels",
    "reelsinstagram",
    "viralreels",
    "explorepage",
    "instareels",
    "reelitfeelit",
    "trendingsound",
    "trendingnow",
    "reelsindia",
    "reelsdaily",
    "explore",
    "entertainment",
    "funreels",
    "funnyvideos",
    "relatable",
    "entertainmentreels",
    "instafun",
    "reelsentertainment",
    "laugh",
    "viralcontent",
    "dailyreels",
    "reelslover",
    "funcontent",
    "educationalreels",
    "learnoninstagram",
    "knowledge",
    "education",
    "learning",
    "informative",
    "tipsandtricks",
    "educationalcontent",
    "instalearning",
    "reelseducation",
    "learnsomethingnew",
    "dailyknowledge",
    "valuecontent",
    "promotion",
    "promotionalreel",
    "businessreels",
    "brandpromotion",
    "marketingreels",
    "digitalmarketing",
    "smallbusiness",
    "businesscontent",
    "instabusiness",
    "sellonline",
    "productreels",
    "servicebusiness",
    "onlinemarketing",
    "aivideos",
    "aireels",
    "aicontent",
    "aitools",
    "artificialintelligence",
    "technology",
    "futuretech",
    "aiart",
    "aiedits",
    "digitalcontent",
    "techreels",
    "smartcontent",
    "automation",
  ],

  youtube: [
    "skill builder",
    "learn new skills",
    "skill development",
    "online learning",
    "self improvement",
    "learn skills online",
    "beginner skills",
    "professional skills",
    "career growth",
    "skill upgrade",
    "learning videos",
    "educational youtube",
    "how to learn",
    "knowledge videos",

    "smart systems",
    "automation setup",
    "workflow automation",
    "digital systems",
    "business automation",
    "online systems",
    "smart tools",
    "productivity systems",
    "system building",
    "automate work",
    "tech systems",
    "automation tools",

    "long form content",
    "full length video",
    "in depth video",
    "detailed explanation",
    "long youtube video",
    "complete guide",
    "step by step tutorial",
    "watch time content",
    "deep dive video",
    "youtube long play",

    "youtube shorts",
    "short videos",
    "yt shorts",
    "short form content",
    "viral shorts",
    "trending shorts",
    "quick videos",
    "vertical video",
    "short video clips",
    "youtube short video",

    "ai tips",
    "artificial intelligence tips",
    "ai tools",
    "chatgpt tips",
    "ai productivity",
    "ai automation",
    "ai for beginners",
    "ai technology",
    "ai hacks",
    "ai tricks",
    "future technology",

    "youtube",
    "youtube video",
    "content creator",
    "online video",
    "learn online",
    "digital content",
    "video tutorial",
  ],

  tiktok: [
    "vibes",
    "goodvibes",
    "vibey",
    "vibecheck",
    "vibez",
    "positivevibes",
    "feelgood",
    "aesthetic",
    "dailyvibes",
    "tiktokvibes",

    "trending",
    "trend",
    "trendingsound",
    "trendingnow",
    "tiktoktrend",
    "viraltrend",
    "hottrend",
    "latesttrend",
    "trendalert",
    "trendvideo",

    "sounds",
    "trendingaudio",
    "viralsound",
    "soundcheck",
    "audiotrend",
    "musictrend",
    "soundtok",
    "tiktoksound",
    "soundreels",

    "growth",
    "creatorsupport",
    "creatorcommunity",
    "contentcreator",
    "growyouraccount",
    "creatorlife",
    "socialmediagrowth",
    "tiktokgrowth",
    "newcreator",

    "explore",
    "explorepage",
    "discover",
    "foryou",
    "foryoupage",
    "fyp",
    "foryoutiktok",
    "tiktokexplore",
    "discoverpage",

    "tiktok",
    "viral",
    "video",
    "shortvideo",
    "dailycontent",
  ],
};


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
            <div className="tags">
              {PLATFORM_TAGS[form.platform]?.map(tag => (
                <span
                  key={tag}
                  className={`tag ${form.tags.includes(tag) ? "active" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag.replace(/\s+/g, "")}
                </span>
              ))}

              {/* CUSTOM TAGS */}
              {form.tags
                .filter(tag => !PLATFORM_TAGS[form.platform]?.includes(tag))
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
