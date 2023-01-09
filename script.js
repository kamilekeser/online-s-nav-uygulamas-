let sunucudandönen;

var bağlantı = new XMLHttpRequest();
bağlantı.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    sunucudandönen = JSON.parse(bağlantı.responseText);
    sorugetir();
  }
};
bağlantı.open("GET", "data.json", true);
bağlantı.send();

const exam = document.getElementById("exam");
const question = document.getElementById("question");
const select = document.getElementsByName("select");

const selectA = document.querySelectorAll("#selectA");
const selectB = document.querySelectorAll("#selectB");
const selectC = document.querySelectorAll("#selectC");
const selectD = document.querySelectorAll("#selectD");
const button = document.getElementById("gönder");

let puan = 0;
let sıra = 0;
let sıradakisoru;

function sorugetir() {
  sıradakisoru = sunucudandönen?.questions[sıra];
  question.innerHTML = sıradakisoru?.exam;
  selectA[1].innerText = sıradakisoru.selectA;
  selectB[1].innerText = sıradakisoru.selectB;
  selectC[1].innerText = sıradakisoru.selectC;
  selectD[1].innerText = sıradakisoru.selectD;
  secenektemizle();
}

function secenektemizle() {
  select.forEach((item) => (item.checked = false));
}

function secimAl() {
  let seçim;
  select.forEach((select) => {
    if (select.checked === true) {
      seçim = select.id;
    }
  });
  return seçim;
}

button.addEventListener("click", () => {
  const secilen = secimAl();
  if (secilen === sıradakisoru.answer) {
    if (sıra < sunucudandönen.questions.length - 1) {
      sıra++;
      sorugetir();
    } else {
      exam.innerHTML = "Sorular bitti tebrikler";
    }
  } else {
    alert("Yanlış cevap");
  }
});
