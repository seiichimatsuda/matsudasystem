import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient, queryOptions } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles, Search, Bell, ChevronRight, TrendingUp, Users, Target, Zap,
  Building2, Mail, Star, ArrowUpRight, MoreHorizontal, Plus, Loader2, LogOut, Trash2,
} from "lucide-react";
import { listLeads, createLead, deleteLead } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type LeadInput = {
  company: string;
  industry?: string | null;
  contact_name?: string | null;
  contact_title?: string | null;
  email?: string | null;
  score: number;
  status: "Hot" | "Warm" | "Cold";
  notes?: string | null;
};

const leadsQuery = queryOptions({
  queryKey: ["leads"],
  queryFn: () => listLeads(),
});

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "ダッシュボード — Leadflow.ai" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(leadsQuery),
  errorComponent: ({ error }) => (
    <div className="p-8 text-sm text-destructive">読み込みエラー: {error.message}</div>
  ),
  component: Dashboard,
});

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "text-success" : score >= 70 ? "text-primary-glow" : "text-warning";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-gradient-primary" style={{ width: `${score}%` }} />
      </div>
      <span className={`text-sm font-display font-semibold ${color}`}>{score}</span>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const map: Record<string, string> = {
    Hot: "bg-destructive/15 text-destructive border-destructive/30",
    Warm: "bg-warning/15 text-warning border-warning/30",
    Cold: "bg-muted text-muted-foreground border-border",
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full border ${map[s]}`}>{s}</span>;
}

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: leads = [] } = useQuery(leadsQuery);
  const [open, setOpen] = useState(false);

  const createFn = useServerFn(createLead);
  const deleteFn = useServerFn(deleteLead);

  const createMut = useMutation({
    mutationFn: (input: LeadInput) => createFn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("リードを追加しました");
      setOpen(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("削除しました");
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const avgScore = leads.length
    ? (leads.reduce((s, l) => s + l.score, 0) / leads.length).toFixed(1)
    : "—";
  const hotCount = leads.filter((l) => l.status === "Hot").length;
  const warmCount = leads.filter((l) => l.status === "Warm").length;
  const coldCount = leads.filter((l) => l.status === "Cold").length;

  const stats = [
    { label: "総リード数", val: String(leads.length), delta: `+${leads.length}`, icon: Users },
    { label: "平均スコア", val: avgScore, delta: "—", icon: Target },
    { label: "Hotリード", val: String(hotCount), delta: `${hotCount}件`, icon: TrendingUp },
    { label: "AI提案数", val: String(leads.length * 3), delta: "+0", icon: Zap },
  ];

  const initials = (user?.email ?? "U").slice(0, 2).toUpperCase();

  return (
    <>
        <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
          <div className="relative w-full max-w-md">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="企業名・業界で検索..."
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="size-9 rounded-lg glass grid place-items-center relative">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary-glow" />
            </button>
            <div className="size-9 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">
              {initials}
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">おかえりなさい</h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  保存済みリード {leads.length} 件
                </p>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-primary text-sm font-medium text-primary-foreground shadow-glow"
              >
                <Plus className="size-4" />
                リードを追加
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-xl bg-gradient-card border border-border shadow-card"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="size-9 rounded-lg bg-primary/10 grid place-items-center">
                      <s.icon className="size-4 text-primary-glow" />
                    </div>
                    <span className="text-xs text-success flex items-center gap-1">
                      <ArrowUpRight className="size-3" />
                      {s.delta}
                    </span>
                  </div>
                  <div className="text-2xl font-display font-bold">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                <div className="p-5 flex items-center justify-between border-b border-border">
                  <div>
                    <h2 className="font-semibold">あなたのリード</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      データベースに保存済み
                    </p>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    すべて見る <ChevronRight className="size-3" />
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {leads.length === 0 && (
                    <div className="p-12 text-center">
                      <Building2 className="size-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-4">
                        まだリードがありません
                      </p>
                      <button
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-gradient-primary text-xs font-medium text-primary-foreground"
                      >
                        <Plus className="size-3" />
                        最初のリードを追加
                      </button>
                    </div>
                  )}
                  {leads.map((l) => (
                    <div
                      key={l.id}
                      className="p-5 hover:bg-surface/50 transition group flex items-center gap-4"
                    >
                      <div className="size-10 rounded-lg bg-surface-elevated grid place-items-center shrink-0">
                        <Building2 className="size-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium truncate">{l.company}</div>
                          <StatusPill s={l.status} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 truncate">
                          {[l.industry, l.contact_name, l.contact_title].filter(Boolean).join(" · ") || "—"}
                        </div>
                      </div>
                      <ScoreBadge score={l.score} />
                      <button
                        onClick={() => deleteMut.mutate(l.id)}
                        className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive grid place-items-center opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl bg-gradient-card border border-primary/30 p-6 shadow-elegant">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="size-4 text-primary-glow" />
                    <div className="text-xs tracking-wider text-primary-glow font-medium">AI INSIGHT</div>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {leads.length === 0
                      ? "リードを追加すると、AIが分析と提案を生成します。"
                      : `現在 ${hotCount} 件のHotリードがあります。優先的にアプローチしましょう。`}
                  </p>
                </div>

                <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
                  <h3 className="font-semibold text-sm mb-4">スコア分布</h3>
                  <div className="space-y-3">
                    {[
                      { l: "Hot (85+)", c: hotCount, col: "bg-destructive" },
                      { l: "Warm (70-84)", c: warmCount, col: "bg-warning" },
                      { l: "Cold (<70)", c: coldCount, col: "bg-muted-foreground" },
                    ].map((r) => {
                      const max = Math.max(hotCount, warmCount, coldCount, 1);
                      return (
                        <div key={r.l}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-muted-foreground">{r.l}</span>
                            <span className="font-medium">{r.c}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(r.c / max) * 100}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full ${r.col}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {open && <AddLeadDialog onClose={() => setOpen(false)} onSubmit={(d) => createMut.mutate(d)} loading={createMut.isPending} />}
    </div>
  );
}

function AddLeadDialog({
  onClose,
  onSubmit,
  loading,
}: {
  onClose: () => void;
  onSubmit: (d: LeadInput) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    company: "",
    industry: "",
    contact_name: "",
    contact_title: "",
    email: "",
    score: 75,
    status: "Warm" as "Hot" | "Warm" | "Cold",
    notes: "",
  });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-elegant p-6"
      >
        <h2 className="text-lg font-display font-bold mb-1">新規リード</h2>
        <p className="text-xs text-muted-foreground mb-5">データベースに保存されます</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-3"
        >
          <input required placeholder="会社名 *" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full h-10 px-3 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50" />
          <input placeholder="業界 / 規模" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
            className="w-full h-10 px-3 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50" />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="担当者名" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
              className="h-10 px-3 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50" />
            <input placeholder="役職" value={form.contact_title} onChange={(e) => setForm({ ...form, contact_title: e.target.value })}
              className="h-10 px-3 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50" />
          </div>
          <input type="email" placeholder="メール" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-10 px-3 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">スコア: {form.score}</label>
              <input type="range" min={0} max={100} value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
                className="w-full accent-primary" />
            </div>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "Hot" | "Warm" | "Cold" })}
              className="h-10 px-3 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50">
              <option value="Hot">Hot</option>
              <option value="Warm">Warm</option>
              <option value="Cold">Cold</option>
            </select>
          </div>
          <textarea placeholder="メモ" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm focus:outline-none focus:border-primary/50 resize-none" />

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-lg border border-border hover:bg-surface text-sm">
              キャンセル
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 h-10 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow flex items-center justify-center gap-2 disabled:opacity-60">
              {loading && <Loader2 className="size-4 animate-spin" />}
              保存
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
