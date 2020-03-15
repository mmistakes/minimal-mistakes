---
title: "Immutable Data - FP Ladder 01"
excerpt: "Zmiana nie zawsze jest dobra"
categories: [scala, fp, itpf]
classes: wide
---
W pracy mam przyjemność pomagać przy rekrutacji, co czasami wiąże się ze sprawdzeniem kawałka kodu napisanego w Scali. Jakość tych rozwiązań jest - oczywiście - na różnym poziomie, ale często przewijają się podobne błędy, szczególnie u osób zaczynających przygodę ze Scalą/FP. Jednym z takich błędów jest używanie _zmiennych_ (_variables_) oraz _zmiennych struktur danych_ (_mutable data structures_). W tym wpisie zaprezentuję naturalną dla Scali (i innych typowanych języków pozwalających na programowanie funkcyjne) alternatywę. 

## Zmienna i stała

Używając Scali możemy określić wartość na dwa podstawowe sposoby `var` oraz `val`. `var` jest skrótem od angielskiego `variable`, dosłownie oznaczającą _zmienną_, `val` natomiast jest skrótem od `value` oznaczającego _wartość_. Zanim przejdziemy dalej, sądzę że należy rozprawić się z pewnym splątaniem tych pojęć.
 1. W Scali, kiedy mówię o zmiennej mogę mieć na myśli zarówno `var x: Int` i `val x: Int`, a to nie pomaga. W praktyce, w związku z tym, że praktycznie nigdy nie używam `var` - mam na myśli `val`. Podobnie jest w innych językach typowanych, np. w Javie zmienną nazwę zarówno `int x` jak i `final int x`.
 2. W matematyce zmienna oznacza zazwyczaj wielkość, która może przyjmować wartości z określonego zbioru. Zmienną można _ustalić_, czyli określić konkretną wartość i już się jej trzymać - nazwiemy wtedy ją stałą.

Warto zwrócić uwagę na pewną analogię pomiędzy tymi dwoma konstruktami, szczególnie na określenie _typu_ w Scali oraz idee _zbioru_ w matematyce. 

### Co to za różnica?

Słuszne pytanie! Zobaczmy więc jak zachowa się Scala, kiedy będziemy chcieli nadpisać wartość `var` oraz `val`.
```scala
scala> var x = 3
x: Int = 3

scala> x = 4
x: Int = 4

scala> val y = 3
y: Int = 3

scala> y = 5
<console>:12: error: reassignment to val
       y = 5
```
Okazuje się, że do `val` nie można ponownie przypisać wartości. Wydaje mi się, że zasadą, której należy się trzymać jest: **Używaj tylko `val`, chyba że bardzo dobrze wiesz co robisz**. Jest to podejście, które pozwoli szybciej wdrożyć się w _jedyną słuszą drogę (JSD)_, tj. programowanie funkcyjne. W mojej ocenie, nie korzystanie z narzędzi jakie Scala daje, tak by sprawnie pisać funkcyjnie jest powodem, żeby w ogóle ze Scali zrezygnować. 

Oczywiście dobrze byłoby uzasadnić pogląd wyższości `val` nad `var`. W mojej ocenie kluczową zaletą jest _odciążenie mózgu_. Istnieje duże prawdopodobieństwo, że jest to spowodowane moimi umiarkowanymi mocami intelektualnymi. Zawsze byłem pełen podziwu dla osób, które są w stanie spamiętać, gdzie i kiedy każdy konkretny `var` się zmienia. Pamiętają też, żeby pilnować te wartości w środowisku wielowątkowym. Być może część funkcjonalności jest poprawnie oddelegowana do innej metody, która oddelegowuje gdzieś dalej, a oni wciąż pamiętają każdą zmianę. Ja niestety takich talentów nie posiadam, więc _uproszczenie_ i _usystematyzowanie_ myślenia o kodzie jest dla mnie wartościowe. 

Możliwość _metodycznego_ i _systematycznego_ myślenia o kodzie jest dla mnie ważna i zwięszka zaufanie do tego co piszę ja oraz osoby, z którymi pracuję. Czytając wtedy kod, wiem, że nie ma gdzieś ukrytej wartości, która może - zazwyczaj w nietrywialnej sytuacji brzegowej - wporwadzić w osłupienie i skierać na nieprzetarte szlaki z wiernym debuggerem.

## Co ze strukturami danych?

Jeżeli takie zalety mają pojedyncze zmienne, to chicelibyśmy je generalizować na struktury danych. Na szczęście, rzeczywiście tak jest. W obrębie tego wpisu _struktury danych_ rozumiem głównie klasy tworzone przez programistów, chociaż przenosi się to na "klasycznie" rozumiane struktury danych takie jak listy, słowniki, czy drzewa. W tym wypadku zazwyczaj w celach optymalizacyjnych implementacje zawierają jakiś stan, który jednak nie powinien wyciekać do użytkownika API takiej struktury. 

Wróćmy do tworzonych przez nas klas oraz typów. Rozważmy uproszczony przykład konta bankowego, które posiada swój numer oraz stan dostępnych środków:
```
case class Account(var id: String, var balance: BigDecimal)
```
Jeżeli nawet odrobinę nie boli Cię widok takiej deklaracji, to powinien zacząć. Użycie `var` do określenia `id` jest zastanawiające niezależnie od tego z jakiej perspektywy patrzymy na nasz problem. Konto ma swój unikalny identyfikator i po utworzeniu nie powinniśmy móc go zmieniać. 

Można natomiast próbować argumentować użycie `var balance: BigDecimal`. Przecież jak dostaję wypłatę, to nie mam nowego konta z wypłatą, lecz jest to _to samo konto, którego stan jest powiększony o kwotę wypłaty_. Ciężko się z tym nie zgodzić. Należy jednak pamiętać, że nie mamy obowiązku modelować świata w sposób identyczny, mamy tylko przedstawić jego reprezentację. Część osób zaznajomionych z DDD może powiedzieć, że `Account` to typowy przykład _entity_ i związku z tym `balance` należy do pól, które mogą się zmieniać. W mojej ocenie jest to nadużycie koncepcji _entity_ wewnątrz języka programowania i nie używanie poprawnie jego narzędzi, które nam dostarcza. Oczywiście nie podważam tutaj ani istotności DDD, ani _entity_ przy modelowaniu domeny, po prostu nie wszystko należy przenosić dosłownie.

Konto po zwiększeniu kwoty nie staje się innym kontem. Jednak z punktu widzenia naszego kodu lepiej będzie, gdy wszystkie pola będą ustalone w momencie tworzenia, a do aktualizacji pól będziemy albo używać odpowienich metod, które będą zwracać _kopię obiektu z zaktualizowanymi wartościami_. W Scali każda `case class`a - a to właśnie ich powinniśmy używać do modelowania danych - ma metodę `copy`, która pozwala wygodnie zaktualizować wartość (są oczywiście jeszcze `lenses`, ale to podejście i temat przedyskutuję w oddzielnym wpisie). Poprawnie zamodelowana klasa `Account` i aktualizacja jej stanu powinna wyglądać następująco:
```scala
scala> case class Account(id: String, balance: BigDecimal)
defined class Account

scala> val acc = Account("id1", 0)
acc: Account = Account(id1,0)

scala> val accAfterPayday = acc.copy(balance = acc.balance + 100)
accAfterPayday: Account = Account(id1,100)
```
Zwróćmy uwagę, że w wypadku pominięcia słowa `var` Scala automatycznie uznaje pola klasy za niezmienne. _Zupełnie jakby chciała nam coś powiedzieć_. Oczywiście używanie `copy` może wydawać się dość siermiężne i należy używać odpowiednich technik - jak definiowanie dobrze nazwanych funkcji - by kod był siermiężny odrobinę mniej. Zasada, którą możemy wyciągnąć, mówi **Używaj tylko niezmiennych struktur danych, chyba, że masz bardzo dobry powód by było inaczej**. Z punktu widzenia użytkownika Twojej klasy - najlepiej, żeby API wyglądało jednak jakby było zupełnie _immutable_. 

## Podsumowanie

Temat ten dla kogoś, kto pracował ze Scalą jest oczywiście zupełnie podstawowy. Widzę jednak, że osoby przychodzące ze świata javascriptu, php i innych języków często właśnie w taki sposób próbują rozwiązywać problemy. Trzymanie się dwóch wytłuszczonych "zasad", które przytoczyłem pozwoli na pisanie kodu, który będzie odrobinę łatwiejszy w utrzymaniu, czytelniejszy oraz - jeżeli dopiero zaczynasz przygodę ze Scalą/FP - zadba o szybsze postępy i wykluczy pewne, zazwyczaj niezdrowe, nawyki.
