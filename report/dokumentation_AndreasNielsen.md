# Webith124 Exam Dokumentation

## START

**Opgavens navn:** SPACE VENTURE  
**Navn:** Andreas Nielsen  
**Klasse:** webith124  
**Skole:** Viden Djurs  
**Afleveringsdato:** 4/12/2025

**Bekræftelse:**  
_Jeg bekræfter hermed, at jeg selvstændigt og uden brug af AI og hjælp fra andre har udviklet det afleverede eksamensprojekt._

![Underskrift](imgs/image.png)

---

## Indledning

Denne dokumentation beskriver udviklingen af "Dit Hjem"-projektet, en webløsning udviklet som en del af eksamen i Webith124.
Projektet blev udviklet med React og en række tredjepartsbiblioteker for at sikre en responsiv og moderne brugeroplevelse.

Jeg har primært fokuseret på at skabe en brugervenlig og effektiv løsning med optimeret ydeevne. Undervejs har jeg foretaget flere beslutninger omkring teknologi og arkitektur for at forbedre funktionaliteten og skalerbarheden af applikationen.

---

## Tech Stack

| Teknologi | Beskrivelse        | Fordele                                             | Ulemper                                    |
| --------- | ------------------ | --------------------------------------------------- | ------------------------------------------ |
| **React** | Frontend framework | Hurtig, komponentbaseret udvikling, stort community | Kan være tungt for simple projekter        |
| **Vite**  | Byggeværktøj       | Hurtig udviklingsserver, moderne modulsystem        | Ikke altid kompatibel med ældre npm-pakker |
| **Axios** | HTTP-klient        | Simpel API-håndtering, understøtter async/await     | Kan erstattes af fetch API                 |
| **Sass**  | CSS Preprocessor   | Lettere at organisere CSS-kode                      | Kræver prækompilering                      |

---

## Test Oplysninger

- **API URL:** [127.0.0.1:5020](ttp://127.0.0.1:5020)
- **API StartUp:** `cd app-api && npm i && npm start`

- **APP URL:** [localhost:5173](http://localhost:5173/)
- **APP StartUp:** `cd vite-app && npm i && npm run dev`

- **For Login:**
  - **URL**: `/Login`
  - **Email**: CodeWizard@byteMe.com
  - **Password**: npmRunThis123!

---

## Tidsplan, Estimat og To-Do Liste

Jeg har organiseret min opgave vha. Trello, hvor jeg har planlagt opgaver, estimeret tid, og tracket mine fremskridt.

**Trello Board Link:** 
- [Trello link](https://trello.com/invite/b/67e12ca3a50b2cc085bf3cd4/ATTI432c7b37cccf9538f3fdbc659e7567a8DC2390A2/webith124-andreasnielsen)

**Tidsplan, Estimat**
- "6 dag / 8 timer per dag"

| Dag-1               | Tids Estimat | Rigtig Tid | info                                       |
| ------------------- | ------------ | ---------- | ------------------------------------------ |
| **Header**          | 1 1/2 : hr   | 2 : hrs| Jeg kom meget hurtigt i gang med den, men indså et godt stykke inde i processen, at jeg kunne have lavet det på en meget lettere måde. Jeg startede nemlig med at sætte det op i forskellige dele, men opdagede, at jeg kunne kombinere de fleste af dem og færdiggøre det i styling. |
| **Footer**          | 1 : hr   | 45 : mins    | Det var lettere at lave footeren samt at få dataet og styling til at virke |
| **Banner / silder** | 1 : hr   | 1 1/4 : hrs    | tog en smule længere end jeg havde regnet med da jeg skulle lave den dynamisk hvis det ikke er en slider |
| **Ture Preview**    | 1 : hr   | 35 : mins    | to ingen tid da det kun var to billeder og et link |
| **Lidt om os**      | 1 : hr   | 1 : hrs    | Jeg lagde mærke mærke til at der er et komponent som dette på mere end en side så jeg brugte en smule ekstra tid på at få den til at være dynamisk og virke på begge |
| **Vores team**      | 1 : hr   | 35 : mins    | tog mig ikke så lang tid i forhold til at jeg bare skulle map app nogle objekter ud og så vise det i et                      |
| **nyhedsbrev**      | 1 : hr   | 1 1/2 : hrs    | Kræver prækompilering                      |

| Dag-2               | Tids Estimat | Rigtig Tid | info                                       |
| ------------------- | ------------ | ---------- | ------------------------------------------ |
| **Header**          | 1 1/2 : hr   | 2 : hrs    | Kan være tungt for simple                  |
| **Footer**          | 1 1/2 : hr   | 2 : hrs    | Ikke altid kompatibel med ældre npm-pakker |
| **Banner / silder** | 1 1/2 : hr   | 2 : hrs    | Kan erstattes af fetch API                 |
| **Sass**            | 1 1/2 : hr   | 2 : hrs    | Kræver prækompilering                      |
| **dags Tid:**       | 8 : hr       | 9 : hrs    | Kræver prækompilering                      |

| Dag-3               | Tids Estimat | Rigtig Tid | info                                       |
| ------------------- | ------------ | ---------- | ------------------------------------------ |
| **Header**          | 1 1/2 : hr   | 2 : hrs    | Kan være tungt for simple                  |
| **Footer**          | 1 1/2 : hr   | 2 : hrs    | Ikke altid kompatibel med ældre npm-pakker |
| **Banner / silder** | 1 1/2 : hr   | 2 : hrs    | Kan erstattes af fetch API                 |
| **Sass**            | 1 1/2 : hr   | 2 : hrs    | Kræver prækompilering                      |
| **dags Tid:**       | 8 : hr       | 9 : hrs    | Kræver prækompilering                      |

| Dag-4               | Tids Estimat | Rigtig Tid | info                                       |
| ------------------- | ------------ | ---------- | ------------------------------------------ |
| **Header**          | 1 1/2 : hr   | 2 : hrs    | Kan være tungt for simple                  |
| **Footer**          | 1 1/2 : hr   | 2 : hrs    | Ikke altid kompatibel med ældre npm-pakker |
| **Banner / silder** | 1 1/2 : hr   | 2 : hrs    | Kan erstattes af fetch API                 |
| **Sass**            | 1 1/2 : hr   | 2 : hrs    | Kræver prækompilering                      |
| **dags Tid:**       | 8 : hr       | 9 : hrs    | Kræver prækompilering                      |

| Dag-5               | Tids Estimat | Rigtig Tid | info                                       |
| ------------------- | ------------ | ---------- | ------------------------------------------ |
| **Header**          | 1 1/2 : hr   | 2 : hrs    | Kan være tungt for simple                  |
| **Footer**          | 1 1/2 : hr   | 2 : hrs    | Ikke altid kompatibel med ældre npm-pakker |
| **Banner / silder** | 1 1/2 : hr   | 2 : hrs    | Kan erstattes af fetch API                 |
| **Sass**            | 1 1/2 : hr   | 2 : hrs    | Kræver prækompilering                      |
| **dags Tid:**       | 8 : hr       | 9 : hrs    | Kræver prækompilering                      |

| Dag-6               | Tids Estimat | Rigtig Tid | info                                       |
| ------------------- | ------------ | ---------- | ------------------------------------------ |
| **Header**          | 1 1/2 : hr   | 2 : hrs    | Kan være tungt for simple                  |
| **Footer**          | 1 1/2 : hr   | 2 : hrs    | Ikke altid kompatibel med ældre npm-pakker |
| **Banner / silder** | 1 1/2 : hr   | 2 : hrs    | Kan erstattes af fetch API                 |
| **Sass**            | 1 1/2 : hr   | 2 : hrs    | Kræver prækompilering                      |
| **dags Tid:**       | 8 : hr       | 9 : hrs    | Kræver prækompilering                      |

---

## Tilvalgsopgaver

I forbindelse med eksamensopgaven har jeg valgt at inkludere følgende tilvalgsopgaver:

- Implementering af dark mode
- Dynamisk routing med React Router
- Integration af tredjeparts API
