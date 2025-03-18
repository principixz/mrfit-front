# Etapa 1: Construcción
FROM node:16 as builder   

WORKDIR /app

# Copiar archivos de configuración
COPY package.json package-lock.json ./

# Instalar dependencias ignorando conflictos
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la aplicación en modo producción
RUN npm run build --prod

# Etapa 2: Servidor para producción
FROM nginx:stable-alpine

# Copiar archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]