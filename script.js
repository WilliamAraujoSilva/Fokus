const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const startPause = document.querySelector("#start-pause")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
let pausePlayIcon = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector("#timer")

const musicaFocoInput = document.querySelector("#alternar-musica")
const musica = new Audio("/sons/luna-rise-part-one.mp3")
const audioPlay = new Audio("/sons/play.wav")
const audioPausa = new Audio("/sons/pause.mp3")
const audioTempoFinalizado = new Audio("./sons/beep.mp3")


let intervaloID = null
let tempoDecorridoEmSegundos = 1500


musica.loop = true

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }
})

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500
  alterarContexto("foco")
  focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300
  alterarContexto("descanso-curto")
  curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900
  alterarContexto("descanso-longo")
  longoBt.classList.add("active")
})

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active")
  })
  html.setAttribute("data-contexto", contexto)
  banner.setAttribute("src", `/imagens/${contexto}.png`)
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
      break

    case "descanso-curto":
      titulo.innerHTML = ` Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
      break
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`
      break
    default:
      break
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    // audioTempoFinalizado.play()
    alert("tempo finalizado")
    zerar()
    return
  }
  tempoDecorridoEmSegundos -= 1
  mostrarTempo()
}

startPause.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
  if (intervaloID) {
    audioPausa.play()
    zerar()
    return
  }
  audioPlay.play()
  intervaloID = setInterval(contagemRegressiva, 1000)
  iniciarOuPausarBt.textContent = "Pausar"
  pausePlayIcon.setAttribute("src", "/imagens/pause.png")
}

function zerar() {
  clearInterval(intervaloID)
  iniciarOuPausarBt.textContent = "Começar"
  pausePlayIcon.setAttribute("src", "/imagens/play_arrow.png")
  intervaloID = null
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  })
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
