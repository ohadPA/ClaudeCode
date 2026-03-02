FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --production
COPY server.js chatbot.js knowledge-base.js kb-ch-1.js kb-ch-2.js kb-ch-3.js kb-ch-4.js kb-ch-5.js kb-ch-6.js kb-ch-7.js kb-ch-8.js ./
COPY public/ ./public/

EXPOSE 3000

CMD ["node", "server.js"]
