CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL, 
    image TEXT,
    password_hash TEXT,
    email_verified TIMESTAMPTZ,
    session_version INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE auth_provider AS ENUM (
    'Google'
);

CREATE TABLE accounts (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider auth_provider NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    expires_at TIMESTAMPTZ,

    PRIMARY KEY (provider, provider_account_id)
);

CREATE INDEX idx_accounts_user_id ON accounts(user_id);

CREATE TYPE sex_type AS ENUM (
    'Male',
    'Female'
);

CREATE TYPE activity_level AS ENUM (
    'sedentary',
    'light',
    'moderate',
    'active',
    'very_active'
);

CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    sex sex_type NOT NULL,
    birth_date DATE NOT NULL,
    height_cm NUMERIC(5, 2) NOT NULL CHECK (height_cm > 0),
    default_activity activity_level NOT NULL
);


CREATE TABLE measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    weight_kg NUMERIC(5, 2) NOT NULL CHECK (weight_kg > 0),
    height_cm NUMERIC(5, 2) NOT NULL CHECK (height_cm > 0),
    age_at_measure INTEGER NOT NULL CHECK (age_at_measure > 0),
    sex sex_type NOT NULL,
    activity_level activity_level NOT NULL,
    activity_factor NUMERIC(4, 3) NOT NULL CHECK (activity_factor > 0),
    body_fat_percent NUMERIC(5, 2) CHECK (body_fat_percent BETWEEN 0 AND 100),
    bmi NUMERIC(5, 2) NOT NULL CHECK (bmi > 0),
    bmr NUMERIC(8, 2) NOT NULL CHECK (bmr > 0),
    tdee NUMERIC(8, 2) NOT NULL CHECK (tdee > 0),
    formula VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_measurements_user_id ON measurements(user_id);

CREATE TABLE goals (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    target_weight_kg NUMERIC(5, 2) NOT NULL CHECK (target_weight_kg > 0),
    target_date DATE
);

CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ
);

CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
