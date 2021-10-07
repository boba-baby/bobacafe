import { TraitType } from "../src/IArtDef";

export type AllBackgroundTraits = 
  | "Blue White Bokeh"
  | "Gradient Blue Purple"
  | "Gradient Dark Blue"
  | "Gradient Dark Purple"
  | "Gradient Dark Teal"
  | "Gradient Green Blue"
  | "Gradient Orange Green Teal"
  | "Gradient Orange Pink"
  | "Gradient Pink Blue"
  | "Gradient Pink Orange Green"
  | "Gradient Sunset"
  | "Gradient Yellow Green"
  | "Orange White Bokeh"
  | "Pink White Bokeh"
  | "Plain Blue"
  | "Plain Blue Gray"
  | "Plain Bright Orange"
  | "Plain Coral"
  | "Plain Green"
  | "Plain Light Teal"
  | "Plain Magenta"
  | "Plain Peridot"
  | "Plain Pink"
  | "Plain Purple"
  | "Plain Yellow"
  | "Purple Pink Bokeh";

export const BackgroundTraits = new Set([
  "Blue White Bokeh",
  "Gradient Blue Purple",
  "Gradient Dark Blue",
  "Gradient Dark Purple",
  "Gradient Dark Teal",
  "Gradient Green Blue",
  "Gradient Orange Green Teal",
  "Gradient Orange Pink",
  "Gradient Pink Blue",
  "Gradient Pink Orange Green",
  "Gradient Sunset",
  "Gradient Yellow Green",
  "Orange White Bokeh",
  "Pink White Bokeh",
  "Plain Blue",
  "Plain Blue Gray",
  "Plain Bright Orange",
  "Plain Coral",
  "Plain Green",
  "Plain Light Teal",
  "Plain Magenta",
  "Plain Peridot",
  "Plain Pink",
  "Plain Purple",
  "Plain Yellow",
  "Purple Pink Bokeh",
]);

export type AllOverlayTraits = 
  | "Autumn Leaves"
  | "Clouds"
  | "Green Leaves"
  | "None"
  | "Pink Cherry Blossom Petals"
  | "Stars"
  | "Stars and Moon"
  | "White Cherry Blossom Petals";

export const OverlayTraits = new Set([
  "Autumn Leaves",
  "Clouds",
  "Green Leaves",
  "None",
  "Pink Cherry Blossom Petals",
  "Stars",
  "Stars and Moon",
  "White Cherry Blossom Petals",
]);

export type AllCupTraits = 
  | "White";

export const CupTraits = new Set([
  "White",
]);

export type AllDrinkTraits = 
  | "Gradient Blue-Pink"
  | "Solid Aqua"
  | "Solid Beige Cream"
  | "Solid Blue"
  | "Solid Blue Green"
  | "Solid Gray Blue"
  | "Solid Gray Green"
  | "Solid Green"
  | "Solid Green Blue"
  | "Solid Lavender"
  | "Solid Medium Green"
  | "Solid Medium Purple"
  | "Solid Orange"
  | "Solid Periwinkle"
  | "Solid Pink"
  | "Solid Purple"
  | "Solid Red"
  | "Solid Wine"
  | "Solid Yellow Green";

export const DrinkTraits = new Set([
  "Gradient Blue-Pink",
  "Solid Aqua",
  "Solid Beige Cream",
  "Solid Blue",
  "Solid Blue Green",
  "Solid Gray Blue",
  "Solid Gray Green",
  "Solid Green",
  "Solid Green Blue",
  "Solid Lavender",
  "Solid Medium Green",
  "Solid Medium Purple",
  "Solid Orange",
  "Solid Periwinkle",
  "Solid Pink",
  "Solid Purple",
  "Solid Red",
  "Solid Wine",
  "Solid Yellow Green",
]);

export type AllBlushTraits = 
  | "Blue Spiral"
  | "Blue Star"
  | "Dark Pink Circle"
  | "Dark Pink Heart"
  | "Dark Pink Line"
  | "Dark Pink Oval"
  | "Dark Pink Spiral"
  | "Gray Spiral"
  | "Light Pink Circle"
  | "Light Pink Heart"
  | "Light Pink Oval"
  | "Light Pink Spiral"
  | "None"
  | "Orange Circle"
  | "Orange Heart"
  | "Orange Oval"
  | "Orange Spiral"
  | "Pink Circle"
  | "Pink Line"
  | "Pink Star"
  | "Pink Transparent Circle"
  | "Purple Heart"
  | "Purple Spiral"
  | "Purple Star"
  | "Purple Transparent Circle"
  | "Red Circle"
  | "Red Heart"
  | "Red Line"
  | "Red Oval"
  | "Red Spiral"
  | "Red Transparent Circle"
  | "Yellow Star";

export const BlushTraits = new Set([
  "Blue Spiral",
  "Blue Star",
  "Dark Pink Circle",
  "Dark Pink Heart",
  "Dark Pink Line",
  "Dark Pink Oval",
  "Dark Pink Spiral",
  "Gray Spiral",
  "Light Pink Circle",
  "Light Pink Heart",
  "Light Pink Oval",
  "Light Pink Spiral",
  "None",
  "Orange Circle",
  "Orange Heart",
  "Orange Oval",
  "Orange Spiral",
  "Pink Circle",
  "Pink Line",
  "Pink Star",
  "Pink Transparent Circle",
  "Purple Heart",
  "Purple Spiral",
  "Purple Star",
  "Purple Transparent Circle",
  "Red Circle",
  "Red Heart",
  "Red Line",
  "Red Oval",
  "Red Spiral",
  "Red Transparent Circle",
  "Yellow Star",
]);

export type AllStrawTraits = 
  | "Blue"
  | "Fuchsia"
  | "Green"
  | "None"
  | "Orange"
  | "Purple"
  | "Rainbow"
  | "Red"
  | "Red Orange"
  | "White"
  | "Yellow";

export const StrawTraits = new Set([
  "Blue",
  "Fuchsia",
  "Green",
  "None",
  "Orange",
  "Purple",
  "Rainbow",
  "Red",
  "Red Orange",
  "White",
  "Yellow",
]);

export type AllLidTraits = 
  | "Alien-Gold"
  | "Alien-Gray"
  | "Alien-Green"
  | "Alpaca-Beige"
  | "Alpaca-Pink"
  | "Bear-Brown"
  | "Bear-Polar"
  | "Bear-Purple"
  | "Bear-Yellow"
  | "Boba-Black"
  | "Boba-White"
  | "Bread Roll-Plain"
  | "Bread Roll-Taro"
  | "Bull-Gold Ring"
  | "Bull-Solana"
  | "Bunny-Brown"
  | "Bunny-White"
  | "Cat-Black Spots"
  | "Cat-Brown"
  | "Cat-Orange Spots"
  | "Cat-White"
  | "Cow-Black White"
  | "Cow-Brown White"
  | "Cupcake-Blue Sprinkles"
  | "Cupcake-Orange"
  | "Cupcake-Pink"
  | "Cupcake-Pink Sprinkles"
  | "Cupcake-Purple Sprinkles"
  | "Cupcake-Rainbow"
  | "Dough-Blue"
  | "Dough-Pink"
  | "Dough-White"
  | "Dragon-Green"
  | "Dragon-Red"
  | "Ghost-Pink"
  | "Ghost-White"
  | "Gorilla-Blue Gray"
  | "Gorilla-Gray"
  | "Hamster-Brown"
  | "Hamster-Gray"
  | "Hamster-Orange"
  | "Horse-Brown"
  | "Horse-White"
  | "Ice Cream-Chocolate"
  | "Ice Cream-Strawberry"
  | "Ice Cream-Vanilla"
  | "Monkey-Brown"
  | "Monkey-Brown and Pink"
  | "Moon-Rocket"
  | "Mouse-Gray"
  | "Mouse-White"
  | "Nigiri-Light Pink"
  | "Nigiri-Red Orange"
  | "Onigiri-Black and White"
  | "Onigiri-Flavored"
  | "Otter-Ash Brown"
  | "Otter-Brown"
  | "Ox-Beige"
  | "Ox-Gold"
  | "Panda-Black and White"
  | "Panda-Blue"
  | "Panda-Pink"
  | "Panda-Purple"
  | "Pig-Gray"
  | "Pig-Pink"
  | "Poodle-Brown"
  | "Poodle-White"
  | "Pumpkin-Orange"
  | "Pumpkin-White"
  | "Ram-Black"
  | "Ram-White"
  | "Red Panda-Light Orange"
  | "Red Panda-Red Orange"
  | "Rock-Blue"
  | "Rock-Pink"
  | "Rock-Purple"
  | "Rooster-Brown"
  | "Rooster-White"
  | "Sheep-Beige"
  | "Sheep-Black"
  | "Sheep-Blue"
  | "Sheep-Brown"
  | "Sheep-Green"
  | "Sheep-Orange"
  | "Sheep-Pink"
  | "Sheep-Purple"
  | "Sheep-Red"
  | "Sheep-White"
  | "Sheep-Yellow"
  | "Shiba-Black"
  | "Shiba-Red"
  | "Snake-Green"
  | "Snake-White Pink"
  | "Striped Cat-Gray"
  | "Striped Cat-Orange"
  | "Striped Cat-Pink"
  | "Sun-Yellow"
  | "Sun-Yellow Orange"
  | "Teddy Bear-Avalanche"
  | "Teddy Bear-Black"
  | "Teddy Bear-Dark Brown"
  | "Teddy Bear-Ethereum"
  | "Teddy Bear-Golden Brown"
  | "Teddy Bear-Red Velvet"
  | "Tiger-Orange"
  | "Tiger-White"
  | "Unicorn-Secret.A"
  | "Unicorn-Solana"
  | "Unicorn-White"
  | "Whale-Blue"
  | "Whale-White";

export const LidTraits = new Set([
  "Alien-Gold",
  "Alien-Gray",
  "Alien-Green",
  "Alpaca-Beige",
  "Alpaca-Pink",
  "Bear-Brown",
  "Bear-Polar",
  "Bear-Purple",
  "Bear-Yellow",
  "Boba-Black",
  "Boba-White",
  "Bread Roll-Plain",
  "Bread Roll-Taro",
  "Bull-Gold Ring",
  "Bull-Solana",
  "Bunny-Brown",
  "Bunny-White",
  "Cat-Black Spots",
  "Cat-Brown",
  "Cat-Orange Spots",
  "Cat-White",
  "Cow-Black White",
  "Cow-Brown White",
  "Cupcake-Blue Sprinkles",
  "Cupcake-Orange",
  "Cupcake-Pink",
  "Cupcake-Pink Sprinkles",
  "Cupcake-Purple Sprinkles",
  "Cupcake-Rainbow",
  "Dough-Blue",
  "Dough-Pink",
  "Dough-White",
  "Dragon-Green",
  "Dragon-Red",
  "Ghost-Pink",
  "Ghost-White",
  "Gorilla-Blue Gray",
  "Gorilla-Gray",
  "Hamster-Brown",
  "Hamster-Gray",
  "Hamster-Orange",
  "Horse-Brown",
  "Horse-White",
  "Ice Cream-Chocolate",
  "Ice Cream-Strawberry",
  "Ice Cream-Vanilla",
  "Monkey-Brown",
  "Monkey-Brown and Pink",
  "Moon-Rocket",
  "Mouse-Gray",
  "Mouse-White",
  "Nigiri-Light Pink",
  "Nigiri-Red Orange",
  "Onigiri-Black and White",
  "Onigiri-Flavored",
  "Otter-Ash Brown",
  "Otter-Brown",
  "Ox-Beige",
  "Ox-Gold",
  "Panda-Black and White",
  "Panda-Blue",
  "Panda-Pink",
  "Panda-Purple",
  "Pig-Gray",
  "Pig-Pink",
  "Poodle-Brown",
  "Poodle-White",
  "Pumpkin-Orange",
  "Pumpkin-White",
  "Ram-Black",
  "Ram-White",
  "Red Panda-Light Orange",
  "Red Panda-Red Orange",
  "Rock-Blue",
  "Rock-Pink",
  "Rock-Purple",
  "Rooster-Brown",
  "Rooster-White",
  "Sheep-Beige",
  "Sheep-Black",
  "Sheep-Blue",
  "Sheep-Brown",
  "Sheep-Green",
  "Sheep-Orange",
  "Sheep-Pink",
  "Sheep-Purple",
  "Sheep-Red",
  "Sheep-White",
  "Sheep-Yellow",
  "Shiba-Black",
  "Shiba-Red",
  "Snake-Green",
  "Snake-White Pink",
  "Striped Cat-Gray",
  "Striped Cat-Orange",
  "Striped Cat-Pink",
  "Sun-Yellow",
  "Sun-Yellow Orange",
  "Teddy Bear-Avalanche",
  "Teddy Bear-Black",
  "Teddy Bear-Dark Brown",
  "Teddy Bear-Ethereum",
  "Teddy Bear-Golden Brown",
  "Teddy Bear-Red Velvet",
  "Tiger-Orange",
  "Tiger-White",
  "Unicorn-Secret.A",
  "Unicorn-Solana",
  "Unicorn-White",
  "Whale-Blue",
  "Whale-White",
]);

export type AllEyesTraits = 
  | "Closed U"
  | "Closed V"
  | "Dots"
  | "Huge Alien"
  | "Oval"
  | "Oval Highlighted"
  | "Oval Single Lash"
  | "Pie"
  | "Pink Heart"
  | "Pink Heart Polka Dot"
  | "Red Heart"
  | "Relaxed"
  | "Round Bottom Lash"
  | "Round Double Lash"
  | "Round Highlighted"
  | "Round Single Lash"
  | "Round Top Lash"
  | "Round Top Lash Wink"
  | "Round Wink"
  | "Sparkly"
  | "Sparkly Bottom Lash"
  | "Sparkly Double Lash"
  | "Sparkly Double Lash Wink"
  | "Sparkly Single Lash"
  | "Sparkly Top Lash"
  | "Sparkly Wink"
  | "Spiral"
  | "Star Eyes";

export const EyesTraits = new Set([
  "Closed U",
  "Closed V",
  "Dots",
  "Huge Alien",
  "Oval",
  "Oval Highlighted",
  "Oval Single Lash",
  "Pie",
  "Pink Heart",
  "Pink Heart Polka Dot",
  "Red Heart",
  "Relaxed",
  "Round Bottom Lash",
  "Round Double Lash",
  "Round Highlighted",
  "Round Single Lash",
  "Round Top Lash",
  "Round Top Lash Wink",
  "Round Wink",
  "Sparkly",
  "Sparkly Bottom Lash",
  "Sparkly Double Lash",
  "Sparkly Double Lash Wink",
  "Sparkly Single Lash",
  "Sparkly Top Lash",
  "Sparkly Wink",
  "Spiral",
  "Star Eyes",
]);

export type AllBobaTraits = 
  | "All Hearts"
  | "Bears Boba"
  | "Cats Boba"
  | "Green Apple Boba"
  | "Half Cup Round Boba"
  | "Hearts and Stars"
  | "Hearts and Stars Partial"
  | "Hearts Partial"
  | "None"
  | "Pineapple Boba"
  | "Shaken Boba"
  | "Solana Boba"
  | "Stars Boba"
  | "Stars Partial"
  | "Strawberry Boba"
  | "Third Cup Round Black"
  | "Three Rows Boba";

export const BobaTraits = new Set([
  "All Hearts",
  "Bears Boba",
  "Cats Boba",
  "Green Apple Boba",
  "Half Cup Round Boba",
  "Hearts and Stars",
  "Hearts and Stars Partial",
  "Hearts Partial",
  "None",
  "Pineapple Boba",
  "Shaken Boba",
  "Solana Boba",
  "Stars Boba",
  "Stars Partial",
  "Strawberry Boba",
  "Third Cup Round Black",
  "Three Rows Boba",
]);

export type AllGlassesTraits = 
  | "Blue Clear"
  | "Gold Round Eyeglasses"
  | "Gray Round Sunglasses"
  | "Green Flower Sunglasses"
  | "Green Round Sunglasses"
  | "Monocle"
  | "None"
  | "Orange Flower Sunglasses"
  | "Orange Round Sunglasses"
  | "Pink Heart Sunglasses"
  | "Purple Gradient Heart Sunglasses"
  | "Purple Round Sunglasses"
  | "Silver Round Eyeglasses"
  | "Solana Heart Sunglasses"
  | "Yellow Round Sunglasses";

export const GlassesTraits = new Set([
  "Blue Clear",
  "Gold Round Eyeglasses",
  "Gray Round Sunglasses",
  "Green Flower Sunglasses",
  "Green Round Sunglasses",
  "Monocle",
  "None",
  "Orange Flower Sunglasses",
  "Orange Round Sunglasses",
  "Pink Heart Sunglasses",
  "Purple Gradient Heart Sunglasses",
  "Purple Round Sunglasses",
  "Silver Round Eyeglasses",
  "Solana Heart Sunglasses",
  "Yellow Round Sunglasses",
]);

export type AllAccessoryTraits = 
  | "Bee"
  | "Blue Bow"
  | "Butterfly"
  | "Candy"
  | "Cherry Blossom"
  | "Clover"
  | "Crown"
  | "Crown Jewel"
  | "Daisy"
  | "Dango"
  | "Double Bows"
  | "Double Pink Cherry"
  | "Double Red Cherry"
  | "Enchanted Golden Apple"
  | "Flower Stem"
  | "Golden Apple"
  | "Green Apple"
  | "Heart Antenna"
  | "Leaf"
  | "None"
  | "Pink Bow"
  | "Pink Cherry"
  | "Pink Cherry Double"
  | "Pink Rose Head"
  | "Pink Strawberry"
  | "Plain Antenna"
  | "Plant Stem"
  | "Pom Poms"
  | "Purple Bow"
  | "Red Apple"
  | "Red Bow"
  | "Red Cherry"
  | "Red Rose"
  | "Red Rose Head"
  | "Red Strawberry"
  | "Secret.01"
  | "Snail"
  | "Sparkles"
  | "Star Antenna"
  | "White Bow"
  | "Yellow Rose Head";

export const AccessoryTraits = new Set([
  "Bee",
  "Blue Bow",
  "Butterfly",
  "Candy",
  "Cherry Blossom",
  "Clover",
  "Crown",
  "Crown Jewel",
  "Daisy",
  "Dango",
  "Double Bows",
  "Double Pink Cherry",
  "Double Red Cherry",
  "Enchanted Golden Apple",
  "Flower Stem",
  "Golden Apple",
  "Green Apple",
  "Heart Antenna",
  "Leaf",
  "None",
  "Pink Bow",
  "Pink Cherry",
  "Pink Cherry Double",
  "Pink Rose Head",
  "Pink Strawberry",
  "Plain Antenna",
  "Plant Stem",
  "Pom Poms",
  "Purple Bow",
  "Red Apple",
  "Red Bow",
  "Red Cherry",
  "Red Rose",
  "Red Rose Head",
  "Red Strawberry",
  "Secret.01",
  "Snail",
  "Sparkles",
  "Star Antenna",
  "White Bow",
  "Yellow Rose Head",
]);

export type AllStickerTraits = 
  | "Bandaid"
  | "Boba Cup"
  | "BTC"
  | "Cactus"
  | "Cake"
  | "Coffee"
  | "Diamond"
  | "Doge"
  | "Flower"
  | "Frog"
  | "gm"
  | "gn"
  | "Hamburger"
  | "Heart Forehead Sticker"
  | "Ice Cream Cone"
  | "ily"
  | "Mushroom"
  | "Music Note"
  | "None"
  | "Pink Heart"
  | "Pizza"
  | "Pumpkin"
  | "Rainbow"
  | "Red Heart"
  | "Rocket"
  | "Shaka"
  | "Solana"
  | "Star"
  | "Star Forehead Sticker"
  | "Tea"
  | "Unicorn"
  | "Waves"
  | "Whale";

export const StickerTraits = new Set([
  "Bandaid",
  "Boba Cup",
  "BTC",
  "Cactus",
  "Cake",
  "Coffee",
  "Diamond",
  "Doge",
  "Flower",
  "Frog",
  "gm",
  "gn",
  "Hamburger",
  "Heart Forehead Sticker",
  "Ice Cream Cone",
  "ily",
  "Mushroom",
  "Music Note",
  "None",
  "Pink Heart",
  "Pizza",
  "Pumpkin",
  "Rainbow",
  "Red Heart",
  "Rocket",
  "Shaka",
  "Solana",
  "Star",
  "Star Forehead Sticker",
  "Tea",
  "Unicorn",
  "Waves",
  "Whale",
]);

export const AllTraits: Record<TraitType, Set<string>> = {
  Background: BackgroundTraits,
  Overlay: OverlayTraits,
  Cup: CupTraits,
  Drink: DrinkTraits,
  Blush: BlushTraits,
  Straw: StrawTraits,
  Lid: LidTraits,
  Eyes: EyesTraits,
  Boba: BobaTraits,
  Glasses: GlassesTraits,
  Accessory: AccessoryTraits,
  Sticker: StickerTraits,
};
