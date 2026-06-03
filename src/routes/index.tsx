import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Pricing } from "@/components/site/Pricing";
import { CTA, Footer } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leadflow.ai — AIが見つける、明日のお客様。" },
      { name: "description", content: "AIで見込み顧客を自動発掘・スコアリング。営業の新規開拓を10倍効率化するSaaS。14日間無料トライアル。" },
      { property: "og:title", content: "Leadflow.ai — AI新規顧客獲得SaaS" },
      { property: "og:description", content: "AIで見込み顧客を自動発掘・スコアリング。営業の新規開拓を10倍効率化。" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
