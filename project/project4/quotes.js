const quotes = [
  {
    quote:
      "포기하지마. 누구나 한 두번의 실패는 있을 수 있는거야. 이런 일로 약해지지마.  네 자신을 믿어. 이번엔 꼭 성공 할거야",
    author: "-신태일-",
  },
  {
    quote:
      "어차피 다 지나간 일이니까 너무 그렇게 자신을 탓하지마. 우린 앞으로 모든 일에 긍정적으로 생각하자고",
    author: "-미나-",
  },
  {
    quote:
      "메튜라는 사람은 이 세상에 단 한명 밖에 없어. 근데 넌 왜 자꾸 너랑 태일이를 비교하는거야? 태일이랑 네가 다른건 당연하잖아!",
    author: "-파피몬-",
  },
  {
    quote: "자신이 없어도 해야 돼. 지금 이대로 있을 순 없잖아",
    author: "-리키-",
  },
  {
    quote:
      "여기선 앞으로 전진하는 것 말곤 방법이 없다는 거 알아. 하지만 사람이란 때론 한 발짝 뒤로 물러서서 생각해보고 싶을 때도 있는거라고",
    author: "-메튜-",
  },
  {
    quote:
      "나를 아껴주고, 이해해주고 서로 진심으로 믿고 따르는 마음이 있다면 디지몬은 디지몬답게 사람은 훨씬 더 사람답게 살 수있어",
    author: "-아구몬-",
  },
  {
    quote: "내가 해온 모든 일이, 내가 살아왔던 둘도 없는 증거인 거야",
    author: "-아구몬-",
  },
  {
    quote:
      "산다는 건 그런거야 무엇이든 잘 될 거라고는 할 수 없어.비참하다고, 이제 다른이의 얼굴을 볼 수 없다고 해도 참고 살아야 하는거야",
    author: "-추추몬-",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
