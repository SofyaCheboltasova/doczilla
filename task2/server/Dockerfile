FROM openjdk:11-jre-slim
WORKDIR /app
RUN apt-get update && apt-get install -y maven
COPY task2/server /app
RUN mvn clean package
ENTRYPOINT ["mvn", "exec:java"]
