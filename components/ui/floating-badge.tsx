"use client";


interface FloatingBadgeProps {
  text?: string;
  showPulse?: boolean;
  className?: string;
  variant?: "default" | "success" | "warning" | "info";
}

export function FloatingBadge({ 
  text = "AI Powered", 
  showPulse = true, 
  className = "",
  variant = "default"
}: FloatingBadgeProps) {
  const variants = {
    default: "bg-gradient-to-r from-cyan-500 to-cyan-600",
    success: "bg-gradient-to-r from-green-500 to-green-600",
    warning: "bg-gradient-to-r from-orange-500 to-orange-600",
    info: "bg-gradient-to-r from-blue-500 to-blue-600"
  };

  return (
    <div 
      className={`absolute -top-4 -right-4 ${variants[variant]} text-white px-4 py-2 rounded-full shadow-lg ${className}`}
    >
      <div className="flex items-center gap-2">
        {showPulse && (
          <div 
            className="w-2 h-2 bg-white rounded-full"
          />
        )}
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  );
}
