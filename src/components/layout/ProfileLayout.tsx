import type { ReactNode } from "react";
import { ProfileNav } from "./ProfileNav";
import { ProfileSidebar } from "./ProfileSidebar";

export function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProfileNav />
      <main className="profile-layout">
        <ProfileSidebar />
        <div className="profile-content">{children}</div>
      </main>
    </>
  );
}
