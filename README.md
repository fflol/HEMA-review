# Reddit Clone

This is a Hema gear review app.

It's deployed [here](https://mysword.me/).

## What's HEMA?

Historical European martial arts. Basically two nerds hacking each other with fake swords. Occasionally there will be group fights, shield wall and sneaky back-stabing etc...

[Wikipedia HEMA page](https://en.wikipedia.org/wiki/Historical_European_martial_arts)

## Tech stack

-   React

-   Next.js

-   Firebase family.

-   Material UI

Making Next.js working with Firebase is pretty **hacky**. Probabaly will try other stacks next time.

## Folder structure:

    .
    ├── > node_modules
    ├── > src
    │       ├── > app                             # main app folder
    │       │      ├── > components               # components
    │       │      ├── > firebase                 # Firebase related files
    │       │      ├── > pages                    # Next.js pages
    │       │      ├── > public                   # Next.js static resources
    │       │      ├── > styles                   # top level and pages styles.
    │       │      └── > tools                    # generic files
    │       │
    │       ├──   next.config.js                  # Next.js configs
    │       │
    │       ├── > functions                       # Firebase cloud functions
    │       │        ├──  .babelrc                # babel setting, just for build
    │       │        └──  index.js                # cloud function index
    │       │
    │       └── > public                          # these will be used for build
    │
    ├── .gitignore
    ├── firebase.json
    ├── firestore.indexes.json
    ├── firestore.rules
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── storage.rules

## things to be done

-   performance

-   auto upload files from supplier's website.

-   other stuff ...

## Authors

-   **Kay Lee**
    > just me

## License

MIT
