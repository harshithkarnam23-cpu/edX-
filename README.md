# edX

edX fetches SRM Academia data through a FastAPI backend and presents it directly in the terminal. The backend handles authentication, portal scraping, CAPTCHA support, and HTML parsing. The Go CLI stores an encrypted local session and prints the latest data.

## Architecture

```
edX CLI -> FastAPI backend -> SRM Academia
                       \\-> TinyOCR CAPTCHA service
```

The optional Cloudflare Worker can proxy production requests and add HMAC request signing. This repository contains only the backend and terminal client.

## Project Structure

```
backend/       FastAPI routes, portal clients, parsers, and schemas
cli/           Go terminal client and encrypted session store
worker/        Optional production proxy
ocr-engine/    CAPTCHA OCR service
```

## Local Setup

### Backend

```bash
cd /home/harshith/Desktop/new\ portal/edX/backend
uv venv .venv
uv pip install --python .venv/bin/python -r requirements.txt
ENV=development .venv/bin/python -m uvicorn main:app --reload --port 8000
```

### Terminal Client

In another terminal:

```bash
cd cli
go build -o edx .
export EDX_DEV=true
export EDX_BACKEND_URL=http://localhost:8000
./edx login
./edx data
```

`edx login` opens the terminal login flow and saves the session locally. `edx data` refreshes the backend and prints the student profile, attendance, marks, and timetable. Use `./edx logout` to remove the saved session.

### Student Portal Credentials

During `edx login`, edX asks for the student's portal username and **student portal password**. These credentials are required by the backend to authenticate with SRM Academia and fetch marks and attendance. The password is sent only to the configured edX backend and is stored locally in the CLI's encrypted session so later `edx data` refreshes can work without asking again.

For production, set `ENV=production`, configure `HMAC_SECRET` on the backend, and set `EDX_HMAC_SECRET` for direct CLI requests or configure the worker with the same secret.

## Privacy

Credentials and portal cookies are stored in the CLI's encrypted local session file. The backend does not persist student data between requests.
