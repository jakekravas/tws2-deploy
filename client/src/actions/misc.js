export const getDateStr = date => {
  if (date.toString().split(" ")[1] === "Jan") {
    return `${date.toString().split(" ")[3]}-01-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Feb") {
    return `${date.toString().split(" ")[3]}-02-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Mar") {
    return `${date.toString().split(" ")[3]}-03-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Apr") {
    return `${date.toString().split(" ")[3]}-04-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "May") {
    return `${date.toString().split(" ")[3]}-05-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Jun") {
    return `${date.toString().split(" ")[3]}-06-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Jul") {
    return `${date.toString().split(" ")[3]}-07-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Aug") {
    return `${date.toString().split(" ")[3]}-08-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Sep") {
    return `${date.toString().split(" ")[3]}-09-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Oct") {
    return `${date.toString().split(" ")[3]}-10-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Nov") {
    return `${date.toString().split(" ")[3]}-11-${date.toString().split(" ")[2]}`;
  }
  if (date.toString().split(" ")[1] === "Dec") {
    return `${date.toString().split(" ")[3]}-12-${date.toString().split(" ")[2]}`;
  }
}
