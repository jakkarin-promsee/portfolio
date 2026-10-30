import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../../data/profile";

export function ProfileSidebar() {
  return (
    <aside className="profile-sidebar">
      <div className="identity">
        <img className="avatar-large" src={profile.avatar} alt={profile.name} />
        <div className="identity-name">
          <h1>{profile.name}</h1>
          <p>{profile.handle}</p>
        </div>
      </div>
      <p className="profile-bio">{profile.bio}</p>
      <a className="profile-button" href={`mailto:${profile.email}`}>
        Contact me
      </a>
      <div className="profile-meta">
        <p>
          <Github size={16} aria-hidden="true" />
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            github.com/jakkarin-promsee
          </a>
        </p>
        <p>
          <Mail size={16} aria-hidden="true" />
          <a href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <p>
          <Linkedin size={16} aria-hidden="true" />
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            linkedin.com/in/jakkarin-promsee
          </a>
        </p>
        <p>
          <Facebook size={16} aria-hidden="true" />
          <a href={profile.facebookUrl} target="_blank" rel="noopener noreferrer">
            facebook.com/jakkarin.promsee
          </a>
        </p>
      </div>
      <div className="sidebar-rule" />
      <div className="sidebar-heading">Focus areas</div>
      <div className="focus-tags">
        {profile.focusAreas.map((area) => <span key={area}>{area}</span>)}
      </div>
    </aside>
  );
}
