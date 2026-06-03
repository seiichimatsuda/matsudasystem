import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Search, Bell, ChevronRight, TrendingUp, Users, Target, Zap,
  Building2, Mail, Star, ArrowUpRight, MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "ダッシュボード — Leadflow.ai" }],
  }),
  component: Dashboard,
});

const leads = [
  { co: "株式会社テックノヴァ", ind: "SaaS / 100-500名", score: 94, status: "Hot", contact: "山田 太郎", title: "VP of Sales" },
  { co: "ミライ商事株式会社", ind: "商社 / 500-1000名", score: 89, status: "Hot", contact: "佐藤 花子", title: "営業部長" },
  { co: "ブルースカイ・ホールディングス", ind: "金融 / 1000+名", score: 82, status: "Warm", contact: "鈴木 健一", title: "DX推進室長" },
  { co: "Greenleaf Inc.", ind: "Eコマース / 50-100名", score: 78, status: "Warm", contact: "Emily Chen", title: "Head of Growth" },
  { co: "アクアスタジオ合同会社", ind: "メディア / 10-50名", score: 71, status: "Warm", contact: "中村 由美", title: "代表取締役" },
  { co: "OrbitWorks K.K.", ind: "製造 / 500-1000名", score: 65, status: "Cold", contact: "田中 大輔", title: "経営企画" },
];

const stats = [
  { label: "新規リード (今週)", val: "248", delta: "+12%", icon: Users },
  { label: "平均スコア", val: "76.4", delta: "+5.2", icon: Target },
  { label: "商談化率", val: "18.2%", delta: "+3.1%", icon: TrendingUp },
  { label: "AI提案数", val: "1,247", delta: "+218", icon: Zap },
];

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? "text-success" : score >= 70 ? "text-primary-glow" : "text-warning";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-primary"
          style={{ width: `${score}%` }}
        />
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
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-60 border-r border-border bg-sidebar p-5 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold tracking-tight">Leadflow.ai</span>
        </Link>

        <nav className="space-y-1 text-sm">
          {[
            { icon: TrendingUp, label: "概要", active: true },
            { icon: Users, label: "リード" },
            { icon: Target, label: "キャンペーン" },
            { icon: Mail, label: "メッセージ" },
            { icon: Star, label: "お気に入り" },
          ].map((i) => (
            <button
              key={i.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                i.active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              }`}
            >
              <i.icon className="size-4" />
              {i.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 rounded-xl bg-gradient-card border border-border">
          <div className="text-xs text-muted-foreground mb-2">プラン残り</div>
          <div className="text-sm font-semibold mb-3">12日 / 14日</div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-primary w-[85%]" />
          </div>
          <button className="mt-4 w-full h-8 rounded-lg bg-gradient-primary text-xs font-medium text-primary-foreground">
            アップグレード
          </button>
        </div>
      </aside>

      <div className="lg:pl-60">
        {/* Topbar */}
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
              YT
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">おはようございます、Yuki さん</h1>
                <p className="text-muted-foreground mt-1 text-sm">本日 23件の優良リードが見つかりました。</p>
              </div>
              <button className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-primary text-sm font-medium text-primary-foreground shadow-glow">
                <Sparkles className="size-4" />
                AIキャンペーン作成
              </button>
            </div>

            {/* Stats */}
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
              {/* Leads table */}
              <div className="lg:col-span-2 rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                <div className="p-5 flex items-center justify-between border-b border-border">
                  <div>
                    <h2 className="font-semibold">本日のおすすめリード</h2>
                    <p className="text-xs text-muted-foreground mt-1">AIがあなたのICPに基づき抽出</p>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    すべて見る <ChevronRight className="size-3" />
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {leads.map((l) => (
                    <div key={l.co} className="p-5 hover:bg-surface/50 transition cursor-pointer flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-surface-elevated grid place-items-center shrink-0">
                        <Building2 className="size-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="font-medium truncate">{l.co}</div>
                          <StatusPill s={l.status} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {l.ind} · {l.contact} ({l.title})
                        </div>
                      </div>
                      <ScoreBadge score={l.score} />
                      <button className="size-8 rounded-lg hover:bg-surface grid place-items-center">
                        <MoreHorizontal className="size-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-gradient-card border border-primary/30 p-6 shadow-elegant">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="size-4 text-primary-glow" />
                    <div className="text-xs tracking-wider text-primary-glow font-medium">AI INSIGHT</div>
                  </div>
                  <p className="text-sm leading-relaxed">
                    SaaS業界の<span className="text-foreground font-semibold">VP of Sales</span>へのアプローチは、
                    火曜午前10時の開封率が<span className="text-success font-semibold">+42%</span>です。
                  </p>
                  <button className="mt-4 text-xs text-primary-glow flex items-center gap-1 hover:gap-2 transition-all">
                    今すぐスケジュール <ArrowUpRight className="size-3" />
                  </button>
                </div>

                <div className="rounded-2xl bg-card border border-border p-6 shadow-card">
                  <h3 className="font-semibold text-sm mb-4">スコア分布</h3>
                  <div className="space-y-3">
                    {[
                      { l: "Hot (85+)", c: 42, pct: 70, col: "bg-destructive" },
                      { l: "Warm (70-84)", c: 128, pct: 90, col: "bg-warning" },
                      { l: "Cold (<70)", c: 78, pct: 45, col: "bg-muted-foreground" },
                    ].map((r) => (
                      <div key={r.l}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">{r.l}</span>
                          <span className="font-medium">{r.c}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${r.pct}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full ${r.col}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
