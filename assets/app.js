(function () {
  var search = document.getElementById('search');
  var chips = document.getElementById('chips');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.post-card'));
  var empty = document.getElementById('empty');
  if (!search || !chips || !cards.length) return;

  var activeCat = 'all';

  function apply() {
    var q = search.value.trim().toLowerCase();
    var shown = 0;

    cards.forEach(function (card) {
      var cat = card.getAttribute('data-cat') || '';
      var text = card.textContent.toLowerCase();
      var okCat = activeCat === 'all' || cat === activeCat;
      var okText = !q || text.indexOf(q) !== -1;
      var ok = okCat && okText;
      card.hidden = !ok;
      if (ok) shown++;
    });

    if (empty) empty.hidden = shown !== 0;
  }

  chips.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    activeCat = btn.getAttribute('data-cat');
    Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('is-active', c === btn);
    });
    apply();
  });

  search.addEventListener('input', apply);
})();
