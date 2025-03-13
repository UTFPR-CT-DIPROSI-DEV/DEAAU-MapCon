# Usa a versão mais recente, caso não seja especificada
ARG NODE_VERSION=latest

# Usa a imagem leve do Node.js
FROM node:${NODE_VERSION}

# Copia os arquivos essenciais primeiro
COPY mapcon /app

# definir o ponto de entrada do contêiner
#ENTRYPOINT [ "" ]
