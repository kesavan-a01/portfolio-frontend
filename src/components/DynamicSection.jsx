// import { useState } from "react";
// import api from "../api.js";

// // this is a reusable component used for education, skills, experience,
// // projects, certifications and achievements sections
// // fields = array of { key, label, placeholder }
// function DynamicSection({ title, sectionName, fields, initialItems }) {
//   const [items, setItems] = useState(initialItems || []);
//   const [saved, setSaved] = useState(false);

//   const handleChange = (index, key, value) => {
//     const updated = [...items];
//     updated[index] = { ...updated[index], [key]: value };
//     setItems(updated);
//     setSaved(false);
//   };

//   const addItem = () => {
//     const emptyItem = {};
//     fields.forEach((f) => (emptyItem[f.key] = ""));
//     setItems([...items, emptyItem]);
//     setSaved(false);
//   };

//   const removeItem = (index) => {
//     const updated = items.filter((_, i) => i !== index);
//     setItems(updated);
//     setSaved(false);
//   };

//   const handleSave = async () => {
//     try {
//       await api.put(`/profile/section/${sectionName}`, { data: items });
//       setSaved(true);
//     } catch (err) {
//       alert("Error saving " + title);
//     }
//   };

//   return (
//     <div className="section-box">
//       <h3>{title}</h3>

//       {items.map((item, index) => (
//         <div className="section-item" key={index}>
//           {fields.map((field) => (
//             <input
//               key={field.key}
//               type="text"
//               placeholder={field.placeholder}
//               value={item[field.key] || ""}
//               onChange={(e) => handleChange(index, field.key, e.target.value)}
//             />
//           ))}
//           <button
//             type="button"
//             className="remove-btn"
//             onClick={() => removeItem(index)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <div className="section-buttons">
//         <button type="button" onClick={addItem}>
//           + Add {title}
//         </button>
//         <button type="button" onClick={handleSave} className="save-btn">
//           Save {title}
//         </button>
//       </div>

//       {saved && <p className="message">{title} saved!</p>}
//     </div>
//   );
// }

// export default DynamicSection;


import { useState } from "react";
import api from "../api.js";

// this is a reusable component used for education, skills, experience,
// projects, certifications and achievements sections
// fields = array of { key, label, placeholder }
function DynamicSection({ title, sectionName, fields, initialItems }) {
  const [items, setItems] = useState(initialItems || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setItems(updated);
    setSaved(false);
  };

  const addItem = () => {
    const emptyItem = {};
    fields.forEach((f) => (emptyItem[f.key] = ""));
    setItems([...items, emptyItem]);
    setSaved(false);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      await api.put(`/profile/section/${sectionName}`, { data: items });
      setSaved(true);
      // hide the success message automatically after a few seconds
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Could not save " + title + ". Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="section-box">
      <h3>{title}</h3>

      {items.map((item, index) => (
        <div className="section-item" key={index}>
          {fields.map((field) => (
            <input
              key={field.key}
              type="text"
              placeholder={field.placeholder}
              value={item[field.key] || ""}
              onChange={(e) => handleChange(index, field.key, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeItem(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="section-buttons">
        <button type="button" onClick={addItem} disabled={saving}>
          + Add {title}
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="save-btn"
          disabled={saving}
        >
          {saving ? "Saving..." : `Save ${title}`}
        </button>
      </div>

      {saving && <div className="spinner"></div>}
      {saved && <p className="message">{title} saved!</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default DynamicSection;
