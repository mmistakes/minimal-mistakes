---
layout: single
title: "[ANDROID]전자액자"
categories: AndroidStudio
tag: [androidstudio, java, kotlin]
toc: true
author_profile: true
sidebar:
  nav: "docs"
# search : false
---

## 앱 권한 요청

### checkSelfPermission

- 인자 : permisison 이름
- 앱에 이미 권한이 부여되었는지 확인
- public static int checkSelfPermission (Context context, String permission)

### shouldShowRequestPermissionRationale

- 앱에 권한이 필요한 이유 설명
- 사용자가 이전에 권한 요청을 거부한 경우 true 값 반환
- public static boolean shouldShowRequestPermissionRationale (Activity activity, String permission)

### requestPermissions

- 권한 요청
- static void requestPermissions(Activity activity, String[] permissions, int requestCode)
- 메소드를 호출 하면서 필요한 권한 작성
- 요청 하려는 권한이 한개 이상이면 String 배열에 기입

### onRequestPermissionsResult

- 사용자가 권한 요청 대화상자에 응답하면 시스템은 앱의 onRequestPermissionsResult() 메소드를 호출

```kotlin
addPhotoButton.setOnClickListener{
  when{
    ContextCompat.checkSelfPermission(this, android.Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED -> {
      navigatePhotos()
    }
    shouldShowRequestPermissionRationale(android.Manifest.permission.READ_EXTERNAL_STORAGE) -> {
      showPermissionContextPopup()
    }
    else -> {
      requestPermissions(arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE), 1000)
    }
  }
}

override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when(requestCode){
            1000 -> {
                if(grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                    navigatePhotos()
                } else{
                    Toast.makeText(this, "권한을 거부하였습니다.", Toast.LENGTH_SHORT).show()
                }
            }
            else -> {

            }
        }
    }

// 권한요청 응답처리
```

## startActivityForResult -> registerForActivityResult

- AndroidX Activity와 Fragment에 도입된 Activity Result API 사용을 적극 권장
- 결과를 얻는 Activity를 실행하는 로직을 사용할 때, 메모리 부족으로 인해 프로세스와 Activity가 사라질 수 있음

```kotlin
//startActivityForResult

private fun navigatePhotos() {
  val intent = Intent(Intent.ACTION_GET_CONTENT)
  intent.type = "image/*"
  startActivityForResult(intent, 2000)
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
  super.onActivityResult(requestCode, resultCode, data)
  if(resultCode != Activity.RESULT_OK) {
      return
  }
  val selectedImageUri: Uri? = data?.data

  when(requestCode){
    2000 -> {
      if (selectedImageUri != null) {
        if (imageUriList.size == 6){
            Toast.makeText(this, "이미 사진이 꽉 찼습니다.", Toast.LENGTH_SHORT).show()
            return
        }
        imageUriList.add(selectedImageUri)
        imageViewList[imageUriList.size - 1].setImageURI(selectedImageUri)
      } else{

      }
    }
    else -> {
      Toast.makeText(this, "사진을 가져오지 못했습니다.", Toast.LENGTH_SHORT).show()
    }
  }
}

```

```kotlin
//startActivityForResult

override fun onCreate(savedInstanceState: Bundle?) {
  ...

  onActivityResultLauncher()
  // onCreate에서 선언해야함
  ...
}

private fun navigatePhotos() {
  val intent = Intent(Intent.ACTION_GET_CONTENT)
  intent.type = "image/*"
  activityResultLauncher.launch(intent)
}

private fun onActivityResultLauncher(){
  activityResultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()){
    if(it.resultCode != Activity.RESULT_OK){
      return@registerForActivityResult
    }
    val selectedImageUri: Uri? = it.data?.data

    if (selectedImageUri != null) {
      if (imageUriList.size == 6){
          Toast.makeText(this, "이미 사진이 꽉 찼습니다.", Toast.LENGTH_SHORT).show()
          return@registerForActivityResult
      }
      imageUriList.add(selectedImageUri)
      imageViewList[imageUriList.size - 1].setImageURI(selectedImageUri)
    } else{
      Toast.makeText(this, "사진을 가져오지 못했습니다.", Toast.LENGTH_SHORT).show()
      return@registerForActivityResult
    }
  }
}

```

## animation

```kotlin
private fun startTimer(){
  timer = timer(period = 5000){
    runOnUiThread{
      val current = currentPosition
      val next = if(photoList.size <= currentPosition + 1) 0 else current + 1

      backgroundPhotoImageView.setImageURI(photoList[current])

      photoImageView.alpha = 0f
      photoImageView.setImageURI((photoList[next]))
      photoImageView.animate()
        .alpha(1.0f)
        .setDuration(1000)
        .start()

      currentPosition = next
    }
  }
}
```
