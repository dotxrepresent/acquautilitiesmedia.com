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
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('button[type="submit"]');
    btn.disabled=true;btn.textContent='Sending…';
    try{
      const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      if(res.ok){form.style.display='none';succ.style.display='block'}
      else{btn.disabled=false;btn.textContent='Send Enquiry →';alert('Something went wrong. Please email acquautilitiesmedia@outlook.com')}
    }catch{btn.disabled=false;btn.textContent='Send Enquiry →';alert('Something went wrong. Please email acquautilitiesmedia@outlook.com')}
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
