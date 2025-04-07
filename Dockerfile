# Usa l'immagine di Node.js come base
FROM node:16

# Imposta la cartella di lavoro all'interno del container
WORKDIR /app

# Copia i file di configurazione per le dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del progetto nel container
COPY . .

# Costruisci l'app per la produzione
RUN npm run build

# Espone la porta su cui l'app sarà in esecuzione
EXPOSE 3000

# Comando per avviare il server
CMD ["npm", "start"]
