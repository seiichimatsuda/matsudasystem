import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/campaigns")({
  head: () => ({ meta: [{ title: "キャンペーン — Matsuda System Labs" }] }),
  component: CampaignsPage,
});

function CampaignsPage() {
  return (
    <div className="p-6 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight">キャンペーン</h1>
      <p className="text-muted-foreground mt-1 text-sm">キャンペーン管理ページ</p>
    </div>
  );
}
