export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: "Philosophy & Roots" | "Systems & Python" | "Security & Backend" | "Creative Web";
  date: string;
  readTime: string;
  views: string;
  featured?: boolean;
  tags: string[];
  spotlightColor: string;
  borderColor: string;
  badgeVariant: "amber" | "emerald" | "violet" | "indigo" | "fuchsia";
  sections: {
    heading?: string;
    content: string; // Paragraphs
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
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "plowing-fields-writing-systems",
    title: "Plowing Fields, Writing Systems: How Rural Rajasthan Built My Engineering Discipline",
    subtitle: "Why waking up at 4 AM to irrigate mustard fields taught me more about distributed reliability and clean architecture than any tutorial.",
    summary: "Growing up in Udaipurwati, Jhunjhunu, machinery wasn't a metaphor. When a 5911 tractor stalls in wet soil, you don't panic or write duct tape fixes; you trace the fuel line, bleed the air, and respect the machine. Here is how that work ethic shapes the way I build software.",
    category: "Philosophy & Roots",
    date: "Oct 24, 2026",
    readTime: "5 min read",
    views: "1.4k reads",
    featured: true,
    tags: ["Life", "Farming", "IIT Jodhpur", "Mindset", "Engineering"],
    spotlightColor: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    badgeVariant: "amber",
    sections: [
      {
        heading: "The 4 AM Shift in Udaipurwati",
        content: "Before I ever touched a terminal or knew what an API endpoint was, my mornings began in Udaipurwati, Jhunjhunu. When you have crops in the field during harvest season, you don't sleep in because you feel tired. Water turns at 4:30 AM regardless of your mood. If a pump fails or an irrigation channel breaks, 10 hours of crops get ruined.\n\nIn our household, there were no computer scientists. No senior devs to look over your shoulder. You learned by observing the physical laws of nature: water flows where gravity pulls it, engines die when air chokes them, and crops grow only if you put in the daily, unglamorous groundwork.",
        callout: {
          type: "quote",
          text: "Never forget your roots, never trade your soul for temporary noise. When you stand firm on your soil, no storm can shake your ground.",
          author: "Inspired by Sidhu Moosewala & Bhagat Singh"
        }
      },
      {
        heading: "Tractor Engines and Distributed Systems",
        content: "Around here, everyone knows the HMT 5911 — a machine built like a tank. It doesn't have fancy touchscreens or gentle sensors. It has heavy cast-iron cylinders, mechanical diesel injection, and high-torque gears. When something goes wrong with a 5911, there is no magic button. You have to understand how each mechanical subsystem connects to the next.\n\nWhen I first started studying operating systems and distributed backends at IIT Jodhpur, I had an epiphany: reliable software architecture is identical to heavy farming machinery. Both require modular isolation, predictable failure modes, and zero unhandled backpressure. If one queue overflows, the entire pipeline chokes — just like fuel injectors clogged with silt.",
        codeBlock: {
          language: "bash",
          caption: "Physical diagnostic routine vs. Software debug cycle",
          code: `# Mechanical Diesel Inspection
1. Verify fuel reservoir & shutoff valve
2. Loosen secondary filter bleed screw
3. Pump manual priming lever until bubble-free stream emerges
4. Crank engine: 100% combustion recovered

# Software Service Inspection
1. Check process daemon (psutil / systemd status)
2. Trace circular buffer & disk I/O metrics
3. Isolate corrupted transaction batch
4. Self-healing restart with zero data drop`
        }
      },
      {
        heading: "The Boot-Up Hackathon Pivot at IIT Jodhpur",
        content: "Getting into IIT Jodhpur was a massive turning point. But the real spark happened during my first semester when DevLup Labs organized the Boot-Up Hackathon. I had barely written a full web app back then. We worked 36 hours straight, fueled by chai and sheer curiosity, and ended up placing 2nd.\n\nThat was the day I realized that coding isn't about memorizing trivia or repeating boilerplate. It's about problem-solving under pressure. Since then, whether building PhotowalaGift's real-time checkout or architecting telemetry pipelines for CogniOS, I carry that exact same persistence into every commit."
      },
      {
        heading: "Zero Shortcuts: The Code Philosophy",
        content: "A lot of modern web development has become bloated — hundred-megabyte bundles for simple landing pages, copy-pasting answers without understanding execution contexts, and skipping error handling until production crashes.\n\nMy philosophy is simple: write code you can stand behind. Know why every dependency exists in your package.json. Treat system resources with respect. And above all, never pretend to be something you're not."
      }
    ]
  },
  {
    slug: "cognios-telemetry-pipeline",
    title: "Building CogniOS: Real-Time Telemetry & Anomaly Detection Under Resource Constraints",
    subtitle: "How we engineered a 4-layer telemetry daemon using psutil, rolling SQLite buffers, and Isolation Forest during DevLup Labs' Summer of Code.",
    summary: "Standard system monitors either miss micro-spikes or drown your disk in gigabytes of metrics. For CogniOS, we designed a dual-tier storage strategy with a rolling 30-minute BlackBox window and lightweight Z-score triggers.",
    category: "Systems & Python",
    date: "Oct 08, 2026",
    readTime: "7 min read",
    views: "980 reads",
    featured: false,
    tags: ["Python", "psutil", "SQLite", "DevLup Labs", "Machine Learning"],
    spotlightColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    badgeVariant: "emerald",
    sections: [
      {
        heading: "Why Existing APMs Stumble on Lightweight Edge Devices",
        content: "When monitoring edge Linux servers and development workstations, traditional APM agents (like Datadog or Prometheus node-exporter) come with heavy resource taxations. They often consume several hundred megabytes of RAM and generate steady CPU load just observing the machine.\n\nAt DevLup Labs (IIT Jodhpur), the goal for CogniOS was ambitious: create an open-source, ultra-low-overhead telemetry engine that collects high-resolution system vitals and flags anomalies locally without sending telemetry across the wire."
      },
      {
        heading: "Architecture of the 4 Telemetry Layers",
        content: "To maintain modularity and avoid kernel bottlenecks, we separated metric acquisition into four discrete sampling layers:\n\n1. Layer 1 (CPU & Core Thermal): Per-core utilization percentages, context switches, load averages, and interrupt frequencies.\n2. Layer 2 (Memory & Virtual Subsystems): Resident Set Size (RSS), page faults, cache eviction ratios, and swap pressure.\n3. Layer 3 (Disk I/O & Block Devices): Read/write IOPS, queue latency, throughput MB/s, and sector saturation.\n4. Layer 4 (Network Sockets & Process Sinks): TCP socket states (ESTABLISHED, TIME_WAIT), packet drop rates, and per-process memory footprints.",
        codeBlock: {
          language: "python",
          caption: "Core polling snippet from CogniOS Telemetry Collector",
          code: `import psutil
import time

class SystemTelemetryDaemon:
    def __init__(self, interval=1.0):
        self.interval = interval

    def collect_layer1_cpu(self):
        """Collects per-core CPU and frequency counters with minimal overhead."""
        return {
            "timestamp": time.time(),
            "cpu_percent": psutil.cpu_percent(interval=None, percpu=True),
            "cpu_stats": psutil.cpu_stats()._asdict(),
            "load_avg": psutil.getloadavg()
        }

    def collect_layer2_memory(self):
        """Captures memory saturation without triggering disk swap."""
        mem = psutil.virtual_memory()
        return {
            "total": mem.total,
            "available": mem.available,
            "percent": mem.percent,
            "used": mem.used
        }`
        }
      },
      {
        heading: "The BlackBox SQLite Circular Window Pattern",
        content: "One of our key architectural innovations was the dual-database design. Rather than writing every single 1-second sample to a permanent database, we created `blackbox.db`.\n\n`blackbox.db` holds a sliding 30-minute high-frequency window in a WAL-mode SQLite database. An asynchronous pruning thread purges records older than 1,800 seconds. Meanwhile, downsampled 1-minute summaries are flushed to `cognios_telemetry.db`.\n\nIf an anomaly is triggered (such as a memory leak slope or a sudden I/O freeze), the daemon dumps the high-frequency BlackBox snapshot so developers can inspect exactly what occurred leading up to the failure.",
        callout: {
          type: "tip",
          text: "Using SQLite WAL (Write-Ahead Logging) mode allows simultaneous non-blocking concurrent reads while our daemon flushes metric vectors every 500ms."
        }
      },
      {
        heading: "Phase 1 (Z-Score & Slope) to Phase 2 (Isolation Forest)",
        content: "For anomaly detection, we phased our approach. Simple rule-based thresholds fail because what looks like high CPU on an idle server is completely normal during compilation. We implemented a sliding-window Z-Score alongside a first-order rate-of-change (slope) detector.\n\nIn Phase 2, we integrated Scikit-learn's Isolation Forest on multi-dimensional metric vectors (CPU + I/O Wait + Swap Rate) to catch subtle runaway processes that stay within standard threshold limits but demonstrate anomalous covariance."
      }
    ]
  },
  {
    slug: "paseto-over-jwt-photowalagift",
    title: "Why We Swapped JWT for PASETO v4 in Production for PhotowalaGift",
    subtitle: "Addressing algorithm confusion attacks, stateless token revocations, and secure session management on a live e-commerce platform.",
    summary: "JWT has been the default choice for web auth for over a decade, but its cipher agility and 'alg': 'none' footguns make it perilous. When building PhotowalaGift's admin and customer portals, we switched to PASETO v4 Local tokens.",
    category: "Security & Backend",
    date: "Sep 15, 2026",
    readTime: "6 min read",
    views: "1.2k reads",
    featured: false,
    tags: ["Security", "PASETO", "Node.js", "PostgreSQL", "Production"],
    spotlightColor: "rgba(139, 92, 246, 0.12)",
    borderColor: "rgba(139, 92, 246, 0.35)",
    badgeVariant: "violet",
    sections: [
      {
        heading: "The Problem with JOSE / JWT Cipher Agility",
        content: "When launching PhotowalaGift, we handled real customer orders, Razorpay payment webhooks, and an administrative dashboard where sensitive customer photographs and order logs lived. Security wasn't something we could treat as an afterthought.\n\nJSON Web Tokens (JWT) suffer from a fundamental cryptographic design defect known as 'cipher agility'. The header of a JWT allows the token itself to specify which algorithm the server should use to verify it (e.g. `HS256`, `RS256`, or even `none`). Over the years, countless CVEs have arisen from developers failing to validate the algorithm header, allowing malicious actors to forge arbitrary admin claims."
      },
      {
        heading: "PASETO: Platform-Agnostic Security Tokens Explained",
        content: "PASETO (Platform-Agnostic Security Tokens) solves this by removing cipher agility entirely. You choose a version and purpose, and the underlying cryptography is hardcoded to modern, vetted primitives:\n\n• Version 4 Local: Uses XChaCha20-Poly1305 authenticated symmetric encryption.\n• Version 4 Public: Uses Ed25519 digital signatures.\n\nThere is no header negotiation. The server knows exactly which cipher it uses, making algorithm confusion attacks impossible.",
        codeBlock: {
          language: "typescript",
          caption: "Encrypting and Decrypting PASETO v4 Tokens in Node.js",
          code: `import { V4 } from "paseto";
import crypto from "crypto";

// 32-byte symmetric key stored securely in environment
const SYMMETRIC_KEY = Buffer.from(process.env.PASETO_KEY!, "hex");

export async function createSessionToken(userId: string, role: string) {
  return await V4.encrypt(
    {
      sub: userId,
      role: role,
      iat: new Date().toISOString(),
      exp: "2h" // Auto-validated expiration
    },
    SYMMETRIC_KEY
  );
}

export async function verifySessionToken(token: string) {
  try {
    const payload = await V4.decrypt(token, SYMMETRIC_KEY);
    return payload;
  } catch (err) {
    throw new Error("Invalid or expired session token");
  }
}`
        }
      },
      {
        heading: "Handling High-Value Admin Actions & Revocation",
        content: "Pure stateless tokens have one catch: how do you revoke an active token if an account is compromised? In PhotowalaGift, we implemented a hybrid model.\n\nCustomer browse sessions are fully stateless with a short 1-hour expiration. For administrative actions (price changes, refunds, inventory bulk updates), we check the token's issued-at timestamp against a `last_password_reset` or `token_version` column in PostgreSQL.\n\nThis gives us the extreme performance of stateless verification for 99% of requests, with instant revocation capabilities whenever an admin logs out or alters credentials."
      },
      {
        heading: "Key Takeaways for Full-Stack Developers",
        content: "1. Stop using default JWT configurations blindly in production.\n2. Never trust headers sent from the client to determine verification algorithms.\n3. PASETO simplifies backend code by turning cryptographic decisions into safe defaults."
      }
    ]
  },
  {
    slug: "optimizing-threejs-nextjs-framer",
    title: "Taming the 3D Canvas: 60FPS Scroll Animations with Three.js & Framer Motion",
    subtitle: "How we made an interactive 3D tractor scroll smoothly across desktop and mobile devices without burning battery life.",
    summary: "Integrating WebGL 3D scenes with DOM scroll libraries often leads to stutter, jank, and battery drain. Here's our playbook on buffer geometry reuse, RAF throttled event listeners, and seamless light/dark shader adaptations.",
    category: "Creative Web",
    date: "Aug 29, 2026",
    readTime: "5 min read",
    views: "1.6k reads",
    featured: false,
    tags: ["Three.js", "WebGL", "Framer Motion", "Next.js", "Performance"],
    spotlightColor: "rgba(59, 130, 246, 0.12)",
    borderColor: "rgba(59, 130, 246, 0.35)",
    badgeVariant: "indigo",
    sections: [
      {
        heading: "The Challenge: Scroll-Driven 3D Without Layout Jank",
        content: "On my portfolio site, one of the signature features is an interactive 3D Tractor scene that rotates, drives, and illuminates its headlights as the visitor scrolls through the story.\n\nHowever, rendering a 3D scene in sync with window scroll often creates a vicious cycle: scroll events fire on the main thread, trigger recalculations, desync the requestAnimationFrame loop, and cause severe stutter on mid-range Android devices and laptops running on battery."
      },
      {
        heading: "Decoupling Scroll Progress from Three.js Render Loop",
        content: "The biggest mistake is updating 3D transformations directly inside a `window.onscroll` handler. Scroll events fire at arbitrary, un-synchronized intervals that don't match the monitor's display refresh rate.\n\nInstead, we decouple them completely:\n1. The scroll listener merely stores a normalized float `targetScroll` between 0.0 and 1.0.\n2. The Three.js render loop runs smoothly on its own requestAnimationFrame and applies a lerp (linear interpolation) smoothing formula to catch up to `targetScroll`.",
        codeBlock: {
          language: "javascript",
          caption: "Lerp smoothing inside Three.js RAF loop",
          code: `let currentProgress = 0;
let targetProgress = 0;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
}, { passive: true });

function animate() {
  requestAnimationFrame(animate);

  // Smooth easing: 10% step towards target per frame
  currentProgress += (targetProgress - currentProgress) * 0.1;

  if (tractorGroup) {
    tractorGroup.rotation.y = currentProgress * Math.PI * 2;
    tractorGroup.position.z = Math.sin(currentProgress * Math.PI) * 4;
  }

  renderer.render(scene, camera);
}`
        }
      },
      {
        heading: "Memory Management & Geometry Disposal",
        content: "In Next.js, client-side route changes and component re-renders can easily leak GPU memory if WebGL contexts aren't cleanly pruned. If you mount and unmount a Three.js canvas three times without calling `.dispose()` on geometries, textures, and renderers, the browser tab will crash with WebGL context loss.\n\nWe implemented a comprehensive disposal helper in our `useEffect` cleanup return to ensure zero orphaned buffer allocations."
      },
      {
        heading: "Adapting to Light & Dark Modes",
        content: "Most 3D websites only work in pitch-dark themes. For this site, we created dynamic directional light temperatures: cool emerald-tinted moonlight in dark mode, and warm, golden Rajasthani morning sunlight in light mode, driven by the DOM class observer."
      }
    ]
  }
];

export const blogCategories = [
  "All",
  "Philosophy & Roots",
  "Systems & Python",
  "Security & Backend",
  "Creative Web"
] as const;

