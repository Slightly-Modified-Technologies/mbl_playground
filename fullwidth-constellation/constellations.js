const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const circlePI = Math.PI * 2;
const particlesArr = [];
let hue = 0;

// Canvas Setup sizing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Prevent browser resizing using eventListener!
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Storing the mouse coordinates :)
const mouse = {
    x: undefined,
    y: undefined,
}

// Actions on Mouse Click
canvas.addEventListener('click', (e) => {
    // As we know the mouse Event has a lot of props. ==== our X and Y coordinates :)
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 10; i++) {
        particlesArr.push(new Particle());
    }

    //drawCircle();
});

// Actions on mouse move!
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 5; i++) {
        particlesArr.push(new Particle());
    }

    //drawCircle();
});

// Create js objects containing X and Y coordinates
// Each Particle refs 1 Circle!
// props are designed insight blueprint constructor!
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1; // Math.floor(Math.random() * 7)
        this.speedX = Math.random() * 3 - 1.5; // horizontalXspeed - rand num between -1.5 and +1.5
        this.speedY = Math.random() * 3 - 1.5; // verticalYspeed - rand num between -1.5 and +1.5
        // red is hsl(0,100%,50%); // green = (120, 100%, 50%) // blue = (240, ..., ...)
        this.color = 'white'; // `hsl(${hue}, 100%, 50%)`
    }
    update() {
        // Note: This creates a simple 2d vector animation!
        this.x += this.speedX;
        this.y += this.speedY;

        // Resize the particles as they move around
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'white'; // this.color
        ctx.lineWidth = 5;
        ctx.beginPath(); // Tell js place paint brush and start the drawing!
        ctx.arc(this.x, this.y, this.size, 0, circlePI);
        //ctx.arc(200, 150, 50, 0, circlePI); // good explanation about starting points and coords ! https://youtu.be/Yvz_axxWG4Y?t=607 
        ctx.fill(); // actuallys does ^^^ but fill()  fills the entire dimenssions given!
    }
}


function handleParticles() {
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();

        // Nested - for every particle in the arr = compare distances
        for (let j = i; j < particlesArr.length; j++) {

            // distance Horizontal X Axis = calculate the distance between particles on horizontal X axis
            const dx = particlesArr[i].x - particlesArr[j].x; // The difference calculates the X horzontal axis :)

            // distance Vertical Y Axis = calculates the distance between particles on the vertical Y axis
            const dy = particlesArr[i].y - particlesArr[j].y; // The difference calculates the Y vertical axis same as dx

            // We use the pythagorean therorem to get the two points
            // Distance = the hypotoneuse of a right triangle :)
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check if under certian px size = draw a line from the points
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArr[i].color;
                ctx.lineWidth = 0.2; //  particlesArr[i].size / 10
                ctx.moveTo(particlesArr[i].x, particlesArr[i].y);
                ctx.lineTo(particlesArr[j].x, particlesArr[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }

        // If particle is 0 remove from array!
        if (particlesArr[i].size <= 0.3) {
            particlesArr.splice(i, 1);
            i--;
        }

    }
}


function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // 'black' || // Really cool shooting start effect 'rgba(0, 0, 0, 0.2)'
    ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticles();
    hue += 2; // adjust colors speed here :)

    // Calls fn that we pass only calls once
    requestAnimationFrame(animate); // Loops over and over!
}
animate();
