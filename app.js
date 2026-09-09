let data = {
  brand: SITE_CONFIG.BRAND_NAME,
  tagline: SITE_CONFIG.TAGLINE,
  logo: SITE_CONFIG.LOGO,
  phone: SITE_CONFIG.PHONE,
  email: SITE_CONFIG.EMAIL,
  address: SITE_CONFIG.ADDRESS,
  heroTitle: SITE_CONFIG.HERO_TITLE,
  heroText: SITE_CONFIG.HERO_TEXT,
  foodpanda: SITE_CONFIG.FOODPANDA_LINK,
  pathao: SITE_CONFIG.PATHAO_LINK,
  categories: SITE_CONFIG.CATEGORIES,
  products: SITE_CONFIG.PRODUCTS.map((p, i) => ({id:i+1, ...p}))
};

let cart = [];
let activeCategory = "সব";

const $ = s => document.querySelector(s);
const money = n => `৳${Number(n).toLocaleString("en-US")}`;

function render(){
  document.title = `${data.brand} — ${data.tagline}`;
  $("#navLogo").src=data.logo;
  $("#navLogo").alt=data.brand;
  document.querySelectorAll(".footer-logo").forEach(x=>x.src=data.logo);
  $("#footerBrand").textContent=data.brand;
  $("#heroTitle").innerHTML=data.heroTitle;
  $("#heroText").textContent=data.heroText;
  $("#phoneLink").textContent="📞 "+data.phone;
  $("#phoneLink").href="tel:"+data.phone.replace(/\s/g,"");
  $("#emailLink").textContent="✉️ "+data.email;
  $("#emailLink").href="mailto:"+data.email;
  $("#addressText").textContent="📍 "+data.address;
  $("#year").textContent=new Date().getFullYear();
  renderCategories();
  renderProducts();
  renderCart();
}

function renderCategories(){
  $("#categoryTabs").innerHTML=data.categories.map(c=>
    `<button class="${c===activeCategory?'active':''}" data-cat="${c}">${c}</button>`
  ).join("");

  document.querySelectorAll("[data-cat]").forEach(b=>{
    b.onclick=()=>{
      activeCategory=b.dataset.cat;
      renderCategories();
      renderProducts();
    };
  });
}

function renderProducts(){
  const items=activeCategory==="সব"
    ? data.products
    : data.products.filter(p=>p.category===activeCategory);

  $("#foodGrid").innerHTML=items.map(p=>{
    const unavailable=p.available===false;
    const offer=p.offerPrice && Number(p.offerPrice)>0 && Number(p.offerPrice)<Number(p.price);
    return `<article class="food-card">
      <div style="position:relative">
        <img class="food-img" src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge?`<span style="position:absolute;top:12px;left:12px;background:#f4ad18;color:#111;padding:5px 10px;border-radius:18px;font-weight:800;font-size:12px">${p.badge}</span>`:""}
      </div>
      <div class="food-body">
        <h3>${p.name}</h3>
        <p>${p.description||""}</p>
        <div class="food-bottom">
          <span class="price">${offer?`<del style="color:#999;font-size:13px">${money(p.price)}</del> ${money(p.offerPrice)}`:money(p.price)}</span>
          <button class="add-btn" ${unavailable?"disabled":""} onclick="addToCart(${p.id})">${unavailable?"Unavailable":"কার্টে যোগ"}</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

function addToCart(id){
  const item=data.products.find(p=>p.id===id);
  if(!item || item.available===false) return;
  const found=cart.find(x=>x.id===id);
  found ? found.qty++ : cart.push({id,qty:1});
  renderCart();
  openCart();
}

function renderCart(){
  $("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);

  if(!cart.length){
    $("#cartItems").innerHTML='<div class="empty">আপনার কার্ট এখনো খালি।</div>';
  } else {
    $("#cartItems").innerHTML=cart.map(c=>{
      const x=data.products.find(p=>p.id===c.id);
      const unit=(x.offerPrice && x.offerPrice<x.price)?x.offerPrice:x.price;
      return `<div class="cart-row">
        <img src="${x.image}" alt="">
        <div>
          <strong>${x.name}</strong>
          <div class="qty">
            <button onclick="changeQty(${x.id},-1)">−</button>
            <span>${c.qty}</span>
            <button onclick="changeQty(${x.id},1)">+</button>
          </div>
        </div>
        <strong>${money(unit*c.qty)}</strong>
      </div>`;
    }).join("");
  }

  const total=cart.reduce((s,c)=>{
    const x=data.products.find(p=>p.id===c.id);
    const unit=(x.offerPrice && x.offerPrice<x.price)?x.offerPrice:x.price;
    return s+unit*c.qty;
  },0);

  $("#cartTotal").textContent=money(total);
  const checkoutTotal = total + Number(SITE_CONFIG.DELIVERY_CHARGE || 0);
  $("#checkoutTotal").textContent=money(checkoutTotal);
}

function changeQty(id,d){
  const x=cart.find(c=>c.id===id);
  if(!x)return;
  x.qty+=d;
  if(x.qty<=0)cart=cart.filter(c=>c.id!==id);
  renderCart();
}

function openCart(){$("#cartDrawer").classList.add("open")}
function closeCart(){$("#cartDrawer").classList.remove("open")}

function openCheckout(){
  if(!cart.length){ alert("প্রথমে খাবার কার্টে যোগ করুন।"); return; }
  const total=cart.reduce((s,c)=>{
    const x=data.products.find(p=>p.id===c.id);
    const unit=(x.offerPrice && Number(x.offerPrice)<Number(x.price))?Number(x.offerPrice):Number(x.price);
    return s+unit*c.qty;
  },0)+Number(SITE_CONFIG.DELIVERY_CHARGE || 0);
  $("#checkoutTotal").textContent=money(total);
  $("#checkoutModal").classList.add("open");
  $("#checkoutModal").setAttribute("aria-hidden","false");
}
function closeCheckout(){ $("#checkoutModal").classList.remove("open"); $("#checkoutModal").setAttribute("aria-hidden","true"); }
function submitOrder(e){
  e.preventDefault();
  if(!cart.length) return;
  const fd=new FormData(e.target);
  const lines=cart.map(c=>{
    const x=data.products.find(p=>p.id===c.id);
    const unit=(x.offerPrice && Number(x.offerPrice)<Number(x.price))?Number(x.offerPrice):Number(x.price);
    return `🍽️ ${x.name} × ${c.qty} = ${money(unit*c.qty)}`;
  });
  const subtotal=cart.reduce((s,c)=>{
    const x=data.products.find(p=>p.id===c.id);
    const unit=(x.offerPrice && Number(x.offerPrice)<Number(x.price))?Number(x.offerPrice):Number(x.price);
    return s+unit*c.qty;
  },0);
  const delivery=Number(SITE_CONFIG.DELIVERY_CHARGE || 0);
  const total=subtotal+delivery;
  const orderNo='ORD-'+Date.now().toString().slice(-6);
  const msg=[
    `🛒 *নতুন অর্ডার*`,
    `অর্ডার: ${orderNo}`,
    '',...lines,'',
    `💰 খাবারের মোট: ${money(subtotal)}`,
    delivery?`🚚 ডেলিভারি: ${money(delivery)}`:'',
    `*সর্বমোট: ${money(total)}*`,
    '',
    `👤 নাম: ${fd.get('name')}`,
    `📱 ফোন: ${fd.get('phone')}`,
    `📍 ঠিকানা: ${fd.get('address')}`,
    fd.get('note')?`📝 নোট: ${fd.get('note')}`:'',
    '',
    'দয়া করে অর্ডারটি Confirm করুন।'
  ].filter(Boolean).join('\n');
  const wa=String(SITE_CONFIG.WHATSAPP || '').replace(/\D/g,'');
  if(!wa){ alert('site-config.js-এ WHATSAPP নম্বর সেট করুন।'); return; }
  const encoded = encodeURIComponent(msg);
  const waLink = `https://wa.me/${wa}?text=${encoded}`;
  const webLink = `https://web.whatsapp.com/send?phone=${wa}&text=${encoded}`;

  // HTTPS wa.me is intentional: on a normal phone browser, WhatsApp installed
  // will usually open the app; otherwise WhatsApp Web can handle the link.
  // Some HTML/WebView preview apps block external app launching, so we also
  // provide a web fallback instead of using the unsupported whatsapp:// scheme.
  const fallback = `
    <div style="padding:18px;text-align:center">
      <h3 style="margin:0 0 10px">WhatsApp খুলতে সমস্যা হচ্ছে?</h3>
      <p style="margin:0 0 16px;color:#666">আপনার preview app যদি WhatsApp খুলতে না পারে, নিচের বাটন ব্যবহার করুন।</p>
      <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-primary full-btn" style="display:block;text-decoration:none;margin-bottom:10px">📱 WhatsApp App / Link</a>
      <a href="${webLink}" target="_blank" rel="noopener" class="btn full-btn" style="display:block;text-decoration:none">🌐 WhatsApp Web</a>
      <button type="button" class="btn full-btn" style="margin-top:10px" onclick="navigator.clipboard?.writeText(${JSON.stringify(msg)}).then(()=>alert('অর্ডার মেসেজ কপি হয়েছে।'))">📋 অর্ডার মেসেজ কপি</button>
    </div>`;

  // Keep the fallback inside the current page for WebView/preview apps.
  let fallbackBox = document.getElementById('waFallback');
  if(!fallbackBox){
    fallbackBox = document.createElement('div');
    fallbackBox.id='waFallback';
    fallbackBox.className='checkout-modal';
    fallbackBox.setAttribute('aria-hidden','true');
    fallbackBox.innerHTML='<div class="checkout-backdrop" onclick="document.getElementById(\'waFallback\').classList.remove(\'open\');document.getElementById(\'waFallback\').setAttribute(\'aria-hidden\',\'true\')"></div><div class="checkout-card"><div class="checkout-head"><h3>WhatsApp Order</h3><button type="button" onclick="document.getElementById(\'waFallback\').classList.remove(\'open\');document.getElementById(\'waFallback\').setAttribute(\'aria-hidden\',\'true\')">×</button></div><div id="waFallbackContent"></div></div>';
    document.body.appendChild(fallbackBox);
  }
  document.getElementById('waFallbackContent').innerHTML=fallback;

  // First try the standard HTTPS WhatsApp URL.
  const popup = window.open(waLink, '_blank');
  closeCheckout();
  // If the host preview/WebView blocks external navigation, keep a visible fallback.
  setTimeout(()=>{
    if(document.visibilityState !== 'hidden'){
      fallbackBox.classList.add('open');
      fallbackBox.setAttribute('aria-hidden','false');
    }
  }, 1200);
}

$("#openCart").onclick=openCart;
$("#closeCart").onclick=closeCart;
$("#closeCartBtn").onclick=closeCart;
$("#checkoutBtn").onclick=openCheckout;
$("#closeCheckout").onclick=closeCheckout;
$("#closeCheckoutBtn").onclick=closeCheckout;
$("#checkoutForm").onsubmit=submitOrder;
$("#menuToggle").onclick=()=>$("#mobileNav").classList.toggle("open");
document.querySelectorAll("#mobileNav a").forEach(a=>a.onclick=()=>$("#mobileNav").classList.remove("open"));

render();
