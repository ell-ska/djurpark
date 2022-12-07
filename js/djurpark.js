const sidebar = document.querySelector('.sidebar')
const content = document.querySelector('.animal-content')
const welcomeScreen = document.querySelector('.welcome')
let sidebarButtons;
let animals = []

function createAnimal(name, desc, smallImg, bigImg, species, food, length, weight, lifespan, area) {

    function Animal(name, desc, smallImg, bigImg, species, food, length, weight, lifespan, area) {
        this.name = name;
        this.desc = desc;
        this.smallImg = smallImg;
        this.bigImg = bigImg;
        this.species = species;
        this.food = food;
        this.length = length;
        this.weight = weight;
        this.lifespan = lifespan;
        this.area = area;
    }

    let animal = new Animal(name, desc, smallImg, bigImg, species, food, length, weight, lifespan, area)
    animals.push(animal)

}

createAnimal(
    'Cassowary',
    "It's not hard to imagine that cassowaries are descended from dinosaur ancestors. The largest cassowaries can stand as high as six feet and weigh up to 160 pounds. These large birds cannot fly, but their extremely powerful legs propel them at great speeds. They are strong swimmers and can move quickly on both land and water. Cassowaries are shy and they are usually hard to spot, at least in their natural rain forest habitats. They are not overly aggressive, and attacks are rare. But they can do a lot of damage if they are provoked or angered. Cassowary attacks have occasionally been deadly, including a recent one which occurred in 2019, at a private collection of caged birds in Florida",
    'cassowary-small.jpg',
    'cassowary-big.jpg',
    'bird',
    'Plants matter like fruit, insects and small animals like mice amd lizards',
    '1.7m',
    '44kg',
    '20 years',
    'Queensland'
)

createAnimal(
    'Frill-necked lizard',
    "When this unique creature feels threatened, it rises on its hind legs, opens its yellow-coloured mouth, unfurls the colorful, pleated skin flap that encircles its head, and hisses. If an attacker is unintimidated by these antics, the lizard simply turns tail, mouth and frill open, and bolts, legs splaying left and right. It continues its deliberate run without stopping or looking back until it reaches the safety of a tree.",
    'frillNeckedLizard-small.jpg',
    'frillNeckedLizard-big.jpg',
    'reptile',
    'Small insects and spiders',
    '90cm',
    '1kg',
    '20 years',
    'Northern Australia'
)

createAnimal(
    'Echidna',
    "Echidnas, also called spiny anteaters, are walking contradictions. They are mammals, but they lay eggs. They are often classified as long- or sort-beaked, but don't have beaks at all, in the traditional sense; they have fleshy noses that can be either on the long side or rather short. They don't really look like true anteaters (Myrmecophaga tridactyla), either, and they are not closely related to them. They are spiny, though; their bodies are covered with hollow, barbless quills. Echidnas are monotremes, egg-laying mammals. The only other living monotreme is the platypus.",
    'echidna-small.jpg',
    'echidna-big.jpg',
    'mammal',
    'Insects such as ants and termites, beetle larvae and worms',
    '76cm',
    '10kg',
    '50 years',
    'Throughout Australia'
)

const createSidebarButtons = () => {
    animals.forEach(animal => {
        if (window.location.pathname.match('index.html')) {
            let newButton = document.createElement('button');
            newButton.textContent = animal.name;
            newButton.classList.add('sidebar__button')
            sidebar.appendChild(newButton)
        } else if (window.location.pathname.match(animal.species)) {
            let newButton = document.createElement('button');
            newButton.textContent = animal.name;
            newButton.classList.add('sidebar__button')
            sidebar.appendChild(newButton)
        }
    })

    sidebarButtons = document.querySelectorAll('.sidebar__button');
}

const showContent = (e) => {

    welcomeScreen.classList.add('welcome--hidden')

    content.innerHTML = ""

    const createElement = (text, className, elementType = 'p') => {
        let element = document.createElement(elementType)
        element.innerHTML = text
        element.classList.add(className)
        content.appendChild(element)
    }

    const createImgElement = (src, className) => {
        let element = document.createElement('img')
        element.setAttribute('src', '../assets/images/' + src)
        element.classList.add(className)
        content.appendChild(element)
    }

    animals.forEach(animal => {
        if (animal.name === e.target.textContent && window.location.pathname.match('index.html')) {

            createElement(animal.name, 'content__title', 'h2')
            createImgElement(animal.smallImg, 'content__image-small')
            createElement(animal.desc.slice(0, 200) + '...', 'content__desc')
            createElement('Read more', 'content__button', 'button')
            createElement('<span>Species:</span> ' + animal.species, 'content__species')
            createElement('<span>Eats:</span> ' + animal.food, 'content__food')

            const readMore = () => {
                window.location.pathname = '/projects/djurpark/html/' + animal.species + 's.html'
            }

            let readMoreButton = document.querySelector('.content__button')
            readMoreButton.addEventListener('click', readMore)

        } else if (animal.name === e.target.textContent) {

            createImgElement(animal.smallImg, 'content__image-small')
            createElement(animal.name, 'content__title', 'h2')
            createElement('<span>Species:</span> ' + animal.species, 'content__species')
            createElement(animal.desc, 'content__desc')
            createImgElement(animal.bigImg, 'content__image-big')
            createElement('<span>Eats:</span> ' + animal.food, 'content__food')
            createElement('<span>Length:</span> ' + animal.length, 'content__length')
            createElement('<span>Weight:</span> ' + animal.weight, 'content__weight')
            createElement('<span>Lifespan:</span> ' + animal.lifespan, 'content__lifespan')
            createElement('<span>Area:</span> ' + animal.area, 'content__area')
            
        }
    })
}

const setSidebarSize = () => {
    let sidebarButtonsArray = Array.from(sidebarButtons)

    if (Array.isArray(sidebarButtonsArray) && sidebarButtonsArray.length > 0) {
        let buttonSizes = []
        sidebarButtons.forEach(button => {
            buttonSizes.push(button.getBoundingClientRect().width)
        })
    
        sidebar.style.left = '-' + (Math.max(...buttonSizes) + 32) + 'px'
    
        sidebar.addEventListener('mouseover', () => {
            sidebar.style.left = '0'
        })
        
        sidebar.addEventListener('mouseleave', () => {
            sidebar.style.left = '-' + (Math.max(...buttonSizes) + 32) + 'px'
        })
    } else {
        sidebar.style.left = '-32px'

        sidebar.addEventListener('mouseover', () => {
            sidebar.style.left = '0'
        })
        
        sidebar.addEventListener('mouseleave', () => {
            sidebar.style.left = '-32px'
        })
    }
}

// call functions
createSidebarButtons()
setSidebarSize()
sidebarButtons.forEach(button => {
    button.addEventListener('click', showContent)
})
