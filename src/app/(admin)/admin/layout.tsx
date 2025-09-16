import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
