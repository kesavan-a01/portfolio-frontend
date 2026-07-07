
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import DynamicSection from "../components/DynamicSection.jsx";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [savingBasicInfo, setSavingBasicInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile/me");
      setProfile(res.data);
      setName(res.data.name || "");
      setBio(res.data.bio || "");
      setProfileImage(res.data.profileImage || "");
      setGithubLink(res.data.githubLink || "");
      setLinkedinLink(res.data.linkedinLink || "");
      setUserId(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // converting the image to base64 so it can be stored directly in MongoDB
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBasicInfoSave = async (e) => {
    e.preventDefault();

    if (savingBasicInfo) return;

    setSavingBasicInfo(true);
    setMessage("");

    try {
      await api.put("/profile/update", {
        name,
        bio,
        profileImage,
        githubLink,
        linkedinLink,
      });
      setMessage("Profile updated!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Error updating profile. Please try again.");
    } finally {
      setSavingBasicInfo(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  if (!profile) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Portfolio Dashboard</h1>
        <div>
          <a
            href={`/portfolio/${userId}`}
            target="_blank"
            rel="noreferrer"
            className="view-link"
          >
            View Public Portfolio
          </a>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* basic info section */}
      <form className="section-box" onSubmit={handleBasicInfoSave}>
        <h3>Basic Info</h3>

        <div className="image-upload">
          {profileImage && (
            <img src={profileImage} alt="profile" className="profile-preview" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Short bio / about you"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="3"
        ></textarea>

        <input
          type="text"
          placeholder="GitHub link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="LinkedIn link"
          value={linkedinLink}
          onChange={(e) => setLinkedinLink(e.target.value)}
        />

        <button type="submit" className="save-btn" disabled={savingBasicInfo}>
          {savingBasicInfo ? "Saving..." : "Save Basic Info"}
        </button>

        {savingBasicInfo && <div className="spinner"></div>}
        {message && (
          <p className={message.includes("Error") ? "error-message" : "message"}>
            {message}
          </p>
        )}
      </form>

      {/* dynamic sections */}
      <DynamicSection
        title="Education"
        sectionName="education"
        initialItems={profile.education}
        fields={[
          { key: "degree", label: "Degree", placeholder: "Degree (e.g. B.Tech CSE)" },
          { key: "institution", label: "Institution", placeholder: "College/School name" },
          { key: "year", label: "Year", placeholder: "Year (e.g. 2023-2027)" },
        ]}
      />

      <DynamicSection
        title="Skills"
        sectionName="skills"
        initialItems={profile.skills}
        fields={[{ key: "name", label: "Skill", placeholder: "Skill (e.g. React JS)" }]}
      />

      <DynamicSection
        title="Experience"
        sectionName="experience"
        initialItems={profile.experience}
        fields={[
          { key: "role", label: "Role", placeholder: "Role (e.g. Web Dev Intern)" },
          { key: "company", label: "Company", placeholder: "Company name" },
          { key: "duration", label: "Duration", placeholder: "Duration (e.g. Jun 2026 - Jul 2026)" },
          { key: "description", label: "Description", placeholder: "What you did" },
        ]}
      />

      <DynamicSection
        title="Projects"
        sectionName="projects"
        initialItems={profile.projects}
        fields={[
          { key: "title", label: "Title", placeholder: "Project title" },
          { key: "description", label: "Description", placeholder: "Short description" },
          { key: "link", label: "Link", placeholder: "Live/demo link" },
        ]}
      />

      <DynamicSection
        title="Certifications"
        sectionName="certifications"
        initialItems={profile.certifications}
        fields={[
          { key: "title", label: "Title", placeholder: "Certification title" },
          { key: "issuedBy", label: "Issued By", placeholder: "Issued by (e.g. Coursera)" },
          { key: "link", label: "Verify Link", placeholder: "Certificate verify link" },
        ]}
      />

      <DynamicSection
        title="Achievements"
        sectionName="achievements"
        initialItems={profile.achievements}
        fields={[
          { key: "title", label: "Title", placeholder: "Achievement title" },
          { key: "description", label: "Description", placeholder: "Short description" },
        ]}
      />
    </div>
  );
}

export default Dashboard;
