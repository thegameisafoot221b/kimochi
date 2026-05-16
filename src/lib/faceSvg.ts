import { FaceType } from './feelings';

interface FaceConfig {
  bg: string;
  eyes: string;
  brow: string;
  mouth: string;
  cheek: boolean;
  extra: string;
}

const FACE_CONFIGS: Record<FaceType, FaceConfig> = {
  happy:     { bg: '#FAC775', eyes: 'dot',     brow: 'up',     mouth: 'bigsmile',  cheek: true,  extra: '' },
  excited:   { bg: '#EF9F27', eyes: 'star',    brow: 'up',     mouth: 'open',      cheek: true,  extra: 'sparkle' },
  proud:     { bg: '#FAC775', eyes: 'dot',     brow: 'high',   mouth: 'smile',     cheek: true,  extra: 'chest' },
  relieved:  { bg: '#9FE1CB', eyes: 'soft',    brow: 'relax',  mouth: 'softsmile', cheek: true,  extra: 'sweat' },
  grateful:  { bg: '#5DCAA5', eyes: 'dot',     brow: 'up',     mouth: 'smile',     cheek: true,  extra: 'heart' },
  hopeful:   { bg: '#97C459', eyes: 'sparkle', brow: 'up',     mouth: 'smile',     cheek: false, extra: 'star' },
  calm:      { bg: '#5DCAA5', eyes: 'closed',  brow: 'relax',  mouth: 'softsmile', cheek: true,  extra: '' },
  content:   { bg: '#9FE1CB', eyes: 'soft',    brow: 'relax',  mouth: 'smile',     cheek: false, extra: '' },
  loving:    { bg: '#ED93B1', eyes: 'dot',     brow: 'up',     mouth: 'smile',     cheek: true,  extra: 'hearts' },
  sad:       { bg: '#85B7EB', eyes: 'sad',     brow: 'sad',    mouth: 'frown',     cheek: false, extra: 'tears' },
  lonely:    { bg: '#B5D4F4', eyes: 'half',    brow: 'sad',    mouth: 'frown',     cheek: false, extra: 'alone' },
  anxious:   { bg: '#AFA9EC', eyes: 'wide',    brow: 'worry',  mouth: 'wavy',      cheek: false, extra: 'sweat' },
  worried:   { bg: '#7F77DD', eyes: 'worry',   brow: 'worry',  mouth: 'flat',      cheek: false, extra: 'sweat' },
  nervous:   { bg: '#CECBF6', eyes: 'wide',    brow: 'up',     mouth: 'flat',      cheek: false, extra: 'lines' },
  angry:     { bg: '#F09595', eyes: 'squint',  brow: 'angry',  mouth: 'grim',      cheek: false, extra: 'steam' },
  frustrated:{ bg: '#F0997B', eyes: 'squint',  brow: 'angry',  mouth: 'wavy',      cheek: false, extra: '' },
  jealous:   { bg: '#EF9F27', eyes: 'side',    brow: 'angry',  mouth: 'flat',      cheek: false, extra: '' },
  disgusted: { bg: '#B4B2A9', eyes: 'squint',  brow: 'angry',  mouth: 'disgust',   cheek: false, extra: '' },
  scared:    { bg: '#9FE1CB', eyes: 'big',     brow: 'up',     mouth: 'open',      cheek: false, extra: 'sweat' },
  shocked:   { bg: '#AFA9EC', eyes: 'huge',    brow: 'up',     mouth: 'oval',      cheek: false, extra: 'lines' },
  surprised: { bg: '#CECBF6', eyes: 'wide2',   brow: 'up',     mouth: 'o',         cheek: false, extra: 'sparkle' },
  confused:  { bg: '#D3D1C7', eyes: 'diff',    brow: 'worry',  mouth: 'wavy',      cheek: false, extra: 'question' },
  bored:     { bg: '#D3D1C7', eyes: 'half',    brow: 'flat',   mouth: 'flat',      cheek: false, extra: 'zzz' },
  tired:     { bg: '#F4C0D1', eyes: 'close2',  brow: 'relax',  mouth: 'yawn',      cheek: true,  extra: '' },
};

export function buildFaceSVG(type: FaceType, size: number = 54): string {
  const s = size;
  const c = FACE_CONFIGS[type] ?? FACE_CONFIGS.calm;
  const cx = s / 2, cy = s / 2, r = s * 0.44;
  const ey = cy - s * 0.09;
  const ex1 = cx - s * 0.135, ex2 = cx + s * 0.135;
  const er = s * 0.062;
  const my = cy + s * 0.14, mw = s * 0.21;
  const sw = s * 0.028, slw = s * 0.024;
  const bw = s * 0.026;
  const bx1 = ex1 - er * 1.2, bx2 = ex1 + er * 1.2;
  const bx3 = ex2 - er * 1.2, bx4 = ex2 + er * 1.2;
  const by = ey - er * 1.6;

  // Eyes
  let E = '';
  if (c.eyes === 'dot') {
    E = `<circle cx="${ex1}" cy="${ey}" r="${er}" fill="#5a3a1a"/><circle cx="${ex2}" cy="${ey}" r="${er}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'soft') {
    E = `<ellipse cx="${ex1}" cy="${ey}" rx="${er}" ry="${er * 0.75}" fill="#5a3a1a"/><ellipse cx="${ex2}" cy="${ey}" rx="${er}" ry="${er * 0.75}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'half') {
    E = `<ellipse cx="${ex1}" cy="${ey + er * 0.5}" rx="${er}" ry="${er * 0.55}" fill="#5a3a1a"/><ellipse cx="${ex2}" cy="${ey + er * 0.5}" rx="${er}" ry="${er * 0.55}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'closed') {
    E = `<path d="M${ex1 - er} ${ey} Q${ex1} ${ey - er * 1.3} ${ex1 + er} ${ey}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>
         <path d="M${ex2 - er} ${ey} Q${ex2} ${ey - er * 1.3} ${ex2 + er} ${ey}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.eyes === 'close2') {
    E = `<path d="M${ex1 - er} ${ey + er * 0.2} Q${ex1} ${ey + er * 1.5} ${ex1 + er} ${ey + er * 0.2}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>
         <path d="M${ex2 - er} ${ey + er * 0.2} Q${ex2} ${ey + er * 1.5} ${ex2 + er} ${ey + er * 0.2}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.eyes === 'sad') {
    E = `<ellipse cx="${ex1}" cy="${ey}" rx="${er}" ry="${er * 0.85}" fill="#5a3a1a"/><ellipse cx="${ex2}" cy="${ey}" rx="${er}" ry="${er * 0.85}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'squint') {
    E = `<ellipse cx="${ex1}" cy="${ey + er * 0.3}" rx="${er * 1.1}" ry="${er * 0.5}" fill="#5a3a1a"/><ellipse cx="${ex2}" cy="${ey + er * 0.3}" rx="${er * 1.1}" ry="${er * 0.5}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'wide' || c.eyes === 'wide2') {
    const sr = er * 1.15;
    E = `<circle cx="${ex1}" cy="${ey}" r="${sr}" fill="#5a3a1a"/><circle cx="${ex2}" cy="${ey}" r="${sr}" fill="#5a3a1a"/>
         <circle cx="${ex1 + sr * 0.3}" cy="${ey - sr * 0.25}" r="${sr * 0.32}" fill="white"/><circle cx="${ex2 + sr * 0.3}" cy="${ey - sr * 0.25}" r="${sr * 0.32}" fill="white"/>`;
  } else if (c.eyes === 'big') {
    E = `<circle cx="${ex1}" cy="${ey}" r="${er * 1.3}" fill="#5a3a1a"/><circle cx="${ex2}" cy="${ey}" r="${er * 1.3}" fill="#5a3a1a"/>
         <circle cx="${ex1 + er * 0.35}" cy="${ey - er * 0.35}" r="${er * 0.38}" fill="white"/><circle cx="${ex2 + er * 0.35}" cy="${ey - er * 0.35}" r="${er * 0.38}" fill="white"/>`;
  } else if (c.eyes === 'huge') {
    E = `<circle cx="${ex1}" cy="${ey}" r="${er * 1.5}" fill="#5a3a1a"/><circle cx="${ex2}" cy="${ey}" r="${er * 1.5}" fill="#5a3a1a"/>
         <circle cx="${ex1 + er * 0.5}" cy="${ey - er * 0.5}" r="${er * 0.5}" fill="white"/><circle cx="${ex2 + er * 0.5}" cy="${ey - er * 0.5}" r="${er * 0.5}" fill="white"/>`;
  } else if (c.eyes === 'worry') {
    E = `<ellipse cx="${ex1}" cy="${ey}" rx="${er}" ry="${er * 0.9}" fill="#5a3a1a"/><ellipse cx="${ex2}" cy="${ey}" rx="${er}" ry="${er * 0.9}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'side') {
    E = `<ellipse cx="${ex1 - er * 0.3}" cy="${ey}" rx="${er * 0.85}" ry="${er}" fill="#5a3a1a"/><ellipse cx="${ex2 - er * 0.3}" cy="${ey}" rx="${er * 0.85}" ry="${er}" fill="#5a3a1a"/>`;
  } else if (c.eyes === 'diff') {
    E = `<ellipse cx="${ex1}" cy="${ey}" rx="${er}" ry="${er * 0.85}" fill="#5a3a1a"/>
         <path d="M${ex2 - er} ${ey + er * 0.2} Q${ex2} ${ey - er} ${ex2 + er} ${ey + er * 0.2}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.eyes === 'sparkle') {
    E = `<circle cx="${ex1}" cy="${ey}" r="${er}" fill="#5a3a1a"/><circle cx="${ex2}" cy="${ey}" r="${er}" fill="#5a3a1a"/>
         <circle cx="${ex1 + er * 0.25}" cy="${ey - er * 0.3}" r="${er * 0.28}" fill="white"/><circle cx="${ex2 + er * 0.25}" cy="${ey - er * 0.3}" r="${er * 0.28}" fill="white"/>`;
  } else if (c.eyes === 'star') {
    E = `<circle cx="${ex1}" cy="${ey}" r="${er * 1.1}" fill="#5a3a1a"/><circle cx="${ex2}" cy="${ey}" r="${er * 1.1}" fill="#5a3a1a"/>
         <circle cx="${ex1 + er * 0.3}" cy="${ey - er * 0.3}" r="${er * 0.35}" fill="#FAC775"/><circle cx="${ex2 + er * 0.3}" cy="${ey - er * 0.3}" r="${er * 0.35}" fill="#FAC775"/>`;
  }

  // Brows
  let B = '';
  if (c.brow === 'up') {
    B = `<path d="M${bx1} ${by} Q${ex1} ${by - er * 0.8} ${bx2} ${by}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>
         <path d="M${bx3} ${by} Q${ex2} ${by - er * 0.8} ${bx4} ${by}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>`;
  } else if (c.brow === 'flat' || c.brow === 'relax') {
    B = `<line x1="${bx1}" y1="${by}" x2="${bx2}" y2="${by}" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>
         <line x1="${bx3}" y1="${by}" x2="${bx4}" y2="${by}" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>`;
  } else if (c.brow === 'sad') {
    B = `<path d="M${bx1} ${by} Q${ex1} ${by + er * 0.8} ${bx2} ${by}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>
         <path d="M${bx3} ${by} Q${ex2} ${by + er * 0.8} ${bx4} ${by}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>`;
  } else if (c.brow === 'angry') {
    B = `<line x1="${bx1}" y1="${by - er * 0.5}" x2="${bx2}" y2="${by + er * 0.4}" stroke="#5a3a1a" stroke-width="${bw * 1.2}" stroke-linecap="round"/>
         <line x1="${bx3}" y1="${by + er * 0.4}" x2="${bx4}" y2="${by - er * 0.5}" stroke="#5a3a1a" stroke-width="${bw * 1.2}" stroke-linecap="round"/>`;
  } else if (c.brow === 'worry') {
    B = `<path d="M${bx1} ${by + er * 0.4} Q${ex1} ${by - er * 0.5} ${bx2} ${by + er * 0.4}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>
         <path d="M${bx3} ${by + er * 0.4} Q${ex2} ${by - er * 0.5} ${bx4} ${by + er * 0.4}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>`;
  } else if (c.brow === 'high') {
    B = `<path d="M${bx1} ${by - er} Q${ex1} ${by - er * 1.8} ${bx2} ${by - er}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>
         <path d="M${bx3} ${by - er} Q${ex2} ${by - er * 1.8} ${bx4} ${by - er}" fill="none" stroke="#5a3a1a" stroke-width="${bw}" stroke-linecap="round"/>`;
  }

  // Mouth
  let M = '';
  if (c.mouth === 'bigsmile') {
    M = `<path d="M${cx - mw} ${my} Q${cx} ${my + mw} ${cx + mw} ${my}" fill="none" stroke="#5a3a1a" stroke-width="${sw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'smile') {
    M = `<path d="M${cx - mw * 0.85} ${my} Q${cx} ${my + mw * 0.7} ${cx + mw * 0.85} ${my}" fill="none" stroke="#5a3a1a" stroke-width="${sw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'softsmile') {
    M = `<path d="M${cx - mw * 0.7} ${my} Q${cx} ${my + mw * 0.45} ${cx + mw * 0.7} ${my}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'frown') {
    M = `<path d="M${cx - mw * 0.8} ${my + mw * 0.45} Q${cx} ${my - mw * 0.3} ${cx + mw * 0.8} ${my + mw * 0.45}" fill="none" stroke="#5a3a1a" stroke-width="${sw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'grim') {
    M = `<line x1="${cx - mw}" y1="${my + s * 0.025}" x2="${cx + mw}" y2="${my + s * 0.025}" stroke="#5a3a1a" stroke-width="${sw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'flat') {
    M = `<line x1="${cx - mw * 0.65}" y1="${my}" x2="${cx + mw * 0.65}" y2="${my}" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'wavy') {
    M = `<path d="M${cx - mw * 0.8} ${my} Q${cx - mw * 0.25} ${my + mw * 0.4} ${cx} ${my} Q${cx + mw * 0.25} ${my - mw * 0.4} ${cx + mw * 0.8} ${my}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'open') {
    M = `<ellipse cx="${cx}" cy="${my + s * 0.02}" rx="${mw * 0.55}" ry="${mw * 0.5}" fill="#5a3a1a"/>`;
  } else if (c.mouth === 'oval') {
    M = `<ellipse cx="${cx}" cy="${my}" rx="${mw * 0.52}" ry="${mw * 0.65}" fill="#5a3a1a"/>`;
  } else if (c.mouth === 'o') {
    M = `<circle cx="${cx}" cy="${my}" r="${mw * 0.42}" fill="#5a3a1a"/>`;
  } else if (c.mouth === 'disgust') {
    M = `<path d="M${cx - mw * 0.7} ${my} Q${cx - mw * 0.1} ${my + mw * 0.55} ${cx + mw * 0.1} ${my + mw * 0.35} Q${cx + mw * 0.4} ${my} ${cx + mw * 0.7} ${my + mw * 0.2}" fill="none" stroke="#5a3a1a" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.mouth === 'yawn') {
    M = `<ellipse cx="${cx}" cy="${my + s * 0.02}" rx="${mw * 0.7}" ry="${mw * 0.6}" fill="#5a3a1a"/>
         <ellipse cx="${cx}" cy="${my + mw * 0.1}" rx="${mw * 0.45}" ry="${mw * 0.35}" fill="#c0706a"/>`;
  }

  // Cheeks
  const CK = c.cheek
    ? `<ellipse cx="${ex1 - er * 0.4}" cy="${ey + er * 2.4}" rx="${er * 1.5}" ry="${er * 0.65}" fill="#e8887744"/>
       <ellipse cx="${ex2 + er * 0.4}" cy="${ey + er * 2.4}" rx="${er * 1.5}" ry="${er * 0.65}" fill="#e8887744"/>`
    : '';

  // Extras
  let X = '';
  if (c.extra === 'tears') {
    X = `<ellipse cx="${ex1 + er * 0.2}" cy="${ey + er * 3.2}" rx="${er * 0.38}" ry="${er * 0.6}" fill="#6ab0e8aa"/>
         <ellipse cx="${ex2 - er * 0.2}" cy="${ey + er * 3.2}" rx="${er * 0.38}" ry="${er * 0.6}" fill="#6ab0e8aa"/>`;
  } else if (c.extra === 'sweat') {
    X = `<ellipse cx="${cx + r * 0.72}" cy="${cy - r * 0.35}" rx="${er * 0.42}" ry="${er * 0.62}" fill="#6ab0e8aa"/>`;
  } else if (c.extra === 'sparkle') {
    X = `<text x="${cx + r * 0.75}" y="${cy - r * 0.5}" font-size="${s * 0.18}" fill="#FAC775" text-anchor="middle">✦</text>`;
  } else if (c.extra === 'steam') {
    X = `<path d="M${cx - mw * 0.4} ${my - er * 2} Q${cx - mw * 0.2} ${my - er * 4} ${cx} ${my - er * 3}" fill="none" stroke="#F09595" stroke-width="${slw}" stroke-linecap="round"/>
         <path d="M${cx + mw * 0.2} ${my - er * 2} Q${cx + mw * 0.4} ${my - er * 4} ${cx + mw * 0.5} ${my - er * 3}" fill="none" stroke="#F09595" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.extra === 'heart') {
    X = `<text x="${cx + r * 0.7}" y="${cy - r * 0.4}" font-size="${s * 0.22}" fill="#ED93B1" text-anchor="middle">♥</text>`;
  } else if (c.extra === 'hearts') {
    X = `<text x="${cx - r * 0.6}" y="${cy - r * 0.6}" font-size="${s * 0.18}" fill="#ED93B1" text-anchor="middle">♥</text>
         <text x="${cx + r * 0.7}" y="${cy - r * 0.4}" font-size="${s * 0.22}" fill="#D4537E" text-anchor="middle">♥</text>`;
  } else if (c.extra === 'star') {
    X = `<text x="${cx + r * 0.75}" y="${cy - r * 0.5}" font-size="${s * 0.2}" fill="#97C459" text-anchor="middle">★</text>`;
  } else if (c.extra === 'lines') {
    X = `<line x1="${cx + r * 0.55}" y1="${cy - r * 0.1}" x2="${cx + r * 0.9}" y2="${cy - r * 0.1}" stroke="#888780" stroke-width="${slw}" stroke-linecap="round"/>
         <line x1="${cx + r * 0.6}" y1="${cy + r * 0.15}" x2="${cx + r * 0.88}" y2="${cy + r * 0.15}" stroke="#888780" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.extra === 'question') {
    X = `<text x="${cx + r * 0.78}" y="${cy - r * 0.3}" font-size="${s * 0.26}" fill="#888780" text-anchor="middle" font-weight="500">?</text>`;
  } else if (c.extra === 'zzz') {
    X = `<text x="${cx + r * 0.7}" y="${cy - r * 0.45}" font-size="${s * 0.18}" fill="#888780" text-anchor="middle" font-weight="500">z</text>
         <text x="${cx + r * 0.87}" y="${cy - r * 0.62}" font-size="${s * 0.14}" fill="#888780" text-anchor="middle" font-weight="500">z</text>`;
  } else if (c.extra === 'alone') {
    X = `<path d="M${cx + r * 0.5} ${cy - r * 0.1} L${cx + r * 0.82} ${cy - r * 0.1}" stroke="#B5D4F4" stroke-width="${slw * 1.3}" stroke-linecap="round"/>
         <path d="M${cx + r * 0.5} ${cy + r * 0.15} L${cx + r * 0.75} ${cy + r * 0.15}" stroke="#B5D4F4" stroke-width="${slw}" stroke-linecap="round"/>`;
  } else if (c.extra === 'chest') {
    X = `<path d="M${cx} ${cy + r * 0.05} L${cx - er * 0.8} ${cy + r * 0.35} L${cx + er * 0.8} ${cy + r * 0.35} Z" fill="#FAC775" opacity="0.6"/>`;
  }

  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.bg}"/>
    ${B}${E}${M}${CK}${X}
  </svg>`;
}
