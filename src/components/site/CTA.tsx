import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-card border border-primary/30 p-16 text-center shadow-elegant">
          <div className="absolute inset-0 bg-gradient-hero opacity-50" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              次の商談は、<span className="text-gradient">明日の朝に。</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              クレジットカード不要。14日後に自動課金されることもありません。
            </p>
            <Link
              to="/dashboard"
              className="mt-10 inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-elegant transition-all"
            >
              無料トライアルを開始 <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>© 2026 Matsuda System Labs</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">利用規約</a>
          <a href="#" className="hover:text-foreground">プライバシー</a>
          <a href="#" className="hover:text-foreground">お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
}
