from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine
from app.routes import employee, attendance

app = FastAPI(
    title="HRMS Lite API",
    description="A lightweight HR Management System API",
    version="1.0.0",
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to HRMS Lite API",
        "version": "1.0.0",
        "docs": "/docs",
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(employee.router)
app.include_router(attendance.router)
