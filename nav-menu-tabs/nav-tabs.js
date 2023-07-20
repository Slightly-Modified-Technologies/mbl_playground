let navMenuItems = document.querySelectorAll('.nav-items');

function activeMenuLink() {
    navMenuItems.forEach((menuItem) => {
        menuItem.classList.remove('active');
        this.classList.add('active');
    });
}

navMenuItems.forEach((menuItem) => {
    menuItem.addEventListener('click',  activeMenuLink)
});