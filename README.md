# WatchedIt


# Istruzioni WatchedIt
Gozzi Carlo Gabriel - 246517
Zuco Francesco - 230958
Falvo Giuseppe - 246137
Gaudio Domenico - 246017

per farlo funzionare è necessario:

clonare il main

restorare il database caricando il file database.sql in un database postgres chiamato WatchedIt tramite upload del file in shell sql

controllare che le credenziali di accesso del database coincidano con quelle della connection nel progetto backend nel file src/main/java/org/unical/webapp/backend/persistence/DBManager.java

eseguire in parallelo i progetti frontend e backend

## Account
le credenziali di un account admin sono
mail: admin
password: admin

altri account:
mail:utente@2.com
utente:utente2;

mail:utente@1.com
utente:utente1

## Testare admin
2 utenti già presenti nel db hanno avuto una discussione sul film di Godzilla, (Il primo nella ricerca con "Godzilla" , il più figo)



solo l'admin può eliminare i commenti

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

