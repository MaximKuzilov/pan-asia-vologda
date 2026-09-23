const menu=[
 {n:'Кимчи рамён',c:'ramen',p:430,w:'520 г',t:'острое',d:'Насыщенный бульон, лапша, кимчи, яйцо и зелёный лук.'},
 {n:'Сырный рамён',c:'ramen',p:420,w:'500 г',t:'хит',d:'Сливочно-сырный бульон, лапша, яйцо и нори.'},
 {n:'Тори рамён',c:'ramen',p:430,w:'510 г',t:'',d:'Куриный бульон, лапша, нежная курица и овощи.'},
 {n:'Токпокки классические',c:'street',p:450,w:'300 г',t:'острое',d:'Рисовые палочки в густом пряно-сладком соусе.'},
 {n:'Токпокки карбонара',c:'street',p:660,w:'330 г',t:'хит',d:'Рисовые палочки в сливочном соусе с сыром.'},
 {n:'Дамплинги с курицей',c:'street',p:270,w:'5 шт',t:'',d:'Сочные корейские пельмени с курицей и овощами.'},
 {n:'Кимпаб с курицей',c:'rice',p:350,w:'260 г',t:'',d:'Рис, нори, курица, овощи и кунжут.'},
 {n:'Кимпаб с лососем',c:'rice',p:560,w:'260 г',t:'',d:'Лосось, рис, нори, овощи и фирменный соус.'},
 {n:'Пибимпаб',c:'rice',p:660,w:'390 г',t:'острое',d:'Рис, овощи, мясо, яйцо и соус кочудян.'},
 {n:'Поке с лососем',c:'rice',p:600,w:'360 г',t:'',d:'Лосось, рис, свежие овощи, эдамаме и соус.'},
 {n:'Падтай с курицей',c:'wok',p:510,w:'360 г',t:'',d:'Рисовая лапша, курица, овощи, арахис и лайм.'},
 {n:'Падтай с морепродуктами',c:'wok',p:600,w:'370 г',t:'',d:'Рисовая лапша с морепродуктами и ростками сои.'},
 {n:'Чикен тери',c:'wok',p:410,w:'340 г',t:'',d:'Курица терияки с рисом и хрустящими овощами.'},
 {n:'Крылья по-корейски',c:'street',p:670,w:'450 г',t:'хит',d:'Хрустящие крылья в пряной глазури с кунжутом.'},
 {n:'Мисо-суп',c:'ramen',p:210,w:'350 мл',t:'веган',d:'Мисо-бульон, тофу, водоросли и зелёный лук.'},
 {n:'Матча-торт',c:'sweet',p:320,w:'150 г',t:'',d:'Нежный блинный торт с кремом матча.'}
];
let cart=JSON.parse(localStorage.getItem('panAsiaCart')||'[]');
const rub=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽';
function save(){localStorage.setItem('panAsiaCart',JSON.stringify(cart));updateDock()}
function add(name){let x=menu.find(i=>i.n===name),r=cart.find(i=>i.n===name);r?r.q++:cart.push({...x,q:1});save();renderCart()}
function remove(name){cart=cart.filter(i=>i.n!==name);save();renderCart()}
function updateDock(){document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=cart.reduce((s,i)=>s+i.q,0))}
function renderMenu(filter='all'){let root=document.querySelector('#menuGrid');if(!root)return;root.innerHTML=menu.filter(i=>filter==='all'||i.c===filter).map(i=>`<article class="menu-card reveal"><div class="meta"><span>${i.w}</span>${i.t?`<span>• ${i.t}</span>`:''}</div><h3>${i.n}</h3><p>${i.d}</p><div class="menu-bottom"><span class="price">от ${rub(i.p)}</span><button class="add" aria-label="Добавить ${i.n}" data-add="${i.n}">+</button></div></article>`).join('');root.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(b.dataset.add));observe()}
function renderCart(){let root=document.querySelector('#cartList');if(!root)return;if(!cart.length){root.innerHTML='<p class="note">Корзина пока пуста. Добавьте блюда на странице меню.</p>'}else root.innerHTML=cart.map(i=>`<div class="cart-row"><span>${i.n} × ${i.q}</span><b>${rub(i.p*i.q)}</b><button data-remove="${i.n}" aria-label="Убрать">×</button></div>`).join('');root.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>remove(b.dataset.remove));let total=cart.reduce((s,i)=>s+i.p*i.q,0);document.querySelector('#cartTotal')?.replaceChildren(document.createTextNode(rub(total)));let hidden=document.querySelector('#orderDetails');if(hidden)hidden.value=cart.map(i=>`${i.n} × ${i.q}`).join(', ')}
function observe(){let io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>io.observe(e))}
document.addEventListener('DOMContentLoaded',()=>{updateDock();renderMenu();renderCart();observe();document.querySelector('.burger')?.addEventListener('click',()=>document.querySelector('.navlinks')?.classList.toggle('open'));document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMenu(b.dataset.filter)});document.querySelector('#orderForm')?.addEventListener('submit',e=>{e.preventDefault();if(!cart.length){alert('Сначала добавьте блюда в корзину.');return}document.querySelector('.success')?.classList.add('show');e.target.querySelector('button[type=submit]').disabled=true});});

