import Link from "next/link";
import { LoginForm } from "@/components/login/LoginForm";

export const metadata = { title: "Login" };

type LoginPageProps = {
  redirect?: string;
};

export default function LoginPage({ searchParams }: { searchParams: LoginPageProps }) {
  const next = searchParams?.redirect || "/dashboard";

  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="text-2xl font-semibold mb-6">Accedi</h1>

      <LoginForm next={next} />

      <p className="mt-4 text-sm">
        Non hai un account?{" "}
        <Link href="/register" className="underline">
          Registrati
        </Link>
      </p>
    </div>
  );
}
