---
layout: single
title:  "Android - View Pager2"
categories: Android
tag: [Android, View Pager2]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>









# ◆View Pager2

view pager를 구현하려면 pagerAdapter을 상속해서 구현을 해주어야 한다. pagerAdapter를 상속해서 구현해놓은 2가지 어댑터(FragmentPagerAdpter와 FragmentStatePagerAdaper)를 제공한다. 

<br>



## FragmentstatePagerAdpater

각 페이지가 프래그먼트로 되어 있을 때 사용하는 어댑터<br>프래그먼트를 메모리에 생성했다가 필요 없어지면 제거하기 때문에 메모리에 부담이 적다.

<br>







# ◆Viewpager2 사용방법



## 1. activity_main.xml

```kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tabLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">
        <com.google.android.material.tabs.TabItem
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Monday"/>
        <com.google.android.material.tabs.TabItem
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Tuesday"/>
        <com.google.android.material.tabs.TabItem
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Wednesday"/>

    </com.google.android.material.tabs.TabLayout>

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tabLayout"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```



## 2. FragmentAdapter

```kotlin
class FragmentAdapter(fragmentActivity: FragmentActivity) : FragmentStateAdapter(fragmentActivity){
    var fragmentList = listOf<Fragment>()
    override fun getItemCount(): Int {
        return fragmentList.size
    }

    override fun createFragment(position: Int): Fragment {
        return fragmentList[position]
    }
}
```

- `FragmentStateAdapter`를 사용할때는 `FragmentStateAdapter`를 상속할 땐 추상 메서드인 `createFragment()`와 RecyclerView.Adapter의`getItemCount()`를 반드시 오버라이딩해야한다.

  

- `createFragment()`는 파라미터로 전달받은 특정 position 위치에 연결된 프래그먼트 인스턴스를 생성해서 제공합니다. 그러면 `FragmentStateAdapter`가 반환된 프래그먼트의 라이프 사이클을 책임집니다

- `getItemCount()`는 adapter의 item개수를 리턴합니다.  ViewPager2에서의 adapter item은 페이지의 개수이므로 생성될 framgment 인스턴스의 개수를 반환하면 됩니다







## 2. main activity.kt

```kotlin
class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        

        val fragmentList = listOf(FragmentA(), FragmentB(), FragmentC())
        val adapter = FragmentAdapter(this)
        adapter.fragmentList = fragmentList
        binding.viewPager.adapter = adapter

        var tabTiles = listOf("A","B","C")
        TabLayoutMediator(binding.tabLayout, binding.viewPager){ //tablayout과 tab 연결
            tab, position -> tab.text = tabTiles[position]
        }.attach()
    }

}
```







**참고문서**

android developers 

1.<a href="https://developer.android.com/reference/androidx/viewpager/widget/PagerAdapter">pager Adapter</a>

2.<a href="https://developer.android.com/guide/navigation/navigation-swipe-view-2?hl=ko">ViewPager2</a>

