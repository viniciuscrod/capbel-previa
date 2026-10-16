/* Capacetes do app Capbel (v0.4).
 * Ilustrações em SVG, todas no mesmo estilo: contorno grosso azul-marinho, cor base,
 * sombra lateral, brilho e detalhes (respiros, dobradiças, rebites, costuras).
 * Cada nível libera um capacete temático. A "cor de destaque" muda um detalhe de cada modelo.
 * Uso: CAPACETES.draw({modelo:'padrao', cor:'auto', efeito:'nenhum'}, 120)
 */
(function(){
  const O = '#0E1B33';
  const SHELL = 'M40 106 C40 62 68 34 100 34 C132 34 160 62 160 106 C160 126 156 140 148 150 C139 160 126 164 100 164 C74 164 61 160 52 150 C44 140 40 126 40 106 Z';
  const SHADE = 'M122 38 C146 52 160 78 160 106 C160 126 156 140 148 150 C139 160 126 164 110 164 C138 146 146 100 122 38 Z';
  const VISOR = 'M60 94 C60 84 68 78 78 78 L122 78 C132 78 140 84 140 94 L140 112 C140 122 132 128 122 128 L78 128 C68 128 60 122 60 112 Z';
  const mirror = d => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (m, x, y) => (200 - parseFloat(x)) + ' ' + y);

  // peças comuns
  const grad = (id, a, b, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/>${c ? `<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>` : `<stop offset="1" stop-color="${b}"/>`}</linearGradient>`;
  const shell = (id, fill, shade, extra = '') => `
    <path d="${SHELL}" fill="${fill}"/>
    <g clip-path="url(#${id}s)"><path d="${SHADE}" fill="${shade}"/>${extra}</g>`;
  const outline = (w = 5) => `<path d="${SHELL}" fill="none" stroke="${O}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const visor = (id, a, b, path = VISOR) => `
    <defs>${grad(id + 'vg', a, b)}<clipPath id="${id}v"><path d="${path}"/></clipPath></defs>
    <path d="${path}" fill="url(#${id}vg)" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
    <g clip-path="url(#${id}v)" fill="#fff"><path d="M74 78 L96 78 L78 130 L56 130 Z" opacity=".32"/><path d="M102 78 L111 78 L93 130 L84 130 Z" opacity=".18"/></g>
    <path d="M66 88 C80 82 120 82 134 88" stroke="#fff" stroke-width="2.5" opacity=".35" fill="none" stroke-linecap="round"/>`;
  const hinges = (c = '#C7D1DD') => [54, 146].map(x => `<circle cx="${x}" cy="104" r="7.5" fill="${c}" stroke="${O}" stroke-width="3"/><circle cx="${x}" cy="104" r="2.6" fill="${O}"/>`).join('');
  const hilite = (op = .85) => `<path d="M62 78 C66 62 78 49 95 44" stroke="#fff" stroke-width="7" opacity="${op}" fill="none" stroke-linecap="round"/><circle cx="104" cy="42" r="3" fill="#fff" opacity="${op}"/>`;
  const star = (cx, cy, r, fill, sw = 2) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1) + ' '; } return `<path d="${p}Z" fill="${fill}" stroke="${O}" stroke-width="${sw}" stroke-linejoin="round"/>`; };

  // cada modelo recebe (id, cor de destaque) e devolve o desenho
  const MODELOS = [
    { id: 'padrao', nome: 'Capbel Clássico', lv: 1, ac: '#367ECE', tema: 'O capacete de quem está começando', draw: (id, ac) => `
      ${shell(id, '#F8FAFD', '#D5DEE9', `<path d="M44 130 L156 130 L156 160 L44 160 Z" fill="#E9EEF4"/>`)}
      <path d="M52 94 C54 72 66 55 84 46" stroke="${ac}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="${mirror('M52 94 C54 72 66 55 84 46')}" stroke="${ac}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="89" y="45" width="9" height="18" rx="4.5" fill="#9AA9BC" stroke="${O}" stroke-width="2.5"/>
      <rect x="102" y="45" width="9" height="18" rx="4.5" fill="#9AA9BC" stroke="${O}" stroke-width="2.5"/>
      ${visor(id, '#1D3156', '#4D88CC')}
      <path d="M48 130 C70 134 130 134 152 130" stroke="#B8C4D3" stroke-width="3" fill="none"/>
      <rect x="72" y="139" width="8" height="12" rx="3" fill="#AAB6C5" stroke="${O}" stroke-width="2"/>
      <rect x="120" y="139" width="8" height="12" rx="3" fill="#AAB6C5" stroke="${O}" stroke-width="2"/>
      <circle cx="100" cy="146" r="10" fill="${ac}" stroke="${O}" stroke-width="2.8"/>
      <path d="M93 147 C95.5 143.5 98 143.5 100 147 C102 150.5 104.5 150.5 107 147" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      ${hinges()}${hilite()}${outline()}` },

    { id: 'militar', nome: 'Recruta', lv: 2, ac: '#E9E1C0', tema: 'Camuflado, com óculos de campanha', draw: (id, ac) => `
      <defs><pattern id="${id}n" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 H11 M0 0 V11" stroke="#2C3120" stroke-width="1.6" opacity=".55"/></pattern></defs>
      ${shell(id, '#6E7848', '#545C36', `
        <path d="M48 98 C56 86 72 90 76 100 C80 112 66 118 58 114 C50 110 44 104 48 98Z" fill="#4A5230"/>
        <path d="M104 42 C116 38 130 46 126 58 C122 66 106 64 102 56 C99 50 99 45 104 42Z" fill="#8F9561"/>
        <path d="M126 118 C138 110 154 118 152 132 C150 142 134 142 127 133Z" fill="#454C2C"/>
        <path d="M56 138 C68 132 84 138 82 150 C80 160 64 160 57 151Z" fill="#A39A6B"/>
        <path d="M64 54 C74 46 86 54 82 63 C78 70 66 68 63 62Z" fill="#3E4528"/>
        <path d="M134 70 C142 66 150 74 146 82 C142 88 134 84 132 78Z" fill="#A39A6B"/>
        <rect x="40" y="30" width="120" height="50" fill="url(#${id}n)"/>`)}
      ${visor(id, '#1E281A', '#56703F')}
      <path d="M46 74 C70 58 130 58 154 74" stroke="${O}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M46 74 C70 58 130 58 154 74" stroke="#4A3A26" stroke-width="8" fill="none" stroke-linecap="round"/>
      <defs>${grad(id + 'g', '#FFE1A0', '#D9861A')}</defs>
      ${[80, 120].map(x => `<circle cx="${x}" cy="62" r="14" fill="#3B3B3B" stroke="${O}" stroke-width="4"/><circle cx="${x}" cy="62" r="9.5" fill="url(#${id}g)" stroke="${O}" stroke-width="2"/><path d="M${x - 5} 58 a6 6 0 0 1 6 -3" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>`).join('')}
      <rect x="96" y="58" width="8" height="6" rx="2" fill="#3B3B3B" stroke="${O}" stroke-width="2"/>
      ${star(100, 146, 10, ac, 2.5)}
      ${hinges('#8F9561')}${hilite(.45)}${outline()}` },

    { id: 'corrida', nome: 'Dublê Radical', lv: 3, ac: '#E23B3B', tema: 'Faixa de corrida, raios e número de largada', draw: (id, ac) => `
      ${shell(id, '#FBFCFE', '#D6DEE8')}
      <path d="M85 37 C92 35 108 35 115 37 L119 79 L81 79 Z" fill="${ac}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M100 38 V78" stroke="#fff" stroke-width="3" opacity=".8"/>
      <path d="M77 40 L72 79" stroke="${ac}" stroke-width="4" stroke-linecap="round"/><path d="M123 40 L128 79" stroke="${ac}" stroke-width="4" stroke-linecap="round"/>
      ${visor(id, '#2A1650', '#F2763C')}
      <path d="M50 116 L62 98 L60 109 L69 107 L57 126 L59 115 Z" fill="#FFD23F" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="${mirror('M50 116 L62 98 L60 109 L69 107 L57 126 L59 115 Z')}" fill="#FFD23F" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="82" y="136" width="36" height="19" rx="7" fill="#fff" stroke="${O}" stroke-width="2.8"/>
      <text x="100" y="151" text-anchor="middle" font-family="Saira, Arial Narrow, sans-serif" font-style="italic" font-weight="900" font-size="16" fill="${O}">91</text>
      <path d="M64 136 l8 0 M128 136 l8 0 M64 144 l8 0 M128 144 l8 0" stroke="#AAB6C5" stroke-width="3" stroke-linecap="round"/>
      ${hinges()}${hilite()}${outline()}` },

    { id: 'cowboy', nome: 'Cowboy do Asfalto', lv: 4, ac: '#B8352B', tema: 'Couro costurado e chapéu de aba larga', draw: (id, ac) => `
      ${shell(id, '#C98C4D', '#A46B32')}
      <path d="M54 92 C54 78 64 72 78 72 L122 72 C136 72 146 78 146 92 L146 114 C146 128 136 134 122 134 L78 134 C64 134 54 128 54 114 Z" stroke="#6E4019" stroke-width="2.5" stroke-dasharray="5 5" fill="none"/>
      ${visor(id, '#4A2009', '#EA8A2E')}
      <circle cx="100" cy="146" r="9" fill="#D9DEE6" stroke="${O}" stroke-width="2.8"/>${star(100, 146, 5.5, '#A9B3C0', 1.5)}
      ${hinges('#D9DEE6')}${outline()}
      <path d="M60 70 C58 44 70 24 86 22 C92 21 96 26 100 31 C104 26 108 21 114 22 C130 24 142 44 140 70 Z" fill="#8E5A2C" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M121 25 C134 33 140 50 140 70 L126 70 C129 54 127 38 121 25 Z" fill="#744820"/>
      <path d="M100 33 C96 43 96 54 100 63" stroke="#5E3A18" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M72 34 C78 28 84 26 90 27" stroke="#B57B42" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M60 60 C82 66 118 66 140 60 L140 70 C118 76 82 76 60 70 Z" fill="${ac}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      ${star(100, 67, 6.5, '#F5C400', 1.8)}
      <path d="M16 72 C22 62 44 60 64 64 C84 68 116 68 136 64 C156 60 178 62 184 72 C186 80 172 88 150 86 C130 82 70 82 50 86 C28 88 14 80 16 72 Z" fill="#A06A35" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M28 72 C50 67 80 73 100 73 C120 73 150 67 172 72" stroke="#C88A4E" stroke-width="3" fill="none" stroke-linecap="round"/>` },

    { id: 'astronauta', nome: 'Astronauta', lv: 5, ac: '#39C6FF', tema: 'Viseira dourada que reflete as estrelas', draw: (id, ac) => `
      <defs><clipPath id="${id}b"><circle cx="100" cy="98" r="64"/></clipPath>
        <radialGradient id="${id}gv" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#FFF4C7"/><stop offset=".45" stop-color="#F0B23A"/><stop offset="1" stop-color="#8A520C"/></radialGradient></defs>
      <path d="M46 146 C62 170 138 170 154 146 L158 160 C140 188 60 188 42 160 Z" fill="#B8C2D0" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      ${[64, 100, 136].map(x => `<circle cx="${x}" cy="${x === 100 ? 176 : 170}" r="3.5" fill="#7E8896" stroke="${O}" stroke-width="1.8"/>`).join('')}
      <circle cx="100" cy="98" r="64" fill="#F5F7FB"/>
      <g clip-path="url(#${id}b)"><path d="M124 36 C152 52 168 76 168 98 C168 140 136 170 98 166 C126 150 146 110 124 36Z" fill="#CBD4E1"/></g>
      <circle cx="100" cy="98" r="64" fill="none" stroke="${O}" stroke-width="5"/>
      <rect x="28" y="88" width="15" height="26" rx="5" fill="#D0D8E3" stroke="${O}" stroke-width="3"/><rect x="31.5" y="93" width="8" height="16" rx="3" fill="${ac}"/>
      <rect x="157" y="88" width="15" height="26" rx="5" fill="#D0D8E3" stroke="${O}" stroke-width="3"/><rect x="160.5" y="93" width="8" height="16" rx="3" fill="${ac}"/>
      <path d="M58 98 C58 72 78 58 100 58 C122 58 142 72 142 98 C142 124 124 140 100 140 C76 140 58 124 58 98 Z" fill="none" stroke="#C9D2DE" stroke-width="10"/>
      <path d="M58 98 C58 72 78 58 100 58 C122 58 142 72 142 98 C142 124 124 140 100 140 C76 140 58 124 58 98 Z" fill="url(#${id}gv)" stroke="${O}" stroke-width="4.5"/>
      <path d="M70 84 C78 70 94 64 108 66" stroke="#fff" stroke-width="5" opacity=".75" fill="none" stroke-linecap="round"/>
      <circle cx="118" cy="112" r="9" fill="#5B3A0A" opacity=".35"/><path d="M110 112 C114 108 122 108 126 112" stroke="#fff" stroke-width="1.5" opacity=".5" fill="none"/>
      ${[[84, 112, 1.6], [96, 122, 1.2], [128, 90, 1.4], [76, 100, 1]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('')}
      <circle cx="72" cy="50" r="9" fill="#2B67B5" stroke="${O}" stroke-width="2.5"/>${star(72, 50, 5, '#fff', 0)}
      <path d="M130 44 L148 18" stroke="${O}" stroke-width="4" stroke-linecap="round"/><circle cx="149" cy="16" r="6" fill="${ac}" stroke="${O}" stroke-width="2.5"/>
      <path d="M62 66 C66 54 76 44 88 40" stroke="#fff" stroke-width="6" opacity=".8" fill="none" stroke-linecap="round"/>` },

    { id: 'rock', nome: 'Astro do Rock', lv: 6, ac: '#5B7CFA', tema: 'Topete imponente e óculos de aviador', draw: (id, ac) => `
      ${shell(id, '#252833', '#15171E')}
      <defs>${grad(id + 'l', '#FF6FB1', '#7B2BFF')}</defs>
      ${['M58 86 C58 80 64 78 72 78 L94 78 C98 78 100 82 98 88 C96 106 88 120 76 120 C64 120 58 108 58 96 Z', mirror('M58 86 C58 80 64 78 72 78 L94 78 C98 78 100 82 98 88 C96 106 88 120 76 120 C64 120 58 108 58 96 Z')].map(d => `<path d="${d}" fill="url(#${id}l)" stroke="#E9C46A" stroke-width="5" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>`).join('')}
      <path d="M66 86 L76 86 L68 108" stroke="#fff" stroke-width="3" opacity=".55" fill="none" stroke-linecap="round"/><path d="M110 86 L120 86 L112 108" stroke="#fff" stroke-width="3" opacity=".55" fill="none" stroke-linecap="round"/>
      <path d="M96 82 C100 79 100 79 104 82" stroke="#E9C46A" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M95 135 L109 135 L101 146 L111 146 L90 166 L97 151 L88 151 Z" fill="#F5C400" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/>
      ${star(142, 128, 7, ac, 2)}
      ${hinges('#3A3F4E')}${outline()}
      <path d="M42 92 C34 66 42 38 66 26 C88 14 122 12 146 22 C164 30 174 44 172 58 C168 50 160 46 150 46 C160 52 166 62 164 74 C156 66 146 62 136 62 C142 66 146 72 146 80 C128 68 104 64 82 68 C64 72 52 80 42 92 Z" fill="#17181F" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M58 46 C80 31 112 26 142 33 M56 62 C80 48 114 43 150 47 M68 76 C90 64 116 61 136 63" stroke="#2E3242" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M72 36 C92 26 118 24 138 28" stroke="${ac}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M84 55 C102 47 124 46 142 50" stroke="${ac}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M164 74 C171 70 171 61 165 59 C160 58 158 64 162 66" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M52 70 C54 58 60 48 68 42" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".3"/>` },

    { id: 'viking', nome: 'Viking', lv: 7, ac: '#D4A537', tema: 'Chifres, rebites e protetor de nariz', draw: (id, ac) => `
      ${['M58 70 C36 66 18 50 18 26 C18 18 22 13 27 13 C29 34 44 46 66 52 Z', mirror('M58 70 C36 66 18 50 18 26 C18 18 22 13 27 13 C29 34 44 46 66 52 Z')].map(d => `<path d="${d}" fill="#F2E4C4" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>`).join('')}
      <path d="M27 40 C31 38 33 34 33 30 M40 54 C44 50 46 46 45 42" stroke="#C9B48A" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="${mirror('M27 40 C31 38 33 34 33 30 M40 54 C44 50 46 46 45 42')}" stroke="#C9B48A" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${shell(id, '#AEB7C3', '#838D9B')}
      <path d="M100 37 V74" stroke="#838D9B" stroke-width="7"/><path d="M100 37 V74" stroke="${O}" stroke-width="2" opacity=".5"/>
      <path d="M46 80 C70 70 130 70 154 80 L154 92 C130 82 70 82 46 92 Z" fill="${ac}" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/>
      ${[54, 70, 86, 114, 130, 146].map(x => `<circle cx="${x}" cy="${x < 62 || x > 138 ? 86 : 81}" r="2.6" fill="#7A5A16"/>`).join('')}
      ${visor(id, '#141A27', '#3A4A66', 'M62 98 C62 92 68 90 76 90 L124 90 C132 90 138 92 138 98 L138 114 C138 122 132 128 122 128 L78 128 C68 128 62 122 62 114 Z')}
      <path d="M95 84 L105 84 L106 128 L94 128 Z" fill="#AEB7C3" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M50 148 C64 162 136 162 150 148" stroke="#8A6239" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M58 152 l4 6 M72 156 l3 6 M86 158 l2 6 M100 158 v6 M114 158 l-2 6 M128 156 l-3 6 M142 152 l-4 6" stroke="#5E4024" stroke-width="2.5" stroke-linecap="round"/>
      ${hinges('#D4A537')}${hilite(.7)}${outline()}` },

    { id: 'cavaleiro', nome: 'Cavaleiro', lv: 8, ac: '#D63A3A', tema: 'Elmo de aço com grade e pluma', draw: (id, ac) => `
      <path d="M104 42 C98 20 108 4 132 4 C150 4 166 14 170 30 C160 23 146 21 136 25 C150 27 162 36 166 48 C152 40 138 38 124 42 C116 44 110 46 104 42 Z" fill="${ac}" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M116 30 C126 20 140 16 152 18 M120 40 C132 34 146 34 156 38" stroke="#fff" stroke-width="2.5" opacity=".45" fill="none" stroke-linecap="round"/>
      ${shell(id, '#C1CAD6', '#8E99A9')}
      <path d="M100 36 V156" stroke="#8E99A9" stroke-width="6"/><path d="M100 36 V156" stroke="${O}" stroke-width="2" opacity=".45"/>
      <path d="${VISOR}" fill="#A6B0BE" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      ${[90, 102, 114].map(y => `<rect x="68" y="${y}" width="64" height="6" rx="3" fill="${O}"/>`).join('')}
      <path d="M66 86 C80 82 120 82 134 86" stroke="#fff" stroke-width="2.5" opacity=".5" fill="none" stroke-linecap="round"/>
      ${[[84, 140], [92, 146], [100, 140], [108, 146], [116, 140], [100, 152]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.3" fill="${O}"/>`).join('')}
      ${[[62, 90], [62, 116], [138, 90], [138, 116]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.8" fill="#E6EBF2" stroke="${O}" stroke-width="1.5"/>`).join('')}
      ${hinges('#E6EBF2')}${hilite(.9)}${outline()}` },

    { id: 'samurai', nome: 'Samurai', lv: 9, ac: '#F5F0E6', tema: 'Laca vermelha e crista dourada', draw: (id, ac) => `
      <path d="M26 128 C40 160 160 160 174 128 L176 142 C162 172 38 172 24 142 Z" fill="#7E1B1F" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M24 142 C38 176 162 176 176 142 L176 154 C160 188 40 188 24 154 Z" fill="#5E1417" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
      ${[40, 70, 100, 130, 160].map(x => `<circle cx="${x}" cy="${x === 100 ? 171 : x === 70 || x === 130 ? 168 : 158}" r="2.5" fill="#D4A537"/>`).join('')}
      ${shell(id, '#A2262B', '#781A1E')}
      <path d="M44 94 C34 90 26 80 28 68 C36 76 46 79 54 81 Z" fill="#D4A537" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="${mirror('M44 94 C34 90 26 80 28 68 C36 76 46 79 54 81 Z')}" fill="#D4A537" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/>
      ${visor(id, '#14080A', '#4A1A20')}
      <path d="M64 94 C64 86 70 82 78 82 L122 82 C130 82 136 86 136 94" stroke="#D4A537" stroke-width="2.5" fill="none"/>
      <path d="M84 142 C92 137 98 139 100 143 C102 139 108 137 116 142" stroke="#D4A537" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      ${hinges('#D4A537')}${hilite(.6)}${outline()}
      <defs>${grad(id + 'g', '#FFF0A8', '#E3A915', '#A8740A')}</defs>
      <path d="M72 66 C58 52 55 32 65 14 C68 34 80 48 100 54 C120 48 132 34 135 14 C145 32 142 52 128 66 C116 60 84 60 72 66 Z" fill="url(#${id}g)" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="100" cy="62" r="9" fill="${ac}" stroke="${O}" stroke-width="3"/><circle cx="100" cy="62" r="3.5" fill="#A2262B"/>` },

    { id: 'heroi', nome: 'Herói de Belém', lv: 10, ac: '#F5C400', tema: 'Máscara de herói, asas e emblema', draw: (id, ac) => `
      ${['M46 100 C28 96 13 80 11 58 C21 67 32 71 42 71 C32 63 26 52 26 40 C36 55 47 62 58 66 Z', mirror('M46 100 C28 96 13 80 11 58 C21 67 32 71 42 71 C32 63 26 52 26 40 C36 55 47 62 58 66 Z')].map(d => `<path d="${d}" fill="#E6EBF2" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>`).join('')}
      <path d="M22 72 C30 76 38 78 46 78 M32 58 C38 64 44 68 52 70" stroke="#A9B3C0" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="${mirror('M22 72 C30 76 38 78 46 78 M32 58 C38 64 44 68 52 70')}" stroke="#A9B3C0" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      ${shell(id, '#2457C5', '#1A3F92', `<path d="M30 142 L170 142 L170 170 L30 170 Z" fill="#E23B3B"/><path d="M30 142 L170 142" stroke="${O}" stroke-width="3"/>`)}
      <path d="M58 96 C66 82 86 80 100 88 C114 80 134 82 142 96 C140 112 128 124 112 122 C106 120 102 114 100 110 C98 114 94 120 88 122 C72 124 60 112 58 96 Z" fill="${O}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M68 99 C75 91 86 91 93 101 C86 109 75 109 68 99 Z" fill="#E9F6FF"/><path d="${mirror('M68 99 C75 91 86 91 93 101 C86 109 75 109 68 99 Z')}" fill="#E9F6FF"/>
      <circle cx="100" cy="58" r="13" fill="${ac}" stroke="${O}" stroke-width="3.5"/>
      <path d="M97 49 L105 49 L100 57 L106 57 L95 69 L98 60 L93 60 Z" fill="#E23B3B" stroke="${O}" stroke-width="1.6" stroke-linejoin="round"/>
      ${hinges('#E6EBF2')}${hilite(.8)}${outline()}` },

    { id: 'ciborgue', nome: 'Ciborgue', lv: 11, ac: '#39F6FF', tema: 'Cromado, antenas e visor de LED', draw: (id, ac) => `
      <defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F6FA"/><stop offset=".5" stop-color="#AAB5C4"/><stop offset=".52" stop-color="#7C889A"/><stop offset="1" stop-color="#C9D1DC"/></linearGradient>
        <filter id="${id}glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <rect x="31" y="90" width="15" height="32" rx="6" fill="#5E6B7D" stroke="${O}" stroke-width="3"/><rect x="154" y="90" width="15" height="32" rx="6" fill="#5E6B7D" stroke="${O}" stroke-width="3"/>
      <path d="M38 96 V116 M161 96 V116" stroke="${ac}" stroke-width="3" stroke-linecap="round" filter="url(#${id}glow)"/>
      ${shell(id, `url(#${id}c)`, 'rgba(14,27,51,.18)')}
      <path d="M60 64 L78 54 M140 64 L122 54 M52 120 L60 120 M140 120 L148 120" stroke="${O}" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>
      ${[[70, 50], [130, 50], [58, 138], [142, 138]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#E6EBF2" stroke="${O}" stroke-width="1.6"/>`).join('')}
      <path d="${VISOR}" fill="#05070D" stroke="${O}" stroke-width="4.5"/>
      <rect x="68" y="98" width="64" height="9" rx="4.5" fill="${ac}" filter="url(#${id}glow)"/>
      ${[76, 88, 100, 112, 124].map(x => `<rect x="${x - 2}" y="99.5" width="4" height="6" rx="2" fill="#fff" opacity=".85"/>`).join('')}
      ${[86, 93, 100, 107, 114].map(x => `<rect x="${x - 1.5}" y="136" width="3" height="14" rx="1.5" fill="${O}" opacity=".7"/>`).join('')}
      <path d="M100 36 V16" stroke="${O}" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="13" r="5.5" fill="${ac}" stroke="${O}" stroke-width="2.5" filter="url(#${id}glow)"/>
      ${hilite(.9)}${outline()}` },

    { id: 'lenda', nome: 'Lenda de Belém', lv: 12, ac: '#E5484D', tema: 'Ouro, coroa e joias: o topo da Capbel', draw: (id, ac) => `
      <defs><linearGradient id="${id}o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF4B8"/><stop offset=".45" stop-color="#F2BE2A"/><stop offset="1" stop-color="#A86E08"/></linearGradient></defs>
      ${shell(id, `url(#${id}o)`, 'rgba(120,70,0,.25)')}
      <path d="M58 118 C52 100 56 84 66 76 M142 118 C148 100 144 84 134 76" stroke="#B07A0E" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${visor(id, '#24093F', '#8A4CE0')}
      <path d="${VISOR}" fill="none" stroke="#F5C400" stroke-width="2.5" transform="translate(100 103) scale(.94) translate(-100 -103)"/>
      <path d="M92 140 L100 132 L108 140 L100 150 Z" fill="${ac}" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/>
      ${hinges('#F5C400')}${hilite(.95)}${outline()}
      <path d="M58 56 L63 22 L82 40 L100 12 L118 40 L137 22 L142 56 C118 49 82 49 58 56 Z" fill="#F5C400" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M58 56 C82 49 118 49 142 56 L142 64 C118 57 82 57 58 64 Z" fill="#D9A100" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="100" cy="30" r="6" fill="${ac}" stroke="${O}" stroke-width="2.5"/><circle cx="72" cy="38" r="4" fill="#2B67B5" stroke="${O}" stroke-width="2"/><circle cx="128" cy="38" r="4" fill="#1E9E6A" stroke="${O}" stroke-width="2"/>
      ${[[63, 20], [100, 10], [137, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#FFF4B8" stroke="${O}" stroke-width="2"/>`).join('')}` }
  ];

  const CORES = [
    ['auto', 'Original', '', 1], ['azul', 'Azul Capbel', '#367ECE', 1], ['vermelho', 'Vermelho', '#E23B3B', 2], ['verde', 'Verde Amazônia', '#1E9E6A', 3],
    ['amarelo', 'Amarelo', '#F5C400', 4], ['laranja', 'Laranja', '#F07A1A', 5], ['roxo', 'Açaí', '#7B3FD0', 6], ['rosa', 'Rosa', '#FF5FA8', 7],
    ['ciano', 'Ciano', '#39C6FF', 8], ['branco', 'Branco', '#F4F6F8', 9], ['preto', 'Preto', '#1C2230', 10], ['dourado', 'Dourado', '#D4A537', 11]
  ];
  const EFEITOS = [
    ['nenhum', 'Nenhum', '', 1], ['brilho', 'Brilho', '', 4], ['rastro', 'Rastro de velocidade', '', 6], ['pulso', 'Pulso neon', '', 8], ['particulas', 'Partículas', '', 10], ['holo', 'Holográfico', '', 12]
  ];

  let seq = 0;
  function draw(sk, size = 120) {
    const m = MODELOS.find(x => x.id === sk.modelo) || MODELOS[0];
    const c = CORES.find(x => x[0] === sk.cor);
    const ac = c && c[2] ? c[2] : m.ac;
    const id = 'cb' + (seq++);
    const efeito = sk.efeito || 'nenhum';
    const trail = efeito === 'rastro' ? `<g stroke="#60B0D7" stroke-width="6" stroke-linecap="round" opacity=".85"><path d="M2 70 H30"/><path d="M-6 98 H34"/><path d="M4 126 H32"/></g>` : '';
    return `<svg class="helmet fx-${efeito}" width="${size}" height="${size}" viewBox="0 0 200 200" aria-hidden="true">
      <defs><clipPath id="${id}s"><path d="${SHELL}"/></clipPath></defs>
      <ellipse cx="100" cy="184" rx="58" ry="8" fill="rgba(14,27,51,.2)"/>
      ${trail}${m.draw(id, ac)}</svg>`;
  }
  window.CAPACETES = { MODELOS, CORES, EFEITOS, draw };
})();
