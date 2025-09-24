/*
  # Create user profiles and authentication system

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `profile_type` (text, check constraint)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `student_profiles`
      - `id` (uuid, references profiles, primary key)
      - `birth_date` (date)
      - `address` (text)
      - `city` (text)
      - `postal_code` (text)
      - `education_level` (text)
      - `employment_status` (text)
      - `motivation_letter` (text)
      - `financing_type` (text)
      - `created_at` (timestamp)
    
    - `garage_profiles`
      - `id` (uuid, references profiles, primary key)
      - `company_name` (text)
      - `siret` (text)
      - `address` (text)
      - `city` (text)
      - `postal_code` (text)
      - `team_size` (integer)
      - `specializations` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
    - Add policies for admins to manage all data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  profile_type text CHECK (profile_type IN ('student', 'garage', 'admin')) DEFAULT 'student',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid REFERENCES profiles ON DELETE CASCADE PRIMARY KEY,
  birth_date date,
  address text,
  city text,
  postal_code text,
  education_level text,
  employment_status text,
  motivation_letter text,
  financing_type text,
  created_at timestamptz DEFAULT now()
);

-- Create garage profiles table
CREATE TABLE IF NOT EXISTS garage_profiles (
  id uuid REFERENCES profiles ON DELETE CASCADE PRIMARY KEY,
  company_name text NOT NULL,
  siret text,
  address text,
  city text,
  postal_code text,
  team_size integer,
  specializations text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE garage_profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Student profiles policies
CREATE POLICY "Students can manage own profile"
  ON student_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Garage profiles policies
CREATE POLICY "Garages can manage own profile"
  ON garage_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();