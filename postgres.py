import psycopg2
import json
import uuid

# Database connection details
DB_CONFIG = {
    "host": "localhost",
    "database": "form_generator",
    "user": "postgres",
    "password": "MYSQL123",
    "port": 5432
}

# Path to the JSON file
json_file_path = "/Users/L093099/Desktop/Form-Generator-POC-main/formStore.json"

try:
    # Read JSON from file
    with open(json_file_path, "r") as file:
        json_data = json.load(file)

    # Connect to PostgreSQL
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    # Insert Forms into `forms` table
    for form_id_str, value in json_data.items():
        try:
            form_id = str(uuid.UUID(form_id_str))  # Convert key to UUID
            form_data = value.get("formDefinition", value)  # Handle nested JSON
            
            if "title" in form_data and "layout" in form_data:
                cur.execute(
                    "INSERT INTO forms (id, title, layout) VALUES (%s, %s, %s) "
                    "ON CONFLICT (id) DO NOTHING",
                    (form_id, form_data["title"], form_data["layout"])
                )

                # Insert Fields into `form_fields`
                if "fields" in form_data:
                    for field in form_data["fields"]:
                        cur.execute(
                            "INSERT INTO form_fields (form_id, name, label, type, required, options, position) "
                            "VALUES (%s, %s, %s, %s, %s, %s, %s)",
                            (
                                form_id,
                                field["name"],
                                field["label"],
                                field["type"],
                                field.get("required", False),
                                field.get("options", None),  # Directly pass None or a list
                                field.get("position", None)
                            )
                        )

        except ValueError:
            print(f"Skipping invalid UUID: {form_id_str}")
            continue

    # Insert Tables into `table_definitions`
    for table_id_str, value in json_data.items():
        try:
            table_id = str(uuid.UUID(table_id_str))  # Convert to UUID
            table_data = value.get("tableDefinition")

            if table_data and "title" in table_data:
                cur.execute(
                    "INSERT INTO table_definitions (id, title) VALUES (%s, %s) "
                    "ON CONFLICT (id) DO NOTHING",
                    (table_id, table_data["title"])
                )

                # Insert Table Columns into `table_columns`
                if "columns" in table_data:
                    for column in table_data["columns"]:
                        cur.execute(
                            "INSERT INTO table_columns (table_id, name, type) VALUES (%s, %s, %s)",
                            (table_id, column["name"], column["type"])
                        )

        except ValueError:
            print(f"Skipping invalid UUID: {table_id_str}")
            continue

    # Commit changes
    conn.commit()
    print(f"Data successfully inserted from {json_file_path}")

except FileNotFoundError:
    print(f"Error: JSON file not found at {json_file_path}")

except psycopg2.Error as db_error:
    print(f"Database Error: {db_error}")

except json.JSONDecodeError:
    print(f"Error: Invalid JSON format in {json_file_path}")

except Exception as error:
    print(f"Unexpected Error: {error}")

finally:
    if 'cur' in locals() and cur:
        cur.close()
    if 'conn' in locals() and conn:
        conn.close()