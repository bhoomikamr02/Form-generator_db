from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app **before** using `app.add_middleware`
app = FastAPI()

#  Add CORS middleware **after** defining `app`
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust allowed origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request validation
class FormData(BaseModel):
    title: str
    layout: str

class FormFieldData(BaseModel):
    form_id: str
    name: str
    label: str
    type: str
    required: bool = False
    options: list[str] = []
    position: str

class TableData(BaseModel):  # Fixed typo `BaseMode` → `BaseModel`
    title: str

class TableColumnData(BaseModel):
    table_id: str
    name: str
    type: str

# Routes for handling forms
@app.post("/forms/")
def create_form(data: FormData, db: Session = Depends(get_db)):
    new_form = models.FormTable(**data.dict())
    db.add(new_form)
    db.commit()
    db.refresh(new_form)
    return {"message": "Form saved successfully", "data": new_form}

@app.post("/form_fields/")
def create_form_field(data: FormFieldData, db: Session = Depends(get_db)):
    new_field = models.FormField(**data.dict())
    db.add(new_field)
    db.commit()
    db.refresh(new_field)
    return {"message": "Form field added successfully", "data": new_field}

# Routes for handling tables
@app.post("/tables/")
def create_table(data: TableData, db: Session = Depends(get_db)):
    new_table = models.Table(**data.dict())
    db.add(new_table)
    db.commit()
    db.refresh(new_table)
    return {"message": "Table saved successfully", "data": new_table}

@app.post("/table_columns/")
def create_table_column(data: TableColumnData, db: Session = Depends(get_db)):
    new_column = models.TableColumn(**data.dict())
    db.add(new_column)
    db.commit()
    db.refresh(new_column)
    return {"message": "Table column added successfully", "data": new_column}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Form Generator!"}

# Run FastAPI with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
