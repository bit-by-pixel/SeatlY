const rows=[
    {row_nm:"A",seats:8,price:100, type:"lower-tier"},
    {row_nm:"B",seats:8,price:100, type:"lower-tier"},
    {row_nm:"C",seats:8,price:100, type:"lower-tier"},
    {row_nm:"D",seats:9,price:200, type:"middle-tier"},
    {row_nm:"E",seats:10,price:200, type:"middle-tier"},
    {row_nm:"F",seats:10,price:200, type:"middle-tier"},
    {row_nm:"G",seats:11,price:500, type:"upper-tier"},
    {row_nm:"H",seats:12,price:500, type:"upper-tier"},
    {row_nm:"I",seats:12,price:500, type:"upper-tier"},
    {row_nm:"J",seats:8,price:1000,type:"recliner-tier"} 
];

const seatingArea=document.getElementById("seatingarea");
const seatList=document.getElementById("seat-list");
const totalPrice=document.getElementById("total-price");
const bookBtn=document.getElementById("btn");

selectedSeats=[];
/* attributes of selectedSeats={id:"",price:}*/

function initiallySold(rowLabel,seatNum){
  return (rowLabel==="C" && seatNum=== 2)||
         (rowLabel==="J" && seatNum=== 5)||
         (rowLabel==="F" && seatNum=== 9)||
         (rowLabel==="L" && seatNum=== 5)||
         (rowLabel==="H" && seatNum=== 6);
}

function theater(){

/* function(parameter) { 
  return console.log(parameter); }
              |
              V
(parameter) => console.log(parameter);             */


    rows.forEach(Row => { 
        const rowline=document.createElement("div");
        rowline.classList.add("row");

        for(let i=1;i<=Row.seats;i++){
            const currentseat=document.createElement("div");
                  currentseat.classList.add("seat",Row.type);
            const currentseatId=`${Row.row_nm}${i}`;

            if (initiallySold(Row.row_nm,i)) {
                currentseat.classList.add("occupied");}
                else {
                    currentseat.classList.add(Row.type);
                    currentseat.dataset.id=currentseatId;

                    currentseat.addEventListener("click", () => toggleSeat(currentseat,currentseatId,Row.price));
                }   
                
                rowline.appendChild(currentseat);
            }
            seatingArea.appendChild(rowline);

            }
    );
}
function toggleSeat(cseat,cseatID,price){
        
        if (!(cseat.classList.contains("selected"))) {
            cseat.classList.add("selected");
            selectedSeats.push({id:cseatID,price:price});}
        else{ 
            cseat.classList.remove("selected");
            selectedSeats=selectedSeats.filter(currentitem => currentitem.id !== cseatID);}
            /*Keep this seat in the array only if its ID does not match the one the user just canceled */
        
    updateSummary();
}   

function updateSummary(){
    const total=selectedSeats.reduce((sum,currentitem)=>sum+currentitem.price,0);
    totalPrice.innerText=total;

    if(selectedSeats.length>0){
        seatList.innerText=selectedSeats.map(currentitem=>currentitem.id).join(", ");
        bookBtn.disabled=false;}
      else{
        seatList.innerText="None";
        bookBtn.disabled=true;
      }
}

bookBtn.addEventListener("click", () => {
  alert(
    `Booking Confirmed!\nSeats: ${selectedSeats.map((currentitem) => currentitem.id).join(", ")}
	\nTotal Paid: $${totalPrice.innerText}`,
  );

  document.querySelectorAll(".seat.selected").forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });
  selectedSeats = [];
  updateSummary();
});

theater();

/* remove innerHMTL */