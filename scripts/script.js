const navbar = document.querySelector('.nav')
const fridge = document.querySelector('#fridge')


const adjustFridgeHeight = () => {
    const navbarHeight = navbar.offsetHeight;
    fridge.style.maxHeight = `calc(68dvh - ${navbarHeight}px)`
}

adjustFridgeHeight()

document.addEventListener("DOMContentLoaded", () => {
    adjustFridgeHeight()
})

document.addEventListener('load', () => {
    adjustFridgeHeight()
})

document.addEventListener('resize', () => {
    adjustFridgeHeight()
})