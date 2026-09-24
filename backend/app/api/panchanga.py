from datetime import datetime
from fastapi import APIRouter, HTTPException, Query
import swisseph as swe

router = APIRouter()

# ---------------------------------------------------------
# Names
# ---------------------------------------------------------

TITHIS = [
    "Pratipadā",
    "Dvitīyā",
    "Tṛtīyā",
    "Caturthī",
    "Pañcamī",
    "Ṣaṣṭhī",
    "Saptamī",
    "Aṣṭamī",
    "Navamī",
    "Daśamī",
    "Ekādaśī",
    "Dvādaśī",
    "Trayodaśī",
    "Caturdaśī",
    "Pūrṇimā",
    "Pratipadā",
    "Dvitīyā",
    "Tṛtīyā",
    "Caturthī",
    "Pañcamī",
    "Ṣaṣṭhī",
    "Saptamī",
    "Aṣṭamī",
    "Navamī",
    "Daśamī",
    "Ekādaśī",
    "Dvādaśī",
    "Trayodaśī",
    "Caturdaśī",
    "Amāvāsyā",
]

NAKSHATRAS = [
    "Aśvinī",
    "Bharaṇī",
    "Kṛttikā",
    "Rohiṇī",
    "Mṛgaśīrṣa",
    "Ārdrā",
    "Punarvasu",
    "Puṣya",
    "Āśleṣā",
    "Maghā",
    "Pūrva Phalgunī",
    "Uttara Phalgunī",
    "Hasta",
    "Citrā",
    "Svātī",
    "Viśākhā",
    "Anurādhā",
    "Jyeṣṭhā",
    "Mūla",
    "Pūrva Āṣāḍhā",
    "Uttara Āṣāḍhā",
    "Śravaṇa",
    "Dhaniṣṭhā",
    "Śatabhiṣā",
    "Pūrva Bhādrapadā",
    "Uttara Bhādrapadā",
    "Revatī",
]

YOGAS = [
    "Viṣkambha",
    "Prīti",
    "Āyuṣmān",
    "Saubhāgya",
    "Śobhana",
    "Atigaṇḍa",
    "Sukarmā",
    "Dhṛti",
    "Śūla",
    "Gaṇḍa",
    "Vṛddhi",
    "Dhruva",
    "Vyāghāta",
    "Harṣaṇa",
    "Vajra",
    "Siddhi",
    "Vyatīpāta",
    "Varīyān",
    "Parigha",
    "Śiva",
    "Siddha",
    "Sādhya",
    "Śubha",
    "Śukla",
    "Brahma",
    "Indra",
    "Vaidhṛti",
]

VARAS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

KARANA_FIXED = {
    1: "Kiṃstughna",
    58: "Śakuni",
    59: "Catuṣpāda",
    60: "Nāga",
}

KARANA_REPEATING = [
    "Bava",
    "Bālava",
    "Kaulava",
    "Taitila",
    "Gara",
    "Vaṇija",
    "Viṣṭi",
]


# ---------------------------------------------------------
# Helpers
# ---------------------------------------------------------

def local_datetime_to_jd(
    year: int,
    month: int,
    day: int,
    hour: int,
    minute: int,
    timezone: float,
):
    """
    Convert local civil time to Julian Day in UT.
    timezone is expressed in hours, e.g. India = +5.5.
    """

    utc_hour = hour + minute / 60.0 - timezone

    return swe.julday(
        year,
        month,
        day,
        utc_hour,
    )


def get_karana_name(number: int):
    if number in KARANA_FIXED:
        return KARANA_FIXED[number]

    # Numbers 2 through 57 repeat Bava -> Vishti
    index = (number - 2) % 7

    return KARANA_REPEATING[index]


def get_tithi_details(phase: float):
    """
    Lunar phase separation:
    0° <= phase < 360°
    Every 12° = one Tithi.
    """

    number = int(phase // 12) + 1

    paksha = "Śukla" if number <= 15 else "Kṛṣṇa"

    if number == 15:
        name = "Pūrṇimā"
    elif number == 30:
        name = "Amāvāsyā"
    else:
        name = TITHIS[number - 1]

    return {
        "number": number,
        "name": name,
        "paksha": paksha,
        "phase_degrees": round(phase, 6),
    }


def get_nakshatra_details(moon_sidereal: float):
    sector = 360.0 / 27.0

    number = int(moon_sidereal // sector) + 1

    position_in_nakshatra = moon_sidereal % sector

    pada = int(position_in_nakshatra // (sector / 4)) + 1

    return {
        "number": number,
        "name": NAKSHATRAS[number - 1],
        "pada": pada,
        "sidereal_longitude": round(moon_sidereal, 6),
    }


def get_yoga_details(sun_sidereal: float, moon_sidereal: float):
    total = (sun_sidereal + moon_sidereal) % 360.0

    sector = 360.0 / 27.0

    number = int(total // sector) + 1

    return {
        "number": number,
        "name": YOGAS[number - 1],
        "combined_longitude": round(total, 6),
    }


def get_karana_details(phase: float):
    number = int(phase // 6) + 1

    return {
        "number": number,
        "name": get_karana_name(number),
    }


# ---------------------------------------------------------
# API
# ---------------------------------------------------------

@router.get("/panchanga")
def calculate_panchanga(
    date: str = Query(..., description="YYYY-MM-DD"),
    time: str = Query(..., description="HH:MM"),
    latitude: float = Query(...),
    longitude: float = Query(...),
    timezone: float = Query(...),
):
    try:
        selected = datetime.strptime(
            f"{date} {time}",
            "%Y-%m-%d %H:%M",
        )

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid date/time. Use YYYY-MM-DD and HH:MM.",
        )

    jd = local_datetime_to_jd(
        selected.year,
        selected.month,
        selected.day,
        selected.hour,
        selected.minute,
        timezone,
    )

    # Swiss Ephemeris
    swe.set_sid_mode(swe.SIDM_LAHIRI)

    sun_tropical = swe.calc_ut(
        jd,
        swe.SUN,
        flags=swe.FLG_SWIEPH,
    )[0][0]

    moon_tropical = swe.calc_ut(
        jd,
        swe.MOON,
        flags=swe.FLG_SWIEPH,
    )[0][0]

    ayanamsa = swe.get_ayanamsa_ut(jd)

    sun_sidereal = (
        sun_tropical - ayanamsa
    ) % 360

    moon_sidereal = (
        moon_tropical - ayanamsa
    ) % 360

    # -----------------------------------------------------
    # Five Panchanga measurements
    # -----------------------------------------------------

    lunar_phase = (
        moon_tropical - sun_tropical
    ) % 360

    tithi = get_tithi_details(lunar_phase)

    nakshatra = get_nakshatra_details(
        moon_sidereal
    )

    yoga = get_yoga_details(
        sun_sidereal,
        moon_sidereal,
    )

    karana = get_karana_details(
        lunar_phase
    )

    # Python weekday:
    # Monday = 0 ... Sunday = 6
    # Convert to Sunday = 0 ... Saturday = 6
    vara_number = (
        selected.weekday() + 1
    ) % 7

    vara = {
        "number": vara_number,
        "name": VARAS[vara_number],
    }

    return {
        "input": {
            "date": date,
            "time": time,
            "latitude": latitude,
            "longitude": longitude,
            "timezone": timezone,
        },

        "julian_day": jd,

        "astronomy": {
            "sun_tropical_longitude": round(
                sun_tropical,
                6,
            ),
            "moon_tropical_longitude": round(
                moon_tropical,
                6,
            ),
            "sun_sidereal_longitude": round(
                sun_sidereal,
                6,
            ),
            "moon_sidereal_longitude": round(
                moon_sidereal,
                6,
            ),
            "ayanamsa": round(
                ayanamsa,
                6,
            ),
        },

        "panchanga": {
            "tithi": tithi,
            "nakshatra": nakshatra,
            "yoga": yoga,
            "karana": karana,
            "vara": vara,
        },
    }