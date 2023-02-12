---
layout: single
title: "컴포기본"
categories: React
tag: [React_Grammar,Nomad]
---

```react
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    function Title() {
      return (
        <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
          hello im title
        </h3>
      );
    }
    const Button = () => (
      <button
        style={{ backgroundColor: "tomato" }}
        onClick={() => console.log("imclicked")}
      >
        Clickme
      </button>
    );

    const Container = () =>  (
      <div>
        <button></button>
        <Title />
        <Button />
      </div>
    );
    ReactDOM.render(<Container />, root);
  </script>
</html>

```

