import { Link2, Mail, MapPin } from "lucide-react";
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
          <MapPin size={16} /> {profile.location}
        </p>
        <p>
          <Mail size={16} />
          <a href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <p>
          <Link2 size={16} />
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            {profile.githubUrl.replace(/^https?:\/\//, "")}
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
