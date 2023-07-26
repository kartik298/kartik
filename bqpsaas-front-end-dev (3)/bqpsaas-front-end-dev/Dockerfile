# Stage 1 - Build
FROM node:16.13.1-buster as build
LABEL env build_environment
LABEL description="This is the build environment for react based frontend application"
# set work directory
WORKDIR /usr/frontend/app
COPY . /usr/frontend/app
RUN yarn install
RUN yarn build
# Stage 2 - Run
FROM node:16.13.1-buster-slim
LABEL env production
LABEL description="This is the production environment for react based frontend application"
ARG USERNAME=bqphy-dev
ARG USER_UID=1024
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME
# set work directory
WORKDIR /usr/frontend/app
COPY --from=build /usr/frontend/app/build ./build
RUN yarn global add serve
USER $USERNAME
CMD ["serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
#building twice --------------