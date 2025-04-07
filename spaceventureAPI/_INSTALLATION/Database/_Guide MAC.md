Ej testet!

# Restore data til MongoDB

Lav en mongodb-mappe:

1. Åbn Terminal, og kør: `mkdir -p ~/mongodb` - mappen ligger nu i din brugermappe (f.eks. /Users/dit-brugernavn/mongodb)

Kopier spaceventure-mappen over i mongodb-mappen:

2. Sørg for at have mappen `spaceventure` i samme mappe som den terminal, du åbner, og kør: `cp -R ./spaceventure ~/mongodb/`

3. Forudsat at du har MongoDB Database Tools installeret på din Mac, kør følgende i Terminal: `mongorestore --db=xxx ~/mongodb/spaceventure`

Hvis du ikke har **MongoDB** Tools installeret:

4.  Du kan installere **MongoDB Tools** det via Homebrew:

        brew tap mongodb/brew
        brew install mongodb-database-tools

5.  Prøv herefter igen punkt 3 herover.
