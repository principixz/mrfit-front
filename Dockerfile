# Etapa 1: Construcción de la aplicación Angular
FROM node:16 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar Angular CLI versión 12 globalmente
RUN npm install -g @angular/cli@12.2.12

# Instalar las dependencias del proyecto con compatibilidad forzada
RUN npm install --legacy-peer-deps && npm install select2

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Angular en modo producción
RUN ng build --configuration production --output-path=dist/mrfit-front

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.21

# Copiar la configuración personalizada de Nginx (asegúrate de que nginx.conf exista si necesitas modificarlo)
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos al directorio Nginx configurado
COPY --from=build /app/dist/mrfit-front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]