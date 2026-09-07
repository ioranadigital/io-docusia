FROM node:18-alpine AS base
RUN npm install -g pnpm@9
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY package.json pnpm-lock.yaml* ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM node:18-alpine AS runtime
RUN apk add --no-cache cairo-dev jpeg-dev pango-dev giflib-dev pixman-dev
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
RUN npm install -g pnpm@9 && pnpm install --prod --frozen-lockfile && pnpm add sharp

EXPOSE 3006
ENV NODE_ENV=production
ENV PORT=3006
CMD ["pnpm", "start"]
