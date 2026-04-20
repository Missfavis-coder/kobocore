import { cn } from "@/lib/utils";
interface Transaction {
    id: string;
    reference: string;
    type: "CREDIT" | "DEBIT";
    amount: number;
    status: "SUCCESS" | "PENDING" | "FAILED";
    description: string;
    createdAt: string;
  }
  


export const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
    const styles = {
      SUCCESS: "bg-emerald-500/40 text-emerald-700 dark:text-white",
      PENDING: "bg-amber-500/40 text-amber-700 dark:text-white",
      FAILED: "bg-red-500/40 text-red-700 dark:text-white",
    };

    return (
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "text-[8px] font-bold uppercase p-2 rounded-full tracking-widest",
            styles[status]
          )}
        >
          {status}
        </span>
      </div>
    );
  };