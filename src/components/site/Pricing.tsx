import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const plans = [
  {
    name: "Starter",
    price: "¥29,800",
    desc: "個人事業主・スモールチーム向け",
    features: ["月間500リード", "AIスコアリング", "メールテンプレート 50種", "メールサポート"],
  },
  {
    name: "Growth",
    price: "¥98,000",
    desc: "成長中のスタートアップに最適",
    features: ["月間3,000リード", "高度なAI分析", "CRM連携 (Salesforce/HubSpot)", "パーソナライズ無制限", "優先サポート"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "大規模組織・複数チーム",
    features: ["無制限リード", "専用AI学習モデル", "SSO / SAML", "専任カスタマーサクセス", "SLA保証"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-xs tracking-[0.2em] text-primary-glow font-medium mb-4">PRICING</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">必要な分だけ、シンプルに。</h2>
          <p className="mt-6 text-muted-foreground">すべてのプランに14日間無料トライアル付き。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative p-8 rounded-2xl border transition-all ${
                p.featured
                  ? "bg-gradient-card border-primary/50 shadow-elegant scale-[1.02]"
                  : "bg-card border-border shadow-card"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-xs font-medium text-primary-foreground">
                  人気No.1
                </div>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-display font-bold">{p.price}</span>
                {p.price !== "Custom" && <span className="text-muted-foreground text-sm">/月</span>}
              </div>
              <Link
                to="/dashboard"
                className={`block w-full text-center h-11 leading-[2.75rem] rounded-xl font-medium transition ${
                  p.featured
                    ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                    : "glass hover:bg-surface-elevated"
                }`}
              >
                試してみる
              </Link>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="size-4 text-primary-glow mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
