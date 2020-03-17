---
title: "Typeclasses - FP Ladder 02"
excerpt: "Twoja furtka do uzależniania od programowania funkcyjnego"
categories: [scala, fp, fp-ladder, typeclass]
classes: wide
---
https://medium.com/@olxc/type-classes-explained-a9767f64ed2c
https://dotty.epfl.ch/docs/reference/contextual/typeclasses.html
http://learnyouahaskell.com/types-and-typeclasses
https://en.wikipedia.org/wiki/Type_class
https://typelevel.org/cats/typeclasses.html
Wpis ten jest dość długi, ale zależy mi, żeby był _kompletnym wstępem_ do idei typecless w Scali. Nie jest to koncept łatwy, ale jest niezbędny do wejścia powyżej poziomu podstawowego w Scali.

Polimorfizm jest jedną z podstawowych technik programowania w językach wysokiego poziomu. Jest bardzo popularny w językach obiektowych - i słusznie. Będąc wierny _jedynej słusznej drodze (JSD)_, czyli programowaniu funkcyjnemu, sądzę, że _polimorfizm o smaku ad-hoc_ pozwala pisać w sposób naturalny kod, który jest bardziej modularny oraz uniwersalny.

## Czym jest typ, klasa, klasa typów?

Zacznijmy od rozplątanie pojęć, które bywają używane zamiennie w kontekście tematu `typeclass`. Na końcu tej części powinno być jasne, czym ów twór jest.
 1. Zbiór - w kontekście matematycznym - chyba najtrudniejsze do zdefiniowiania pojęcie. Jest to fundamentalne pojęcie _teorii mnogości_(Mnogość to inaczej zbiór, więc to po prostu teoria zbiorów). _Fundamentalne_ oznacza tu, że jest to pojęcie tak pierwotne, że jest częściowo przyjmowane na zasadzie - "czym jest zbiór, każdy widzi" (to oczywiście zależy od podejścia do teorii mnogości jakie przyjmiemy, ale to wykracza poza nasze potrzeby). Intuicyjne jest to pewna kolekcja arbitralnie wybranych przez nas elementów.  
Ważniejsze są cechy zbioru - dany element może należeć do zbioru lub też nie, ale nie może przynależeć do niego dwukrotnie. Zbiór jest jednoznacznie wyznaczony przez jego elementy. To _tylko_ tyle i _aż_ tyle.
 2. Typ - w ujęciu programistycznym - znane nam dobrze `Int`, `String`, `List[T]`, czy też stworzone przez nas `class Animal`, `trait Money`, `object Earth`. Jest to cecha danych, która mówi kompilatorowi w jaki sposób chcemy użyć danych i na jakie operacje powinien nam na nich pozwolić. Zwróćmy uwagę na analogię pomiędzy zbiorem a typem, posłużmy się do tego funkcją:  
```scala
def isDivisableBy3(x: Int): Boolean = x % 3 == 0
```
Funkcja ta sprawdza, czy przekazany `Int` jest podzielny przez `3`. Informuje nas o to zwracając odpowiednią wartość `true` lub `false`. Spójrzmy na to jednak z małą matematyczną lupą. Zdefiniowaliśmy funkcję, która przypisuje elementom zbioru `Int` któryś z elementów zbioru `Boolean`. Tak więc wartości `true`, `false` należą do zbioru `Boolean` - stąd też ich typ. Analogicznie ze zbiorem `Int`, będącego skończonym podzbiorem liczb całkowitych.
 3. Klasa - w ujęciu matematycznym - Pojęcie jest używane w matematyce, gdy mamy do czynienia z _wielością_ (celowo nie zbiorem), który jest zbyt liczny i odrobinę zbyt zaskakujący, żeby go badać przy pomocy narzędzi teorii mnogości. Na nasze potrzeby wystarczy intuicja, mówiąca, że _klasa to grupa obiektów, która jest określona przez pewną wspólną własność_.
 4. Klasa - w ujęciu programistycznym - liczę na to, że czytelnik jest zaznajomiony z tym pojęciem. Ewentualną dygresją, którą warto dodać, że jest to pewne narzędzie, które służy nam do modelowania domeny problemu.
 5. Klasa typów - `typeclass` - Jest to połączenie konceptu klasy matematycznej z typem programistycznym. Więc mówiąc `typeclass` mamy na myśli pewną _grupę typów, które mają jakąś wspólną własność_. W praktyce przez wspólną własność zazwyczaj rozumiemy określoną na tych typach funkcję. 

Przykładem, który weźmiemy sobię pod lupę jest serializacja danych do formatu JSON. Naszym bardzo (a nawet bardzo, bardzo - nie bieżcie go za wzór przy modelowaniu czegokolwiek) uproszczonym punktem początkowym będzie
```scala
case class Account(id: String, balance: BigDecimal) {
  def toJsonString: String = ??? // we do not care about implementation
}

case class Dog(name: String, breed: String, weight: Int) {
  def toJsonString: String = ??? // we do not care about implementation
}
```
Bez żadnego naciągactwa możemy powiedzieć, że chcielibyśmy wprowadzić pewną klasę typów, która pozwoli nam mówić o klasach, które możemy serializować do formatu JSON.

## Seperacja zachowania od danych

Zanim jednak wypłyniemy na wzburzone morza `typeclass` o modularności. Jestem zwolennikiem seperacji _zachowania_ danych od ich _definicji_. Programiści (w tym ja!) często - przypadkiem - doprowadzają często do splątania tych dwóch rzeczy, a to w efekcie zmniejsza modularność naszego kodu. Zmniejszenie modularności powoduje, że nasz kod jest ciężej używać w różnych, niezależnych od siebie miejscach, ciężej go testować i ogólnie zwiększa stopień "kaszanowatości" rozwiązania. Wyobraźmy sobie nie najlepiej zamodelowaną klasę:
```scala
case class Account(id: String, balance: BigDecimal) {
  def toJsonString: String = ??? // we do not care about implementation

  def closeAccount: ClosingResult = ??? 

  def buyDog(dog: Dog, money: BigDecimal): Dog = ???
}
```
Mamy do czynienia tutaj z pomieszaniem z poplątaniem. Moduł naszej aplikacji odpowiedzialny za zamykanie i autoryzacje kont teraz jest pośrednio zależny od `buyDog` - jeżeli zmienia się definicja tej funkcji, wszyscy użytkownicy tej klasy muszą zostać o tym poinformowani. W mojej ocenie co jest jeszcze gorsze dajemy możliwości kupowania psów modułowi autoryzacyjnemy oraz zamykania konta modułowi odpowiedzialnymi za sprzedaż piesków! Pozwól danym być danymi, nie zmuszaj ich do niewolniczej pracy. 

Podejście to jest oczywiście efektem dobrych praktyk programistycznych (single responsibility principle, seperation of concerns i innych). 

Co to nam mówi o "serializowalnym" `Account` i `Dog`? Nie powinniśmy plątać definicji serializacji i definicji danych. 

## Do rzeczy - jak ten `typeclass` wygląda w Scali?

Żeby zdefiniować klasę typów, które będą mogły być serializowane do JSON możemy zacząć od definicji `trait`:
```scala
trait JsonEncodable[A] {
   def toJsonString(a: A): String
}
```
A cóż to za parametr `A`? Naszą klasą typów jest `JsonEncodable` natomiast z punktu widzenia języka programowania będziemy musieli w jakiś sposób pokazać, że dany typ przynależy do klasy `JsonEncodable` - odbędzie się to przez implementację `JsonEncodable`:

```

```

### No strasznie to brzydkie

### Podsumowanie implementacji
#### Dygresja: argumenty domyślne
## Podsumowanie 
