// ---- shared news (read-only on the public site) ----
// Posts live in Firebase Firestore (collection "posts") so every visitor
// sees the same list, regardless of device or browser.

function renderNews(){
  const grid = document.getElementById('newsGrid');
  const empty = document.getElementById('newsEmpty');
  if(!grid) return;

  if(typeof db === 'undefined'){
    empty.style.display = 'block';
    empty.textContent = 'لم يتم إعداد بيانات Firebase بعد — راجع ملف assets/firebase-config.js';
    return;
  }

  db.collection('posts').orderBy('date','desc').limit(6).get()
    .then(snapshot=>{
      grid.innerHTML = '';
      if(snapshot.empty){
        empty.style.display = 'block';
        empty.textContent = 'لا توجد منشورات حاليًا.';
        return;
      }
      empty.style.display = 'none';
      snapshot.forEach(doc=>{
        const p = doc.data();
        const card = document.createElement('article');
        card.className = 'news-card';
        const d = new Date(p.date);
        const dateStr = isNaN(d) ? p.date : d.toLocaleDateString('ar-LY', {year:'numeric', month:'long', day:'numeric'});
        const thumbHtml = p.photoUrl
          ? `<img src="${p.photoUrl}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;">`
          : 'المعهد العسكري الفني';
        const videoHtml = p.youtubeUrl
          ? `<a href="${p.youtubeUrl}" target="_blank" rel="noopener" class="news-video-link">▶ مشاهدة الفيديو</a>`
          : '';
        card.innerHTML = `
          <div class="thumb">${thumbHtml}</div>
          <div class="body">
            <span class="date mono">${dateStr}</span>
            <h4>${p.title}</h4>
            <p>${p.excerpt || ''}</p>
            ${videoHtml}
          </div>`;
        grid.appendChild(card);
      });
    })
    .catch(err=>{
      empty.style.display = 'block';
      empty.textContent = 'تعذر تحميل الأخبار. تأكد من ربط بيانات Firebase وقواعد الأمان في Firestore.';
      console.error(err);
    });
}

// ---- mobile nav ----
function initNav(){
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');
  if(!burger || !nav) return;
  burger.addEventListener('click', ()=>{
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '72px';
    nav.style.right = '0';
    nav.style.left = '0';
    nav.style.background = '#111217';
    nav.style.padding = '10px 20px 20px';
    nav.style.borderBottom = '2px solid #C9A227';
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initNav();
  renderNews();
  const navDrops = document.querySelectorAll('.nav-drop');
  // keep only one nav dropdown open at a time
  navDrops.forEach(d=>{
    d.addEventListener('toggle', ()=>{
      if(d.open){
        navDrops.forEach(other=>{
          if(other !== d) other.open = false;
        });
      }
    });
    // close this dropdown as soon as one of its links is clicked (navigating to a section)
    d.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>{ d.open = false; });
    });
  });
  // close any open dropdown when clicking anywhere outside it
  document.addEventListener('click', (e)=>{
    navDrops.forEach(d=>{
      if(d.open && !d.contains(e.target)) d.open = false;
    });
  });
});
