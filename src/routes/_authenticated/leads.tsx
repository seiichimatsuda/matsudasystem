import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/leads")({
  head: () => ({ meta: [{ title: "リード — Matsuda System Labs" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <div className="p-6 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight">リード</h1>
      <p className="text-muted-foreground mt-1 text-sm">リード管理ページ</p>
    </div>
  );
}
