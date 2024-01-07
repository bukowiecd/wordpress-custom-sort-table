let sortOrder = true; // Sort order of the table. true = ascending, false = descending

function sortTable(table,n){
    for(let i = 1; i < table.rows.length; i++){
        for(let j = 1; j < (table.rows.length - i); j++){
            let x = table.rows[j].getElementsByTagName("TD")[n].innerHTML;
            let y = table.rows[j+1].getElementsByTagName("TD")[n].innerHTML;
            //Checking if the values are numbers.
            if(!isNaN(parseFloat(x)))
                x=parseFloat(x);
            if(!isNaN(parseFloat(y)))
                y=parseFloat(y);
            //Check if values should swap places.
            if((x > y) && sortOrder )
                table.rows[j].parentNode.insertBefore(table.rows[j+1],table.rows[j]);
            if((x < y) && !sortOrder )
                table.rows[j].parentNode.insertBefore(table.rows[j+1],table.rows[j]);
        }
    }
    //Switching the sorting order. 
    sortOrder = !sortOrder;
}

function editHeader(table, n){
    for(i = 0; i < (table.rows[0].cells.length); i++){
        table.rows[0].cells[i].classList.remove("sort-primary");
    
        if(sortOrder)
            {
                table.rows[0].cells[i].classList.add("asc-header");
                table.rows[0].cells[i].classList.remove("desc-header");
            }
        else{
                table.rows[0].cells[i].classList.remove("asc-header");
                table.rows[0].cells[i].classList.add("desc-header");
            }	
        }
        table.rows[0].cells[n].classList.add("sort-primary");
}

function formatHeader(headers){
    for(let i = 0; i < headers.length; i++){
        let spanDesc = headers[i].appendChild(document.createElement("span"));
        spanDesc.classList.add("desc-sort");
	    spanDesc.innerHTML="▼";

        let spanAsc = headers[i].appendChild(document.createElement("span"));
		spanAsc.classList.add("asc-sort");
		spanAsc.innerHTML="▲";
		 
		let spanFiller = headers[i].appendChild(document.createElement("span"));
		spanFiller.classList.add("filler-sort");
		spanFiller.innerHTML=" ";
		 
		headers[i].classList.add("desc-header");
    }
}


window.addEventListener("load", (event) => {
    let table = document.getElementsByClassName('sortable')[0].getElementsByTagName("table")[0];
    let tableHeaders =  table.rows[0].getElementsByTagName("TH");

    formatHeader(tableHeaders);

    for (let i = 0; i < tableHeaders.length; i++)
        tableHeaders[i].addEventListener("click", (event) => {
            sortTable(table,i);
            editHeader(table,i);
        });

    sortTable(table,0);
    editHeader(table,0)
});