FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y wget \
    && mkdir -p /usr/share/nltk_data \
    && python -m nltk.downloader -d /usr/share/nltk_data punkt \
    && apt-get remove -y wget \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY . /app

EXPOSE 8080

CMD ["python", "app.py"]
