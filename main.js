let activePath = 'home';

const loadPage = () => {
    switch (activePath) {
        case 'home':
            document.querySelector('.home').style.display = 'block';
            document.querySelector('.header-title').innerHTML = 'PROGRAMACION E HISTORIA';
            document.querySelector('.history').style.display = 'none';
            document.querySelector('.game').style.display = 'none';
            break;
        case 'history':
            document.querySelector('.history').style.display = 'block';
            document.querySelector('.header-title').innerHTML = 'HISTORIA DE LA PROGRAMACION';
            document.querySelector('.home').style.display = 'none';
            document.querySelector('.game').style.display = 'none';
            break
        case 'game':
            document.querySelector('.game').style.display = 'block';
            document.querySelector('.header-title').innerHTML = 'JUGUEMOS UN POCO';
            document.querySelector('.home').style.display = 'none';
            document.querySelector('.history').style.display = 'none';
            break;
    }
}

const initGame = () => {
    const images = document.querySelectorAll('.images-container img');
    const boxNames = ['box1', 'box2', 'box3'];
    const boxes = boxNames.map(boxName => {
        return document.querySelector('.'+boxName);
    });

    images.forEach(image => {
        image.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('Text', e.target.className);
        }, false)

        image.addEventListener('dragend', (e) => {
            e.target.style.visibility = 'hidden'
        }, false)
    });

    boxes.forEach(box => {
        box.addEventListener('dragenter', (e) => {e.preventDefault();}, false);
        box.addEventListener('dragover', (e) => {e.preventDefault();}, false);
        box.addEventListener('drop', (e) => {
            e.preventDefault();
            const imageClassName = e.dataTransfer.getData('Text');
            const src = document.querySelector('.'+imageClassName).src;
            box.innerHTML='<img src="'+src+'" height="400px" width="275px">';
        }, false);
    })

    document.querySelector('.reset-button').addEventListener('click', () => {
        images.forEach(image => {
            image.style.visibility = 'visible';
        })
        boxes.forEach(box => {
            box.innerHTML = '<p>Arrastre y suelte la imágene aquí</p>'
        })
    })
}

window.addEventListener('load', () => {
    //Make navigation
    const navigationClasses = ['.go-home', '.go-history', '.go-game'];
    navigationClasses.forEach(navigationClass => {
        document.querySelectorAll(navigationClass).forEach(element => {
            element.addEventListener('click', () => {
                activePath = navigationClass.replace('.go-', '');
                loadPage();
            })
        })
    })

    //Add video events
    const video = document.querySelector('video');
    document.querySelector('.play').addEventListener('click', () => {video.play()});
    document.querySelector('.pause').addEventListener('click', () => {video.pause()});
    setTimeout(() => {
        document.querySelector('.video-time').innerHTML = `Duración del video: ${video.duration.toFixed(2)}`
    }, 500);

    //Mount pages and init game logic
    loadPage();
    initGame();
})