from sqlalchemy import Column, String, Boolean, ForeignKey, Text, Integer  # ✅ Add Integer
from sqlalchemy.dialects.postgresql import ARRAY, UUID as PG_UUID
from sqlalchemy.ext.declarative import declarative_base  # ✅ Correct import
import uuid
from database import Base

class Form(Base):
    __tablename__ = "forms"
    
    id = Column(PG_UUID, primary_key=True, default=uuid.uuid4)
    title = Column(Text, nullable=False)
    layout = Column(Text)

class FormField(Base):
    __tablename__ = "form_fields"
    
    id = Column(PG_UUID, primary_key=True, default=uuid.uuid4)
    form_id = Column(PG_UUID, ForeignKey("forms.id", ondelete="CASCADE"), nullable=False)
    name = Column(Text, nullable=False)
    label = Column(Text, nullable=False)
    type = Column(Text, nullable=False)
    required = Column(Boolean, default=False)
    options = Column(ARRAY(Text), default=None)
    position = Column(Text)

class Table(Base):
    __tablename__ = "tables"
    
    id = Column(PG_UUID, primary_key=True, default=uuid.uuid4)
    title = Column(Text, nullable=False)

class TableColumn(Base):
    __tablename__ = "table_columns"
    
    id = Column(Integer, primary_key=True, autoincrement=True)  # ✅ Now Integer is defined
    table_id = Column(PG_UUID, ForeignKey("tables.id", ondelete="CASCADE"), nullable=False)
    name = Column(Text, nullable=False)
    type = Column(Text, nullable=False)
