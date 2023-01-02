export default function getCSSProperty(prop:string) : string {
  return window.getComputedStyle(document.body).getPropertyValue(prop);
}