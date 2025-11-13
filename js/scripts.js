//redirecionar para agencia
function getAgencia() {
    window.open('https://www.agenciaaffinity.com.br/')
}

//Carrossel
const mainImg = document.getElementById('carousel-main-img')
const thumbs = document.querySelectorAll('.carousel-thumbs .thumb')

let index = 0

function updateMainImage(i) {
    mainImg.style.opacity = 0

    setTimeout(() => {
        mainImg.src = thumbs[i].src
        mainImg.style.opacity = 1
    }, 200)

    thumbs.forEach(t => t.classList.remove('active'))
    thumbs[i].classList.add('active')

    index = i
}

// miniaturas clicáveis
thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => updateMainImage(i))
})

// seta direita
document.querySelector('.right-btn').addEventListener('click', () => {
    index = (index + 1) % thumbs.length
    updateMainImage(index)
})

// seta esquerda
document.querySelector('.left-btn').addEventListener('click', () => {
    index = (index - 1 + thumbs.length) % thumbs.length
    updateMainImage(index)
})
