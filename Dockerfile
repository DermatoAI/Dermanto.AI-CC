FROM python:3.10.11

# Set the working directory
WORKDIR /app

# Copy the requirements.txt into the container
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory into the container
COPY . /app

# Expose the port the app runs on
EXPOSE 8080

# Set the command to run the application
CMD ["python", "app.py"]
