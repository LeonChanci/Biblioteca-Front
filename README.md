# BibliotecaApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

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

## PROYECTO Biblioteca 
Desarrollar una solución web (desplegada) que le facilite un mejor control sobre los datos de clientes y libros de la Biblioteca, también llevar un registro sobre los libros que los clientes prestan guardando la información en base de datos.Información sobre el clientes (Cedula, Nombres, Apellidos, Dirección, Teléfono)

`Tener en cuenta:`
- Información sobre los Clientes: Identificación, Nombres, Apellidos, Edad, Dirección y Teléfono.
- Información sobre los Libros: Nombre, Descripción, Apellidos, Autores, Categorías y Fecha Publicación.
- Información sobre los Préstamos: Libro prestado, Cliente que hace el préstamo, fecha inicio, fecha final.

`Se requiere:`
- Crear CRUD sobre la información referenciada anteriormente: Clientes, Libros y Préstamos (Guardar información en la BD).
- Desplegar la solución en la NUBE.
- Aprendizaje independiente.

## Arquitectura
Proyecto con Arquitectura en Capas:
- `Back:` Capa de lógica hecha con Java 17 - Spring Boot - Spring Data JPA
  - Ofreciendo Servicios APIs REST.
  - Utilizando GitHub.
- `Front:` Capa de presentación hecha con Angular 18
- `BD:` Capa de persistencia en MySQL
  - JawsDB: Proveedor de Bases de datos como servicio asociado a Heroku.
- `Cloud:` Heroku como plataforma de servicios en la nube para el despliegue de aplicaciones


## Info
Proyecto by Politecnico Colimbiano Jaime Isaza Cadavid
Signature: PROGRAMACIÓN DISTRIBUIDA Y PARALELA
Teacher: Hernando Recaman Chaux
