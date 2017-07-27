module.exports = ClozeCard;


function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;	
	this.fullText = function(){
   	 return "" + this.cloze + "" + this.text;	    
	};
	this.partial = function(){
		return "________________   " + "" + this.text;
	};	
}

