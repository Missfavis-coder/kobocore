export type AccountData = {
  firstName: string;
  lastName: string;
  email: string;
  kycStatus: "UNVERIFIED" | "PENDING" | "VERIFIED";
  tier: number;
};
  
  export type SecuritySettings = {
    twoFA: boolean;
    loginAlerts: boolean;
    withdrawalPin: boolean;
    sessionTimeout: "15m" | "1h" | "24h";
  };
  
  export type DeveloperData = {
    apiKey: string;
    webhookUrl: string;
  };