
interface Type {
  percent: number,
  idStar: number,
}

export default function ({ percent, idStar }: Type) {
  const val = 36 * percent;
  const id = `star_${idStar}`;

  return (
    <svg width="38" height="36" viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.67334 35.7794C7.91678 36.2358 6.98341 35.5586 7.18254 34.6978L9.76432 23.5366C9.84779 23.1757 9.72497 22.7983 9.44511 22.5556L0.784976 15.0475C0.117447 14.4688 0.473397 13.3721 1.35356 13.2957L12.7999 12.3021C13.1691 12.27 13.4902 12.0365 13.6345 11.6951L18.0789 1.17942C18.423 0.365149 19.577 0.365148 19.9211 1.17941L24.3655 11.6951C24.5098 12.0365 24.8309 12.27 25.2001 12.3021L36.6464 13.2957C37.5266 13.3721 37.8826 14.4688 37.215 15.0475L28.5549 22.5556C28.275 22.7983 28.1522 23.1757 28.2357 23.5366L30.8175 34.6978C31.0166 35.5586 30.0832 36.2358 29.3267 35.7794L19.5165 29.8616C19.1988 29.6699 18.8012 29.6699 18.4835 29.8616L8.67334 35.7794Z" fill={`url(#${id})`} />
      <defs>
        <linearGradient id={`${id}`} x1="19" y1="-1" x2="19" y2={val} gradientUnits="userSpaceOnUse">
          <stop offset="1" stopColor="#C1DEE7" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
} 