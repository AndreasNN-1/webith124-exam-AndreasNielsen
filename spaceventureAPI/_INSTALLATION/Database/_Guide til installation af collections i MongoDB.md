# Restore data til MongoDB

1.  Opret en mappe med fx navnet "mongodb" på C-drevet (VIGTIGT - det SKAL være på c-drevet)

2.  Kopier spaceventure-mappen (ligger i mappen her) ind i mappen, du lige har lavet på c-drevet

    - så du har `C:\mongodb\spaceventure` med alle json-/bson-filerne til at genskabe databasen

3.  Prøv først denne (og hvis det ikke virker - så fortsæt med punkt 4 og frem):

    Åbn cmd/kommandovindue og kør denne kommando:

        cd C:\Program Files\MongoDB\Tools\100\bin && mongorestore --db="spaceventure" "c:\mongodb\spaceventure"

    Eller i ældre versioner

        cd C:\Program Files\MongoDB\Tools\100\bin && mongorestore -d spaceventure -o c:\mongodb\spaceventure

4.  Fortsæt herefter i punkt 10 herunder ...

Hvis det IKKE virkede (databasen blev ikke installeret/genskabt) - så fortsæt herunder:

---

5.  Brug "Stifinder" og find bin-mappen i MongoDBs Tools-mappe\* - det ser nok sådan her ud:

    `C:\Program Files\MongoDB\Tools\100\bin`

    (gælder for nyere versioner - der er en anden måde i ældre versioner, når der ikke er en Tools-mappe, så sig til, hvis du ikke kan finde en Tools-mappe)

6.  I adresselinjen i Stifinder (hvor du kan se, at du står i bin-mappen) skriv `cmd`
    ... dvs. du overskriver bin-mappens sti

7.  Tryk ENTER, så åbner kommandovinduet og peger på bin-mappen (tjek det - spørg, hvis du er i tvivl)

8.  Kopier kommandoen herunder (vær omhyggelig med at få det hele med):

        mongorestore --db="spaceventure" "c:\mongodb\spaceventure"

    eller i ældre versioner

        mongorestore -d spaceventure C:\mongodb\spaceventure

9.  Paste/indsæt kommandoen (du skal stadig være i bin-mappen) og tryk `ENTER`

---

10. Nu burde MongoDB restore/genskabe databasen i din MongoDB

11. Du skulle gerne få en besked om, at x antal filer er "restored successfully"

12. Åbn MongoDB (localhost)

13. Tryk på refresh og tjek, at den nye database er oprettet, og at der er collections med documents og data-indhold

14. Start din backend (med `npm run start` eller `npm run devStart`) og tjek, at server starter op og at der er connection til din databaseserver

15. Sørg for at have import'et Postman-json-filen i Postman - åbn nogle af get-metoderne og tjek, at du får data/ingen fejl
