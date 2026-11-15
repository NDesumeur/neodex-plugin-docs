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
  return 'page ajustée (zoom ' + fit.z + '), lecture plein écran à ' + rd.w + ' px (zoom ' + rd.z + '), Échap ok';
};
