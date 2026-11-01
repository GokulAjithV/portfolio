// Draws the architecture diagrams and renders them to public/assets/*.png with headless Edge.
// Edit the boxes and arrows below, then run: node diagrams/build.mjs

import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// The dark palette from src/index.css. A dark panel reads like a code block on both site themes.
const c = {
  paper: '#131211',
  card: '#201e1c',
  ink: '#ece9e2',
  muted: '#a39e95',
  line: '#3d3935',
  arrow: '#8a8479',
  accent: '#f0884a',
}

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&amp;family=Manrope:wght@700&amp;display=swap');"

function box([x, y, w, h], title, caption) {
  const middle = y + h / 2
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${c.card}" stroke="${c.line}" stroke-width="1.5" />
    <text x="${x + 14}" y="${middle - 4}" class="title">${title}</text>
    <text x="${x + 14}" y="${middle + 18}" class="caption">${caption}</text>`
}

function group([x, y, w, h], label, labelX, accent = false) {
  const color = accent ? c.accent : c.line
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="6 5" />
    <text x="${labelX}" y="${y + 21}" class="label" fill="${accent ? c.accent : c.muted}">${label}</text>`
}

function arrow(points, { accent = false, dashed = false } = {}) {
  const color = accent ? c.accent : c.arrow
  const marker = accent ? 'head-accent' : 'head'
  const dash = dashed ? 'stroke-dasharray="6 5"' : ''
  return `
    <polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2" ${dash} marker-end="url(#${marker})" />`
}

function label(x, y, text, anchor = 'middle') {
  return `
    <text x="${x}" y="${y}" text-anchor="${anchor}" class="label note">${text}</text>`
}

function svg(width, height, shapes) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <style>
    ${FONTS}
    html, svg { margin: 0; display: block; background: ${c.paper}; }
    .title { font: 700 18px Manrope, sans-serif; fill: ${c.ink}; }
    .caption { font: 400 14px 'JetBrains Mono', monospace; fill: ${c.muted}; }
    .label { font: 400 14px 'JetBrains Mono', monospace; }
    .note { fill: ${c.muted}; }
  </style>
  <defs>
    <marker id="head" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
      <path d="M0 0 10 5 0 10Z" fill="${c.arrow}" />
    </marker>
    <marker id="head-accent" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
      <path d="M0 0 10 5 0 10Z" fill="${c.accent}" />
    </marker>
  </defs>
  <rect width="${width}" height="${height}" fill="${c.paper}" />
  ${shapes.join('')}
</svg>
`
}

// Ingest and triage run left to right, then the agent runs right to left back under them.
// Matches the code: grading scores the context, then always continues to the report.
const sentri = {
  file: 'sentri-arch',
  width: 1000,
  height: 556,
  shapes: [
    group([16, 128, 954, 122], 'Triage engine (Kafka consumer group)', 220),
    group([16, 300, 756, 126], 'LangGraph RAG agent', 220, true),

    box([30, 24, 200, 72], 'Your service', 'triage-logger SDK'),
    box([270, 24, 180, 72], 'Kafka topic', 'JSON log events'),

    box([30, 160, 166, 76], 'Filter severity', 'ERROR, WARN'),
    box([220, 160, 166, 76], 'Group repeats', 'stack-trace hash'),
    box([410, 160, 166, 76], 'Route to owner', 'by service'),
    box([600, 160, 166, 76], 'Sign magic link', 'expiring JWT'),
    box([790, 160, 166, 76], 'Alert owner', 'Slack + Email'),

    box([790, 332, 166, 76], 'Engineer', 'React chat'),
    box([600, 332, 166, 76], 'Retrieve logs', 'service + trace'),
    box([410, 332, 166, 76], 'Retrieve code', 'vector search'),
    box([220, 332, 166, 76], 'Grade context', 'score 0-100'),
    box([30, 332, 166, 76], 'Write RCA', 'structured report'),

    box([30, 470, 166, 70], 'LLM', 'bring your key'),
    box([220, 470, 166, 70], 'Embed code', 'on GitHub push'),
    box([410, 470, 166, 70], 'ChromaDB', 'code vectors'),
    box([600, 470, 166, 70], 'OpenSearch', 'log history'),

    arrow([[230, 60], [270, 60]]),
    arrow([[360, 96], [360, 112], [113, 112], [113, 160]]),
    arrow([[450, 60], [984, 60], [984, 505], [766, 505]], { dashed: true }),
    arrow([[196, 198], [220, 198]]),
    arrow([[386, 198], [410, 198]]),
    arrow([[576, 198], [600, 198]]),
    arrow([[766, 198], [790, 198]]),
    arrow([[930, 236], [930, 332]]),
    arrow([[790, 370], [766, 370]]),
    arrow([[600, 370], [576, 370]]),
    arrow([[410, 370], [386, 370]]),
    arrow([[220, 370], [196, 370]]),
    arrow([[113, 332], [113, 275], [812, 275], [812, 332]], { accent: true }),
    arrow([[113, 408], [113, 470]]),
    arrow([[493, 408], [493, 470]]),
    arrow([[683, 408], [683, 470]]),
    arrow([[386, 505], [410, 505]]),

    label(718, 50, 'OpenSearch reads the same topic'),
    label(922, 290, 'signed link', 'end'),
    label(460, 267, 'report, streamed over SSE'),
  ],
}

// One row per flow through the backend, so no two arrows cross.
const crease = {
  file: 'crease-arch',
  width: 1000,
  height: 560,
  shapes: [
    group([16, 24, 228, 420], 'crease-lens (React)', 30),
    group([336, 24, 308, 520], 'crease-brain (FastAPI)', 350),

    box([30, 56, 200, 76], 'Scorer', 'ball-by-ball entry'),
    box([30, 156, 200, 76], 'Viewers', 'live scoreboard'),
    box([30, 256, 200, 76], 'Coach or captain', 'scouting chat'),
    box([30, 356, 200, 76], 'Player', 'profile photo'),

    box([350, 56, 280, 76], 'Ball and match APIs', 'record, undo, scorecard'),
    box([350, 156, 280, 76], 'WebSocket rooms', 'one room per match'),
    box([350, 256, 280, 76], 'AI scouting + summaries', 'SQL-aggregated context'),
    box([350, 356, 280, 76], 'Avatar pipeline', 'validate, strip EXIF, WebP'),
    box([350, 456, 280, 76], 'Kafka log handler', 'trace ID + telemetry'),

    box([750, 56, 220, 226], 'PostgreSQL', 'Supabase'),
    box([750, 292, 220, 62], 'Gemini', 'gemini-2.5-flash'),
    box([750, 366, 220, 66], 'AWS S3', 'avatar images'),
    box([750, 456, 220, 76], 'SENTRI', 'central log triage'),

    arrow([[230, 94], [350, 94]], { accent: true }),
    arrow([[490, 132], [490, 156]], { accent: true }),
    arrow([[350, 194], [230, 194]], { accent: true }),
    arrow([[630, 94], [750, 94]]),
    arrow([[230, 294], [350, 294]]),
    arrow([[630, 272], [750, 272]]),
    arrow([[630, 320], [750, 320]]),
    arrow([[230, 394], [350, 394]]),
    arrow([[630, 394], [750, 394]]),
    arrow([[630, 494], [750, 494]]),

    label(290, 86, 'REST'),
    label(690, 86, 'writes'),
    label(290, 184, 'live push'),
    label(290, 286, 'REST'),
    label(690, 264, 'stats'),
    label(690, 312, 'context'),
    label(290, 386, 'upload'),
    label(690, 386, 'WebP'),
    label(690, 486, 'Kafka'),
  ],
}

for (const { file, width, height, shapes } of [sentri, crease]) {
  const source = join(ROOT, 'diagrams', `${file}.svg`)
  const output = join(ROOT, 'public', 'assets', `${file}.png`)
  writeFileSync(source, svg(width, height, shapes))

  const profile = mkdtempSync(join(tmpdir(), 'diagram-edge-'))
  execFileSync(EDGE, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    `--user-data-dir=${profile}`,
    '--force-device-scale-factor=2',
    `--window-size=${width},${height}`,
    '--virtual-time-budget=8000',
    `--screenshot=${output}`,
    `file:///${source.replaceAll('\\', '/')}`,
  ])
  rmSync(profile, { recursive: true, force: true })
  console.log(`Rendered ${output}`)
}
