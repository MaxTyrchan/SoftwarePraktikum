# Deployment-Anleitung für die App

## Google Cloud Platform
1. Bei [Google Cloud Platform](https://console.cloud.google.com/) anmelden
2. ein neues Projekt anlegen
3. Datenbank-Instanz erstellen
    - zu "SQL" wechseln
    - neue Cloud SQL-Instanz anlegen
    - als DBMS "MySQL" auswählen
    - Instanz benennen und sicheres Passwort vergeben
4. Datenbank-Dump hochladen
    - in der Instanz eine neue Datenbank erstellen
    - Bucket erstellen (sonst kann die DB nicht importiert werden)
    - sql-Dump in Bucket hochladen
    - bei der DB-Instanz die Datei aus dem Bucket importieren
5. im Frontend ``npm run build`` ausführen
6. Ordnerstruktur der App für das Deployment bereit machen (backend in den build-Ordner <br> kopieren, App.yaml anpassen und requirements.txt erstellen)
7. App via ``gcloud deploy app`` hochladen
8. App Zugriffsrechte auf Datenbank geben (SQL-Client)
9. URL der App aufrufen und das ``s`` von ``https`` entfernen, da das backend das nicht anbietet

Damit sollte das Deployment abgeschlossen sein.
____
<i>Written by Darius Holzapfel, Jasmin Krewenka and Nicole Sauer</i>