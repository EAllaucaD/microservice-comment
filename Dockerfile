# Usa una imagen base oficial de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que la aplicación usará
EXPOSE 3002

# Define el comando para ejecutar la aplicación
CMD ["node", "app.js"]
