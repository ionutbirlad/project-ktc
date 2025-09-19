import Link from "next/link";
import { RegisterForm } from "@/components/register/RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="text-2xl font-semibold mb-6">Registrati</h1>

      <RegisterForm />

      <p className="mt-4 text-sm">
        Hai gia un account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
