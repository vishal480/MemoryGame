const section = document.querySelector("section");
const lives = document.querySelector("span");
const button=document.querySelector('.button')
var totalLives = 10;
var clicked1;
var totalScore = 0;
lives.textContent = totalLives;

section.style.pointerEvents = "none";
const getData = () => [
  { color: "teal", name: "teal" },
  { color: "green", name: "green" },
  { color: "aqua", name: "aqua" },
  { color: "yellow", name: "yellow" },
  { color: "#DD4124", name: "tango" },
  { color: "#A0DAA9", name: "orange" },
  { color: "#EC9787", name: "pink" },
  { color: "#6B5B95", name: "blue" },
  { color: "teal", name: "teal" },
  { color: "green", name: "green" },
  { color: "aqua", name: "aqua" },
  { color: "yellow", name: "yellow" },
  { color: "#DD4124", name: "tango" },
  { color: "#A0DAA9", name: "orange" },
  { color: "#EC9787", name: "pink" },
  { color: "#6B5B95", name: "blue" },
];

//refresh
button.addEventListener('click',()=>{
  location.reload();
});

function randomize() {
  const data = getData();
  data.sort(() => Math.random() - 0.5);
  return data;
}
const cardGenerator = () => {
  const data = randomize();
  data.forEach((item) => {
    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");
    front.style.backgroundColor = item.color;
    card.setAttribute("name", item.name);
    card.classList = "card";
    front.classList = "front";
    back.classList = "back";
    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    card.style.pointerEvents = "all";
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
//generates cards
cardGenerator();
function checkCards(e) {
  // console.log(e)
  const clicked = e.path[1];
  // console.log(clicked);

  clicked.classList.add("flip");
  const fcard = document.querySelectorAll(".flip");
    console.log(fcard);
  if (fcard.length == 1) {
    clicked.style.pointerEvents = "none";
    clicked1 = clicked;
  }
  if (fcard.length === 2) {
    console.log(fcard[0].getAttribute("name"));
    clicked1.style.pointerEvents = "all";

    if (fcard[0].getAttribute("name") === fcard[1].getAttribute("name")) {
      console.log("match");
      fcard.forEach((element) => {
        element.classList.remove("flip");
        element.style.pointerEvents = "none";
      });
      totalScore += 1;
    } else {
      console.log("no match");
      fcard;
      fcard.forEach((element) => {
        element.classList.remove("flip");
        setTimeout(() => element.classList.remove("toggleCard"), 500);
      });
      totalLives--;
      lives.textContent = totalLives;
      if (totalLives === 0) {
        restart("you loose!! TRY AGAIN");
      }
    }
  }
  if (totalScore === 8) {
    console.log("you won");
    setTimeout(()=>{
    restart("Awesome you won!! PLAY AGAIN");
    },1000);
    
  }
}
const restart = (text) => {
  const data = randomize();
  totalScore=0;
  // console.log(data);
  const front = document.querySelectorAll(".front");
  const card = document.querySelectorAll(".card");
  data.forEach((item, index) => {
    card[index].classList.remove("toggleCard");

    setTimeout(() => {
      card[index].style.pointerEvents = "all";
      front[index].style.backgroundColor = item.color;
      card[index].setAttribute("name", item.name);
    }, 1000);
  });
  totalLives = 10;
  lives.textContent = totalLives;
  setTimeout(() => {
    window.alert(text);
  }, 100);
};
