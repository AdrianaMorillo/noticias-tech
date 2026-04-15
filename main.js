const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&category=technology,science&language=es`;

let newsData = [];

async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.results) {
            newsData = data.results;
            renderNews(newsData);
        }
    } catch (error) {
        console.error("Error al obtener noticias:", error);
    }
}

function renderNews(articles) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';
    const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1504711432869-efd5971ee142?q=80&w=1000&auto=format&fit=crop";

    articles.forEach(article => {
        container.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <img src="${article.image_url || DEFAULT_IMAGE}" class="card-img-top" alt="news" onerror="this.src='${DEFAULT_IMAGE}'">
                    <div class="card-body d-flex flex-column">
                        <span class="text-warning small fw-bold mb-2">
                            <i class="fas fa-microchip me-1"></i> ${article.source_id.toUpperCase()}
                        </span>
                        <h5 class="card-title text-white">${article.title}</h5>
                        <p class="card-text text-secondary small mb-3">
                            <i class="far fa-calendar-alt me-1"></i> ${new Date(article.pubDate).toLocaleDateString()}
                        </p>
                        <a href="${article.link}" target="_blank" class="btn btn-outline-warning btn-sm mt-auto">
                            Ver Fuente Original <i class="fas fa-external-link-alt ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>`;
    });
}

function downloadTop10() {
    const top10 = newsData.slice(0, 10);
    let content = "REPORTE TÉCNICO: TOP 10 AVANCES EN TECNOLOGÍA Y CIENCIA\n";
    content += "==============================================================\n\n";

    top10.forEach((item, index) => {
        // 1. Limpiamos la descripción de cualquier mensaje de pago
        let realDescription = item.description || "No hay descripción adicional disponible para esta noticia.";
        realDescription = realDescription.replace(/SOLO DISPONIBLE EN PLANES DE PAGO/g, "").trim();
        
        // 2. Construimos el Párrafo 1 (CONTEXTO REAL)
        // Usamos datos específicos de la noticia para que no se repita el texto
        const p1Contexto = `CONTEXTO: Esta información ha sido publicada por ${item.source_id.toUpperCase()} y se centra en: "${item.title}". El reporte se sitúa dentro de la categoría de ${item.category[0].toUpperCase()}, analizando un acontecimiento ocurrido el ${new Date(item.pubDate).toLocaleDateString()}.`;

        // 3. Construimos el Párrafo 2 (RESUMEN REAL)
        // Tomamos el resumen que viene de la API, asegurándonos de que sea útil
        const p2Resumen = `RESUMEN: ${realDescription}`;

        // 4. Estructura del bloque
        content += `${index + 1}. ${item.title.toUpperCase()}\n`;
        content += `--------------------------------------------------------------\n`;
        content += `${p1Contexto}\n\n`;
        content += `${p2Resumen}\n\n`;
        content += `🔗 ENLACE DIRECTO: ${item.link}\n`;
        content += `\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Top10_TechScience_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('downloadBtn').addEventListener('click', downloadTop10);
fetchNews();