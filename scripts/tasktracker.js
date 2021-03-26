$(function() {
  const itemlist = document.getElementById("itemlist");
  const button = document.getElementById("saveitem");

  var itemname = document.getElementById("newitem").value;
  var itemstart = document.getElementById("newitemstart").value;
  var itemdue = document.getElementById("newitemdue").value;


  button.addEventListener("click", addItem());

  function addItem() {
    console.log(itemname);
    console.log(itemstart);
    console.log(itemdue);
  }





  itemlist.appendChild(newitem);

});


