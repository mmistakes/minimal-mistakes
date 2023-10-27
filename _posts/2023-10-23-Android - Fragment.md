---
layout: single
title:  "Android - Fragment"
categories: Android
tag: [Android, Fragment]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆Fragment

프래그먼트는 탭 메뉴나 스와이프(Swipe)로 화면 간 이동을 할 때 사용된다.

<a href="https://developer.android.com/guide/components/fragments?hl=ko">안드로이드 fragment document</a>



# ◆프래그먼트 사용방법



## 1. 프래그먼트 추가

1.java디렉터리 패키지 추가하여 [New] - [Fragment] - [Fragment(Blank)]선택해서 추가해준다.

```kotlin
// fragment Activity

class ListFragment : Fragment() {

    var mainActivity : MainActivity? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        var binding = FragmentABinding.inflate(inflater, container, false)
        return binding.root
    }
    

    override fun onAttach(context: Context) {
        super.onAttach(context)
        mainActivity = context as MainActivity
    }
}
```

inflater : 레이아웃 파일을 로드하기 위한 레이아웃 인프레이터를 기본으로 제공

container: 프래그먼트 레이아웃이 배치되는 부모 레이아웃

savedInstanceState : 상태값 저장을 위한 보조  도구.

onCreateView의 역할은 액티비티가 프래그먼트를 요청하면 onCreateView()메서드를 통해 뷰를 만들어서 보여줌.



## 2. 메인 레이아웃에 프래그먼트 추가하기

fragment 컨테이너를 사용하면 소스코드를 거치지 않고 레이아웃 파일에서도 위젯처럼 프래그먼트를 추가할 수 있다.

```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <FrameLayout
        android:id="@+id/frameLayout"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginTop="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2"/>
    }
```

<br>







## 3. 메인 액티비티에 프래그먼트 연결하기

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setFragment()
    }

    fun setFragment(){
        //ListFragment 생성
        val listFragment: ListFragment = ListFragment()

        //액티비티가 가지고 있는 프래그먼트 매니저를 통해서 트랜잭션 시작 begin transaction
        val transaction = supportFragmentManager.beginTransaction()
        //add fragment
        transaction.add(R.id.frameLayout, listFragment) // fameLyout(main꺼)에 교체해 주겠다.
        //뒤로가기 버튼
        transaction.addToBackStack("null")
        //commit transaction
        transaction.commit()

    }
}
```

**addToBackStack으로 프래그먼트 트랜잭션을 백스택에 담을 수 있습니다.**
addToBackStack을 사용하면 프래그먼트를 삽입하기 위해 사용되는 트랜잭션을 마치 하나의 액티비티처럼 백스택에 담아둘 수 있습니다. 
주의할 점은 개별 프래그먼트가 스택에 담기는 것이 아니라 트랜잭션 전체가 담기기 때문에 add나 replace에 상관없이 해당 트랜잭션 전체가 제거됩니다.

<br>









# ◆프래그먼트의 생명 주기 관리

**생성 주기 메서드**

| 생성 주기 메서드 | 내용                                                         |
| ---------------- | ------------------------------------------------------------ |
| onAttach()       | 프래그먼트 매니저를 통해 액티비티에 프래그먼트가 추가되고 commit 되는 순간 호출됩니다. 액티비티 소스 코드에서 var fragment = Fragment() 형태로 생성자를 호출하는 순간에는 호출되지 않습니다. 파라미터로 전달되는 Context를 저장해 놓고 사용하거나 또는 Context로부터 상위 액티비티를 꺼내서 사용합니다. 객체지향의 설계구조로 인해 onAttach()를 통해 넘어오는 Context에서만 상위 액티비티를 꺼낼 수 있습니다. API레벨 23 이전에서는 onAttach() 메서드의 파라미터로 액티비티를 사용할 수 있었지만 23이상 부터는 Context만 받도록 변경되었습니다. |
| onCreate()       | 프래그먼트가 생성됨과 동시에 호출됩니다. 사용자가 인터페이스인 뷰와 관련된 것을 제외한 프래그먼트 자원(주로 변수)을 초기화할때 사용합니다. |
| onCreateView(0   | 사용자 인터페이스와 관련된 뷰를 초기화하기 위해 사용합니다.  |
| onStart()        | 액티비티의 startActivity로 새로운 액티비티를 호출하는 것처럼 프래그먼트가 새로 add되거나 화면에서 사라졌다가 다시 나타나면 onCreateView()는 호출되지 않고 onStart()만 호출됩니다. 주로 화면 생성 후에 화면에 입력될 값을 초기화하는 용도로 사용합니다. |
| onResume()       | onStart()와 같은 용도로 사용됩니다. 다른 점은 소멸 주기 메서드가 onPause() 상태에서 멈췄을 때 (현재 프래그먼트의 일부가 가려지지 않았을 때)는 onStart()를 거치지 않고 onResume()이 바로 호출된다는 점입니다. |

<br>





**소멸 주기 메서드**

| 소멸 주기 메서드 | 내용                                                         |
| ---------------- | ------------------------------------------------------------ |
| onPause()        | 현재 프래그먼트가 화면에서 사라지면 호출됩니다. 주로 동영상 플레이어를 일시정지한다든가 현재 작업을 잠시 멈추는 용도로 사용됩니다. |
| onStop()         | onPause()와 다른 점은 현재 프래그먼트가 화면에 일부분이라도 보이면 onStop()은 호출되지 않습니다. 예를 들어 add되는 새로운 프래그먼트가 반투명하면 현재 프래그먼트의 생명 주기 메서드는 onPause()까지만 호출됩니다. 동영상 플레이어를 예로 든다면 일시정지가 아닌 정지를 하는 용도로 사용됩니다. |
| onDestroyView()  | 뷰의 초기화를 해제하는 용도로 사용됩니다. 이 메서드가 호출된 후에 생성 주기 메서드인 onCreateView()에서 인플레이터로 생성한 View가 모두 소멸됩니다. |
| onDestroy()      | 액티비티에는 아직 남아있지만 프래그먼트 자체는 소멸됩니다. 프래그먼트에 연결된 모든 자원을 해제하는 용도로 사용됩니다. |
| onDetach()       | 액티비티에서 연결이 해제됩니다.                              |



참고 블로그 : <a href="https://mrdevelop.tistory.com/entry/5-3-프래그먼트-2021-03-12">#5-3. 프래그먼트 2021-03-12 (mrdevelop.tistory.com)</a>
