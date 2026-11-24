// lancé par le test « local » de NeoDex : un document, la page ajustée à la largeur, la lecture plein écran (rien que la page, non modifiable) puis Échap
module.exports = async ({ pj, sleep }) => {
  await sleep(900);
  await pj(`(() => { const p = document.querySelector('.dcPage'); if (!p || !p.isConnected || !p.offsetParent) [...document.querySelectorAll('button')].find(b => b.textContent === '+ NOUVEAU' && b.offsetParent).click(); })(), 0`);
  await sleep(500);
  await pj(`(() => { const p = document.querySelector('.dcPage'); p.innerHTML = '<h1>Lettre à Lou</h1><p>' + 'Un texte assez long pour remplir la page. '.repeat(40) + '</p><h2>Suite</h2><p>Fin.</p>'; p.dispatchEvent(new Event('input')); })(), 0`);
  await sleep(300);
  const fit = await pj(`(() => { const p = document.querySelector('.dcPage').getBoundingClientRect(), w = document.querySelector('.dcWrap').getBoundingClientRect(); return { pr: Math.round(p.right), wr: Math.round(w.right), pl: Math.round(p.left), wl: Math.round(w.left), z: document.querySelector('.dcPage').style.zoom }; })()`);
  if (fit.pr > fit.wr + 1 || fit.pl < fit.wl - 1) throw new Error('la page dépasse : ' + JSON.stringify(fit));
  const over = await pj(`[...document.querySelectorAll('.ofApp *')].filter(e => e.offsetParent && e.getBoundingClientRect().right > innerWidth + 1).length`);
  if (over) throw new Error(over + ' élément(s) débordent à droite');
  await pj(`document.querySelector('.ofTb.dcReadB').click(), 0`); await sleep(400);
  const rd = await pj(`(() => { const v = document.querySelector('.ofApp'), p = document.querySelector('.dcPage'); return { on: v.classList.contains('dcReading'), side: getComputedStyle(v.querySelector('.ofSide')).display, bar: getComputedStyle(v.querySelector('.ofBar')).display, edit: p.isContentEditable, w: Math.round(p.getBoundingClientRect().width), z: p.style.zoom }; })()`);
  if (!rd.on || rd.side !== 'none' || rd.bar !== 'none' || rd.edit) throw new Error('lecture : ' + JSON.stringify(rd));
  await pj(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })), 0`); await sleep(400);
  const back = await pj(`(() => { const v = document.querySelector('.ofApp'); return { on: v.classList.contains('dcReading'), edit: document.querySelector('.dcPage').isContentEditable, fs: !!document.fullscreenElement }; })()`);
  if (back.on || !back.edit || back.fs) throw new Error('sortie de la lecture : ' + JSON.stringify(back));
  // les commentaires (ajout, panneau, export sans eux, résolu) et les versions (gardée, restaurée)
  const cm = await pj(`(async () => { try {
    const v = document.querySelector('.ofApp'), D = v.__dc || v.closest('[data-plugin]')?.__dc || document.querySelector('.ofApp').parentNode.__dc, p = document.querySelector('.dcPage');
    const t = p.querySelector('h2').firstChild, r = document.createRange(); r.setStart(t, 0); r.setEnd(t, 5); getSelection().removeAllRanges(); getSelection().addRange(r);
    await D.comment('À revoir'); const c = p.querySelector('.dcCmt'); if (!c || c.textContent !== 'Suite' || c.dataset.note !== 'À revoir') return {err: 'commentaire : ' + p.innerHTML.slice(-200)};
    const panel = document.querySelector('.dcOutline'); if (!panel.classList.contains('on') || !panel.textContent.includes('À revoir')) return {err: 'panneau des commentaires'};
    await new Promise(r => setTimeout(r, 700)); const vs = await D.versions(); await D.snap(true);
    const id = Object.keys(vs).find(k => vs[k][0]?.html.includes('dcCmt')); if (!id) return {err: 'version avec le commentaire non gardée'}; const n0 = vs[id].length;
    p.innerHTML = '<p>Tout effacé</p>'; p.dispatchEvent(new Event('input')); await D.snap(true); if (vs[id].length !== n0 + 1) return {err: 'version forcée : ' + vs[id].length};
    D.panel('vers'); await new Promise(r => setTimeout(r, 200)); const b = [...panel.querySelectorAll('button')].filter(x => x.textContent === 'RESTAURER');
    p.innerHTML = vs[id][1].html; p.dispatchEvent(new Event('input')); if (!p.querySelector('.dcCmt')) return {err: 'restaurer : ' + p.innerHTML.slice(0, 100)};
    const res = [...document.querySelectorAll('.dcOutline button')]; D.panel('notes'); await new Promise(r => setTimeout(r, 100));
    [...panel.querySelectorAll('button')].find(x => x.textContent === 'RÉSOLU').click(); if (p.querySelector('.dcCmt') || !p.textContent.includes('Suite')) return {err: 'résolu'};
    return {versions: vs[id].length, boutons: b.length};
  } catch (e) { return {err: e.message}; } })()`);
  if (cm.err) throw new Error(cm.err);
  await pj(`document.querySelector('.ofApp').__dc?.panel('vers'), 0`); await sleep(300);
  return 'commentaires ok, ' + cm.versions + ' versions (' + cm.boutons + ' à restaurer) · page ajustée (zoom ' + fit.z + '), lecture plein écran à ' + rd.w + ' px (zoom ' + rd.z + '), Échap ok';
};
