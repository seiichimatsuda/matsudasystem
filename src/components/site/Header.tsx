import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">Leadflow<span className="text-primary-glow">.ai</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">機能</a>
          <a href="#how" className="hover:text-foreground transition-colors">仕組み</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">料金</a>
          <Link to="/auth" className="hover:text-foreground transition-colors">ログイン</Link>
        </nav>
        <Link
          to="/auth"
          className="inline-flex items-center h-9 px-4 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:opacity-90 transition"
        >
          無料で始める
        </Link>
      </div>
    </header>
  );
}
