"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Token = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  color: string;
  logo: string;
};

// Pair definitions for Binance public spot tickers (no API key needed,
// CORS-enabled). USDT itself isn't traded against itself so we hard-code it
// at $1.00. Logos are CoinGecko-hosted PNGs at stable URLs.
const PAIRS: Array<{
  symbol: string;
  pair: string | null;
  name: string;
  color: string;
  logo: string;
}> = [
  {
    symbol: "BTC",
    pair: "BTCUSDT",
    name: "Bitcoin",
    color: "#f7931a",
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    symbol: "ETH",
    pair: "ETHUSDT",
    name: "Ethereum",
    color: "#627eea",
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    symbol: "SOL",
    pair: "SOLUSDT",
    name: "Solana",
    color: "#9945ff",
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  },
  {
    symbol: "BNB",
    pair: "BNBUSDT",
    name: "BNB",
    color: "#f3ba2f",
    logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  },
  {
    symbol: "AVAX",
    pair: "AVAXUSDT",
    name: "Avalanche",
    color: "#e84142",
    logo: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  },
  {
    symbol: "DOGE",
    pair: "DOGEUSDT",
    name: "Dogecoin",
    color: "#c2a633",
    logo: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  },
  {
    symbol: "ADA",
    pair: "ADAUSDT",
    name: "Cardano",
    color: "#3cc8c8",
    logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
  },
  {
    symbol: "TRX",
    pair: "TRXUSDT",
    name: "TRON",
    color: "#ef4444",
    logo: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
  },
  {
    symbol: "BAND",
    pair: "BANDUSDT",
    name: "Band Protocol",
    color: "#1a1a1a",
    logo: "https://assets.coingecko.com/coins/images/9545/small/band-protocol.png",
  },
  {
    symbol: "USDT",
    pair: null,
    name: "Tether",
    color: "#26a17b",
    logo: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  },
];

const FALLBACK: Token[] = PAIRS.map((p) => ({
  symbol: p.symbol,
  name: p.name,
  price: "—",
  change: "—",
  up: true,
  color: p.color,
  logo: p.logo,
}));

function formatPrice(value: number): string {
  if (!isFinite(value)) return "—";
  if (value >= 1000)
    return `$${value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(6)}`;
}

function formatChange(value: number): string {
  if (!isFinite(value)) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

type BinanceTicker = {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
};

async function fetchBinanceTickers(
  pairs: string[]
): Promise<Map<string, BinanceTicker>> {
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(
    JSON.stringify(pairs)
  )}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Binance ${res.status}`);
  const data: BinanceTicker[] = await res.json();
  const map = new Map<string, BinanceTicker>();
  for (const t of data) map.set(t.symbol, t);
  return map;
}

export default function PriceTicker() {
  const [tokens, setTokens] = useState<Token[]>(FALLBACK);
  const [marketChange, setMarketChange] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const aborted = useRef(false);

  useEffect(() => {
    aborted.current = false;
    const wantedPairs = PAIRS.map((p) => p.pair).filter(
      (p): p is string => !!p
    );

    async function refresh() {
      try {
        const map = await fetchBinanceTickers(wantedPairs);
        if (aborted.current) return;

        const next: Token[] = PAIRS.map((p) => {
          if (!p.pair) {
            return {
              symbol: p.symbol,
              name: p.name,
              price: "$1.00",
              change: "+0.01%",
              up: true,
              color: p.color,
              logo: p.logo,
            };
          }
          const tick = map.get(p.pair);
          if (!tick) {
            return {
              symbol: p.symbol,
              name: p.name,
              price: "—",
              change: "—",
              up: true,
              color: p.color,
              logo: p.logo,
            };
          }
          const priceNum = parseFloat(tick.lastPrice);
          const changeNum = parseFloat(tick.priceChangePercent);
          return {
            symbol: p.symbol,
            name: p.name,
            price: formatPrice(priceNum),
            change: formatChange(changeNum),
            up: changeNum >= 0,
            color: p.color,
            logo: p.logo,
          };
        });

        // Simple-average market sentiment (excluding USDT)
        let sum = 0;
        let count = 0;
        for (const p of PAIRS) {
          if (!p.pair) continue;
          const tick = map.get(p.pair);
          if (!tick) continue;
          const v = parseFloat(tick.priceChangePercent);
          if (isFinite(v)) {
            sum += v;
            count++;
          }
        }
        const avg = count > 0 ? sum / count : null;

        setTokens(next);
        setMarketChange(avg);
        setIsLive(true);
        // Format on the client to avoid SSR/locale mismatch.
        const now = new Date();
        setLastUpdate(
          `${String(now.getHours()).padStart(2, "0")}:${String(
            now.getMinutes()
          ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
        );
      } catch {
        setIsLive(false);
      }
    }

    refresh();
    const id = setInterval(refresh, 30_000);
    return () => {
      aborted.current = true;
      clearInterval(id);
    };
  }, []);

  const loop = [...tokens, ...tokens];
  const headerChange =
    marketChange !== null ? formatChange(marketChange) : null;
  const headerUp = (marketChange ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Header rail — Crypto Market live status */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center justify-between text-[11px] text-fg-muted">
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span
                className={`absolute inline-flex size-1.5 rounded-full opacity-75 ${
                  isLive ? "bg-positive animate-ping" : "bg-fg-dim"
                }`}
              />
              <span
                className={`relative inline-flex size-1.5 rounded-full ${
                  isLive ? "bg-positive" : "bg-fg-dim"
                }`}
              />
            </span>
            <span className="font-semibold text-fg">Crypto Market</span>
            <span
              className="font-semibold tabular-nums"
              style={{
                color: headerChange
                  ? headerUp
                    ? "#16a34a"
                    : "#ef4444"
                  : "var(--color-fg-dim)",
              }}
            >
              {headerChange ?? "syncing…"}
            </span>
            <span className="text-fg-dim">· past 24h</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-fg-dim">
            <span>{isLive ? "Live" : "Offline"}</span>
            <span>·</span>
            <span>USD</span>
            <span suppressHydrationWarning>
              {lastUpdate ? `· ${lastUpdate}` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="mt-3 relative"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex gap-2.5 animate-marquee w-max">
          {loop.map((t, i) => (
            <div
              key={`${t.symbol}-${i}`}
              className="flex items-center gap-2.5 rounded-full border border-fg/10 bg-bg/80 backdrop-blur-md pl-1 pr-3.5 py-1"
            >
              <div
                className="size-6 rounded-full overflow-hidden bg-white shrink-0 grid place-items-center"
                style={{ borderColor: `${t.color}55` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.logo}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[12px] font-semibold text-fg">
                  {t.symbol}
                </span>
                <span className="text-[12px] font-medium text-fg tabular-nums">
                  {t.price}
                </span>
                <span
                  className="text-[11px] font-semibold tabular-nums"
                  style={{
                    color:
                      t.change === "—"
                        ? "var(--color-fg-dim)"
                        : t.up
                          ? "#16a34a"
                          : "#ef4444",
                  }}
                >
                  {t.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
