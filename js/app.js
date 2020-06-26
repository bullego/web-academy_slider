const urlApi = 'https://my-json-server.typicode.com/IlyaLytvynov/ads-box-server/ads';

function ajaxGet(url, callback) {
	let fun = callback || function(dataApi){ };
	let xhr = new XMLHttpRequest();

	xhr.addEventListener("load", function() {
		try {
			fun(JSON.parse(xhr.responseText));
		} catch(err) {
			console.error(err.message);
		};
	});
	xhr.addEventListener("error", function() {			
		console.error("Произошла ошибка соединения");	
	});
	xhr.addEventListener("timeout", function() {
		console.error("Запрос не успел выполниться за " + xhr.timeout + "мс");
	});
	xhr.timeout = 10000;

	xhr.open('GET', url);
	xhr.send();
};


class Slider {
	constructor(options) {
		this.i = 0;
		this.isToggle = options.isToggle;

		this.imgs = options.imgArr;
		this.titles = options.titleArr;
		this.dscrs = options.dscrArr;
		this.btnNext = document.querySelector(options.btnNext);
		this.btnPrev = document.querySelector(options.btnPrev);
		this.btnStart = document.querySelector(options.btnStart);
		this.btnEnd = document.querySelector(options.btnEnd);
		this.btnToggle = document.querySelector(options.btnToggle);
		this.slImg = document.querySelector(options.slImg);
		this.slTitle = document.querySelector(options.slTitle);
		this.slDscr = document.querySelector(options.slDscr);
		this.dscr = document.querySelector('.sl-dscr-wrap');

		this.btnStart.addEventListener('click', () => this.showStart())
		this.btnEnd.addEventListener('click', () => this.showEnd())
		this.btnNext.addEventListener('click', () => this.showNext())
		this.btnPrev.addEventListener('click', () => this.showPrev())
		this.btnToggle.addEventListener('click', () => this.onToggleHandler())
	}

	showStart() {		
		this.i = 0;

		this.slImg.src = this.imgs[this.i];
		this.slTitle.innerHTML = this.titles[this.i];
		this.slDscr.innerHTML = this.dscrs[this.i].slice(0, 51) + '...';
	}
	showEnd() {
		this.i = this.imgs.length - 1;

		this.slImg.src = this.imgs[this.i];
		this.slTitle.innerHTML = this.titles[this.i];
		this.slDscr.innerHTML = this.dscrs[this.i].slice(0, 51) + '...';
	}
	showNext() {
		if(this.i < this.imgs.length - 1) {
			this.i += 1;

			this.slImg.src = this.imgs[this.i];
			this.slTitle.innerHTML = this.titles[this.i];
			this.slDscr.innerHTML = this.dscrs[this.i].slice(0, 51) + '...';
		}
	}
	showPrev() {
		if(this.i > 0) {
			this.i--;

			this.slImg.src = this.imgs[this.i];
			this.slTitle.innerHTML = this.titles[this.i];
			this.slDscr.innerHTML = this.dscrs[this.i].slice(0, 51) + '...';
		}
	}
	onToggleHandler() {
		//add animation
		if(this.dscr.classList.contains('animate')) {
			this.dscr.classList.remove('animate');
			this.dscr.classList.add('no-animate');
		}
		else {
			this.dscr.classList.remove('no-animate');
			this.dscr.classList.add('animate');
		}
		//add content
		if(!this.isToggle) {
			this.slDscr.innerHTML = this.dscrs[this.i];
			this.isToggle = !this.isToggle;
		} else {
			this.slDscr.innerHTML = this.dscrs[this.i].slice(0, 51) + '...';
			this.isToggle = !this.isToggle;
		}
	}
}

ajaxGet(urlApi, function(dataApi) {
	let imgArr = [];
	let titleArr = [];
	let fullDscrArr = [];
	let isToggle = false;

	for(let i=0; i<dataApi.length; i++) {
		imgArr.push(dataApi[i].img);
		titleArr.push(dataApi[i].title);
		fullDscrArr.push(dataApi[i].description);
	}

	const options = {
		isToggle: isToggle,
		imgArr: imgArr,
		titleArr: titleArr,
		dscrArr: fullDscrArr,
		btnPrev: '.btn-prev',
		btnNext: '.btn-next',
		btnStart: '.btn-start',
		btnEnd: '.btn-end',
		btnToggle: '.btn-toggle',
		slImg: '.sl-img',
		slTitle: '.sl-title',
		slDscr: '.sl-dscr'
	}

	const sl_1 = new Slider(options);
	sl_1.showStart();
});