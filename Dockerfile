FROM openjdk:17-oracle
EXPOSE 8080

COPY target/*.jar /home/app.jar

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "/home/app.jar"]
