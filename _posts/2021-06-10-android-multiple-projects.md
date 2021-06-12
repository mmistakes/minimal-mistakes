---
title: "Building Multiple Apps in an Android Project"
header: 
  og_image: /images/android.png
tags: [android, how-to]
excerpt: "Repeating yourself can be boring as a developer. Learn how to share features among multiple apps in an android project."
---

I recently embarked on building a platform where customers would request certain services from vendors. Both apps were developed on a single android project due to some similar functionalities shared by the apps such as UI designs, utility classes, and dependencies.

Some benefits I observed using this approach includes:
- implementing similar business logics without repetition
- having robust tests for the shared features
- an improved code design knowledge


## Implementing this using Android Studio
For this article, let us build a simple project named `Marginity` that enables subscribed customers to get recommendations and professional services from vendors. (Something similar to a passenger and driver app - you get the point)

###### Creating the two apps
1. Create a new Android project and give it a name - Marginity.
2. Rename the `app` module to something more identifiable like `customer`.
![New app module](/images/android/rename_module.png)

3. Create the vendor app module. 
    - Click *File* > *New* > *New Module* > *Phone & Tablet Module*. 
    ![New app module](/images/android/new_app_module.png)
     
    - Give the app a name e.g Marginity Vendor.
    ![Add app module name](/images/android/app_module_name.png)
     
    - This creates a project structure similar to that of the customer app.


###### How do we create implementations that are visible to both apps? 
We do that using an ‘Android Library module’. This has a similar file structure to the android app such as AndroidManifest and other android resource files.
1. Click *File* > *New* > *New Module* > *Android Library*.
2. Give the module a name e.g sharedlib.
![Add library module name](/images/android/shared_lib_module.png)

***Side Note***:
An android app module can be converted to a library module with the steps below: 
1. Open the module-level `build.gradle` file.
2. Delete the line for the `applicationId`. Only an Android app module can define this.
3. Make the change at the bottom of the file. 
```gradle
apply plugin: 'com.android.application'
``` 
to 
```gradle
apply plugin: 'com.android.library'
```

###### Making the shared library visible to the apps
Since the library is in the same project as the apps, we can make it visible to the app modules by adding it as a project-level dependency.

1. Add this line to the project’s `settings.gradle` file.
```gradle
project(':sharedlib').projectDir= new File('./sharedlib')
```
2. Add the library as an app module dependency. Endure to add this in the apps `build.gradle` files.
```gradle
dependencies {
    ...
    implementation project(':sharedlib')
}
```
3. Sync the project.


## Some code samples
Let us build a simple implementation where both apps will share the same XML resource like text(strings), colors, and styles, as well as methods from the same classes.

###### Sharing layout
Example: Both apps having a similar login view


*`A layout in the shared library`*
```xml
<!-- sharedlib/src/main/res/layout/activity_login.xml -->

<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/company_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    ...

</androidx.constraintlayout.widget.ConstraintLayout>
```

*`The layout can be used in both apps`*
```kotlin
// customer/src/main/java/LoginActivity.kt

class LoginActivity: AppCompatActivity(){
    fun onCreate {
        ...
        setContentView(R.layout.activity_login)
    }
}
```

###### Sharing string resource
Example: Both apps sharing the same company information

*`A common string resource in the shared library`*
```xml
<!-- sharedlib/src/main/res/values/strings.xml -->

<string name=”company_name”>Marginity Inc.</string>
<string name=”company_address”>Lagos, Nigeria</string>
```


*`Shared string called from the apps`*
```kotlin
// customer/src/main/java/CustomerActivity.kt

val companyName = getString(R.string.company_name)
```

```kotlin
// vendor/src/main/java/VendorActivity.kt

val companyAddress = getString(R.string.company_address)
```


###### Sharing Kotlin methods
Example: Both apps calling an utility function that encrypts a secret text

```kotlin
// sharedlib/src/main/java/EncyrptionUtil.kt
package com.marginity.sharedlib

object EncryptionUtil {
    fun encrypt(secret: String): String {
        // encryption logic
    }
}
```

Both apps can import this utility object and call its methods like it is a part of the project

```kotlin
// customer/src/main/java/CustomerActivity.kt
package com.marginity.customer

import com.marginity.sharedlib.EncryptionUtil

class CustomerActivity: AppCompatActivity(){
    ...
    val encyrptedText = EncryptionUtil.encrypt("customer_secret")
}
```

```kotlin
// vendor/src/main/java/CustomerActivity.kt
package com.marginity.customer

import com.marginity.sharedlib.EncryptionUtil

class VendorActivity: AppCompatActivity(){
    ...
    val encyrptedText = EncryptionUtil.encrypt("vendor_secret")
}
```


###### What happens when there are two files with the same name in the the app and library?
For example, if `activity.xml` exists in the app and the library, the layout in the app module will be called as it has a higher priority compared to the library.

Ensure to check the considerations as specified in the [Android Developers documentation](https://developer.android.com/studio/projects/android-library#Considerations)



## Conclusion
While seeing some benefits in using this approach, I observed some challenges as well, such as:
- using view bindings in fragments and activities might not be straightforward
- dependency injection (DI) libraries should be used with care to provide the right dependencies for each app
- it might lead to collaboration issues for a large team

I hope you find a reason to use this approach in building multiple apps with similar features, as it could save some development time in the long run.