---
layout: single
title:  "Android - recyclerView"
categories: Android
tag: [Android, recyclerView]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>









# ◆recyclerView

RecyclerView는 대량의 데이터를 효율적으로 화면에 나타내기 위해서, 각 아이템을 목록형태로 화면에 나타내는데 사용된다.

<br>







## < recyclerView 구현항목 >



### 1. ViewHolder

ViewHolder는 **화면에 표시될 아이템 뷰를 저장하는 객체**이다.

RecyclerView는 몇 개의 뷰의 객체만 생성해서 재사용한다.. 그러기 위해서는 이런 뷰 객체를 기억하고 있을 객체가 필요하게 되는데, 그것이 바로 ViewHolder입니다.

<br>





### 2. Adpter

Adapter는 리스트를 화면에 표시하기 위해서 **아이템 단위로 View로 생성**을 해서 RecyclerView에 바인딩 시키는 작업을 하는 객체입니다. 개발자가 직접 작성하여 RecyclerView에 연결시킨다.

RecyclerView.Adapter을 상속받아서 새로운 어댑터를 생성해야 하고, 다음 3개의 메서드를 오버라이드를 해야 한다.

1) **onCreateViewHolder()** : ViewHolder 객체를 생성하고 초기화 합니다. 

2) **onBindViewHolder() **: 데이터를 가져와 ViewHolder안의 내용을 채워줍니다. 
3) **getItemCount()** : 총 데이터의 갯수를 반환하도록 합니다. 

<br>





### 3. LayoutManager

RecyclerView는 아이템 뷰를 수직, 수평, 격자(Grid) 형태의 레이아웃으로 배치할 수 있습니다. 이런 RecyclerView의 **레이아웃을 관리**하는 것이 LayoutManager입니다.

1. **LinearLayoutManager** : 수평 또는 수직 방향, 일렬(Linear)로 아이템 뷰 배치.

2. **GridLayoutManager** : 바둑판 모양의 격자(Grid) 형태로 아이템 뷰 배치.

3. **StaggeredGridLayoutManager** : 엇갈림(Staggered) 격자(Grid) 형태로 아이템 뷰 배치.

<br>







## < recyclerView 구현 >



### 1. Acivity_main.xml 에 RecyclerView 추가

```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.recyclerview.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/recyclerView"
    tools:context=".MainActivity">

</androidx.recyclerview.widget.RecyclerView>
```





### 2. item_sub.xml 

표시될 item 추가

```kotlin
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:id="@+id/item_root"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="16dp"
    android:layout_margin="8dp">

    <TextView
        android:id="@+id/item_data"
        android:layout_width="214dp"
        android:layout_height="35dp"
        android:layout_weight="1"
        android:textSize="16dp"
        android:textStyle="bold" />
</LinearLayout>
```





### 3. RecyclerView Adapter, ViewHolder,LayoutManager  구현

MainActivity에 구현

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //setContentView(R.layout.activity_main)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        //val subBinding = ActivitySubBinding.inflate(layoutInflater)

        var data = mutableListOf<String>()

        for (i in 1..15) {
            data.add("item ${i}")


        }

        //RecyclerView 출력
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = MyAdapter(data)
        binding.recyclerView.addItemDecoration(
            DividerItemDecoration(
                this,
                LinearLayoutManager.VERTICAL
            )
        )
    }

    // 뷰홀더
    class MyViewHolder(val binding: ActivitySubBinding) : RecyclerView.ViewHolder(binding.root)

    // Adapter
    class MyAdapter(val data: MutableList<String>) :
        RecyclerView.Adapter<RecyclerView.ViewHolder>() {


        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
            return MyViewHolder(
                ActivitySubBinding.inflate(
                    LayoutInflater.from(parent.context),
                    parent,
                    false
                )
            )
        }

        override fun getItemCount(): Int {
            Log.d("dataSize", "${data.size}")
            return data.size
        }

        override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
            val binding = (holder as MyViewHolder).binding
            //뷰에 데이터 출력
            binding.textView.text = data[position]

        }
    }
}
```





===> 여기에서 item을 클릭했을 때 이벤트를 주려면 onBindViewHolder에 아래의 코드 추가

```kotlin
 binding.textView.setOnClickListener {
    Toast.makeText(holder.itemView.context, "${data[position]}", Toast.LENGTH_SHORT)
        .show()
    val intent = Intent(holder.itemView?.context, SubActivity::class.java)
    intent.putExtra("item", "${data[position]}")
    ContextCompat.startActivity(holder.itemView.context, intent, null)
}
```







참고 블로그 : <a href="https://velog.io/@hyeryeong/RecyclerView-%EC%9E%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B01">velog.io/@hyeryeong/RecyclerView</a>
