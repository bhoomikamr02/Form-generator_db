CREATE TABLE forms (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    layout TEXT
)

CREATE TABLE form_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    required BOOLEAN DEFAULT FALSE,
    options TEXT[] DEFAULT NULL,
    position TEXT
)

CREATE TABLE tables (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL
)

CREATE TABLE table_columns (
    id SERIAL PRIMARY KEY,
    table_id UUID REFERENCES tables(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL
)CREATE TABLE forms (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    layout TEXT
);

-- Create `form_fields` table with foreign key reference to `forms`
CREATE TABLE form_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    required BOOLEAN DEFAULT FALSE,
    options TEXT[] DEFAULT NULL,
    position TEXT
);

-- Create `table_definitions` table (renamed from `tables`)
CREATE TABLE table_definitions (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL
);

-- Create `table_columns` table with reference to `table_definitions`
CREATE TABLE table_columns (
    id SERIAL PRIMARY KEY,
    table_id UUID REFERENCES table_definitions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL
)



CREATE TABLE forms_2 (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    layout TEXT,
    fields JSONB  -- Store all form fields as a JSON array
)

CREATE TABLE table_definitions_2 (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    columns JSONB  -- Store table columns as a JSON array
)