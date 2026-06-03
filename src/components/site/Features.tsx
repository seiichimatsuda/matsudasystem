import { motion } from "framer-motion";
import { Brain, Target, MessageSquare, BarChart3, Zap, Shield } from "lucide-react";

const features = [
  { icon: Brain, title: "AIスコアリング", desc: "受注確度を0-100でスコア化。優先順位が一目で分かる。" },
  { icon: Target, title: "ICPマッチング", desc: "理想顧客像をAIが学習し、類似企業を自動抽出。" },
  { icon: MessageSquare, title: "自動パーソナライズ", desc: "各リードに最適化されたメール文面をワンクリック生成。" },
  { icon: BarChart3, title: "予測分析", desc: "今月の商談数・受注金額をAIが予測。" },
  { icon: Zap, title: "CRM連携", desc: "Salesforce / HubSpot にリアルタイム同期。" },
  { icon: Shield, title: "国内データ準拠", desc: "個人情報保護法・GDPR準拠の安全な運用。" },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="text-xs tracking-[0.2em] text-primary-glow font-medium mb-4">FEATURES</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            営業を、<span className="text-gradient">科学する。</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            勘と経験に頼らない。AIによる定量分析で、最短ルートの新規開拓を実現します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 transition-all shadow-card hover:shadow-elegant"
            >
              <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <f.icon className="size-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
