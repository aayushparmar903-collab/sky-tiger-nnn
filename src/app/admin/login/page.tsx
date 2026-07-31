import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — ONEXALL.VIP",
  robots: { index: false },
};

export default function AdminLoginPage() {
  return <LoginForm />;
}
