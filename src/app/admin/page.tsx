import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser, isAdminAuthed } from "@/lib/admin-auth";
import { getProductSettings } from "@/lib/settings";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin — ONEXALL.VIP",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }
  const settings = getProductSettings();
  return <AdminDashboard initialSettings={settings} currentUser={currentUser()} />;
}
