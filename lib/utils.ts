import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatToKobo = (
  amount: number,
  currency: string = "NGN"
) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount / 100);
}; 

export const formatCurrency = (amount: number, type: "CREDIT" | "DEBIT") => {
    const naira = amount / 100;
    const formatted = naira.toLocaleString();

    return type === "CREDIT" ? `+₦${formatted}` : `-₦${formatted}`;
  };

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  type Transaction = {
    type: "CREDIT" | "DEBIT";
    amount: number; 
  };
  
  export const calculateStats = (transactions: Transaction[]) => {
    let income = 0;
    let expense = 0;
  
    transactions.forEach((txn) => {
      if (txn.type === "CREDIT") {
        income += txn.amount;
      } else {
        expense += txn.amount;
      }
    });
  
    return { income, expense };
  };