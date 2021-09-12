	 var n = 8;
	 var clicksEnabled = false;
	 var clickHandlers = [];
	 var highscore = 0;
	 var score = 0;
	 var clicks = 1;
	 let userClicks = 0;
	 prepareDom("#playground", n);
	 document.querySelector("#playGame").addEventListener('click', playGame);
	 setScore();

	 function prepareDom(id, n) {
	   let frag = document.createDocumentFragment();
	   for (let i = 1; i <= n; i++) {
	     let box = document.createElement('div');
	     box.classList.add('box');
	     box.setAttribute('id', `box${i}`);
	     box.setAttribute('data-el', `${i}`);
	     frag.append(box);
	   }
	   document.querySelector(id).append(frag);
	 }

	 function playGame() {
	   score = 0;
	   disableButton();
	   perpareDemo();
	 }

	 function perpareDemo() {
	   disableClicks();
	   let randomNumber = Math.random()
	   let rand = randomNumber * n;
	   clickHandlers.push(Math.ceil(rand));
	   showDemo(1);
	 }

	 function showDemo(i) {
	   if (i > clickHandlers.length) {
	     userClicks = 0;
	     enableClicks();
	     return;
	   }
	   document.querySelector(`#box${clickHandlers[i - 1]}`).style.background = 'blue'
	   setTimeout(() => {
	     document.querySelector(`#box${clickHandlers[i - 1]}`).style.background = '#eee'
	     setTimeout(() => {
	       showDemo(i + 1);
	     }, 100)
	   }, 1000);
	 }
	 document.querySelector('#playground').addEventListener('click', () => {
	   if (!clicksEnabled) return;

	   disableClicks()
	   userClicks++;
	   let boxId = event.target.id;
	   let box = document.querySelector(`#${boxId}`)
	   let num = box.getAttribute('data-el')
	   box.style.background = 'green'

	   var boxSetTimeOut = setTimeout(() => {
	     box.style.background = '#eee'
	   }, 800);

	   if (clickHandlers[userClicks - 1] != num) {
	     clearTimeout(boxSetTimeOut)
	     inValidSelection(box)
	     return;
	   }

	   if (userClicks == clickHandlers.length) {
	     completedStage()
	   } else {
	     enableClicks()
	   }
	 })

	 function completedStage() {
	   score++;
	   setScore();
	   setTimeout(() => {
	     perpareDemo()
	   }, 1200)
	 }

	 function inValidSelection(box) {
	   clickHandlers = []
	   userClicks = 0
	   box.classList.add('shake')
	   box.style.background = 'red'
	   setTimeout(() => {
	     box.classList.remove('shake')
	     box.style.background = '#eee'
	     score = 0;
	     setScore()
	     enableButton();
	     disableClicks()
	   }, 800);
	 }

	 function disableButton() {
	   document.querySelector("#playGame").disabled = true
	 }

	 function enableButton() {
	   document.querySelector("#playGame").disabled = false
	 }

	 function enableClicks() {
	   clicksEnabled = true;
	 }

	 function disableClicks() {
	   clicksEnabled = false;
	 }

	 function setScore() {
	   document.querySelector("#score").innerHTML = score;
	   highscore = Math.max(Math.max(highscore, score), localStorage.getItem('highscore'))
	   localStorage.setItem('highscore', highscore)
	   document.querySelector("#highscore").innerHTML = highscore;
	 }
