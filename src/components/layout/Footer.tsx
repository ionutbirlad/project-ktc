export default function Footer() {
  return (
    <footer className="w-full px-4 py-6 bg-background border-t text-center text-muted-foreground">
      © {new Date().getFullYear()} Kill the Competition — All rights reserved.
    </footer>
  );
}
