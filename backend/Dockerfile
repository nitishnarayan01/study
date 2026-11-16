FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
# Apply database migrations, load/refresh content, then start the API.
# Hosts such as Render pass the port in $PORT; locally it falls back to 8000.
CMD ["sh", "-c", "alembic upgrade head && python -m app.seed.seed && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
