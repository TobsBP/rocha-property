# Estágio 1: Instalação e Build
FROM node:20-alpine AS builder

# Instalar dependências necessárias para compilação (se houver node-gyp ou similares)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar arquivos de definição de pacotes
COPY package.json package-lock.json ./

# Instalar dependências (incluindo as de desenvolvimento para o build)
RUN npm ci

# Copiar o restante do código fonte
COPY . .

# Executar o build da aplicação TanStack Start
# Isso gera a pasta .output
RUN npm run build

# ---

# Estágio 2: Execução (Runtime)
FROM node:20-alpine AS runner

WORKDIR /app

# Definir para produção
ENV NODE_ENV=production
ENV PORT=3000

# Criar um usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 tanstack

# Copiar apenas o output gerado no estágio anterior
# O TanStack Start/Nitro empacota o servidor e o cliente em .output
COPY --from=builder /app/.output ./.output

# Ajustar permissões
RUN chown -R tanstack:nodejs /app/.output

USER tanstack

# Porta que a aplicação vai escutar
EXPOSE 3000

# Comando para iniciar o servidor
# No TanStack Start, o entrypoint padrão do Nitro é index.mjs
CMD ["node", ".output/server/index.mjs"]
