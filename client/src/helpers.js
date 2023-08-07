export function formatDate(date, reverse = false) {
  let d = new Date(date);
  let year = d.getFullYear();
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  let day = ("0" + d.getDate()).slice(-2);

  if (reverse) {
    return [day, month, year].join("-");
  }

  return [year, month, day].join("-");
}
