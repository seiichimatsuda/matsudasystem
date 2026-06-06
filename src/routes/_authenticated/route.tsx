import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Target, Mail, Star, LogOut } from "lucide-react";
import mslLogoAsset from "@/assets/msl-logo.png.asset.json";

const mslLogo = mslLogoAsset.url;

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const initials = (user?.email ?? "U").slice(0, 2).toUpperCase();

  const navItems = [
    { icon: TrendingUp, label: "概要", to: "/dashboard" },
    { icon: Users, label: "リード", to: "/leads" },
    { icon: Target, label: "キャンペーン", to: "/campaigns" },
    { icon: Mail, label: "メッセージ", to: "/messages" },
    { icon: Star, label: "お気に入り", to: "/favorites" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 w-60 border-r border-border bg-sidebar p-5 hidden lg:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="size-8 rounded-lg bg-white grid place-items-center shadow-glow overflow-hidden">
            <img src={mslLogo} alt="Matsuda System Labs" className="size-8 object-contain" />
          </div>
          <span className="font-display font-bold tracking-tight">Matsuda System <span className="text-primary-glow">Labs</span></span>
        </Link>

        <nav className="space-y-1 text-sm">
          {navItems.map((item) => {
            const isActive = currentPath === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-sidebar-accent text-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-border">
          <div className="size-9 rounded-full bg-gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.email ?? ""}</div>
          </div>
          <button
            onClick={handleLogout}
            className="size-8 rounded-lg grid place-items-center text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition"
            title="ログアウト"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </aside>

      <div className="lg:pl-60">
        <Outlet />
      </div>
    </div>
  );
}
