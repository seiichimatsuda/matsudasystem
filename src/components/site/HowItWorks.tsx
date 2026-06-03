import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "理想顧客を定義", d: "業界・規模・役職など、貴社の理想顧客像をAIに教えます。既存顧客リストからの自動学習も可能。" },
  { n: "02", t: "AIがリードを抽出", d: "数百万社の企業データから、最もマッチする企業をスコア付きでリストアップします。" },
  { n: "03", t: "パーソナライズ配信", d: "AI生成のメール・スクリプトでアプローチ。反応データを学習し精度が向上し続けます。" },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-32 bg-surface/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-xs tracking-[0.2em] text-primary-glow font-medium mb-4">HOW IT WORKS</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">3ステップで、商談獲得。</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-7xl font-display font-bold text-gradient opacity-60 mb-4">{s.n}</div>
              <h3 className="text-2xl font-semibold mb-3">{s.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
