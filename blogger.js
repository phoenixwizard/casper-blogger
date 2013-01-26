var links = [];
var casper = require('casper').create({
	logLevel: "debug",
	pageSettings: {userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1309.0 Safari/537.17"}
});

var fs = require('fs');

casper.start('http://penned-in-tint.in'); 


function getLinks() {
    var links = document.querySelectorAll('h3.post-title.entry-title a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href')
    });
}

function getPage(){
	var new_page=document.querySelector('#blog-pager-older-link a');
	return new_page.getAttribute('href');
}

casper.then(function() {

    links = this.evaluate(getLinks);

    
    var a = this.evaluate(getPage);
    this.echo(a);
    this.thenOpen(a);
});



casper.then(function(){
	links = links.concat(this.evaluate(getLinks));
	var page_content="";
	casper.each(links,function(self,link){
		self.thenOpen(link, function() {
	        // this.echo(this.getPageTitle;
	        page_content=this.getHTML('div.post.hentry');
	        fs.write('aram.html', page_content, 'a');
	    });
	});
	
});




casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});