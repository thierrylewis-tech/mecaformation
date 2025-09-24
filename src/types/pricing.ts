export interface PricingPlan {
  id: string;
  name: string;
  type: 'subscription' | 'one_time';
  monthlyPrice?: number;
  oneTimePrice?: number;
  stripeProductId?: string;
  stripePriceId?: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
}

export interface FormationPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  subscriptionPrice?: number;
  stripeProductId?: string;
  stripePriceId?: string;
  features: string[];
  category: string;
}

export interface DiagnosticService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  stripeProductId?: string;
  stripePriceId?: string;
}