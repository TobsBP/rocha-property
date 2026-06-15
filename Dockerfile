# Estágio 1: Build
# Usando Debian (bullseye) no build para maior compatibilidade com ferramentas de compilação
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Executa o build
RUN npm run build

# Depuração: Lista os arquivos para vermos onde o build foi parar
# Isso ajudará a identificar se a pasta é .output, dist ou outra
RUN ls -la && (ls -la .output || echo ".output não encontrado") && (ls -la dist || echo "dist não encontrado")

# ---

# Estágio 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack

# Tenta copiar de .output (padrão do Nitro/TanStack Start)
# Se o seu build estiver gerando em 'dist', mude para /app/dist
COPY --from=builder /app/.output ./.output

RUN chown -R tanstack:nodejs /app/.output

USER tanstack

EXPOSE 3000

# Se o arquivo não estiver em .output/server/index.mjs,
# o log do 'ls -la' acima nos dirá o caminho correto.
CMD ["node", ".output/server/index.mjs"]
