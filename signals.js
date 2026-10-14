(() => {
  const root = document.querySelector('#signals');
  if (!root) return;
  const svg = root.querySelector('svg'), ns = 'http://www.w3.org/2000/svg';
  const names = ['Sleep', 'Voice', 'Activity', 'Language', 'Neural'];
  const colors = ['#807447','#b07c3d','#577c73','#a35e4d','#766b88'];
  const drawables = [], labels = [];
  function el(tag, attrs, text) {
    const n = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k,v));
    if (text) n.textContent = text;
    svg.append(n); return n;
  }
  function path(d, color, width, start, duration) {
    const n = el('path',{d,fill:'none',stroke:color,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
    const length = n.getTotalLength();
    n.style.strokeDasharray = length;
    drawables.push({n,length,start,duration}); return n;
  }
  names.forEach((name,i) => {
    const y = 65+i*72;
    labels.push({n:el('text',{x:8,y:y+5,'font-size':21},name),start:i*1.4});
    el('path',{d:`M140 ${y}H550`,stroke:'#d8cbb7','stroke-width':1,fill:'none'});
    let d='';
    for (let k=0;k<=180;k++) {
      const x=140+k*410/180, t=k/180;
      let wave;
      if(i===0) wave=([-8,-8,9,9,-14,-14,5,5,15,15,-5,-5][Math.min(11,Math.floor(t*12))]);
      else if(i===1) wave=Math.sin(k*1.7)*Math.sin(k*.13)*17;
      else if(i===2) wave=-23*Math.pow(Math.max(0,Math.sin(k*.19)),5)+8;
      else if(i===3) wave=10*Math.sin(k*.065)+5*Math.sin(k*.24);
      else wave=8*Math.sin(k*.95)+5*Math.sin(k*1.73);
      d+=`${k?'L':'M'}${x.toFixed(2)} ${(y+wave).toFixed(2)} `;
    }
    path(d,colors[i],3,i*1.4,2.2);
    // Each trace bends into a distinct strand of the same rope.
    const phase=i*Math.PI*2/5, ry=209+19*Math.sin(phase);
    const endpoint=d.trim().split(' ').pop();
    path(`M550 ${endpoint} C605 ${endpoint} 620 ${ry} 680 ${ry}`,colors[i],3.8,8,2.4);
  });
  // Short depth-sorted segments create genuine over/under crossings.
  for(let k=0;k<100;k++) {
    const x=680+k*2.7, x2=x+2.9;
    const strands=colors.map((color,i)=>({color,i,z:Math.cos(k*.16+i*Math.PI*2/5)})).sort((a,b)=>a.z-b.z);
    strands.forEach(({color,i,z})=>{
      const phase=i*Math.PI*2/5;
      const y=209+19*Math.sin(k*.16+phase), y2=209+19*Math.sin((k+2.9/2.7)*.16+phase);
      path(`M${x} ${y}L${x2} ${y2}`,color,4.6+z*.7,10.4+k*.028,.16);
    });
  }
  el('text',{x:140,y:397,'font-size':16},'Same observation window · different perspectives');
  const caption=root.querySelector('#signals-caption'), plan=root.querySelector('#signals-plan');
  const pause=root.querySelector('#signals-pause'), replay=root.querySelector('#signals-replay');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let elapsed=0,last=0,frame=0,running=false,started=false,stage=-1;
  const captions=['Sleep alone tells only part of the story.','Voice, activity, language, and neural signals add complementary perspectives.','Different fibers. One rope. A richer basis for understanding.','Combined evidence + lived experience → a personalized care conversation.'];
  function render(t) {
    drawables.forEach(({n,length,start,duration})=>{const p=Math.max(0,Math.min(1,(t-start)/duration));n.style.strokeDashoffset=length*(1-p);n.style.opacity=p>0?'1':'0';});
    labels.forEach(({n,start})=>n.style.opacity=t>=start?'1':'.2');
    plan.classList.toggle('is-revealed',t>=13.5);
    const next=t<1.4?0:t<8?1:t<13.5?2:3;
    if(stage!==next){caption.textContent=captions[next];stage=next;}
  }
  function tick(now){if(!running)return;if(last)elapsed+=(now-last)/1000;last=now;render(elapsed);if(elapsed<15)frame=requestAnimationFrame(tick);else{running=false;pause.textContent='Play';}}
  function stop(){running=false;cancelAnimationFrame(frame);last=0;pause.textContent='Play';}
  function play(){if(reduced.matches){render(15);return;}if(elapsed>=15)elapsed=0;running=true;last=0;pause.textContent='Pause';frame=requestAnimationFrame(tick);}
  root.classList.add('is-animated');render(reduced.matches?15:0);
  pause.addEventListener('click',()=>{started=true;if(running)stop();else play();});
  replay.addEventListener('click',()=>{started=true;stop();elapsed=0;play();});
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!started){started=true;play();}else if(!e.isIntersecting&&running)stop();});},{threshold:.25}).observe(root);}else{started=true;play();}
  function motion(){if(reduced.matches){stop();render(15);pause.disabled=true;}else{pause.disabled=false;}}
  reduced.addEventListener('change',motion);motion();
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)stop();});
})();
