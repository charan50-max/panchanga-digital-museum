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

    # Main production Vercel URL
    allow_origins=[
        "https://panchanga-digital-museum.vercel.app",
        "http://localhost:5173",
    ],

    # Allow Vercel preview deployments
    allow_origin_regex=r"https://panchanga-digital-museum-[a-z0-9-]+-charan50-maxs-projects\.vercel\.app",

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
