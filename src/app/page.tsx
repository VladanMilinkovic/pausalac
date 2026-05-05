import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const plans = [
  { name: "Netflix", amount: "$14.99", cadence: "Monthly", status: "Active" },
  { name: "Figma", amount: "$12.00", cadence: "Monthly", status: "Active" },
  { name: "ChatGPT", amount: "$20.00", cadence: "Monthly", status: "Renews soon" },
];

export default function Home() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: "var(--space-xxl) var(--space-lg)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "58rem",
          display: "grid",
          gap: "var(--space-xl)",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--space-md)",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: "var(--color-text-muted)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              Subscription Tracker
            </p>
            <h1
              style={{
                margin: "var(--space-xs) 0 0",
                color: "var(--color-text-primary)",
                fontSize: "var(--font-size-xl)",
                lineHeight: "var(--line-height-tight)",
              }}
            >
              Portfolio Overview
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <article
          style={{
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            padding: "var(--space-xl)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Total Monthly Spend
          </p>
          <p
            style={{
              margin: "var(--space-sm) 0 0",
              color: "var(--color-text-primary)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              lineHeight: "var(--line-height-tight)",
            }}
          >
            $46.99
          </p>
          <p
            style={{
              margin: "var(--space-sm) 0 0",
              color: "var(--color-positive)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
            }}
          >
            +3.5% from last month
          </p>
        </article>

        <article
          style={{
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            padding: "var(--space-xl)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "var(--space-lg)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "var(--color-text-primary)",
                fontSize: "var(--font-size-lg)",
              }}
            >
              Active Plans
            </h2>
            <Link
              href="/settings"
              style={{
                color: "var(--color-accent)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "var(--font-size-sm)",
              }}
            >
              Open settings
            </Link>
          </div>

          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: "var(--space-sm)",
            }}
          >
            {plans.map((plan) => (
              <li
                key={plan.name}
                style={{
                  display: "grid",
                  gap: "var(--space-xs)",
                  gridTemplateColumns: "1fr auto auto",
                  alignItems: "center",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--surface-elevated)",
                  border: "1px solid var(--surface-border)",
                  padding: "var(--space-md) var(--space-lg)",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {plan.name}
                  </p>
                  <p
                    style={{
                      margin: "var(--space-xs) 0 0",
                      color: "var(--color-text-muted)",
                      fontSize: "var(--font-size-sm)",
                    }}
                  >
                    {plan.cadence}
                  </p>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  {plan.status}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-family-mono)",
                    fontWeight: 700,
                  }}
                >
                  {plan.amount}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
