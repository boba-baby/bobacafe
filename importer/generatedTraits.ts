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
  | "Gradient Blue"
  | "Gradient Blue Gray-Pink"
  | "Gradient Blue-Pink"
  | "Gradient Coral-Green"
  | "Gradient Green"
  | "Gradient Green-Pink"
  | "Gradient Green-Purple"
  | "Gradient Orange"
  | "Gradient Orange-Green"
  | "Gradient Pink"
  | "Gradient Pink-Orange"
  | "Gradient Pink-Yellow Green"
  | "Gradient Purple"
  | "Gradient Purple-Orange"
  | "Gradient Yellow Green-Blue"
  | "Matcha Latte"
  | "Solana"
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
  | "Solid Yellow Green"
  | "Strawberry Matcha";

export const DrinkTraits = new Set([
  "Gradient Blue",
  "Gradient Blue Gray-Pink",
  "Gradient Blue-Pink",
  "Gradient Coral-Green",
  "Gradient Green",
  "Gradient Green-Pink",
  "Gradient Green-Purple",
  "Gradient Orange",
  "Gradient Orange-Green",
  "Gradient Pink",
  "Gradient Pink-Orange",
  "Gradient Pink-Yellow Green",
  "Gradient Purple",
  "Gradient Purple-Orange",
  "Gradient Yellow Green-Blue",
  "Matcha Latte",
  "Solana",
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
  "Strawberry Matcha",
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
  | "Black"
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
  "Black",
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
  | "Alpaca-Brown"
  | "Alpaca-Pink"
  | "Bear-Brown"
  | "Bear-Polar"
  | "Bear-Purple"
  | "Bear-Yellow"
  | "Boba-Black"
  | "Boba-Green"
  | "Boba-White"
  | "Bread Roll-Matcha"
  | "Bread Roll-Plain"
  | "Bread Roll-Taro"
  | "Bull-Gold Ring"
  | "Bull-Solana"
  | "Bull-White"
  | "Bunny-Brown"
  | "Bunny-Pink"
  | "Bunny-White"
  | "Cat-Black Spots"
  | "Cat-Brown"
  | "Cat-Gray"
  | "Cat-Orange Spots"
  | "Cat-White"
  | "Cow-Black White"
  | "Cow-Brown White"
  | "Cow-Pink White"
  | "Cupcake-Blue Sprinkles"
  | "Cupcake-Orange"
  | "Cupcake-Pink"
  | "Cupcake-Pink Sprinkles"
  | "Cupcake-Purple Sprinkles"
  | "Cupcake-Rainbow"
  | "Dough-Blue"
  | "Dough-Pink"
  | "Dough-White"
  | "Dragon-Gold"
  | "Dragon-Green"
  | "Dragon-Red"
  | "Ghost-Blue"
  | "Ghost-Pink"
  | "Ghost-White"
  | "Ghost-Yellow"
  | "Gorilla-Blue Gray"
  | "Gorilla-Gray"
  | "Gorilla-Purple"
  | "Hamster-Brown"
  | "Hamster-Gray"
  | "Hamster-Orange"
  | "Horse-Brown"
  | "Horse-Pink"
  | "Horse-White"
  | "Ice Cream-Chocolate"
  | "Ice Cream-Strawberry"
  | "Ice Cream-Vanilla"
  | "Monkey-Black"
  | "Monkey-Brown"
  | "Monkey-Brown and Pink"
  | "Moon-Pink Rocket"
  | "Moon-Rocket"
  | "Mouse-Gray"
  | "Mouse-Light Brown"
  | "Mouse-White"
  | "Nigiri-Light Pink"
  | "Nigiri-Pink"
  | "Nigiri-Red Orange"
  | "Onigiri-Black and White"
  | "Onigiri-Black Sesame"
  | "Onigiri-Flavored"
  | "Otter-Ash Brown"
  | "Otter-Brown"
  | "Otter-Gray"
  | "Ox-Beige"
  | "Ox-Blue"
  | "Ox-Gold"
  | "Panda-Black and White"
  | "Panda-Blue"
  | "Panda-Pink"
  | "Panda-Purple"
  | "Pig-Gray"
  | "Pig-Pink"
  | "Pig-Pink Gray"
  | "Poodle-Brown"
  | "Poodle-Light Brown"
  | "Poodle-White"
  | "Pumpkin-Jack O Lantern"
  | "Pumpkin-Orange"
  | "Pumpkin-White"
  | "Ram-Black"
  | "Ram-Gray"
  | "Ram-White"
  | "Red Panda-Light Orange"
  | "Red Panda-Medium Orange"
  | "Red Panda-Red Orange"
  | "Rock-Blue"
  | "Rock-Pink"
  | "Rock-Purple"
  | "Rooster-Brown"
  | "Rooster-White"
  | "Rooster-Yellow"
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
  | "Shiba-Cream"
  | "Shiba-Red"
  | "Snake-Green"
  | "Snake-White Pink"
  | "Snake-Yellow"
  | "Striped Cat-Gray"
  | "Striped Cat-Orange"
  | "Striped Cat-Pink"
  | "Sun-Light Yellow"
  | "Sun-Yellow"
  | "Sun-Yellow Orange"
  | "Teddy Bear-Avalanche"
  | "Teddy Bear-Black"
  | "Teddy Bear-Dark Brown"
  | "Teddy Bear-Ethereum"
  | "Teddy Bear-Golden Brown"
  | "Teddy Bear-Red Velvet"
  | "Tiger-Orange"
  | "Tiger-Pink"
  | "Tiger-White"
  | "Unicorn-Solana"
  | "Unicorn-White"
  | "Whale-Blue"
  | "Whale-Gray"
  | "Whale-White";

export const LidTraits = new Set([
  "Alien-Gold",
  "Alien-Gray",
  "Alien-Green",
  "Alpaca-Beige",
  "Alpaca-Brown",
  "Alpaca-Pink",
  "Bear-Brown",
  "Bear-Polar",
  "Bear-Purple",
  "Bear-Yellow",
  "Boba-Black",
  "Boba-Green",
  "Boba-White",
  "Bread Roll-Matcha",
  "Bread Roll-Plain",
  "Bread Roll-Taro",
  "Bull-Gold Ring",
  "Bull-Solana",
  "Bull-White",
  "Bunny-Brown",
  "Bunny-Pink",
  "Bunny-White",
  "Cat-Black Spots",
  "Cat-Brown",
  "Cat-Gray",
  "Cat-Orange Spots",
  "Cat-White",
  "Cow-Black White",
  "Cow-Brown White",
  "Cow-Pink White",
  "Cupcake-Blue Sprinkles",
  "Cupcake-Orange",
  "Cupcake-Pink",
  "Cupcake-Pink Sprinkles",
  "Cupcake-Purple Sprinkles",
  "Cupcake-Rainbow",
  "Dough-Blue",
  "Dough-Pink",
  "Dough-White",
  "Dragon-Gold",
  "Dragon-Green",
  "Dragon-Red",
  "Ghost-Blue",
  "Ghost-Pink",
  "Ghost-White",
  "Ghost-Yellow",
  "Gorilla-Blue Gray",
  "Gorilla-Gray",
  "Gorilla-Purple",
  "Hamster-Brown",
  "Hamster-Gray",
  "Hamster-Orange",
  "Horse-Brown",
  "Horse-Pink",
  "Horse-White",
  "Ice Cream-Chocolate",
  "Ice Cream-Strawberry",
  "Ice Cream-Vanilla",
  "Monkey-Black",
  "Monkey-Brown",
  "Monkey-Brown and Pink",
  "Moon-Pink Rocket",
  "Moon-Rocket",
  "Mouse-Gray",
  "Mouse-Light Brown",
  "Mouse-White",
  "Nigiri-Light Pink",
  "Nigiri-Pink",
  "Nigiri-Red Orange",
  "Onigiri-Black and White",
  "Onigiri-Black Sesame",
  "Onigiri-Flavored",
  "Otter-Ash Brown",
  "Otter-Brown",
  "Otter-Gray",
  "Ox-Beige",
  "Ox-Blue",
  "Ox-Gold",
  "Panda-Black and White",
  "Panda-Blue",
  "Panda-Pink",
  "Panda-Purple",
  "Pig-Gray",
  "Pig-Pink",
  "Pig-Pink Gray",
  "Poodle-Brown",
  "Poodle-Light Brown",
  "Poodle-White",
  "Pumpkin-Jack O Lantern",
  "Pumpkin-Orange",
  "Pumpkin-White",
  "Ram-Black",
  "Ram-Gray",
  "Ram-White",
  "Red Panda-Light Orange",
  "Red Panda-Medium Orange",
  "Red Panda-Red Orange",
  "Rock-Blue",
  "Rock-Pink",
  "Rock-Purple",
  "Rooster-Brown",
  "Rooster-White",
  "Rooster-Yellow",
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
  "Shiba-Cream",
  "Shiba-Red",
  "Snake-Green",
  "Snake-White Pink",
  "Snake-Yellow",
  "Striped Cat-Gray",
  "Striped Cat-Orange",
  "Striped Cat-Pink",
  "Sun-Light Yellow",
  "Sun-Yellow",
  "Sun-Yellow Orange",
  "Teddy Bear-Avalanche",
  "Teddy Bear-Black",
  "Teddy Bear-Dark Brown",
  "Teddy Bear-Ethereum",
  "Teddy Bear-Golden Brown",
  "Teddy Bear-Red Velvet",
  "Tiger-Orange",
  "Tiger-Pink",
  "Tiger-White",
  "Unicorn-Solana",
  "Unicorn-White",
  "Whale-Blue",
  "Whale-Gray",
  "Whale-White",
]);

export type AllEyesTraits = 
  | "Closed U"
  | "Closed V"
  | "Dots"
  | "Huge Alien"
  | "Jack O Lantern"
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
  "Jack O Lantern",
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
  | "Lychee Boba"
  | "Mango Boba"
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
  "Lychee Boba",
  "Mango Boba",
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
  | "AR Glasses"
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
  | "Pit Vipers Solana"
  | "Purple Gradient Heart Sunglasses"
  | "Purple Round Sunglasses"
  | "Silver Round Eyeglasses"
  | "Solana Heart Sunglasses"
  | "VR HL3"
  | "VR Ultrawide"
  | "Yellow Round Sunglasses";

export const GlassesTraits = new Set([
  "AR Glasses",
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
  "Pit Vipers Solana",
  "Purple Gradient Heart Sunglasses",
  "Purple Round Sunglasses",
  "Silver Round Eyeglasses",
  "Solana Heart Sunglasses",
  "VR HL3",
  "VR Ultrawide",
  "Yellow Round Sunglasses",
]);

export type AllAccessoryTraits = 
  | "Angel Wings"
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
  | "GPU Drink"
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
  | "Snail"
  | "Solana Bow"
  | "Sparkles"
  | "Star Antenna"
  | "Whale Drink"
  | "White Bow"
  | "Yellow Rose Head";

export const AccessoryTraits = new Set([
  "Angel Wings",
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
  "GPU Drink",
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
  "Snail",
  "Solana Bow",
  "Sparkles",
  "Star Antenna",
  "Whale Drink",
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
  | "Dinosaur"
  | "Doge"
  | "Flower"
  | "Frog"
  | "gm"
  | "gn"
  | "GPU"
  | "Hamburger"
  | "Heart Forehead Sticker"
  | "Ice Cream Cone"
  | "ily"
  | "Moon"
  | "Mushroom"
  | "Music Note"
  | "ngmi"
  | "ngu"
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
  | "wagmi"
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
  "Dinosaur",
  "Doge",
  "Flower",
  "Frog",
  "gm",
  "gn",
  "GPU",
  "Hamburger",
  "Heart Forehead Sticker",
  "Ice Cream Cone",
  "ily",
  "Moon",
  "Mushroom",
  "Music Note",
  "ngmi",
  "ngu",
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
  "wagmi",
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
