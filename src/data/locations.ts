/**
 * LOCATION (service-area) landing pages — local SEO.
 * ----------------------------------------------------------------------------
 * Each entry generates a page at /locations/[slug] targeting "[service] [city]"
 * style searches. Keep the `intro` + `context` genuinely UNIQUE per city
 * (Google penalizes near-duplicate "doorway" pages). To add a city, copy a
 * block and write distinct local copy.
 */
export type Location = {
  slug: string;
  city: string;
  state: "WV" | "OH";
  stateName: string;
  county: string;
  /** unique 1–2 sentence local intro (used as H1 description + meta) */
  intro: string;
  /** unique paragraph on why exterior services matter locally */
  context: string;
  /** nearby towns / neighborhoods we also serve */
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "wheeling-wv",
    city: "Wheeling",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "Wheeling's historic homes and tree-lined neighborhoods — from Woodsdale and Edgwood to Wheeling Island — are beautiful, but Ohio River humidity is hard on them. Rally keeps Wheeling properties bright, clean, and well-lit year-round.",
    context:
      "Older brick and wood-sided homes here are prone to algae streaks, black roof staining, and grimy concrete. Our low-pressure soft-wash methods clean them safely without damage, and our permanent lighting makes historic facades shine after dark.",
    nearby: ["Woodsdale", "Edgwood", "Elm Grove", "Wheeling Island", "Triadelphia"],
  },
  {
    slug: "st-clairsville-oh",
    city: "St. Clairsville",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "St. Clairsville's hilltop neighborhoods and newer subdivisions off National Road deserve to look their best. Rally handles the exterior cleaning and lighting so your home or business stands out.",
    context:
      "From vinyl-sided homes near the Ohio Valley Mall to brick storefronts downtown, we soft-wash siding, brighten driveways and walkways, and install permanent lighting across St. Clairsville and Belmont County.",
    nearby: ["Lansing", "Morristown", "Barton", "Belmont"],
  },
  {
    slug: "moundsville-wv",
    city: "Moundsville",
    state: "WV",
    stateName: "West Virginia",
    county: "Marshall County",
    intro:
      "From the riverfront to the neighborhoods around the Grave Creek Mound, Moundsville homes take a beating from river humidity and road grime. Rally restores their curb appeal.",
    context:
      "We remove the black roof streaks and green siding algae common on Moundsville's older homes, clean driveways and sidewalks, and light up rooflines for the holidays and all year.",
    nearby: ["Glen Dale", "McMechen", "Benwood", "Cameron"],
  },
  {
    slug: "martins-ferry-oh",
    city: "Martins Ferry",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Martins Ferry's classic river-town homes have great bones — Rally keeps their siding, roofs, and walkways looking sharp and their exteriors glowing at night.",
    context:
      "The Ohio River valley's humidity means mildew and algae build up fast here. Our soft washing clears it safely, and our lighting brings out the character of Martins Ferry's older homes.",
    nearby: ["Bridgeport", "Bellaire", "Brookside", "Yorkville"],
  },
  {
    slug: "bridgeport-oh",
    city: "Bridgeport",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Right across the river from Wheeling, Bridgeport homes and businesses get the same Ohio Valley grime — and the same first-class treatment from Rally.",
    context:
      "We house-wash, roof-wash, and clean concrete throughout Bridgeport, plus permanent and holiday lighting that makes your property pop along the river corridor.",
    nearby: ["Wheeling", "Martins Ferry", "Brookside", "Lansing"],
  },
  {
    slug: "bellaire-oh",
    city: "Bellaire",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Bellaire's brick streets and historic stone-and-brick homes are full of character. Rally keeps them clean and bright without ever risking damage to the masonry.",
    context:
      "Brick and stone exteriors need a gentle touch — our soft-wash approach removes algae and grime safely, and our lighting accents Bellaire's classic architecture beautifully.",
    nearby: ["Shadyside", "Neffs", "Bridgeport", "Powhatan Point"],
  },
  {
    slug: "wellsburg-wv",
    city: "Wellsburg",
    state: "WV",
    stateName: "West Virginia",
    county: "Brooke County",
    intro:
      "Wellsburg's riverfront and historic downtown deserve to shine. Rally handles exterior cleaning and lighting for homes and businesses throughout Brooke County.",
    context:
      "From the older homes near the river to newer builds in the hills, we wash siding and roofs, restore concrete and decks, and install lighting that lasts season after season.",
    nearby: ["Follansbee", "Bethany", "Beech Bottom", "Colliers"],
  },
  {
    slug: "barnesville-oh",
    city: "Barnesville",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Barnesville's stately Victorian homes are some of the most beautiful in the region — and Rally keeps them that way, from clean siding and roofs to dazzling holiday lighting.",
    context:
      "Ornate older homes need careful, damage-free cleaning. Our soft washing protects delicate trim and paint, and our permanent lighting shows off Barnesville's architecture year-round.",
    nearby: ["Bethesda", "Belmont", "Quaker City", "Morristown"],
  },
  {
    slug: "triadelphia-wv",
    city: "Triadelphia",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "Just east of Wheeling along the National Road, Triadelphia and the booming Highlands corridor are home to growing neighborhoods and busy storefronts. Rally keeps them clean and brightly lit.",
    context:
      "From new subdivisions in the hills to retail along The Highlands, Triadelphia properties pick up road grime and algae fast. We soft-wash homes and businesses, brighten concrete, and install lighting that makes them stand out day or night.",
    nearby: ["Valley Grove", "Dallas", "Elm Grove", "Wheeling"],
  },
  {
    slug: "bethlehem-wv",
    city: "Bethlehem",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "A quiet village on the hilltops just south of Wheeling, Bethlehem's well-kept homes deserve exteriors that match. Rally delivers premium cleaning and lighting close to home.",
    context:
      "Bethlehem's tree-lined streets mean shade, leaf debris, and roof algae are common. We soft-wash siding and roofs, brighten driveways and walkways, and install permanent lighting for effortless year-round curb appeal.",
    nearby: ["Mozart", "Wheeling", "Elm Grove", "Woodsdale"],
  },
  {
    slug: "powhatan-point-oh",
    city: "Powhatan Point",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Tucked along the Ohio River in southern Belmont County, Powhatan Point's riverfront homes take on humidity, mildew, and roof staining. Rally restores their curb appeal and lights them up.",
    context:
      "River-valley moisture is hard on siding and roofs here. Our low-pressure soft washing removes algae and black streaks without damage, and our concrete cleaning and lighting round out a fresh, cared-for look.",
    nearby: ["Clarington", "Sardis", "Shadyside", "Bellaire"],
  },
  {
    slug: "cadiz-oh",
    city: "Cadiz",
    state: "OH",
    stateName: "Ohio",
    county: "Harrison County",
    intro:
      "The seat of Harrison County and birthplace of Clark Gable, Cadiz pairs a historic downtown with hilltop homes that deserve to look their best. Rally brings premium exterior cleaning and lighting to town.",
    context:
      "Harrison County's rolling, wooded terrain means homes here battle shade, moss, and roof algae. Our soft-wash methods clear them safely, and our permanent lighting gives Cadiz's classic homes year-round curb appeal.",
    nearby: ["Hopedale", "Jewett", "Scio", "Harrisville"],
  },
  {
    slug: "tiltonsville-oh",
    city: "Tiltonsville",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "Tiltonsville is home base for Rally Exterior Solutions — so when we say we're your local crew, we mean it. We keep this Ohio River village's homes clean, bright, and glowing all year.",
    context:
      "Living right on OH-7 and the river, Tiltonsville homes fight constant humidity, mildew, and roof algae. We soft-wash siding and roofs, scrub driveways and sidewalks back to life, and install permanent lighting that turns heads up and down the valley — all from right here in town.",
    nearby: ["Rayland", "Yorkville", "Brilliant", "Martins Ferry"],
  },
  {
    slug: "rayland-oh",
    city: "Rayland",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "Just up OH-7 from our shop, Rayland is about as local as it gets for Rally. We treat this riverside community's homes like our neighbors' — because they are.",
    context:
      "Rayland's older river homes pick up green algae on north-facing siding and black streaks on the roof fast. Our low-pressure soft washing clears it without damage, and our concrete cleaning and permanent lighting finish the job.",
    nearby: ["Tiltonsville", "Yorkville", "Brilliant", "Mingo Junction"],
  },
  {
    slug: "yorkville-oh",
    city: "Yorkville",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A classic Ohio River mill town, Yorkville's tidy homes deserve exteriors that match their pride. Rally is right next door and ready to help.",
    context:
      "Decades of river humidity leave siding dingy and roofs streaked here. We house-wash, roof-wash, and brighten walkways across Yorkville, then light up rooflines for the holidays and year-round.",
    nearby: ["Tiltonsville", "Rayland", "Martins Ferry", "Brookside"],
  },
  {
    slug: "beech-bottom-wv",
    city: "Beech Bottom",
    state: "WV",
    stateName: "West Virginia",
    county: "Brooke County",
    intro:
      "This small Brooke County river town sits just across the water from our home turf. Rally keeps Beech Bottom's homes clean and lit without the big-city price.",
    context:
      "Riverfront moisture and a history of industry mean siding and concrete grime build up quickly. Our soft washing and pressure washing strip it away safely, and our lighting gives modest homes serious curb appeal.",
    nearby: ["Wellsburg", "Follansbee", "Colliers", "Wheeling"],
  },
  {
    slug: "west-liberty-wv",
    city: "West Liberty",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "Perched in the hills above Wheeling and home to West Liberty University, this historic village deserves polished exteriors. Rally delivers premium cleaning and lighting close to campus and home.",
    context:
      "Heavy tree cover means shade, leaf litter, and stubborn roof moss for West Liberty homes. We soft-wash roofs and siding, clear walkways and patios, and install permanent lighting that shines through the hilltops.",
    nearby: ["Wheeling", "Valley Grove", "Bethany", "Triadelphia"],
  },
  {
    slug: "brookside-oh",
    city: "Brookside",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Tucked along Wheeling Creek near Martins Ferry, the village of Brookside is small but proud. Rally keeps its homes sharp in the valley's tough climate.",
    context:
      "Creek-valley dampness encourages mildew on siding and algae on roofs here. Our gentle soft-wash methods clean them safely, and our driveway and walkway washing plus lighting round out the look.",
    nearby: ["Martins Ferry", "Bridgeport", "Lansing", "Bellaire"],
  },
  {
    slug: "lansing-oh",
    city: "Lansing",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Right along the National Road corridor west of Bridgeport, Lansing homes catch plenty of road dust and valley grime. Rally washes it all away.",
    context:
      "Traffic film, algae, and roof staining are common this close to US-40 and I-70. We house-wash, roof-wash, and pressure-wash concrete throughout Lansing, then add permanent or holiday lighting for standout curb appeal.",
    nearby: ["Bridgeport", "Brookside", "St. Clairsville", "Martins Ferry"],
  },
  {
    slug: "brilliant-oh",
    city: "Brilliant",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A riverfront village in the shadow of the Cardinal plant, Brilliant takes on its share of dust, humidity, and roof algae. Rally restores that fresh, cared-for look.",
    context:
      "Industrial dust and river moisture dull siding and stain roofs here fast. Our soft washing safely lifts it, our pressure washing revives driveways and sidewalks, and our lighting brightens the riverfront after dark.",
    nearby: ["Rayland", "Mingo Junction", "Tiltonsville", "Steubenville"],
  },
  {
    slug: "smithfield-oh",
    city: "Smithfield",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "Up in the rolling farmland west of the river, Smithfield's hilltop homes face shade and moss instead of river humidity. Rally cleans and lights them either way.",
    context:
      "Wooded lots mean roof moss, algae streaks, and leaf-stained concrete around Smithfield. We soft-wash roofs and siding, clear walkways and patios, and install permanent lighting built for the country dark.",
    nearby: ["Adena", "Mount Pleasant", "Dillonvale", "Steubenville"],
  },
  {
    slug: "valley-grove-wv",
    city: "Valley Grove",
    state: "WV",
    stateName: "West Virginia",
    county: "Ohio County",
    intro:
      "Strung along the old National Road east of Wheeling, Valley Grove blends country homes with roadside business. Rally keeps them clean and brightly lit.",
    context:
      "Highway grime and hillside shade leave siding dull and roofs streaked here. Our soft washing and concrete cleaning bring them back, and our lighting makes homes and storefronts pop along the corridor.",
    nearby: ["Triadelphia", "West Liberty", "Wheeling", "Dallas"],
  },
  {
    slug: "adena-oh",
    city: "Adena",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A former coal town on the Jefferson–Harrison line, Adena's sturdy homes have stories to tell. Rally keeps their exteriors looking proud.",
    context:
      "Years of valley dust and roof algae take a toll on Adena's older homes. We soft-wash siding and roofs, restore concrete, and add lighting that gives small-town homes big curb appeal.",
    nearby: ["Dillonvale", "Smithfield", "Mount Pleasant", "Cadiz"],
  },
  {
    slug: "harrisville-oh",
    city: "Harrisville",
    state: "OH",
    stateName: "Ohio",
    county: "Harrison County",
    intro:
      "One of Harrison County's oldest villages, Harrisville's classic homes sit among the rolling hills. Rally brings them premium cleaning and lighting.",
    context:
      "Shade and moisture mean roof moss and siding algae out here. Our low-pressure soft washing clears it without harm, and our permanent lighting gives Harrisville homes year-round shine.",
    nearby: ["Cadiz", "Hopedale", "Adena", "Jewett"],
  },
  {
    slug: "maynard-oh",
    city: "Maynard",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "A close-knit former coal community in the Belmont County hills, Maynard is exactly the kind of small town Rally is built to serve.",
    context:
      "Hillside homes here battle shade, roof algae, and grimy concrete. We soft-wash siding and roofs, pressure-wash driveways and walkways, and install lighting that makes the most of every home.",
    nearby: ["Neffs", "St. Clairsville", "Lansing", "Bellaire"],
  },
  {
    slug: "benwood-wv",
    city: "Benwood",
    state: "WV",
    stateName: "West Virginia",
    county: "Marshall County",
    intro:
      "Just south of Wheeling on the river, Benwood's compact neighborhoods take the full brunt of Ohio Valley humidity. Rally keeps them clean and glowing.",
    context:
      "Tight riverfront lots mean fast algae growth and stained concrete here. Our soft washing safely cleans siding and roofs, and our pressure washing and lighting finish off a fresh look.",
    nearby: ["McMechen", "Wheeling", "Glen Dale", "Moundsville"],
  },
  {
    slug: "neffs-oh",
    city: "Neffs",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "Set in the wooded hills west of Wheeling, Neffs is quiet, green, and shaded — which is exactly why roofs and siding need a hand. Rally provides it.",
    context:
      "Heavy tree cover leaves Neffs homes with roof moss, algae, and leaf-stained walkways. We soft-wash, clear concrete, and install permanent lighting that cuts through the country dark.",
    nearby: ["Maynard", "Bellaire", "St. Clairsville", "Shadyside"],
  },
  {
    slug: "mingo-junction-oh",
    city: "Mingo Junction",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A gritty, proud steel-mill town on the river south of Steubenville, Mingo Junction's homes deserve to shine. Rally makes it happen.",
    context:
      "Decades of mill dust and river humidity stain siding and roofs across Mingo Junction. Our soft washing lifts it safely, our pressure washing revives concrete, and our lighting brightens the riverfront.",
    nearby: ["Steubenville", "Brilliant", "Rayland", "Wintersville"],
  },
  {
    slug: "follansbee-wv",
    city: "Follansbee",
    state: "WV",
    stateName: "West Virginia",
    county: "Brooke County",
    intro:
      "A hardworking river city in Brooke County, Follansbee knows industry — and Rally knows how to wash away what industry leaves behind.",
    context:
      "Coke-plant dust, river moisture, and roof algae build up on Follansbee homes fast. We soft-wash siding and roofs, pressure-wash driveways and sidewalks, and install lighting that lasts season after season.",
    nearby: ["Wellsburg", "Beech Bottom", "Weirton", "Colliers"],
  },
  {
    slug: "mcmechen-wv",
    city: "McMechen",
    state: "WV",
    stateName: "West Virginia",
    county: "Marshall County",
    intro:
      "Wedged along the river between Benwood and Moundsville, McMechen's tidy homes face constant valley dampness. Rally keeps them fresh and well-lit.",
    context:
      "Riverfront humidity means green siding and black roof streaks here. Our gentle soft washing clears them without damage, and our concrete cleaning and lighting complete the transformation.",
    nearby: ["Benwood", "Glen Dale", "Moundsville", "Wheeling"],
  },
  {
    slug: "bloomingdale-oh",
    city: "Bloomingdale",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A small inland village in the Jefferson County hills, Bloomingdale trades river humidity for shade and moss. Rally cleans and lights it all the same.",
    context:
      "Wooded surroundings leave roofs and siding prone to algae and moss around Bloomingdale. We soft-wash safely, brighten concrete, and add permanent lighting for easy year-round curb appeal.",
    nearby: ["Wintersville", "Steubenville", "Smithfield", "Richmond"],
  },
  {
    slug: "shadyside-oh",
    city: "Shadyside",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "A friendly Ohio River village south of Bellaire, Shadyside lives up to its name with plenty of shade — and the roof algae that comes with it. Rally has the fix.",
    context:
      "Shade and river moisture make for mossy roofs and dingy siding here. Our low-pressure soft washing clears them safely, and our pressure washing and lighting give Shadyside homes a crisp, finished look.",
    nearby: ["Bellaire", "Neffs", "Powhatan Point", "Wheeling"],
  },
  {
    slug: "steubenville-oh",
    city: "Steubenville",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "The 'City of Murals' and Jefferson County seat, Steubenville pairs historic homes with hilltop neighborhoods and a busy downtown. Rally keeps them all looking their best.",
    context:
      "From brick homes near Franciscan University to vinyl-sided houses on the hilltops, Steubenville exteriors collect algae, soot, and roof staining. We soft-wash, restore concrete, and install permanent and holiday lighting across the city.",
    nearby: ["Wintersville", "Mingo Junction", "Toronto", "Brilliant"],
  },
  {
    slug: "wintersville-oh",
    city: "Wintersville",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "Steubenville's busy hilltop neighbor, Wintersville is full of well-kept suburban homes that deserve standout curb appeal. Rally delivers it.",
    context:
      "Suburban Wintersville homes pick up roof algae, siding grime, and stained driveways over the years. Our soft washing and pressure washing bring them back, and our permanent lighting makes them shine all year.",
    nearby: ["Steubenville", "Bloomingdale", "Mingo Junction", "Richmond"],
  },
  {
    slug: "hopedale-oh",
    city: "Hopedale",
    state: "OH",
    stateName: "Ohio",
    county: "Harrison County",
    intro:
      "A quiet Harrison County village in the rolling hills, Hopedale's homes sit surrounded by trees — and the roof moss that loves them. Rally takes care of it.",
    context:
      "Shade and country air mean algae streaks and mossy roofs around Hopedale. We soft-wash roofs and siding without damage, clear walkways, and install lighting built for the rural dark.",
    nearby: ["Cadiz", "Harrisville", "Jewett", "Adena"],
  },
  {
    slug: "glen-dale-wv",
    city: "Glen Dale",
    state: "WV",
    stateName: "West Virginia",
    county: "Marshall County",
    intro:
      "A leafy residential town beside Moundsville, Glen Dale is known for handsome homes and the historic Cockayne Farmstead. Rally keeps its exteriors picture-perfect.",
    context:
      "Mature trees and river humidity leave Glen Dale roofs and siding prone to algae and moss. Our soft washing cleans them safely, and our concrete cleaning and permanent lighting complete the curb appeal.",
    nearby: ["Moundsville", "McMechen", "Benwood", "Cameron"],
  },
  {
    slug: "colliers-wv",
    city: "Colliers",
    state: "WV",
    stateName: "West Virginia",
    county: "Brooke County",
    intro:
      "A rural community in the northern panhandle, Colliers spreads across green Brooke County hills. Rally brings premium exterior cleaning and lighting out to the country.",
    context:
      "Wooded, hilly lots mean roof moss, siding algae, and leaf-stained concrete here. We soft-wash, pressure-wash, and install lighting that gives country homes year-round shine.",
    nearby: ["Weirton", "Follansbee", "Wellsburg", "Bethany"],
  },
  {
    slug: "weirton-wv",
    city: "Weirton",
    state: "WV",
    stateName: "West Virginia",
    county: "Hancock County",
    intro:
      "A storied steel city stretching across the northern panhandle, Weirton's neighborhoods are big, varied, and proud. Rally keeps them clean and brightly lit.",
    context:
      "From hilltop homes to valley streets, Weirton exteriors collect industrial dust, algae, and roof staining. Our soft washing and pressure washing restore them, and our permanent and holiday lighting make them stand out.",
    nearby: ["Follansbee", "Colliers", "New Cumberland", "Steubenville"],
  },
  {
    slug: "richmond-oh",
    city: "Richmond",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A small village in the northern Jefferson County hills, Richmond is quiet, green, and a little out of the way — which is exactly where Rally loves to work.",
    context:
      "Tree cover and hillside moisture leave roofs mossy and siding dull around Richmond. We soft-wash safely, brighten concrete, and add permanent lighting for effortless curb appeal.",
    nearby: ["Wintersville", "Bloomingdale", "Steubenville", "Toronto"],
  },
  {
    slug: "flushing-oh",
    city: "Flushing",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "A historic Belmont County village set among the hills, Flushing's older homes are full of character. Rally helps them keep it.",
    context:
      "Older siding, trim, and roofs need a careful touch — our low-pressure soft washing cleans them without damage. We also restore concrete and install lighting that flatters Flushing's historic homes.",
    nearby: ["Morristown", "Belmont", "St. Clairsville", "Barnesville"],
  },
  {
    slug: "belmont-oh",
    city: "Belmont",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "A tidy village along the National Road, Belmont is classic small-town Ohio. Rally keeps its homes clean, bright, and ready for any season.",
    context:
      "Roadside dust and roof algae are common this close to US-40. We house-wash, roof-wash, and pressure-wash concrete in Belmont, then add permanent or holiday lighting that makes homes pop.",
    nearby: ["Morristown", "Flushing", "Barnesville", "Bethesda"],
  },
  {
    slug: "morristown-oh",
    city: "Morristown",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "One of the oldest stops on the National Road, the village of Morristown wears its history well. Rally keeps its exteriors as sharp as its heritage.",
    context:
      "Historic homes here need gentle, damage-free cleaning — our soft washing delivers it. We also clear walkways and driveways and install lighting that shows off Morristown's classic architecture.",
    nearby: ["Belmont", "Flushing", "St. Clairsville", "Barnesville"],
  },
  {
    slug: "toronto-oh",
    city: "Toronto",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A river city on the Ohio north of Steubenville, Toronto pairs riverfront homes with a proud industrial past. Rally keeps them clean and glowing.",
    context:
      "River humidity and age leave Toronto siding dingy and roofs streaked. Our soft washing safely restores them, our pressure washing revives concrete, and our lighting brightens the riverfront year-round.",
    nearby: ["Steubenville", "Wintersville", "Empire", "Stratton"],
  },
  {
    slug: "jewett-oh",
    city: "Jewett",
    state: "OH",
    stateName: "Ohio",
    county: "Harrison County",
    intro:
      "A small railroad village in the Harrison County countryside, Jewett is surrounded by farmland and trees. Rally brings it premium cleaning and lighting.",
    context:
      "Country shade and moisture mean roof moss and siding algae around Jewett. We soft-wash, clear concrete, and install permanent lighting that cuts through the rural dark.",
    nearby: ["Scio", "Cadiz", "Hopedale", "Harrisville"],
  },
  {
    slug: "bethesda-oh",
    city: "Bethesda",
    state: "OH",
    stateName: "Ohio",
    county: "Belmont County",
    intro:
      "A welcoming village in southwestern Belmont County, Bethesda is country living at its best. Rally keeps its homes clean, cared-for, and well-lit.",
    context:
      "Wooded lots leave Bethesda roofs and siding prone to algae and moss. Our soft washing clears them safely, and our concrete cleaning and lighting round out the curb appeal.",
    nearby: ["Barnesville", "Belmont", "Morristown", "Flushing"],
  },
  {
    slug: "new-cumberland-wv",
    city: "New Cumberland",
    state: "WV",
    stateName: "West Virginia",
    county: "Hancock County",
    intro:
      "The Hancock County seat on the upper Ohio River, New Cumberland blends a historic downtown with riverfront homes. Rally keeps them bright and clean.",
    context:
      "River moisture and age stain New Cumberland siding and roofs. Our low-pressure soft washing restores them without damage, and our pressure washing and lighting give homes a fresh, finished look.",
    nearby: ["Weirton", "Stratton", "Chester", "Newell"],
  },
  {
    slug: "empire-oh",
    city: "Empire",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A tiny river village north of Steubenville, Empire is small, scenic, and pure Ohio Valley. Rally is glad to make the trip.",
    context:
      "Riverfront humidity leaves Empire homes with algae and roof streaks. We soft-wash siding and roofs, brighten concrete, and install lighting that makes the most of every riverside home.",
    nearby: ["Stratton", "Toronto", "Steubenville", "Wellsville"],
  },
  {
    slug: "stratton-oh",
    city: "Stratton",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A small river community near the power plant north of Toronto, Stratton sees its share of dust and humidity. Rally washes it clean.",
    context:
      "Industrial dust and river moisture dull siding and stain roofs in Stratton. Our soft washing safely lifts it, our pressure washing revives driveways, and our lighting adds year-round shine.",
    nearby: ["Empire", "Toronto", "Steubenville", "New Cumberland"],
  },
  {
    slug: "scio-oh",
    city: "Scio",
    state: "OH",
    stateName: "Ohio",
    county: "Harrison County",
    intro:
      "A friendly village in the Harrison County hills with a proud pottery heritage, Scio is small-town Ohio through and through. Rally keeps its homes looking great.",
    context:
      "Country shade and moisture leave Scio roofs mossy and siding dull. We soft-wash without damage, clear walkways and patios, and install permanent lighting built for the rural dark.",
    nearby: ["Jewett", "Cadiz", "Hopedale", "Harrisville"],
  },
  {
    slug: "dillonvale-oh",
    city: "Dillonvale",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A small village in the Short Creek valley with deep coal-country roots, Dillonvale is exactly the kind of hometown Rally is proud to serve.",
    context:
      "Valley dampness and age leave Dillonvale siding algae-streaked and roofs stained. Our soft washing clears them safely, and our concrete cleaning and lighting give these sturdy homes fresh curb appeal.",
    nearby: ["Adena", "Smithfield", "Mount Pleasant", "Mingo Junction"],
  },
  {
    slug: "mount-pleasant-oh",
    city: "Mount Pleasant",
    state: "OH",
    stateName: "Ohio",
    county: "Jefferson County",
    intro:
      "A National Historic Landmark village founded by Quakers and known for its abolitionist past, Mount Pleasant's historic homes are treasures. Rally helps protect them.",
    context:
      "Centuries-old siding, brick, and roofs demand a gentle hand — our low-pressure soft washing cleans them with zero risk. We also restore walkways and install lighting that honors Mount Pleasant's historic character.",
    nearby: ["Dillonvale", "Adena", "Smithfield", "Steubenville"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
