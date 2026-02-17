import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/platform-buttons.css";

export default function PlatformButtons() {
  const [buttons, setButtons] = useState([{ name: "", url: "" }]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    try {
      setLoading(true);
      const res = await api.get("/platform-buttons");
      setButtons(
        res.data?.buttons?.length
          ? res.data.buttons
          : [{ name: "", url: "" }]
      );
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...buttons];
    updated[index][field] = value;
    setButtons(updated);
  };

  const addButton = () => {
    if (buttons.length >= 5) return;
    setButtons([...buttons, { name: "", url: "" }]);
  };

  const removeButton = (index) => {
    const updated = buttons.filter((_, i) => i !== index);
    setButtons(updated.length ? updated : [{ name: "", url: "" }]);
  };

  const saveButtons = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      await api.post(
        "/platform-buttons",
        {
          buttons: buttons.filter(
            (btn) => btn.name.trim() && btn.url.trim()
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Buttons Saved Successfully");
    } catch (err) {
      alert("❌ Save Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="platform-page">
        <div className="platform-card">
          <h2>Manage Try Buttons</h2>
          <p className="sub-text">Add up to 5 external platform links.</p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {buttons.map((btn, index) => (
                <div key={index} className="input-row">
                  <div className="input-group">
                    <label>Platform Name</label>
                    <input
                      type="text"
                      placeholder="Instagram"
                      value={btn.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="input-group">
                    <label>Platform URL</label>
                    <input
                      type="text"
                      placeholder="https://instagram.com"
                      value={btn.url}
                      onChange={(e) =>
                        handleChange(index, "url", e.target.value)
                      }
                    />
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => removeButton(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {buttons.length < 5 && (
                <button className="add-btn" onClick={addButton}>
                  + Add Button
                </button>
              )}

              <button
                className="save-btn"
                onClick={saveButtons}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>

        {/* Live Preview */}
        <div className="preview-card">
          <h3>Live Preview</h3>
          <div className="preview-buttons">
            {buttons
              .filter((b) => b.name.trim())
              .map((btn, i) => (
                <span key={i} className="preview-btn">
                  {btn.name.toUpperCase()}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
