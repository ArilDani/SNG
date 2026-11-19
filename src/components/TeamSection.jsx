import React from 'react';
import { useApp } from '../context/AppContext';
import SplitText from './SplitText';

export default function TeamSection({ inAboutPage = false }) {
  const { team, settings } = useApp();

  // If section is deactivated by admin, do not render
  if (settings.isTeamSectionActive === false) {
    return null;
  }

  const sectionEyebrow = inAboutPage ? '04 / Behind the SNG' : '06 / Behind the SNG';

  return (
    <section className={`section team-section ${inAboutPage ? 'team-in-about' : ''}`} id="teamSection">
      <div className="container">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">{sectionEyebrow}</span>
            <h2>
              <SplitText text="Kolektif di balik" speed={0.02} baseDelay={0.05} />{' '}
              <SplitText text="titik perubahan." className="gradient-text" speed={0.02} baseDelay={0.4} />
            </h2>
          </div>
          <p>
            Sinergi talenta lintas disiplin dalam strategi bisnis, arsitektur konten kreatif, data analitik terukur, dan rekayasa ekosistem digital.
          </p>
        </div>

        <div className="team-grid">
          {team && team.map((member, idx) => {
            const skillsList = Array.isArray(member.skills)
              ? member.skills
              : typeof member.skills === 'string'
              ? member.skills.split(',').map(s => s.trim()).filter(Boolean)
              : [];

            return (
              <div
                key={member.id || idx}
                className="team-card reveal"
                style={{ animationDelay: `${(idx + 1) * 0.12}s` }}
              >
                <div className="team-photo-wrapper">
                  <img
                    src={member.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                    alt={member.name}
                    className="team-photo"
                    loading="lazy"
                  />
                  <div className="team-photo-overlay"></div>
                  <span className="team-num mono">0{idx + 1}</span>
                </div>

                <div className="team-body">
                  <div className="team-header">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                  </div>

                  {member.bio && (
                    <p className="team-bio">{member.bio}</p>
                  )}

                  {skillsList.length > 0 && (
                    <div className="team-skills">
                      {skillsList.map((skill, sIdx) => (
                        <span key={sIdx} className="team-skill-tag">
                          ✦ {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {member.portfolio && (
                    <div className="team-portfolio-box">
                      <small className="mono">PORTOFOLIO & CAPABILITY</small>
                      <span>{member.portfolio}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

