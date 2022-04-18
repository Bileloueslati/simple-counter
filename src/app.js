import SimpleCounter from "./simpleCounter";

const element = document.getElementById("counter");

const endDate = Date.now() + 10000;

const counter = new SimpleCounter(new Date(), new Date(endDate), element);

counter.start();

counter.on("finish", (el) => {

      el.innerHTML = "It's done !";
})

