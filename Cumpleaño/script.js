const openBtn = document.getElementById('openBtn');
const lid = document.getElementById('lid');
const gift = document.getElementById('gift');
const cardInside = document.getElementById('cardInside');
const insideText = document.getElementById('insideText');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const videoContainer = document.getElementById('videoContainer');
const birthdayVideo = document.getElementById('birthdayVideo');

function resizeCanvas(){
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = [];
function spawn(x,y,spread,count){
  for(let i=0;i<count;i++){
    const angle = (Math.random()-0.5)*spread + -Math.PI/2;
    const speed = Math.random()*6 + 2;
    particles.push({
      x:x, y:y,
      vx:Math.cos(angle)*speed,
      vy:Math.sin(angle)*speed,
      sz:Math.random()*8+4,
      color:`hsl(${Math.floor(Math.random()*360)},85%,60%)`,
      rot:Math.random()*360,
      life:Math.random()*90+60
    });
  }
}

function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=particles.length-1;i>=0;i--){
    const p = particles[i];
    p.vy += 0.18;
    p.x += p.vx; p.y += p.vy; p.rot += p.vx*0.1; p.life--;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot*Math.PI/180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.sz/2, -p.sz/2, p.sz, p.sz*0.6);
    ctx.restore();
    if(p.y > innerHeight + 100 || p.life<=0) particles.splice(i,1);
  }
  requestAnimationFrame(update);
}
update();

function boxCenter(){
  const rect = gift.getBoundingClientRect();
  return {x: rect.left + rect.width/2, y: rect.top + rect.height/3};
}

let opened = false;
function openGift(){
  if(opened) return;
  opened = true;
  lid.style.transform = 'rotateX(-75deg) translateZ(18px)';
  gift.style.transform = 'translateY(-10px) scale(1.02)';
  setTimeout(()=>{ 
    cardInside.classList.add('show'); 
    // Mostrar el texto primero
    setTimeout(()=>{
      videoContainer.style.display = 'block';
      birthdayVideo.play();
    }, 3000); // Espera 3 segundos antes de mostrar el video
  }, 420);

  const center = boxCenter();
  spawn(center.x, center.y, Math.PI*1.6, 160);
  const rainInterval = setInterval(()=>{
    const cx = center.x + (Math.random()-0.5)*220;
    spawn(cx, center.y - 40, Math.PI*1.6, 18);
  }, 160);
  setTimeout(()=>{ clearInterval(rainInterval); }, 2400);
  releaseBalloons();

}

openBtn.addEventListener('click', openGift);
gift.addEventListener('click', openGift);
function releaseBalloons(){
  const container = document.getElementById('balloons');
  for(let i=0;i<6;i++){
    const b = document.createElement('div');
    b.className='balloon';
    b.style.left = Math.random()*90 + 'vw';
    b.style.background = `radial-gradient(circle at 30% 30%, #fff, hsl(${Math.random()*360},70%,60%))`;
    b.style.animationDuration = (6+Math.random()*4)+'s';
    container.appendChild(b);
    setTimeout(()=>b.remove(),10000);
  }
}
