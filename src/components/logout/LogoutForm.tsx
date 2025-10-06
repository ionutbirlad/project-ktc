import { useFormStatus } from "react-dom";
import { signOut } from "@/app/(auth)/actions";

import { Button } from "@/components/ui/button";

export function LogoutForm() {
  const { pending } = useFormStatus();

  return (
    <form action={signOut}>
      <Button type="submit" disabled={pending} size="sm">
        {pending ? "Uscendo..." : "Logout"}
      </Button>
    </form>
  );
}
