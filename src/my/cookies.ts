export function setCookie(name: string, value: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
export function getCookie(Name: string) {
  const name = Name + "=";
  let ca = document.cookie.split(";");
  for (let item of ca) {
    if (item.charAt(0) === " ") item = item.substring(1);
    const tag = item.slice(0, name.length);
    if (tag === name) return item.substring(name.length, item.length);
  }
  return "";
}
export function checkCookie(name: string) {
  return getCookie(name) !== "";
}
export function deleteCookie(name: string) {
  const d = new Date();
  d.setTime(d.getTime() + 0);
  document.cookie = name + "= ;expires=" + d.toUTCString() + ";path=/";
}
