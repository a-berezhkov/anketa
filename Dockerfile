FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Если есть .env, раскомментируйте следующую строку:
 COPY .env .env

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./
# Если есть .env, раскомментируйте следующую строку:
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["npm", "start"]