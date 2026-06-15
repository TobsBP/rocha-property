# Estágio 1: Build
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Executa o build (gera a pasta dist/)
RUN npm run build

# ---

# Estágio 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack

# Copia a pasta dist/ (que contém client/ e server/)
COPY --from=builder /app/dist ./dist

# Ajusta permissões para a pasta dist
RUN chown -R tanstack:nodejs /app/dist

USER tanstack

EXPOSE 3000

# O comando de início agora aponta para a pasta dist
# O entrypoint do servidor Nitro é dist/server/index.mjs
CMD ["node", "dist/server/index.mjs"]
