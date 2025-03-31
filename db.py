import psycopg2
import json
import uuid

# Database connection setup
DB_CONFIG = {
    "host": "localhost",
    "database": "form_generator",
    "user": "postgres",
    "password": "MYSQL123",
    "port": 5432
}

# Load JSON data from a file
JSON_FILE_PATH = "/Users/L093099/Desktop/Form-Generator-POC-main/formStore.json"  # Update this with your JSON file path

try:
    with open(JSON_FILE_PATH, "r") as file:
        data = json.load(file)

    # Connect to the database
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    for form_id, details in data.items():
        form_id_str = str(uuid.UUID(form_id))  # ✅ Convert UUID to string

        # Check if it's a form
        if "formDefinition" in details:
            form_title = details["formDefinition"]["title"]
            layout = details["formDefinition"].get("layout", "")
            fields_json = json.dumps(details["formDefinition"]["fields"])  # Convert fields to JSON

            # Insert into `forms_2` (storing fields as JSONB)
            cursor.execute("""
                INSERT INTO forms_2 (id, title, layout, fields) 
                VALUES (%s, %s, %s, %s) 
                ON CONFLICT (id) DO UPDATE SET fields = EXCLUDED.fields
            """, (form_id_str, form_title, layout, fields_json))  # ✅ Using str(UUID)

        # Check if it's a table definition
        elif "tableDefinition" in details:
            table_title = details["tableDefinition"]["title"]
            columns_json = json.dumps(details["tableDefinition"]["columns"])  # Convert columns to JSON

            # Insert into `table_definitions_2` (storing columns as JSONB)
            cursor.execute("""
                INSERT INTO table_definitions_2 (id, title, columns) 
                VALUES (%s, %s, %s) 
                ON CONFLICT (id) DO UPDATE SET columns = EXCLUDED.columns
            """, (form_id_str, table_title, columns_json))  # ✅ Using str(UUID)

    # Commit changes
    conn.commit()
    print("✅ Data inserted successfully!")

except Exception as e:
    print("❌ Error:", e)

finally:
    if conn:
        cursor.close()
        conn.close()
