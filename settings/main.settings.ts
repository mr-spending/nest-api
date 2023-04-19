import { SwaggerCustomOptions } from '@nestjs/swagger';

export const listenPort = 3500;
export const swaggerPath = 'api';
export const swaggerDocumentConfig = {
  title: 'Spending app',
  description: 'The spending API description',
  version: '1.0dev',
};
export const swaggerCustomOptions: SwaggerCustomOptions = {
  customfavIcon:
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNGQ0RDMDA7fS5zdDF7ZmlsbDojMTczNjQ3O30uc3Qye2ZpbGw6I0ZGRkZGRjt9LnN0M3tmaWxsOiMyQzI4MkM7fS5zdDR7ZmlsbDojRjRDRjE0O30uc3Q1e2ZpbGw6IzYzREIyQTt9LnN0NntmaWxsOiM1MEU0RUE7fS5zdDd7ZmlsbDojMDdDRUQ2O30uc3Q4e2ZpbGw6Izg1RUEyRDt9LnN0OXtmaWxsOiMwNEFBREI7fS5zdDEwe2ZpbGw6I0ZGNzMwQjt9LnN0MTF7ZmlsbDojMTdEMUZDO30uc3QxMntmaWxsOiMwMEFBREI7fS5zdDEze2ZpbGw6bm9uZTt9PC9zdHlsZT48Zz48Zz48Zz48Zz48Zz48cGF0aCBjbGFzcz0ic3Q4IiBkPSJNNTAsOTcuMTRDMjQuMDA2LDk3LjE0LDIuODU5LDc1Ljk5NCwyLjg1OSw1MFMyNC4wMDYsMi44Niw1MCwyLjg2Uzk3LjE0LDI0LjAwNyw5Ny4xNCw1MFM3NS45OTMsOTcuMTQsNTAsOTcuMTR6Ii8+PC9nPjxnPjxnPjxwYXRoIGNsYXNzPSJzdDgiIGQ9Ik01MCw1LjIxOWMyNC43MzIsMCw0NC43ODEsMjAuMDQ5LDQ0Ljc4MSw0NC43ODFjMCwyNC43MzItMjAuMDQ5LDQ0Ljc4MS00NC43ODEsNDQuNzgxQzI1LjI2OCw5NC43ODEsNS4yMTksNzQuNzMyLDUuMjE5LDUwQzUuMjE5LDI1LjI2OCwyNS4yNjgsNS4yMTksNTAsNS4yMTkgTTUwLDAuNUMyMi43MDYsMC41LDAuNSwyMi43MDYsMC41LDUwUzIyLjcwNiw5OS41LDUwLDk5LjVjMjcuMjk1LDAsNDkuNS0yMi4yMDYsNDkuNS00OS41Uzc3LjI5NCwwLjUsNTAsMC41TDUwLDAuNXoiLz48L2c+PC9nPjwvZz48L2c+PC9nPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMS42NjksMzMuOTk3Yy0wLjE1MiwxLjY5NCwwLjA1NywzLjQ0NS0wLjA1Nyw1LjE1OGMtMC4xMzQsMS43MTMtMC4zNDMsMy40MDctMC42ODYsNS4xMDJjLTAuNDc2LDIuNDE3LTEuOTgsNC4yNDUtNC4wNTQsNS43NjhjNC4wMzYsMi42MjcsNC40OTIsNi43LDQuNzU5LDEwLjgzMWMwLjEzNCwyLjIyNywwLjA3Niw0LjQ3MywwLjMwNSw2LjY4MWMwLjE3MSwxLjcxMywwLjgzNywyLjE1MSwyLjYwOCwyLjIwOGMwLjcyMywwLjAxOSwxLjQ2NSwwLDIuMzAzLDB2NS4yOTJjLTUuMjM1LDAuODk1LTkuNTU1LTAuNTktMTAuNjIxLTUuMDI1Yy0wLjM0My0xLjYxOC0wLjU3Mi0zLjI3NC0wLjY0Ny00Ljk0OWMtMC4xMTUtMS43NywwLjA3NS0zLjU0MS0wLjA1OC01LjMxMWMtMC4zODEtNC44NTQtMS4wMDktNi40OTEtNS42NTMtNi43MTl2LTYuMDM0YzAuMzQyLTAuMDc2LDAuNjY1LTAuMTMzLDEuMDA4LTAuMTcxYzIuNTUtMC4xMzMsMy42MzUtMC45MTQsNC4xODctMy40MjdjMC4yNjctMS40MDgsMC40MTktMi44MzYsMC40NzYtNC4yODNjMC4xOTEtMi43NTksMC4xMTQtNS41NzcsMC41OS04LjMxOGMwLjY2Ni0zLjk0LDMuMTAzLTUuODQ0LDcuMTU4LTYuMDcyYzEuMTQyLTAuMDU3LDIuMzAzLDAsMy42MTYsMHY1LjQwNmMtMC41NTIsMC4wMzgtMS4wMjgsMC4xMTQtMS41MjIsMC4xMTRDMzIuMDg5LDMwLjEzMywzMS45MTcsMzEuMjU2LDMxLjY2OSwzMy45OTd6IE0zOC4wMDgsNDYuNTIyaC0wLjA3NmMtMS45MDMtMC4wOTUtMy41NCwxLjM4OS0zLjYzNiwzLjI5M2MtMC4wOTUsMS45MjMsMS4zODksMy41NiwzLjI5MywzLjY1NGgwLjIyOWMxLjg4NSwwLjExNCwzLjUwMi0xLjMzMiwzLjYxNi0zLjIxN3YtMC4xOTFDNDEuNDcyLDQ4LjE0LDM5LjkzLDQ2LjU2LDM4LjAwOCw0Ni41MjJ6IE00OS45NDMsNDYuNTIyYy0xLjg0Ny0wLjA1Ny0zLjM4OSwxLjM4OS0zLjQ0NSwzLjIxN2MwLDAuMTE0LDAsMC4yMSwwLjAyLDAuMzIzYzAsMi4wNzUsMS40MDgsMy40MDcsMy41NCwzLjQwN2MyLjA5NCwwLDMuNDA3LTEuMzcsMy40MDctMy41MjFDNTMuNDQ1LDQ3Ljg3Myw1Mi4wNTUsNDYuNTAzLDQ5Ljk0Myw0Ni41MjJ6IE02Mi4xNjMsNDYuNTIyYy0xLjk0Mi0wLjAzOC0zLjU2LDEuNTA0LTMuNjE2LDMuNDQ1YzAsMS45NDIsMS41NjEsMy41MDIsMy41MDIsMy41MDJoMC4wMzhjMS43NTEsMC4zMDUsMy41MjItMS4zODksMy42MzYtMy40MjZDNjUuODE3LDQ4LjE1OSw2NC4xMDQsNDYuNTIyLDYyLjE2Myw0Ni41MjJ6IE03OC45MzMsNDYuODA3Yy0yLjIwOC0wLjA5NS0zLjMxMi0wLjgzNy0zLjg2NC0yLjkzMWMtMC4zNDMtMS4zMzItMC41NTItMi43MjItMC42MjgtNC4wOTJjLTAuMTUyLTIuNTUtMC4xMzQtNS4xMi0wLjMwNS03LjY3MWMtMC40LTYuMDUzLTQuNzc3LTguMTY1LTExLjEzNS03LjExOXY1LjI1NGMxLjAwOCwwLDEuNzg5LDAsMi41NywwLjAxOWMxLjM1MSwwLjAxOSwyLjM3OSwwLjUzMywyLjUxMiwyLjAzN2MwLjEzNCwxLjM3LDAuMTM0LDIuNzYsMC4yNjcsNC4xNDljMC4yNjcsMi43NiwwLjQxOCw1LjU1OCwwLjg5NCw4LjI4YzAuNDE5LDIuMjQ2LDEuOTYxLDMuOTIxLDMuODgzLDUuMjkyYy0zLjM2OCwyLjI2NS00LjM1OSw1LjUwMS00LjUzLDkuMTM3Yy0wLjA5NSwyLjQ5My0wLjE1Miw1LjAwNi0wLjI4NSw3LjUxOWMtMC4xMTQsMi4yODQtMC45MTQsMy4wMjYtMy4yMTcsMy4wODNjLTAuNjQ3LDAuMDE5LTEuMjc1LDAuMDc2LTEuOTk4LDAuMTE0djUuMzg3YzEuMzUxLDAsMi41ODgsMC4wNzYsMy44MjYsMGMzLjg0NS0wLjIyOSw2LjE2OC0yLjA5NCw2LjkyOS01LjgyNWMwLjMyMy0yLjA1NiwwLjUxNC00LjEzLDAuNTcxLTYuMjA1YzAuMTMzLTEuOTAzLDAuMTE0LTMuODI2LDAuMzA1LTUuNzFjMC4yODUtMi45NSwxLjYzNy00LjE2OCw0LjU4Ny00LjM1OWMwLjI4Ni0wLjAzOCwwLjU1Mi0wLjA5NSwwLjgxOS0wLjE5di02LjAzNEM3OS42MzcsNDYuODgzLDc5LjI5NCw0Ni44MjcsNzguOTMzLDQ2LjgwN3oiLz48L2c+PC9zdmc+',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui-standalone-preset.min.js',
  ],
  customCssUrl: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui.css',
  ],
};
