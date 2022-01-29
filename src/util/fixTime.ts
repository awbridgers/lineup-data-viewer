export const fixTime = (seconds: number)=>{
  const min = Math.floor(seconds/60);
  const sec = seconds % 60;
  
  return sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`
}