ARG IMAGE=node:16.13-alpine

#COMMON
FROM $IMAGE AS builder
WORKDIR /app
COPY . .
RUN npm i

#DEVELOPMENT
FROM builder AS dev 
CMD [""]

#PROD MIDDLE STEP
FROM builder AS prod-build
RUN npm run build
RUN npm prune --production

#PROD
FROM $IMAGE AS prod
COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
COPY --chown=node:node --from=prod-build /app/.env /app/dist/.env

ENV NODE_ENV=production
ENTRYPOINT ["node", "./main.js"]
WORKDIR /app/dist
CMD [""]

USER node


# RUN npm run build
# CMD ["npm", "run", "start"]
# EXPOSE 3000