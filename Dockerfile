# Etapa 1: Construcción de la aplicación Angular
FROM node:16 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar Angular CLI versión 12 globalmente
RUN npm install -g @angular/cli@12.2.12

# Instalar las dependencias del proyecto con compatibilidad forzada
RUN npm install --legacy-peer-deps

# Instalar date-fns con compatibilidad forzada para resolver dependencias faltantes
RUN npm install date-fns@2.29.3 --legacy-peer-deps

# Instalar select2 y resolver cualquier dependencia faltante
RUN npm install select2 --legacy-peer-deps

# Copiar el resto de los archivos del proyecto
COPY . .

# Verificar que las dependencias estén presentes
RUN ls node_modules/select2

# Construir la aplicación Angular en modo producción
RUN ng build --configuration production --output-path=dist/mrfit-front

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.21

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos al directorio Nginx configurado
COPY --from=build /app/dist/mrfit-front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]