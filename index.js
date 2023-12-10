const answer = "KITTY";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "축하합니다! 정답입니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw;";
    document.body.appendChild(div);
  };
  const nextline = () => {
    if (attempts === 6) return gameend();
    attempts += 1;
    index = 0;
  };

  const gameend = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
  };

  const handlekeyBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleEnterkey = () => {
    let ok = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputtext = block.innerText;
      const soltext = answer[i];
      if (inputtext === soltext) {
        ok += 1;
        block.style.background = "#6aaa64";
      } else if (answer.includes(inputtext)) block.style.background = "#c9b458";
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }

    if (ok === 5) gameend();
    else nextline();
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handlekeyBackspace(thisBlock);
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const starttimer = () => {
    const stt = new Date();

    function setTime() {
      const nowtime = new Date();
      const runtime = new Date(nowtime - stt);
      const min = runtime.getMinutes().toString().padStart(2, "0");
      const sec = runtime.getSeconds().toString().padStart(2, "0");
      const timedisplay = document.querySelector(".time");
      timedisplay.innerText = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };
  starttimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
