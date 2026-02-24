# ---------- Build stage ----------
FROM node:22.12-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:prod


# ---------- Production stage ----------
FROM nginx:alpine

# Eliminamos config por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiamos build
COPY --from=builder /app/dist/angular-knowledge-test-front/browser /usr/share/nginx/html

# Copiamos config nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]