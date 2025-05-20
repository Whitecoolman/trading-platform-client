// User & Auth
export interface User {
  id: string;
  email: string;
  password?: string;
  picture?: string;
}

// Trading
export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  lots: number;
  profit: number;
  profitPercentage: number;
  status: 'open' | 'closed';
  openTime: string;
  closeTime?: string;
  source: {
    type: 'webhook' | 'copy_trade';
    name: string;
    id: string;
  };
}

// Alerts
export interface Alert {
  id: string;
  type: 'trade' | 'system' | 'webhook';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  metadata?: Record<string, any>;
}

export interface AlertParams {
  id: string;
  webhookAction?: 'market_execution' | 'modify_order' | 'close_trade';
  webhookName: string;
  message: string;
  traderAvatar?: string;
  symbol?: string;
  stopLoss?: number;
  takeProfit?: number;
  volume?: number;
  orderDirection?: 'buy' | 'sell';
}

// Webhooks
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  symbols: string[];
  isActive: boolean;
  isPublic: boolean;
  type: 'basic' | 'advanced';
  settings: {
    riskManagement: {
      maxDailyLoss?: number;
      maxDrawdown?: number;
      newsFilter: boolean;
    };
    tradingHours?: {
      enabled: boolean;
      timezone: string;
      start: string;
      end: string;
      days: string[];
    };
  };
  stats?: {
    totalTrades: number;
    winRate: number;
    profit: number;
    subscribers?: number;
  };
}

// API Responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

// Subscription & Payments
export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  limits: {
    webhooks: number;
    copyTraders: number;
    alerts: number;
  };
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// Telegram Types
export interface TelegramConfig {
  enabled: boolean;
  chatId?: string;
  notifications: {
    trades: boolean;
    signals: boolean;
    alerts: boolean;
    performance: boolean;
    risk: boolean;
  };
}

export interface Profile {
  email: string;
  name: string;
  bio: string;
  tradingViewAccount: string;
  twitterAccount: string;
  youtubeChannel: string;
  youtubeUserName: string;
  websiteURL: string;
  publicUserName: string;
  publicRole: boolean;
}