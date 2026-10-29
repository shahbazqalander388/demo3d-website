export const BRAND_INFO = {
  name: "VANTABLACK PRIVÉ",
  shortName: "VANTABLACK",
  tagline: "EXECUTIVE BLACK-CAR MOBILITY & BESPOKE CHAUFFEUR",
  fullName: "VANTABLACK AUTOMOTIVE PRIVÉ CANADA LTD.",
  headline: "Overwhelming Presence. Engineered Discretion.",
  subheadline: "Experience the highest echelon of executive chauffeur mobility, diplomatic armored transit, and private aviation tarmac transfers with our exclusive 100% all-black modern fleet.",
  phone: "+1 (800) 868-BLCK",
  dispatchEmail: "concierge@vantablackprive.com",
  hq: "One World Trade Center, Floor 84, New York, NY 10007",
  canadianHq: "100 King Street West, Suite 5600, Toronto, ON M5X 1C9",
  globalHubs: [
    { city: "Toronto", code: "YYZ FBO", country: "Canada", units: 14, status: "Active" },
    { city: "Vancouver", code: "YVR Private", country: "Canada", units: 10, status: "Active" },
    { city: "Montreal", code: "YUL FBO", country: "Canada", units: 8, status: "Active" },
    { city: "New York", code: "JFK Signature", country: "United States", units: 28, status: "Active" },
    { city: "Los Angeles", code: "LAX Atlantic", country: "United States", units: 24, status: "Active" },
    { city: "London", code: "LHR Windsor Suite", country: "United Kingdom", units: 18, status: "Active" },
    { city: "Dubai", code: "DXB Jetex", country: "United Arab Emirates", units: 16, status: "Active" }
  ],
  stats: {
    transits: "28,500+",
    onTimeRate: "99.98%",
    activeFleet: "180+ Black Cars",
    avgDispatchTime: "9.4 min",
    fleetColor: "100% Obsidian Black",
    securityRating: "CEN B6 Armored",
  }
};

export const FLEET_CATEGORIES = [
  { id: "all", label: "All Models", sub: "Explore Complete Obsidian Range" },
  { id: "sedans", label: "Executive Sedans", sub: "Flagship First-Class Chauffeur" },
  { id: "suvs", label: "Armored & Tactical SUVs", sub: "Commanding Security & Passenger Space" },
  { id: "coupes", label: "Grand Tourers", sub: "High-Velocity Urgent Mobility" }
];

export const FLEET_MODELS = [
  {
    id: "maybach-s680",
    categoryId: "sedans",
    name: "Mercedes-Maybach S680 Obsidian",
    badge: "Flagship Luxury Sedan",
    tag: "FIRST-CLASS CHAUFFEUR",
    priceStarting: "From $195 / hr",
    priceMileage: "$3.80 / mile",
    image: "/maybach.jpg",
    interiorImage: "/maybach.jpg",
    profileImage: "/maybach.jpg",
    headline: "The Pinnacle of Acoustic Solitude & First-Class Travel",
    description: "Equipped with a handcrafted 6.0L V12 biturbo engine and individual first-class rear executive lounge with active road noise cancellation.",
    porscheSpecs: {
      acceleration: "4.4 s",
      accelerationLabel: "0-100 km/h (0-60 mph)",
      power: "621 hp / 456 kW",
      powerLabel: "Power (hp / kW)",
      topSpeed: "250 km/h (155 mph)",
      topSpeedLabel: "Top Speed (Governed)"
    },
    specs: {
      engine: "6.0L V12 Biturbo (621 hp)",
      acceleration: "0-60 mph in 4.4s",
      cabinVolume: "Executive Rear Lounge",
      interior: "Diamond-Quilted Nappa Leather",
      soundproof: "Active Acoustic Road Noise Cancellation (38 dB)",
      amenities: "Reclining Ottoman, Starlink Wi-Fi, Champagne Chiller"
    },
    highlights: [
      "Mirror-finish obsidian black paint with hand-polished clearcoat",
      "First-class rear compartment with calf rests and thermal acupressure massage",
      "Electrically operated gesture-controlled comfort rear doors",
      "Encrypted mobile workspace suite with dedicated 5G/Starlink VPN uplink"
    ],
    configuratorOptions: {
      finishes: [
        { id: "gloss", name: "Obsidian High-Gloss Clearcoat", extra: 0 },
        { id: "matte", name: "Satin Matte Night Magno", extra: 45 },
        { id: "pearl", name: "Metallic Carbon Pearl", extra: 35 }
      ],
      wheels: [
        { id: "w1", name: "20\" Maybach 5-Hole Forged Gloss Black", extra: 0 },
        { id: "w2", name: "21\" Multi-Spoke Monoblock Obsidian", extra: 30 }
      ],
      interiors: [
        { id: "i1", name: "Exclusive Nappa Leather Beluga Black", extra: 0 },
        { id: "i2", name: "Designo Diamond-Quilted Noir with Gold Stitching", extra: 40 }
      ],
      packages: [
        { id: "p1", name: "Executive Rear Lounge Suite", price: 50 },
        { id: "p2", name: "Starlink Encrypted SATCOM Suite", price: 35 },
        { id: "p3", name: "Tarmac FBO VIP Meet-and-Greet", price: 40 }
      ]
    }
  },
  {
    id: "rolls-ghost",
    categoryId: "sedans",
    name: "Rolls-Royce Ghost Black Badge Privé",
    badge: "Ultra-Bespoke Luxury Sedan",
    tag: "BESPOKE MONOLITH",
    priceStarting: "From $295 / hr",
    priceMileage: "$5.20 / mile",
    image: "/ghost.jpg",
    interiorImage: "/ghost.jpg",
    profileImage: "/ghost.jpg",
    headline: "Pure Understated Grandeur with Starlight Sanctuary",
    description: "Darkened Spirit of Ecstasy, Planar suspension scanning the road ahead, and an acoustic cocoon insulated with over 100 kg of sound damping.",
    porscheSpecs: {
      acceleration: "4.6 s",
      accelerationLabel: "0-100 km/h (0-60 mph)",
      power: "591 hp / 435 kW",
      powerLabel: "Power (hp / kW)",
      topSpeed: "250 km/h (155 mph)",
      topSpeedLabel: "Top Speed (Governed)"
    },
    specs: {
      engine: "6.75L Twin-Turbo V12 (591 hp)",
      acceleration: "0-60 mph in 4.6s",
      rideComfort: "Planar Suspension with Flagbearer Road Scanner",
      interior: "Obsidian Black Leather with Forge Yellow Accents",
      acoustics: "Over 100 kg of Acoustic Damping Insulation",
      headliner: "Shooting Star Fiber-Optic Starlight Ceiling"
    },
    highlights: [
      "Darkened Spirit of Ecstasy mascot and mirror-finished Black Badge chrome",
      "Magic Carpet Ride suspension that scans road topography ahead",
      "Effortless coach doors with power-assisted opening and closing",
      "Discrete lambswool floor carpets and refrigerated rear console"
    ],
    configuratorOptions: {
      finishes: [
        { id: "gloss", name: "Black Badge Mirror Obsidian", extra: 0 },
        { id: "matte", name: "Satin Noir Bespoke Magno", extra: 60 }
      ],
      wheels: [
        { id: "w1", name: "21\" Carbon-Alloy Composite Wheels", extra: 0 },
        { id: "w2", name: "22\" Black Badge Part-Polished Forged Rims", extra: 50 }
      ],
      interiors: [
        { id: "i1", name: "Obsidian Black Hide with Starlight Headliner", extra: 0 },
        { id: "i2", name: "Forge Yellow Bespoke Piping & Carbon Veneer", extra: 65 }
      ],
      packages: [
        { id: "p1", name: "Shooting Star Starlight Ceiling", price: 60 },
        { id: "p2", name: "Refrigerated Champagne Cellarette", price: 45 },
        { id: "p3", name: "Diplomatic Security Detail Lead", price: 80 }
      ]
    }
  },
  {
    id: "escalade-v",
    categoryId: "suvs",
    name: "Cadillac Escalade-V Noir Platinum",
    badge: "Presidential Armored SUV",
    tag: "COMMANDING ROAD AUTHORITY",
    priceStarting: "From $185 / hr",
    priceMileage: "$3.60 / mile",
    image: "/escalade.jpg",
    interiorImage: "/escalade.jpg",
    profileImage: "/escalade.jpg",
    headline: "Maximum Passenger Space & Certified B6 Ballistic Protection Option",
    description: "Hand-built supercharged 6.2L V8 producing 682 hp with CEN B6 ballistic composite armor option, run-flat tires, and seating for up to 6 VIPs.",
    porscheSpecs: {
      acceleration: "4.3 s",
      accelerationLabel: "0-100 km/h (0-60 mph)",
      power: "682 hp / 501 kW",
      powerLabel: "Power (hp / kW)",
      topSpeed: "201 km/h (125 mph)",
      topSpeedLabel: "Top Speed (Armored)"
    },
    specs: {
      engine: "6.2L Hand-Built Supercharged V8 (682 hp)",
      capacity: "Up to 6 Passengers + Full Luggage",
      armorLevel: "Optional CEN B6 Ballistic Steel & Glass",
      suspension: "Magnetic Ride Control 4.0 with Air Ride Adapt",
      audio: "AKG Studio Reference 36-Speaker Sound System",
      display: "38-Inch Curved OLED Driver & Navigation Cluster"
    },
    highlights: [
      "Complete monochrome black exterior package with smoked optic lenses",
      "Certified armored floor blast protection and run-flat military tires",
      "Dual rear 12.6\" personal streaming infotainment screens",
      "Executive captain chairs with custom heated and ventilated massage"
    ],
    configuratorOptions: {
      finishes: [
        { id: "gloss", name: "Onyx Black High-Gloss Platinum", extra: 0 },
        { id: "matte", name: "Satin Stealth Night Wrap", extra: 40 }
      ],
      wheels: [
        { id: "w1", name: "22\" V-Series 18-Spoke Gloss Black", extra: 0 },
        { id: "w2", name: "22\" Military Run-Flat Reinforced Wheels", extra: 45 }
      ],
      interiors: [
        { id: "i1", name: "Jet Black Semi-Aniline Leather", extra: 0 },
        { id: "i2", name: "Platinum Executive 6-Passenger Captain Suites", extra: 35 }
      ],
      packages: [
        { id: "p1", name: "CEN B6 Ballistic Armor Core", price: 95 },
        { id: "p2", name: "AKG 36-Speaker Studio Suite", price: 30 },
        { id: "p3", name: "Police Escort Intercom & Strobe Package", price: 50 }
      ]
    }
  },
  {
    id: "gwagon-amg",
    categoryId: "suvs",
    name: "Mercedes-AMG G63 Black Night Magno",
    badge: "Tactical VIP Escort SUV",
    tag: "TACTICAL PERFORMANCE",
    priceStarting: "From $210 / hr",
    priceMileage: "$4.10 / mile",
    image: "/gwagon.jpg",
    interiorImage: "/gwagon.jpg",
    profileImage: "/gwagon.jpg",
    headline: "All-Terrain Dominance with Iconic Monolithic Presence",
    description: "Handcrafted 4.0L biturbo V8, permanent all-wheel drive with 3 independent differential locks, and unmistakable matte black stealth stance.",
    porscheSpecs: {
      acceleration: "3.9 s",
      accelerationLabel: "0-100 km/h (0-60 mph)",
      power: "577 hp / 430 kW",
      powerLabel: "Power (hp / kW)",
      topSpeed: "240 km/h (149 mph)",
      topSpeedLabel: "Top Speed (AMG Driver)"
    },
    specs: {
      engine: "4.0L V8 Biturbo Handcrafted (577 hp)",
      acceleration: "0-60 mph in 3.9 seconds",
      drivetrain: "Full-Time AWD with 3 Independent Differential Locks",
      finish: "Factory Matte Night Black Magno Paint",
      brakes: "AMG High-Performance Braking System with Red Calipers",
      security: "Encrypted Radio & Convoy GPS Transceiver"
    },
    highlights: [
      "Striking matte black body with carbon-fiber accents and sport side exhaust",
      "Dynamic active contour front seats that hug during high-speed maneuvers",
      "High ground clearance engineered for emergency detour capability",
      "Ideal lead or rear escort vehicle for executive motorcades"
    ],
    configuratorOptions: {
      finishes: [
        { id: "matte", name: "Matte Night Black Magno (OEM)", extra: 0 },
        { id: "gloss", name: "Obsidian Metallic Black", extra: 30 }
      ],
      wheels: [
        { id: "w1", name: "22\" AMG Cross-Spoke Matte Black Rims", extra: 0 },
        { id: "w2", name: "22\" Forged Monoblock Edition 55", extra: 40 }
      ],
      interiors: [
        { id: "i1", name: "AMG Exclusive Black Nappa with Red Accents", extra: 0 },
        { id: "i2", name: "Total Monolithic Carbon Trim Package", extra: 35 }
      ],
      packages: [
        { id: "p1", name: "Motorcade Security Lead Package", price: 65 },
        { id: "p2", name: "AMG Performance Exhaust Dual Mode", price: 25 },
        { id: "p3", name: "Encrypted Convoy Radio Transmitter", price: 35 }
      ]
    }
  },
  {
    id: "panamera-turbo",
    categoryId: "coupes",
    name: "Porsche Panamera Turbo E-Hybrid Jet Black",
    badge: "High-Performance Executive Saloon",
    tag: "PRECISION VELOCITY",
    priceStarting: "From $175 / hr",
    priceMileage: "$3.40 / mile",
    image: "/panamera.jpg",
    interiorImage: "/panamera.jpg",
    profileImage: "/panamera.jpg",
    headline: "Sports Car Performance with Executive Grand Tourer Luxury",
    description: "4.0L Twin-Turbo V8 paired with an electric motor generating 670 hp. Active ride suspension, silent zero-emission city driving, and 0-100 in 3.0s.",
    porscheSpecs: {
      acceleration: "3.0 s",
      accelerationLabel: "0-100 km/h (0-60 mph)",
      power: "670 hp / 500 kW",
      powerLabel: "Power (hp / kW)",
      topSpeed: "315 km/h (196 mph)",
      topSpeedLabel: "Top Speed (Track Rated)"
    },
    specs: {
      powertrain: "4.0L Twin-Turbo V8 + E-Motor (670 hp / 686 lb-ft)",
      acceleration: "0-60 mph in 3.0 seconds",
      topSpeed: "196 mph (Track Rated)",
      chassis: "Porsche Active Ride Dual-Valve Air Suspension",
      interior: "Smooth-Finish Black Club Leather with Carbon Trim",
      passengerDisplay: "Dedicated 10.9-inch Front Passenger Interface"
    },
    highlights: [
      "Ultra-responsive hybrid propulsion offering silent electric city cruising",
      "Active aerodynamic rear spoiler with multi-stage high-speed deployment",
      "Rear executive bucket seating with independent thermal controls",
      "Optimized for urgent high-speed inter-city executive transit"
    ],
    configuratorOptions: {
      finishes: [
        { id: "gloss", name: "Jet Black Metallic", extra: 0 },
        { id: "matte", name: "Satin Stealth Black Wrap", extra: 40 }
      ],
      wheels: [
        { id: "w1", name: "21\" Panamera SportDesign Wheels in Gloss Black", extra: 0 },
        { id: "w2", name: "21\" Exclusive Design Carbon Aero Wheels", extra: 45 }
      ],
      interiors: [
        { id: "i1", name: "Black Club Leather with Dark Paldao Wood", extra: 0 },
        { id: "i2", name: "Full Carbon Fiber Package with Acid Green Stitching", extra: 35 }
      ],
      packages: [
        { id: "p1", name: "Porsche Active Ride Suspension", price: 40 },
        { id: "p2", name: "Sport Chrono Urgent Transit Package", price: 30 },
        { id: "p3", name: "Rear Seat Entertainment Displays", price: 35 }
      ]
    }
  },
  {
    id: "bentley-gt",
    categoryId: "coupes",
    name: "Bentley Flying Spur Speed Blackline",
    badge: "Bespoke Grand Tourer Sedan",
    tag: "BRITISH REFINEMENT",
    priceStarting: "From $240 / hr",
    priceMileage: "$4.50 / mile",
    image: "/bentley.jpg",
    interiorImage: "/bentley.jpg",
    profileImage: "/bentley.jpg",
    headline: "Effortless W12 Power Handcrafted in Crewe, England",
    description: "Handcrafted 6.0L twin-turbo W12 engine delivering 626 hp. Full Blackline specification replacing all exterior brightwork with high-gloss black.",
    porscheSpecs: {
      acceleration: "3.7 s",
      accelerationLabel: "0-100 km/h (0-60 mph)",
      power: "626 hp / 467 kW",
      powerLabel: "Power (hp / kW)",
      topSpeed: "333 km/h (207 mph)",
      topSpeedLabel: "Top Speed (W12 Engine)"
    },
    specs: {
      engine: "6.0L Twin-Turbo W12 (626 hp / 664 lb-ft)",
      acceleration: "0-60 mph in 3.7 seconds",
      allWheelSteer: "Electronic All-Wheel Steering for Agile Turning",
      interior: "Beluga Black Hide with Piano Black Veneers",
      audio: "Naim for Bentley 2,200W 19-Speaker Hi-Fi",
      touchscreen: "Bentley Rotating 12.3\" Dashboard Display"
    },
    highlights: [
      "Full Blackline specification replacing all exterior brightware with gloss black",
      "Diamond-in-Diamond quilting on door panels and leather seats",
      "Hand-polished mirror obsidian black finish with ceramic coating",
      "Touch Screen Remote for rear passengers to control climate and blinds"
    ],
    configuratorOptions: {
      finishes: [
        { id: "gloss", name: "Beluga Gloss Black Lacquer", extra: 0 },
        { id: "matte", name: "Satin Onyx Black Spec", extra: 50 }
      ],
      wheels: [
        { id: "w1", name: "22\" Speed Wheel - Dark Tint Finish", extra: 0 },
        { id: "w2", name: "22\" Sports Wheel in High-Gloss Black", extra: 40 }
      ],
      interiors: [
        { id: "i1", name: "Beluga Hide with Piano Black Veneers", extra: 0 },
        { id: "i2", name: "Mulliner Diamond-in-Diamond Quilting with Contrast", extra: 45 }
      ],
      packages: [
        { id: "p1", name: "Naim for Bentley 2,200W Premium Audio", price: 40 },
        { id: "p2", name: "Bentley Rotating Display Suite", price: 30 },
        { id: "p3", name: "Four-Seat Comfort Specification", price: 50 }
      ]
    }
  }
];

export const FLEET_VEHICLES = FLEET_MODELS;

export const CORE_SERVICES = [
  {
    id: "executive-chauffeur",
    category: "VIP Mobility",
    title: "Executive Chauffeur & Tarmac FBO Transfers",
    tag: "FIRST-CLASS CHAUFFEUR",
    subtitle: "Private tarmac meet-and-greet, luxury airport transit, and corporate executive mobility in flagship black sedans.",
    description: "Impeccable point-to-point transit for C-suite leaders, dignitaries, and private aviation clients. Driven by career executive chauffeurs trained in diplomatic etiquette, privacy protocols, and precision timing.",
    image: "/maybach.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85",
    vehicleType: "Mercedes-Maybach S680 Obsidian Noir",
    specs: {
      dispatch: "Immediate / Scheduled",
      capacity: "3 VIP Guests",
      soundIsolation: "Burmester 4D Noise Cancellation",
      amenities: "Starlink Wi-Fi & Privacy Suite"
    },
    features: [
      "Direct tarmac ramp access at private FBO aviation terminals",
      "Acoustic partition suite with electrochromic privacy glass",
      "Reclining zero-gravity executive ottomans with calf massage",
      "Strict confidentiality covenant and non-disclosure agreement (NDA)"
    ],
    accentColor: "#09090B"
  },
  {
    id: "armored-escort",
    category: "Tactical & Diplomatic",
    title: "Diplomatic & Armored Convoy Escort",
    tag: "BALLISTIC CERTIFIED",
    subtitle: "High-threat security motorcades and discreet VIP protection in certified B6 armored all-black luxury SUVs.",
    description: "Engineered for visiting delegations, heads of state, and high-consequence security travel. Each vehicle is fortified with certified CEN B6 ballistic composite armor, run-flat tires, and evasive drive systems.",
    image: "/escalade.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
    vehicleType: "Cadillac Escalade-V Noir Platinum (B6 Armored)",
    specs: {
      dispatch: "Priority Mobilization",
      capacity: "6 Passengers + Security",
      armorStandard: "CEN Level B6 / STANAG 4569",
      securityTeam: "Tactical Driver Certified"
    },
    features: [
      "Ballistic glass and reinforced multi-layer composite passenger cell",
      "Independent oxygen air filtration and automated fire suppression",
      "Integrated emergency siren, PA system, and secure comms array",
      "Operated by former elite security detail drivers"
    ],
    accentColor: "#09090B"
  },
  {
    id: "priority-courier",
    category: "Bespoke Valuables Transit",
    title: "High-Value Valuables & White-Glove Courier",
    tag: "SUB-SECOND CUSTODY",
    subtitle: "Urgent point-to-point secure transit for confidential legal contracts, luxury timepieces, and fine art in black grand tourers.",
    description: "When commercial courier networks are too slow or public. Direct hand-to-hand custodial transportation with nonstop highway routing, biometric lockboxes, and live encrypted location observation for clients.",
    image: "/panamera.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    vehicleType: "Porsche Panamera Turbo E-Hybrid Jet Black",
    specs: {
      dispatch: "Under 12 Mins",
      securityVault: "Biometric Dual-Key Safe",
      insuranceCover: "$10,000,000 Included",
      trackingRate: "500ms Satellite Telemetry"
    },
    features: [
      "Direct sender-to-recipient handoff with tamper-evident digital seal",
      "Zero transfers or hub stops — direct non-stop transit corridor",
      "Cockpit biometric compartment with geofenced opening authorization",
      "Real-time telematics dashboard access for sender and recipient"
    ],
    accentColor: "#09090B"
  },
  {
    id: "tactical-convoy",
    category: "High-Performance SUV",
    title: "Tactical VIP Escort & Event Motorcades",
    tag: "CONVOY ESCORT",
    subtitle: "Commanding road authority and all-terrain performance for high-profile security perimeters.",
    description: "Designed to provide dynamic perimeter escort for motorcades and high-profile transit through dense metropolitan areas. Combines handcrafted biturbo V8 agility with unmistakable obsidian design.",
    image: "/gwagon.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
    vehicleType: "Mercedes-AMG G63 Black Night Edition",
    specs: {
      power: "577 hp Biturbo V8",
      acceleration: "0-60 in 3.9s",
      driveSystem: "Permanent AWD + 3 Diff Locks",
      finish: "Matte Night Black Magno"
    },
    features: [
      "Triple differential locking for all-weather & off-road readiness",
      "High-output communication radios and thermal night-vision sensors",
      "Reinforced heavy-duty bull-bar push bumpers",
      "Ideal companion vehicle for multi-car VIP convoy envelopes"
    ],
    accentColor: "#09090B"
  }
];

export const TRUST_METRICS = [
  {
    value: "28,500+",
    label: "VIP Transits Completed",
    sub: "Flawless executions across Toronto, Vancouver, Montreal, New York, and London corridors.",
    accent: "#09090B"
  },
  {
    value: "100%",
    label: "Obsidian Black Fleet",
    sub: "Every vehicle is strictly finished in mirror-grade or matte obsidian black, under 18 months old.",
    accent: "#09090B"
  },
  {
    value: "< 9.5 MIN",
    label: "Average Mobilization",
    sub: "Strategically staged at private FBO airport terminals and luxury downtown financial cores.",
    accent: "#09090B"
  },
  {
    value: "$10,000,000",
    label: "Comprehensive Primary Cover",
    sub: "Full passenger, vehicle, and cargo liability coverage underwritten by tier-one global syndicates.",
    accent: "#09090B"
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: "ShieldAlert",
    title: "Vetted Executive Security Chauffeurs",
    desc: "Every chauffeur undergoes intensive background vetting, tactical evasive driving certification, and strict non-disclosure protocol agreements."
  },
  {
    icon: "Navigation",
    title: "Sub-Second Satellite Telemetry",
    desc: "Private live portal access allows family offices and corporate security teams to monitor vehicle coordinates, speed, and status."
  },
  {
    icon: "Clock",
    title: "Tarmac FBO Airport Ramp Access",
    desc: "Direct tarmac meet-and-greets at private aviation ramps (Signature, Atlantic, Skycharter, Shell Aerocentre) with flight arrival tracking."
  },
  {
    icon: "Award",
    title: "Showroom-Condition All-Black Fleet",
    desc: "Every sedan and SUV is detailed daily to sterile perfection, featuring dark privacy tint, Starlink Wi-Fi, and bottled amenities."
  },
  {
    icon: "Lock",
    title: "Strict Confidentiality Guaranteed",
    desc: "Your routes, passenger names, and destination manifests are protected under strict legal non-disclosure covenants and zero data retention."
  },
  {
    icon: "FileCheck",
    title: "CEN Level B6 Armored Protection",
    desc: "Certified armored vehicles with multi-layer ballistic glass, reinforced armor plating, and run-flat emergency mobility available on demand."
  }
];

export const PRESET_ROUTES = [
  {
    id: "route-1",
    label: "Toronto Pearson (YYZ Skycharter FBO) → Bay Street Financial Core",
    from: "Toronto Pearson Airport (Skycharter FBO), Mississauga, ON",
    to: "Bay Street Financial District / King St West, Toronto, ON",
    distance: 18.2,
    time: "28 mins"
  },
  {
    id: "route-2",
    label: "Vancouver YVR Private Terminal → Downtown Coal Harbour",
    from: "Vancouver International Airport (YVR South Terminal), BC",
    to: "Coal Harbour Luxury Towers / Burrard St, Vancouver, BC",
    distance: 9.8,
    time: "22 mins"
  },
  {
    id: "route-3",
    label: "Montreal Trudeau (YUL FBO) → Ville-Marie Business District",
    from: "Montréal-Trudeau International Airport (Innotech-Execaire FBO), QC",
    to: "Place Ville Marie / Downtown Core, Montréal, QC",
    distance: 12.4,
    time: "24 mins"
  },
  {
    id: "route-4",
    label: "JFK Signature Flight Support → Manhattan Wall Street",
    from: "JFK International Airport (Private Aviation FBO), Queens, NY",
    to: "Wall Street Financial Center / One World Trade, Manhattan, NY",
    distance: 18.4,
    time: "32 mins"
  },
  {
    id: "route-5",
    label: "London Heathrow VIP Windsor Suite → Berkeley Square Mayfair",
    from: "Heathrow Airport (VIP Windsor Suite), London, UK",
    to: "Berkeley Square, Mayfair, London, UK",
    distance: 16.5,
    time: "36 mins"
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Vantablack Privé manages our board's executive mobility across Toronto, New York, and London. The Maybach S680s are impeccably quiet, pristine, and the chauffeurs operate with clockwork punctuality and absolute discretion.",
    author: "Jonathan Vance",
    role: "Senior Managing Partner",
    company: "Vance & Sterling Private Equity (Toronto / NY)",
    rating: 5
  },
  {
    quote: "When coordinating our visiting CEO's tarmac arrival at YYZ Skycharter FBO, the Escalade-V escort was staged directly at the jet steps. The transition into downtown Toronto was flawless and completely seamless.",
    author: "Elena Rostova",
    role: "Chief of Staff & Head of Corporate Security",
    company: "Apex Global Technology",
    rating: 5
  },
  {
    quote: "We routinely transfer high-value timepieces and confidential contracts between our Vancouver and London offices. Their Panamera Turbo courier protocol provides complete chain-of-custody assurance.",
    author: "Henri de Montmirail",
    role: "Director of Private Client Services",
    company: "Montmirail Heritage Vaults",
    rating: 5
  }
];
