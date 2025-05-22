import LayoutContainer from "@/components/layout/LayoutContainer";
import Hero from "@/components/sections/Hero";
import GitHubStats from "@/components/sections/GitHubStats";

export default function HomePage() {
  return (
    <LayoutContainer>
      <Hero />
      <GitHubStats />
    </LayoutContainer>
  );
}
