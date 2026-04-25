"use client";

import { ReactNode } from "react";

/* ============================================================
   Phone frame — matches the rounded device used in the screenshots
   ============================================================ */

export function PhoneFrame({
  children,
  width = 240,
  elevated,
  dark,
}: {
  children: ReactNode;
  width?: number;
  elevated?: boolean;
  dark?: boolean;
}) {
  const aspect = 9 / 19.5;
  return (
    <div
      style={{
        width,
        height: width / aspect,
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)",
        boxShadow: elevated
          ? "0 40px 80px -25px rgba(10, 10, 10, 0.45), 0 12px 36px -10px rgba(10, 10, 10, 0.3)"
          : "0 24px 60px -25px rgba(10, 10, 10, 0.4)",
      }}
      className="relative rounded-[2.4rem] p-1.5 border border-fg/20"
    >
      <div
        className={`relative w-full h-full rounded-[2rem] overflow-hidden border ${
          dark ? "bg-[#0a0a0a] border-white/10" : "bg-bg border-fg/10"
        }`}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-20" />
        <div className="relative w-full h-full pt-9 pb-16 flex flex-col">
          {/* Status bar */}
          <div
            className={`px-4 flex items-center justify-between text-[9px] font-semibold ${
              dark ? "text-white" : "text-fg"
            }`}
          >
            <span>9:41</span>
            <div
              className={
                dark
                  ? "flex items-center gap-1 text-white/60"
                  : "flex items-center gap-1 text-fg-muted"
              }
            >
              <span>●●●</span>
              <span>▮</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
        {/* Bottom tab bar — matches the app */}
        <BottomTabBar dark={dark} />
      </div>
    </div>
  );
}

function BottomTabBar({ dark }: { dark?: boolean }) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 px-3 pb-2 pt-2 ${
        dark
          ? "bg-[#0a0a0a] border-t border-white/8"
          : "bg-bg border-t border-fg/8"
      }`}
    >
      <div
        className={`flex items-center justify-around ${
          dark ? "text-white/50" : "text-fg-muted"
        }`}
      >
        <TabIcon kind="grid" dark={dark} />
        <TabIcon kind="dollar" dark={dark} />
        <TabIcon kind="swap" active dark={dark} />
        <TabIcon kind="explore" dark={dark} />
        <TabIcon kind="settings" dark={dark} />
      </div>
    </div>
  );
}

function TabIcon({
  kind,
  active,
  dark,
}: {
  kind: "grid" | "dollar" | "swap" | "explore" | "settings";
  active?: boolean;
  dark?: boolean;
}) {
  const cls = active
    ? dark
      ? "size-7 rounded-full bg-white text-[#0a0a0a] grid place-items-center"
      : "size-7 rounded-full bg-fg text-bg grid place-items-center"
    : dark
      ? "size-7 grid place-items-center text-white/50"
      : "size-7 grid place-items-center text-fg-muted";

  const stroke = "currentColor";
  return (
    <div className={cls}>
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
        {kind === "grid" && (
          <>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.6" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.6" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.6" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={stroke} strokeWidth="1.6" />
          </>
        )}
        {kind === "dollar" && (
          <>
            <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
            <path d="M14.5 9.5C14 8.5 13 8 12 8s-2 .5-2 1.5S10.7 11 12 11s2 .5 2 1.5S13 14 12 14s-2-.5-2.5-1.5M12 7v1m0 7v1" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
          </>
        )}
        {kind === "swap" && (
          <>
            <path d="M4 7h13l-3-3M20 17H7l3 3" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {kind === "explore" && (
          <>
            <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
            <path d="m9 15 2-6 6-2-2 6z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
          </>
        )}
        {kind === "settings" && (
          <>
            <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.6" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" stroke={stroke} strokeWidth="1.4" />
          </>
        )}
      </svg>
    </div>
  );
}

/* ============================================================
   The pink/purple "identity" avatar from the screenshots
   ============================================================ */

export function IdentityAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      className="rounded-md overflow-hidden shrink-0"
      style={{
        width: size,
        height: size,
        background: "#1a0d2e",
      }}
    >
      <svg viewBox="0 0 12 12" className="size-full">
        {[
          [0, 0, "#3b1c5a"], [1, 0, "#1a0d2e"], [2, 0, "#d83b8a"], [3, 0, "#3b1c5a"],
          [0, 1, "#5b3bff"], [1, 1, "#d83b8a"], [2, 1, "#1a0d2e"], [3, 1, "#5b3bff"],
          [0, 2, "#1a0d2e"], [1, 2, "#5b3bff"], [2, 2, "#d83b8a"], [3, 2, "#3b1c5a"],
          [0, 3, "#d83b8a"], [1, 3, "#3b1c5a"], [2, 3, "#5b3bff"], [3, 3, "#1a0d2e"],
        ].map(([x, y, c], i) => (
          <rect key={i} x={(x as number) * 3} y={(y as number) * 3} width="3" height="3" fill={c as string} />
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   Token logos — distinctive coin marks
   ============================================================ */

function TokenIcon({ symbol, size = 24 }: { symbol: string; size?: number }) {
  const config: Record<string, { bg: string; fg: string; letter: string }> = {
    ETH: { bg: "#627eea", fg: "#ffffff", letter: "Ξ" },
    BTC: { bg: "#f7931a", fg: "#ffffff", letter: "₿" },
    BNB: { bg: "#f3ba2f", fg: "#1a1a1a", letter: "B" },
    SOL: { bg: "linear-gradient(135deg,#9945ff,#14f195)", fg: "#ffffff", letter: "S" },
    DOGE: { bg: "#c2a633", fg: "#ffffff", letter: "Ð" },
    BONK: { bg: "#fc8b1a", fg: "#ffffff", letter: "B" },
    FRAX: { bg: "#1a1a1a", fg: "#ffffff", letter: "F" },
    UNI: { bg: "#ff007a", fg: "#ffffff", letter: "U" },
    MATIC: { bg: "#8247e5", fg: "#ffffff", letter: "M" },
    USDT: { bg: "#26a17b", fg: "#ffffff", letter: "₮" },
    USDC: { bg: "#2775ca", fg: "#ffffff", letter: "$" },
    XRP: { bg: "#23292f", fg: "#ffffff", letter: "X" },
    AVAX: { bg: "#e84142", fg: "#ffffff", letter: "A" },
    XLM: { bg: "#0a0a0a", fg: "#ffffff", letter: "✦" },
    BASE: { bg: "#0052ff", fg: "#ffffff", letter: "B" },
    HYPE: { bg: "#0e6d6d", fg: "#22d3a3", letter: "H" },
    ZEC: { bg: "#f4b728", fg: "#ffffff", letter: "Z" },
    SUI: { bg: "#4ca2ff", fg: "#ffffff", letter: "S" },
  };
  const c = config[symbol] ?? { bg: "#9a9a9a", fg: "#ffffff", letter: symbol[0] };
  return (
    <div
      className="rounded-full grid place-items-center font-bold"
      style={{
        width: size,
        height: size,
        background: c.bg,
        color: c.fg,
        fontSize: size * 0.5,
        lineHeight: 1,
      }}
    >
      {c.letter}
    </div>
  );
}

/* ============================================================
   Dashboard screen — hero centerpiece
   ============================================================ */

export function DashboardScreen() {
  return (
    <div className="flex-1 px-3 pt-3 flex flex-col gap-3">
      {/* Account header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IdentityAvatar size={26} />
          <div>
            <div className="text-[10px] font-semibold text-fg leading-tight flex items-center gap-1">
              Account 1
              <svg viewBox="0 0 24 24" className="size-2.5" fill="none">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-[8px] text-fg-muted">0x5421xd…8745</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <TinyBtn>
            <svg viewBox="0 0 24 24" className="size-3" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
              <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
              <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
              <rect x="14" y="14" width="6" height="2" rx="1" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </TinyBtn>
          <TinyBtn>
            <svg viewBox="0 0 24 24" className="size-3" fill="none">
              <path d="M6 8a6 6 0 0 1 12 0v4l2 4H4l2-4z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 19h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </TinyBtn>
        </div>
      </div>

      {/* Balance card */}
      <div className="rounded-xl bg-bg-2 border border-fg/8 p-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[9px] text-fg-muted">Total Balance</div>
            <div className="font-display text-[18px] font-extrabold text-fg mt-0.5 tracking-tight">
              $25,456.00
            </div>
          </div>
          <div className="text-[8px] text-fg-muted flex items-center gap-1 border border-fg/10 rounded-md px-1.5 py-0.5 bg-bg">
            USD
            <svg viewBox="0 0 24 24" className="size-2" fill="none">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="text-[9px] text-positive font-semibold mt-1">
          +$936.21 (+27.74%) ↗
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-1.5">
        <Action label="Receive" icon="receive" />
        <Action label="Send" icon="send" />
        <Action label="Swap" icon="swap" />
        <Action label="Trade" icon="trade" active />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5">
        <TabPill active>Tokens</TabPill>
        <TabPill>NFT</TabPill>
        <div className="ml-auto size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center text-[10px] text-fg-muted">+</div>
      </div>

      {/* Token list */}
      <div className="space-y-1.5">
        <TokenRow symbol="ETH" name="Ethereum" amount="$11,234.98" sub="10.0456 ETH" />
        <TokenRow symbol="BONK" name="Bonk" amount="$12,345.67" sub="11.2345 BONK" />
        <TokenRow symbol="FRAX" name="Frax" amount="$4,567.89" sub="13.4567 FRAX" />
        <TokenRow symbol="UNI" name="Uniswap" amount="$15,678.90" sub="14.5678 UNI" />
      </div>
    </div>
  );
}

function TinyBtn({ children }: { children: ReactNode }) {
  return (
    <div className="size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center text-fg-muted">
      {children}
    </div>
  );
}

function Action({
  label,
  icon,
  active,
}: {
  label: string;
  icon: "receive" | "send" | "swap" | "trade";
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg flex flex-col items-center gap-1 py-1.5 ${
        active
          ? "bg-fg text-bg"
          : "bg-bg-2 border border-fg/8 text-fg"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-3" fill="none">
        {icon === "receive" && (
          <path d="M19 8 8 19m0 0v-9m0 9h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
        {icon === "send" && (
          <path d="M5 19 16 8m0 0h-9m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
        {icon === "swap" && (
          <path d="M4 7h13l-3-3M20 17H7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {icon === "trade" && (
          <path d="M3 17 9 11l4 4 8-8m0 0h-5m5 0v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      <span className="text-[7.5px] font-medium">{label}</span>
    </div>
  );
}

function TabPill({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-md px-2.5 py-1 text-[10px] font-semibold ${
        active ? "bg-fg text-bg" : "text-fg-muted"
      }`}
    >
      {children}
    </div>
  );
}

function TokenRow({
  symbol,
  name,
  amount,
  sub,
}: {
  symbol: string;
  name: string;
  amount: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2 py-1">
      <TokenIcon symbol={symbol} size={22} />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-fg leading-tight">{symbol}</div>
        <div className="text-[8px] text-fg-muted leading-tight">{name}</div>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-semibold text-fg leading-tight">{amount}</div>
        <div className="text-[8px] text-fg-muted leading-tight">{sub}</div>
      </div>
    </div>
  );
}

/* ============================================================
   Transactions screen
   ============================================================ */

export function TransactionsScreen() {
  return (
    <div className="flex-1 px-3 pt-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-display font-extrabold text-[14px] text-fg">
          Transactions
        </div>
        <div
          className="size-5 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #16a34a 0%, #fbbf24 50%, #6366f1 100%)",
          }}
        />
      </div>

      <div className="flex items-center gap-2 rounded-md bg-bg-2 border border-fg/8 px-2 py-1.5">
        <IdentityAvatar size={20} />
        <div className="flex-1 min-w-0">
          <div className="text-[9px] font-semibold text-fg leading-tight">
            Account 1
          </div>
          <div className="text-[7.5px] text-fg-muted leading-tight">
            0x5421xd…8745
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="size-3 text-fg-muted" fill="none">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex-1 rounded-md bg-bg-2 border border-fg/8 px-2 py-1 flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="size-2.5 text-fg-muted" fill="none">
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[8px] text-fg-muted">Search</span>
        </div>
        <div className="size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-fg-muted" fill="none">
            <path d="M3 6h18M6 12h12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="space-y-2 mt-1">
        <Tx kind="send" symbol="BTC" status="confirmed" amount="-0.005 BTC" />
        <Tx kind="swap" symbol="BNB/XRP" status="failed" amount="-1.02 BNB" />
        <Tx kind="receive" symbol="SOL" status="pending" amount="+20 SOL" />
        <Tx kind="send" symbol="ETH" status="confirmed" amount="-10.45 ETH" />
        <Tx kind="receive" symbol="BTC" status="failed" amount="+0.03 BTC" />
        <Tx kind="swap" symbol="SOL/XRP" status="confirmed" amount="-15.02 SOL" />
      </div>
    </div>
  );
}

function Tx({
  kind,
  symbol,
  status,
  amount,
}: {
  kind: "send" | "receive" | "swap";
  symbol: string;
  status: "confirmed" | "failed" | "pending";
  amount: string;
}) {
  const statusColor =
    status === "confirmed"
      ? "text-positive"
      : status === "failed"
        ? "text-negative"
        : "text-fg-muted";
  const statusLabel =
    status === "confirmed" ? "✓ Confirmed" : status === "failed" ? "✗ Failed" : "⏱ Pending";

  return (
    <div className="flex items-center gap-2">
      <div className="size-7 rounded-full bg-fg text-bg grid place-items-center">
        <svg viewBox="0 0 24 24" className="size-3" fill="none">
          {kind === "send" && (
            <path d="M5 19 16 8m0 0h-9m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
          {kind === "receive" && (
            <path d="M19 5 8 16m0 0h9m-9 0V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
          {kind === "swap" && (
            <path d="M4 7h13l-3-3M20 17H7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold text-fg leading-tight">{symbol}</div>
        <div className="text-[8px] text-fg-muted capitalize leading-tight">{kind === "swap" ? "Swap" : kind === "send" ? "Send" : "Received"}</div>
      </div>
      <div className={`text-[8px] font-semibold ${statusColor}`}>{statusLabel}</div>
      <div className="text-right ml-1">
        <div className="text-[10px] font-semibold text-fg leading-tight">{amount}</div>
        <div className="text-[8px] text-fg-muted leading-tight">Jun 01, 2025</div>
      </div>
    </div>
  );
}

/* ============================================================
   Trade screen — chart + Long/Short
   ============================================================ */

export function TradeScreen() {
  return (
    <div className="flex-1 px-3 pt-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-fg" fill="none">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5">
          <TokenIcon symbol="ETH" size={20} />
          <div>
            <div className="text-[10px] font-semibold text-fg leading-tight">ETH/USDC</div>
            <div className="text-[8px] text-fg-muted leading-tight">Ethereum</div>
          </div>
        </div>
        <div className="size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-fg" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="text-center mt-1">
        <div className="font-display font-extrabold text-[20px] tracking-tight text-fg">
          $282.09
        </div>
        <div className="text-[9px] text-positive font-semibold">↗ +7.95%</div>
      </div>

      {/* Mini candlestick chart */}
      <div className="rounded-md bg-bg border border-fg/8 p-2 flex-1 relative overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* horizontal grid lines */}
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(10,10,10,0.06)" strokeWidth="0.5" />
          ))}
          {/* candles */}
          {[
            [10, 35, 60, 30, 65, true],
            [22, 30, 70, 25, 75, false],
            [34, 25, 65, 20, 70, true],
            [46, 40, 75, 35, 80, false],
            [58, 50, 80, 45, 85, false],
            [70, 30, 50, 25, 55, true],
            [82, 20, 45, 15, 50, true],
            [94, 25, 55, 20, 60, false],
            [106, 18, 40, 13, 45, true],
            [118, 30, 60, 25, 65, false],
            [130, 22, 48, 17, 53, true],
            [142, 35, 55, 30, 60, true],
            [154, 28, 45, 23, 50, false],
            [166, 18, 38, 13, 43, true],
            [178, 22, 42, 17, 47, true],
          ].map(([x, t, b, hi, lo, up], i) => (
            <g key={i}>
              <line
                x1={x as number}
                y1={hi as number}
                x2={x as number}
                y2={lo as number}
                stroke={up ? "#16a34a" : "#ef4444"}
                strokeWidth="1"
              />
              <rect
                x={(x as number) - 3}
                y={t as number}
                width="6"
                height={(b as number) - (t as number)}
                fill={up ? "#16a34a" : "#ef4444"}
              />
            </g>
          ))}
        </svg>
        <div className="absolute top-1 left-2 text-[8px] text-fg-muted">
          Vol · Ticks
        </div>
      </div>

      {/* Time ranges */}
      <div className="flex items-center justify-between text-[8px] text-fg-muted">
        {["1H", "1D", "1W", "1M", "YTD"].map((t, i) => (
          <span
            key={t}
            className={
              i === 1
                ? "px-2 py-0.5 rounded bg-fg text-bg font-semibold"
                : ""
            }
          >
            {t}
          </span>
        ))}
      </div>

      {/* Long / Short */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-md py-1.5 text-[9px] font-bold text-white text-center" style={{ background: "#16a34a" }}>
          ↗ Long
        </div>
        <div className="rounded-md py-1.5 text-[9px] font-bold text-white text-center" style={{ background: "#ef4444" }}>
          ↘ Short
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Stocks screen — Explore tokenized stocks
   ============================================================ */

export function StocksScreen() {
  return (
    <div className="flex-1 px-3 pt-2 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-fg" fill="none">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 text-center font-display font-extrabold text-[14px] text-fg">
          Explore Stocks
        </div>
        <div className="size-6" />
      </div>

      <div className="rounded-md bg-bg-2 border border-fg/8 px-2 py-1.5 flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" className="size-3 text-fg-muted" fill="none">
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[8px] text-fg-muted">Search stocks</span>
      </div>

      <div className="space-y-1.5 mt-1">
        <StockRow ticker="TSLA" name="Tesla Inc" price="$495.00" change="+10.34%" up logo="tsla" />
        <StockRow ticker="APPL" name="Apple Inc" price="$295.75" change="+10.34%" up logo="appl" />
        <StockRow ticker="AMZN" name="Amazon.com Inc" price="$195.09" change="-9.34%" down logo="amzn" />
        <StockRow ticker="MSFT" name="Microsoft Corp" price="$182.09" change="+9.34%" up logo="msft" />
        <StockRow ticker="NVDA" name="NVIDIA Corp" price="$92.09" change="-5.34%" down logo="nvda" />
        <StockRow ticker="GOOGL" name="Google" price="$202.09" change="+19.34%" up logo="googl" />
        <StockRow ticker="META" name="Meta Platforms" price="$28.09" change="+5.34%" up logo="meta" />
      </div>
    </div>
  );
}

function StockRow({
  ticker,
  name,
  price,
  change,
  up,
  down,
  logo,
}: {
  ticker: string;
  name: string;
  price: string;
  change: string;
  up?: boolean;
  down?: boolean;
  logo: "tsla" | "appl" | "amzn" | "msft" | "nvda" | "googl" | "meta";
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-bg-2 border border-fg/8 px-2 py-1.5">
      <StockLogo kind={logo} />
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-fg leading-tight">{ticker}</div>
        <div className="text-[8px] text-fg-muted leading-tight">{name}</div>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-semibold text-fg leading-tight">{price}</div>
        <div
          className={`text-[8px] font-semibold leading-tight ${
            up ? "text-positive" : down ? "text-negative" : "text-fg-muted"
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );
}

function StockLogo({ kind }: { kind: string }) {
  const wrap = "size-7 rounded-full grid place-items-center text-[10px] font-bold shrink-0";
  if (kind === "tsla")
    return (
      <div className={wrap} style={{ background: "#e31937", color: "#fff" }}>
        T
      </div>
    );
  if (kind === "appl")
    return (
      <div className={wrap} style={{ background: "#fff", color: "#000", border: "1px solid rgba(10,10,10,0.12)" }}>

      </div>
    );
  if (kind === "amzn")
    return (
      <div className={wrap} style={{ background: "#131a22", color: "#ff9900" }}>
        a
      </div>
    );
  if (kind === "msft")
    return (
      <div className={wrap} style={{ background: "#fff", border: "1px solid rgba(10,10,10,0.12)" }}>
        <div className="grid grid-cols-2 gap-px size-3.5">
          <div style={{ background: "#f25022" }} />
          <div style={{ background: "#7fba00" }} />
          <div style={{ background: "#00a4ef" }} />
          <div style={{ background: "#ffb900" }} />
        </div>
      </div>
    );
  if (kind === "nvda")
    return (
      <div className={wrap} style={{ background: "#76b900", color: "#000" }}>
        N
      </div>
    );
  if (kind === "googl")
    return (
      <div className={wrap} style={{ background: "#fff", color: "#4285f4", border: "1px solid rgba(10,10,10,0.12)" }}>
        G
      </div>
    );
  if (kind === "meta")
    return (
      <div className={wrap} style={{ background: "#0668e1", color: "#fff" }}>
        ∞
      </div>
    );
  return <div className={wrap} style={{ background: "#9a9a9a", color: "#fff" }}>?</div>;
}

/* ============================================================
   Place Order screen — LONG ETH/USDC
   ============================================================ */

export function PlaceOrderScreen() {
  return (
    <div className="flex-1 px-3 pt-2 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-md bg-bg-2 border border-fg/8 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-fg" fill="none">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 text-center">
          <div className="font-display font-extrabold text-[12px] text-positive tracking-wide">
            LONG ETH/USDC
          </div>
          <div className="text-[8px] text-fg-muted">ETH</div>
        </div>
        <div className="size-6" />
      </div>

      {/* Balance card */}
      <div className="rounded-lg bg-bg-2 border border-fg/8 p-2">
        <div className="text-center">
          <div className="font-display font-extrabold text-[16px] text-fg">$0.00 USDC</div>
          <div className="text-[8px] text-fg-muted">Available to trade:</div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          <div className="rounded-md bg-fg text-bg text-[9px] py-1.5 text-center font-semibold">
            Deposit
          </div>
          <div className="rounded-md bg-bg border border-fg/10 text-fg text-[9px] py-1.5 text-center font-semibold">
            Withdraw
          </div>
        </div>
      </div>

      <div className="rounded-md bg-bg-2 border border-fg/8 px-2 py-1.5 flex items-center justify-between">
        <span className="text-[9px] text-fg-muted">Market</span>
        <svg viewBox="0 0 24 24" className="size-2.5 text-fg-muted" fill="none">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div>
        <div className="text-[9px] text-fg font-semibold">Size (ETH)</div>
        <div className="rounded-md bg-bg-2 border border-fg/8 px-2 py-1.5 mt-1 text-[12px] font-semibold text-fg">
          1
        </div>
        <div className="text-[8px] text-fg-muted mt-0.5">≈ 93,037.50 USDC</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[8px] text-fg-muted">
        <span className="inline-flex items-center gap-1">
          <span className="size-2.5 rounded-sm border border-fg/30" />
          Reduce Only
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="size-2.5 rounded-sm border border-fg/30" />
          Take Profit / Stop Loss
        </span>
      </div>

      <div>
        <div className="text-[9px] text-fg font-semibold">Margin Mode</div>
        <div className="grid grid-cols-2 gap-1.5 mt-1">
          <div className="rounded-md bg-bg-2 border border-fg/8 text-[9px] py-1.5 text-center text-fg">
            Cross
          </div>
          <div className="rounded-md bg-fg text-bg text-[9px] py-1.5 text-center font-semibold">
            Isolated
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-fg font-semibold">Leverage</span>
          <span className="rounded bg-bg-2 border border-fg/8 px-1.5 text-fg font-semibold">
            55x
          </span>
        </div>
        <div className="text-[8px] text-fg-muted mt-0.5">Max 25x for ETH</div>
        <div className="relative h-1 rounded-full bg-fg/10 mt-1.5">
          <div className="absolute inset-y-0 left-0 w-[78%] bg-fg rounded-full" />
          <div className="absolute top-1/2 left-[78%] -translate-y-1/2 -translate-x-1/2 size-2.5 rounded-full bg-bg border-2 border-fg" />
        </div>
      </div>

      <div className="rounded-md bg-bg-2 border border-fg/8 px-2 py-1.5 flex items-center justify-between">
        <span className="text-[9px] text-fg-muted">Liquidation Price</span>
        <span className="text-[10px] font-semibold text-fg">3,163.35</span>
      </div>

      <div
        className="mt-auto rounded-md py-2 text-center text-[10px] font-bold text-white"
        style={{ background: "#16a34a" }}
      >
        Place Market Long Order
      </div>
    </div>
  );
}

/* ============================================================
   Transactions screen (dark variant)
   ============================================================ */

export function TransactionsScreenDark() {
  return (
    <div className="flex-1 px-3 pt-2 flex flex-col gap-2 text-white">
      <div className="flex items-center justify-between">
        <div className="font-display font-extrabold text-[14px]">
          Transactions
        </div>
        <div
          className="size-5 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #16a34a 0%, #fbbf24 50%, #6366f1 100%)",
          }}
        />
      </div>

      <div className="flex items-center gap-2 rounded-md bg-white/8 border border-white/10 px-2 py-1.5">
        <IdentityAvatar size={20} />
        <div className="flex-1 min-w-0">
          <div className="text-[9px] font-semibold leading-tight">
            Account 1
          </div>
          <div className="text-[7.5px] text-white/50 leading-tight">
            0x5421xd…8745
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="size-3 text-white/60" fill="none">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex-1 rounded-md bg-white/6 border border-white/10 px-2 py-1 flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="size-2.5 text-white/50" fill="none">
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[8px] text-white/50">Search</span>
        </div>
        <div className="size-6 rounded-md bg-white/6 border border-white/10 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-white/60" fill="none">
            <path d="M3 6h18M6 12h12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="space-y-2 mt-1">
        <TxDark kind="send" symbol="BTC" status="confirmed" amount="-0.005 BTC" />
        <TxDark kind="swap" symbol="BNB/XRP" status="failed" amount="-1.02 BNB" />
        <TxDark kind="receive" symbol="SOL" status="pending" amount="+20 SOL" />
        <TxDark kind="send" symbol="ETH" status="confirmed" amount="-10.45 ETH" />
        <TxDark kind="receive" symbol="BTC" status="failed" amount="+0.03 BTC" />
        <TxDark kind="swap" symbol="SOL/XRP" status="confirmed" amount="-15.02 SOL" />
      </div>
    </div>
  );
}

function TxDark({
  kind,
  symbol,
  status,
  amount,
}: {
  kind: "send" | "receive" | "swap";
  symbol: string;
  status: "confirmed" | "failed" | "pending";
  amount: string;
}) {
  const statusColor =
    status === "confirmed"
      ? "text-positive"
      : status === "failed"
        ? "text-negative"
        : "text-white/50";
  const statusLabel =
    status === "confirmed" ? "✓ Confirmed" : status === "failed" ? "✗ Failed" : "⏱ Pending";

  return (
    <div className="flex items-center gap-2">
      <div className="size-7 rounded-full bg-white text-[#0a0a0a] grid place-items-center">
        <svg viewBox="0 0 24 24" className="size-3" fill="none">
          {kind === "send" && (
            <path d="M5 19 16 8m0 0h-9m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
          {kind === "receive" && (
            <path d="M19 5 8 16m0 0h9m-9 0V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
          {kind === "swap" && (
            <path d="M4 7h13l-3-3M20 17H7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-semibold leading-tight">{symbol}</div>
        <div className="text-[8px] text-white/50 capitalize leading-tight">
          {kind === "swap" ? "Swap" : kind === "send" ? "Send" : "Received"}
        </div>
      </div>
      <div className={`text-[8px] font-semibold ${statusColor}`}>{statusLabel}</div>
      <div className="text-right ml-1">
        <div className="text-[10px] font-semibold leading-tight">{amount}</div>
        <div className="text-[8px] text-white/50 leading-tight">Jun 01, 2025</div>
      </div>
    </div>
  );
}

/* ============================================================
   Trade screen (dark variant) — same layout, inverted palette
   ============================================================ */

export function TradeScreenDark() {
  return (
    <div className="flex-1 px-3 pt-2 flex flex-col gap-2 text-white">
      <div className="flex items-center justify-between">
        <div className="size-6 rounded-md bg-white/8 border border-white/10 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none">
            <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5">
          <TokenIcon symbol="ETH" size={20} />
          <div>
            <div className="text-[10px] font-semibold leading-tight">ETH/USDC</div>
            <div className="text-[8px] text-white/50 leading-tight">Ethereum</div>
          </div>
        </div>
        <div className="size-6 rounded-md bg-white/8 border border-white/10 grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="text-center mt-1">
        <div className="font-display font-extrabold text-[20px] tracking-tight text-white">
          $282.09
        </div>
        <div className="text-[9px] text-positive font-semibold">↗ +7.95%</div>
      </div>

      <div className="rounded-md bg-white/4 border border-white/8 p-2 flex-1 relative overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {[20, 40, 60, 80].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="200"
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
            />
          ))}
          {[
            [10, 35, 60, 30, 65, true],
            [22, 30, 70, 25, 75, false],
            [34, 25, 65, 20, 70, true],
            [46, 40, 75, 35, 80, false],
            [58, 50, 80, 45, 85, false],
            [70, 30, 50, 25, 55, true],
            [82, 20, 45, 15, 50, true],
            [94, 25, 55, 20, 60, false],
            [106, 18, 40, 13, 45, true],
            [118, 30, 60, 25, 65, false],
            [130, 22, 48, 17, 53, true],
            [142, 35, 55, 30, 60, true],
            [154, 28, 45, 23, 50, false],
            [166, 18, 38, 13, 43, true],
            [178, 22, 42, 17, 47, true],
          ].map(([x, t, b, hi, lo, up], i) => (
            <g key={i}>
              <line
                x1={x as number}
                y1={hi as number}
                x2={x as number}
                y2={lo as number}
                stroke={up ? "#22c55e" : "#f87171"}
                strokeWidth="1"
              />
              <rect
                x={(x as number) - 3}
                y={t as number}
                width="6"
                height={(b as number) - (t as number)}
                fill={up ? "#22c55e" : "#f87171"}
              />
            </g>
          ))}
        </svg>
        <div className="absolute top-1 left-2 text-[8px] text-white/50">
          Vol · Ticks
        </div>
        <div
          className="absolute right-1.5 top-1.5 rounded px-1.5 py-0.5 text-[8px] font-semibold text-white"
          style={{ background: "#22c55e" }}
        >
          0.1473
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] text-white/50">
        {["1H", "1D", "1W", "1M", "YTD"].map((t, i) => (
          <span
            key={t}
            className={
              i === 1
                ? "px-2 py-0.5 rounded bg-white text-[#0a0a0a] font-semibold"
                : ""
            }
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div
          className="rounded-md py-1.5 text-[9px] font-bold text-white text-center"
          style={{ background: "#16a34a" }}
        >
          ↗ Long
        </div>
        <div
          className="rounded-md py-1.5 text-[9px] font-bold text-white text-center"
          style={{ background: "#ef4444" }}
        >
          ↘ Short
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Receive screen — QR + address
   ============================================================ */

export function ReceiveScreen() {
  return (
    <div className="flex-1 px-3 pt-3 flex flex-col gap-3">
      <div className="text-center font-display font-extrabold text-[13px] text-fg">
        Receive
      </div>

      <div className="rounded-xl bg-bg-2 border border-fg/8 p-3 flex flex-col items-center">
        <div className="text-[9px] text-fg-muted self-start">Receive to</div>
        <div className="self-start text-[9px] font-semibold text-fg mb-2">0x5421L…8745</div>

        <QRPlaceholder />

        <div className="mt-3 self-start w-full">
          <div className="text-[8px] text-fg-muted">Wallet Address</div>
          <div className="text-[8px] font-mono text-fg break-all">
            f4184fc596403b9d638783cf57adfe4c75c605f6356fbc913
            <br />
            38530e983fe9e16
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md py-2 text-[10px] font-semibold text-center bg-bg-2 border border-fg/8 text-fg">
          Copy
        </div>
        <div className="rounded-md py-2 text-[10px] font-semibold text-center bg-fg text-bg">
          Share
        </div>
      </div>
    </div>
  );
}

function QRPlaceholder() {
  // Deterministic stylized QR rendered as a SINGLE inline SVG instead of
  // 441 absolutely-positioned divs. Critical perf: this lives inside a
  // sticky-scrolling phone, so we want the whole QR to be one paintable
  // layer for the compositor.
  const N = 21;
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const isAnchor =
        (y < 7 && x < 7) || (y < 7 && x > 13) || (y > 13 && x < 7);
      if (isAnchor) {
        const cy = y % 7;
        const cx = x % 7;
        const filled =
          cx === 0 ||
          cx === 6 ||
          cy === 0 ||
          cy === 6 ||
          (cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4);
        if (filled) cells.push({ x, y });
      } else {
        const h = (x * 73856093) ^ (y * 19349663) ^ (x * y * 83492791);
        if (((h >>> 8) & 1) === 1) cells.push({ x, y });
      }
    }
  }
  return (
    <div className="bg-white p-1.5 rounded-md">
      <svg
        width={100}
        height={100}
        viewBox={`0 0 ${N} ${N}`}
        shapeRendering="crispEdges"
        aria-hidden
      >
        {cells.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width="1" height="1" fill="#0a0a0a" />
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   Swap screen
   ============================================================ */

export function SwapScreen() {
  return (
    <div className="flex-1 px-3 pt-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-md bg-bg-2 border border-fg/8 px-2 py-1">
          <IdentityAvatar size={16} />
          <span className="text-[8px] font-semibold text-fg">0x701C…919F</span>
          <svg viewBox="0 0 24 24" className="size-2.5 text-fg-muted" fill="none">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="text-[8px] text-fg-muted rounded-md bg-bg-2 border border-fg/8 px-2 py-1">
          Slippage
        </div>
      </div>

      <SwapCard label="Pay" symbol="ETH" amount="0.000" available="25,345.89" />
      <div className="grid place-items-center -my-1">
        <div className="size-7 rounded-full bg-fg text-bg grid place-items-center">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
            <path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <SwapCard label="Receive" symbol="USDT" amount="0.000" available="25,345.89" />

      <div className="mt-1 rounded-md py-2 text-[10px] font-semibold text-center bg-fg text-bg">
        Confirm Swap
      </div>
    </div>
  );
}

function SwapCard({
  label,
  symbol,
  amount,
  available,
}: {
  label: string;
  symbol: string;
  amount: string;
  available: string;
}) {
  return (
    <div className="rounded-lg bg-bg-2 border border-fg/8 p-2.5">
      <div className="flex items-center justify-between">
        <div className="text-[9px] text-fg-muted">{label}</div>
        <div className="text-[8px] text-fg-muted">Max</div>
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex items-center gap-1.5 rounded-md bg-bg border border-fg/8 px-1.5 py-1">
          <TokenIcon symbol={symbol} size={16} />
          <span className="text-[10px] font-semibold text-fg">{symbol}</span>
          <svg viewBox="0 0 24 24" className="size-2.5 text-fg-muted" fill="none">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="font-display text-[16px] font-extrabold text-fg tracking-tight">
          {amount}
        </div>
      </div>
      <div className="text-[8px] text-fg-muted mt-1">Available: {available}</div>
    </div>
  );
}
