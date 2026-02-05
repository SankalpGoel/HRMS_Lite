from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.database.database import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate, AttendanceResponse, AttendanceList
from typing import List
from datetime import date

router = APIRouter(prefix="/api/attendance", tags=["attendance"])


@router.post("", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    """
    Mark attendance for an employee.
    
    - **employee_id**: ID of the employee (required)
    - **attendance_date**: Date of attendance in YYYY-MM-DD format (required)
    - **status**: Either 'Present' or 'Absent' (required)
    """
    try:
        # Check if employee exists
        employee = db.query(Employee).filter(
            Employee.id == attendance.employee_id
        ).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with ID {attendance.employee_id} not found.",
            )

        # Check if attendance for this date already exists
        existing_attendance = db.query(Attendance).filter(
            and_(
                Attendance.employee_id == attendance.employee_id,
                Attendance.attendance_date == attendance.attendance_date
            )
        ).first()
        if existing_attendance:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Attendance already marked for this employee on {attendance.attendance_date}.",
            )

        # Create attendance record
        db_attendance = Attendance(**attendance.dict())
        db.add(db_attendance)
        db.commit()
        db.refresh(db_attendance)
        return db_attendance

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}",
        )


@router.get("", response_model=List[AttendanceList])
def get_all_attendance(
    employee_id: int = Query(None, gt=0),
    from_date: date = Query(None),
    to_date: date = Query(None),
    db: Session = Depends(get_db)
):
    """
    Retrieve attendance records with optional filtering.
    
    - **employee_id**: Filter by specific employee (optional)
    - **from_date**: Filter from this date (optional)
    - **to_date**: Filter to this date (optional)
    """
    try:
        query = db.query(Attendance).join(Employee)

        if employee_id:
            # Check if employee exists
            employee = db.query(Employee).filter(Employee.id == employee_id).first()
            if not employee:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Employee with ID {employee_id} not found.",
                )
            query = query.filter(Attendance.employee_id == employee_id)

        if from_date:
            query = query.filter(Attendance.attendance_date >= from_date)

        if to_date:
            query = query.filter(Attendance.attendance_date <= to_date)

        attendance_records = query.all()

        # Convert to AttendanceList format
        result = []
        for record in attendance_records:
            result.append({
                "id": record.id,
                "employee_id": record.employee_id,
                "attendance_date": record.attendance_date,
                "status": record.status,
                "employee_name": record.employee.full_name,
                "employee_email": record.employee.email,
                "created_at": record.created_at,
            })

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}",
        )


@router.get("/employee/{employee_id}", response_model=List[AttendanceList])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    """
    Retrieve attendance records for a specific employee.
    """
    try:
        # Check if employee exists
        employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with ID {employee_id} not found.",
            )

        attendance_records = (
            db.query(Attendance)
            .join(Employee)
            .filter(Attendance.employee_id == employee_id)
            .all()
        )

        # Convert to AttendanceList format
        result = []
        for record in attendance_records:
            result.append({
                "id": record.id,
                "employee_id": record.employee_id,
                "attendance_date": record.attendance_date,
                "status": record.status,
                "employee_name": record.employee.full_name,
                "employee_email": record.employee.email,
                "created_at": record.created_at,
            })

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}",
        )
