from __future__ import annotations

import re
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\ADMIN\Downloads\CV.pdf")
OUTPUT = ROOT / "Francis_Gbohunmi_Portfolio_Resume.pdf"
ARIAL = r"C:\Windows\Fonts\arial.ttf"
ARIAL_BOLD = r"C:\Windows\Fonts\arialbd.ttf"
ARIAL_ITALIC = r"C:\Windows\Fonts\ariali.ttf"

BLACK = (0.04, 0.04, 0.04)
RULE = (0.27, 0.27, 0.27)
LINK = (0.02, 0.39, 0.76)
PAGE_W = 612
PAGE_H = 792
LEFT = 36
RIGHT = 576
BODY_W = RIGHT - LEFT


def font(path: str) -> fitz.Font:
    return fitz.Font(fontfile=path)


REG = font(ARIAL)
BOLD = font(ARIAL_BOLD)
ITALIC = font(ARIAL_ITALIC)


def wrap(text: str, f: fitz.Font, size: float, width: float) -> list[str]:
    text = re.sub(r"\s+", " ", text).strip()
    lines: list[str] = []
    current = ""
    for word in text.split(" "):
        candidate = word if not current else f"{current} {word}"
        if current and f.text_length(candidate, fontsize=size) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def textbox(page: fitz.Page, text: str, rect: fitz.Rect, *, size: float = 9.94,
            f: fitz.Font = REG, align: int = 0, lineheight: float = 1.24,
            color: tuple[float, float, float] = BLACK) -> float:
    font_path = ARIAL_BOLD if "Bold" in f.name else ARIAL_ITALIC if "Italic" in f.name else ARIAL
    return page.insert_textbox(
        rect,
        text,
        fontfile=font_path,
        fontsize=size,
        color=color,
        align=align,
        lineheight=lineheight,
        border_width=0,
    )


def draw_rule(page: fitz.Page, y: float) -> None:
    page.draw_line(fitz.Point(34.56, y), fitz.Point(577.44, y), color=RULE, width=0.65)


def heading(page: fitz.Page, text: str, y: float) -> float:
    textbox(page, text.upper(), fitz.Rect(LEFT, y, RIGHT, y + 16), size=11.02, f=BOLD, lineheight=1)
    draw_rule(page, y + 17)
    return y + 24


def bullet(page: fitz.Page, text: str, y: float, *, width: float = BODY_W - 6,
           size: float = 9.94, gap: float = 4.0) -> float:
    lines = wrap(text, REG, size, width - 18)
    content = "\n".join(lines)
    height = max(1, len(lines)) * size * 1.27 + 3
    page.draw_circle(fitz.Point(45.2, y + 5.6), 1.35, color=None, fill=BLACK)
    textbox(page, content, fitz.Rect(54, y, RIGHT, y + height), size=size, lineheight=1.27)
    return y + height + gap


def role(page: fitz.Page, y: float, role_name: str, company: str, date: str) -> float:
    textbox(page, role_name, fitz.Rect(LEFT, y, LEFT + BOLD.text_length(role_name, fontsize=10.54) + 2, y + 15), size=10.54, f=BOLD, lineheight=1)
    role_width = BOLD.text_length(role_name, fontsize=10.54)
    textbox(page, f" | {company}", fitz.Rect(LEFT + role_width, y, 430, y + 15), size=10.54, lineheight=1)
    date_width = BOLD.text_length(date, fontsize=9.94)
    textbox(page, date, fitz.Rect(RIGHT - date_width, y, RIGHT, y + 15), size=9.94, f=BOLD, align=2, lineheight=1)
    return y + 17


def project(page: fitz.Page, y: float, name: str, stack: str) -> float:
    textbox(page, name, fitz.Rect(LEFT, y, 300, y + 15), size=10.54, f=BOLD, lineheight=1)
    name_width = BOLD.text_length(name, fontsize=10.54)
    textbox(page, f" | {stack}", fitz.Rect(LEFT + name_width, y, RIGHT, y + 15), size=9.94, f=ITALIC, lineheight=1)
    return y + 17


def header(page: fitz.Page) -> None:
    textbox(page, "FRANCIS GBOHUNMI", fitz.Rect(LEFT, 34, RIGHT, 58), size=17.97, f=BOLD, align=1, lineheight=1)
    textbox(page, "Backend Software Engineer | C# / .NET | APIs | Real-Time & Offline Systems", fitz.Rect(LEFT, 60, RIGHT, 76), size=10.54, f=BOLD, align=1, lineheight=1)
    contact = "Lagos, Nigeria  |  +234 812 492 2244  |  francisgbohunmi@gmail.com  |  www.gbohunmi.dev"
    textbox(page, contact, fitz.Rect(LEFT, 76, RIGHT, 91), size=9.46, align=1, lineheight=1)
    link_start = 407
    page.draw_line(fitz.Point(link_start, 88), fitz.Point(485, 88), color=LINK, width=0.65)
    page.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(406, 75, 488, 92), "uri": "https://gbohunmi.dev"})


def new_page(document: fitz.Document) -> fitz.Page:
    page = document.new_page(width=PAGE_W, height=PAGE_H)
    page.draw_rect(page.rect, color=None, fill=(1, 1, 1), overlay=False)
    return page


def build() -> None:
    document = fitz.open()
    first = new_page(document)
    header(first)

    y = heading(first, "Professional Summary", 100)
    summary = (
        "Backend-focused Software Engineer building reliable APIs and product systems with C#, ASP.NET Core, "
        ".NET 8/10, PostgreSQL, SQL Server, and SignalR. Experience spans fintech, enterprise ERP, edtech, music "
        "intelligence, personal safety, private social products, and farm operations. Skilled in Clean Architecture, "
        "CQRS, authentication, idempotent workflows, background jobs, offline sync, and API testing. I design around "
        "durable state, explicit failure handling, and clear contracts across web, mobile, and backend teams."
    )
    lines = wrap(summary, REG, 9.94, BODY_W)
    textbox(first, "\n".join(lines), fitz.Rect(LEFT, y, RIGHT, y + len(lines) * 12.7 + 5), size=9.94, lineheight=1.27)

    y = heading(first, "Technical Skills", 196)
    for label, value in [
        ("Languages & Backend: ", "C#, ASP.NET Core, .NET 8/10, Entity Framework Core, Python, TypeScript, SQL, LINQ"),
        ("Architecture & APIs: ", "Clean Architecture, Modular Monoliths, CQRS (MediatR), REST APIs, JWT, SignalR, Background Jobs"),
        ("Data & Infrastructure: ", "PostgreSQL, SQL Server, SQLite, Redis, Docker, Azure, AWS (EC2, S3, RDS, Lambda)"),
        ("Product Engineering: ", "Offline-First Sync, Idempotency, Real-Time Systems, RBAC, Push Notifications"),
        ("Tools & Quality: ", "Git, GitHub, Visual Studio, VS Code, xUnit, pytest, API Testing, Manual and Regression Testing"),
    ]:
        textbox(first, label, fitz.Rect(LEFT, y, LEFT + BOLD.text_length(label, fontsize=9.94) + 3, y + 14), size=9.94, f=BOLD, lineheight=1)
        textbox(first, value, fitz.Rect(LEFT + BOLD.text_length(label, fontsize=9.94), y, RIGHT, y + 28), size=9.94, lineheight=1.22)
        y += 15 if len(wrap(label + value, REG, 9.94, BODY_W)) == 1 else 27

    y = heading(first, "Professional Experience", 313)
    y = role(first, y, "Backend Developer / QA Tester", "Model Carbon Ltd", "Dec 2025 - Jun 2026")
    y = bullet(first, "Built and validated backend services and REST APIs for Converge ERP, developed for Heirs Technologies under the UBA Group, using established modular .NET architecture and integration contracts.", y)
    y = bullet(first, "Debugged cross-service workflows, reviewed code, tracked regressions, and performed manual QA with frontend, AI, and QA teams ahead of releases.", y)
    y = bullet(first, "Supported delivery from requirements and API documentation through integration, testing, and deployment readiness.", y, gap=8)
    y = role(first, y, "Backend Developer", "Kuda MFB", "Jun 2025 - Sep 2025")
    y = bullet(first, "Delivered backend workflows for premium subscriptions, referral rewards, and loyalty using ASP.NET Core and SQL Server, with reliable transaction rules and account state.", y)
    y = bullet(first, "Collaborated with senior engineers to translate business goals into API contracts and launch engagement features for digital banking customers.", y)
    y = bullet(first, "Implemented and tested eligibility, duplicate-action, reward issuance, and state-transition edge cases to improve release confidence.", y, gap=8)
    y = role(first, y, ".NET Developer", "X3 Lab", "Jan 2025 - Jun 2025")
    y = bullet(first, "Engineered core ASP.NET Core API endpoints and business logic for a university-focused edtech platform.", y)
    y = bullet(first, "Built course registration, result management, and academic progress workflows with validation and role-aware access to student records.", y)
    y = bullet(first, "Translated product requirements into reliable backend services and coordinated API integration with the frontend team.", y)

    y = heading(first, "Projects", 674)
    y = project(first, y, "NoteFusion", ".NET 10, Python / ONNX, Expo, PostgreSQL")
    y = bullet(first, "Designed a three-tier music transcription system where Expo clients call a .NET API that orchestrates a private FastAPI and ONNX worker and persists job results.", y, gap=4)
    bullet(first, "Built pitch and timing post-processing, key-aware movable-do solfa mapping, confidence handling, editable key correction, and MusicXML and MIDI output.", y)

    second = new_page(document)
    y = 36
    y = project(second, y, "Recchx", ".NET 8, React Native, SignalR, PostgreSQL")
    y = bullet(second, "Built a personal safety network with trusted circles, background location, safe-arrival timers, emergency contacts, and covert SOS alerts.", y)
    y = bullet(second, "Designed SOS-first offline queues, bounded location snapshots, idempotent batch sync, Ghost Mode privacy, and durable REST state with SignalR updates.", y, gap=8)
    y = project(second, y, "2gether", ".NET 10, Next.js, SignalR, PostgreSQL")
    y = bullet(second, "Built an invite-only couple application with validated partner linking, messaging, cycle tracking, live presence, location, and synchronous games.", y)
    y = bullet(second, "Scoped data from authenticated couple state and made the server own game timers, turns, scores, consent, and reconnect snapshots.", y, gap=8)
    y = project(second, y, "SBZ Farms", ".NET 10, Expo, CQRS, PostgreSQL, SQLite")
    y = bullet(second, "Built an operations platform for birds, eggs, feed, health, sales, payroll, alerts, audit history, and role-based access.", y)
    y = bullet(second, "Implemented a SQLite offline source of truth, ordered outbox replay, token refresh, exponential backoff, dead-letter handling, notifications, and CSV backups.", y, gap=12)

    y = heading(second, "Education", y)
    textbox(second, "Bachelor of Technology (B.Tech), Statistics", fitz.Rect(LEFT, y, 380, y + 15), size=10.54, f=BOLD, lineheight=1)
    textbox(second, "Akure, Nigeria", fitz.Rect(450, y, RIGHT, y + 15), size=9.94, align=2, lineheight=1)
    textbox(second, "Federal University of Technology, Akure (FUTA)", fitz.Rect(LEFT, y + 17, RIGHT, y + 34), size=9.94, lineheight=1)
    y += 48

    y = heading(second, "Certifications & Training", y)
    y = role(second, y, "AWS Solutions Architect Bootcamp", "Akure Tech Hub", "Jun 2024 - Jul 2024")
    y = bullet(second, "Gained hands-on experience with EC2, S3, RDS, and AWS Lambda through deployment exercises and a serverless capstone.", y)
    y = bullet(second, "Applied foundational AWS practices for scalable, fault-tolerant, and cost-conscious infrastructure.", y)

    # Adding a page can orphan an earlier Page wrapper in PyMuPDF, so reacquire it.
    first = document[0]
    # Preserve the two-page Letter layout and add useful contact links.
    first.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(270, 75, 405, 92), "uri": "mailto:francisgbohunmi@gmail.com"})
    first.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(130, 75, 245, 92), "uri": "tel:+2348124922244"})
    first.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(215, 345, 390, 390), "uri": "https://heirstechnologies.com/"})

    document.set_metadata({
        "title": "Francis Gbohunmi Portfolio Resume",
        "author": "Francis Gbohunmi",
        "subject": "Backend Software Engineer",
    })
    document.save(OUTPUT, garbage=4, deflate=True)
    print(OUTPUT)


if __name__ == "__main__":
    build()
