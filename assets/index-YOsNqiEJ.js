(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const p="pub_b889239744154ea3b0e9d9dcf7499c86",u=`https://newsdata.io/api/1/news?apikey=${p}&category=technology,science&language=es`;let i=[];async function f(){try{const o=await(await fetch(u)).json();o.results&&(i=o.results,m(i))}catch(r){console.error("Error al obtener noticias:",r)}}function m(r){const o=document.getElementById("newsContainer");o.innerHTML="";const a="https://images.unsplash.com/photo-1504711432869-efd5971ee142?q=80&w=1000&auto=format&fit=crop";r.forEach(n=>{o.innerHTML+=`
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="${n.image_url||a}" class="card-img-top" alt="news" onerror="this.src='${a}'">
                    <div class="card-body d-flex flex-column">
                        <span class="text-warning small fw-bold mb-2">
                            <i class="fas fa-microchip me-1"></i> ${n.source_id.toUpperCase()}
                        </span>
                        <h5 class="card-title text-white">${n.title}</h5>
                        <p class="card-text text-secondary small mb-3">
                            <i class="far fa-calendar-alt me-1"></i> ${new Date(n.pubDate).toLocaleDateString()}
                        </p>
                        <a href="${n.link}" target="_blank" class="btn btn-outline-warning btn-sm mt-auto">
                            Ver Fuente Original <i class="fas fa-external-link-alt ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>`})}function h(){const r=i.slice(0,10);let o=`REPORTE TÉCNICO: TOP 10 AVANCES EN TECNOLOGÍA Y CIENCIA
`;o+=`==============================================================

`,r.forEach((t,s)=>{let c=t.description||"No hay descripción adicional disponible para esta noticia.";c=c.replace(/SOLO DISPONIBLE EN PLANES DE PAGO/g,"").trim();const l=`CONTEXTO: Esta información ha sido publicada por ${t.source_id.toUpperCase()} y se centra en: "${t.title}". El reporte se sitúa dentro de la categoría de ${t.category[0].toUpperCase()}, analizando un acontecimiento ocurrido el ${new Date(t.pubDate).toLocaleDateString()}.`,d=`RESUMEN: ${c}`;o+=`${s+1}. ${t.title.toUpperCase()}
`,o+=`--------------------------------------------------------------
`,o+=`${l}

`,o+=`${d}

`,o+=`🔗 ENLACE DIRECTO: ${t.link}
`,o+=`

`});const a=new Blob([o],{type:"text/plain;charset=utf-8"}),n=window.URL.createObjectURL(a),e=document.createElement("a");e.href=n,e.download=`Top10_TechScience_${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(e),e.click(),document.body.removeChild(e)}document.getElementById("downloadBtn").addEventListener("click",h);f();
