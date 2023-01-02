export default function getCSSProperty(prop:string, value:string) {
  document.body.style.setProperty(prop, value);
}