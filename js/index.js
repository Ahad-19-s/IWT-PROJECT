// Mobile menu
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menuToggle');
if(menuToggle){
  menuToggle.addEventListener('click', ()=> menu.classList.toggle('open'));
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

function makeCard(p){
  const el = document.createElement('div');
  el.className = 'product';
  el.innerHTML = `
    <img class="pimg" src="${p.img}" alt="${p.title}"/>
    <div class="pbody">
      <div class="ptitle">${p.title}</div>
      <div class="price">${p.price}</div>
    </div>
    <div class="pactions">
      <button class="add" data-title="${p.title}">Add to cart</button>
    </div>
  `;
  return el;
}

function renderGrid(id, items){
  const grid = document.getElementById(id);
  items.forEach(p => grid.appendChild(makeCard(p)));
  grid.addEventListener('click', (e)=>{
    if(e.target.matches('.add')){
      const title = e.target.getAttribute('data-title');
      alert(`${title} added to cart (demo)`);
    }
  });
}

renderGrid('trending-grid', products.slice(0,8));
renderGrid('popular-grid', products.slice(0,8));

// Testimonials simple carousel auto-advance
const carousel = document.getElementById('carousel');
const dots = document.getElementById('dots');
if(carousel && dots){
  const cards = Array.from(carousel.children);
  cards.forEach((_,i)=>{
    const d = document.createElement('div');
    d.className = 'dot' + (i===0?' active':'');
    d.addEventListener('click', ()=> goTo(i));
    dots.appendChild(d);
  });
  let idx = 0;
  function goTo(i){
    idx = i;
    const cardWidth = cards[0].getBoundingClientRect().width + 22;
    carousel.scrollTo({left: i * cardWidth, behavior:'smooth'});
    dots.querySelectorAll('.dot').forEach((dot,j)=>dot.classList.toggle('active', j===i));
  }
  setInterval(()=> goTo((idx+1) % cards.length), 4000);
}