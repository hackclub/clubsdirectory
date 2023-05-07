# A Dockerfile for FastAPI

# Use the official Python image.
FROM python:3.8-slim

# Set the working directory.
WORKDIR /app

# Copy the file from your host to your current location.
COPY requirements.txt .

# Install any needed packages specified in using pyproject.toml.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the specified command within the container.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]