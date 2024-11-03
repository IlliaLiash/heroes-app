FROM node:20-alpine

WORKDIR /app

COPY heroes-back/package*.json ./backend/
RUN cd backend && npm install

COPY heroes-front/package*.json ./frontend/
RUN cd frontend && npm install

RUN npm install -g typescript

COPY heroes-back/. /app/backend
COPY heroes-front/. /app/frontend

RUN cd frontend && npm run build

RUN mkdir -p /app/backend/public && cp -r /app/frontend/dist/* /app/backend/public/

EXPOSE 3000

WORKDIR /app/backend

CMD ["npm", "run", "start"]