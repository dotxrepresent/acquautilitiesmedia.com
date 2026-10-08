// MOBILE NAV
(function(){
  const btn=document.getElementById('hamburger'),nav=document.getElementById('mobNav'),cl=document.getElementById('mobClose');
  btn.addEventListener('click',()=>{nav.classList.add('open');document.body.style.overflow='hidden'});
  cl.addEventListener('click',()=>{nav.classList.remove('open');document.body.style.overflow=''});
  nav.querySelectorAll('.mob-item').forEach(el=>el.addEventListener('click',()=>{nav.classList.remove('open');document.body.style.overflow=''}));
})();

// FADE IN
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');obs.unobserve(e.target)}})
  },{threshold:0.08});
  document.querySelectorAll('.fi').forEach(el=>obs.observe(el));
})();

// CONTACT FORM
(function(){
  const form=document.getElementById('cForm'),succ=document.getElementById('fSuccess');
  if(!form)return;
  const started=Date.now();
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('button[type="submit"]');
    /* bot protection: hidden honeypot field and a minimum time on page */
    const hp=form.querySelector('input[name="_gotcha"]');
    if((hp&&hp.value)||Date.now()-started<3000){form.style.display='none';succ.style.display='block';return}
    btn.disabled=true;btn.textContent='Sending…';
    try{
      const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      if(res.ok){form.style.display='none';succ.style.display='block'}
      else{btn.disabled=false;btn.textContent='Send Enquiry →';alert('Something went wrong. Please email acquautilities@sthelier.onmicrosoft.com')}
    }catch{btn.disabled=false;btn.textContent='Send Enquiry →';alert('Something went wrong. Please email acquautilities@sthelier.onmicrosoft.com')}
  });
})();

// ENQUIRY PRESELECT
(function(){
  const sel=document.querySelector('#cForm select[name="type"]');
  if(!sel)return;
  document.querySelectorAll('[data-enquiry]').forEach(el=>el.addEventListener('click',()=>{sel.value=el.dataset.enquiry}));
})();

// PRIVACY MODAL
(function(){
  const lnk=document.getElementById('privLink'),mod=document.getElementById('privModal'),cl=document.getElementById('privClose');
  lnk.addEventListener('click',e=>{e.preventDefault();mod.style.display='block';document.body.style.overflow='hidden'});
  cl.addEventListener('click',()=>{mod.style.display='none';document.body.style.overflow=''});
  mod.addEventListener('click',e=>{if(e.target===mod){mod.style.display='none';document.body.style.overflow=''}});
})();

// ENQUIRY PRESELECT FROM URL (?enquiry=m365 etc.)
(function(){
  const sel=document.querySelector('#cForm select[name="type"]');
  if(!sel)return;
  const q=new URLSearchParams(location.search).get('enquiry');
  if(q&&[...sel.options].some(o=>o.value===q))sel.value=q;
})();

// FLOW LINES (subtle animated background, drawn in code)
(function(){
  const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('canvas.flow').forEach(cv=>{
    const ctx=cv.getContext('2d');if(!ctx)return;
    const lines=+(cv.dataset.lines||7), alpha=+(cv.dataset.alpha||0.14);
    let w=0,h=0,t=Math.random()*1000,run=false,raf=0;
    const seeds=[...Array(lines)].map((_,i)=>({o:i/lines,a:18+Math.random()*28,f:.0016+Math.random()*.0018,s:.00025+Math.random()*.00035,p:Math.random()*6.28}));
    function size(){const r=cv.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);w=r.width;h=r.height;cv.width=w*d;cv.height=h*d;ctx.setTransform(d,0,0,d,0,0)}
    function draw(){
      ctx.clearRect(0,0,w,h);
      seeds.forEach((l,i)=>{
        const y0=h*(.12+.76*l.o);
        const g=ctx.createLinearGradient(0,0,w,0);
        g.addColorStop(0,'rgba(127,195,224,0)');g.addColorStop(.35,`rgba(127,195,224,${alpha})`);g.addColorStop(.7,`rgba(255,255,255,${alpha*.8})`);g.addColorStop(1,'rgba(127,195,224,0)');
        ctx.strokeStyle=g;ctx.lineWidth=1;ctx.beginPath();
        for(let x=0;x<=w;x+=8){const y=y0+Math.sin(x*l.f+t*l.s*60+l.p)*l.a+Math.sin(x*l.f*2.3+t*l.s*35)*l.a*.35;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}
        ctx.stroke();
      });
    }
    function loop(){t+=1;draw();if(run)raf=requestAnimationFrame(loop)}
    size();draw();
    window.addEventListener('resize',()=>{size();draw()});
    if(reduce)return;
    new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!run){run=true;loop()}else if(!e.isIntersecting){run=false;cancelAnimationFrame(raf)}})).observe(cv);
  });
})();

// PRIVACY LINK INSIDE THE FORM
(function(){
  const mod=document.getElementById('privModal');
  document.querySelectorAll('[data-open-privacy]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(mod){mod.style.display='block';document.body.style.overflow='hidden'}}));
})();

/* ===== SHARED KIT: reCAPTCHA and cookie notice ===== */
(function(){
  var SITE_KEY='6Lfe2uUtAAAAANqd8pV9O2XDxK7TEW1LigMhl99Z';
  var forms=[].slice.call(document.querySelectorAll('form[action*="formspree.io"]'));

  /* add honeypot, reCAPTCHA box and notice to every enquiry form */
  forms.forEach(function(f){
    if(!f.querySelector('input[name="_gotcha"]')){
      var hp=document.createElement('div');hp.className='kit-hp';hp.setAttribute('aria-hidden','true');
      hp.innerHTML='<label>Leave this field empty <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>';
      f.appendChild(hp);
    }
    var btn=f.querySelector('button[type="submit"],input[type="submit"]');
    var anchor=btn;while(anchor&&anchor.parentNode!==f)anchor=anchor.parentNode;
    var wrap=document.createElement('div');wrap.className='rc-wrap';
    wrap.innerHTML='<div class="rc-widget"></div><p class="rc-msg" role="alert">Please tick the box to confirm you are not a robot.</p>'+
      '<p class="rc-note">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>';
    if(anchor)f.insertBefore(wrap,anchor);else f.appendChild(wrap);
    f._rcWrap=wrap;
  });

  window.kitRecaptchaReady=function(){
    forms.forEach(function(f){
      try{f._rcId=grecaptcha.render(f._rcWrap.querySelector('.rc-widget'),{sitekey:SITE_KEY,callback:function(){f._rcWrap.querySelector('.rc-msg').classList.remove('show')}})}catch(err){}
    });
  };
  if(forms.length){
    var s=document.createElement('script');
    s.src='https://www.google.com/recaptcha/api.js?onload=kitRecaptchaReady&render=explicit';
    s.async=true;s.defer=true;document.head.appendChild(s);
  }

  /* runs before each form's own send script */
  document.addEventListener('submit',function(e){
    var f=e.target;if(forms.indexOf(f)<0)return;
    var hp=f.querySelector('input[name="_gotcha"]');
    if(hp&&hp.value){e.preventDefault();e.stopImmediatePropagation();return}
    var ok=window.grecaptcha&&f._rcId!==undefined&&grecaptcha.getResponse(f._rcId);
    if(!ok){
      e.preventDefault();e.stopImmediatePropagation();
      f._rcWrap.querySelector('.rc-msg').classList.add('show');
      f._rcWrap.scrollIntoView({block:'center',behavior:'smooth'});
      return;
    }
    /* tokens are single use: refresh the box if the form is still showing afterwards */
    setTimeout(function(){if(f.offsetParent!==null){try{grecaptcha.reset(f._rcId)}catch(err){}}},6000);
  },true);

  /* cookie notice */
  var KEY='cookie-notice-ok',seen=false;
  try{seen=localStorage.getItem(KEY)==='1'}catch(err){}
  if(seen)return;
  var bar=document.createElement('div');bar.className='ck-bar';bar.setAttribute('role','region');bar.setAttribute('aria-label','Cookie notice');
  bar.innerHTML='<p>We only use essential cookies, including Google reCAPTCHA to protect our forms from spam. We do not use analytics, tracking or advertising cookies. <a href="#" class="ck-priv">Privacy and cookies</a></p><button type="button">OK</button>';
  document.body.appendChild(bar);
  requestAnimationFrame(function(){requestAnimationFrame(function(){bar.classList.add('show')})});
  bar.querySelector('.ck-priv').addEventListener('click',function(e){e.preventDefault();var l=document.getElementById('privLink');if(l)l.click();});
  bar.querySelector('button').addEventListener('click',function(){
    try{localStorage.setItem(KEY,'1')}catch(err){}
    bar.classList.remove('show');setTimeout(function(){bar.remove()},500);
  });
})();
