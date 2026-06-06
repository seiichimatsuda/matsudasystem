import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/favorites")({
  head: () => ({ meta: [{ title: "お気に入り — Matsuda System Labs" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  return (
    <div className="p-6 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight">お気に入り</h1>
      <p className="text-muted-foreground mt-1 text-sm">お気に入り管理ページ</p>
    </div>
  );
}
