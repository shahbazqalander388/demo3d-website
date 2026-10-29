export const BRAND_INFO = {
  name: "VANTABLACK PRIVÉ",
  shortName: "VANTABLACK",
  tagline: "EXECUTIVE BLACK-CAR MOBILITY & BESPOKE CHAUFFEUR",
  fullName: "VANTABLACK AUTOMOTIVE PRIVÉ INC.",
  headline: "Bespoke Chauffeur & VIP Transportation — Exclusively 100% Obsidian Fleet.",
  subheadline: "Experience world-class executive mobility, airport tarmac transfers, and diplomatic security convoys in meticulously detailed all-black luxury sedans, armored SUVs, and grand tourers.",
  phone: "+1 (800) 868-BLCK",
  dispatchEmail: "concierge@vantablackprive.com",
  hq: "One World Trade Center, Floor 84, New York, NY 10007",
  globalHubs: ["New York", "Los Angeles", "London", "Zurich", "Dubai", "Singapore"],
  stats: {
    transits: "28,500+",
    onTimeRate: "99.98%",
    activeFleet: "180+ Black Cars",
    avgDispatchTime: "9.4 min",
    fleetColor: "100% Obsidian Black",
    securityRating: "CEN B6 Armored",
  }
};

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
    accentColor: "#B8860B"
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
    accentColor: "#18181B"
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
    accentColor: "#0284C7"
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
    accentColor: "#B8860B"
  }
];

export const FLEET_CATEGORIES = [
  { id: "flagship_sedans", label: "Flagship Executive Sedans", sub: "Ultra-Luxury Chauffeur & FBO Transfers" },
  { id: "luxury_suvs", label: "VIP Armored & Tactical SUVs", sub: "Executive Protection & Diplomatic Convoys" },
  { id: "performance_coupes", label: "Grand Touring & Performance Cars", sub: "High-Speed Priority & Bespoke Road Travel" }
];

export const FLEET_VEHICLES = [
  // CATEGORY 1: FLAGSHIP SEDANS
  {
    id: "sedan-maybach-noir",
    categoryId: "flagship_sedans",
    name: "Mercedes-Maybach S680 Obsidian Edition",
    categoryName: "Flagship Executive Sedan",
    tag: "FIRST-CLASS SUITE",
    headline: "The Pinnacle of Acoustic Solitude & First-Class Travel",
    image: "/maybach.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85",
    badge: "Most Requested VIP Vehicle",
    status: "STANDBY AT JFK & LAX FBO",
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
    baseRate: "$195 base + $3.80/mile (or $150/hr)",
    idealFor: "C-Level Executive Travel, Tarmac Airport Transfers, Red Carpet & Diplomacy"
  },
  {
    id: "sedan-rolls-ghost",
    categoryId: "flagship_sedans",
    name: "Rolls-Royce Ghost Black Badge Privé",
    categoryName: "Ultra-Bespoke Luxury Sedan",
    tag: "BESPOKE MONOLITH",
    headline: "Pure Understated Grandeur with Starlight Serenity",
    image: "/ghost.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85",
    badge: "Presidential & Dignitary",
    status: "AVAILABLE ON RESERVATION",
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
    baseRate: "$295 base + $5.20/mile (or $220/hr)",
    idealFor: "State Visits, High-Net-Worth Galas, Private Family Office Mobility"
  },

  // CATEGORY 2: LUXURY & ARMORED SUVS
  {
    id: "suv-escalade-v-noir",
    categoryId: "luxury_suvs",
    name: "Cadillac Escalade-V Noir Platinum",
    categoryName: "VIP Presidential Armored SUV",
    tag: "COMMANDING ROAD AUTHORITY",
    headline: "Maximum Passenger Cabin & Certified B6 Ballistic Protection Option",
    image: "/escalade.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
    badge: "Armored B6 Option Available",
    status: "READY FOR IMMEDIATE DISPATCH",
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
    baseRate: "$185 base + $3.60/mile (or $140/hr)",
    idealFor: "Corporate Teams, Security Convoys, High-Threat Executive Transit"
  },
  {
    id: "suv-gwagon-brabus",
    categoryId: "luxury_suvs",
    name: "Mercedes-AMG G63 Black Night Magno",
    categoryName: "Tactical VIP Escort SUV",
    tag: "TACTICAL PERFORMANCE",
    headline: "All-Terrain Dominance with Iconic Monolithic Presence",
    image: "/gwagon.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85",
    badge: "Tactical Convoy Escort",
    status: "STANDBY AT DOWNTOWN CORRIDOR",
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
    baseRate: "$210 base + $4.10/mile (or $160/hr)",
    idealFor: "Motorcade Security Perimeters, Luxury Lifestyle Escorts, Private Airport Runs"
  },

  // CATEGORY 3: GRAND TOURING & PERFORMANCE
  {
    id: "perf-panamera-turbo",
    categoryId: "performance_coupes",
    name: "Porsche Panamera Turbo E-Hybrid Jet Black",
    categoryName: "High-Performance Executive Saloon",
    tag: "PRECISION VELOCITY",
    headline: "Sports Car Performance with Executive Grand Tourer Luxury",
    image: "/panamera.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    badge: "Urgent Priority Express",
    status: "READY FOR DISPATCH",
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
    baseRate: "$175 base + $3.40/mile (or $135/hr)",
    idealFor: "Same-Day Intercity Executive Transit, Urgent Priority Courier, Solo VIPs"
  },
  {
    id: "perf-bentley-gt",
    categoryId: "performance_coupes",
    name: "Bentley Flying Spur Speed Blackline",
    categoryName: "Bespoke Grand Tourer Sedan",
    tag: "BRITISH REFINEMENT",
    headline: "Effortless W12 Power Handcrafted in Crewe, England",
    image: "/bentley.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85",
    badge: "Heritage Grand Tourer",
    status: "STANDBY AT METRO TERMINAL",
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
    baseRate: "$240 base + $4.50/mile (or $185/hr)",
    idealFor: "Celebrity Galas, Luxury Weekend Retreads, Private Aviation Transfers"
  }
];

export const TRUST_METRICS = [
  {
    value: "28,500+",
    label: "VIP Transits Completed",
    sub: "Flawless transfers across major global metropolitan centers with zero incident rate.",
    accent: "#09090B"
  },
  {
    value: "100%",
    label: "Obsidian Black Fleet",
    sub: "Every vehicle is strictly finished in mirror-grade or matte obsidian black, under 18 months old.",
    accent: "#B8860B"
  },
  {
    value: "< 9.5 MIN",
    label: "Average Mobilization",
    sub: "Strategically staged at private FBO airport terminals and luxury downtown financial districts.",
    accent: "#09090B"
  },
  {
    value: "$10,000,000",
    label: "Comprehensive Primary Cover",
    sub: "Full passenger, vehicle, and cargo liability coverage underwritten by tier-one global syndicates.",
    accent: "#B8860B"
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
    desc: "Direct tarmac meet-and-greets at private aviation ramps (Signature, Atlantic Aviation, Jet Aviation) with flight arrival tracking."
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
    label: "JFK Signature Flight Support → Manhattan Financial District",
    from: "JFK International Airport (Private Aviation FBO), Queens, NY",
    to: "Wall Street Financial Center / One World Trade, Manhattan, NY",
    distance: 18.4,
    time: "32 mins"
  },
  {
    id: "route-2",
    label: "SFO Private Terminal → Sand Hill Road, Silicon Valley",
    from: "San Francisco International Airport (SFO FBO), CA",
    to: "Sand Hill Rd Venture Center, Menlo Park, Silicon Valley, CA",
    distance: 22.8,
    time: "28 mins"
  },
  {
    id: "route-3",
    label: "Atlantic Aviation LAX → Beverly Hills Hotel",
    from: "Atlantic Aviation FBO (LAX Terminal), Los Angeles, CA",
    to: "Sunset Boulevard, Beverly Hills, CA",
    distance: 14.2,
    time: "24 mins"
  },
  {
    id: "route-4",
    label: "London Heathrow VIP Windsor Suite → Mayfair",
    from: "Heathrow Airport (VIP Windsor Suite), London, UK",
    to: "Berkeley Square, Mayfair, London, UK",
    distance: 16.5,
    time: "36 mins"
  },
  {
    id: "route-5",
    label: "Dubai DXB Jetex FBO → Downtown Burj Khalifa Boulevard",
    from: "Jetex VIP Private Terminal (DXB), Dubai, UAE",
    to: "Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE",
    distance: 12.8,
    time: "20 mins"
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Vantablack Privé handles our board's executive mobility across New York and London. The Maybach S680s are impeccably quiet, pristine, and the chauffeurs operate with military-level punctuality and discretion.",
    author: "Jonathan Vance",
    role: "Senior Managing Partner",
    company: "Vance & Sterling Private Equity",
    rating: 5
  },
  {
    quote: "When coordinating our visiting CEO's tarmac arrival at LAX, the Escalade-V escort was staged directly at the jet steps. The transition was seamless, secure, and completed without a moment's delay.",
    author: "Elena Rostova",
    role: "Chief of Staff & Head of Security",
    company: "Apex Global Technology",
    rating: 5
  },
  {
    quote: "We routinely transfer high-value timepieces and critical legal documents between our Geneva and London offices. Their Panamera Turbo courier protocol provides complete chain-of-custody assurance.",
    author: "Henri de Montmirail",
    role: "Director of Private Client Services",
    company: "Montmirail Heritage Vaults",
    rating: 5
  }
];
