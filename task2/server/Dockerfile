FROM openjdk:11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y maven
COPY server /app
RUN mvn clean package
EXPOSE 8000
ENTRYPOINT ["mvn", "exec:java"]
