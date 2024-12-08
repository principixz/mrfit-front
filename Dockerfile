# Etapa 1: Construcción de la aplicación Angular
FROM node:16 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build -- --output-path=dist/frontrestaurante --configuration production

# Etapa 2: Copiar los archivos a un servidor Nginx configurado
FROM nginx:1.21

# Copiar la configuración de Nginx si se necesita personalizar
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos de construcción al directorio Nginx configurado
COPY --from=build /app/dist/frontrestaurante /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]