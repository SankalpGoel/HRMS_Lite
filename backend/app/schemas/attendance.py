from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime


class AttendanceCreate(BaseModel):
    employee_id: int = Field(..., gt=0)
    attendance_date: date
    status: str = Field(..., pattern="^(Present|Absent)$")

    class Config:
        json_schema_extra = {
            "example": {
                "employee_id": 1,
                "attendance_date": "2026-02-05",
                "status": "Present",
            }
        }


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    attendance_date: date
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "employee_id": 1,
                "attendance_date": "2026-02-05",
                "status": "Present",
                "created_at": "2026-02-05T10:00:00",
            }
        }


class AttendanceList(BaseModel):
    id: int
    employee_id: int
    attendance_date: date
    status: str
    employee_name: str
    employee_email: str
    created_at: datetime

    class Config:
        from_attributes = True
