package com.example.navigationex02

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.recyclerview.widget.RecyclerView
import com.example.navigationex02.R
import com.example.navigationex02.databinding.ListItemBinding

/* 친구들의 목록을 출력하기 위한어댑터 클래스 선언
   - 리사이클러뷰에 표시될 뷰 홀더와 각 아이템 뷰(객체)를 생성하고, 데이터를 바인딩
   - 리사이클러뷰의 어댑터는 RecyclerView.Adapter를 상속하고, <제네릭>타입으로  선언된 뷰홀더를 넣어야 함
 */
class FriendsAdapter(private val itemData: ArrayList<FriendsData>) :
    RecyclerView.Adapter<FriendsAdapter.ViewHolder>() {

    //어댑터에서 관리할 아이템 갯수를 반환
    override fun getItemCount() = itemData.size

    /* 뷰객체를 담고 있는 뷰홀더(ViewHolder)를 생성하여 반환 */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        //뷰 객체 생성
        //val rootView = LayoutInflater.from(parent.context).inflate(R.layout.list_view_item, parent, false)
        val binding = ListItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)

        //뷰 객체를 뷰 홀더에 담아 반환
        return ViewHolder(binding)
    }

    /* 뷰홀더에 데이터 바인딩(bindItems() 함수를 호출)
        - 매개변수로 받은 ViewHolder와 position을 이용하여 뷰홀더에 데이터를 바인딩
     */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindItem(itemData[position])
    }

    //ViewHolder 클래스
    inner class ViewHolder(private val binding: ListItemBinding) : RecyclerView.ViewHolder(binding.root) {
        //친구 목록으로 출력할 아이템뷰(list_view_item.xml)에 데이터 바인딩
        fun bindItem(friend: FriendsData) {
            binding.userNameText.text = friend.firendName
            binding.userEngName.text = friend.enlgishName
            binding.userRankText.text = friend.friendRank.toString()
            binding.userAvatarImage.setImageResource(friend.imageResource)

            /* 아이템뷰를 클릭시 친구 상세 정보 보여주는 이벤트 처리
               - public abstract static class ViewHolder {
                    public final View itemView; }
             */
            itemView.setOnClickListener {
                /* DetailFragment에 보낼 번들 객체 생성 */
                val bundle = Bundle().apply { putInt("idx", adapterPosition) }

                /*  View에서 NavController를 가져와서
                    navigate()는 메서드를 이용하여 action에 설정된 destination으로 이동
                    - 친구목록뷰에서 친구정보보기 뷰로 이동(bundle 객체를 목적지로 전달)
               */
                Navigation.findNavController(itemView)
                    .navigate(R.id.action_friendsFragment_to_detailFragment, bundle)
            }
        }
    }
}
