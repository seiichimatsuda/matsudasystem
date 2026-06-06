import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/messages")({
  head: () => ({ meta: [{ title: "メッセージ — Matsuda System Labs" }] }),
  component: MessagesPage,
});

function MessagesPage() {
  return (
    <div className="p-6 max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight">メッセージ</h1>
      <p className="text-muted-foreground mt-1 text-sm">メッセージ管理ページ</p>
    </div>
  );
}
