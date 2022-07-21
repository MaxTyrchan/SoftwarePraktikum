# Installationsanleitung für Entwicklungszwecke

## 1. Datenbank

### Was wird benötigt?
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- den Dump ``timebooking_dump.sql``, der in ```/backend/dbabstraction/dbdump/``` zu finden ist

### Wie gehe ich vor?

In der MySQL Workbench unter dem Menüpunkt "Server" auf "Data Import" klicken und unseren Dump importieren. <br>
Anschließend muss moch eine benutzerdefinierte Verbindung zu Datenbank erstellt werden, damit unser Backend auf die <br>
Datenbank zugreifen kann. <br>
Die neue Verbindung muss den Namen ``sopra`` haben und das Passwort muss ebenso ``sopra`` heißen. Diese Zugangsdaten <br>
sind im Module ``mapper.py`` in ``/backend/dbabstraction/`` deklariert. Auch der Name des Datenbank-Schemas ist dort <br>
als ``timebooking`` deklariert - das heißt, beim importieren des Dumps muss der korrekte Name vergeben werden.


## 2. Backend

### Was wird benötigt?
- Python Version [3.09](https://www.python.org/downloads/) oder höher
- [PyCharm](https://www.jetbrains.com/de-de/pycharm/download/) (oder eine andere Python IDE)
- In PyCharm benötigen wir folgende Packages:
  - [Flask](https://pypi.org/project/Flask/) (Web Application Framework)
  - [Flask-Cors](https://pypi.org/project/Flask-Cors/) (Flask Erweiterung um mit Cross Origin Resource Sharing (CORS) umzugehen)
  - [flask-restx](https://pypi.org/project/flask-restx/) (unterstützt beim Erstellen von REST APIs)
  - [google-auth](https://pypi.org/project/google-auth/) (vereinfacht die Verwendung von Googles Server-to-Server Authentication Mechanismus) 
  - [mysql-connector-python](https://pypi.org/project/mysql-connector-python/) (MySQL Treiber für Python, welcher die DB API v2.0 implementiert)
  - [requests](https://pypi.org/project/requests/) (erlaubt uns HTTP/1.1 Anfragen zu senden)

### Wie gehe ich vor?

Es gibt zwei Wege, die Packages zu installieren:
1. Man installiert sie einzeln via ``pip install 'package name'``.
2. Man erstellt für dieses Projekt ein Virtual Environment und fügt sie dann <br>
   unter <i>Settings</i> &rarr; <i>Project: backend</i> &rarr; <i>Python Interpreter</i> per Klick auf das ``+`` hinzu.

Nachdem alle Packages installiert wurden, kann der Server gestartet werden. Dazu muss lediglich das Module ``main.py`` <br>
ausgeführt werden, welches direkt im ``/backend/``-Verzeichnis liegt. Dazu einfach Rechtsklick auf das Module und <br>
```&#9654; Run main``` klicken. Nun ist das Backend gestartet und läuft. Jetzt fehlt nur noch das Frontend.


## 3. Frontend

### Was wird benötigt?

- [Visual Studio Code](https://code.visualstudio.com/Download)
- [Node.js](https://nodejs.org/en/download/) (JavaScript Laufzeitumgebung)
- Auch hier werden wieder Packages verwendet, welche vorab installiert werden müssen
  - [React](https://www.npmjs.com/package/react) (JavaScript Library um User Interfaces zu erstellen)
  - [React Router](https://www.npmjs.com/package/react-router) (Routing Library für die React JavaScript Library)
  - [Material UI](https://www.npmjs.com/package/@mui/material) (Library mit vielen Komponenten im Stil von Googles Material UI)
  - [Firebase](https://www.npmjs.com/package/firebase) (ermöglicht den Zugriff von Nutzern auf unsere Website)

### Wie gehe ich vor?

Um die Packages zu installieren, genügt die Eingabe von ``npm install`` in das Terminal in Visual Studio Code und die Dependencies <br>
werden installiert. Nachdem alles fehlerfrei installiert wurde, kann nun der React-eigene Development-Server durch die Eingabe <br>
von ``npm start`` gestartet werden.<br>
Wenn der Start erfolgreich war, steht der Server unter http://localhost:3000 bereit.

Die Anwendung steht nun lokal zur Verwendung bereit.

Weitere Informationen zum Fontend gibt es in der README.md im Verzeichnis ``/frontend/``.

____
<i>Written by Nicole Sauer</i>