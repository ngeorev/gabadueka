## Dockerfile for the Flask application
##
## This image uses the slim variant of the official Python base image.  It
## installs dependencies from requirements.txt and configures Gunicorn as the
## WSGI server.  The container exposes port 5000 for the application.  In
## production, the container is accessed through the Nginx reverse proxy.

FROM python:3.12-slim as base

# Disable Python writing compiled bytecode to disk and disable output buffering
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Create working directory
WORKDIR /usr/src/app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Copy static assets from repo root into /app/static
COPY static/ /app/static

# Expose port for gunicorn
EXPOSE 5000

# The default command runs gunicorn with four worker processes.  The
# application factory is loaded from the app module.
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:create_app()"]
