FROM python:3.13.1-slim
RUN apt update -y && apt install -y --no-install-recommends build-essential libpq-dev wait-for-it openssl && \
    apt autoremove -y && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY backend/ /app/
RUN python -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"
RUN pip install --no-cache-dir -U pip && pip install --no-cache-dir -U -r requirements.txt && rm -rf /root/.cache
RUN mkdir -p /etc/ssl/private_decrypted && chmod 700 /etc/ssl/private_decrypted
CMD ["sh", "-c", "\
    if [ \"${DEBUG}\" != \"True\" ]; then \
        openssl rsa -in /etc/ssl/private/postgresdb.key.enc -out /etc/ssl/private_decrypted/postgresdb.key -passin pass:$POSTGRES_SSL_PASSPHRASE && \
        chmod 400 /etc/ssl/private_decrypted/postgresdb.key && \
        chown 999:999 /etc/ssl/private_decrypted/postgresdb.key && \
        openssl rsa -in /etc/ssl/private/redis.key.enc -out /etc/ssl/private_decrypted/redis.key -passin pass:$REDIS_SSL_PASSPHRASE && \
        chmod 400 /etc/ssl/private_decrypted/redis.key && \
        chown 999:999 /etc/ssl/private_decrypted/redis.key; \
    fi && \
    wait-for-it db:5432 --timeout=30 --strict && \
    python manage.py makemigrations --noinput && \
    python manage.py migrate --noinput && \
    python manage.py createsuperuser --noinput --email=$EMAIL_HOST_USER > /dev/null 2>&1 || true && \
    if [ \"${DEBUG}\" = \"True\" ]; then \
        python manage.py runserver backend:8000; \
    else \
        gunicorn backend.wsgi:application --bind backend:8000 --timeout 60 --workers $(python -c 'import multiprocessing; print(multiprocessing.cpu_count()*2+1)'); \
    fi"]
