import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";

function PublicPortfolio() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/profile/public/${userId}`)
      .then((res) => setProfile(res.data))
      .catch(() => setError("Portfolio not found"));
  }, [userId]);

  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!profile) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="portfolio-container">
      <div className="portfolio-hero">
        {profile.profileImage && (
          <img src={profile.profileImage} alt="profile" className="portfolio-image" />
        )}
        <h1>{profile.name || "Your Name"}</h1>
        <p className="bio">{profile.bio}</p>
        <div className="links">
          {profile.githubLink && (
            <a href={profile.githubLink} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {profile.linkedinLink && (
            <a href={profile.linkedinLink} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {profile.education?.length > 0 && (
        <div className="portfolio-section">
          <h2>Education</h2>
          {profile.education.map((item, i) => (
            <div className="card" key={i}>
              <strong>{item.degree}</strong>
              <p>{item.institution}</p>
              <p>{item.year}</p>
            </div>
          ))}
        </div>
      )}

      {profile.skills?.length > 0 && (
        <div className="portfolio-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {profile.skills.map((item, i) => (
              <span className="skill-badge" key={i}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.experience?.length > 0 && (
        <div className="portfolio-section">
          <h2>Experience</h2>
          {profile.experience.map((item, i) => (
            <div className="card" key={i}>
              <strong>
                {item.role} - {item.company}
              </strong>
              <p>{item.duration}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {profile.projects?.length > 0 && (
        <div className="portfolio-section">
          <h2>Projects</h2>
          {profile.projects.map((item, i) => (
            <div className="card" key={i}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer">
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {profile.certifications?.length > 0 && (
        <div className="portfolio-section">
          <h2>Certifications</h2>
          {profile.certifications.map((item, i) => (
            <div className="card" key={i}>
              <strong>{item.title}</strong>
              <p>{item.issuedBy}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer">
                  Verify Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {profile.achievements?.length > 0 && (
        <div className="portfolio-section">
          <h2>Achievements</h2>
          {profile.achievements.map((item, i) => (
            <div className="card" key={i}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicPortfolio;
