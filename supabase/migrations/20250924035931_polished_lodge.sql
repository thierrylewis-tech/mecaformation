/*
  # Create payments and subscriptions system

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `type` (text, check constraint)
      - `stripe_product_id` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `prices`
      - `id` (uuid, primary key)
      - `product_id` (uuid, references products)
      - `amount` (integer, amount in cents)
      - `currency` (text)
      - `interval` (text, for subscriptions)
      - `stripe_price_id` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `product_id` (uuid, references products)
      - `price_id` (uuid, references prices)
      - `stripe_subscription_id` (text)
      - `status` (text)
      - `current_period_start` (timestamp)
      - `current_period_end` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `subscription_id` (uuid, references subscriptions, nullable)
      - `stripe_payment_intent_id` (text)
      - `amount` (integer)
      - `currency` (text)
      - `status` (text)
      - `description` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to view their own data
    - Add policies for admins to manage all data
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type text CHECK (type IN ('subscription', 'one_time', 'service')) NOT NULL,
  stripe_product_id text UNIQUE,
  is_active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create prices table
CREATE TABLE IF NOT EXISTS prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products ON DELETE CASCADE NOT NULL,
  amount integer NOT NULL, -- Amount in cents
  currency text DEFAULT 'eur',
  interval text CHECK (interval IN ('month', 'year', 'one_time')) DEFAULT 'one_time',
  stripe_price_id text UNIQUE,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products ON DELETE CASCADE NOT NULL,
  price_id uuid REFERENCES prices ON DELETE CASCADE NOT NULL,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id text,
  status text CHECK (status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid')) DEFAULT 'incomplete',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  subscription_id uuid REFERENCES subscriptions ON DELETE SET NULL,
  stripe_payment_intent_id text UNIQUE,
  amount integer NOT NULL, -- Amount in cents
  currency text DEFAULT 'eur',
  status text CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled', 'requires_action')) DEFAULT 'pending',
  description text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Products policies (public read for active products)
CREATE POLICY "Public can view active products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Prices policies (public read for active prices)
CREATE POLICY "Public can view active prices"
  ON prices
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at trigger to subscriptions
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial products and prices
INSERT INTO products (name, description, type, metadata) VALUES
  ('Accès CAP MVA', 'Accès mensuel aux cours CAP Maintenance Véhicules', 'subscription', '{"level": "CAP", "category": "access"}'),
  ('Accès BAC PRO MVA', 'Accès mensuel aux cours Bac Pro Maintenance', 'subscription', '{"level": "BAC_PRO", "category": "access"}'),
  ('Accès Premium', 'Accès complet toutes formations et spécialisations', 'subscription', '{"level": "PREMIUM", "category": "access"}'),
  ('Formation CAP Complète', 'Formation CAP MVA avec certification officielle', 'one_time', '{"level": "CAP", "category": "certification"}'),
  ('Coaching Primo-Arrivants', 'Accompagnement personnalisé primo-arrivants', 'one_time', '{"category": "coaching", "target": "primo"}'),
  ('Coaching Garages Pro', 'Formation équipe garage complète', 'one_time', '{"category": "coaching", "target": "garage"}'),
  ('Diagnostic Express', 'Diagnostic automobile rapide', 'service', '{"category": "diagnostic", "duration": "15min"}'),
  ('Diagnostic Complet', 'Diagnostic automobile approfondi', 'service', '{"category": "diagnostic", "duration": "45min"}'),
  ('Diagnostic Mercedes Expert', 'Diagnostic Mercedes par expert certifié', 'service', '{"category": "diagnostic", "brand": "mercedes"}'
);

-- Insert corresponding prices
INSERT INTO prices (product_id, amount, interval) 
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Accès CAP MVA' THEN 1300 -- 13€
    WHEN p.name = 'Accès BAC PRO MVA' THEN 1500 -- 15€
    WHEN p.name = 'Accès Premium' THEN 2200 -- 22€
    WHEN p.name = 'Formation CAP Complète' THEN 89000 -- 890€
    WHEN p.name = 'Coaching Primo-Arrivants' THEN 89000 -- 890€
    WHEN p.name = 'Coaching Garages Pro' THEN 149000 -- 1490€
    WHEN p.name = 'Diagnostic Express' THEN 1500 -- 15€
    WHEN p.name = 'Diagnostic Complet' THEN 5900 -- 59€
    WHEN p.name = 'Diagnostic Mercedes Expert' THEN 8900 -- 89€
  END,
  CASE 
    WHEN p.type = 'subscription' THEN 'month'
    ELSE 'one_time'
  END
FROM products p;