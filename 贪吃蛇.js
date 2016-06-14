var hover=$(".xuanxiang");
	var hidden=$(".dashu");
	for (var i = 0; i < hover.length; i++) {
		hover[i].index=i;
		hover[i].onmouseover=function() {
			hover[this.index].style.background="#fff"
			hidden[this.index].style.display="block"
		}
		hover[i].onmouseout=function() {
			hover[this.index].style.background="#f6f6f6"
			hidden[this.index].style.display="none"
		}
	}
	for (var i = 0; i < hidden.length; i++) {
		hidden[i].index=i;
		hidden[i].onmouseover=function() {
			hover[this.index].style.background="#fff"
			hidden[this.index].style.display="block"
		}
		hidden[i].onmouseout=function() {
			hover[this.index].style.background="#f6f6f6"
			hidden[this.index].style.display="none"
		}
	}