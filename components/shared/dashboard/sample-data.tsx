/**
 * Updated to match KoboCore Domain Model (Page 15 of Architecture PDF)
 */
interface Transaction {
  id: string;
  reference: string;
  // KoboCore Types: 
  // FUNDING = Bank to NGN, 
  // EXCHANGE = NGN to Points, 
  // SETTLEMENT = Sending Points to User
  type: "FUNDING" | "EXCHANGE" | "SETTLEMENT" | "WITHDRAWAL";
  direction: "IN" | "OUT"; 
  amount: number; // Always integers (Kobo/Points)
  asset: "NGN" | "PTS";
  // HELD: Money is locked in Escrow
  // DISPUTED: Transaction is flagged for Admin review
  status: "SUCCESS" | "PENDING" | "FAILED" | "HELD" | "DISPUTED";
  description: string;
  createdAt: string;
}

export const transactions: Transaction[] = [
  {
    id: "TX-KC-001",
    reference: "KC-SET-92831",
    description: "Escrow Transfer to @merchant_alpha",
    type: "SETTLEMENT",
    direction: "OUT",
    asset: "PTS",
    amount: 50000,
    status: "SUCCESS",
    createdAt: "2026-04-20T10:30:00Z",
  },
  {
    id: "TX-KC-002",
    reference: "KC-FND-11223",
    description: "Wallet Top-up via Bank Transfer",
    type: "FUNDING",
    direction: "IN",
    asset: "NGN",
    amount: 12000000, // 120,000.00 stored as 12,000,000 (Integers only)
    status: "SUCCESS",
    createdAt: "2026-04-19T14:12:00Z",
  },
  {
    id: "TX-KC-003",
    reference: "KC-EXC-77889",
    description: "NGN to Settlement Points Exchange",
    type: "EXCHANGE",
    direction: "OUT", // NGN goes OUT of NGN wallet, IN to Points wallet
    asset: "NGN",
    amount: 45000,
    status: "SUCCESS",
    createdAt: "2026-04-18T09:45:00Z",
  },
  {
    id: "TX-KC-004",
    reference: "KC-SET-44556",
    description: "Active Deal with @design_pro",
    type: "SETTLEMENT",
    direction: "OUT",
    asset: "PTS",
    amount: 30000,
    status: "HELD", // Locked in Escrow
    createdAt: "2026-04-17T16:20:00Z",
  },
  {
    id: "TX-KC-005",
    reference: "KC-SET-99112",
    description: "Flagged Transfer to @shady_vendor",
    type: "SETTLEMENT",
    direction: "OUT",
    asset: "PTS",
    amount: 30000,
    status: "DISPUTED", // Under review by Admin
    createdAt: "2026-04-16T11:05:00Z",
  },
  {
    id: "TX-KC-006",
    reference: "KC-WTH-22334",
    description: "Bank Withdrawal Request",
    type: "WITHDRAWAL",
    direction: "OUT",
    asset: "NGN",
    amount: 8000000,
    status: "PENDING",
    createdAt: "2026-04-15T08:10:00Z",
  },
  {
    id: "TX-KC-007",
    reference: "KC-SET-55667",
    description: "Automated Escrow Release (14-day limit)",
    type: "SETTLEMENT",
    direction: "OUT",
    asset: "PTS",
    amount: 150000,
    status: "SUCCESS",
    createdAt: "2026-04-14T19:00:00Z",
  },
];