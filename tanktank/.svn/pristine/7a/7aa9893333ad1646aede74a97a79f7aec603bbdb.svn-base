function tankMove(){
  switch(keyNow){
    case 'UP':data.tanks[0].y-=4;data.tanks[0].deg1=0;break;
    case 'DOWN':data.tanks[0].y+=4;data.tanks[0].deg1=180;break;
    case 'LEFT':data.tanks[0].x-=4;data.tanks[0].deg1=90;break;
    case 'RIGHT':data.tanks[0].x+=4;data.tanks[0].deg1=270;break;
  }
  data.tanks[0].deg2=Math.PI+Math.atan2(MOUSEX-data.tanks[0].x,MOUSEY-data.tanks[0].y);
}
