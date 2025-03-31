from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import psycopg2
import uuid
import json

app = FastAPI()

# Database connection setup
DB_CONFIG = {
    "dbname": "form_generator",
    "user": "postgres",
    "password": "MYSQL123",
    "host": "localhost",
    "port": 5432
}

# Pydantic model for form input
class FormField(BaseModel):
    name: str
    label: str
    type: str
    required: bool = False
    options: list[str] = []
    position: str

class FormData(BaseModel):
    title: str
    layout: str
    fields: list[FormField]

@app.post("/forms/")
def save_form(form_data: FormData):
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        form_id = str(uuid.uuid4())

        # Insert into forms table
        cursor.execute(
            "INSERT INTO forms (id, title, layout) VALUES (%s, %s, %s)",
            (form_id, form_data.title, form_data.layout)
        )

        # Insert form fields
        for field in form_data.fields:
            cursor.execute(
                "INSERT INTO form_fields (id, form_id, name, label, type, required, options, position) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                (str(uuid.uuid4()), form_id, field.name, field.label, field.type, field.required, json.dumps(field.options), field.position)
            ) 

        conn.commit()
        return {"message": "Form saved successfully!"}

    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()
