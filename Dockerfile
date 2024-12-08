# Etapa 1: Construcción de la aplicación Angular
FROM node:20 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar Angular CLI versión 13 globalmente (según tu entorno)
RUN npm install -g @angular/cli@13.3.11

# Establecer las versiones específicas de paquetes necesarios
RUN npm install @angular-devkit/build-angular@13.3.11 --save-dev && \
    npm install @angular/cli@13.3.11 --save-dev && \
    npm install @angular/core@13.4.0 @angular/common@13.4.0 @angular/animations@13.4.0 \
               @angular/router@13.4.0 --legacy-peer-deps && \
    npm audit fix --force

# Instalar las dependencias del proyecto
RUN npm install --legacy-peer-deps

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Angular en modo producción
RUN ng build --configuration production --output-path=dist/mrfit-front

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.21

# Copiar la configuración personalizada de Nginx (asegúrate de que nginx.conf exista)
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos al directorio Nginx configurado
COPY --from=build /app/dist/mrfit-front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]