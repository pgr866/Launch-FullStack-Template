FROM node:22.13.1-slim
WORKDIR /app
COPY frontend/ /app/
RUN npm i -g npm@latest && npm ci
CMD ["sh", "-c", "\
    if [ \"${DEBUG}\" = \"True\" ]; then \
        npm run dev -- --host; \
    else \
        npm run build; \
        npx serve -s dist -l 80; \
    fi"]