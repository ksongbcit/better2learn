const itemlist = document.querySelector("#itemlist");
const submit = document.querySelector("#saveitem");

var newname = document.querySelector("#newitem");
var newstartdate = document.querySelector("#newitemstartdate");
var newduedate = document.querySelector("#newitemduedate");
var newstarttime = document.querySelector("#newitemstarttime");
var newduetime = document.querySelector("#newitemduetime");

submit.addEventListener("click", addNewItem);

function addNewItem(e) {
  e.preventDefault();

  let itemContainer = document.createElement('div');
  let itemDetail = document.createElement('p');
  let itemStart = document.createElement('p');
  let itemDue = document.createElement('p');

  itemDetail.innerText = "Task : " + newname.value;
  itemStart.innerText = "Start on : " + newstartdate.value + "  At : " + newstarttime.value;
  itemDue.innerText = "Finish on : " + newduedate.value + "  By : " + newduetime.value;

  if (newname.value != "" && newstartdate.value != "" && newstarttime.value != "" &&
    newduedate.value != "" && newduetime.value != "") {
    itemlist.appendChild(itemContainer);
    itemContainer.appendChild(itemDetail);
    itemContainer.appendChild(itemStart);
    itemContainer.appendChild(itemDue);
  } else {
    alert("Please fill in the blanks");
  }

}