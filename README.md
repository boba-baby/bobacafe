# BobaBabies monorepo

The boba.baby website is built from this repository. This repository also contains all the drop rates and formulas behind it.

## Open source. Provably fair. Cryptographically verifiable.

Although BobaBabies are cute on the outside, the BobaBabies team is serious about bringing the ethos of fairness to the BobaBaby NFT drop. The source code will be publicly available for anyone to audit for full transparency before the drop. Trait frequencies are published on our website, and the formula for deterministically deriving a BobaBaby will be auditable.

The hash of the block after that in which payment was received will be used as a source of randomness for determining the traits of the bobababy. This ensures that any grinding attack to generate rare BobaBabies would require advanced MEV that is not known to be possible.

The derivation for generating the seed will be verifiable by anyone using a block explorer and online sha256 tool. The seed can be pasted into the Build & Explore tool (coming soon). The pseudocode for this derivation mechanism is presented here:

```js
seed = sha256(
  bobababyID.toString() + blockAtHeight(paymentTx.height + 1).hash.toBase58()
);
```

Another part of fairness is infrastructure access. Solana NFT projects have been overwhelmed by extremely high demand, website crashes, and RPC node failures, giving an unfair advantage to bots. The BobaBaby drop is engineered to avoid any such downtime issues. The BobaBaby ops team has over a decade of experience in deploying reliable web applications. More details on the mechanism will be announced later.

## How to build the web app

This repo doesn't contain the art that is yet to be unveiled to the public. The reason why not all art is revealed is a marketing tactic to build hype.

```
npm install
npm start
```

## How to view the art definition JSON

See [babyArtDefinition.json](./src/babyArtDefinition.json) for the JSON definition of all traits. TypeScript typings for this file is available at [IArtDef.ts](./src/IArtDef.ts).

Preview:

```js
{
  "Background": {
    "traitType": "Background",
    "traits": [
      {
        "traitName": "Blue Pink Clouds",
        "rarity": 0.25,
        "rarityName": "Ultra Rare",
        "rarityFrequency": 0.034482758620689655,
        "layers": [
          {
            "zIndex": 0,
            "fileName": "0-Background/Blue Pink Clouds.png"
          }
        ]
      },
      {
        "traitName": "Blue White Bokeh",
        "rarity": 0.5,
        "rarityName": "Rare",
        "rarityFrequency": 0.06896551724137931,
        "layers": [
          {
            "zIndex": 0,
            "fileName": "0-Background/Blue White Bokeh.png"
          }
        ]
      }
    ]
    // ...
    // ...
    // ...
  }
}
```

## How to use the importer

**Right now, the importer can't be run without the source files. This will change soon so that people can use the script. Meanwhile, take a look at `babyArtDefinition.json`**
The rarity calculations is all handled by the `importer/importer.ts` file. It will print out some statistics on rarity such as:

```
Lid
  None %: 0
  Common %: 86.61
  Rare %: 13.12
  Ultra Rare %: 0.26

Eyes
  None %: 0
  Common %: 73.83
  Rare %: 16.78
  Ultra Rare %: 9.4
```

You can then modify the importer.ts file to do calculations and simulations.

To run the importer script:

```
npm install
npm run importer
```

## License

The BobaBabies project is released under the [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).
