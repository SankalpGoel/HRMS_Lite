from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False, index=True)
    attendance_date = Column(Date, nullable=False)
    status = Column(String(20), nullable=False)  # Present / Absent
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    employee = relationship("Employee", back_populates="attendance_records")

    class Config:
        from_attributes = True
