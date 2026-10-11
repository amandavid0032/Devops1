# ---- Base image: small Linux (Alpine) with Node.js 22 ----
FROM node:22-alpine

# Production mode for Node/npm
ENV NODE_ENV=production

# All following commands run inside /app (created automatically)
WORKDIR /app

# Copy only the package files first so the "npm ci" layer stays cached
# when you change source code but not dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy the application source (files listed in .dockerignore are skipped)
COPY --chown=node:node . .

# Folder for uploaded files, owned by the non-root "node" user
RUN mkdir -p /app/uploads && chown node:node /app/uploads

# Don't run as root
USER node

# Documentation only: the app listens on 3000 (publish it with -p 3000:3000)
EXPOSE 3000

# Docker marks the container "healthy" when /api/health answers 200
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the app (exec form → node is PID 1 and receives SIGTERM from docker stop)
CMD ["node", "server.js"]
