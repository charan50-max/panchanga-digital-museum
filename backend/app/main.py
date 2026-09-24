from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health
from app.api import panchanga


app = FastAPI(
    title="Panchāṅga Digital Museum API",
    description="Astronomical Pañcāṅga calculation API",
    version="1.0.0",
)


# ---------------------------------------------------------
# CORS CONFIGURATION
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # Production Vercel deployment
        "https://panchanga-digital-museum.vercel.app",

        # Vercel Git/preview deployment
        "https://panchanga-digital-museum-git-main-charan50-maxs-projects.vercel.app",

        # Current Vercel preview deployment
        "https://panchanga-digital-museum-d1dss9m-charan50-maxs-projects.vercel.app",

        # Local development
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# API ROUTES
# ---------------------------------------------------------

app.include_router(
    health.router,
    prefix="/api",
)

app.include_router(
    panchanga.router,
    prefix="/api",
)
