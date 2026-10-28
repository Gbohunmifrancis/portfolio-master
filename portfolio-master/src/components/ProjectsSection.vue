<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <h2 class="underline-title">Featured Projects</h2>
        <p>Products I have designed, built and shipped: the systems underneath and the screens people touch.</p>
      </div>

      <div class="project-list">
        <article v-for="(project, index) in featured" :key="project.name" class="project-card" :class="{ 'has-gallery': project.gallery }" :style="project.shotRatio ? { '--shot-ratio': project.shotRatio } : undefined">
          <div class="project-copy">
            <span class="project-num">0{{ index + 1 }}</span>
            <div class="project-title">
              <img class="project-logo" :src="project.logo" :alt="`${project.name} logo`" loading="lazy" />
              <h3 class="marked">{{ project.name }}</h3>
            </div>
            <p class="project-kind">{{ project.kind }}</p>
            <p class="project-desc desktop-copy">{{ project.description }}</p>
            <p class="project-desc mobile-copy">{{ project.short }}</p>
            <div class="project-role"><span>My role</span><strong>{{ project.role }}</strong></div>
            <div class="tag-row"><span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span></div>
            <div class="project-actions">
              <a v-if="project.live" class="button button-primary" :href="project.live" target="_blank" rel="noreferrer">Visit Site <span>↗</span></a>
              <a class="button button-outline" :href="project.code" target="_blank" rel="noreferrer">Source <span>↗</span></a>
            </div>
            <div v-if="project.play" class="store-badges">
              <span>Available on</span>
              <a class="play-badge" :href="project.play" target="_blank" rel="noreferrer" :aria-label="`Get ${project.name} on Google Play`">
                <svg viewBox="0 0 24 26" aria-hidden="true"><path d="M1.2.6 13.4 12.8 1.2 25a1.6 1.6 0 0 1-.7-1.4V2a1.6 1.6 0 0 1 .7-1.4Z" fill="#00d7fe"/><path d="m17.4 8.8-4 4 4 4 4.7-2.7c1.3-.8 1.3-1.9 0-2.6Z" fill="#ffbc00"/><path d="M13.4 12.8 1.2 25c.5.5 1.2.5 2 .1l14.2-8.3Z" fill="#ff3a44"/><path d="M13.4 12.8 17.4 8.8 3.2.5C2.4.1 1.7.1 1.2.6Z" fill="#00f076"/></svg>
                <span><small>Get it on</small><strong>Google Play</strong></span>
              </a>
            </div>
            <p v-if="project.note" class="project-note">{{ project.note }}</p>
          </div>

          <span class="annotation" aria-hidden="true">
            <span v-html="project.annotation"></span>
            <svg viewBox="0 0 60 46"><path d="M4 6c18 2 32 12 40 30M44 36l-9-3M44 36l2-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>

          <div class="project-visual">
            <a v-if="project.banner" class="store-banner taped" :href="project.banner.full" target="_blank" rel="noreferrer" :aria-label="`${project.banner.alt}, full size`">
              <img :src="project.banner.src" :alt="project.banner.alt" width="720" height="378" loading="lazy" />
            </a>
            <div v-else-if="project.gallery" class="store-fan">
              <a v-for="(shot, i) in project.gallery.slice(0, 3)" :key="shot.src" class="store-shot" :class="`fan-${i}`" :href="shot.full" target="_blank" rel="noreferrer" :aria-label="`${shot.alt}, full size`">
                <img :src="shot.src" :alt="shot.alt" width="540" height="960" loading="lazy" />
              </a>
            </div>
            <template v-else-if="project.screens">
              <div class="phone back"><img :src="project.screens[1]" :alt="`${project.name} screen`" loading="lazy" /></div>
              <div class="phone front"><img :src="project.screens[0]" :alt="`${project.name} screen`" loading="lazy" /></div>
            </template>
            <div v-else class="spec-sheet taped tape-top" aria-label="Glazion recipe-to-image search request">
              <span class="hand">recipe → photos of the glaze</span>
<pre><b>POST</b> /api/v2/recipe-image/search
{
  <i>"query"</i>: {
    <i>"type"</i>: "raw_recipe",
    <i>"materials"</i>: [
      { <i>"rawName"</i>: "Minspar 200", <i>"amount"</i>: 16 },
      { <i>"rawName"</i>: "Gerstley Borate", <i>"amount"</i>: 20 },
      { <i>"rawName"</i>: "Silica", <i>"amount"</i>: 9 }
    ]
  },
  <i>"firing"</i>: { <i>"coneMin"</i>: 6, <i>"atmosphere"</i>: "oxidation" }
}</pre>
              <div class="tiles" aria-hidden="true">
                <span style="background: linear-gradient(160deg, #5f8f8a, #2f5a58)"></span>
                <span style="background: linear-gradient(160deg, #e9dcc0, #b9a27a)"></span>
                <span style="background: linear-gradient(160deg, #7a4a2c, #3b2014)"></span>
                <span style="background: linear-gradient(160deg, #9fb6c9, #5d7a94)"></span>
                <span style="background: linear-gradient(160deg, #c98f5b, #8a5428)"></span>
              </div>
              <p class="tiles-caption">Test tiles matched by UMF chemistry</p>
            </div>
          </div>

          <div v-if="project.gallery" class="store-strip">
            <p class="hand">The app, screen by screen</p>
            <div class="store-strip-track" :style="{ '--shots': project.gallery.length }">
              <a v-for="shot in project.gallery" :key="shot.src" class="store-thumb" :href="shot.full" target="_blank" rel="noreferrer" :aria-label="`${shot.alt}, full size`">
                <img :src="shot.src" :alt="shot.alt" width="540" height="960" loading="lazy" />
              </a>
            </div>
          </div>
        </article>
      </div>

      <div class="more-work">
        <h3 class="underline-title">More Work</h3>
        <div class="more-grid">
          <article v-for="project in more" :key="project.name" class="mini-card">
            <img :src="project.logo" :alt="`${project.name} logo`" loading="lazy" />
            <div>
              <h4>{{ project.name }}</h4>
              <p>{{ project.description }}</p>
              <div class="tag-row"><span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span></div>
              <div class="project-actions">
                <a v-if="project.live" class="button button-primary button-sm" :href="project.live" target="_blank" rel="noreferrer">Visit Site <span>↗</span></a>
                <a class="button button-outline button-sm" :href="project.code" target="_blank" rel="noreferrer">Source <span>↗</span></a>
              </div>
            </div>
          </article>
        </div>
        <p class="project-note">Most repositories are private. Access is available for review on request.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FeaturedProject {
  name: string;
  logo: string;
  kind: string;
  description: string;
  short: string;
  role: string;
  tags: string[];
  live: string;
  code: string;
  annotation: string;
  screens?: [string, string];
  gallery?: { src: string; full: string; alt: string }[];
  banner?: { src: string; full: string; alt: string };
  shotRatio?: string;
  play?: string;
  note?: string;
}

const nfShot = (name: string, alt: string) => ({ src: `/projects/notefusion/${name}.webp`, full: `/projects/notefusion/${name}-1080.webp`, alt });

const featured: FeaturedProject[] = [
  {
    name: 'NoteFusion',
    logo: '/projects/logos/notefusion.png',
    kind: 'Music Transcription App',
    description: 'Listens to humming, singing, a choir or a song link and writes it out as movable-do Tonic Solfa and staff notation. Around it: SATB parts to learn, the song’s own band under your solfa, a daily practice path, hundreds of hymns offline and a shared choir library. On the web and on Android.',
    short: 'Turns humming, singing or a song link into Tonic Solfa and staff notation.',
    role: 'Built end to end: .NET API, Python ML worker, website and Android app',
    tags: ['.NET 10', 'Python · FastAPI', 'React Native · Expo', 'PostgreSQL'],
    live: 'https://notefusion.studio',
    code: 'https://github.com/Gbohunmifrancis/Notefusion',
    annotation: 'hum it,<br />read it!',
    play: 'https://play.google.com/store/apps/details?id=com.notefusion.com',
    gallery: [
      nfShot('song-backing', 'NoteFusion: sing over the song’s own band'),
      nfShot('practice', 'NoteFusion: a few minutes of practice a day'),
      nfShot('learn-your-part', 'NoteFusion: learn your SATB part'),
      nfShot('hymns-offline', 'NoteFusion: hundreds of hymns, offline'),
      nfShot('choir', 'NoteFusion: share it with your whole choir'),
    ],
  },
  {
    name: 'After Round 1',
    logo: '/projects/logos/after-round-1.png',
    kind: 'Real-Time Multiplayer Game',
    description: 'A Nigerian-inspired social finger-count game. Everybody calls a number, lays down zero to five fingers, and the total decides the round, live with friends, against bots, or through a 16-level story mode.',
    short: 'A Nigerian-inspired finger-count game, played live with friends or in story mode.',
    role: 'Built end to end: game server, rules engine, economy, web and mobile',
    tags: ['.NET 10', 'SignalR', 'Next.js · three.js', 'PostgreSQL · Redis'],
    live: 'https://afterround1.tech',
    code: 'https://github.com/Gbohunmifrancis/After-Round-1',
    annotation: 'same games,<br />bigger vibes',
    play: 'https://play.google.com/store/apps/details?id=com.afterround1.com',
    screens: ['/projects/screens/ar1-home.webp', '/projects/screens/ar1-leaderboard.webp'],
  },
  {
    name: 'Heartpact',
    logo: '/projects/logos/heartpact.svg',
    kind: 'Couples App · formerly 2gether',
    description: 'Keep your promises to each other: dares, hearts and a small daily ritual, for two. The phone camera counts every rep of a dare, one question a day shows your partner’s answer once you have answered too, and games like draw and guess keep you playing even apart. It began as 2gether, which still runs on the web as Twogether.',
    short: 'Dares, hearts and a daily ritual for two, with the camera counting every rep.',
    role: 'Built end to end: .NET API, real-time hubs, Android app and web app',
    tags: ['Kotlin · Android', 'MediaPipe pose', '.NET 10', 'SignalR'],
    live: 'https://twogether-omega-three.vercel.app',
    code: 'https://github.com/Gbohunmifrancis/2gether',
    annotation: 'just the<br />two of you',
    note: 'The Android app is on its way to Google Play; the web app is live.',
    shotRatio: '4 / 5',
    banner: { src: '/projects/heartpact/banner.webp', full: '/projects/heartpact/banner-full.webp', alt: 'Heartpact: keep your promises to each other' },
    gallery: [
      { src: '/projects/heartpact/promises.webp', full: '/projects/heartpact/promises-full.webp', alt: 'Heartpact: today’s dare and its countdown' },
      { src: '/projects/heartpact/camera.webp', full: '/projects/heartpact/camera-full.webp', alt: 'Heartpact: the camera counts every rep' },
      { src: '/projects/heartpact/question.webp', full: '/projects/heartpact/question-full.webp', alt: 'Heartpact: one question a day' },
      { src: '/projects/heartpact/play-together.webp', full: '/projects/heartpact/play-together-full.webp', alt: 'Heartpact: play together, even apart' },
    ],
  },
  {
    name: 'Glazion v2',
    logo: '/projects/logos/glazion.svg',
    kind: 'Ceramic Glaze Platform API',
    description: 'The API behind a glaze research platform for ceramicists: recipes and UMF chemistry, test-tile photo capture straight to cloud storage, admin review, an assistant, and a search that shows what a recipe will look like once fired.',
    short: 'The API behind a glaze research platform: recipes, chemistry, photo capture and search.',
    role: 'Backend engineer: .NET 10 API, storage, chemistry and search',
    tags: ['.NET 10', 'PostgreSQL', 'Cloudflare R2', 'Vector search'],
    live: '',
    code: 'https://github.com/Gbohunmifrancis/Glazion-v2',
    annotation: 'chemistry<br />meets photos',
    note: 'Not public yet, so there is no site to visit.',
  },
];

const more = [
  { name: 'Recchx', logo: '/projects/logos/recchx.png', description: 'A safety network for the people you love: circles, live location, safe-arrival check-ins and covert SOS alerts that still work offline.', tags: ['.NET 8', 'React Native', 'SignalR'], live: '', code: 'https://github.com/GbohunmiFrancis/Recchx' },
  { name: 'SBZ Farms', logo: '/projects/sbz-logo.png', description: 'A poultry farm operations system for birds, eggs, feed, sales, payroll, alerts and audit trails in one source of truth.', tags: ['.NET 10', 'CQRS', 'PostgreSQL'], live: 'https://sbz-fms-web.vercel.app', code: 'https://github.com/GbohunmiFrancis/sbz-' },
];
</script>
