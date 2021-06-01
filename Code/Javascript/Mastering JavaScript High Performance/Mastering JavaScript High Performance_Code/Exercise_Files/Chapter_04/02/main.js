var my_integer = 0;

function loopingTo5k() {
	while (my_integer < 5000){
		my_integer += 1;
		var paragraphTag = document.createElement("p");
		paragraphTag.innerText = my_integer;
		document.body.appendChild(paragraphTag);
        
        
        /** Break in debugger */
        if(my_integer === 555) {
            debugger;
        }
	}
}

/** Triggering loop */

window.onload = loopingTo5k;