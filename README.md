# Panchāṅga Digital Museum

> **A Digital Museum of Indian Time, Astronomy and the Traditional Panchāṅga**

The **Panchāṅga Digital Museum** is an interactive educational web application that presents the traditional Indian Panchāṅga as a visual museum experience.

Instead of presenting Panchāṅga concepts as static text, the system allows a visitor to select a **date, time and location**, calculates the corresponding Panchāṅga values using astronomical computation, and then explains the five major measurements through interactive visual exhibits.

The five primary measurements explored by the museum are:

* **Tithi** — lunar day
* **Nakṣatra** — lunar celestial sector
* **Yoga** — combined Sun–Moon position
* **Karaṇa** — half of a Tithi
* **Vāra** — weekday

The experience concludes with an interactive knowledge quiz.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Objectives](#objectives)
* [Core Concept](#core-concept)
* [System Architecture](#system-architecture)
* [High-Level Architecture](#high-level-architecture)
* [System Components](#system-components)
* [Application Flow](#application-flow)
* [Panchāṅga Calculation Pipeline](#panchāṅga-calculation-pipeline)
* [Astronomical Data Flow](#astronomical-data-flow)
* [Frontend Architecture](#frontend-architecture)
* [Backend Architecture](#backend-architecture)
* [API Architecture](#api-architecture)
* [Data Flow Example](#data-flow-example)
* [Project Structure](#project-structure)
* [Technology Stack](#technology-stack)
* [Frontend Design System](#frontend-design-system)
* [Interactive Museum Exhibits](#interactive-museum-exhibits)
* [Navigation Architecture](#navigation-architecture)
* [Quiz Architecture](#quiz-architecture)
* [Location Handling](#location-handling)
* [Error Handling](#error-handling)
* [Security and Reliability Considerations](#security-and-reliability-considerations)
* [Installation](#installation)
* [Running the Project](#running-the-project)
* [API Usage](#api-usage)
* [Example Panchāṅga Response](#example-panchāṅga-response)
* [Development Workflow](#development-workflow)
* [Design Decisions](#design-decisions)
* [Current Limitations](#current-limitations)
* [Future Enhancements](#future-enhancements)
* [Educational Value](#educational-value)
* [License](#license)

---

# Project Overview

Traditional Panchāṅga systems represent time through multiple astronomical and calendrical measurements.

The purpose of this project is to transform those concepts into an **interactive digital museum**.

A visitor begins at a cinematic museum entrance and then moves through a sequence of exhibits.

```text
                    ┌─────────────────────┐
                    │   Digital Museum    │
                    │      Welcome        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Date / Time /       │
                    │ Location Selection  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Panchāṅga Backend   │
                    │ Astronomical Engine │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌──────────────────────────────────┐
              │       Digital Museum Exhibits    │
              ├──────────────────────────────────┤
              │ Tithi                            │
              │ Nakṣatra                         │
              │ Yoga                             │
              │ Karaṇa                           │
              │ Vāra                             │
              └────────────────┬─────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Five Measurements   │
                    │ Convergence Exhibit │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Interactive Quiz    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Result        │
                    └─────────────────────┘
```

---

# Objectives

The system is designed to:

1. Introduce users to the Panchāṅga in an accessible way.
2. Demonstrate how different Panchāṅga measurements describe the same moment.
3. Connect traditional terminology with astronomical geometry.
4. Use actual astronomical calculations rather than hard-coded educational examples.
5. Provide visual explanations instead of relying only on textual descriptions.
6. Create a museum-style browsing experience.
7. Allow users to explore individual exhibits non-linearly.
8. Reinforce learning through an interactive quiz.
9. Maintain a modular architecture that can be expanded with additional calendrical concepts.

---

# Core Concept

The system is based around the idea that a single moment can be described through several independent measurements.

For a selected:

```text
Date
Time
Location
```

the backend calculates:

```text
                 Selected Moment
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
         Sun          Moon       Weekday
          │            │            │
          └──────┬─────┘            │
                 │                  │
        ┌────────┼────────┐         │
        ▼        ▼        ▼         ▼
      Tithi  Nakṣatra   Yoga      Vāra
                 │
               Pada
                 
        Sun–Moon separation
                 │
                 ▼
              Karaṇa
```

The museum then converts these calculated values into visual exhibits.

---

# System Architecture

The project follows a **client-server architecture**.

The frontend is responsible for:

* User interaction
* Museum presentation
* Animations
* Visualizations
* Navigation
* Quiz interaction

The backend is responsible for:

* Receiving date/time/location information
* Performing astronomical calculations
* Calculating Panchāṅga values
* Returning structured JSON data

The astronomical calculation layer uses **Drik Panchāṅga / Swiss Ephemeris-based calculations**.

---

# High-Level Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                         USER / VISITOR                       │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               │ Browser interaction
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                       REACT FRONTEND                         │
│                                                              │
│  Welcome → Input → Museum → Exhibits → Quiz → Result       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Presentation Layer                                     │  │
│  │                                                        │  │
│  │ CosmicIntro                                            │  │
│  │ Date/Location Input                                    │  │
│  │ Museum Layout                                          │  │
│  │ Exhibit Visualizations                                 │  │
│  │ Quiz                                                   │  │
│  └─────────────────────────┬──────────────────────────────┘  │
│                            │                                 │
│                            │ HTTP / JSON                     │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                        FASTAPI BACKEND                       │
│                                                              │
│  API Layer                                                  │
│      │                                                       │
│      ▼                                                       │
│  Panchāṅga Service                                           │
│      │                                                       │
│      ├───────────────┐                                       │
│      ▼               ▼                                       │
│  Astronomy       Panchāṅga Calculations                     │
│  Service             │                                      │
│                      ├── Tithi                              │
│                      ├── Nakṣatra                           │
│                      ├── Yoga                               │
│                      ├── Karaṇa                             │
│                      └── Vāra                               │
│                                                              │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│              DRik PANCHĀṄGA / SWISS EPHEMERIS               │
│                                                              │
│       Solar and Lunar astronomical calculations             │
└──────────────────────────────────────────────────────────────┘
```

---

# System Components

The system consists of the following major layers.

## 1. Presentation Layer

Implemented using React.

Responsible for:

* Museum interface
* Responsive layouts
* Animated transitions
* Interactive cards
* Exhibit navigation
* Quiz interface

---

## 2. Interaction Layer

Responsible for:

* Date selection
* Time selection
* City selection
* Navigation between pages
* Exhibit selection
* Quiz answer selection

---

## 3. API Communication Layer

The frontend communicates with the backend through a dedicated service layer.

```text
frontend/src/services/
├── api.js
└── panchangaService.js
```

The service layer prevents UI components from having to directly manage API request details.

---

## 4. Backend API Layer

The backend uses FastAPI.

Its responsibilities include:

* Request validation
* Panchāṅga calculation requests
* Error handling
* JSON response generation

---

## 5. Calculation Layer

The calculation layer is responsible for the individual Panchāṅga concepts.

```text
calculations/
├── tithi.py
├── nakshatra.py
├── yoga.py
├── karana.py
├── vara.py
└── lunar_calendar.py
```

This modular structure allows individual calculations to be tested and modified independently.

---

## 6. Astronomical Calculation Layer

The astronomical layer provides calculated solar and lunar positions.

It uses:

* Drik Panchāṅga
* Swiss Ephemeris

The resulting astronomical coordinates are then used by the Panchāṅga calculations.

---

# Application Flow

The complete visitor journey is:

```text
1. Welcome
       │
       ▼
2. Enter Museum
       │
       ▼
3. Select Date
       │
       ▼
4. Select Time
       │
       ▼
5. Select Location
       │
       ▼
6. Calculate Panchāṅga
       │
       ▼
7. Museum Overview
       │
       ├── Tithi
       ├── Nakṣatra
       ├── Yoga
       ├── Karaṇa
       └── Vāra
       │
       ▼
8. Individual Exhibits
       │
       ▼
9. Five Measurements
       │
       ▼
10. Quiz
       │
       ▼
11. Result
```

---

# Panchāṅga Calculation Pipeline

The selected moment is represented using:

```text
Date
Time
Latitude
Longitude
Timezone
```

These parameters are sent to the backend.

The backend converts the civil date/time into a Julian Day.

Conceptually:

```text
Date + Time + Timezone
          │
          ▼
     Julian Day
          │
          ▼
Astronomical Positions
          │
    ┌─────┴─────┐
    ▼           ▼
   Sun         Moon
    │           │
    └─────┬─────┘
          │
          ▼
Panchāṅga calculations
```

---

# Tithi Calculation

Tithi is based on the angular separation between the Moon and Sun.

The separation is normalized to the range:

```text
0° – 360°
```

The conceptual calculation is:

```text
D = (Moon longitude - Sun longitude) mod 360°
```

Each Tithi occupies:

```text
12°
```

Therefore:

```text
Tithi = floor(D / 12°) + 1
```

There are:

```text
360° / 12° = 30 Tithis
```

The museum visualizes this using a 30-segment circular Tithi wheel.

---

# Nakṣatra Calculation

The zodiacal circle is divided into 27 Nakṣatras.

```text
360° / 27 = 13°20′
```

The Moon's sidereal longitude determines its Nakṣatra.

Each Nakṣatra is further divided into four Padas:

```text
13°20′ / 4 = 3°20′
```

The museum visualizes:

```text
360°
 │
 ├── Nakṣatra 1
 ├── Nakṣatra 2
 ├── ...
 └── Nakṣatra 27
```

and highlights the Nakṣatra and Pada occupied by the Moon at the selected moment.

---

# Yoga Calculation

Yoga is based on the combined longitude of the Sun and Moon.

Conceptually:

```text
S = (Sun longitude + Moon longitude) mod 360°
```

The 360° circle is divided into 27 Yoga sections.

Each Yoga occupies:

```text
360° / 27 = 13°20′
```

The museum's Yoga exhibit visualizes the convergence of the Sun and Moon longitudes and shows the resulting Yoga.

---

# Karaṇa Calculation

A Karaṇa is half of a Tithi.

Since:

```text
1 Tithi = 12°
```

therefore:

```text
1 Karaṇa = 6°
```

The Karaṇa exhibit visualizes one Tithi as two halves:

```text
             12°
       ┌──────────────┐
       │              │
       │     6°       │
       │   Karaṇa     │
       │              │
       ├──────────────┤
       │              │
       │     6°       │
       │   Karaṇa     │
       │              │
       └──────────────┘
```

The backend's Karaṇa sequence position is displayed separately from the Karaṇa's traditional name.

---

# Vāra Calculation

Vāra corresponds to the civil weekday.

The seven-day cycle is:

```text
Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
```

The museum presents this as a circular seven-day visualization.

Unlike Tithi, Nakṣatra, Yoga and Karaṇa, Vāra does not require a Sun–Moon angular calculation.

---

# Astronomical Data Flow

The backend also returns underlying astronomical values.

For example:

```json
{
  "astronomy": {
    "sun_tropical_longitude": 181.178753,
    "moon_tropical_longitude": 330.851993,
    "sun_sidereal_longitude": 156.948267,
    "moon_sidereal_longitude": 306.621507,
    "ayanamsa": 24.230486
  }
}
```

These values allow the museum to explain not only **what** the Panchāṅga result is, but also **how the result is derived**.

The celestial geometry section exposes these values to the visitor.

---

# Frontend Architecture

The frontend is built using:

* React
* Vite
* React Router
* Tailwind CSS
* Framer Motion
* Lucide React

The frontend follows a component-oriented architecture.

```text
React Application
│
├── Pages
│
├── Components
│   ├── Layout
│   ├── Animations
│   ├── Panchāṅga
│   ├── Museum
│   ├── Input
│   └── Quiz
│
├── Data
│
├── Services
│
├── Hooks
│
├── Utilities
│
└── Constants
```

---

# Frontend Pages

## Welcome

```text
src/pages/
└── Welcome
```

The welcome experience is implemented through the `CosmicIntro` component.

It provides:

* Starfield
* Orbital visualization
* Sun
* Moon
* Museum title
* Entrance animation
* Museum entry button

---

## Input

The input page collects:

* Date
* Time
* City
* State
* Latitude
* Longitude
* Timezone

The selected values are passed to the museum through URL parameters.

Example:

```text
/museum?
date=2026-09-24
&time=10:30
&city=Mumbai
&state=Maharashtra
&latitude=19.076
&longitude=72.8777
&timezone=5.5
```

---

## Museum

The Museum page is the core of the application.

It:

1. Reads the selected parameters.
2. Calls the backend.
3. Receives Panchāṅga data.
4. Displays the overview.
5. Renders the five exhibits.
6. Provides direct exhibit navigation.
7. Shows underlying astronomical geometry.
8. Leads the visitor toward the quiz.

---

# Backend Architecture

The backend is implemented using:

* Python
* FastAPI
* Drik Panchāṅga
* Swiss Ephemeris

The backend is organized into separate responsibilities.

```text
backend/
│
├── app/
│   │
│   ├── main.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── panchanga.py
│   │   └── health.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── constants.py
│   │
│   ├── models/
│   │   └── panchanga_models.py
│   │
│   ├── schemas/
│   │   └── panchanga_schema.py
│   │
│   ├── services/
│   │   ├── panchanga_service.py
│   │   ├── astronomy_service.py
│   │   └── location_service.py
│   │
│   └── calculations/
│       ├── tithi.py
│       ├── nakshatra.py
│       ├── yoga.py
│       ├── karana.py
│       ├── vara.py
│       └── lunar_calendar.py
│
└── tests/
    ├── test_tithi.py
    ├── test_nakshatra.py
    ├── test_yoga.py
    ├── test_karana.py
    └── test_panchanga.py
```

---

# API Architecture

The primary endpoint is:

```text
GET /api/panchanga
```

It accepts:

```text
date
time
latitude
longitude
timezone
```

The request flows through:

```text
HTTP Request
     │
     ▼
FastAPI Router
     │
     ▼
Request Validation
     │
     ▼
Panchāṅga Service
     │
     ├── Astronomy Service
     │
     ├── Tithi Calculation
     ├── Nakṣatra Calculation
     ├── Yoga Calculation
     ├── Karaṇa Calculation
     └── Vāra Calculation
     │
     ▼
Structured JSON Response
```

---

# Data Flow Example

For a visitor selecting:

```text
Date:      2026-09-24
Time:      10:30
Location:  Mumbai
Latitude:  19.076
Longitude: 72.8777
Timezone:  +5.5
```

the frontend sends the request to the backend.

The backend:

```text
1. Converts date/time to Julian Day
2. Calculates solar longitude
3. Calculates lunar longitude
4. Calculates ayanāṃśa
5. Calculates Tithi
6. Calculates Nakṣatra
7. Calculates Pada
8. Calculates Yoga
9. Calculates Karaṇa
10. Determines Vāra
11. Returns structured JSON
```

The frontend then transforms this data into visual exhibits.

---

# Example Panchāṅga Response

A representative response has the following structure:

```json
{
  "input": {
    "date": "2026-09-24",
    "time": "10:30",
    "latitude": 19.076,
    "longitude": 72.8777,
    "timezone": 5.5
  },

  "julian_day": 2461307.7083333335,

  "astronomy": {
    "sun_tropical_longitude": 181.178753,
    "moon_tropical_longitude": 330.851993,
    "sun_sidereal_longitude": 156.948267,
    "moon_sidereal_longitude": 306.621507,
    "ayanamsa": 24.230486
  },

  "panchanga": {
    "tithi": {
      "number": 13,
      "name": "Trayodaśī",
      "paksha": "Śukla",
      "phase_degrees": 149.67324
    },

    "nakshatra": {
      "number": 23,
      "name": "Dhaniṣṭhā",
      "pada": 4,
      "sidereal_longitude": 306.621507
    },

    "yoga": {
      "number": 8,
      "name": "Dhṛti",
      "combined_longitude": 103.569773
    },

    "karana": {
      "number": 25,
      "name": "Kaulava"
    },

    "vara": {
      "number": 4,
      "name": "Thursday"
    }
  }
}
```

The frontend does not hard-code these results. They are populated from the backend response.

---

# Project Structure

```text
panchanga-digital-museum/
│
├── README.md
├── .gitignore
│
├── frontend/
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   │
│   ├── public/
│   │   ├── museum/
│   │   │   ├── textures/
│   │   │   └── audio/
│   │   │
│   │   └── fonts/
│   │
│   └── src/
│       │
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── assets/
│       │   ├── images/
│       │   ├── icons/
│       │   └── illustrations/
│       │
│       ├── components/
│       │   │
│       │   ├── layout/
│       │   │   ├── MuseumLayout.jsx
│       │   │   ├── Navbar.jsx
│       │   │   ├── ProgressIndicator.jsx
│       │   │   └── MuseumFooter.jsx
│       │   │
│       │   ├── animations/
│       │   │   ├── Starfield.jsx
│       │   │   ├── CosmicIntro.jsx
│       │   │   ├── SunMoonOrbit.jsx
│       │   │   ├── MoonPhase.jsx
│       │   │   ├── CelestialMotion.jsx
│       │   │   └── ScrollReveal.jsx
│       │   │
│       │   ├── panchanga/
│       │   │   ├── PanchangaCard.jsx
│       │   │   ├── PanchangaOverview.jsx
│       │   │   ├── TithiWheel.jsx
│       │   │   ├── NakshatraWheel.jsx
│       │   │   ├── NakshatraPada.jsx
│       │   │   ├── YogaDiagram.jsx
│       │   │   ├── KaranaDiagram.jsx
│       │   │   ├── VaraCycle.jsx
│       │   │   └── CalendarTimeline.jsx
│       │   │
│       │   ├── museum/
│       │   │   ├── ExhibitSection.jsx
│       │   │   ├── ExhibitNavigation.jsx
│       │   │   ├── CalculationExplanation.jsx
│       │   │   ├── FiveMeasurements.jsx
│       │   │   └── MuseumProgress.jsx
│       │   │
│       │   ├── input/
│       │   │   ├── DateTimePicker.jsx
│       │   │   ├── LocationSelector.jsx
│       │   │   ├── CitySelector.jsx
│       │   │   └── PanchangaForm.jsx
│       │   │
│       │   └── quiz/
│       │       ├── Quiz.jsx
│       │       ├── QuizQuestion.jsx
│       │       ├── QuizOption.jsx
│       │       ├── QuizResult.jsx
│       │       └── QuizProgress.jsx
│       │
│       ├── pages/
│       │   ├── Welcome.jsx
│       │   ├── Input.jsx
│       │   ├── Museum.jsx
│       │   └── Quiz.jsx
│       │
│       ├── data/
│       │   ├── cities.js
│       │   ├── tithis.js
│       │   ├── nakshatras.js
│       │   ├── yogas.js
│       │   ├── karanas.js
│       │   ├── varas.js
│       │   ├── pakshas.js
│       │   └── exhibits.js
│       │
│       ├── services/
│       │   ├── api.js
│       │   └── panchangaService.js
│       │
│       ├── hooks/
│       │   ├── usePanchanga.js
│       │   ├── useMuseumProgress.js
│       │   └── useReducedMotion.js
│       │
│       ├── utils/
│       │   ├── angleUtils.js
│       │   ├── dateUtils.js
│       │   ├── astronomyUtils.js
│       │   └── animationUtils.js
│       │
│       └── constants/
│           ├── routes.js
│           └── animationConfig.js
│
└── backend/
    │
    ├── requirements.txt
    ├── README.md
    ├── .env
    ├── .env.example
    │
    ├── app/
    │   ├── main.py
    │   │
    │   ├── api/
    │   │   ├── __init__.py
    │   │   ├── panchanga.py
    │   │   └── health.py
    │   │
    │   ├── core/
    │   │   ├── config.py
    │   │   └── constants.py
    │   │
    │   ├── models/
    │   │   └── panchanga_models.py
    │   │
    │   ├── schemas/
    │   │   └── panchanga_schema.py
    │   │
    │   ├── services/
    │   │   ├── panchanga_service.py
    │   │   ├── astronomy_service.py
    │   │   └── location_service.py
    │   │
    │   └── calculations/
    │       ├── tithi.py
    │       ├── nakshatra.py
    │       ├── yoga.py
    │       ├── karana.py
    │       ├── vara.py
    │       └── lunar_calendar.py
    │
    └── tests/
        ├── test_tithi.py
        ├── test_nakshatra.py
        ├── test_yoga.py
        ├── test_karana.py
        └── test_panchanga.py
```

---

# Technology Stack

## Frontend

| Technology    | Purpose                        |
| ------------- | ------------------------------ |
| React         | UI framework                   |
| Vite          | Development/build tooling      |
| React Router  | Page and navigation management |
| Tailwind CSS  | Styling and responsive layouts |
| Framer Motion | Animations and transitions     |
| Lucide React  | Interface icons                |
| JavaScript    | Frontend programming language  |

---

## Backend

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| Python          | Backend language            |
| FastAPI         | REST API framework          |
| Drik Panchāṅga  | Panchāṅga calculations      |
| Swiss Ephemeris | Astronomical calculations   |
| Pydantic        | Request/response validation |

---

# Frontend Design System

The museum intentionally uses a restrained visual language.

### Primary background

```text
#08090d
```

### Primary text

```text
#f5f1e8
```

### Accent

Amber/gold tones are used to represent:

* Sun
* Astronomical measurements
* Selected states
* Museum highlights
* Important values

### Design characteristics

* Dark astronomical background
* Thin borders
* Large typography
* Generous whitespace
* Subtle gold accents
* Circular astronomical diagrams
* Minimal interface controls
* Slow transitions
* Progressive disclosure of information

The objective is to make the application feel more like an **interactive exhibition** than a conventional dashboard.

---

# Interactive Museum Exhibits

## Exhibit 01 — Tithi

The Tithi exhibit contains:

* 30-segment circular visualization
* Current Tithi highlight
* Lunar phase angle
* Tithi number
* Pakṣa
* Mathematical explanation

Example:

```text
149.67° ÷ 12°
       ↓
   Tithi 13
```

---

## Exhibit 02 — Nakṣatra

The Nakṣatra exhibit contains:

* 27-sector wheel
* Current Nakṣatra highlight
* Moon sidereal longitude
* Pada information
* 13°20′ Nakṣatra division
* 3°20′ Pada division

---

## Exhibit 03 — Yoga

The Yoga exhibit shows:

* Sun longitude
* Moon longitude
* Combined longitude
* 27 Yoga divisions
* Current Yoga
* Progress through the current Yoga segment

Example:

```text
156.95° + 306.62°
        ↓
     463.57°
        ↓
     103.57°
        ↓
      Dhṛti
```

The combined longitude is normalized to the 0°–360° range.

---

## Exhibit 04 — Karaṇa

The Karaṇa exhibit shows:

* Current Tithi range
* 12° Tithi span
* Two 6° Karaṇa halves
* Current phase position
* Current Karaṇa name
* Karaṇa sequence position

---

## Exhibit 05 — Vāra

The Vāra exhibit presents:

* Seven-day circular visualization
* Current weekday
* Traditional Sanskrit name
* Position in the seven-day cycle
* Seven-day progress indicator

---

# Navigation Architecture

The museum supports both:

### Sequential navigation

```text
Tithi
 ↓
Nakṣatra
 ↓
Yoga
 ↓
Karaṇa
 ↓
Vāra
 ↓
Five Measurements
 ↓
Quiz
```

### Direct navigation

The Panchāṅga overview cards are interactive.

For example:

```text
User clicks Tithi
       │
       ▼
scrollToExhibit("exhibit-tithi")
       │
       ▼
Tithi Exhibit
```

The same pattern is used for:

```text
exhibit-nakshatra
exhibit-yoga
exhibit-karana
exhibit-vara
```

This allows visitors to explore the museum non-linearly.

---

# Quiz Architecture

The quiz is the final museum exhibit.

The current quiz architecture supports:

* Multiple-choice questions
* True/False questions
* Question progress
* Immediate answer feedback
* Correct/incorrect states
* Explanations
* Score calculation
* Retry
* Return to museum

The quiz receives the selected museum context through URL parameters.

Example:

```text
/quiz?
date=2026-09-24
&time=10:30
&city=Mumbai
&state=Maharashtra
```

This allows the quiz experience to remain connected to the visitor's selected museum journey.

---

# Location Handling

The current implementation uses a curated city selector rather than live geocoding.

Example locations include:

```text
Mumbai
Navi Mumbai
Pune
Bengaluru
New Delhi
```

Each city is represented by:

```text
Name
State
Latitude
Longitude
Timezone
```

Example:

```js
{
  name: "Mumbai",
  state: "Maharashtra",
  latitude: 19.076,
  longitude: 72.8777,
  timezone: "Asia/Kolkata"
}
```

The coordinates are sent to the backend for astronomical calculations.

This approach keeps the first version simple and avoids requiring a separate geocoding service.

---

# Error Handling

The frontend handles three primary states:

```text
Loading
   │
   ├── Success → Museum
   │
   └── Error → Calculation Error
```

During calculation the visitor sees:

```text
Reading the sky

Calculating your Panchāṅga...
```

If the API fails, the interface provides:

* Error message
* Retry button
* No partially rendered Panchāṅga result

---

# Security and Reliability Considerations

## Input Validation

The backend should validate:

* Date
* Time
* Latitude
* Longitude
* Timezone

before performing calculations.

---

## API Separation

The frontend does not directly perform astronomical calculations.

Instead:

```text
React
  │
  │ HTTP
  ▼
FastAPI
  │
  ▼
Astronomical Engine
```

This keeps calculation logic separate from presentation logic.

---

## Environment Variables

Backend configuration should be stored in:

```text
.env
```

A template should be maintained as:

```text
.env.example
```

Sensitive configuration should not be committed to Git.

---

## Error Isolation

The application separates:

```text
API errors
Calculation errors
UI errors
```

so that a calculation failure does not require the frontend application itself to fail.

---

# Installation

## Prerequisites

Recommended environment:

```text
Node.js
npm
Python 3.9+
Git
```

The backend also requires the dependencies specified in:

```text
backend/requirements.txt
```

---

# Frontend Installation

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Backend Installation

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

---

# Running the Backend

From:

```text
backend/
```

run:

```bash
uvicorn app.main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# Running the Frontend

From:

```text
frontend/
```

run:

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

---

# API Usage

A request conceptually contains:

```text
date
time
latitude
longitude
timezone
```

Example:

```text
/api/panchanga
```

with:

```text
date=2026-09-24
time=10:30
latitude=19.076
longitude=72.8777
timezone=5.5
```

The response contains:

```text
Input
Julian Day
Astronomical positions
Tithi
Nakṣatra
Pada
Yoga
Karaṇa
Vāra
```

---

# Development Workflow

A typical development workflow is:

```text
1. Start backend
       │
       ▼
2. Start frontend
       │
       ▼
3. Open museum
       │
       ▼
4. Select test date/time/location
       │
       ▼
5. Verify API calculation
       │
       ▼
6. Verify overview values
       │
       ▼
7. Verify individual exhibits
       │
       ▼
8. Verify navigation
       │
       ▼
9. Verify quiz
       │
       ▼
10. Test responsive layouts
```

---

# Testing Strategy

The backend contains dedicated calculation tests.

```text
tests/
├── test_tithi.py
├── test_nakshatra.py
├── test_yoga.py
├── test_karana.py
└── test_panchanga.py
```

The tests should verify:

* Correct calculation output
* Boundary conditions
* Valid input handling
* Integration between calculations

Frontend testing should additionally verify:

* Museum navigation
* Exhibit scrolling
* API loading states
* Error states
* Quiz interactions
* Responsive layouts

---

# Design Decisions

## Why React?

React provides a component-based structure that is well suited for a museum composed of independent interactive exhibits.

---

## Why FastAPI?

FastAPI provides:

* Python compatibility
* Simple REST API development
* Automatic API documentation
* Strong request validation
* Good separation between API and calculation logic

---

## Why separate calculations?

Tithi, Nakṣatra, Yoga, Karaṇa and Vāra represent different concepts.

Keeping them separate makes the system easier to:

* Test
* Explain
* Modify
* Extend
* Debug

---

## Why use astronomical calculation rather than static data?

A static dataset would only allow the museum to display predefined examples.

The current architecture allows:

```text
Different date
       +
Different time
       +
Different location
       ↓
Different calculated Panchāṅga
```

This makes the museum interactive rather than simply informational.

---

# Current Limitations

The current version intentionally keeps the system focused.

### 1. Curated locations

The frontend currently uses a predefined city list rather than global geocoding.

### 2. Limited calendrical scope

The museum currently focuses primarily on the five Panchāṅga Angas.

Additional concepts such as:

* Māsa
* Pakṣa
* Ṛtu
* Saṃvatsara
* Saṅkrānti
* Ayanā
* Adhika Māsa
* Rāśi

can be added later.

### 3. Quiz is primarily concept-based

The quiz currently tests understanding of Panchāṅga concepts. It can be expanded with questions dynamically generated from the visitor's calculated Panchāṅga.

### 4. No persistent user accounts

The current application does not require authentication or user accounts.

### 5. No persistent visitor progress

Quiz scores and museum progress are currently session-based rather than stored in a database.

---

# Future Enhancements

## 1. Dynamic Location Search

Add geocoding so visitors can search for:

```text
Any city
Any region
Any country
```

and automatically obtain:

```text
Latitude
Longitude
Timezone
```

---

## 2. Additional Panchāṅga Exhibits

Future museum rooms can explain:

```text
Māsa
Pakṣa
Ṛtu
Saṃvatsara
Saṅkrānti
Ayanā
Rāśi
Adhika Māsa
```

---

## 3. Interactive Celestial Map

Add a larger astronomical visualization showing:

```text
Sun
Moon
Earth
Zodiac
Nakṣatra divisions
Lunar orbit
```

with the selected moment highlighted.

---

## 4. Historical Date Exploration

Allow visitors to enter historical dates and compare Panchāṅga measurements across different periods.

---

## 5. Museum Timeline

Introduce a timeline explaining the historical development of Indian calendrical and astronomical traditions.

---

## 6. Audio Guide

Add optional narration for each exhibit.

Example:

```text
Exhibit 01
   │
   └── ▶ Listen to the explanation
```

---

## 7. Multilingual Support

Possible languages:

```text
English
Hindi
Marathi
Sanskrit
Kannada
Tamil
Telugu
```

---

## 8. Dynamic Quiz Questions

Generate questions from the visitor's actual calculated result.

For example:

```text
For the moment you selected,
which Nakṣatra was occupied by the Moon?
```

This would connect the quiz directly to the museum journey.

---

## 9. Museum Progress Tracking

Track:

```text
Exhibits visited
Quiz score
Completed sections
Time spent
```

without requiring an account.

---

## 10. Accessibility

Future improvements can include:

* Keyboard navigation
* Screen-reader descriptions
* Reduced-motion mode
* Better contrast options
* Audio explanations
* Accessible astronomical diagrams

---

# Educational Value

The project is designed around **learning through interaction**.

Instead of presenting:

```text
Tithi = Lunar day
```

the museum demonstrates:

```text
Sun
 +
Moon
 ↓
Angular separation
 ↓
12° divisions
 ↓
Tithi
```

Similarly:

```text
Moon position
 ↓
27 sectors
 ↓
Nakṣatra
 ↓
4 Padas
```

and:

```text
Sun longitude
 +
Moon longitude
 ↓
Combined longitude
 ↓
27 divisions
 ↓
Yoga
```

This makes the mathematical and astronomical relationships visible to the visitor.

---

# Conceptual Architecture Summary

The entire project can be summarized as:

```text
                         USER
                           │
                           ▼
                 ┌──────────────────┐
                 │  React Frontend  │
                 └────────┬─────────┘
                          │
                 Date / Time / Location
                          │
                          ▼
                 ┌──────────────────┐
                 │   FastAPI API    │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Panchāṅga Service│
                 └────────┬─────────┘
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
      Astronomy Service        Calculation Modules
             │                         │
             ▼             ┌───────────┼───────────┐
      Swiss Ephemeris       │           │           │
             │           Tithi      Nakṣatra      Yoga
             │           Karaṇa       Vāra
             │             │           │           │
             └─────────────┴───────────┴───────────┘
                           │
                           ▼
                    Structured JSON
                           │
                           ▼
                 ┌──────────────────┐
                 │ Museum Exhibits  │
                 └────────┬─────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
           Visual       Explain       Explore
          Geometry      Concepts      Sections
             │            │            │
             └────────────┼────────────┘
                          │
                          ▼
                    Five Measurements
                          │
                          ▼
                       Quiz
                          │
                          ▼
                        Result
```

---

# Project Philosophy

The Panchāṅga Digital Museum is not intended to be just another calendar application.

Its primary purpose is to create a bridge between:

```text
Traditional Knowledge
        +
Astronomical Calculation
        +
Interactive Visualization
        +
Digital Education
```

The central idea is simple:

> **One moment can be understood through many measurements.**

The museum makes those measurements visible, interactive and explorable.

---

# License

This project is intended as an educational and demonstration project.

The licensing of the project's own source code should be specified separately from the licenses of third-party dependencies used for astronomical calculations.

Third-party libraries and astronomical datasets remain subject to their respective licenses.
