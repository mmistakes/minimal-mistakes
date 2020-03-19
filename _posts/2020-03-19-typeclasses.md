---
title: "Typeclasses - FP Ladder 02"
excerpt: "Twoja furtka do uzależniania od programowania funkcyjnego"
categories: [scala, fp, fp-ladder, typeclass]
classes: wide
---
Wpis ten jest dość długi, ale zależy mi, żeby był _(względnie) kompletnym wstępem_ do idei _typeclass_ w Scali. Nie jest to koncept łatwy, ale jest niezbędny do wejścia powyżej poziomu podstawowego w Scali.

Polimorfizm jest jedną z podstawowych technik programowania w językach wysokiego poziomu. Jest bardzo popularny w językach obiektowych - i słusznie. Będąc wierny _jedynej słusznej drodze (JSD)_, czyli programowaniu funkcyjnemu, sądzę, że _polimorfizm o smaku ad-hoc_ pozwala pisać w sposób naturalny kod, który jest bardziej modularny oraz uniwersalny.

## Czym jest typ, klasa, klasa typów?

Zacznijmy od rozplątanie pojęć, które bywają używane zamiennie w kontekście tematu _typeclass_. Na końcu tej części powinno być jasne, czym ów twór jest.
 1. Zbiór - w kontekście matematycznym - chyba najtrudniejsze do zdefiniowiania pojęcie. Jest to fundamentalne pojęcie _teorii mnogości_(Mnogość to inaczej zbiór, więc to po prostu teoria zbiorów). _Fundamentalne_ oznacza tu, że jest to pojęcie tak pierwotne, że jest częściowo przyjmowane na zasadzie - "czym jest zbiór, każdy widzi" (to oczywiście zależy od podejścia do teorii mnogości jakie przyjmiemy, ale to wykracza poza nasze potrzeby). Intuicyjne jest to pewna kolekcja arbitralnie wybranych przez nas elementów.  
Ważniejsze są cechy zbioru - dany element może należeć do zbioru lub też nie, ale nie może przynależeć do niego dwukrotnie. Zbiór jest jednoznacznie wyznaczony przez jego elementy. To _tylko_ tyle i _aż_ tyle.
 2. Typ - w ujęciu programistycznym - znane nam dobrze `Int`, `String`, `List[T]`, czy też stworzone przez nas `class Animal`, `trait Money`, `object Earth`. Jest to cecha danych, która mówi kompilatorowi w jaki sposób chcemy użyć danych i na jakie operacje powinien nam na nich pozwolić. Zwróćmy uwagę na analogię pomiędzy zbiorem a typem, posłużmy się do tego funkcją:  
```scala
def isDivisableBy3(x: Int): Boolean = x % 3 == 0
```
Funkcja ta sprawdza, czy przekazany `Int` jest podzielny przez `3`. Informuje nas o to zwracając odpowiednią wartość `true` lub `false`. Spójrzmy na to jednak z małą matematyczną lupą. Zdefiniowaliśmy funkcję, która przypisuje elementom zbioru `Int` któryś z elementów zbioru `Boolean`. Tak więc wartości `true`, `false` należą do zbioru `Boolean` - stąd też ich typ. Analogicznie ze zbiorem `Int`, będącego skończonym podzbiorem liczb całkowitych.
 3. Klasa - w ujęciu matematycznym - Pojęcie jest używane w matematyce, gdy mamy do czynienia z _wielością_ (celowo nie zbiorem), który jest zbyt liczny i odrobinę zbyt zaskakujący, żeby go badać przy pomocy narzędzi teorii mnogości. Na nasze potrzeby wystarczy intuicja, mówiąca, że _klasa to grupa obiektów, która jest określona przez pewną wspólną własność_.
 4. Klasa - w ujęciu programistycznym - liczę na to, że czytelnik jest zaznajomiony z tym pojęciem. Ewentualną dygresją, którą warto dodać, że jest to pewne narzędzie, które służy nam do modelowania domeny problemu.
 5. Klasa typów - _typeclass_ - Jest to połączenie konceptu klasy matematycznej z typem programistycznym. Więc mówiąc _typeclass_ mamy na myśli pewną _grupę typów, które mają jakąś wspólną własność_. W praktyce przez wspólną własność zazwyczaj rozumiemy określoną na tych typach funkcję. 

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

Zanim jednak wypłyniemy na wzburzone morza _typeclass_ o modularności. Jestem zwolennikiem seperacji _zachowania_ danych od ich _definicji_. Programiści (w tym ja!) często - przypadkiem - doprowadzają często do splątania tych dwóch rzeczy, a to w efekcie zmniejsza modularność naszego kodu. Zmniejszenie modularności powoduje, że nasz kod jest ciężej używać w różnych, niezależnych od siebie miejscach, ciężej go testować i ogólnie zwiększa stopień "kaszanowatości" rozwiązania. Wyobraźmy sobie nie najlepiej zamodelowaną klasę:
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

## Do rzeczy - jak ten _typeclass_ wygląda w Scali?

Żeby zdefiniować klasę typów, które będą mogły być serializowane do JSON możemy zacząć od definicji `trait`:
```scala
trait JsonEncodable[A] {
   def toJsonString(a: A): String
}
```
A cóż to za parametr `A`? Naszą klasą typów jest `JsonEncodable` natomiast z punktu widzenia języka programowania będziemy musieli w jakiś sposób pokazać, że dany typ przynależy do klasy `JsonEncodable` - odbędzie się to przez implementację `JsonEncodable`:

```scala
object Account {
  implicit val enc: JsonEncodable[Account] = new JsonEncodable {
    override def toJsonString(account: Account): String = ??? // we do not care about implementation.
  }
}

```
Teraz żeby zserializować obiekt Account możemy napisać:

```scala
val account: Account = Account("id", 100)
val jsonString: String = Account.enc.toJsonString(account)
```

Możemy pozwolić sobie również tworzenie generycznych funkcji:
```scala
def genericToJsonString[A](a: A, ev: JsonEncodable[A]) = ev.toJsonString(a)
```

### Po co to wszystko?

Pierwszą zaletą jest fakt odseperowania zachowania od definicji danych. Kolejną jest przekazanie części pracy kompilatorowi, funkcja `genericToJsonString[A]` wymaga zaimplementowanego `ev: JsonEncodable[A]` (`ev` jest skrótem od _evidence_).  
Drugą jest możliwość deklarowania różnych implementacji dla kompletnie różnych typów, które same w sobie nie muszą być ze sobą w żaden sposób związane (musi istnieć odpowiednia implementacja `JsonEncodable` dla typu `A`) - nazywamy to [_ad-hoc polymorphism_](https://en.wikipedia.org/wiki/Ad_hoc_polymorphism). Zwróć uwagę na fakt, że w żaden sposób nie narzuciliśmy ograniczeń na typ `A`.
Trzecią zaletą możliwość rozszerzanie funkcjonalności typów bez dostępu do ich kodu źrodłowego (`JsonEncodable[Account]` możemy zaimplementować bez dostępu do kodu źrodłowego `Account`).

### No strasznie to brzydkie

Faktycznie zapis `def genericToJsonString[A](a: A, ev: JsonEncodable[A]) = ev.toJsonString(a)` wygląda dość ociężale. Scala jednak pozwala na kilka uproszczeń.
```scala
def genericToJsonString[A](a: A)(implicit ev: JsonEncodable[A]) = ev.toJsonString(a)
```
Wtedy serializacja typu `Account` będzie uproszczona - tak długo jak w zasięgu kompilatora będzie `implicit val enc: JsonEncodable[A]`. Obecnie zdeklarowaliśmy go w companion object `Account`, więc zawsze gdy zaimportujemy `Account` pojawi się nasz encoder, co pozwoli nam napisać:
```scala
val account: Account = Account("id", 100)
val jsonString: String = genericToJsonString(account)
```

Kolejnym uproszczeniem jest następujący zapis:
```scala
def genericToJsonString[A: JsonEncodable](a: A) = JsonEncodable[A].toJsonString(a)
```
Żeby jednak kompilator był zadowolony (zadowolony kompilator to sprawa istotna) musimy stworzyć companion object do `JsonEncodable`:
```scala
object JsonEncodable {
  def apply[A](implicit ev: JsonEncodable[A]): JsonEncodable[A] = ev
}
```
To pozwoli nam również na zapis:
```scala
val account: Account = Account("id", 100)
val jsonString: String = genericToJsonString(account)
```
Alterantywnie bez deklaracji companion object możemy pokusić się o takie sformułowanie:
```scala
def genericToJsonString[A: JsonEncodable](a: A) = implicitly[JsonEncodable[A]].toJsonString(a)
```
Można (i należy) dalej "upiększać" przy pomocy _interface syntax_ lub _interface object_, o których warto przeczytać [tu](https://alvinalexander.com/scala/fp-book/type-classes-101-introduction)

### Podsumowanie implementacji

Żeby zaimplementować _typeclass_ musimy zrobić przynajmniej poniższe dwie rzeczy:
 1. Zdefiniować _typeclass_-ę jako generyczny (sparametryzowany przynajmniej przez jeden typ) `trait`, na przykład `JsonEncodable[A]`.
 2. Przynajmniej jedną implementację powyższej _typeclass_-y - w naszym wypadku była to `implicit val enc: JsonEncodable[Account] = ...`.

## Podsumowanie 

Mam nadzieję, że ten artykuł przybliżył Wam koncept _typeclass_-y. Jest to tylko wstęp, więc nie miej sobie za złe, jeżeli nie od razu widzisz zastosowania tej techniki. Postaram się to zmienić w kolejnych wpisach. Jest to jednak niezbędna widza, jeżeli chce się wejść na odrobinę wyższy poziom w Scali niż użycie `map` i `filter`.
