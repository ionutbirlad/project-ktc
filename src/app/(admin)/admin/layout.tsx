import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged → go to login (with redirect parameter to came back)
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent("/admin")}`);
  }

  return (
    <div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
