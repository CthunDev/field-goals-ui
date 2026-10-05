import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronRight, CircleDollarSign, Download, LockKeyhole, MapPin, ShieldCheck, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transparência FC | Caixa aberto do time" },
      { name: "description", content: "Acompanhe o caixa, as mensalidades e os próximos jogos do Transparência FC." },
      { property: "og:title", content: "Transparência FC | Caixa aberto do time" },
      { property: "og:description", content: "Acompanhe o caixa, as mensalidades e os próximos jogos do Transparência FC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const movements = [
  { title: "Mensalidades (7 jogadores)", meta: "05 out · mensalidade", value: "+ R$ 420,00", type: "income" },
  { title: "Aluguel do campo", meta: "03 out · despesa", value: "− R$ 280,00", type: "expense" },
  { title: "Rifa do uniforme", meta: "01 out · outros", value: "+ R$ 620,00", type: "income" },
] as const;

const expenses = [
  { name: "Aluguel do campo", value: "R$ 1.120", width: "74%" },
  { name: "Uniformes e material", value: "R$ 760", width: "52%" },
  { name: "Arbitragem", value: "R$ 430", width: "34%" },
];

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`panel rounded-lg ${className}`}>{children}</section>;
}

function Dashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pitch-lines pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="relative mx-auto max-w-6xl px-3 py-4 sm:px-6 lg:px-8 lg:py-7">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/15">
              <Trophy className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-sm uppercase leading-none">Transparência FC</p>
              <p className="mt-1 text-xs text-muted-foreground">Caixa aberto · Temporada 2026</p>
            </div>
          </div>
          <Button variant="quiet" size="sm" aria-label="Acessar painel administrativo">
            <LockKeyhole className="size-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </header>

        <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
          <div className="space-y-3 lg:col-span-7 lg:space-y-4">
            <Panel className="score-in relative overflow-hidden p-5 sm:p-6">
              <div className="absolute right-0 top-0 h-full w-1 bg-primary" />
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Caixa atualizado hoje</p>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-primary"><i className="size-1.5 rounded-full bg-primary" /> AO VIVO</span>
              </div>
              <p className="mt-3 font-display text-[clamp(2rem,10vw,3.5rem)] leading-none">R$ 8.412<span className="text-primary">,50</span></p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md border border-income/25 bg-income/10 px-2.5 py-1 text-xs font-semibold text-income">▲ R$ 1.240 no mês</span>
                <span className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">18 jogadores ativos</span>
              </div>
            </Panel>

            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <Panel className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Entradas</p>
                <p className="mt-2 font-display text-lg text-income sm:text-2xl">R$ 12.900</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Mensalidades · rifas · avulsos</p>
              </Panel>
              <Panel className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Saídas</p>
                <p className="mt-2 font-display text-lg text-expense sm:text-2xl">R$ 4.487,50</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Campo · material · arbitragem</p>
              </Panel>
            </div>

            <Panel className="p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xs uppercase">Destino dos recursos</h2>
                  <p className="mt-1 text-[11px] text-muted-foreground">Últimos 30 dias</p>
                </div>
                <CircleDollarSign className="size-5 text-accent" aria-hidden="true" />
              </div>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div key={expense.name}>
                    <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">{expense.name}</span><span className="font-semibold">{expense.value}</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: expense.width }} /></div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-4 sm:p-5">
              <div className="mb-2 flex items-center justify-between">
                <div><h2 className="font-display text-xs uppercase">Movimentações recentes</h2><p className="mt-1 text-[11px] text-muted-foreground">Transparência do caixa</p></div>
                <Button variant="ghost" size="sm">Ver extrato <ChevronRight className="size-3.5" /></Button>
              </div>
              <div className="divide-y divide-border">
                {movements.map((movement) => (
                  <div key={movement.title} className="flex items-center gap-3 py-3">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-md border text-base font-bold ${movement.type === "income" ? "border-income/25 bg-income/10 text-income" : "border-expense/25 bg-expense/10 text-expense"}`}>{movement.type === "income" ? "+" : "−"}</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{movement.title}</p><p className="text-[11px] text-muted-foreground">{movement.meta}</p></div>
                    <p className={`whitespace-nowrap text-xs font-bold ${movement.type === "income" ? "text-income" : "text-expense"}`}>{movement.value}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="space-y-3 lg:col-span-5 lg:space-y-4">
            <Panel className="p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">Próxima rodada</p><h2 className="mt-1 font-display text-lg uppercase">Pelada de domingo</h2></div>
                <CalendarDays className="size-5 text-accent" />
              </div>
              <div className="mt-4 rounded-lg border border-border bg-secondary/70 p-3">
                <p className="text-sm font-semibold">11 de outubro · 09:00</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3.5" /> Arena Central · Campo 1</p>
              </div>
              <div className="mt-4 flex items-end justify-between"><div><p className="font-display text-3xl">14</p><p className="text-[11px] text-muted-foreground">confirmados</p></div><Button variant="secondary" size="sm">Ver presença</Button></div>
            </Panel>

            <Panel className="p-4 sm:p-5">
              <div className="flex items-center justify-between"><div><h2 className="font-display text-xs uppercase">Mensalidades</h2><p className="mt-1 text-[11px] text-muted-foreground">Situação do elenco</p></div><p className="font-display text-lg"><span className="text-primary">14</span>/18</p></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[78%] rounded-full bg-primary" /></div>
              <div className="mt-3 flex justify-between text-[11px]"><span className="text-income">14 em dia</span><span className="text-expense">4 pendentes</span></div>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {["Rafael", "Diego", "Bruno", "Lucas", "Matheus", "Caio"].map((name, index) => <span key={name} className={`truncate rounded-md border px-2 py-1 text-center text-[10px] ${index < 4 ? "border-income/20 bg-income/10 text-income" : "border-expense/20 bg-expense/10 text-expense"}`}>{name}</span>)}
              </div>
            </Panel>

            <Panel className="border-accent/30 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent"><ShieldCheck className="size-5" /></span>
                <div className="min-w-0 flex-1"><h2 className="text-sm font-bold">Relatório mensal</h2><p className="text-[11px] text-muted-foreground">Balanço completo para os jogadores</p></div>
                <Button size="icon" aria-label="Baixar relatório mensal"><Download className="size-4" /></Button>
              </div>
            </Panel>

            <p className="py-2 text-center text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Painel público · dados atualizados hoje</p>
          </aside>
        </div>
      </div>
    </main>
  );
}