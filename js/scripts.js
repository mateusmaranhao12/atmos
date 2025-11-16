//redirecionar para agencia
function getAgencia() {
    window.open('https://www.agenciaaffinity.com.br/')
}

//links
function getFacebook() {
    window.open('https://www.facebook.com/profile.php?id=61582192472678#')
}

function getWhatsApp() {
    window.open('http://wa.link/yuhkfs')
}

function getInstagram() {
    window.open('https://www.instagram.com/atmosmarioguimaraes/')
}

function getYoutube() {
    window.open('')
}

//Carrossels

//Carrossel lazer
// IMAGEM PRINCIPAL DO CARROSSEL
const mainImgLazer = document.getElementById('carousel-main-img')

// MINIATURAS
const thumbs = document.querySelectorAll('.carousel-thumbs .thumb')

// MODAL
const lazerModal = document.getElementById('lazer-modal')
const lazerModalImg = document.getElementById('lazer-modal-img')
const lazerModalClose = document.querySelector('.lazer-modal-close')

// SETAS INTERNAS DO MODAL
const modalArrowLeft = document.querySelector('.modal-arrow-left')
const modalArrowRight = document.querySelector('.modal-arrow-right')

// SETAS DO CARROSSEL
const rightBtn = document.querySelector('.right-btn')
const leftBtn = document.querySelector('.left-btn')

let index = 0

// Se alguma thumb já estiver active, define o index inicial
thumbs.forEach((thumb, i) => {
    if (thumb.classList.contains('active')) {
        index = i
    }
})

// FUNÇÃO PRINCIPAL — ATUALIZA TUDO COM UMA ÚNICA IMAGEM
function updateMainImage(i) {
    index = (i + thumbs.length) % thumbs.length

    const imgSrc = thumbs[index].src

    // troca suave na imagem principal
    mainImgLazer.style.opacity = 0
    setTimeout(() => {
        mainImgLazer.src = imgSrc
        mainImgLazer.style.opacity = 1
    }, 200)

    // troca no modal também
    lazerModalImg.src = imgSrc

    // atualiza as active das miniaturas
    thumbs.forEach(t => t.classList.remove('active'))
    thumbs[index].classList.add('active')
}
// MODAL
function openLazerModal() {
    lazerModalImg.src = mainImgLazer.src
    lazerModal.classList.add('open')
    document.body.classList.add('modal-open') // trava scroll
}

function closeLazerModal() {
    lazerModal.classList.remove('open')
    document.body.classList.remove('modal-open') // destrava scroll
}

// abrir modal ao clicar na imagem principal
if (mainImgLazer) {
    mainImgLazer.addEventListener('click', openLazerModal)
}

// fechar modal (botão X)
if (lazerModalClose) {
    lazerModalClose.addEventListener('click', closeLazerModal)
}

// fechar clicando fora da imagem
lazerModal.addEventListener('click', (e) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    if (e.target.closest('.modal-arrow') || e.target.closest('.lazer-modal-close')) {
        return
    }

    if (isMobile) {
        closeLazerModal()
    } else {
        if (e.target === lazerModal) {
            closeLazerModal()
        }
    }
})


// fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLazerModal()
})

// SETAS DENTRO DO MODAL
if (modalArrowRight) {
    modalArrowRight.addEventListener('click', (e) => {
        e.stopPropagation()
        updateMainImage(index + 1)
    })
}

if (modalArrowLeft) {
    modalArrowLeft.addEventListener('click', (e) => {
        e.stopPropagation()
        updateMainImage(index - 1)
    })
}

// MINIATURAS DO CARROSSEL
thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateMainImage(i))
})

// SETAS DO CARROSSEL PRINCIPAL
if (rightBtn) {
    rightBtn.addEventListener('click', () => {
        updateMainImage(index + 1)
    })
}

if (leftBtn) {
    leftBtn.addEventListener('click', () => {
        updateMainImage(index - 1)
    })
}

//ampliar imagem planta
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.plantas-img-wrapper')
    const img = document.querySelector('.plantas-img')
    const zoomBtn = document.querySelector('.plantas-ampliar-btn')

    let isZoomed = false
    let isDragging = false
    let startX = 0
    let startY = 0
    let currentX = 0
    let currentY = 0

    /* --- ATIVAR / DESATIVAR ZOOM --- */
    zoomBtn.addEventListener('click', () => {
        isZoomed = !isZoomed
        img.classList.toggle('zoomed', isZoomed)
        zoomBtn.classList.toggle('zoom-active', isZoomed)

        if (!isZoomed) {
            // Reset posição ao desampliar
            currentX = 0
            currentY = 0
            img.style.transform = 'scale(1)'
        }
    })

    /* --- ARRASTAR QUANDO ESTÁ EM ZOOM --- */
    function startDrag(e) {
        if (!isZoomed) return
        isDragging = true
        wrapper.classList.add('dragging')

        startX = e.clientX || e.touches[0].clientX
        startY = e.clientY || e.touches[0].clientY
    }

    function onDrag(e) {
        if (!isDragging || !isZoomed) return

        const x = e.clientX || e.touches[0].clientX
        const y = e.clientY || e.touches[0].clientY

        const dx = x - startX
        const dy = y - startY

        startX = x
        startY = y

        currentX += dx
        currentY += dy

        img.style.transform = `scale(2.3) translate(${currentX}px, ${currentY}px)`
    }

    function stopDrag() {
        isDragging = false
        wrapper.classList.remove('dragging')
    }

    /* Eventos mouse */
    wrapper.addEventListener('mousedown', startDrag)
    wrapper.addEventListener('mousemove', onDrag)
    wrapper.addEventListener('mouseup', stopDrag)
    wrapper.addEventListener('mouseleave', stopDrag)

    /* Eventos toque (mobile) */
    wrapper.addEventListener('touchstart', startDrag)
    wrapper.addEventListener('touchmove', onDrag)
    wrapper.addEventListener('touchend', stopDrag)
})

//carrossel plantas
// CARROSSEL + MODAL PLANTAS
document.addEventListener('DOMContentLoaded', () => {
    // Dados do carrossel
    const plantasData = {
        cobertura: [
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_101.png',
                legenda: 'PAVIMENTO COBERTURA 101 | 44,50 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_102.png',
                legenda: 'PAVIMENTO COBERTURA 102 | 44,50 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_103.png',
                legenda: 'PAVIMENTO COBERTURA 103 | 43,94 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_104.png',
                legenda: 'PAVIMENTO COBERTURA 104 | 43,55 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_105.png',
                legenda: 'PAVIMENTO COBERTURA 105 | 41,53 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_106.png',
                legenda: 'PAVIMENTO COBERTURA 106 | 42,13 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_107.png',
                legenda: 'PAVIMENTO COBERTURA 107 | 36,85 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_108.png',
                legenda: 'PAVIMENTO COBERTURA 108 | 40,48 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_109.png',
                legenda: 'PAVIMENTO COBERTURA 109 | 43,94 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_110.png',
                legenda: 'PAVIMENTO COBERTURA 110 | 43,19 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_111.png',
                legenda: 'PAVIMENTO COBERTURA 111 | 43,80 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_COBERTURA_AP_112.png',
                legenda: 'PAVIMENTO COBERTURA 112 | 42,28 m²'
            }
        ],

        // tipo
        tipo: [
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_01.png',
                legenda: 'APARTAMENTO TIPO COLUNA 1 | 44,56 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_02,14.png',
                legenda: 'APARTAMENTO TIPO COLUNA 2 | 44,56 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_04.png',
                legenda: 'APARTAMENTO TIPO COLUNA 4 | 43,94 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_07.png',
                legenda: 'APARTAMENTO TIPO COLUNA 7 | 36,55 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_06,10.png',
                legenda: 'APARTAMENTO TIPO COLUNA 6, 8 e 10 | 20,77 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_05_OP1.png',
                legenda: 'APARTAMENTO TIPO COLUNA 5 OP1 | 64,23 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_05_OP2.png',
                legenda: 'APARTAMENTO TIPO COLUNA 5 OP2 | 64,23 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_05_OP3.png',
                legenda: 'APARTAMENTO TIPO COLUNA 5 OP3 | 64,23 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA12.png',
                legenda: 'APARTAMENTO TIPO COLUNA 12 | 19,71 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_14_P.N.E..png',
                legenda: 'APARTAMENTO TIPO COLUNA 14 (1º ao 10º pav) | 43,94 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA14_6AO18.png',
                legenda: 'APARTAMENTO TIPO COLUNA 14 (11º ao 18º pav) | 43,94 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_03,09.png',
                legenda: 'APARTAMENTO TIPO COLUNA 3 E 9 | 20,85 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_11.png',
                legenda: 'APARTAMENTO TIPO COLUNA 11 | 21,80 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_13.png',
                legenda: 'APARTAMENTO TIPO COLUNA 13 | 21,24 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_15.png',
                legenda: 'APARTAMENTO TIPO COLUNA 15 | 21,04 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_16_OP1.png',
                legenda: 'APARTAMENTO TIPO COLUNA 16 OP1 | 21,24 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_16_OP2.png',
                legenda: 'APARTAMENTO TIPO COLUNA 16 OP2 | 21,24 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_16_OP3.png',
                legenda: 'APARTAMENTO TIPO COLUNA 16 OP3 | 21,24 m²'
            },
            {
                src: './imgs/PLANTAS/ATMOS_PAV_TIPO_COLUNA_17.png',
                legenda: 'APARTAMENTO TIPO COLUNA 17 | 21,90 m²'
            },

        ]
    }

    //elementos na tela
    const imgWrapper = document.querySelector('.plantas-img-wrapper')
    const img = document.querySelector('.plantas-img')
    const legendaSpan = document.querySelector('.plantas-legenda')
    const tabs = document.querySelectorAll('.plantas-tab')
    const zoomBtn = document.querySelector('.plantas-ampliar-btn')
    const paginationContainer = document.querySelector('.plantas-pagination')

    // MODAL
    const plantasModal = document.getElementById('plantas-modal')
    const plantasModalImg = document.getElementById('plantas-modal-img')
    const plantasModalClose = document.querySelector('.plantas-modal-close')
    const plantasModalArrowLeft = document.querySelector('.plantas-modal-arrow-left')
    const plantasModalArrowRight = document.querySelector('.plantas-modal-arrow-right')

    if (!img || !legendaSpan || !paginationContainer || !plantasModal || !plantasModalImg) return

    let paginas = []
    let currentTab = 'cobertura'
    let currentIndex = 0

    // --------- PAGINAÇÃO DINÂMICA ---------
    function criarPaginacao() {
        const total = plantasData[currentTab].length
        paginationContainer.innerHTML = ''
        paginas = []

        for (let i = 0; i < total; i++) {
            const span = document.createElement('span')
            span.classList.add('plantas-page')
            span.textContent = (i + 1).toString().padStart(2, '0')

            span.addEventListener('click', () => {
                currentIndex = i
                renderPlanta()
            })

            paginationContainer.appendChild(span)
            paginas.push(span)
        }
    }

    // --------- RENDERIZAR PLANTA ---------
    function renderPlanta() {
        const data = plantasData[currentTab][currentIndex]
        if (!data) return

        img.src = data.src
        legendaSpan.textContent = data.legenda

        // atualiza imagem do modal também (se ele já estiver aberto)
        plantasModalImg.src = data.src

        paginas.forEach((page, i) => {
            page.classList.toggle('active', i === currentIndex)
        })
    }

    // --------- MODAL PLANTAS ---------
    function openPlantasModal() {
        plantasModalImg.src = img.src
        plantasModal.classList.add('open')
        document.body.classList.add('modal-open')
    }

    function closePlantasModal() {
        plantasModal.classList.remove('open')
        document.body.classList.remove('modal-open')
    }

    // abrir modal ao clicar no botão "ampliar" OU na própria imagem
    if (zoomBtn) {
        zoomBtn.addEventListener('click', openPlantasModal)
    }

    if (imgWrapper) {
        imgWrapper.addEventListener('click', openPlantasModal)
    }

    // fechar no X
    if (plantasModalClose) {
        plantasModalClose.addEventListener('click', closePlantasModal)
    }

    // fechar clicando no fundo (comportamento mobile x desktop)
    plantasModal.addEventListener('click', (e) => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches
        const target = e.target

        if (!(target instanceof HTMLElement)) return

        // clicou nas setas ou no X → outro handler cuida
        if (target.closest('.plantas-modal-arrow') || target.closest('.plantas-modal-close')) {
            return
        }

        if (isMobile) {
            closePlantasModal()
        } else {
            if (target === plantasModal) {
                closePlantasModal()
            }
        }
    })

    // fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePlantasModal()
        }
    })

    //NAVEGAÇÃO NO MODAL (SETAS)
    function nextPlanta() {
        const total = plantasData[currentTab].length
        if (!total) return

        currentIndex = (currentIndex + 1) % total
        renderPlanta()
    }

    function prevPlanta() {
        const total = plantasData[currentTab].length
        if (!total) return

        currentIndex = (currentIndex - 1 + total) % total
        renderPlanta()
    }

    if (plantasModalArrowRight) {
        plantasModalArrowRight.addEventListener('click', (e) => {
            e.stopPropagation()
            nextPlanta()
        })
    }

    if (plantasModalArrowLeft) {
        plantasModalArrowLeft.addEventListener('click', (e) => {
            e.stopPropagation()
            prevPlanta()
        })
    }

    //TABS COBERTURA / TIPO
    tabs.forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'))
            tabBtn.classList.add('active')

            currentTab = tabBtn.textContent.trim().toLowerCase() // 'cobertura' ou 'tipo'
            currentIndex = 0

            criarPaginacao()
            renderPlanta()
        })
    })

    criarPaginacao()
    renderPlanta()
})

//Implantação
document.addEventListener('DOMContentLoaded', () => {
    const implantacaoSlides = [
        { src: './imgs/IMPLANTACAO/PUC_APTOS.png' },
        { src: './imgs/IMPLANTACAO/23PAV_COBERTURA.png' },
        { src: './imgs/IMPLANTACAO/GARAGEM_2PAV.png' },
        { src: './imgs/IMPLANTACAO/GARAGEM_3PAV.png' },
        { src: './imgs/IMPLANTACAO/GARAGEM_4PAV.png' },
        { src: './imgs/IMPLANTACAO/IMPLANTACAO_APTO_TIPO.png' },
        { src: './imgs/IMPLANTACAO/IMPLANTACAO_APTO_TIPO_PCD.png' }
    ];

    const impWrapper = document.querySelector('.implantacao-img-wrapper');
    if (!impWrapper) return;

    const impImg = document.querySelector('.implantacao-img');
    const impPrevBtn = document.querySelector('.implantacao-arrow.arrow-left');
    const impNextBtn = document.querySelector('.implantacao-arrow.arrow-right');
    const impDotsContainer = document.querySelector('.implantacao-dots');
    const impZoomBtn = document.querySelector('.implantacao-ampliar-btn');

    let impIndex = 0;

    //bolinhas
    impDotsContainer.innerHTML = '';
    const impDots = implantacaoSlides.map((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        impDotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            impIndex = i;
            renderImplantacao();
        });

        return dot;
    });

    //Renderiza imagem atual
    function renderImplantacao() {
        const slide = implantacaoSlides[impIndex];
        impImg.src = slide.src;

        impDots.forEach((d, i) => d.classList.toggle('active', i === impIndex));

        resetImplantacaoZoom(); // sempre reseta o zoom ao trocar de imagem
    }

    // Setas
    impPrevBtn.addEventListener('click', () => {
        impIndex = (impIndex - 1 + implantacaoSlides.length) % implantacaoSlides.length;
        renderImplantacao();
    });

    impNextBtn.addEventListener('click', () => {
        impIndex = (impIndex + 1) % implantacaoSlides.length;
        renderImplantacao();
    });

    // Zoom + Arrastar
    let impIsZoomed = false;
    let impIsDragging = false;
    let impStartX = 0;
    let impStartY = 0;
    let impCurrentX = 0;
    let impCurrentY = 0;
    const impZoomFactor = 2.3;

    function resetImplantacaoZoom() {
        impIsZoomed = false;
        impIsDragging = false;
        impCurrentX = 0;
        impCurrentY = 0;

        impWrapper.classList.remove('implantacao-dragging');
        impImg.classList.remove('implantacao-zoomed');
        impImg.style.transform = 'scale(1) translate(0, 0)';

        if (impZoomBtn) {
            impZoomBtn.classList.remove('is-zoomed');
            // MESMO ESTILO DO ANTERIOR: "ampliar" + ícone X quando ativo
            impZoomBtn.innerHTML = 'ampliar <i class="fa-solid fa-plus"></i>';
        }
    }

    // Botão ampliar / reduzir
    if (impZoomBtn) {
        impZoomBtn.addEventListener('click', () => {
            impIsZoomed = !impIsZoomed;

            if (!impIsZoomed) {
                resetImplantacaoZoom();
                return;
            }

            impImg.classList.add('implantacao-zoomed');
            impImg.style.transform = `scale(${impZoomFactor}) translate(0, 0)`;

            impZoomBtn.classList.add('is-zoomed');
            // aqui fica igual ao print anterior: texto + X
            impZoomBtn.innerHTML = 'ampliar <i class="fa-solid fa-xmark"></i>';
        });
    }

    function startImpDrag(e) {
        if (!impIsZoomed) return;

        impIsDragging = true;
        impWrapper.classList.add('implantacao-dragging');

        const point = e.touches ? e.touches[0] : e;
        impStartX = point.clientX;
        impStartY = point.clientY;
    }

    function onImpDrag(e) {
        if (!impIsDragging || !impIsZoomed) return;

        e.preventDefault();

        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - impStartX;
        const dy = point.clientY - impStartY;

        impStartX = point.clientX;
        impStartY = point.clientY;

        impCurrentX += dx;
        impCurrentY += dy;

        impImg.style.transform = `scale(${impZoomFactor}) translate(${impCurrentX}px, ${impCurrentY}px)`;
    }

    function stopImpDrag() {
        impIsDragging = false;
        impWrapper.classList.remove('implantacao-dragging');
    }

    // Mouse
    impWrapper.addEventListener('mousedown', startImpDrag);
    impWrapper.addEventListener('mousemove', onImpDrag);
    impWrapper.addEventListener('mouseup', stopImpDrag);
    impWrapper.addEventListener('mouseleave', stopImpDrag);

    // Touch
    impWrapper.addEventListener('touchstart', startImpDrag);
    impWrapper.addEventListener('touchmove', onImpDrag, { passive: false });
    impWrapper.addEventListener('touchend', stopImpDrag);

    // primeira imagem
    renderImplantacao();
});
