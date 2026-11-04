export interface BlogSection {
  heading?: string;
  content: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: {
    type: "tip" | "quote" | "note";
    text: string;
    author?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  views?: string;
  sourceUrl?: string;
  featured?: boolean;
  tags: string[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kde-development-environment-fedora-kde-builder",
    title: "How I Set Up a KDE Development Environment on Fedora",
    subtitle: "A beginner-friendly walkthrough of setting up kde-builder, compiling KCalc from source, and recovering from a network interruption.",
    summary: "I wanted to contribute to KDE, but first needed to build an app locally. Here’s how I set up kde-builder on Fedora, built KCalc and worked through a clone failure along the way.",
    category: "Engineering",
    date: "Oct 7, 2026",
    readTime: "6 min read",
    views: "Originally published on Medium",
    sourceUrl: "https://medium.com/@ankitgia336/how-i-set-up-a-kde-development-environment-on-fedora-and-built-my-first-kde-app-from-source-8219cb04daa3",
    featured: true,
    tags: ["KDE", "Fedora", "Linux", "Open-Source", "kde-builder"],
    sections: [
      {
        heading: "Starting with a build, not a bug fix",
        content: "I wanted to contribute to KDE, the community behind Plasma, Dolphin, KCalc, and many other applications. Before choosing a code change, I wanted to get a KDE application building and running on my own Fedora machine.\n\nThis is the setup I used. The goal was to understand each step rather than paste commands without knowing what they do.",
        image: {
          src: "/blog/kde-builder-fedora.png",
          alt: "Terminal showing kde-builder compiling KCalc on Fedora",
          caption: "Building KCalc from source with kde-builder."
        }
      },
      {
        heading: "Accounts, SSH, and basic tools",
        content: "I joined KDE’s Matrix rooms to find project discussions and ask for help, then created a KDE Identity account for KDE’s GitLab instance. I generated an SSH key and added its public half to my KDE account; the private key stays on my machine.\n\nI also configured Git with the name and email associated with my account, then installed Git and curl through Fedora’s package manager.",
        codeBlock: {
          language: "bash",
          caption: "SSH key, Git identity, and Fedora basics",
          code: `ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub
ssh -T git@invent.kde.org

git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

sudo dnf install git curl`
        }
      },
      {
        heading: "Installing kde-builder",
        content: "kde-builder coordinates the many KDE libraries an application depends on, building modules in order. I used uv to install it in an isolated tool environment, then checked that the command was available.",
        codeBlock: {
          language: "bash",
          caption: "Install kde-builder with uv",
          code: `uv --version
uv tool install git+https://invent.kde.org/sdk/kde-builder.git
kde-builder --version`
        }
      },
      {
        heading: "Configuring the workspace and dependencies",
        content: "The generated configuration keeps KDE’s source, build, install, and log directories under ~/kde. That means the compiled application and libraries can live in my home directory rather than replacing system files.\n\nkde-builder can also install the distribution packages needed to compile KDE software. On Fedora, this step may request sudo access.",
        codeBlock: {
          language: "bash",
          caption: "Create the workspace and install build dependencies",
          code: `kde-builder --generate-config
kde-builder --install-distro-packages`
        }
      },
      {
        heading: "Building KCalc—and recovering from a dropped connection",
        content: "I chose KCalc as a first test. kde-builder cloned its source and dependencies, configured them with CMake and Ninja, compiled them, and installed the result into the KDE workspace.\n\nMy first run stopped while cloning kcodecs because the connection to invent.kde.org was reset. The clone log identified it as a network failure. I removed only the incomplete kcodecs source directory and ran the build again; kde-builder reused modules that had already built successfully.",
        codeBlock: {
          language: "bash",
          caption: "Build KCalc and retry the interrupted clone",
          code: `kde-builder kcalc

cat ~/kde/log/latest/kcodecs/git-clone.log
rm -rf ~/kde/src/kcodecs
kde-builder kcalc`
        }
      },
      {
        heading: "Running the app and taking the next step",
        content: "Once all dependencies and KCalc were built, kde-builder launched the workspace version with the right environment configured.\n\nFrom there, the contribution loop is straightforward: find an issue, fork the project, create a branch, make a focused change, rebuild, test, and open a Merge Request. Rebuilds generally only recompile what changed.",
        codeBlock: {
          language: "bash",
          caption: "Run KCalc from the KDE workspace",
          code: `kde-builder --run kcalc`
        }
      }
    ]
  },
  {
    slug: "how-uber-actually-works-system-design",
    title: "How Uber Actually Works: The Complete System Design Breakdown",
    subtitle: "Understanding how Uber matches millions of riders with drivers in under 30 milliseconds — from H3 hexagons to Redis, Kafka, Cassandra, and PostgreSQL.",
    summary: "Behind every ride request is a distributed system handling 1.25 million GPS updates per second across 70+ countries. Here is the deep-dive breakdown of Uber's architecture, geospatial hexagonal indexing (H3), multi-database tiering, and low-level ride matching engines.",
    category: "System Design",
    date: "Sep 27, 2026",
    readTime: "14 min read",
    views: "DevLup Labs Session",
    featured: true,
    tags: ["System Design", "Distributed Systems", "Geospatial", "Architecture", "DevLup Labs"],
    sections: [
      {
        heading: "Introduction: The Problem That Started Everything",
        content: "Imagine you're sitting in your apartment at 9 PM. You open the Uber app and tap “Request Ride.” Within seconds, a driver nearby accepts your request and starts heading towards you.\n\nSounds simple, right?\n\nBehind those few seconds, thousands of distributed nodes work in unison:\n1. The client app sends your GPS coordinates (latitude and longitude) to the edge gateway.\n2. Ingestion servers identify candidate drivers in your spatial vicinity.\n3. The matching engine computes dynamic driver scores based on ETA, ratings, and acceptance history.\n4. A WebSocket dispatch offer is broadcast to the top-ranked driver.\n5. The driver receives an interactive heads-up display notification to accept or decline.\n\nAll of this happens in less than 30 milliseconds — 1/30th of a single second. Worldwide, Uber processes this pipeline across 15 million daily rides, absorbing 1.25 million continuous GPS updates every second.",
        callout: {
          type: "note",
          text: "Documented during DevLup Labs' System Design Sessions at IIT Jodhpur, breaking down real-world high-throughput distributed systems.",
          author: "DevLup Labs System Design Session"
        },
        image: {
          src: "/blog/uber-system-design-lld.jpg",
          alt: "Ride-hailing System: Low-level Design Core Components and Relationships",
          caption: "Low-level system architecture: Payment Services & Strategies, Ride Management, and User Role abstractions."
        }
      },
      {
        heading: "Uber's Scale in Numbers",
        content: "To appreciate why standard architectures fail, look at the operational figures:\n\n• Active Drivers Worldwide: 5–6 million\n• Active Riders: 100+ million\n• Daily Completed Rides: 15 million\n• Operating Countries: 70+\n• End-to-End Match Latency: < 30 milliseconds\n• Driver Location Telemetry: 1.25 million GPS updates / sec\n\nWith 5 million concurrent drivers broadcasting telemetric coordinates every 4 seconds:\n5,000,000 ÷ 4 = 1,250,000 writes/second.\n\nA single relational instance (MySQL or PostgreSQL) comfortably processes roughly 10,000 writes per second before disk I/O bottlenecks and write-ahead log lock contention freeze the system. Uber's ingestion throughput exceeds standard relational limits by 125x.",
        codeBlock: {
          language: "text",
          caption: "System Evolution Milestones",
          code: `2009–2010: San Francisco inception. Monolithic Python service on LAMP stack.
2012: Global expansion. Nearest-neighbor SQL distance queries become compute bottlenecks.
2014–2015: Database saturation. Traditional spatial indexes fail under write load.
2016–Present: Custom geospatial indexing via H3 hexagons & multi-tiered polyglot storage.`
        }
      },
      {
        heading: "The Core Problem: Why Traditional Spatial Queries Fail",
        content: "When a passenger hails a car, the engine must identify all active drivers within a localized bounding box. In traditional SQL databases, this is handled via bounding coordinate filters:\n\nSearching millions of active driver rows with floating-point coordinate range checks triggers table scans or B-Tree index traversal overhead that takes 2 to 5 seconds under high concurrency. Uber requires candidate retrieval in under 2ms.",
        codeBlock: {
          language: "sql",
          caption: "Traditional spatial query (Too slow for 1.25M updates/sec)",
          code: `SELECT * FROM drivers 
WHERE latitude BETWEEN (rider_lat - 0.05) AND (rider_lat + 0.05)
  AND longitude BETWEEN (rider_lon - 0.05) AND (rider_lon + 0.05);`
        }
      },
      {
        heading: "The Geospatial Solution: Divide the City Into a Grid",
        content: "Instead of searching all global drivers, we discretize the surface of the Earth into partitioned geometric cells. Each driver is indexed only inside the cell they physically occupy.\n\nWhen a passenger requests a ride, the matching engine only inspects the passenger's immediate cell and its neighboring rings, reducing candidate evaluation from 5,000,000 drivers down to 50–100 local vehicles.",
        image: {
          src: "/blog/uber-grid-search.jpg",
          alt: "Divide the City Into a Grid: Spatial Cell Partitioning",
          caption: "Spatial partitioning: Locate rider → Search candidate cells → Rank local drivers."
        }
      },
      {
        heading: "Why Hexagons? (Squares vs. Circles vs. Hexagons)",
        content: "The geometry of the grid partition dictates search consistency, boundary conditions, and algorithmic complexity. Three primary shapes were evaluated:\n\n1. Square Grids: If a point sits in the center of a square, adjacent neighbors are 1 unit away, but diagonal neighbors are √2 ≈ 1.41 units away. This distance distortion produces artificial spatial bias in driver search radius calculations.\n\n2. Circle Packing: Circles have uniform radial symmetry, but cannot tessellate a two-dimensional plane. Overlapping circles cause duplicate driver allocations, while disjoint circles leave blind gaps where drivers become invisible.\n\n3. Regular Hexagons (H3): A regular hexagon possesses exactly 6 adjacent neighbors, every single one equidistant from the centroid. Hexagons tile the Euclidean and spherical plane with zero coverage gaps and minimal perimeter-to-area distortion.",
        image: {
          src: "/blog/uber-square-grid.jpg",
          alt: "Square Grid: Unequal Neighbor Distance",
          caption: "Square grids suffer from distance asymmetry: 1 unit orthogonal vs. 1.41 units diagonal."
        }
      },
      {
        content: "Circular partitions leave unindexed blind spots, while hexagons form a seamless continuous mathematical tessellation across the entire surface of the globe.",
        image: {
          src: "/blog/uber-circle-grid.jpg",
          alt: "Circle-based search coverage gaps",
          caption: "Circles fail to tile the plane, creating coverage gaps where drivers fall through cells."
        }
      },
      {
        content: "Because every adjacent hexagon centroid is perfectly equidistant, radiating outward across k-rings (k=1, k=2, k=3) guarantees uniform distance circles without distortion.",
        image: {
          src: "/blog/uber-hexagons-h3.jpg",
          alt: "Hexagonal tessellation with 6 equidistant neighbors",
          caption: "Regular hexagon tessellation: exactly 6 neighbors, identical centroid distances, zero gaps."
        }
      },
      {
        heading: "How Uber Implements This: The H3 Hierarchical System",
        content: "Uber open-sourced their geographic engine under H3 (Hierarchical Hexagonal Spatial Index). H3 partitions the Earth using icosahedron projections with 16 discrete resolution tiers:\n\n• Level 0: Global continent-scale cells\n• Level 5: Metropolitan areas\n• Level 10: ~5 km² areas (used for dynamic surge pricing calculations)\n• Level 13: ~200 m² areas (used for rider-driver proximity matching)\n• Level 15: ~1 m² areas (sub-meter telemetric accuracy)\n\nEach resolution level is nested hierarchically. A single 64-bit integer index encodes the entire spatial path down to the meter.",
        codeBlock: {
          language: "python",
          caption: "H3 Hexagonal Lookup & k-Ring Expansion",
          code: `import h3

# 1. Convert latitude & longitude into a 64-bit H3 Level 13 index
rider_coords = (28.5944, 77.3068)
rider_hex = h3.geo_to_h3(rider_coords[0], rider_coords[1], resolution=13)
# Output: "8d1d8d8d8d8d8"

# 2. Retrieve the center hexagon + 6 surrounding ring neighbors (7 total)
search_cells = h3.k_ring(rider_hex, k=1)

# 3. Query in-memory cache exclusively for drivers inside these 7 cells
candidate_drivers = []
for cell_id in search_cells:
    candidate_drivers.extend(redis_client.hgetall(f"active_drivers:{cell_id}"))`
        }
      },
      {
        heading: "The 4-Tier Database Architecture",
        content: "Uber operates a polyglot persistence architecture, assigning each workload to the storage engine optimized for its data access pattern:\n\n1. Redis (In-Memory Fast Layer):\nStores real-time driver coordinates keyed by H3 hexagon ID. Sub-millisecond latency. Backed by a 30-second TTL so dead batteries or network dropouts automatically expire ghost vehicles.\n\n2. Apache Cassandra (Distributed Time-Series History):\nStores immutable breadcrumb traces for 3 to 7 years. Cassandra handles linear write scaling at 1.25M writes/second across partitioned SSTables, powering fare recalculations, route reviews, and dispute resolutions.\n\n3. PostgreSQL (ACID Financial Core):\nManages riders, drivers, corporate billing, and transactional ledger payments. Guarantees strict Atomicity and Isolation so riders are never double-charged.\n\n4. Apache Kafka (Distributed Buffer Shock Absorber):\nIngests raw telemetry streams from millions of concurrent mobile devices. Decouples fast HTTP ingestion gateways from disk writes, smoothing post-event demand spikes.",
        callout: {
          type: "tip",
          text: "Never force a single database to handle high-write telemetry and strict financial ACID ledgers simultaneously. Separation of concerns is paramount.",
          author: "DevLup Labs Core Takeaway"
        }
      },
      {
        heading: "The 9-Step Lifecycle of a Ride",
        content: "When a trip is requested, data propagates across all subsystems in milliseconds:\n\nStep 1: Driver's mobile phone transmits GPS telemetry every 4 seconds.\nStep 2: Ingestion worker converts coordinates to a Level 13 H3 index (`geo_to_h3`).\nStep 3: Coordinates write to Redis with a 30s TTL (`HSET active_drivers:<hex_id> <driver_id>`).\nStep 4: Location packet streams to Kafka topic `location-updates` for async Cassandra persistence.\nStep 5: Rider taps “Request Ride”. Server converts rider position to H3 hex.\nStep 6: Matching engine expands `k_ring(rider_hex, k=1)` (7 hexagons), fetches candidate drivers from Redis, ranks them by ETA, ratings, and vehicle tier, and broadcasts a WebSocket offer.\nStep 7: Driver accepts. PostgreSQL creates trip entity with ACID transaction lock.\nStep 8: Driver location is streamed to rider's client over WebSocket connection at 60 FPS.\nStep 9: Trip arrives at destination. Fare is computed, settled via payment gateway, and archival trace is committed to Cassandra.",
        codeBlock: {
          language: "text",
          caption: "Architecture Data Flow Pipeline",
          code: `[Driver Device GPS] (every 4s)
        │
        ├──► [Redis Cache] ────► [Matching Engine: k-Ring Search] (<2ms)
        │
        └──► [Kafka Topic] ────► [Cassandra Cluster] (3-7 Yr Audit History)

[Rider Request] ─────► [Matching Engine] ─────► [Dispatch WebSocket]
                                 │
                                 └──► [PostgreSQL] (ACID Trips & Ledger)`
        }
      },
      {
        heading: "Surge Pricing & High-Density Spikes",
        content: "Surge pricing dynamically balances supply and demand. Rather than calculating city-wide surges, Uber executes demand-to-supply ratio scans on Level 10 hexagons (~5 km²):\n\nIf demand in a specific Level 10 hexagon exceeds available supply (e.g., stadium concert conclusion), the surge multiplier automatically climbs to incentivize nearby drivers to migrate.\n\nLevel 10 is chosen over Level 13 because a 200m cell changes too erratically, whereas a 5km cluster creates stable economic heatmaps."
      },
      {
        heading: "Boundary Handling, Edge Cases & Industry Comparison",
        content: "Real-world engineering requires handling edge anomalies:\n\n• Boundary Drivers: If a driver sits 5 meters away across an H3 cell boundary, a single cell query misses them. The matching engine always searches the 1st ring (7 cells). If fewer than 5 drivers are found, it dynamically widens search radius to ring 2 (19 cells) or ring 3 (37 cells).\n\n• Network Disconnections: If a mobile driver enters a tunnel, Redis TTL auto-purges their active status after 30 seconds. Upon reconnecting, the client issues a clean heartbeat without stale ghost states.\n\nAcross the industry, location-first architectures have adopted similar paradigms:\n• Google Maps uses S2 Geometry (Hilbert space-filling curve).\n• Tinder utilizes Geohashing strings (e.g., \"u4pruydqq\").\n• Zomato & DoorDash leverage H3 hexagons for restaurant dispatch clustering.",
        callout: {
          type: "quote",
          text: "Every engineering decision at scale is about choosing the right data structure for the physical constraint you are solving.",
          author: "IIT Jodhpur System Design Note"
        }
      }
    ]
  }
];

export const blogCategories: string[] = [
  "All",
  "System Design",
  "Engineering"
];
