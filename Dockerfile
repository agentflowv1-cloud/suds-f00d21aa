# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
# Install and build if this is a Node project
RUN if [ -f "package.json" ]; then \
      npm install --legacy-peer-deps 2>/dev/null || npm install 2>/dev/null || true; \
      npm run build 2>/dev/null || true; \
    fi
# Normalise output: if a build dir exists and has index.html, promote it to root
RUN if [ -d "dist" ] && [ -f "dist/index.html" ]; then \
      cp -r dist/. . && rm -rf dist; \
    elif [ -d "build" ] && [ -f "build/index.html" ]; then \
      cp -r build/. . && rm -rf build; \
    elif [ -d "out" ] && [ -f "out/index.html" ]; then \
      cp -r out/. . && rm -rf out; \
    fi

# ── Serve stage ───────────────────────────────────────────────────────────────
FROM nginx:1.25-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app /usr/share/nginx/html/
RUN printf 'server {\n  listen 8080;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html index.htm;\n  try_files $uri $uri/ /index.html;\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
