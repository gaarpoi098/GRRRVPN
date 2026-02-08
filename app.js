/* ❄️ СНЕГ */
const snow = document.createElement("canvas");
document.body.appendChild(snow);
const sctx = snow.getContext("2d");

function resize(){
    snow.width = innerWidth;
    snow.height = innerHeight;
}
resize();
onresize = resize;

const flakes = Array.from({length:120}).map(()=>({
    x:Math.random()*snow.width,
    y:Math.random()*snow.height,
    r:Math.random()*3,
    s:Math.random()*2+1
}));

function drawSnow(){
    sctx.clearRect(0,0,snow.width,snow.height);
    sctx.fillStyle="white";

    flakes.forEach(f=>{
        sctx.beginPath();
        sctx.arc(f.x,f.y,f.r,0,Math.PI*2);
        sctx.fill();
        f.y+=f.s;
        if(f.y>snow.height)f.y=0;
    });

    requestAnimationFrame(drawSnow);
}
drawSnow();


/* ✨ НЕОНОВЫЕ ЧАСТИЦЫ */
const particles = document.createElement("canvas");
document.body.appendChild(particles);
const pctx = particles.getContext("2d");
particles.width = innerWidth;
particles.height = innerHeight;

const pts = Array.from({length:60}).map(()=>({
    x:Math.random()*particles.width,
    y:Math.random()*particles.height,
    vx:(Math.random()-0.5)*0.5,
    vy:(Math.random()-0.5)*0.5
}));

function drawParticles(){
    pctx.clearRect(0,0,particles.width,particles.height);

    pts.forEach(a=>{
        a.x+=a.vx; a.y+=a.vy;

        if(a.x<0||a.x>particles.width) a.vx*=-1;
        if(a.y<0||a.y>particles.height) a.vy*=-1;

        pts.forEach(b=>{
            const dx=a.x-b.x, dy=a.y-b.y;
            const dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<120){
                pctx.strokeStyle="rgba(255,60,60,.1)";
                pctx.beginPath();
                pctx.moveTo(a.x,a.y);
                pctx.lineTo(b.x,b.y);
                pctx.stroke();
            }
        });
    });

    requestAnimationFrame(drawParticles);
}
drawParticles();


/* 🎯 АВТО-ВЫБОР ТАРИФА */
const cards = document.querySelectorAll(".card");

cards.forEach(card=>{
    card.onclick=()=>{
        cards.forEach(c=>c.classList.remove("active"));
        card.classList.add("active");
    }
});


/* 🌀 ПАРАЛЛАКС */
document.addEventListener("mousemove", e=>{
    const x = (e.clientX/window.innerWidth-0.5)*20;
    const y = (e.clientY/window.innerHeight-0.5)*20;

    document.body.style.transform = `translate(${x}px,${y}px)`;
});
