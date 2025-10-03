"use client";

import LayoutContainer from "@/components/layout/LayoutContainer";
import AdminPanel from "@/components/admin/AdminPanel";

export default function DashboardPage() {
  return (
    <LayoutContainer>
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
        <p className="text-muted-foreground mb-10">
          Qui puoi gestire i contenuti dinamici del sito. Solo frontend per ora — niente database
        </p>

        <AdminPanel />
      </section>
    </LayoutContainer>
  );
}
