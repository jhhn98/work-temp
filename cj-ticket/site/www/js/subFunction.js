document.addEventListener("DOMContentLoaded", () => {
    contentNavigation();
    simpleToggleClass('.contentShare');
})

function contentNavigation() {
    const contentNavigation = document.querySelector('.contentNavigation');
    const navigationButton = contentNavigation.querySelectorAll('button');

    navigationButton.forEach( item => {
        item.addEventListener('click', (e) => {
            if( item.classList.contains('active') ) {
                item.classList.remove('active');
                item.closest('li').classList.remove('active');
            } else {
                item.classList.add('active');
                item.closest('li').classList.add('active');
            }
        });
    });
}

function simpleToggleClass( tgButton ) {
    const button = document.querySelector(tgButton);

    if (!button) return;

    button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    });
}