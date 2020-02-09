![1244 mounted knight, Siege of Jerusalem](https://qph.fs.quoracdn.net/main-qimg-b4fea864fefcde82a95af5c2be86fb05)

# Mysword.me

This is a Hema gear review app.

It's deployed [here](https://mysword.me/).

## What's HEMA?

Historical European martial arts. Basically two nerds hacking each other with fake swords. Occasionally there will be group fights, shield wall and sneaky backstabbing etc...

[Wikipedia HEMA page](https://en.wikipedia.org/wiki/Historical_European_martial_arts)

## Tech stack

-   React

> Because this is small and all by myself, I didn't use Redux. instead, **useContext**, **useState** and **useReduce** are utilized for state management.

> Api calls are handled in three places:

> -   Initial HTTP GET are performed on server side, within **getInitialProps** (Next.js method).
> -   Client side initial api calls are performed in **useEffect**, as IIFEs (async functions).
> -   Other CRUD methods are just async functions, invoked when needed.

-   Next.js

> Next.js is pretty awesome, it does server-side rendering, routing, compiling and a lot of other things for us.

> Having said that, getting Next.js to work with Firebase is pretty **hacky**, because those backend logic also need to be deployed to Firebase. Eventually Zeit has an example of deploying the **next()** method as a cloud function and rewrites the Firebase hosting.

-   Firebase family.

> Firestore, cloud function, storage, hosting. Average rating, review numbers and other stuff are calculated with cloud functions dynamically.

-   Material UI

> Had to do some hacking to get Next.js working with it as well. But generally happy with it.

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
