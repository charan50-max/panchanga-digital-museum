from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health
from app.api import panchanga


app = FastAPI(
    title="Panchāṅga Digital Museum API",
    description="Astronomical Panchāṅga calculation API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health.router,
    prefix="/api",
)

app.include_router(
    panchanga.router,
    prefix="/api",
)


@app.get("/")
def root():
    return {
        "message": "Panchāṅga Digital Museum API",
        "status": "running",
    }